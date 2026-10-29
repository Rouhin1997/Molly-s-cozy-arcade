import {halloweenWindow,isHalloweenLive,romeParts} from './seasonalEvents';

/** Completely fictional voucher to rehearse birthday/Christmas reward systems.
 * No money, goods or real-world service can be claimed with this beta coupon.
 */
export const HALLOWEEN_TEST_VOUCHER_KEY='molly-halloween-heist-beta-v1';
export type HalloweenTestVoucher={
 version:1;eventYear:number;awardedAt:string;redeemedAt:string|null;
};
export function normalizeHalloweenVoucher(raw:unknown):HalloweenTestVoucher|null{
 if(!raw||typeof raw!=='object')return null;
 const r=raw as Partial<HalloweenTestVoucher>;
 if(r.version!==1||typeof r.eventYear!=='number'||!Number.isInteger(r.eventYear)||
  r.eventYear<2026||r.eventYear>2100||typeof r.awardedAt!=='string')return null;
 const awarded=new Date(r.awardedAt),win=halloweenWindow(awarded,r.eventYear);
 if(!Number.isFinite(awarded.getTime())||!win.active)return null;
 if(r.redeemedAt!==null&&r.redeemedAt!==undefined&&typeof r.redeemedAt!=='string')return null;
 const redeemed=r.redeemedAt?new Date(r.redeemedAt):null;
 if(redeemed&&(!Number.isFinite(redeemed.getTime())||!halloweenWindow(redeemed,r.eventYear).active||
  redeemed<awarded))return null;
 return {version:1,eventYear:r.eventYear,awardedAt:awarded.toISOString(),
  redeemedAt:redeemed?.toISOString()??null};
}
export function readHalloweenVoucher():HalloweenTestVoucher|null{
 try{return normalizeHalloweenVoucher(JSON.parse(localStorage.getItem(HALLOWEEN_TEST_VOUCHER_KEY)??'null'))}
 catch{return null}
}
export function writeHalloweenVoucher(v:HalloweenTestVoucher):void{
 try{localStorage.setItem(HALLOWEEN_TEST_VOUCHER_KEY,JSON.stringify(v))}catch{/* local storage optional */}
}
export function awardHalloweenVoucher(existing:HalloweenTestVoucher|null,now=new Date()):HalloweenTestVoucher|null{
 if(!isHalloweenLive(now))return null;
 const year=romeParts(now).year;
 if(existing?.eventYear===year)return existing;
 return {version:1,eventYear:year,awardedAt:now.toISOString(),redeemedAt:null};
}
export function redeemHalloweenVoucher(v:HalloweenTestVoucher|null,now=new Date()):HalloweenTestVoucher|null{
 if(!v||v.redeemedAt||!halloweenWindow(now,v.eventYear).active||
  now<new Date(v.awardedAt))return null;
 return {...v,redeemedAt:now.toISOString()};
}
export type HalloweenVoucherState='not-earned'|'available'|'redeemed'|'expired';
export function halloweenVoucherState(v:HalloweenTestVoucher|null,now=new Date()):HalloweenVoucherState{
 if(!v)return 'not-earned';
 if(v.redeemedAt)return 'redeemed';
 return halloweenWindow(now,v.eventYear).active?'available':'expired';
}
