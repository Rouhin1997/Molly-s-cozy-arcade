/** Molly's one-time Dragon Chef reward.
 * Two real-world cooking promises (ramen OR soup dumplings), valid for
 * three calendar months from first award. Replaying cannot renew the term.
 * Local wallet record; no money/payment or external redemption service.
 */
export type NoodleDishChoice='ramen'|'soup-dumplings';
export type NoodleClaim={dish:NoodleDishChoice;at:string};
export type NoodleCoupon={version:1;awardedAt:string;claims:NoodleClaim[]};
export const NOODLE_COUPON_KEY='molly-noodle-chef-coupon-v1';
export function threeMonthsLater(iso:string):Date{
 const d=new Date(iso);if(!Number.isFinite(d.getTime()))return new Date(NaN);
 const y=d.getUTCFullYear(),m=d.getUTCMonth()+3,day=d.getUTCDate();
 const first=new Date(Date.UTC(y,m,1,d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds()));
 const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();
 first.setUTCDate(Math.min(day,last));
 return first;
}
export function normalizeNoodleCoupon(raw:unknown):NoodleCoupon|null{
 if(!raw||typeof raw!=='object')return null;
 const r=raw as Partial<NoodleCoupon>;
 if(r.version!==1||typeof r.awardedAt!=='string'||!Number.isFinite(Date.parse(r.awardedAt)))return null;
 if(!Array.isArray(r.claims))return null;
 const expire=threeMonthsLater(r.awardedAt).getTime(),start=Date.parse(r.awardedAt);
 const claims:NoodleClaim[]=[];
 for(const c of r.claims){
  if(!c||!['ramen','soup-dumplings'].includes(c.dish)||typeof c.at!=='string')continue;
  const when=Date.parse(c.at);
  if(!Number.isFinite(when)||when<start||when>=expire||claims.length>=2)continue;
  claims.push({dish:c.dish,at:new Date(when).toISOString()});
 }
 return {version:1,awardedAt:new Date(start).toISOString(),claims};
}
export function readNoodleCoupon():NoodleCoupon|null{
 try{return normalizeNoodleCoupon(JSON.parse(localStorage.getItem(NOODLE_COUPON_KEY)??'null'))}
 catch{return null}
}
export function writeNoodleCoupon(c:NoodleCoupon){
 try{localStorage.setItem(NOODLE_COUPON_KEY,JSON.stringify(c))}catch{/* no storage */ }
}
export function awardNoodleCoupon(existing:NoodleCoupon|null,at=new Date()):NoodleCoupon{
 return existing??{version:1,awardedAt:at.toISOString(),claims:[]};
}
export function couponRemaining(c:NoodleCoupon|null,now=new Date()):number{
 if(!c||now.getTime()>=threeMonthsLater(c.awardedAt).getTime()||now.getTime()<Date.parse(c.awardedAt))return 0;
 return Math.max(0,2-c.claims.length);
}
export function redeemNoodleCoupon(c:NoodleCoupon|null,dish:NoodleDishChoice,now=new Date()):NoodleCoupon|null{
 if(!c||couponRemaining(c,now)===0||!['ramen','soup-dumplings'].includes(dish))return null;
 return {...c,claims:[...c.claims,{dish,at:now.toISOString()}]};
}
