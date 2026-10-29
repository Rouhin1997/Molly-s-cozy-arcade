/** Seasonal event clocks in the arcade's chosen calendar zone.
 * The Halloween beta is available only on the local date 31 October in Italy.
 * All decisions recompute from Date; a page left open cannot extend access.
 *
 * This client-side clock is adequate for a personal beta, not fraud-proof:
 * server-authoritative time and an account database will be needed for
 * commercially valuable rewards.
 */
export const ARCADE_TIME_ZONE='Europe/Rome';
const romeClock=new Intl.DateTimeFormat('en-GB',{
 timeZone:ARCADE_TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit',
 hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'
});
export type RomeClock={year:number;month:number;day:number;hour:number;minute:number;second:number};
export function romeParts(at:Date):RomeClock{
 const p=Object.fromEntries(romeClock.formatToParts(at).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
 return {year:p.year,month:p.month,day:p.day,hour:p.hour,minute:p.minute,second:p.second};
}
export function romeDateKey(at:Date):string{
 const {year,month,day}=romeParts(at);
 return [year,String(month).padStart(2,'0'),String(day).padStart(2,'0')].join('-');
}
/** Convert midnight at a Rome local calendar date to UTC, including DST transitions.
 * Iterate to resolve offset rather than assuming CET is always UTC+1.
 */
export function romeMidnightUtc(year:number,month:number,day:number):Date{
 const desired=Date.UTC(year,month-1,day);
 let guess=desired;
 for(let i=0;i<4;i++){
  const p=romeParts(new Date(guess));
  const observed=Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);
  const difference=observed-desired;
  guess-=difference;
  if(difference===0)break;
 }
 return new Date(guess);
}
export type HalloweenWindow={year:number;start:Date;end:Date;active:boolean};
export function halloweenWindow(now=new Date(),year=romeParts(now).year):HalloweenWindow{
 const start=romeMidnightUtc(year,10,31);
 const end=romeMidnightUtc(year,11,1);
 return {year,start,end,active:now>=start&&now<end};
}
export function isHalloweenLive(now=new Date()):boolean{return halloweenWindow(now).active}
export function currentHalloweenDeadline(now=new Date()):Date{
 return halloweenWindow(now).end;
}
export function nextAnnualRomeDate(month:number,day:number,now=new Date()):Date{
 const local=romeParts(now);
 const thisYear=romeMidnightUtc(local.year,month,day);
 return romeDateKey(now)>[local.year,String(month).padStart(2,'0'),String(day).padStart(2,'0')].join('-')
  ?romeMidnightUtc(local.year+1,month,day):thisYear;
}
/** Friday 24 – Thursday 30 December in Italy; proposed Christmas event week.
 * Dates are an editorial roadmap, NOT an implemented Christmas unlock.
 */
export function christmasWeekStart(now=new Date()):Date{return nextAnnualRomeDate(12,24,now)}
