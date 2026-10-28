/** Eight fair, hand-paced noodle-shop shifts. Kitchen mechanics are in noodleShop.ts.
 * The schedule follows estimated human action time plus cooking time and buffer,
 * not artificial time limits that make recipes mathematically impossible.
 */
import type {RecipeId,Guest} from './noodleShopV2';
export type ShiftGuest={recipeId:RecipeId;guest:Guest;arrivesAt:number;patience:number};
export type KitchenLevel={id:number;name:string;subtitle:string;description:string;theme:string;
 orders:readonly ShiftGuest[];duration:number;starTarget:number};
const line=(menu:readonly RecipeId[],guests:readonly Guest[],step:number,patience:number):ShiftGuest[]=>
 menu.map((recipeId,i)=>({recipeId,guest:guests[i%guests.length],arrivesAt:i*step,patience}));
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
  description:'Warm lanterns and new aromas. Keep both boards ready.',
  orders:line(['fire','garden','sesame','dumpling'],['monkey','tigress','rabbit','po'],23,96),duration:191,starTarget:3},
 {id:5,name:'Five-Style Feast',subtitle:'A parade of delicious requests',theme:'festival',
  description:'Five guests and clever timing. No frantic clicking required.',
  orders:line(['jade','fire','dumpling','mushroom','fiveSpice'],['rabbit','po','monkey','tigress'],23,93),duration:215,starTarget:4},
 {id:6,name:'The Master’s Table',subtitle:'The masters come for dinner',theme:'temple',
  description:'Steaming and plating overlap as more orders arrive.',
  orders:line(['fiveSpice','sesame','fire','jade','dumpling'],['tigress','monkey','rabbit','po','tigress'],22,90),duration:213,starTarget:4},
 {id:7,name:'Dragon Lantern Night',subtitle:'A special evening service',theme:'dragon',
  description:'Six happy guests. Choose which plate to prepare first.',
  orders:line(['garden','fire','jade','dumpling','sesame','fiveSpice'],['rabbit','tigress','monkey','po'],22,88),duration:232,starTarget:5},
 {id:8,name:'The Dragon Chef',subtitle:'Grand finale · the Valley celebrates',theme:'gold',
  description:'Six varied orders. Serve the whole Valley to earn Molly’s special kitchen coupon.',
  orders:line(['fiveSpice','jade','sesame','fire','dumpling','dragon'],['po','tigress','monkey','rabbit'],22,86),duration:230,starTarget:5}
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
  if(i&&o.arrivesAt<=level.orders[i-1].arrivesAt)errors.push('Arrivals not increasing');
 }
 return errors;
}
