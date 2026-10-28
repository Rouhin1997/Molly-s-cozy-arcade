/** Eight fair, hand-paced noodle-shop shifts. Kitchen mechanics are in noodleShopV2.ts.
 * The schedule follows estimated human action time plus cooking time and buffer,
 * not artificial time limits that make recipes mathematically impossible.
 */
import type {RecipeId,Guest} from './noodleShopV2';
export type ShiftGuest={recipeId:RecipeId;guest:Guest;arrivesAt:number;patience:number};
export type KitchenLevel={id:number;name:string;subtitle:string;description:string;theme:string;
 orders:readonly ShiftGuest[];duration:number;starTarget:number};
const line=(menu:readonly RecipeId[],guests:readonly Guest[],step:number,patience:number):ShiftGuest[]=>
 menu.map((recipeId,i)=>({recipeId,guest:guests[i%guests.length],arrivesAt:i*step,patience}));
/** Later levels open with a two-ticket rush; the last two levels add a second
 * paired wave. Times are explicit so we can guarantee a break between waves.
 */
const waves=(menu:readonly RecipeId[],guests:readonly Guest[],arrivals:readonly number[],patience:number):ShiftGuest[]=>{
 if(menu.length!==arrivals.length)throw new Error('Order schedule must include one arrival for every recipe.');
 return menu.map((recipeId,i)=>({recipeId,guest:guests[i%guests.length],arrivesAt:arrivals[i],patience}));
};
export const KITCHEN_LEVELS:readonly KitchenLevel[]=[
 {id:1,name:'First Bell',subtitle:'The kitchen wakes up',theme:'jade',
  description:'Three gentle orders. Practice noodles, dumplings and the serving bell.',
  orders:line(['garden','dumpling','mushroom'],['rabbit','monkey','tigress'],25,110),duration:180,starTarget:2},
 {id:2,name:'Bamboo Breakfast',subtitle:'Fresh greens & lively guests',theme:'bamboo',
  description:'More colourful toppings. Try preparing a garnish while the noodles boil.',
  orders:line(['garden','jade','dumpling'],['rabbit','monkey','po'],24,104),duration:175,starTarget:2},
 {id:3,name:'The Jade Market',subtitle:'Two boards, one busy kitchen',theme:'market',
  description:'Four orders and two plating boards. Balance the pot and steamer.',
  orders:line(['mushroom','dumpling','jade','sesame'],['tigress','rabbit','monkey','po'],23,100),duration:196,starTarget:3},
 {id:4,name:'Lantern Festival',subtitle:'The evening crowd arrives',theme:'lantern',
  description:'Two guests arrive together! Start noodles and dumplings side by side.',
  orders:waves(['fire','sesame','garden','dumpling'],['monkey','tigress','rabbit','po'],[0,0,50,74],96),duration:191,starTarget:3},
 {id:5,name:'Five-Style Feast',subtitle:'A parade of delicious requests',theme:'festival',
  description:'Open with two orders, then keep your cooking rhythm as guests arrive.',
  orders:waves(['jade','dumpling','fire','mushroom','fiveSpice'],['rabbit','po','monkey','tigress'],[0,0,51,74,97],93),duration:215,starTarget:4},
 {id:6,name:'The Master’s Table',subtitle:'The masters come for dinner',theme:'temple',
  description:'Two masters order together. Use both appliances and both boards.',
  orders:waves(['fiveSpice','sesame','fire','jade','dumpling'],['tigress','monkey','rabbit','po','tigress'],[0,0,50,72,94],90),duration:213,starTarget:4},
 {id:7,name:'Dragon Lantern Night',subtitle:'A special evening service',theme:'dragon',
  description:'Two gentle waves of paired orders, with breathing room between them.',
  orders:waves(['garden','dumpling','fire','sesame','jade','fiveSpice'],['rabbit','tigress','monkey','po'],[0,0,55,55,112,135],88),duration:232,starTarget:5},
 {id:8,name:'The Dragon Chef',subtitle:'Grand finale · the Valley celebrates',theme:'gold',
  description:'A grand feast with two pairs of simultaneous orders—and the Dragon Chef reward.',
  orders:waves(['fiveSpice','dragon','jade','sesame','fire','dumpling'],['po','tigress','monkey','rabbit'],[0,0,58,58,116,140],86),duration:230,starTarget:5}
];
export function shiftForLevel(level:number):KitchenLevel{
 return KITCHEN_LEVELS[Math.min(7,Math.max(0,Math.floor(level||1)-1))];
}
/** Estimated motor/decision time includes modest drag travel, reading and two mobile taps per action. */
export function estimateOrderSeconds(extraCount:number,cookSeconds:number):number{
 return Math.ceil(8+extraCount*3.2+cookSeconds+5);
}
export function minimumSafePatience(extraCount:number,cookSeconds:number):number{
 return Math.ceil(estimateOrderSeconds(extraCount,cookSeconds)*2.5);
}
export function validateShiftSchedule(level:KitchenLevel,workloads:Record<RecipeId,{extras:number;cook:number}>):string[]{
 const errors:string[]=[];
 if(!level.orders.length)errors.push('No orders');
 if(level.duration<=0)errors.push('Invalid duration');
 for(let i=0;i<level.orders.length;i++){
  const o=level.orders[i],work=workloads[o.recipeId];
  if(!work){errors.push('Unknown recipe '+o.recipeId);continue}
  if(o.patience<minimumSafePatience(work.extras,work.cook))
   errors.push('Insufficient patience for order '+i);
  if(o.arrivesAt+o.patience>level.duration)
   errors.push('Shift ends before individual patience for order '+i);
  if(i&&o.arrivesAt<level.orders[i-1].arrivesAt)errors.push('Arrivals not sorted');
  if(i>=2&&o.arrivesAt===level.orders[i-1].arrivesAt&&o.arrivesAt===level.orders[i-2].arrivesAt)
   errors.push('More than two orders arrive simultaneously');
 }
 // Two tickets at once must still be solvable sequentially with some slack,
 // even if a player never actually uses both appliances concurrently.
 for(let i=1;i<level.orders.length;i++){
  const first=level.orders[i-1],second=level.orders[i];
  if(first.arrivesAt!==second.arrivesAt)continue;
  const a=workloads[first.recipeId],b=workloads[second.recipeId];
  if(a&&b){
   const sequentialTime=estimateOrderSeconds(a.extras,a.cook)+estimateOrderSeconds(b.extras,b.cook)+12;
   if(sequentialTime>Math.min(first.patience,second.patience))
    errors.push('Simultaneous orders need more shared preparation time at index '+i);
  }
 }
 return errors;
}
