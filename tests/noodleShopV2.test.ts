import {describe,it,expect} from 'vitest';
import {
 KITCHEN_LEVELS,estimateOrderSeconds,minimumSafePatience,validateShiftSchedule
} from '../src/lib/noodleShopCampaign';
import {RECIPES,COOK_SECONDS,newKitchen,tickKitchen,chooseKitchenOrder,
 dropInKitchen,recipeComplete,cookingPhase,boardDish,levelWon,recordKitchenResult,
 normalizeNoodleSave,defaultNoodleSave,type KitchenState,type Ingredient,type Target
} from '../src/lib/noodleShopV2';
import {awardNoodleCoupon,redeemNoodleCoupon,couponRemaining,threeMonthsLater,
 normalizeNoodleCoupon} from '../src/lib/noodleCoupon';
function advance(state:KitchenState,seconds:number){
 let s=state;for(let t=0;t<seconds;t+=.5)s=tickKitchen(s,Math.min(.5,seconds-t));return s;
}
function stock(s:KitchenState,ingredient:Ingredient,target:Target){
 return dropInKitchen(s,{kind:'stock',ingredient},target);
}
function cook(s:KitchenState,recipeId:keyof typeof RECIPES,slot:0|1=0){
 const r=RECIPES[recipeId],target:Target=slot===0?'board':'board2';
 s=stock(s,r.raw,r.appliance);
 s=stock(s,r.vessel,target);
 for(const extra of r.extras)s=stock(s,extra,target);
 s=advance(s,COOK_SECONDS[r.appliance]+.4);
 s=dropInKitchen(s,{kind:'cooker',appliance:r.appliance},target);
 expect(recipeComplete(s,slot)).toBe(true);
 return s;
}
describe('Eight-shift campaign: fairness, progression and concurrency',()=>{
 it('provides eight genuinely different paced shifts, with adequate human action allowances',()=>{
  expect(KITCHEN_LEVELS.map(l=>l.id)).toEqual([1,2,3,4,5,6,7,8]);
  expect(KITCHEN_LEVELS.map(l=>l.orders.length)).toEqual([3,3,4,4,5,5,6,6]);
  const workload=Object.fromEntries(Object.values(RECIPES).map(r=>[
   r.id,{extras:r.extras.length,cook:COOK_SECONDS[r.appliance]}
  ])) as Record<keyof typeof RECIPES,{extras:number;cook:number}>;
  for(const level of KITCHEN_LEVELS){
   expect(validateShiftSchedule(level,workload)).toEqual([]);
   for(const o of level.orders){
    const w=workload[o.recipeId];
    expect(o.patience).toBeGreaterThanOrEqual(minimumSafePatience(w.extras,w.cook));
   }
  }
  expect(estimateOrderSeconds(4,4.2)).toBeGreaterThan(20);
 });
 it('allows ingredients to cook BEFORE a bowl is placed and garnishes to be plated WHILE cooking',()=>{
  let s=newKitchen('shift',2);
  s=stock(s,'noodles','pot');
  expect(s.pot?.item).toBe('noodles');
  s=stock(s,'bowl','board');
  s=stock(s,'broth','board');
  s=stock(s,'greens','board');
  expect(s.dish.items).toContain('broth');
  expect(s.dish.items).toContain('greens');
  expect(recipeComplete(s)).toBe(false);
  s=advance(s,5);
  s=dropInKitchen(s,{kind:'cooker',appliance:'pot'},'board');
  expect(recipeComplete(s)).toBe(true);
  s=dropInKitchen(s,{kind:'dish',slot:0},'serve');
  expect(s.served).toBe(1);
 });
 it('can cook DIFFERENT customer orders simultaneously in both utensils and two boards',()=>{
  let s=advance(newKitchen('shift',3),25);
  const first=s.orders[0],second=s.orders[1];
  s=stock(s,'noodles','pot');
  s=stock(s,'bowl','board');
  s=stock(s,'broth','board');
  s=stock(s,'mushrooms','board');
  s=chooseKitchenOrder(s,second.id);
  expect(s.activeOrderId).toBe(second.id);
  s=stock(s,'dumplings','steamer');
  s=stock(s,'plate','board2');
  s=stock(s,'sauce','board2');
  expect(s.pot?.orderId).toBe(first.id);
  expect(s.steamer?.orderId).toBe(second.id);
  expect(boardDish(s,0).orderId).toBe(first.id);
  expect(boardDish(s,1).orderId).toBe(second.id);
  s=advance(s,6);
  s=dropInKitchen(s,{kind:'cooker',appliance:'pot'},'board');
  s=dropInKitchen(s,{kind:'cooker',appliance:'steamer'},'board2');
  expect(recipeComplete(s,0)).toBe(true);
  expect(recipeComplete(s,1)).toBe(true);
  // Even though second ticket is selected, the first dish serves its own owner.
  s=dropInKitchen(s,{kind:'dish',slot:0},'serve');
  expect(s.orders[0].status).toBe('served');
  expect(s.orders[1].status).toBe('waiting');
  expect(s.secondDish.orderId).toBe(second.id);
  s=dropInKitchen(s,{kind:'dish',slot:1},'serve');
  expect(s.orders[1].status).toBe('served');
  expect(s.served).toBe(2);
 });
 it('does not cross-contaminate orders or clear an unrelated plate on a missed deadline',()=>{
  let s=advance(newKitchen('shift',3),25);
  s=stock(s,'bowl','board');
  s=chooseKitchenOrder(s,s.orders[1].id);
  s=stock(s,'plate','board2');
  expect(s.secondDish.vessel).toBe('plate');
  s=advance(s,76);
  expect(s.orders[0].status).toBe('missed');
  expect(s.dish.vessel).toBeNull();
  expect(s.secondDish.vessel).toBe('plate');
 });
 it('completes every shift with non-superhuman sequential play, including the hardest level',()=>{
  for(const level of KITCHEN_LEVELS){
   let s=newKitchen('shift',level.id);
   for(let i=0;i<level.orders.length;i++){
    const o=s.orders[i];
    if(s.elapsed<o.arrivesAt)s=advance(s,o.arrivesAt-s.elapsed+.3);
    if(s.activeOrderId!==o.id)s=chooseKitchenOrder(s,o.id);
    s=cook(s,o.recipeId,0);
    s=dropInKitchen(s,{kind:'dish',slot:0},'serve');
   }
   expect(s.status).toBe('finished');
   expect(s.served).toBe(level.orders.length);
   expect(levelWon(s)).toBe(true);
   const saved=recordKitchenResult(defaultNoodleSave(),s);
   expect(saved.unlockedLevel).toBe(Math.min(8,level.id+1));
  }
 });
 it('keeps the tutorial replayable, migrates the first-shift save and never grants progress for failure',()=>{
  const old=normalizeNoodleSave({version:1,tutorialDone:true,bestScore:555,bestServed:3,shifts:2});
  expect(old.version).toBe(2);
  expect(old.tutorialDone).toBe(true);
  expect(old.unlockedLevel).toBe(1);
  expect(newKitchen('tutorial').mode).toBe('tutorial');
  const missed=advance(newKitchen('shift',1),180);
  expect(levelWon(missed)).toBe(false);
  expect(recordKitchenResult(old,missed).unlockedLevel).toBe(1);
 });
 it('burns long-forgotten food but never rushes the untimed tutorial',()=>{
  let s=stock(newKitchen('shift',1),'noodles','pot');
  s=advance(s,24);
  expect(cookingPhase(s,'pot')).toBe('burnt');
  let t=stock(newKitchen('tutorial'),'noodles','pot');
  t=advance(t,300);
  expect(cookingPhase(t,'pot')).toBe('ready');
  expect(t.status).toBe('playing');
 });
});
describe('Dragon Chef reward: two home-cooked treats over exactly three months',()=>{
 it('awards once, does not reset after replay, permits either meal twice, no third claim',()=>{
  const t=new Date('2026-11-13T17:00:00Z');
  const c=awardNoodleCoupon(null,t);
  expect(awardNoodleCoupon(c,new Date('2027-01-01T00:00:00Z'))).toBe(c);
  expect(couponRemaining(c,t)).toBe(2);
  const one=redeemNoodleCoupon(c,'ramen',new Date('2026-11-14T10:00:00Z'))!;
  expect(couponRemaining(one,new Date('2026-11-14T10:00:00Z'))).toBe(1);
  const two=redeemNoodleCoupon(one,'soup-dumplings',new Date('2026-12-25T12:00:00Z'))!;
  expect(couponRemaining(two,new Date('2026-12-25T12:00:00Z'))).toBe(0);
  expect(redeemNoodleCoupon(two,'ramen',new Date('2027-01-01T00:00:00Z'))).toBeNull();
  expect(two.claims.map(x=>x.dish)).toEqual(['ramen','soup-dumplings']);
 });
 it('calculates calendar months including short February and expires exactly at deadline',()=>{
  const date='2027-01-31T10:00:00Z';
  expect(threeMonthsLater(date).toISOString()).toBe('2027-04-30T10:00:00.000Z');
  const c=awardNoodleCoupon(null,new Date('2026-11-13T17:00:00Z'));
  expect(threeMonthsLater(c.awardedAt).toISOString()).toBe('2027-02-13T17:00:00.000Z');
  expect(couponRemaining(c,new Date('2027-02-13T16:59:59Z'))).toBe(2);
  expect(couponRemaining(c,new Date('2027-02-13T17:00:00Z'))).toBe(0);
  expect(redeemNoodleCoupon(c,'ramen',new Date('2027-02-14T00:00:00Z'))).toBeNull();
 });
 it('sanitizes redemption records and refuses a voucher without a real award',()=>{
  expect(normalizeNoodleCoupon({version:7,awardedAt:'no',claims:[]})).toBeNull();
  expect(redeemNoodleCoupon(null,'ramen')).toBeNull();
  const c=normalizeNoodleCoupon({version:1,awardedAt:'2026-11-13T17:00:00Z',
   claims:[{dish:'ramen',at:'2026-11-14T10:00:00Z'},
    {dish:'invalid',at:'2026-11-14T10:00:00Z'},
    {dish:'soup-dumplings',at:'2027-03-14T10:00:00Z'}]});
  expect(c?.claims).toHaveLength(1);
 });
});
