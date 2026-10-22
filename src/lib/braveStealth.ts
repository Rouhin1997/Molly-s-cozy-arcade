/** A gentle, deterministic castle patrol. Guards are predictable, do not
 * cause game overs, and do not move until Molly chooses an action.
 * The triplets can distract the guard once for four player turns.
 */
export type BraveStealthAction='up'|'right'|'down'|'left'|'wait'|'distract';
export const braveStealthMap=[
 '#############',
 '#S.........E#',
 '####.##.##.##',
 '####.##.##.##',
 '#############'
] as const;
export const bravePatrol=[4,5,6,7,8,9,8,7,6,5] as const;
export type BraveStealthState={
 position:number;tick:number;distraction:number;usedDistraction:boolean;caught:number;
};
const W=braveStealthMap[0].length;
const start=braveStealthMap.join('').indexOf('S');
export const braveStealthInitial=():BraveStealthState=>({
 position:start,tick:0,distraction:0,usedDistraction:false,caught:0
});
export function braveGuardColumn(tick:number){return bravePatrol[tick%bravePatrol.length]}
export function braveStealthTile(index:number):string{
 return braveStealthMap[Math.floor(index/W)]?.[index%W]??'#';
}
export function braveStealthComplete(s:BraveStealthState):boolean{
 return braveStealthTile(s.position)==='E';
}
export function braveStealthMove(s:BraveStealthState,action:BraveStealthAction):{
 state:BraveStealthState;event:'move'|'wait'|'distract'|'caught'|'blocked'|'win';
}{
 if(braveStealthComplete(s))return {state:s,event:'win'};
 let position=s.position,used=s.usedDistraction,distraction=s.distraction;
 let tick=s.tick+1,event:'move'|'wait'|'distract'|'caught'|'blocked'|'win'='move';
 if(action==='distract'){
  if(used)return {state:s,event:'blocked'};
  used=true;distraction=4;event='distract';
 }else if(action==='wait'){
  event='wait';
 }else{
  const delta={up:-W,right:1,down:W,left:-1}[action];
  const next=position+delta;
  // Ensure row-bounded movement even at map edges.
  if((action==='left'||action==='right')&&Math.floor(position/W)!==Math.floor(next/W)
   ||braveStealthTile(next)==='#')return {state:s,event:'blocked'};
  position=next;
 }
 const guard=braveGuardColumn(tick);
 const distracted=distraction>0;
 if(distraction>0)distraction--;
 if(!distracted&&Math.floor(position/W)===1&&position%W===guard){
  position=start;event='caught';
 }
 const state={position,tick,distraction,usedDistraction:used,caught:s.caught+(event==='caught'?1:0)};
 if(braveStealthComplete(state))event='win';
 return {state,event};
}
export const braveStealthKey=(s:BraveStealthState)=>[
 s.position,s.tick%bravePatrol.length,s.distraction,s.usedDistraction?1:0
].join(':');
/** Verify at least one winning route from start by exhaustive time-state BFS. */
export function solveBraveStealth():BraveStealthAction[]{
 const moves:BraveStealthAction[]=['up','right','down','left','wait','distract'];
 const initial=braveStealthInitial(),queue=[initial],seen=new Set([braveStealthKey(initial)]);
 const parent=new Map<string,{previous:string;action:BraveStealthAction}>();
 for(let i=0;i<queue.length;i++){
  const current=queue[i],from=braveStealthKey(current);
  if(braveStealthComplete(current)){
   const result:BraveStealthAction[]=[];let key=from;
   while(key!==braveStealthKey(initial)){
    const step=parent.get(key);if(!step)throw Error('Lost stealth route');
    result.push(step.action);key=step.previous;
   }
   return result.reverse();
  }
  for(const action of moves){
   const next=braveStealthMove(current,action);
   if(next.event==='blocked')continue;
   const id=braveStealthKey(next.state);
   if(seen.has(id))continue;
   seen.add(id);parent.set(id,{previous:from,action});queue.push(next.state);
  }
 }
 return [];
}
