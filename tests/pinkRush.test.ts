import {describe,it,expect,vi} from 'vitest';
import {pinkChallengeFor,pinkEncoreVariants,pinkQuestionPool,pinkQuestionIssues,pinkSetlist,pinkTrackQuestions,pinkSpotQuestions,pinkEraQuestions,pinkFanQuestions} from '../src/data/pinkRush';
import {
 freshPinkProgress,newPinkRound,pinkDailySession,pinkNextPractice,choosePink,
 applyPinkRound,advancePink,pinkShowScore,pinkConsistencyIssues,pinkEncorePattern,
 readPinkProgress,writePinkProgress,pinkRoundScore,
 pinkMysteryCards,choosePinkCoupon,pinkReplaceCoupon,redeemPinkCoupon,reconcilePinkImport,
 PINK_REDEEMED_MARKER,
 type PinkProgress
} from '../src/lib/pinkRush';
const date='2026-10-22';
function answerRound(id:string,oneMistake=false){
 const q=pinkChallengeFor(id);
 let r=newPinkRound(id);
 if(oneMistake){
  if(q.kind==='era'){
   const reversed=q.answer.split('→').reverse();
   for(const item of reversed)r=choosePink(r,q,item);
  }else if(q.kind==='encore')r=choosePink(r,q,String((pinkEncorePattern(id)[0]+1)%4));
  else r=choosePink(r,q,q.options.find(x=>x!==q.answer)!);
 }
 if(q.kind==='era')for(const item of q.answer.split('→'))r=choosePink(r,q,item);
 else if(q.kind==='encore')for(const n of pinkEncorePattern(id))r=choosePink(r,q,String(n));
 else r=choosePink(r,q,q.answer);
 return r;
}
function finishShow(start:PinkProgress,mode:'daily'|'practice',day=date){
 let p=start;
 const s=mode==='daily'?(p.daily[day]??pinkDailySession(day)):p.practice!;
 for(let n=s.index;n<s.plan.length;n++){
  const q=pinkChallengeFor(s.plan[n]);
  const choices=q.kind==='era'?q.answer.split('→'):q.kind==='encore'?
    pinkEncorePattern(q.id).map(String):[q.answer];
  for(const value of choices)p=applyPinkRound(p,mode,day,(r,c)=>choosePink(r,c,value));
  const active=mode==='daily'?p.daily[day]:p.practice!;
  expect(active.rounds[s.plan[n]].status).toBe('won');
  p=advancePink(p,mode,day);
 }
 return p;
}
describe('Pink Rush 2.0: BLINK fan festival content',()=>{
 it('has 70 source-backed questions spanning the band, solo artists, pets and fashion',()=>{
  expect(pinkTrackQuestions.length).toBe(20);
  expect(pinkSpotQuestions.length).toBe(12);
  expect(pinkEraQuestions.length).toBe(8);
  expect(pinkFanQuestions.length).toBeGreaterThanOrEqual(28);
  expect(pinkQuestionIssues()).toEqual([]);
  expect(pinkQuestionPool.some(q=>q.id==='fan-goals-song')).toBe(true);
  expect(pinkQuestionPool.some(q=>q.id==='fan-labubu')).toBe(true);
  expect(pinkQuestionPool.some(q=>q.id==='fan-dalgom')).toBe(true);
  expect(pinkQuestionPool.every(q=>q.source.startsWith('https://'))).toBe(true);
 });
 it('creates unique twelve-act shows with the fan-life questions now dominant',()=>{
  for(const seed of [date,'practice-1','practice-2','practice-45','2026-11-13']){
   const plan=pinkSetlist(seed);
   expect(plan).toEqual(pinkSetlist(seed));
   expect(plan).toHaveLength(12);
   expect(new Set(plan).size).toBe(12);
   expect(plan.filter(id=>id.startsWith('track-'))).toHaveLength(2);
   expect(plan.filter(id=>id.startsWith('era-'))).toHaveLength(1);
   expect(plan.filter(id=>id.startsWith('spot-'))).toHaveLength(3);
   expect(plan.filter(id=>id.startsWith('fan-'))).toHaveLength(5);
   expect(plan[11]).toMatch(/^encore-\d+$/);
  }
 });
 it('allows a correction after every wrong answer and explains the true memory',()=>{
  for(const q of pinkQuestionPool){
   const r=answerRound(q.id,true);
   expect(r.status,q.id).toBe('won');
   expect(r.mistakes,q.id).toBe(1);
   expect(r.score).toBe(51);
   expect(r.note).toBe(q.explanation);
  }
  for(let i=0;i<pinkEncoreVariants.length;i++){
   const q=pinkChallengeFor('encore-'+i);
   const r=answerRound(q.id,true);
   expect(r.status).toBe('won');
   expect(r.mistakes).toBe(1);
   expect(pinkEncorePattern(q.id)).toEqual(pinkEncoreVariants[i]);
  }
  expect(pinkRoundScore(123)).toBe(22);
 });
 it('rejects duplicate era cards, invalid answer clicks and invalid encore pads',()=>{
  const q=pinkEraQuestions[0];
  const a=choosePink(newPinkRound(q.id),q,q.options[0]);
  expect(choosePink(a,q,q.options[0])).toBe(a);
  expect(choosePink(a,q,'not a release')).toBe(a);
  const e=pinkChallengeFor('encore-1');
  expect(choosePink(newPinkRound(e.id),e,'99')).toEqual(newPinkRound(e.id));
 });
});
describe('Lights-out setbacks and twelve-act progress',()=>{
 it('plays a flawless entire show and awards all twelve memories and the blind draw',()=>{
  const p=finishShow(freshPinkProgress(),'daily');
  const s=p.daily[date];
  expect(s.completed).toBe(true);
  expect(s.index).toBe(12);
  expect(pinkShowScore(s)).toBe(720);
  expect(p.stats.stars).toBe(720);
  expect(p.stats.roundsSolved).toBe(12);
  expect(p.stats.showsFinished).toBe(1);
  expect(p.stats.perfectShows).toBe(1);
  expect(p.coupon?.status).toBe('ready');
  expect(pinkConsistencyIssues(p)).toEqual([]);
  expect(advancePink(p,'daily',date)).toBe(p);
 });
 it('turns off a prior stage light on a wrong answer, then requires winning that act back',()=>{
  let p=freshPinkProgress(),s=pinkDailySession(date);
  const first=pinkChallengeFor(s.plan[0]),second=pinkChallengeFor(s.plan[1]);
  p=applyPinkRound(p,'daily',date,(r,c)=>choosePink(r,c,c.answer));
  p=advancePink(p,'daily',date);
  expect(p.daily[date].index).toBe(1);
  const stars=p.stats.stars;
  const wrong=second.options.find(x=>x!==second.answer)!;
  p=applyPinkRound(p,'daily',date,(r,c)=>choosePink(r,c,wrong));
  s=p.daily[date];
  expect(s.index).toBe(0);
  expect(s.rounds[first.id].status).toBe('playing');
  expect(s.rounds[second.id].mistakes).toBe(1);
  expect(p.stats.stars).toBe(stars);
  p=applyPinkRound(p,'daily',date,(r,c)=>choosePink(r,c,c.answer));
  p=advancePink(p,'daily',date);
  expect(p.daily[date].index).toBe(1);
  expect(p.stats.stars).toBe(stars);
  p=applyPinkRound(p,'daily',date,(r,c)=>choosePink(r,c,c.answer));
  expect(p.daily[date].rounds[second.id].status).toBe('won');
  expect(p.daily[date].rounds[second.id].score).toBe(51);
 });
 it('finishes multiple practice shows without re-awarding the same puzzle stars',()=>{
  let p=pinkNextPractice(freshPinkProgress());
  p=finishShow(p,'practice');
  const stars=p.stats.stars,solved=p.stats.roundsSolved;
  const previous=p.practice!;
  p={...p,practice:{...previous,id:'practice-repeat',index:0,rounds:{},completed:false}};
  p=finishShow(p,'practice');
  expect(p.stats.showsFinished).toBe(2);
  expect(p.stats.stars).toBe(stars);
  expect(p.stats.roundsSolved).toBe(solved);
  expect(pinkConsistencyIssues(p)).toEqual([]);
 });
 it('keeps legacy eight-act in-progress shows playable and saves intact',()=>{
  let p=freshPinkProgress();
  const legacy=pinkDailySession(date);
  legacy.plan=legacy.plan.slice(0,8);
  p.daily[date]=legacy;
  p=finishShow(p,'daily');
  expect(p.daily[date].completed).toBe(true);
  expect(p.daily[date].index).toBe(8);
  expect(pinkShowScore(p.daily[date])).toBe(480);
  expect(pinkConsistencyIssues(p)).toEqual([]);
 });
});
describe('One-time BLACKPINK coupon and Passport wallet',()=>{
 it('keeps three distinct rewards concealed until a valid finished show',()=>{
  const empty=freshPinkProgress();
  expect(choosePinkCoupon(empty,0)).toBe(empty);
  const won=finishShow(empty,'daily');
  expect(won.coupon?.status).toBe('ready');
  const cards=pinkMysteryCards(won);
  expect(new Set(cards)).toEqual(new Set(['choreo','sing','lisa']));
  const chosen=choosePinkCoupon(won,1);
  expect(chosen.coupon?.status).toBe('active');
  expect(chosen.coupon?.chosen).toBe(cards[1]);
  expect(chosen.coupon?.selectedCard).toBe(1);
  expect(choosePinkCoupon(chosen,2)).toBe(chosen);
 });
 it('surrenders a coupon and requires a NEW full concert before another choice',()=>{
  let p=choosePinkCoupon(finishShow(freshPinkProgress(),'daily'),2);
  p=pinkReplaceCoupon(p);
  expect(p.coupon?.status).toBe('seeking');
  expect(choosePinkCoupon(p,1)).toBe(p);
  // Reopening an already finished daily show does not mint another coupon.
  expect(advancePink(p,'daily',date)).toBe(p);
  p=pinkNextPractice(p);
  p=finishShow(p,'practice');
  expect(p.coupon?.status).toBe('ready');
  expect(new Set(pinkMysteryCards(p)).size).toBe(3);
 });
 it('redeems permanently and blocks every new coupon, including after replay',()=>{
  let p=choosePinkCoupon(finishShow(freshPinkProgress(),'daily'),0);
  p=redeemPinkCoupon(p,'2026-10-22T12:00:00.000Z');
  expect(p.coupon?.status).toBe('redeemed');
  expect(p.coupon?.redeemedAt).toBe('2026-10-22T12:00:00.000Z');
  expect(redeemPinkCoupon(p)).toBe(p);
  expect(pinkReplaceCoupon(p)).toBe(p);
  expect(choosePinkCoupon(p,2)).toBe(p);
  p=pinkNextPractice(p);p=finishShow(p,'practice');
  expect(p.coupon?.status).toBe('redeemed');
  expect(pinkConsistencyIssues(p)).toEqual([]);
 });
 it('keeps a terminal redemption when an older Passport backup is imported',()=>{
  const redeemed=redeemPinkCoupon(choosePinkCoupon(finishShow(freshPinkProgress(),'daily'),1),'2026-10-22T13:00:00.000Z');
  const older=freshPinkProgress();
  const restored=reconcilePinkImport(older,redeemed);
  expect(restored.coupon?.status).toBe('redeemed');
  expect(restored.coupon?.chosen).toBe(redeemed.coupon?.chosen);
 });
 it('saves the redemption lock separately, and survives a stale backup reload',()=>{
  const memory=new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>{memory.set(k,v)}});
  try{
   const redeemed=redeemPinkCoupon(choosePinkCoupon(finishShow(freshPinkProgress(),'daily'),0),'2026-10-22T13:40:00.000Z');
   writePinkProgress(redeemed);
   expect(JSON.parse(memory.get(PINK_REDEEMED_MARKER)!).status).toBe('redeemed');
   writePinkProgress(freshPinkProgress());
   expect(readPinkProgress().coupon?.status).toBe('redeemed');
  }finally{vi.unstubAllGlobals()}
 });
});
