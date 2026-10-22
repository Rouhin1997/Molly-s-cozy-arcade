import {describe,it,expect,vi} from 'vitest';
import {pinkChallengeFor,pinkEncoreVariants,pinkQuestionPool,pinkQuestionIssues,pinkSetlist,pinkTrackQuestions,pinkSpotQuestions,pinkEraQuestions} from '../src/data/pinkRush';
import {
 freshPinkProgress,newPinkRound,pinkDailySession,pinkNextPractice,choosePink,
 applyPinkRound,advancePink,pinkShowScore,pinkConsistencyIssues,pinkEncorePattern,
 readPinkProgress,writePinkProgress,pinkRoundScore,
} from '../src/lib/pinkRush';

const date='2026-10-22';
function answerRound(id:string,seedMistakes=0){
 const q=pinkChallengeFor(id);
 let round=newPinkRound(id);
 if(seedMistakes){
  if(q.kind==='era')round=choosePink(round,q,q.options[0]);
  else if(q.kind==='encore')round=choosePink(round,q,String((pinkEncorePattern(id)[0]+1)%4));
  else round=choosePink(round,q,q.options.find(option=>option!==q.answer)!);
 }
 if(q.kind==='era'){
  for(const answer of q.answer.split('→'))round=choosePink(round,q,answer);
 }else if(q.kind==='encore'){
  for(const beat of pinkEncorePattern(id))round=choosePink(round,q,String(beat));
 }else round=choosePink(round,q,q.answer);
 return round;
}
describe('Pink Rush discography and fan memories',()=>{
 it('includes enough 2016-2026 tracks, releases and member spotlights',()=>{
  expect(pinkTrackQuestions.length).toBeGreaterThanOrEqual(18);
  expect(pinkSpotQuestions).toHaveLength(12);
  expect(pinkEraQuestions.length).toBeGreaterThanOrEqual(7);
  expect(pinkQuestionIssues()).toEqual([]);
  expect(pinkQuestionPool.some(q=>q.explanation.includes('DEADLINE'))).toBe(true);
  expect(pinkQuestionPool.some(q=>q.explanation.includes('SQUARE ONE'))).toBe(true);
 });
 it('builds reproducible, eight-round shows with three songs, two era and two member memories, plus an encore',()=>{
  for(const seed of [date,'practice-1','practice-2','practice-30']){
   const plan=pinkSetlist(seed);
   expect(plan).toEqual(pinkSetlist(seed));
   expect(new Set(plan).size).toBe(8);
   expect(plan.filter(id=>id.startsWith('track-'))).toHaveLength(3);
   expect(plan.filter(id=>id.startsWith('era-'))).toHaveLength(2);
   expect(plan.filter(id=>id.startsWith('spot-'))).toHaveLength(2);
   expect(plan[7]).toMatch(/^encore-\d+$/);
  }
 });
 it('forgiving wrong answers never lose a concert, and successful answers explain the memory',()=>{
  for(const q of pinkQuestionPool){
   const r=answerRound(q.id,1);
   expect(r.status,q.id).toBe('won');
   expect(r.mistakes,q.id).toBe(1);
   expect(r.score).toBe(51);
   expect(r.note).toBe(q.explanation);
  }
  for(let i=0;i<pinkEncoreVariants.length;i++){
   const q=pinkChallengeFor('encore-'+i);
   const r=answerRound(q.id,1);
   expect(r.status).toBe('won');
   expect(r.score).toBe(51);
   expect(pinkEncorePattern(q.id)).toEqual(pinkEncoreVariants[i]);
  }
  expect(pinkRoundScore(200)).toBe(22);
 });
 it('protects answers from empty, repeated era or invalid button presses',()=>{
  const q=pinkEraQuestions[0];
  const a=choosePink(newPinkRound(q.id),q,q.options[0]);
  expect(choosePink(a,q,q.options[0])).toBe(a);
  expect(choosePink(a,q,'not a release')).toBe(a);
  const encore=pinkChallengeFor('encore-1');
  expect(choosePink(newPinkRound(encore.id),encore,'55')).toEqual(newPinkRound(encore.id));
 });
});
describe('Full eight-round concert playthrough and Passport continuity',()=>{
 function finishShow(start:ReturnType<typeof freshPinkProgress>,mode:'daily'|'practice'){
  let p=start;
  const session=mode==='daily'?pinkDailySession(date):p.practice!;
  for(const id of session.plan){
   const q=pinkChallengeFor(id);
   const choices=q.kind==='era'?q.answer.split('→'):q.kind==='encore'?
    pinkEncorePattern(id).map(String):[q.answer];
   for(const value of choices){
    p=applyPinkRound(p,mode,date,(r,c)=>choosePink(r,c,value));
   }
   const active=mode==='daily'?p.daily[date]:p.practice!;
   expect(active.rounds[id].status).toBe('won');
   p=advancePink(p,mode,date);
  }
  return p;
 }
 it('plays a whole concert and unlocks the original finale with correct scores',()=>{
  const p=finishShow(freshPinkProgress(),'daily');
  const s=p.daily[date];
  expect(s.completed).toBe(true);
  expect(s.index).toBe(8);
  expect(pinkShowScore(s)).toBe(480);
  expect(p.stats.stars).toBe(480);
  expect(p.stats.roundsSolved).toBe(8);
  expect(p.stats.showsFinished).toBe(1);
  expect(p.stats.perfectShows).toBe(1);
  expect(pinkConsistencyIssues(p)).toEqual([]);
  expect(advancePink(p,'daily',date)).toBe(p);
 });
 it('replays practice shows without farming identical question stars',()=>{
  let p=pinkNextPractice(freshPinkProgress());
  p=finishShow(p,'practice');
  const stars=p.stats.stars;
  expect(p.stats.showsFinished).toBe(1);
  // Replaying exactly the same setlist with another session name is not
  // allowed to add points for already-cleared memories.
  const saved=p.practice!;
  p={...p,practice:{...saved,id:'practice-another',index:0,rounds:{},completed:false}};
  p=finishShow(p,'practice');
  expect(p.stats.showsFinished).toBe(2);
  expect(p.stats.stars).toBe(stars);
  expect(pinkConsistencyIssues(p)).toEqual([]);
 });
 it('keeps daily shows independent by date and resumes in-progress show state',()=>{
  let p=freshPinkProgress();
  const daily=pinkDailySession(date);
  p=applyPinkRound(p,'daily',date,(r,c)=>choosePink(r,c,c.kind==='era'?c.options[0]:c.answer));
  expect(p.daily[date]?.plan).toEqual(daily.plan);
  expect(pinkConsistencyIssues(p)).toEqual([]);
 });
 it('writes a versioned local save and restores star ledgers',()=>{
  const memory=new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>{memory.set(k,v)}});
  try{
   let p=freshPinkProgress();p=pinkNextPractice(p);p.stats.stars=77;
   writePinkProgress(p);
   const q=readPinkProgress();
   expect(q.stats.stars).toBe(77);
   expect(q.practice?.plan).toEqual(p.practice?.plan);
   expect(q.version).toBe(1);
  }finally{vi.unstubAllGlobals()}
 });
});
