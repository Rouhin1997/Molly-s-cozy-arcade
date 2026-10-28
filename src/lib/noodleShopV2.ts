/** Noodles of Destiny v2. Pure multi-order kitchen engine for eight levels.
 * Both boards and both cookers are persistent, assigned to a specific customer.
 * Plating order is flexible; food can cook while toppings are added.
 */
import {KITCHEN_LEVELS,shiftForLevel} from './noodleShopCampaign';
export type Ingredient='bowl'|'plate'|'noodles'|'dumplings'|'broth'|'greens'|'mushrooms'|'sauce'|'tofu'|'chili'|'scallions'|'sesame';
export type Vessel='bowl'|'plate';
export type Appliance='pot'|'steamer';
export type RecipeId='garden'|'mushroom'|'dumpling'|'jade'|'fire'|'sesame'|'fiveSpice'|'dragon';
export type Guest='po'|'rabbit'|'monkey'|'tigress';
export type Mode='tutorial'|'shift';
export type Target='pot'|'steamer'|'board'|'board2'|'serve'|'bin';
export type Source={kind:'stock';ingredient:Ingredient}|{kind:'cooker';appliance:Appliance}|{kind:'dish';slot?:0|1};
export type Recipe={id:RecipeId;name:string;emoji:string;vessel:Vessel;raw:Ingredient;appliance:Appliance;cooked:string;extras:Ingredient[];description:string};
const bowl=(id:RecipeId,name:string,emoji:string,extras:Ingredient[],description:string):Recipe=>
 ({id,name,emoji,extras,description,vessel:'bowl',raw:'noodles',appliance:'pot',cooked:'cooked-noodles'});
const plate=(id:RecipeId,name:string,emoji:string,extras:Ingredient[],description:string):Recipe=>
 ({id,name,emoji,extras,description,vessel:'plate',raw:'dumplings',appliance:'steamer',cooked:'steamed-dumplings'});
export const RECIPES:Record<RecipeId,Recipe>={
 garden:bowl('garden','Garden Noodle Bowl','🍜',['broth','greens'],'Fresh spring greens in golden broth'),
 mushroom:bowl('mushroom','Forest Mushroom Noodles','🍄',['broth','mushrooms'],'Soft noodles with woodland mushrooms'),
 dumpling:plate('dumpling','Lucky Dumpling Plate','🥟',['sauce'],'Steamed dumplings with dipping sauce'),
 jade:bowl('jade','Jade Mountain Noodles','🥬',['broth','greens','tofu'],'Green mountain vegetables and silky tofu'),
 fire:bowl('fire','Dragon Fire Ramen','🌶️',['broth','chili','scallions'],'Fiery red chilli with fresh scallion'),
 sesame:plate('sesame','Golden Sesame Dumplings','🌟',['sauce','sesame'],'Crisp sesame finish and fragrant sauce'),
 fiveSpice:bowl('fiveSpice','Five-Spice Feast','🍲',['broth','mushrooms','tofu','scallions'],'A celebratory bowl of forest vegetables'),
 dragon:plate('dragon','Dragon Master Dumplings','🐉',['sauce','chili','sesame'],'The Valley’s most colourful dumpling platter')
};
export const STOCK:{id:Ingredient;name:string;emoji:string;hint:string}[]=[
 {id:'bowl',name:'Noodle bowl',emoji:'🥣',hint:'Drag onto either board'},
 {id:'plate',name:'Serving plate',emoji:'🍽️',hint:'For dumpling recipes'},
 {id:'noodles',name:'Fresh noodles',emoji:'🍝',hint:'Boiling pot'},
 {id:'dumplings',name:'Raw dumplings',emoji:'🥟',hint:'Bamboo steamer'},
 {id:'broth',name:'Golden broth',emoji:'🍲',hint:'Noodle topping'},
 {id:'greens',name:'Bok choy',emoji:'🥬',hint:'Fresh vegetable'},
 {id:'mushrooms',name:'Mushrooms',emoji:'🍄',hint:'Forest flavour'},
 {id:'sauce',name:'Dipping sauce',emoji:'🥢',hint:'Dumpling finish'},
 {id:'tofu',name:'Silky tofu',emoji:'🟨',hint:'Soft cubes'},
 {id:'chili',name:'Red chilli',emoji:'🌶️',hint:'Spicy garnish'},
 {id:'scallions',name:'Scallions',emoji:'🌿',hint:'Green sparkle'},
 {id:'sesame',name:'Sesame seeds',emoji:'✨',hint:'Golden crunch'}
];
export const COOK_SECONDS:Record<Appliance,number>={pot:4.2,steamer:5.4};
export const BURN_SECONDS:Record<Appliance,number>={pot:22,steamer:25};
export type KitchenOrder={id:string;recipeId:RecipeId;guest:Guest;arrivesAt:number;patience:number;
 status:'pending'|'waiting'|'served'|'missed';servedAt?:number};
export type Dish={vessel:Vessel|null;items:string[];orderId:string|null};
export type CookingFood={item:Ingredient;orderId:string;startedAt:number};
export type KitchenState={mode:Mode;level:number;elapsed:number;paused:boolean;status:'playing'|'finished';
 orders:KitchenOrder[];activeOrderId:string|null;dish:Dish;secondDish:Dish;
 pot:CookingFood|null;steamer:CookingFood|null;served:number;missed:number;score:number;mistakes:number;message:string};
const emptyDish=():Dish=>({vessel:null,items:[],orderId:null});
const waiting=(orders:KitchenOrder[])=>orders.find(o=>o.status==='waiting')?.id??null;
const orderFor=(s:KitchenState,id:string|null)=>s.orders.find(o=>o.id===id&&o.status==='waiting');
export function newKitchen(mode:Mode,level=1):KitchenState{
 const config=shiftForLevel(level);
 const seeds=mode==='tutorial'
  ?[{recipeId:'garden' as const,guest:'po' as const,arrivesAt:0,patience:Infinity}]
  :config.orders;
 const orders:KitchenOrder[]=seeds.map((o,i)=>({...o,id:mode+'-'+config.id+'-'+i,
  status:o.arrivesAt===0?'waiting':'pending'}));
 return {mode,level:config.id,elapsed:0,paused:false,status:'playing',
  orders,activeOrderId:orders[0].id,dish:emptyDish(),secondDish:emptyDish(),
  pot:null,steamer:null,served:0,missed:0,score:0,mistakes:0,
  message:mode==='tutorial'?'Welcome, Chef Molly! Start with the golden broth and a bowl.':'The kitchen is open. You can cook and plate at the same time!'};
}
export function activeOrder(s:KitchenState){return orderFor(s,s.activeOrderId)}
export function activeRecipe(s:KitchenState){const o=activeOrder(s);return o?RECIPES[o.recipeId]:undefined}
export function boardDish(s:KitchenState,slot:0|1){return slot===0?s.dish:s.secondDish}
export function dishRecipe(s:KitchenState,slot:0|1):Recipe|undefined{
 const d=boardDish(s,slot);const o=orderFor(s,d.orderId);return o?RECIPES[o.recipeId]:undefined;
}
export function cookingPhase(s:KitchenState,a:Appliance):'empty'|'cooking'|'ready'|'burnt'{
 const food=s[a];if(!food)return 'empty';
 const age=s.elapsed-food.startedAt;
 if(age<COOK_SECONDS[a])return 'cooking';
 if(s.mode!=='tutorial'&&age>=BURN_SECONDS[a])return 'burnt';
 return 'ready';
}
export function cookingFraction(s:KitchenState,a:Appliance):number{
 const food=s[a];return food?Math.max(0,Math.min(1,(s.elapsed-food.startedAt)/COOK_SECONDS[a])):0;
}
export function remainingPatience(s:KitchenState,o:KitchenOrder){return Math.max(0,o.patience-(s.elapsed-o.arrivesAt))}
export function shiftDuration(s:KitchenState){return s.mode==='tutorial'?Infinity:shiftForLevel(s.level).duration}
export function tickKitchen(s:KitchenState,delta:number):KitchenState{
 if(s.status!=='playing'||s.paused||!Number.isFinite(delta)||delta<=0)return s;
 const elapsed=Math.min(shiftDuration(s),s.elapsed+Math.min(2,delta));
 if(s.mode==='tutorial')return {...s,elapsed};
 const orders=s.orders.map(o=>{
  if(o.status==='pending'&&elapsed>=o.arrivesAt)return {...o,status:'waiting' as const};
  if(o.status==='waiting'&&elapsed>=o.arrivesAt+o.patience)return {...o,status:'missed' as const};
  return o;
 }).map(o=>elapsed>=shiftDuration(s)&&(o.status==='waiting'||o.status==='pending')
  ?{...o,status:'missed' as const}:o);
 const missed=orders.filter(o=>o.status==='missed').length;
 const stillWaiting=orders.some(o=>o.id===s.activeOrderId&&o.status==='waiting');
 const activeOrderId=stillWaiting?s.activeOrderId:waiting(orders);
 const liveIds=new Set(orders.filter(o=>o.status==='waiting').map(o=>o.id));
 const done=!orders.some(o=>o.status==='waiting'||o.status==='pending');
 return {...s,elapsed,orders,missed,activeOrderId,
  dish:s.dish.orderId&&!liveIds.has(s.dish.orderId)?emptyDish():s.dish,
  secondDish:s.secondDish.orderId&&!liveIds.has(s.secondDish.orderId)?emptyDish():s.secondDish,
  pot:s.pot&&!liveIds.has(s.pot.orderId)?null:s.pot,
  steamer:s.steamer&&!liveIds.has(s.steamer.orderId)?null:s.steamer,
  status:done?'finished':'playing',
  message:done?'The gong sounds! Mr. Ping has your shift score.':
   missed>s.missed?'A guest has left; their station is clear for the next customer.':s.message};
}
export function toggleKitchenPause(s:KitchenState):KitchenState{
 return s.status==='playing'&&s.mode==='shift'?{...s,paused:!s.paused}:s;
}
export function chooseKitchenOrder(s:KitchenState,id:string):KitchenState{
 if(s.status!=='playing'||s.paused||!orderFor(s,id))return s;
 return {...s,activeOrderId:id,message:'Ticket selected! Any food already cooking keeps going.'};
}
export function recipeComplete(s:KitchenState,slot:0|1=0):boolean{
 const d=boardDish(s,slot),r=dishRecipe(s,slot);
 return !!r&&d.vessel===r.vessel&&[r.cooked,...r.extras].every(x=>d.items.includes(x));
}
export function nextKitchenInstruction(s:KitchenState):string{
 if(s.status==='finished')return 'The shift is over. See how many happy customers you served!';
 const o=activeOrder(s),r=activeRecipe(s);
 if(!o||!r)return 'A new guest is on the way.';
 const slot=([s.dish,s.secondDish] as Dish[]).findIndex(d=>d.orderId===o.id);
 const dish=slot<0?undefined:boardDish(s,slot as 0|1);
 if(!s[r.appliance]&&!dish?.items.includes(r.cooked))return 'Start '+(r.raw==='noodles'?'boiling noodles':'steaming dumplings')+'. You can plate while they cook!';
 if(!dish)return 'Drag '+(r.vessel==='bowl'?'a bowl':'a plate')+' onto either free board.';
 const missing=r.extras.find(x=>!dish.items.includes(x));
 if(missing)return 'Add '+(STOCK.find(x=>x.id===missing)?.name??missing)+' to this plate—before or after cooking.';
 if(!dish.items.includes(r.cooked)){
  if(cookingPhase(s,r.appliance)==='ready')return 'Food is ready! Drag it from the appliance to the matching board.';
  return 'While the main ingredient cooks, prepare the other board or wait for the green meter.';
 }
 return 'Beautiful! Drag your finished dish to the golden serving bell.';
}
function fail(s:KitchenState,msg:string):KitchenState{
 return {...s,mistakes:s.mistakes+(s.mode==='tutorial'?0:1),message:msg};
}
function setBoard(s:KitchenState,slot:0|1,board:Dish):KitchenState{
 return slot===0?{...s,dish:board}:{...s,secondDish:board};
}
export function dropInKitchen(s:KitchenState,source:Source,target:Target):KitchenState{
 if(s.status!=='playing'||s.paused)return s;
 const current=activeOrder(s),recipe=current?RECIPES[current.recipeId]:undefined;
 const slot:0|1=target==='board2'?1:0;
 if(source.kind==='dish'){
  const origin=source.slot??0,d=boardDish(s,origin),owner=orderFor(s,d.orderId);
  if(!d.vessel||!owner)return fail(s,'That serving board is empty.');
  if(target==='bin')return {...setBoard(s,origin,emptyDish()),message:'Serving board cleared.'};
  if(target!=='serve')return fail(s,'The completed dish goes to the serving bell.');
  if(!recipeComplete(s,origin))return fail(s,'That dish is still missing something. Check its ticket!');
  const orders=s.orders.map(o=>o.id===owner.id?{...o,status:'served' as const,servedAt:s.elapsed}:o);
  const earned=s.mode==='tutorial'?0:Math.round(100+remainingPatience(s,owner)*1.4);
  const updated=setBoard({...s,orders,served:s.served+1,score:s.score+earned,
   activeOrderId:s.activeOrderId===owner.id?waiting(orders):s.activeOrderId,
   message:s.mode==='tutorial'?'Perfect bowl! Training complete!':'Order served! +'+earned+' points.'},origin,emptyDish());
  return {...updated,status:orders.some(o=>o.status==='waiting'||o.status==='pending')?'playing':'finished'};
 }
 if(source.kind==='cooker'){
  const food=s[source.appliance],phase=cookingPhase(s,source.appliance);
  if(!food)return fail(s,'No food in that appliance.');
  if(target==='bin')return {...s,[source.appliance]:null,message:'Overcooked batch discarded. Fresh start!'};
  if(target!=='board'&&target!=='board2')return fail(s,'Drag cooked food onto one of the two boards.');
  if(phase==='cooking')return fail(s,'Still cooking! Wait for the meter to glow green.');
  if(phase==='burnt')return fail(s,'This batch is burnt. Put it in the discard basket.');
  const d=boardDish(s,slot),owner=orderFor(s,food.orderId),r=owner&&RECIPES[owner.recipeId];
  if(!r||d.orderId!==food.orderId||d.vessel!==r.vessel)
   return fail(s,'That food belongs to a different ticket or needs its serving bowl.');
  if(d.items.includes(r.cooked))return fail(s,'That dish already has its cooked base.');
  return {...setBoard(s,slot,{...d,items:[...d.items,r.cooked]}),
   [source.appliance]:null,message:'Perfectly cooked! Finish the toppings and serve.'};
 }
 const item=source.ingredient;
 if(target==='bin')return fail(s,'Only prepared food or the finished dish can be discarded.');
 if(!current||!recipe)return {...s,message:'Select a waiting customer ticket first.'};
 if(item==='bowl'||item==='plate'){
  if(target!=='board'&&target!=='board2')return fail(s,'Put the serving bowl or plate onto an empty board.');
  const d=boardDish(s,slot);
  if(d.vessel)return fail(s,'This board is busy. Use the other board.');
  if(item!==recipe.vessel)return fail(s,'This order needs '+(recipe.vessel==='bowl'?'a bowl':'a plate')+'.');
  const other=boardDish(s,slot===0?1:0);
  if(other.orderId===current.id)return fail(s,'This customer already has a dish on the other board.');
  return {...setBoard(s,slot,{vessel:item,orderId:current.id,items:[]}),message:'Great! Plating is ready while the food cooks.'};
 }
 if(item==='noodles'||item==='dumplings'){
  if(target!=='pot'&&target!=='steamer')return fail(s,'Raw main ingredients belong in the pot or steamer.');
  if(item!==recipe.raw||target!==recipe.appliance)return fail(s,'Use the correct cooking station for this order.');
  if(s[target])return fail(s,'That appliance is already cooking another batch.');
  const d=[s.dish,s.secondDish].find(x=>x.orderId===current.id);
  if(d?.items.includes(recipe.cooked))return fail(s,'That ticket already has its main ingredient.');
  return {...s,[target]:{item,orderId:current.id,startedAt:s.elapsed},
   message:'On the fire! You can prepare toppings on either board while you wait.'};
 }
 if(target!=='board'&&target!=='board2')return fail(s,'Garnishes and sauces belong on a serving board.');
 const d=boardDish(s,slot),owner=orderFor(s,d.orderId),r=owner&&RECIPES[owner.recipeId];
 if(!r||!d.vessel)return fail(s,'Put a bowl or plate on this board first.');
 if(!r.extras.includes(item))return fail(s,'That garnish does not belong in this guest’s recipe.');
 if(d.items.includes(item))return fail(s,'Already added that garnish.');
 const next=setBoard(s,slot,{...d,items:[...d.items,item]});
 return {...next,message:recipeComplete(next,slot)?'Dish complete! Ring the serving bell.':'Nice! Keep layering the flavours.'};
}
export type NoodleSave={version:2;tutorialDone:boolean;unlockedLevel:number;
 bestScore:number;bestServed:number;shifts:number;levelStars:Record<string,number>};
export const NOODLE_SAVE_KEY='molly-noodles-of-destiny-v1';
export const defaultNoodleSave=():NoodleSave=>({
 version:2,tutorialDone:false,unlockedLevel:1,bestScore:0,bestServed:0,shifts:0,levelStars:{}
});
export function normalizeNoodleSave(input:unknown):NoodleSave{
 const base=defaultNoodleSave();
 if(!input||typeof input!=='object')return base;
 const p=input as Omit<Partial<NoodleSave>,'version'> & {version?:number};
 const sane=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?Math.floor(n):0;
 if(p.version===1)return {...base,tutorialDone:p.tutorialDone===true,bestScore:sane(p.bestScore),
  bestServed:sane(p.bestServed),shifts:sane(p.shifts)};
 if(p.version!==2)return base;
 const raw=p.levelStars&&typeof p.levelStars==='object'?p.levelStars:{};
 const levelStars:Record<string,number>={};
 for(const l of KITCHEN_LEVELS)levelStars[String(l.id)]=Math.min(l.orders.length,sane(raw[String(l.id)]));
 return {...base,tutorialDone:p.tutorialDone===true,unlockedLevel:Math.max(1,Math.min(8,sane(p.unlockedLevel))),
  bestScore:sane(p.bestScore),bestServed:sane(p.bestServed),shifts:sane(p.shifts),levelStars};
}
export function readNoodleSave():NoodleSave{
 try{return normalizeNoodleSave(JSON.parse(localStorage.getItem(NOODLE_SAVE_KEY)??'null'))}
 catch{return defaultNoodleSave()}
}
export function writeNoodleSave(s:NoodleSave){try{localStorage.setItem(NOODLE_SAVE_KEY,JSON.stringify(s))}catch{/* optional storage */}}
export function levelWon(s:KitchenState):boolean{
 return s.mode==='shift'&&s.status==='finished'&&s.served>=shiftForLevel(s.level).starTarget;
}
export function recordKitchenResult(save:NoodleSave,s:KitchenState):NoodleSave{
 if(s.status!=='finished')return save;
 if(s.mode==='tutorial')return {...save,tutorialDone:true};
 const old=save.levelStars[String(s.level)]??0;
 return {...save,shifts:save.shifts+1,bestScore:Math.max(save.bestScore,s.score),
  bestServed:Math.max(save.bestServed,s.served),
  levelStars:{...save.levelStars,[String(s.level)]:Math.max(s.served,old)},
  unlockedLevel:levelWon(s)?Math.max(save.unlockedLevel,Math.min(8,s.level+1)):save.unlockedLevel};
}
