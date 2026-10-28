/** Noodles of Destiny: pure, deterministic tutorial + first-shift kitchen engine. */
export type Ingredient='bowl'|'plate'|'noodles'|'dumplings'|'broth'|'greens'|'mushrooms'|'sauce';
export type Vessel='bowl'|'plate';
export type Appliance='pot'|'steamer';
export type RecipeId='garden'|'mushroom'|'dumpling';
export type Mode='tutorial'|'shift';
export type OrderStatus='pending'|'waiting'|'served'|'missed';
export type Source={kind:'stock';ingredient:Ingredient}|{kind:'cooker';appliance:Appliance}|{kind:'dish'};
export type Target='pot'|'steamer'|'board'|'serve'|'bin';
export type Recipe={id:RecipeId;name:string;emoji:string;vessel:Vessel;raw:Ingredient;appliance:Appliance;cooked:string;extras:Ingredient[];description:string};
export const RECIPES:Record<RecipeId,Recipe>={
 garden:{id:'garden',name:'Garden Noodle Bowl',emoji:'🍜',vessel:'bowl',raw:'noodles',appliance:'pot',cooked:'cooked-noodles',extras:['broth','greens'],description:'Spring noodles, warm broth and crisp greens'},
 mushroom:{id:'mushroom',name:'Forest Mushroom Noodles',emoji:'🍄',vessel:'bowl',raw:'noodles',appliance:'pot',cooked:'cooked-noodles',extras:['broth','mushrooms'],description:'Steaming noodles with savoury mushrooms'},
 dumpling:{id:'dumpling',name:'Lucky Dumpling Plate',emoji:'🥟',vessel:'plate',raw:'dumplings',appliance:'steamer',cooked:'steamed-dumplings',extras:['sauce'],description:'Fluffy dumplings and a dipping sauce'}
};
export const STOCK:{id:Ingredient;name:string;emoji:string;hint:string}[]=[
 {id:'bowl',name:'Noodle bowl',emoji:'🥣',hint:'Start a noodle order'},
 {id:'plate',name:'Serving plate',emoji:'🍽️',hint:'Start a dumpling order'},
 {id:'noodles',name:'Fresh noodles',emoji:'🍝',hint:'Drag to boiling pot'},
 {id:'dumplings',name:'Raw dumplings',emoji:'🥟',hint:'Drag to bamboo steamer'},
 {id:'broth',name:'Warm broth',emoji:'🍲',hint:'Add to cooked noodles'},
 {id:'greens',name:'Bok choy',emoji:'🥬',hint:'Add to garden noodles'},
 {id:'mushrooms',name:'Mushrooms',emoji:'🍄',hint:'Add to mushroom noodles'},
 {id:'sauce',name:'Dipping sauce',emoji:'🥢',hint:'Add to steamed dumplings'}
];
export type Guest='po'|'rabbit'|'monkey'|'tigress';
export type KitchenOrder={id:string;recipeId:RecipeId;guest:Guest;arrivesAt:number;patience:number;status:OrderStatus;servedAt?:number};
export type CookingFood={item:Ingredient;startedAt:number};
export type KitchenState={
 mode:Mode;elapsed:number;paused:boolean;status:'playing'|'finished';
 orders:KitchenOrder[];activeOrderId:string|null;
 dish:{vessel:Vessel|null;items:string[]};pot:CookingFood|null;steamer:CookingFood|null;
 served:number;missed:number;score:number;mistakes:number;message:string;
};
export const SHIFT_DURATION=155;
export const COOK_SECONDS:Record<Appliance,number>={pot:3.6,steamer:4.8};
export const BURN_SECONDS:Record<Appliance,number>={pot:13,steamer:15};
const SHIFT_ORDERS:{recipeId:RecipeId;guest:Guest;arrivesAt:number;patience:number}[]=[
 {recipeId:'garden',guest:'rabbit',arrivesAt:0,patience:66},
 {recipeId:'dumpling',guest:'monkey',arrivesAt:19,patience:63},
 {recipeId:'mushroom',guest:'tigress',arrivesAt:41,patience:67}
];
export function newKitchen(mode:Mode):KitchenState{
 const orders:KitchenOrder[]=(mode==='tutorial'
  ?[{recipeId:'garden',guest:'po' as Guest,arrivesAt:0,patience:Infinity}]
  :SHIFT_ORDERS).map((o,i)=>({...o,id:mode+'-'+i,status:o.arrivesAt===0?'waiting' as const:'pending' as const}));
 return {mode,elapsed:0,paused:false,status:'playing',orders,activeOrderId:orders[0].id,
  dish:{vessel:null,items:[]},pot:null,steamer:null,
  served:0,missed:0,score:0,mistakes:0,
  message:mode==='tutorial'
   ?'Welcome, Chef Molly! Drag an empty bowl onto the preparation board.'
   :'The doors are open! Select an order and start cooking.'};
}
export function activeOrder(s:KitchenState):KitchenOrder|undefined{
 return s.orders.find(o=>o.id===s.activeOrderId&&o.status==='waiting');
}
export function activeRecipe(s:KitchenState):Recipe|undefined{
 const order=activeOrder(s);return order?RECIPES[order.recipeId]:undefined;
}
export function cookingPhase(s:KitchenState,appliance:Appliance):'empty'|'cooking'|'ready'|'burnt'{
 const cooking=s[appliance];if(!cooking)return 'empty';
 const age=s.elapsed-cooking.startedAt;
 if(age<COOK_SECONDS[appliance])return 'cooking';
 if(s.mode!=='tutorial'&&age>=BURN_SECONDS[appliance])return 'burnt';
 return 'ready';
}
export function cookingFraction(s:KitchenState,appliance:Appliance):number{
 const food=s[appliance];if(!food)return 0;
 return Math.min(1,Math.max(0,(s.elapsed-food.startedAt)/COOK_SECONDS[appliance]));
}
export function remainingPatience(s:KitchenState,o:KitchenOrder):number{
 return Math.max(0,o.patience-(s.elapsed-o.arrivesAt));
}
function emptyDish(){return {vessel:null,items:[] as string[]}}
function hasPending(s:KitchenState){return s.orders.some(o=>o.status==='waiting'||o.status==='pending')}
function nextWaiting(orders:KitchenOrder[]):string|null{
 return orders.find(o=>o.status==='waiting')?.id??null;
}
export function tickKitchen(state:KitchenState,deltaSeconds:number):KitchenState{
 if(state.status!=='playing'||state.paused||!Number.isFinite(deltaSeconds)||deltaSeconds<=0)return state;
 const elapsed=state.mode==='tutorial'?state.elapsed+Math.min(2,deltaSeconds):Math.min(SHIFT_DURATION,state.elapsed+Math.min(2,deltaSeconds));
 if(state.mode==='tutorial')return {...state,elapsed};
 const orders=state.orders.map(o=>{
  if(o.status==='pending'&&elapsed>=o.arrivesAt)return {...o,status:'waiting' as const};
  if(o.status==='waiting'&&elapsed>=o.arrivesAt+o.patience)return {...o,status:'missed' as const};
  return o;
 }).map(o=>elapsed>=SHIFT_DURATION&&(o.status==='waiting'||o.status==='pending')?{...o,status:'missed' as const}:o);
 const missed=orders.filter(o=>o.status==='missed').length;
 const activeStillHere=orders.some(o=>o.id===state.activeOrderId&&o.status==='waiting');
 const activeOrderId=activeStillHere?state.activeOrderId:nextWaiting(orders);
 const reset=state.activeOrderId!==activeOrderId;
 const done=!orders.some(o=>o.status==='waiting'||o.status==='pending');
 return {...state,elapsed,orders,missed,activeOrderId,
  ...(reset?{dish:emptyDish(),pot:null,steamer:null}:{}),
  status:done?'finished':'playing',
  message:done?'Shift over! Mr. Ping has tallied your orders.':
   missed>state.missed?'A customer ran out of patience. New order, fresh start!':
   reset&&activeOrderId?'A fresh guest is waiting. Let’s cook!':state.message};
}
export function toggleKitchenPause(s:KitchenState):KitchenState{
 return s.status==='playing'&&s.mode==='shift'?{...s,paused:!s.paused}:s;
}
export function chooseKitchenOrder(s:KitchenState,id:string):KitchenState{
 if(s.status!=='playing'||s.paused||!s.orders.some(o=>o.id===id&&o.status==='waiting'))return s;
 if(s.activeOrderId===id)return s;
 if(s.dish.vessel||s.pot||s.steamer)return {...s,message:'Finish or discard your current meal before switching customers.'};
 return {...s,activeOrderId:id,message:'New ticket selected. Let’s prepare it!'};
}
export function recipeComplete(s:KitchenState):boolean{
 const recipe=activeRecipe(s);
 return !!recipe&&s.dish.vessel===recipe.vessel&&
  [recipe.cooked,...recipe.extras].every(i=>s.dish.items.includes(i));
}
export function nextKitchenInstruction(s:KitchenState):string{
 if(s.status==='finished')return s.mode==='tutorial'
  ?'Training complete! You’re ready for your first real shift.'
  :'Shift complete. Check the order board for your results.';
 const recipe=activeRecipe(s);
 if(!recipe)return 'The next guest is on the way. Get ready!';
 if(!s.dish.vessel)return 'Drag '+(recipe.vessel==='bowl'?'a noodle bowl':'a serving plate')+' onto the preparation board.';
 if(!s.dish.items.includes(recipe.cooked)){
  if(!s[recipe.appliance])return 'Drag '+(recipe.raw==='noodles'?'fresh noodles into the boiling pot.':'raw dumplings into the bamboo steamer.');
  const phase=cookingPhase(s,recipe.appliance);
  if(phase==='cooking')return 'Watch the cooking meter! When it turns green, drag the food onto the plate.';
  if(phase==='burnt')return 'Oh no—overcooked! Drag the burnt food into the bin, then try again.';
  return 'Perfectly cooked! Drag the food from '+(recipe.appliance==='pot'?'the pot':'the steamer')+' to your '+recipe.vessel+'.';
 }
 const missing=recipe.extras.find(i=>!s.dish.items.includes(i));
 if(missing)return 'Add '+STOCK.find(i=>i.id===missing)!.name.toLowerCase()+' to your '+recipe.vessel+'.';
 return 'Delicious! Drag your finished '+recipe.vessel+' to the serving bell. 🔔';
}
function mistake(s:KitchenState,message:string):KitchenState{
 return {...s,mistakes:s.mistakes+(s.mode==='shift'?1:0),message};
}
export function dropInKitchen(state:KitchenState,source:Source,target:Target):KitchenState{
 if(state.status!=='playing'||state.paused)return state;
 const recipe=activeRecipe(state);
 if(!recipe)return {...state,message:'A customer will arrive shortly. Keep the kitchen ready.'};
 if(source.kind==='dish'){
  if(target==='bin')return {...state,dish:emptyDish(),pot:null,steamer:null,message:'Plate cleared. Time for a fresh start.'};
  if(target!=='serve')return mistake(state,'The finished plate goes to the serving bell, not here.');
  if(!recipeComplete(state))return mistake(state,'Not quite ready! '+nextKitchenInstruction(state));
  const orders=state.orders.map(o=>o.id===state.activeOrderId?
   {...o,status:'served' as const,servedAt:state.elapsed}:o);
  const served=state.served+1;
  const earned=state.mode==='tutorial'?0:100+Math.round(remainingPatience(state,activeOrder(state)!)*2);
  const activeOrderId=nextWaiting(orders);
  const next:KitchenState={...state,orders,served,score:state.score+earned,activeOrderId,
   dish:emptyDish(),pot:null,steamer:null,
   message:state.mode==='tutorial'?'Training complete! Mr. Ping is delighted.':
    'Order served! +'+earned+' points. '+(activeOrderId?'Next guest, please!':'More customers may be on their way.')};
  return {...next,status:hasPending(next)?'playing':'finished'};
 }
 if(source.kind==='cooker'){
  const phase=cookingPhase(state,source.appliance);
  const food=state[source.appliance];
  if(!food)return mistake(state,'That cooking station is empty.');
  if(target==='bin')return {...state,[source.appliance]:null,message:'Cooking station cleared. Fresh ingredients are on the shelf.'};
  if(target!=='board')return mistake(state,'Cooked food belongs on the preparation board.');
  if(phase==='cooking')return mistake(state,'Not ready yet! Wait for the green cooking meter.');
  if(phase==='burnt')return mistake(state,'That batch is overcooked. Drag it to the bin and try again.');
  if(state.dish.vessel!==recipe.vessel)return mistake(state,'Place the proper bowl or plate on the board first.');
  if(source.appliance!==recipe.appliance||food.item!==recipe.raw)return mistake(state,'This cooked ingredient is for a different recipe.');
  if(state.dish.items.includes(recipe.cooked))return mistake(state,'Your dish already has the main ingredient.');
  return {...state,[source.appliance]:null,
   dish:{...state.dish,items:[...state.dish.items,recipe.cooked]},
   message:'Beautifully cooked! Now finish the recipe.'};
 }
 const {ingredient}=source;
 if(target==='bin')return mistake(state,'Use the bin for used plates or spoiled cooked food.');
 if(ingredient==='bowl'||ingredient==='plate'){
  if(target!=='board')return mistake(state,'Put the empty serving dish onto the preparation board.');
  if(state.dish.vessel)return mistake(state,'There is already a dish on the board.');
  if(ingredient!==recipe.vessel)return mistake(state,recipe.vessel==='bowl'
   ?'This is a noodle order. Start with a bowl.':'This is a dumpling order. Start with a plate.');
  return {...state,dish:{vessel:ingredient,items:[]},message:'Great! Now cook the main ingredient.'};
 }
 if(ingredient==='noodles'||ingredient==='dumplings'){
  if(target!==recipe.appliance)return mistake(state,ingredient==='noodles'
   ?'Fresh noodles belong in the boiling pot.':'Raw dumplings belong in the steamer.');
  if(!state.dish.vessel)return mistake(state,'Place a serving bowl or plate on the board first.');
  if(state.dish.items.includes(recipe.cooked))return mistake(state,'Already cooked! Finish the toppings and serve.');
  if(ingredient!==recipe.raw)return mistake(state,'Check the order ticket. That is the wrong main ingredient.');
  if(state[target])return mistake(state,'That appliance is already busy. Collect or discard its food first.');
  return {...state,[target]:{item:ingredient,startedAt:state.elapsed},
   message:ingredient==='noodles'?'Noodles are boiling! Watch for the green meter.':'Dumplings are steaming! Watch for the green meter.'};
 }
 if(target!=='board')return mistake(state,'Toppings and sauces go on the preparation board.');
 if(!state.dish.vessel)return mistake(state,'Start by putting a bowl or plate on the board.');
 if(!state.dish.items.includes(recipe.cooked))return mistake(state,'Cook the main ingredient before adding the finishing touches.');
 if(!recipe.extras.includes(ingredient))return mistake(state,'That topping is not part of this guest’s order.');
 if(state.dish.items.includes(ingredient))return mistake(state,'You already added that ingredient.');
 const items=[...state.dish.items,ingredient];
 const next={...state,dish:{...state.dish,items}};
 return {...next,message:recipeComplete(next)
   ?'All done! Drag the finished meal to the serving bell. 🔔'
   :'Lovely! Check the ticket for the next topping.'};
}
export type NoodleSave={version:1;tutorialDone:boolean;bestScore:number;bestServed:number;shifts:number};
export const NOODLE_SAVE_KEY='molly-noodles-of-destiny-v1';
export function defaultNoodleSave():NoodleSave{
 return {version:1,tutorialDone:false,bestScore:0,bestServed:0,shifts:0};
}
export function normalizeNoodleSave(input:unknown):NoodleSave{
 const base=defaultNoodleSave();
 if(!input||typeof input!=='object')return base;
 const p=input as Partial<NoodleSave>;
 if(p.version!==1)return base;
 const safe=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?Math.floor(n):0;
 return {version:1,tutorialDone:p.tutorialDone===true,
  bestScore:safe(p.bestScore),bestServed:Math.min(3,safe(p.bestServed)),shifts:safe(p.shifts)};
}
export function readNoodleSave():NoodleSave{
 try{return normalizeNoodleSave(JSON.parse(localStorage.getItem(NOODLE_SAVE_KEY)??'null'))}
 catch{return defaultNoodleSave()}
}
export function writeNoodleSave(value:NoodleSave):void{
 try{localStorage.setItem(NOODLE_SAVE_KEY,JSON.stringify(value))}catch{/* browser might block storage */}
}
export function recordKitchenResult(save:NoodleSave,state:KitchenState):NoodleSave{
 if(state.status!=='finished')return save;
 if(state.mode==='tutorial')return {...save,tutorialDone:true};
 return {...save,bestScore:Math.max(save.bestScore,state.score),
  bestServed:Math.max(save.bestServed,state.served),shifts:save.shifts+1};
}
