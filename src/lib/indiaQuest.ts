import {indiaMysteries,indiaMysteryById,type IndiaMystery,type MysteryKind} from '../data/indiaMysteries';
import {normalizeAnswerQuery} from './answerAssist';
export const INDIA_SAVE_KEY='molly-wwww-india-v1';
export const EXPEDITION_STOPS=12;
export const MAX_ATTEMPTS=4;
export const HINT_EARNING_STOPS=10; // earn one before each of stops 1–10, bank thereafter
export const MAX_BONUS_HINTS_PER_MYSTERY=2;
export type MysteryRound={
 id:string;guesses:string[];reveal:number;extras:number;
 status:'playing'|'won'|'missed';score:number;feedback:string;
};
export type Expedition={seed:number;stops:string[];index:number;rounds:Record<string,MysteryRound>;hintBank:number;finished:boolean};
export type IndiaSave={version:1;expedition:Expedition|null;daily:Record<string,MysteryRound>;
 dailyHints:Record<string,number>;runs:number;solved:number;bestRun:number;bestAwards:Record<string,number>};
export function freshIndiaSave():IndiaSave{return {version:1,expedition:null,daily:{},dailyHints:{},runs:0,solved:0,bestRun:0,bestAwards:{}}}
const sortedKinds:MysteryKind[]=['what','where','who','when'];
function hash(s:string):number{let n=2166136261;for(const ch of s){n=Math.imul(n^ch.charCodeAt(0),16777619)}return n>>>0}
function randomize<T>(items:readonly T[],seed:number):T[]{
 const a=[...items];let x=seed>>>0;
 for(let i=a.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}
 return a;
}
export function expeditionIds(seed:number):string[]{
 const byKind=Object.fromEntries(sortedKinds.map(k=>[k,randomize(indiaMysteries.filter(x=>x.kind===k),seed+hash(k)).map(x=>x.id)])) as Record<MysteryKind,string[]>;
 const sequence:MysteryKind[]=['what','where','who','when','who','what','where','when','where','who','what','when'];
 const offsets:Record<MysteryKind,number>={what:0,where:0,who:0,when:0};
 return sequence.map(k=>byKind[k][offsets[k]++]);
}
export function openExpedition(seed=1):Expedition{
 return {seed,stops:expeditionIds(seed),index:0,rounds:{},hintBank:1,finished:false};
}
export const currentMystery=(s:Expedition):IndiaMystery|undefined=>indiaMysteryById(s.stops[s.index]);
export function newMysteryRound(id:string):MysteryRound{
 return {id,guesses:[],reveal:0,extras:0,status:'playing',score:0,
  feedback:'Read the clue. Every wrong guess reveals something new.'};
}
export function mysteryRound(s:Expedition):MysteryRound|undefined{
 const card=currentMystery(s);
 return card?(s.rounds[card.id]??newMysteryRound(card.id)):undefined;
}
export function matchesIndiaAnswer(card:IndiaMystery,guess:string):boolean{
 const q=normalizeAnswerQuery(guess);
 return q.length>0&&[card.answer,...card.aliases].some(a=>normalizeAnswerQuery(a)===q);
}
export function proximity(card:IndiaMystery,guess:string):string{
 const q=normalizeAnswerQuery(guess);
 const known=indiaMysteries.find(x=>matchesIndiaAnswer(x,q));
 if(!known)return 'That answer is not in the comparison deck. Try using the next revealed clue.';
 if(known.id===card.id)return 'Correct!';
 const shared:string[]=[];
 if(known.kind===card.kind)shared.push('right question type');
 if(known.topic===card.topic)shared.push('same topic');
 if(known.region===card.region)shared.push('same associated region');
 if(known.era===card.era)shared.push('same historical period');
 if(!shared.length)return 'Quite far away: the subject, region and period do not match our reference clues.';
 if(shared.length===1)return 'Getting oriented: '+shared[0]+', but this is a different answer.';
 return 'Warm trail: '+shared.slice(0,2).join(' + ')+'. It is still a different answer.';
}
export function submitIndiaGuess(r:MysteryRound,card:IndiaMystery,raw:string):MysteryRound{
 if(r.status!=='playing')return r;
 const guess=raw.trim().slice(0,90);
 if(!guess)return {...r,feedback:'Type a guess before submitting.'};
 if(r.guesses.some(x=>normalizeAnswerQuery(x)===normalizeAnswerQuery(guess)))
  return {...r,feedback:'You already tried that! Save your attempt for a new idea.'};
 const guesses=[...r.guesses,guess];
 if(matchesIndiaAnswer(card,guess)){
  const score=Math.max(30,260-45*r.guesses.length-38*r.extras);
  return {...r,guesses,status:'won',score,feedback:'Exactly right! '+card.fact};
 }
 const done=guesses.length>=MAX_ATTEMPTS;
 return {...r,guesses,reveal:Math.min(3,r.reveal+1),status:done?'missed':'playing',
  feedback:done?'The answer was '+card.answer+'. '+card.fact:proximity(card,guess)};
}
export function spendIndiaHint(r:MysteryRound,bank:number):{round:MysteryRound;bank:number}{
 if(r.status!=='playing'||bank<=0||r.extras>=MAX_BONUS_HINTS_PER_MYSTERY)return {round:r,bank};
 return {round:{...r,extras:r.extras+1,feedback:'A special field note has been opened below.'},bank:bank-1};
}
export function creditIndiaResult(save:IndiaSave,r:MysteryRound,scope:'daily'|'expedition',day?:string):IndiaSave{
 if(r.status==='playing')return save;
 const key=scope==='daily'?'daily:'+day+':'+r.id:'india:'+r.id;
 const previous=save.bestAwards[key]??0;
 const increase=Math.max(0,r.score-previous);
 return {...save,solved:save.solved+(r.status==='won'&&previous===0?1:0),
  bestAwards:{...save.bestAwards,[key]:Math.max(previous,r.score)},
  bestRun:save.bestRun+increase};
}
export function advanceExpedition(s:Expedition):Expedition{
 if(s.finished)return s;
 const card=currentMystery(s),r=card?s.rounds[card.id]:undefined;
 if(!r||r.status==='playing')return s;
 const next=s.index+1;
 if(next>=s.stops.length)return {...s,finished:true,index:next};
 return {...s,index:next,hintBank:s.hintBank+(next<HINT_EARNING_STOPS?1:0)};
}
export function readIndiaSave():IndiaSave{
 try{return normalizeIndiaSave(JSON.parse(localStorage.getItem(INDIA_SAVE_KEY)??'null'))}
 catch{return freshIndiaSave()}
}
export function writeIndiaSave(s:IndiaSave):void{try{localStorage.setItem(INDIA_SAVE_KEY,JSON.stringify(s))}catch{/* still playable */}}
export function normalizeIndiaSave(raw:unknown):IndiaSave{
 const f=freshIndiaSave();if(!raw||typeof raw!=='object')return f;
 const p=raw as Partial<IndiaSave>;
 if(p.version!==1)return f;
 const nat=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)&&n>=0?Math.floor(n):0;
 let expedition:Expedition|null=null;
 const e=p.expedition;
 if(e&&typeof e==='object'&&Number.isInteger(e.seed)&&Array.isArray(e.stops)&&
   e.stops.length===EXPEDITION_STOPS&&e.stops.every(id=>!!indiaMysteryById(id))&&
   e.stops.join(',')===expeditionIds(e.seed).join(',')&&e.rounds&&typeof e.rounds==='object'){
  const index=Math.max(0,Math.min(12,nat(e.index))),rounds:Record<string,MysteryRound>={};
  for(const id of e.stops){const r=e.rounds[id];if(!r||typeof r!=='object')continue;
   if(!['playing','won','missed'].includes(r.status)||!Array.isArray(r.guesses))continue;
   rounds[id]={id,guesses:r.guesses.filter(x=>typeof x==='string').slice(0,4),
    reveal:Math.min(3,nat(r.reveal)),extras:Math.min(2,nat(r.extras)),
    status:r.status,score:Math.min(260,nat(r.score)),feedback:typeof r.feedback==='string'?r.feedback.slice(0,700):''};
  }
  expedition={seed:e.seed,stops:[...e.stops],index,rounds,hintBank:Math.min(10,nat(e.hintBank)),finished:!!e.finished};
 }
 const daily:Record<string,MysteryRound>={};
 for(const [day,r] of Object.entries(p.daily??{}).slice(-90)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!r||!indiaMysteryById(r.id))continue;
  if(!['playing','won','missed'].includes(r.status)||!Array.isArray(r.guesses))continue;
  daily[day]={id:r.id,guesses:r.guesses.filter(x=>typeof x==='string').slice(0,4),
   reveal:Math.min(3,nat(r.reveal)),extras:Math.min(2,nat(r.extras)),status:r.status,
   score:Math.min(260,nat(r.score)),feedback:typeof r.feedback==='string'?r.feedback.slice(0,700):''};
 }
 const bestAwards:Record<string,number>={};
 for(const [k,v] of Object.entries(p.bestAwards??{}).slice(-200))if(k.length<100)bestAwards[k]=Math.min(260,nat(v));
 const dailyHints:Record<string,number>={};
 for(const [k,v] of Object.entries(p.dailyHints??{}).slice(-90))if(/^\d{4}-\d{2}-\d{2}$/.test(k))dailyHints[k]=Math.min(1,nat(v));
 return {version:1,expedition,daily,dailyHints,runs:nat(p.runs),solved:nat(p.solved),
  bestRun:nat(p.bestRun),bestAwards};
}
export function dailyMystery(day:string):IndiaMystery{
 const seed=hash(day);return indiaMysteries[seed%indiaMysteries.length];
}
