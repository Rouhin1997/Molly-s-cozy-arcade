import {describe,it,expect} from 'vitest';
import {
 newKitchen,dropInKitchen,tickKitchen,activeRecipe,cookingPhase,chooseKitchenOrder,
 recipeComplete,recordKitchenResult,defaultNoodleSave,normalizeNoodleSave,remainingPatience,
 toggleKitchenPause,COOK_SECONDS,SHIFT_DURATION,RECIPES,type KitchenState,type Ingredient,type Target
} from '../src/lib/noodleShop';
const stock=(ingredient:Ingredient,target:Target,s:KitchenState)=>
 dropInKitchen(s,{kind:'stock',ingredient},target);
const fromCooker=(appliance:'pot'|'steamer',target:Target,s:KitchenState)=>
 dropInKitchen(s,{kind:'cooker',appliance},target);
const serve=(s:KitchenState)=>dropInKitchen(s,{kind:'dish'},'serve');
function advance(s:KitchenState,secs:number){
 let cur=s;
 for(let i=0;i<Math.ceil(secs*2);i++)cur=tickKitchen(cur,Math.min(.5,secs-i*.5));
 return cur;
}
function makeNoodles(s:KitchenState,topping:'greens'|'mushrooms'){
 s=stock('bowl','board',s);
 s=stock('noodles','pot',s);
 s=advance(s,COOK_SECONDS.pot+.4);
 s=fromCooker('pot','board',s);
 s=stock('broth','board',s);
 s=stock(topping,'board',s);
 return s;
}
function makeDumplings(s:KitchenState){
 s=stock('plate','board',s);
 s=stock('dumplings','steamer',s);
 s=advance(s,COOK_SECONDS.steamer+.4);
 s=fromCooker('steamer','board',s);
 s=stock('sauce','board',s);
 return s;
}
describe('Noodles of Destiny — full interactive first slice',()=>{
 it('offers a replayable untimed tutorial with proper ingredients and only one valid serving',()=>{
  let s=newKitchen('tutorial');
  expect(s.orders).toHaveLength(1);
  expect(s.activeOrderId).toBe('tutorial-0');
  expect(s.status).toBe('playing');
  expect(activeRecipe(s)?.id).toBe('garden');
  s=advance(s,400);
  expect(s.status).toBe('playing');
  expect(s.missed).toBe(0);
  s=makeNoodles(s,'greens');
  expect(recipeComplete(s)).toBe(true);
  s=serve(s);
  expect(s.status).toBe('finished');
  expect(s.served).toBe(1);
  expect(s.score).toBe(0);
  expect(recordKitchenResult(defaultNoodleSave(),s).tutorialDone).toBe(true);
  expect(newKitchen('tutorial').status).toBe('playing');
 });
 it('enforces physical workflow and never accepts uncooked noodles or the wrong appliance',()=>{
  let s=newKitchen('tutorial');
  s=stock('noodles','pot',s);
  expect(s.pot).toBeNull();
  expect(s.mistakes).toBe(0);
  s=stock('plate','board',s);
  expect(s.dish.vessel).toBeNull();
  s=stock('bowl','board',s);
  s=stock('broth','board',s);
  expect(s.dish.items).toHaveLength(0);
  s=stock('dumplings','steamer',s);
  expect(s.steamer).toBeNull();
  s=stock('noodles','pot',s);
  expect(s.pot?.item).toBe('noodles');
  s=fromCooker('pot','board',s);
  expect(s.dish.items).toHaveLength(0);
  expect(s.status).toBe('playing');
  s=advance(s,COOK_SECONDS.pot+.15);
  s=fromCooker('pot','board',s);
  expect(s.dish.items).toContain('cooked-noodles');
  expect(recipeComplete(s)).toBe(false);
  s=serve(s);
  expect(s.served).toBe(0);
  s=stock('mushrooms','board',s);
  expect(s.dish.items).not.toContain('mushrooms');
  s=stock('broth','board',s);
  s=stock('greens','board',s);
  expect(recipeComplete(s)).toBe(true);
 });
 it('times cooked and burnt food; only a discarded burnt batch permits retry',()=>{
  let s=newKitchen('shift');
  s=stock('bowl','board',s);
  s=stock('noodles','pot',s);
  expect(cookingPhase(s,'pot')).toBe('cooking');
  s=advance(s,4);
  expect(cookingPhase(s,'pot')).toBe('ready');
  s=advance(s,10);
  expect(cookingPhase(s,'pot')).toBe('burnt');
  s=fromCooker('pot','board',s);
  expect(s.dish.items).not.toContain('cooked-noodles');
  s=fromCooker('pot','bin',s);
  expect(s.pot).toBeNull();
  s=stock('noodles','pot',s);
  expect(s.pot?.item).toBe('noodles');
  s=advance(s,4);
  s=fromCooker('pot','board',s);
  expect(s.dish.items).toContain('cooked-noodles');
 });
 it('runs a real shift with three distinct recipes, arrivals, patient guests and score',()=>{
  let s=newKitchen('shift');
  expect(s.orders.map(o=>o.status)).toEqual(['waiting','pending','pending']);
  s=makeNoodles(s,'greens');
  s=serve(s);
  expect(s.served).toBe(1);
  expect(s.status).toBe('playing');
  s=advance(s,19);
  expect(s.orders[1].status).toBe('waiting');
  expect(s.activeOrderId).toBe('shift-1');
  expect(activeRecipe(s)?.id).toBe('dumpling');
  s=makeDumplings(s);
  expect(recipeComplete(s)).toBe(true);
  s=serve(s);
  expect(s.served).toBe(2);
  s=advance(s,22);
  expect(s.orders[2].status).toBe('waiting');
  expect(activeRecipe(s)?.id).toBe('mushroom');
  s=makeNoodles(s,'mushrooms');
  s=serve(s);
  expect(s.served).toBe(3);
  expect(s.missed).toBe(0);
  expect(s.status).toBe('finished');
  expect(s.score).toBeGreaterThan(300);
  const saved=recordKitchenResult(defaultNoodleSave(),s);
  expect(saved.bestServed).toBe(3);
  expect(saved.bestScore).toBe(s.score);
  expect(saved.shifts).toBe(1);
 });
 it('handles customer deadlines, clears abandoned preparation and preserves other orders',()=>{
  let s=newKitchen('shift');
  s=stock('bowl','board',s);
  s=stock('noodles','pot',s);
  s=advance(s,67);
  expect(s.orders[0].status).toBe('missed');
  expect(s.missed).toBe(1);
  expect(s.dish.vessel).toBeNull();
  expect(s.pot).toBeNull();
  expect(s.orders[1].status).toBe('waiting');
  expect(s.orders[2].status).toBe('waiting');
  expect(s.activeOrderId).toBe('shift-1');
  s=makeDumplings(s);
  expect(s.served).toBe(0);
  s=serve(s);
  expect(s.served).toBe(1);
  expect(s.missed).toBe(1);
 });
 it('prevents switching customers while any active dish/cooker exists and allows it afterwards',()=>{
  let s=advance(newKitchen('shift'),41);
  expect(s.orders.every(o=>o.status==='waiting')).toBe(true);
  s=stock('bowl','board',s);
  const blocked=chooseKitchenOrder(s,'shift-2');
  expect(blocked.activeOrderId).toBe('shift-0');
  expect(blocked.message).toMatch(/Finish or discard/);
  s=dropInKitchen(blocked,{kind:'dish'},'bin');
  expect(s.dish.vessel).toBeNull();
  s=chooseKitchenOrder(s,'shift-2');
  expect(s.activeOrderId).toBe('shift-2');
  expect(activeRecipe(s)?.id).toBe('mushroom');
 });
 it('supports explicit pause and no silent timer advancement on inactive games',()=>{
  let s=newKitchen('shift');
  s=toggleKitchenPause(s);
  expect(tickKitchen(s,2)).toBe(s);
  s=toggleKitchenPause(s);
  expect(tickKitchen(s,1).elapsed).toBe(1);
  expect(tickKitchen({...s,status:'finished'},1).elapsed).toBe(0);
  expect(remainingPatience(s,s.orders[0])).toBe(66);
 });
 it('ends at the global shift cap and sanitizes stored progress',()=>{
  let s=newKitchen('shift');
  s=advance(s,SHIFT_DURATION+3);
  expect(s.status).toBe('finished');
  expect(s.missed).toBe(3);
  expect(s.served).toBe(0);
  const cleaned=normalizeNoodleSave({version:1,tutorialDone:true,bestScore:Infinity,bestServed:20,shifts:-5});
  expect(cleaned).toEqual({version:1,tutorialDone:true,bestScore:0,bestServed:3,shifts:0});
  expect(normalizeNoodleSave({version:7,tutorialDone:true})).toEqual(defaultNoodleSave());
 });
 it('keeps all three recipe paths independently defined',()=>{
  expect(Object.keys(RECIPES)).toHaveLength(3);
  expect(RECIPES.garden.extras).not.toEqual(RECIPES.mushroom.extras);
  expect(RECIPES.dumpling.appliance).toBe('steamer');
 });
});
