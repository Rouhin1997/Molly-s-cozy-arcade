/** Molly chooses ONE real birthday promise after completing all three chapters.
 * Each year gets a separate browser-local record. Creator previews never issue a live coupon.
 */
export const birthdayGiftOptions=[
 {id:'snackbox',icon:'🧺',eyebrow:'THE COZY PICK',title:'Holiday Snackbox',
  description:'A festive box of snacks and little treats, put together especially for you.'},
 {id:'movie',icon:'🎬',eyebrow:'THE BIG-SCREEN PICK',title:'Movie Experience of Your Choice',
  description:'You choose the movie and the outing. I’ll treat you to your own cinema experience.'},
 {id:'makeover',icon:'💅',eyebrow:'THE GLOW-UP PICK',title:'Fund My Makeover',
  description:'Your choice of makeover treats: hair colour or highlights, mani-pedi, laser appointments or another glow-up. We’ll plan the details together.'}
] as const;
export type BirthdayGiftId=typeof birthdayGiftOptions[number]['id'];
export type BirthdayCoupon={version:1;eventYear:number;giftId:BirthdayGiftId;issuedAt:string;redeemedAt:string|null};
export const BIRTHDAY_GIFT_YEAR=2026;
export function birthdayCouponKey(beta:boolean,year=BIRTHDAY_GIFT_YEAR):string{
 return 'molly-birthday-coupon-'+(beta?'beta':'live')+'-'+year+'-v1';
}
export function isBirthdayGiftId(value:unknown):value is BirthdayGiftId{
 return birthdayGiftOptions.some(g=>g.id===value);
}
export function normalizeBirthdayCoupon(raw:unknown,year=BIRTHDAY_GIFT_YEAR):BirthdayCoupon|null{
 if(!raw||typeof raw!=='object')return null;
 const r=raw as Partial<BirthdayCoupon>;
 if(r.version!==1||r.eventYear!==year||!isBirthdayGiftId(r.giftId)||
  typeof r.issuedAt!=='string'||!Number.isFinite(Date.parse(r.issuedAt)))return null;
 if(r.redeemedAt!==null&&r.redeemedAt!==undefined&&typeof r.redeemedAt!=='string')return null;
 const issued=Date.parse(r.issuedAt);
 const redeemed=r.redeemedAt?Date.parse(r.redeemedAt):null;
 if(redeemed!==null&&(!Number.isFinite(redeemed)||redeemed<issued))return null;
 return {version:1,eventYear:year,giftId:r.giftId,issuedAt:new Date(issued).toISOString(),
  redeemedAt:redeemed===null?null:new Date(redeemed).toISOString()};
}
export function readBirthdayCoupon(beta=false,year=BIRTHDAY_GIFT_YEAR):BirthdayCoupon|null{
 try{return normalizeBirthdayCoupon(JSON.parse(localStorage.getItem(birthdayCouponKey(beta,year))??'null'),year)}
 catch{return null}
}
export function writeBirthdayCoupon(coupon:BirthdayCoupon,beta=false):boolean{
 try{
  const key=birthdayCouponKey(beta,coupon.eventYear);
  localStorage.setItem(key,JSON.stringify(coupon));
  return localStorage.getItem(key)===JSON.stringify(coupon);
 }catch{return false}
}
/** Issuing another gift cannot replace the first; a claimed gift remains claimed. */
export function issueBirthdayCoupon(existing:BirthdayCoupon|null,giftId:BirthdayGiftId,at=new Date(),year=BIRTHDAY_GIFT_YEAR):BirthdayCoupon{
 if(existing)return existing;
 return {version:1,eventYear:year,giftId,issuedAt:at.toISOString(),redeemedAt:null};
}
export function redeemBirthdayCoupon(coupon:BirthdayCoupon,at=new Date()):BirthdayCoupon{
 if(coupon.redeemedAt||at.getTime()<Date.parse(coupon.issuedAt))return coupon;
 return {...coupon,redeemedAt:at.toISOString()};
}
