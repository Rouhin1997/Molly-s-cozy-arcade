import { bestAward } from './passport';
import {pinkChallengeFor,pinkEncoreVariants,pinkSetlist,type PinkChallenge} from '../data/pinkRush';

export const PINK_STORAGE_KEY='mollys-pink-rush-v1';
export const PINK_REDEEMED_MARKER='mollys-pink-rush-redeemed-v1';
export type CouponGift='choreo'|'sing'|'lisa';
export const couponGifts:Record<CouponGift,{icon:string;title:string;description:string}>={
 choreo:{icon:'💃',title:'Teach Rouhin a BLACKPINK choreo',description:'Pick a BLACKPINK or solo-member song and teach Rouhin a short choreography. He has to give it his best shot!'},
 sing:{icon:'🎶',title:'Make Rouhin sing a song',description:'Choose a BLACKPINK or member-solo song for Rouhin to sing for you. Expect enthusiasm and possibly questionable pitch.'},
 lisa:{icon:'👑',title:'The 60-second Lisa speech',description:'Rouhin must deliver a one-minute speech praising how absolutely amazing Lisa is. No underwhelming compliments allowed.'},
};
export type PinkCoupon={
 status:'locked'|'ready'|'active'|'seeking'|'redeemed';
 chosen?:CouponGift;selectedCard?:number;
 drawSeed?:string;redeemedAt?:string;
};
export type PinkRound={
 id:string;status:'playing'|'won';mistakes:number;picks:string[];
 score:number;note:string;seenPattern:boolean;
};
export type PinkSession={
 id:string;seed:string;plan:string[];index:number;rounds:Record<string,PinkRound>;
 completed:boolean;
};
export type PinkStats={
 showsFinished:number;roundsSolved:number;stars:number;bestShow:number;perfectShows:number;
};
export type PinkProgress={
 version:1;daily:Record<string,PinkSession>;practice:PinkSession|null;
 sessionNumber:number;bestAwards:Record<string,number>;stats:PinkStats;
 /** Rotating practice history, separate from best-score awards. */
 recentPractice?:string[];
 coupon?:PinkCoupon;
};
export function freshPinkProgress():PinkProgress{
 return {version:1,daily:{},practice:null,sessionNumber:0,bestAwards:{},recentPractice:[],
  stats:{showsFinished:0,roundsSolved:0,stars:0,bestShow:0,perfectShows:0},
  coupon:{status:'locked'}};
}
export function newPinkRound(id:string):PinkRound{
 return {id,status:'playing',mistakes:0,picks:[],score:0,note:'The spotlight is waiting. Show everyone what a BLINK knows!',seenPattern:false};
}
export function newPinkSession(seed:string,id:string):PinkSession{
 return {id,seed,plan:pinkSetlist(seed),index:0,rounds:{},completed:false};
}
export function pinkDailySession(date:string):PinkSession{return newPinkSession(date,'daily-'+date);}
export function pinkNextPractice(p:PinkProgress):PinkProgress{
 const number=p.sessionNumber+1;
 const recent=p.recentPractice??[];
 const old=p.practice?.plan??[];
 const updated=[...recent,...old].slice(-120);
 const seed='practice-'+number,plan=pinkSetlist(seed,updated);
 return {...p,sessionNumber:number,recentPractice:updated,
   practice:{id:seed,seed,plan,index:0,rounds:{},completed:false}};
}
export function getActivePinkRound(s:PinkSession):PinkRound|null{
 if(s.index>=s.plan.length)return null;
 const id=s.plan[s.index];return s.rounds[id]??newPinkRound(id);
}
export function pinkRoundScore(mistakes:number){return Math.max(22,60-mistakes*9);}
function finish(r:PinkRound,note:string):PinkRound{
 return {...r,status:'won',picks:[],score:pinkRoundScore(r.mistakes),note};
}
export function choosePink(r:PinkRound,q:PinkChallenge,value:string):PinkRound{
 if(r.status!=='playing'||r.id!==q.id)return r;
 if(q.kind==='encore'){
  const next=Number(value);
  if(!Number.isInteger(next)||next<0||next>3)return r;
  const pattern=q.answer.split('-').map(Number),expected=pattern[r.picks.length];
  if(next!==expected)return {...r,mistakes:r.mistakes+1,picks:[],note:'Oops—a spotlight went out! Rebuild the beat. The stage remembers your comeback. 🖤'};
  const picks=[...r.picks,value];
  return picks.length===pattern.length?finish({...r,picks},q.explanation):
    {...r,picks,note:'Right beat! '+picks.length+' / '+pattern.length+' lights remembered.'};
 }
 if(!q.options.includes(value))return r;
 if(q.kind==='era'){
  if(r.picks.includes(value))return r;
  const picks=[...r.picks,value];
  if(picks.length<3)return {...r,picks,note:'Era '+picks.length+' / 3 placed. What came next?'};
  if(picks.join('→')===q.answer)return finish({...r,picks},q.explanation);
  return {...r,mistakes:r.mistakes+1,picks:[],note:'Not quite the timeline—the previous spotlight fades. Win it back and return to this era.'};
 }
 if(value===q.answer)return finish(r,q.explanation);
 return {...r,mistakes:r.mistakes+1,note:'That was a miss! One spotlight goes dark; make a comeback and win it back.'};
}
export function pinkRevealHint(r:PinkRound,q:PinkChallenge):PinkRound{
 if(r.status!=='playing'||r.seenPattern||q.kind!=='encore')return r;
 return {...r,seenPattern:true,note:'Watch and repeat the colour sequence. Replay is always available.'};
}
function awardId(s:PinkSession,id:string){
 return s.id.startsWith('daily-')?'pink:'+s.id+':'+id:'pink:'+id;
}
export function applyPinkRound(p:PinkProgress,mode:'daily'|'practice',date:string,
 change:(r:PinkRound,q:PinkChallenge)=>PinkRound):PinkProgress{
 const s=mode==='daily'?(p.daily[date]??pinkDailySession(date)):p.practice;
 if(!s||s.completed||s.index>=s.plan.length)return p;
 const id=s.plan[s.index],q=pinkChallengeFor(id);
 const before=s.rounds[id]??newPinkRound(id),after=change(before,q);
 if(after===before)return p;
 const mistake=after.mistakes>before.mistakes;
 const rounds={...s.rounds,[id]:after};
 let index=s.index;
 if(mistake&&index>0){
  // A wrong answer physically knocks out the previous light. The player
  // must clear that previous round again to return here. Award keys guard
  // against farming its points. Current attempt is preserved.
  index--;
  const previous=s.plan[index];
  rounds[previous]=newPinkRound(previous);
 }
 const revised={...s,index,rounds};
 let stats=p.stats,bestAwards=p.bestAwards;
 if(before.status==='playing'&&after.status==='won'){
  const key=awardId(s,id),first=(bestAwards[key]??0)===0;
  const award=bestAward(bestAwards,key,after.score);
  bestAwards=award.awards;
  stats={...stats,stars:stats.stars+award.delta,roundsSolved:stats.roundsSolved+(first?1:0)};
 }
 return {...p,stats,bestAwards,...(mode==='daily'?{daily:{...p.daily,[date]:revised}}:{practice:revised})};
}
export function pinkShowScore(s:PinkSession):number{
 return s.plan.reduce((a,id)=>a+(s.rounds[id]?.score??0),0);
}
export function advancePink(p:PinkProgress,mode:'daily'|'practice',date:string):PinkProgress{
 const s=mode==='daily'?(p.daily[date]??pinkDailySession(date)):p.practice;
 if(!s||s.completed||s.index>=s.plan.length)return p;
 if(s.rounds[s.plan[s.index]]?.status!=='won')return p;
 const index=s.index+1,completed=index===s.plan.length;
 const revised={...s,index,completed};
 const score=pinkShowScore(revised);
 let stats=p.stats,coupon=p.coupon??{status:'locked' as const};
 if(completed){
  stats={...stats,showsFinished:stats.showsFinished+1,
   bestShow:Math.max(stats.bestShow,score),
   perfectShows:stats.perfectShows+(score===60*s.plan.length?1:0)};
  if(coupon.status==='locked'||coupon.status==='seeking')
   coupon={status:'ready',drawSeed:s.id+':'+stats.showsFinished};
 }
 return {...p,stats,coupon,...(mode==='daily'?{daily:{...p.daily,[date]:revised}}:{practice:revised})};
}
function simpleHash(s:string):number{
 let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);
 return h>>>0;
}
/** Three hidden positions in different order after each eligibility event. */
export function pinkMysteryCards(p:PinkProgress):CouponGift[]{
 const seed=p.coupon?.drawSeed??'locked';
 const start=simpleHash(seed)%3;
 const reverse=(simpleHash('flip:'+seed)&1)!==0;
 const all:CouponGift[]=['choreo','sing','lisa'];
 return Array.from({length:3},(_,i)=>all[(start+(reverse?3-i:i))%3]);
}
export function choosePinkCoupon(p:PinkProgress,card:number):PinkProgress{
 const c=p.coupon;
 if(c?.status!=='ready'||![0,1,2].includes(card))return p;
 return {...p,coupon:{...c,status:'active',selectedCard:card,chosen:pinkMysteryCards(p)[card]}};
}
/** Explicitly forfeit the existing coupon and earn the next blind draw by
 * completing a genuinely new full show. Previously completed shows do not count. */
export function pinkReplaceCoupon(p:PinkProgress):PinkProgress{
 if(p.coupon?.status!=='active')return p;
 return {...p,coupon:{status:'seeking'}};
}
export function redeemPinkCoupon(p:PinkProgress,now:string=new Date().toISOString()):PinkProgress{
 if(p.coupon?.status!=='active'||!p.coupon.chosen)return p;
 return {...p,coupon:{...p.coupon,status:'redeemed',redeemedAt:now}};
}
export function normalizePinkProgress(p:PinkProgress,localLock?:PinkCoupon|null):PinkProgress{
 const clean={...p,sessionNumber:p.sessionNumber??0,practice:p.practice??null,
  bestAwards:p.bestAwards??{},recentPractice:p.recentPractice??[],coupon:p.coupon??{status:'locked' as const}};
 // A browser-local redemption marker wins over imported/older backups.
 return localLock?.status==='redeemed'?{...clean,coupon:localLock}:clean;
}
function localRedeemedMarker():PinkCoupon|null{
 try{
  const raw=localStorage.getItem(PINK_REDEEMED_MARKER);
  const c=raw?JSON.parse(raw) as PinkCoupon:null;
  return c?.status==='redeemed'&&c.chosen?c:null;
 }catch{return null;}
}
export function reconcilePinkImport(imported:PinkProgress,current:PinkProgress):PinkProgress{
 // A redeemed reward must not be reinstated by restoring an old Passport.
 const lock=current.coupon?.status==='redeemed'?current.coupon:localRedeemedMarker();
 return normalizePinkProgress(imported,lock);
}
export function readPinkProgress():PinkProgress{
 try{
  const raw=localStorage.getItem(PINK_STORAGE_KEY);
  const c=localRedeemedMarker();
  if(!raw)return normalizePinkProgress(freshPinkProgress(),c);
  const p=JSON.parse(raw) as PinkProgress;
  if(p?.version!==1||!p.stats||!p.daily||typeof p.stats.stars!=='number')
   return normalizePinkProgress(freshPinkProgress(),c);
  return normalizePinkProgress(p,c);
 }catch{return freshPinkProgress();}
}
export function writePinkProgress(p:PinkProgress){
 try{
  if(p.coupon?.status==='redeemed')localStorage.setItem(PINK_REDEEMED_MARKER,JSON.stringify(p.coupon));
  localStorage.setItem(PINK_STORAGE_KEY,JSON.stringify(normalizePinkProgress(p,localRedeemedMarker())));
 }catch{/* playable without persistent local storage */}
}
export function pinkConsistencyIssues(p:PinkProgress):string[]{
 const issues:string[]=[];
 for(const s of [...Object.values(p.daily),...(p.practice?[p.practice]:[])]){
  if((s.plan.length!==8&&s.plan.length!==12)||new Set(s.plan).size!==s.plan.length)issues.push(s.id+': bad setlist');
  if(s.index<0||s.index>s.plan.length)issues.push(s.id+': invalid index');
  if(s.completed!==(s.index===s.plan.length))issues.push(s.id+': status mismatch');
  for(const [id,r] of Object.entries(s.rounds)){
   if(!s.plan.includes(id)||id!==r.id)issues.push(s.id+': stray round');
   if(r.status==='won'&&r.score!==pinkRoundScore(r.mistakes))issues.push(s.id+': score mismatch');
  }
 }
 const c=p.coupon??{status:'locked'};
 if((c.status==='active'||c.status==='redeemed')&&!c.chosen)issues.push('coupon missing choice');
 if(c.status==='redeemed'&&!c.redeemedAt)issues.push('coupon missing redemption date');
 return issues;
}
export function pinkEncorePattern(id:string):readonly number[]{
 const n=Number(id.slice('encore-'.length));
 if(!id.startsWith('encore-')||!pinkEncoreVariants[n])throw Error('Unknown encore '+id);
 return pinkEncoreVariants[n];
}
