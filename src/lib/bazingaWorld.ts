import type { Difficulty } from './passport';
import { scoreWithDifficulty, bestAward } from './passport';
import { dailyRoomCase, practiceRoomCase, roomCases, roomRules, holdsRoomRule, type RoomCase } from '../data/bazingaWorld';
import type { BazingaProgress } from './bazinga';

export type WorldRound = {
  caseId:string; difficulty:Difficulty;
  /** Keyed by the case's stable seat IDs, not visual presentation order. */
  placements:Record<string,string|null>;
  selected:string|null; fixed:string[];
  attempts:number; hints:number;
  status:'playing'|'won'|'lost'; score:number; feedback:string;
};
export const worldAttempts=(d:Difficulty)=>d==='easy'?4:d==='medium'?3:2;
export const worldHints=(d:Difficulty)=>d==='easy'?2:d==='medium'?1:0;
export function newWorldRound(c:RoomCase):WorldRound {
  return {caseId:c.id,difficulty:c.difficulty,placements:Object.fromEntries(c.seatIds.map(id=>[id,null])),
    selected:null,fixed:[],attempts:0,hints:0,status:'playing',score:0,
    feedback:'Select a character sticker, then tap a seat on the room map.'};
}
export function untouchedWorldRound(r:WorldRound):boolean {
  return r.status==='playing'&&r.attempts===0&&r.hints===0&&Object.values(r.placements).every(x=>x===null);
}
export const worldOrder=(r:WorldRound,c:RoomCase)=>c.seatIds.map(id=>r.placements[id]??'');
export function selectWorldGuest(r:WorldRound,c:RoomCase,name:string):WorldRound {
  if(r.status!=='playing'||!c.solution.includes(name)||r.fixed.some(id=>r.placements[id]===name))return r;
  return {...r,selected:r.selected===name?null:name,feedback:''};
}
export function placeWorldGuest(r:WorldRound,c:RoomCase,seatId:string):WorldRound {
  if(r.status!=='playing'||!c.seatIds.includes(seatId)||r.fixed.includes(seatId))return r;
  const placements={...r.placements};
  if(!r.selected){
    if(!placements[seatId])return r;
    placements[seatId]=null;
    return {...r,placements,feedback:'Chair cleared. You can give this seat to somebody else.'};
  }
  const guest=r.selected;
  const from=c.seatIds.find(id=>placements[id]===guest);
  if(from===seatId)return {...r,selected:null};
  const displaced=placements[seatId];
  placements[seatId]=guest;
  if(from)placements[from]=displaced;
  return {...r,placements,selected:null,feedback:''};
}
export function hintWorld(r:WorldRound,c:RoomCase):WorldRound {
  if(r.status!=='playing'||r.hints>=worldHints(r.difficulty))return r;
  const next=c.seatIds.find((id,i)=>!r.fixed.includes(id)&&r.placements[id]!==c.solution[i])
    ??c.seatIds.find(id=>!r.fixed.includes(id));
  if(!next)return r;
  const guest=c.solution[c.seatIds.indexOf(next)];
  const from=c.seatIds.find(id=>r.placements[id]===guest);
  const placements={...r.placements};
  if(from)placements[from]=null;
  placements[next]=guest;
  return {...r,placements,selected:null,fixed:[...r.fixed,next],hints:r.hints+1,
    feedback:`A brief concession: ${guest} definitely belongs at ${roomsSeatLabel(c,next)}.`};
}
function roomsSeatLabel(c:RoomCase,id:string):string {return c.seatIds.includes(id)?id.replace(/-/g,' '):'that chair'}
export function checkWorld(r:WorldRound,c:RoomCase):WorldRound {
  if(r.status!=='playing'||c.seatIds.some(id=>!r.placements[id]))return r;
  const order=worldOrder(r,c);
  const rules=roomRules(c);
  const satisfied=rules.filter(rule=>holdsRoomRule(c,order,rule)).length;
  if(satisfied===rules.length){
    return {...r,status:'won',selected:null,attempts:r.attempts+1,
      score:scoreWithDifficulty(Math.max(50,180-r.attempts*25-r.hints*30),r.difficulty),
      feedback:'All room rules satisfied! The arrangement is scientifically sound.'};
  }
  const attempts=r.attempts+1,finished=attempts>=worldAttempts(r.difficulty);
  return {...r,attempts,status:finished?'lost':'playing',selected:null,
    feedback:finished?`${satisfied}/${rules.length} rules satisfied. The approved seating plan is revealed.`:
      `${satisfied}/${rules.length} rules satisfied. Check the map details and try again!`};
}
export function creditWorldRound(p:BazingaProgress,r:WorldRound):BazingaProgress {
  if(r.status==='playing')return p;
  const id=`room:${r.caseId}`;
  const wasBest=p.bestAwards?.[id]??0;
  const award=bestAward(p.bestAwards,id,r.score);
  return {...p,bestAwards:award.awards,stats:{
    played:p.stats.played+1,
    solved:p.stats.solved+(r.status==='won'&&wasBest===0?1:0),
    stars:p.stats.stars+award.delta,
    bestScore:Math.max(p.stats.bestScore,r.score),
    perfect:p.stats.perfect+(r.status==='won'&&r.attempts===1&&r.hints===0&&wasBest===0?1:0),
  }};
}
export function nextWorldPractice(p:BazingaProgress,d:Difficulty,random=Math.random):WorldRound {
  return newWorldRound(practiceRoomCase(d,p.worldRecent??[],random));
}
export function getWorldDaily(p:BazingaProgress,today:string,d:Difficulty):WorldRound {
  return p.worldDaily?.[today]??newWorldRound(dailyRoomCase(today,d));
}
export function getWorldCase(id:string):RoomCase|undefined {
  return roomCases.find(c=>c.id===id);
}
