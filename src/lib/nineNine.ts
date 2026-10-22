import { bestAward, scoreWithDifficulty, type Difficulty } from './passport';
import { caseCandidates, dailyNineCase, nineCases, practiceNineCase, type NineCase } from '../data/nineNine';

export const NINE_STORAGE_KEY='mollys-99-files-v1';
export type NineRound={
  caseId:string;difficulty:Difficulty;
  inspected:string[];selected:string[];linked:string[];
  wrongPairs:number;hints:number;attempts:number;
  suspect:string;method:string;proof:string;
  status:'playing'|'won'|'lost';score:number;feedback:string;
};
export type NineStats={played:number;solved:number;stars:number;bestScore:number;perfect:number};
export type NineProgress={
  version:1;daily:Record<string,NineRound>;practice:NineRound|null;
  heist:Record<string,NineRound>;recent:string[];
  stats:NineStats;bestAwards:Record<string,number>;
};
export const nineHintLimit=(d:Difficulty)=>d==='easy'?2:d==='medium'?1:0;
export const nineGuessLimit=(d:Difficulty)=>d==='easy'?3:d==='medium'?2:1;
export const nineWrongPairLimit=(d:Difficulty)=>d==='easy'?8:d==='medium'?6:5;

export function freshNineProgress():NineProgress {
  return {version:1,daily:{},practice:null,heist:{},recent:[],
    stats:{played:0,solved:0,stars:0,bestScore:0,perfect:0},bestAwards:{}};
}
export function newNineRound(c:NineCase):NineRound {
  return {caseId:c.id,difficulty:c.difficulty,inspected:[],selected:[],linked:[],
    wrongPairs:0,hints:0,attempts:0,suspect:'',method:'',proof:'',
    status:'playing',score:0,feedback:'Read the evidence, then pair documents that reveal the same hidden truth.'};
}
export const pristineNineRound=(r:NineRound)=>r.status==='playing'&&r.linked.length===0&&r.inspected.length===0&&r.wrongPairs===0&&r.hints===0&&r.attempts===0;
export const allNineLinksSolved=(r:NineRound,c:NineCase)=>c.deductions.every(d=>r.linked.includes(d.id));
export const getNineDaily=(p:NineProgress,today:string,d:Difficulty)=>p.daily[today]??newNineRound(dailyNineCase(today,d));
export function newNinePractice(p:NineProgress,d:Difficulty,random=Math.random):NineRound {
  return newNineRound(practiceNineCase(d,p.recent.slice(-3),random));
}
export function inspectNineEvidence(r:NineRound,c:NineCase,id:string):NineRound {
  if(r.status!=='playing'||!c.evidence.some(e=>e.id===id))return r;
  const inspected=r.inspected.includes(id)?r.inspected:[...r.inspected,id];
  // An evidence card also pins/unpins it on the desk for cross-checking.
  const selected=r.selected.includes(id)?r.selected.filter(x=>x!==id):[...r.selected.slice(-1),id];
  return {...r,inspected,selected,feedback:'Compare two relevant exhibits, then connect them on the case board.'};
}
export function clearNineSelection(r:NineRound):NineRound {
  return {...r,selected:[],feedback:'The board is clear. Choose a fresh pair of evidence cards.'};
}
export function connectNineEvidence(r:NineRound,c:NineCase):NineRound {
  if(r.status!=='playing'||r.selected.length!==2)return r;
  const found=c.deductions.find(d=>d.pair.every(e=>r.selected.includes(e)));
  if(found&&r.linked.includes(found.id))
    return {...r,selected:[],feedback:'That connection has already been pinned to the board.'};
  if(found) return {...r,selected:[],linked:[...r.linked,found.id],
    feedback:'Breakthrough: '+found.conclusion};
  const wrongPairs=r.wrongPairs+1,ended=wrongPairs>=nineWrongPairLimit(r.difficulty);
  return {...r,selected:[],wrongPairs,status:ended?'lost':'playing',
    feedback:ended?'The evidence board has become too tangled. This case is archived for now.':
      'Those documents do not establish a reliable connection. Look for two facts that test the same claim.'};
}
export function hintNine(r:NineRound,c:NineCase):NineRound {
  if(r.status!=='playing'||r.hints>=nineHintLimit(r.difficulty))return r;
  const link=c.deductions.find(d=>!r.linked.includes(d.id));
  if(!link)return r;
  return {...r,hints:r.hints+1,selected:[],linked:[...r.linked,link.id],
    inspected:[...new Set([...r.inspected,...link.pair])],
    feedback:'Holt has prepared a carefully documented hint: '+link.conclusion};
}
export function setNineAccusation(r:NineRound,c:NineCase,field:'suspect'|'method'|'proof',value:string):NineRound {
  if(r.status!=='playing'||!allNineLinksSolved(r,c))return r;
  if(field==='suspect'&&!c.suspects.includes(value))return r;
  if(field==='method'&&!c.methods.includes(value))return r;
  if(field==='proof'&&!c.deductions.some(d=>d.id===value))return r;
  return {...r,[field]:value};
}
export function submitNineAccusation(r:NineRound,c:NineCase):NineRound {
  if(r.status!=='playing'||!allNineLinksSolved(r,c)||!r.suspect||!r.method||!r.proof)return r;
  // Decisive evidence is required in addition to the correct culprit and method.
  const success=r.suspect===c.culprit&&r.method===c.method&&r.proof===c.decisive&&
    caseCandidates(c,r.linked).length===1;
  const attempts=r.attempts+1;
  if(success) return {...r,attempts,status:'won',
    score:scoreWithDifficulty(Math.max(45,210-r.wrongPairs*13-r.hints*35-r.attempts*28),r.difficulty),
    feedback:'Case closed! Your evidence board supports every part of the accusation.'};
  const ended=attempts>=nineGuessLimit(r.difficulty);
  return {...r,attempts,status:ended?'lost':'playing',
    feedback:ended?'The final accusation was not sustained. Review the full case notes.':
      'That accusation contains at least one unsupported element. Revisit the deductions.'};
}
export function creditNineResult(p:NineProgress,r:NineRound):NineProgress{
  if(r.status==='playing')return p;
  const id='99:'+r.caseId,prior=p.bestAwards?.[id]??0;
  const best=bestAward(p.bestAwards,id,r.score);
  return {...p,bestAwards:best.awards,stats:{
    played:p.stats.played+1,
    solved:p.stats.solved+(r.status==='won'&&prior===0?1:0),
    stars:p.stats.stars+best.delta,
    bestScore:Math.max(p.stats.bestScore,r.score),
    perfect:p.stats.perfect+(r.status==='won'&&r.wrongPairs===0&&r.hints===0&&r.attempts===1&&prior===0?1:0),
  }};
}
export function readNineProgress():NineProgress{
  try{
    const raw=localStorage.getItem(NINE_STORAGE_KEY);
    if(!raw)return freshNineProgress();
    const unknown:unknown=JSON.parse(raw);
    if(!unknown||typeof unknown!=='object')return freshNineProgress();
    const p=unknown as NineProgress;
    if(p.version!==1||!p.daily||!p.heist||!p.stats||typeof p.stats.stars!=='number')return freshNineProgress();
    return {...p,practice:p.practice??null,bestAwards:p.bestAwards??{},recent:Array.isArray(p.recent)?p.recent:[]};
  }catch{return freshNineProgress();}
}
export function writeNineProgress(p:NineProgress){
  try{localStorage.setItem(NINE_STORAGE_KEY,JSON.stringify(p))}catch{/* no storage still playable */}
}
export function unlockedHeistCount(p:NineProgress):number{
  const ids=['heist-one','heist-two','heist-three'];
  let count=0;
  while(count<ids.length&&(p.heist[ids[count]]?.status==='won'||(p.bestAwards?.['99:'+ids[count]]??0)>0))count++;
  return count;
}
/** Restart an unlocked heist without touching already-awarded stars or stamps. */
export function retryNineHeist(p:NineProgress,id:string):NineProgress {
 const stages=['heist-one','heist-two','heist-three'];
 const index=stages.indexOf(id);
 if(index<0||index>unlockedHeistCount(p))return p;
 const c=nineCases.find(c=>c.id===id);
 if(!c)return p;
 return {...p,heist:{...p.heist,[id]:newNineRound(c)}};
}
export function nineCaseById(id:string){return nineCases.find(c=>c.id===id)}
