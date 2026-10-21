import type { Difficulty } from './passport';
import type { WorldRound } from './bazingaWorld';
import { bestAward, scoreWithDifficulty } from './passport';
import { dailySeatingCase, practiceSeatingCase, seatingCases, seatingRules, ruleHolds, type SeatingCase } from '../data/bazinga';

export const BAZINGA_STORAGE_KEY='mollys-bazinga-v1';
export const bazingaAttempts = (d:Difficulty)=>d==='easy'?4:d==='medium'?3:2;
export const bazingaHints = (d:Difficulty)=>d==='easy'?2:d==='medium'?1:0;
export type SeatingRound = {
  caseId:string;
  difficulty:Difficulty;
  chairs:(string|null)[];
  selected:string|null;
  locked:number[];
  attempts:number;
  hints:number;
  status:'playing'|'won'|'lost';
  score:number;
  feedback:string;
};
export type BazingaStats = {
  played:number;
  solved:number;
  stars:number;
  bestScore:number;
  perfect:number;
};
export type BazingaProgress = {
  version:1;
  daily:Record<string,SeatingRound>;
  practice:SeatingRound|null;
  recent:string[];
  stats:BazingaStats;
  bestAwards:Record<string,number>;
  /** Version 1 retains the legacy linear lab; these additions keep old saves valid. */
  worldDaily?:Record<string,WorldRound>;
  worldPractice?:WorldRound|null;
  worldRecent?:string[];
};

export function initialBazingaProgress():BazingaProgress {
  return {version:1,daily:{},practice:null,recent:[],stats:{played:0,solved:0,stars:0,bestScore:0,perfect:0},bestAwards:{},worldDaily:{},worldPractice:null,worldRecent:[]};
}
export function newSeatingRound(c:SeatingCase):SeatingRound {
  return {caseId:c.id,difficulty:c.difficulty,chairs:Array(c.solution.length).fill(null),selected:null,locked:[],attempts:0,hints:0,status:'playing',score:0,feedback:'Tap a guest, then tap an empty chair.'};
}
export function isSeatingUntouched(r:SeatingRound):boolean {
  return r.status==='playing'&&r.attempts===0&&r.hints===0&&r.chairs.every(x=>x===null);
}
export function selectGuest(r:SeatingRound,name:string):SeatingRound {
  if(r.status!=='playing'||!seatingCases.find(c=>c.id===r.caseId)?.solution.includes(name))return r;
  if(r.locked.some(i=>r.chairs[i]===name))return r;
  return {...r,selected:r.selected===name?null:name,feedback:''};
}
export function seatGuest(r:SeatingRound,index:number):SeatingRound {
  if(r.status!=='playing'||index<0||index>=r.chairs.length||r.locked.includes(index))return r;
  const chairs=[...r.chairs];
  if(!r.selected){
    if(!chairs[index])return r;
    chairs[index]=null;
    return {...r,chairs,feedback:'Chair cleared. Select a guest to place someone else.'};
  }
  const before=chairs.indexOf(r.selected);
  if(before===index)return {...r,selected:null};
  // Selecting a filled chair swaps its occupant back into the previous chair, if any.
  const displaced=chairs[index];
  chairs[index]=r.selected;
  if(before>=0)chairs[before]=displaced;
  return {...r,chairs,selected:null,feedback:''};
}
export function revealSeatingHint(r:SeatingRound,c:SeatingCase):SeatingRound {
  if(r.status!=='playing'||r.hints>=bazingaHints(r.difficulty))return r;
  const correct=c.solution.findIndex((name,i)=>!r.locked.includes(i)&&r.chairs[i]!==name);
  const slot=correct<0?c.solution.findIndex((_,i)=>!r.locked.includes(i)):correct;
  if(slot<0)return r;
  const chairs=[...r.chairs];
  const guest=c.solution[slot],previous=chairs.indexOf(guest);
  if(previous>=0)chairs[previous]=null;
  chairs[slot]=guest;
  return {...r,chairs,locked:[...r.locked,slot],hints:r.hints+1,selected:null,feedback:`Hint used: ${guest} belongs in chair ${slot+1}.`};
}
export function checkSeating(r:SeatingRound,c:SeatingCase):SeatingRound {
  if(r.status!=='playing'||r.chairs.some(x=>!x))return r;
  const passed=seatingRules(c).filter(rule=>ruleHolds(r.chairs as string[],rule)).length;
  const all=seatingRules(c).length;
  if(passed===all){
    return {...r,status:'won',attempts:r.attempts+1,selected:null,
      score:scoreWithDifficulty(Math.max(50,180-r.attempts*25-r.hints*30),r.difficulty),
      feedback:'All constraints satisfied! The seating theorem is proven. ✨'};
  }
  const attempts=r.attempts+1,lost=attempts>=bazingaAttempts(r.difficulty);
  return {...r,attempts,selected:null,status:lost?'lost':'playing',
    feedback:lost?`Only ${passed} of ${all} conditions held. The correct order is revealed below.`:`${passed} of ${all} conditions satisfied. Adjust the guest arrangement!`};
}
export function awardSeatingResult(progress:BazingaProgress,r:SeatingRound):BazingaProgress {
  if(r.status==='playing')return progress;
  const award=bestAward(progress.bestAwards,r.caseId,r.score);
  const first=!(r.caseId in progress.bestAwards) || progress.bestAwards[r.caseId]===0;
  return {...progress,bestAwards:award.awards,stats:{
    played:progress.stats.played+1,
    solved:progress.stats.solved+(r.status==='won'&&first?1:0),
    stars:progress.stats.stars+award.delta,
    bestScore:Math.max(progress.stats.bestScore,r.score),
    perfect:progress.stats.perfect+(r.status==='won'&&r.attempts===1&&r.hints===0&&first?1:0),
  }};
}
export function getDailySeatingRound(p:BazingaProgress,today:string,difficulty:Difficulty):SeatingRound {
  return p.daily[today]??newSeatingRound(dailySeatingCase(today,difficulty));
}
export function newPracticeSeatingRound(p:BazingaProgress,d:Difficulty,random=Math.random):SeatingRound {
  return newSeatingRound(practiceSeatingCase(d,p.recent.slice(-4),random));
}
export function readBazingaProgress():BazingaProgress {
  try{
    const raw=localStorage.getItem(BAZINGA_STORAGE_KEY);
    if(!raw)return initialBazingaProgress();
    const state:unknown=JSON.parse(raw);
    if(!state||typeof state!=='object'||!('version' in state)||state.version!==1)return initialBazingaProgress();
    const p=state as BazingaProgress;
    if(!p.daily||!p.stats||typeof p.stats.stars!=='number'||!Array.isArray(p.recent))return initialBazingaProgress();
    return {...p,bestAwards:p.bestAwards??{},worldDaily:p.worldDaily??{},worldPractice:p.worldPractice??null,worldRecent:p.worldRecent??[]};
  }catch{return initialBazingaProgress()}
}
export function writeBazingaProgress(p:BazingaProgress):void{
  try{localStorage.setItem(BAZINGA_STORAGE_KEY,JSON.stringify(p))}catch{/* playable without persisted storage */}
}
