/**
 * Brave Module 02: deterministic, testable pathfinding rules.
 * No React, browser APIs, timers or hidden randomness.
 * One authored prototype only; this is not the 18-level campaign.
 */
export type BraveDirection = 'up' | 'right' | 'down' | 'left';
export const braveDirections: readonly BraveDirection[] = ['up','right','down','left'];
export type BraveTile = '#' | '.' | 'S' | 'W' | 'A' | 'G' | 'E';
export type BraveLevel = {id:string; title:string; rows:readonly string[]};
export type BravePuzzleState = {
  position:number;
  wisps:readonly number[];
  stones:readonly number[];
  moves:number;
};
export type BraveMove = {
  state:BravePuzzleState;
  moved:boolean;
  event:'wisp'|'stone'|'gate'|'finish'|null;
  reason:string|null;
};

export const bravePrototypeLevel:BraveLevel = {
 id:'first-crossing',
 title:'The First Crossing',
 rows:[
  '###########',
  '#S..#....E#',
  '#.#.#####G#',
  '#.#...#...#',
  '#.#####.#.#',
  '#..W...A..#',
  '###########'
 ]
};

export function braveWidth(level:BraveLevel):number{return level.rows[0]?.length??0}
export function braveTile(level:BraveLevel,index:number):BraveTile{
 const width=braveWidth(level);
 if(!width||index<0||index>=width*level.rows.length)return '#';
 return (level.rows[Math.floor(index/width)][index%width]??'#') as BraveTile;
}
export function bravePosition(level:BraveLevel,index:number):{row:number;col:number}{
 const width=braveWidth(level);
 return {row:Math.floor(index/width),col:index%width};
}
export function bravePuzzleIssues(level:BraveLevel):string[]{
 const errors:string[]=[];
 const width=braveWidth(level),height=level.rows.length;
 if(width<4||width>30||height<4||height>30)errors.push('Puzzle must fit a 4–30 tile rectangular grid');
 if(level.rows.some(row=>row.length!==width))errors.push('Puzzle rows must have equal widths');
 const all=level.rows.join('');
 if(/[^#.SWAGE]/.test(all))errors.push('Unknown tile glyph');
 for(const glyph of ['S','E','W','A','G']){
  const n=[...all].filter(c=>c===glyph).length;
  if(n!==1)errors.push('Expected exactly one '+glyph+' tile');
 }
 return errors;
}
export function braveInitialState(level:BraveLevel):BravePuzzleState{
 const errors=bravePuzzleIssues(level);
 if(errors.length)throw new Error(errors.join('; '));
 const position=level.rows.join('').indexOf('S');
 return {position,wisps:[],stones:[],moves:0};
}
export function braveCompleted(level:BraveLevel,state:BravePuzzleState):boolean{
 const all=level.rows.join('');
 return braveTile(level,state.position)==='E'
  && state.wisps.length===all.split('W').length-1
  && state.stones.length===all.split('A').length-1;
}
export function braveMove(level:BraveLevel,state:BravePuzzleState,dir:BraveDirection):BraveMove{
 if(braveCompleted(level,state))return {state,moved:false,event:null,reason:'The crossing is complete.'};
 const w=braveWidth(level),{row,col}=bravePosition(level,state.position);
 const vectors:Record<BraveDirection,[number,number]>={
  up:[-1,0],right:[0,1],down:[1,0],left:[0,-1]
 };
 const [dr,dc]=vectors[dir],nr=row+dr,nc=col+dc;
 if(nr<0||nc<0||nr>=level.rows.length||nc>=w){
  return {state,moved:false,event:null,reason:'The path ends here.'};
 }
 const next=nr*w+nc,tile=braveTile(level,next);
 if(tile==='#')return {state,moved:false,event:null,reason:'The old stones block the way.'};
 if(tile==='G'&&state.stones.length===0){
  return {state,moved:false,event:null,reason:'The gate is sleeping. Awaken the standing stone first.'};
 }
 const wisps=tile==='W'&&!state.wisps.includes(next)
  ?[...state.wisps,next].sort((a,b)=>a-b):state.wisps;
 const stones=tile==='A'&&wisps.length>0&&!state.stones.includes(next)
  ?[...state.stones,next].sort((a,b)=>a-b):state.stones;
 const result:BravePuzzleState={position:next,wisps,stones,moves:state.moves+1};
 const event=braveCompleted(level,result)?'finish'
  :stones.length>state.stones.length?'stone'
  :wisps.length>state.wisps.length?'wisp'
  :tile==='G'?'gate':null;
 return {state:result,moved:true,event,reason:null};
}
export function braveStateKey(state:BravePuzzleState):string{
 return state.position+'|'+state.wisps.join(',')+'|'+state.stones.join(',');
}
export type BraveAnalysis={
 issues:string[];
 reachableStates:number;
 statesWithRouteToExit:number;
 shortestSolution:BraveDirection[];
};
/**
 * Exhaustive finite-state exploration, including pickup and switch states.
 * Reverse reachability proves that EVERY reachable state can finish:
 * successful initial path alone is not enough to exclude softlocks.
 */
export function analyzeBravePuzzle(level:BraveLevel):BraveAnalysis{
 const issues=bravePuzzleIssues(level);
 const empty=(problems:string[]):BraveAnalysis=>({
  issues:problems,reachableStates:0,statesWithRouteToExit:0,shortestSolution:[]
 });
 if(issues.length)return empty(issues);
 const first=braveInitialState(level),firstKey=braveStateKey(first);
 const queue:BravePuzzleState[]=[first],seen=new Map([[firstKey,first]]);
 const parent=new Map<string,{previous:string;direction:BraveDirection}>();
 const reverse=new Map<string,string[]>(),victories:string[]=[];
 for(let at=0;at<queue.length;at++){
  const state=queue[at],key=braveStateKey(state);
  if(braveCompleted(level,state)){victories.push(key);continue}
  for(const direction of braveDirections){
   const result=braveMove(level,state,direction);
   if(!result.moved)continue;
   const other=braveStateKey(result.state);
   reverse.set(other,[...(reverse.get(other)??[]),key]);
   if(!seen.has(other)){
    seen.set(other,result.state);
    parent.set(other,{previous:key,direction});
    queue.push(result.state);
    if(queue.length>50000)return empty(['Puzzle state space is too large to validate']);
   }
  }
 }
 if(!victories.length)return {
  issues:['No winning path from the starting tile'],reachableStates:seen.size,
  statesWithRouteToExit:0,shortestSolution:[]
 };
 const reachable=new Set(victories),pending=[...victories];
 for(let at=0;at<pending.length;at++){
  for(const previous of reverse.get(pending[at])??[]){
   if(!reachable.has(previous)){reachable.add(previous);pending.push(previous)}
  }
 }
 const solution:BraveDirection[]=[];
 let target=victories[0];
 while(target!==firstKey){
  const link=parent.get(target);
  if(!link)return empty(['Path reconstruction failed']);
  solution.push(link.direction);target=link.previous;
 }
 solution.reverse();
 if(reachable.size!==seen.size)issues.push('A reachable position has no route back to a winning state');
 return {issues,reachableStates:seen.size,statesWithRouteToExit:reachable.size,shortestSolution:solution};
}
