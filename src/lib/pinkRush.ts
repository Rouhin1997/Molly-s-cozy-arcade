import { bestAward } from './passport';
import { pinkChallengeFor,pinkEncoreVariants,pinkSetlist,type PinkChallenge } from '../data/pinkRush';

export const PINK_STORAGE_KEY='mollys-pink-rush-v1';
export type PinkRound={
  id:string;status:'playing'|'won';mistakes:number;picks:string[];
  score:number;note:string;seenPattern:boolean;
};
export type PinkSession={
  id:string;seed:string;plan:string[];index:number;rounds:Record<string,PinkRound>;
  completed:boolean;
};
export type PinkStats={
  showsFinished:number;roundsSolved:number;stars:number;bestShow:number;
  perfectShows:number;
};
export type PinkProgress={
  version:1;daily:Record<string,PinkSession>;practice:PinkSession|null;
  sessionNumber:number;bestAwards:Record<string,number>;stats:PinkStats;
};
export function freshPinkProgress():PinkProgress{
  return {version:1,daily:{},practice:null,sessionNumber:0,bestAwards:{},
    stats:{showsFinished:0,roundsSolved:0,stars:0,bestShow:0,perfectShows:0}};
}
export function newPinkRound(id:string):PinkRound{
  return {id,status:'playing',mistakes:0,picks:[],score:0,note:'Every BLINK memory brings another spotlight to life.',seenPattern:false};
}
export function newPinkSession(seed:string,id:string):PinkSession{
  return {id,seed,plan:pinkSetlist(seed),index:0,rounds:{},completed:false};
}
export function pinkDailySession(date:string):PinkSession{
  return newPinkSession(date,'daily-'+date);
}
export function pinkNextPractice(p:PinkProgress):PinkProgress{
  const number=p.sessionNumber+1;
  return {...p,sessionNumber:number,practice:newPinkSession('practice-'+number,'practice-'+number)};
}
export function getActivePinkRound(session:PinkSession):PinkRound|null{
  if(session.index>=session.plan.length)return null;
  const id=session.plan[session.index];
  return session.rounds[id]??newPinkRound(id);
}
export function pinkRoundScore(mistakes:number):number{
  return Math.max(22,60-mistakes*9);
}
function finish(r:PinkRound,note:string):PinkRound{
  return {...r,status:'won',picks:[],score:pinkRoundScore(r.mistakes),note};
}
/** Select an option, construct a chronological ordering, or replay a lightstick
 * pattern. Mistakes cost only stars; there are no hard failures or timers. */
export function choosePink(r:PinkRound,question:PinkChallenge,value:string):PinkRound{
  if(r.status!=='playing'||r.id!==question.id)return r;
  if(question.kind==='encore'){
    const next=Number(value);
    if(!Number.isInteger(next)||next<0||next>3)return r;
    const pattern=question.answer.split('-').map(Number);
    const expected=pattern[r.picks.length];
    if(next!==expected)return {...r,mistakes:r.mistakes+1,picks:[],note:'Almost! No rush. Replay the lights and try that encore again. ♡'};
    const picks=[...r.picks,value];
    return picks.length===pattern.length?
      finish({...r,picks},question.explanation):
      {...r,picks,note:`Perfect beat! ${picks.length} / ${pattern.length} lights remembered.`};
  }
  if(!question.options.includes(value))return r;
  if(question.kind==='era'){
    if(r.picks.includes(value))return r;
    const picks=[...r.picks,value];
    if(picks.length<3)return {...r,picks,note:`Lovely — now choose what came next. ${picks.length}/3 eras selected.`};
    if(picks.join('→')===question.answer)return finish({...r,picks},question.explanation);
    return {...r,mistakes:r.mistakes+1,picks:[],note:'These are the right eras, just not that order. Think back to the comeback timeline! 💿'};
  }
  if(value===question.answer)return finish(r,question.explanation);
  return {...r,mistakes:r.mistakes+1,note:'Not that one, but the stage is still yours! Try another BLINK memory. 🩷'};
}
export function pinkRevealHint(r:PinkRound,q:PinkChallenge):PinkRound{
  if(r.status!=='playing'||r.seenPattern)return r;
  if(q.kind!=='encore')return r;
  return {...r,seenPattern:true,note:'The four lights have a repeatable pattern. You can replay it any number of times.'};
}
function awardId(s:PinkSession,id:string):string{
  // Daily challenges fairly award stars per calendar day; practice
  // questions award only the improvement in each puzzle's personal best.
  return s.id.startsWith('daily-')?`pink:${s.id}:${id}`:`pink:${id}`;
}
export function applyPinkRound(p:PinkProgress,mode:'daily'|'practice',date:string,
  change:(round:PinkRound,question:PinkChallenge)=>PinkRound):PinkProgress{
 const session=mode==='daily'?(p.daily[date]??pinkDailySession(date)):p.practice;
 if(!session||session.completed||session.index>=session.plan.length)return p;
 const id=session.plan[session.index],c=pinkChallengeFor(id);
 const before=session.rounds[id]??newPinkRound(id),after=change(before,c);
 if(after===before)return p;
 const rounds={...session.rounds,[id]:after};
 const revised={...session,rounds};
 let stats=p.stats,bestAwards=p.bestAwards;
 if(before.status==='playing'&&after.status==='won'){
   const award=bestAward(bestAwards,awardId(session,id),after.score);
   bestAwards=award.awards;
   stats={...stats,stars:stats.stars+award.delta,roundsSolved:stats.roundsSolved+(award.delta>0?1:0)};
 }
 return {...p,stats,bestAwards,...(mode==='daily'?{daily:{...p.daily,[date]:revised}}:{practice:revised})};
}
export function pinkShowScore(session:PinkSession):number{
 return session.plan.reduce((sum,id)=>sum+(session.rounds[id]?.score??0),0);
}
export function advancePink(p:PinkProgress,mode:'daily'|'practice',date:string):PinkProgress{
 const session=mode==='daily'?(p.daily[date]??pinkDailySession(date)):p.practice;
 if(!session||session.completed||session.index>=session.plan.length)return p;
 const id=session.plan[session.index];
 if(session.rounds[id]?.status!=='won')return p;
 const next=session.index+1,completed=next===session.plan.length;
 const revised={...session,index:next,completed};
 const score=pinkShowScore(revised);
 const stats=completed?{...p.stats,showsFinished:p.stats.showsFinished+1,
   bestShow:Math.max(p.stats.bestShow,score),
   perfectShows:p.stats.perfectShows+(score===480?1:0)}:p.stats;
 return {...p,stats,...(mode==='daily'?{daily:{...p.daily,[date]:revised}}:{practice:revised})};
}
export function readPinkProgress():PinkProgress{
 try{
  const raw=localStorage.getItem(PINK_STORAGE_KEY);
  if(!raw)return freshPinkProgress();
  const data:unknown=JSON.parse(raw);
  if(!data||typeof data!=='object')return freshPinkProgress();
  const p=data as PinkProgress;
  if(p.version!==1||!p.stats||!p.daily||typeof p.stats.stars!=='number')return freshPinkProgress();
  return {...p,sessionNumber:p.sessionNumber??0,practice:p.practice??null,bestAwards:p.bestAwards??{}};
 }catch{return freshPinkProgress();}
}
export function writePinkProgress(p:PinkProgress){
 try{localStorage.setItem(PINK_STORAGE_KEY,JSON.stringify(p))}catch{/* game stays playable */}
}
export function pinkConsistencyIssues(p:PinkProgress):string[]{
 const issues:string[]=[];
 for(const s of [...Object.values(p.daily),...(p.practice?[p.practice]:[])]){
  if(s.plan.length!==8||new Set(s.plan).size!==8)issues.push(s.id+': bad setlist');
  if(s.index<0||s.index>8)issues.push(s.id+': invalid index');
  if(s.completed!==(s.index===8))issues.push(s.id+': status mismatch');
  for(const [id,r] of Object.entries(s.rounds)){
    if(!s.plan.includes(id)||id!==r.id)issues.push(s.id+': stray round');
    if(r.status==='won'&&r.score!==pinkRoundScore(r.mistakes))issues.push(s.id+': score mismatch');
  }
 }
 return issues;
}
export function pinkEncorePattern(id:string):readonly number[]{
 const n=Number(id.slice('encore-'.length));
 if(!id.startsWith('encore-')||!pinkEncoreVariants[n])throw Error('Unknown encore variant '+id);
 return pinkEncoreVariants[n];
}
