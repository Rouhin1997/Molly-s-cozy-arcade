import {describe,it,expect,vi} from 'vitest';
import {braveCampaignStages,braveChapterBridges} from '../src/data/braveCampaign';
import {analyzeBravePuzzle,braveInitialState,braveMove,braveCompleted} from '../src/lib/bravePuzzle';
import {braveFinaleRoutes,makeBraveFinaleRoute} from '../src/lib/braveFinaleRoutes';
import {
 braveStealthInitial,braveStealthMove,braveStealthComplete,solveBraveStealth,
 bravePatrol,braveGuardColumn
} from '../src/lib/braveStealth';
import {braveCircleStones,braveCircleStart,braveCircleTurn,braveCircleComplete,braveCircleCount} from '../src/lib/braveCircle';
import {
 braveTapestrySolved,braveTapestryScrambled,braveTapestryTurn,braveTapestryCheck,
 braveTapestryRestorable,braveRotateMask
} from '../src/lib/braveTapestry';
import {
 freshBraveJourney,completeBraveStage,chooseBraveStage,normalizeBraveJourney,
 readBraveJourney,writeBraveJourney,BRAVE_JOURNEY_KEY
} from '../src/lib/braveProgress';

describe('Brave Chapters IV–VI — full story and puzzle integrity',()=>{
 it('continues the existing nine-stage saves into 18 ordered scenes without renaming old IDs',()=>{
  const stages=braveCampaignStages;
  expect(stages).toHaveLength(18);
  expect(stages.map(s=>s.index)).toEqual(Array.from({length:18},(_,i)=>i));
  expect(new Set(stages.map(s=>s.id)).size).toBe(18);
  expect(stages.slice(9).map(s=>s.chapterId)).toEqual([
   'castle','castle','castle','shadow','shadow','shadow','bond','bond','bond'
  ]);
  expect(stages.slice(9).map(s=>s.kind)).toEqual([
   'route','stealth','route','route','circle','route','route','tapestry','tapestry'
  ]);
  expect(Object.keys(braveChapterBridges)).toHaveLength(6);
  for(const stage of stages.slice(9)){
   expect(stage.scene.length,stage.id).toBeGreaterThan(125);
   expect(stage.ending.length,stage.id).toBeGreaterThan(95);
   expect(stage.merida.length,stage.id).toBeGreaterThan(70);
   expect(stage.molly.length,stage.id).toBeGreaterThan(90);
  }
 });
 it('exhaustively certifies every second-act labyrinth can finish from every reachable state',()=>{
  expect(Object.keys(braveFinaleRoutes)).toHaveLength(5);
  for(const [id,level] of Object.entries(braveFinaleRoutes)){
   const report=analyzeBravePuzzle(level);
   expect(report.issues,id).toEqual([]);
   expect(report.reachableStates,id).toBeGreaterThan(30);
   expect(report.statesWithRouteToExit,id).toBe(report.reachableStates);
   expect(report.shortestSolution.length,id).toBeGreaterThan(25);
   let state=braveInitialState(level);
   for(const dir of report.shortestSolution){
    const result=braveMove(level,state,dir);
    expect(result.moved).toBe(true);
    state=result.state;
   }
   expect(braveCompleted(level,state),id).toBe(true);
   expect(state.wisps.length,id).toBeGreaterThanOrEqual(1);
   expect(state.stones.length,id).toBeGreaterThanOrEqual(1);
  }
 });
 it('fixed map seeds give reproducible rooms with meaningful variation',()=>{
  expect(makeBraveFinaleRoute({id:'x',title:'X',width:15,height:13,seed:14,wisps:1,stones:1,key:false,gate:'G'}).rows)
   .toEqual(makeBraveFinaleRoute({id:'x',title:'X',width:15,height:13,seed:14,wisps:1,stones:1,key:false,gate:'G'}).rows);
  expect(braveFinaleRoutes.midnight.rows).not.toEqual(braveFinaleRoutes.passage.rows);
  expect(()=>makeBraveFinaleRoute({id:'bad',title:'Bad',width:12,height:14,seed:12,wisps:1,stones:1,key:false,gate:'G'})).toThrow();
 });
 it('stealth patrol is predictable and forgiving, with optional four-turn distraction',()=>{
  expect(bravePatrol.length).toBeGreaterThan(5);
  expect(braveGuardColumn(0)).toBe(braveGuardColumn(bravePatrol.length));
  const first=braveStealthInitial();
  const initialTry=braveStealthMove(first,'distract');
  expect(initialTry.state.usedDistraction).toBe(true);
  expect(initialTry.state.distraction).toBe(3);
  expect(braveStealthMove(initialTry.state,'distract').event).toBe('blocked');
  expect(braveStealthMove(first,'up').event).toBe('blocked');
  const solution=solveBraveStealth();
  expect(solution.length).toBeGreaterThan(5);
  expect(solution.length).toBeLessThan(90);
  let state=first;
  for(const action of solution){
   const next=braveStealthMove(state,action);
   expect(next.event).not.toBe('blocked');
   state=next.state;
  }
  expect(braveStealthComplete(state)).toBe(true);
 });
 it('the five standing stones require decipherable bearings, not a random choice',()=>{
  const start=[...braveCircleStart];
  expect(braveCircleComplete(start)).toBe(false);
  for(let i=0;i<braveCircleStones.length;i++){
   while(start[i]!==braveCircleStones[i].correct){
    const turned=braveCircleTurn(start,i);start.splice(0,start.length,...turned);
   }
  }
  expect(braveCircleCount(start)).toBe(5);
  expect(braveCircleComplete(start)).toBe(true);
  expect(braveCircleTurn(start,99)).toEqual(start);
 });
 it('both tapestry sizes have exact valid golden-thread solutions, while scrambles are not solved',()=>{
  for(const size of [3,4] as const){
   const solved=braveTapestrySolved(size),scrambled=braveTapestryScrambled(size);
   const check=braveTapestryCheck(solved);
   expect(check.solved).toBe(true);
   expect(check.connected).toBe(size*size);
   expect(check.correctLinks).toBe(size*size-1);
   expect(braveTapestryCheck(scrambled).solved).toBe(false);
   expect(braveTapestryRestorable(scrambled)).toBe(true);
   let current=scrambled;
   for(let i=0;i<current.rotations.length;i++){
    const turns=(4-current.rotations[i])%4;
    for(let t=0;t<turns;t++)current=braveTapestryTurn(current,i);
   }
   expect(braveTapestryCheck(current).solved).toBe(true);
   expect(braveRotateMask(1,4)).toBe(1);
   expect(braveRotateMask(1,1)).toBe(2);
  }
 });
 it('old saves with 9 completed scenes cleanly unlock Chapter IV and continue to the finale',()=>{
  const oldIds=braveCampaignStages.slice(0,9).map(s=>s.id);
  let save=normalizeBraveJourney({version:1,completed:oldIds,current:'secret'});
  expect(save.completed).toHaveLength(9);
  expect(chooseBraveStage(save,'midnight').current).toBe('midnight');
  expect(chooseBraveStage(save,'brave-heart')).toEqual(save);
  for(const scene of braveCampaignStages.slice(9)){
   save=completeBraveStage(save,scene.id);
  }
  expect(save.completed).toHaveLength(18);
  expect(completeBraveStage(save,'brave-heart')).toEqual(save);
  const final=chooseBraveStage(save,'brave-heart');
  expect(final.current).toBe('brave-heart');
  const store=new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>store.get(k)??null,
   setItem:(k:string,v:string)=>{store.set(k,v)}});
  try{
   writeBraveJourney(final);
   expect(readBraveJourney()).toEqual(final);
   expect([...store.keys()]).toEqual([BRAVE_JOURNEY_KEY]);
  }finally{vi.unstubAllGlobals()}
 });
});
