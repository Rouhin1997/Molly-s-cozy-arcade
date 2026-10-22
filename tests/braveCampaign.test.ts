import {describe,it,expect,vi} from 'vitest';
import {braveCampaignStages,braveChapterBridges,braveArcheryTargets,braveRuneOrder} from '../src/data/braveCampaign';
import {analyzeBravePuzzle,braveMove,braveInitialState,braveCompleted} from '../src/lib/bravePuzzle';
import {braveShotIsCorrect,braveRuneStep} from '../src/lib/braveChallenges';
import {BRAVE_JOURNEY_KEY,freshBraveJourney,normalizeBraveJourney,
 completeBraveStage,chooseBraveStage,readBraveJourney,writeBraveJourney} from '../src/lib/braveProgress';

describe('Brave three connected chapters — campaign acceptance',()=>{
 it('has exactly three coherent chapters and nine unique playable scenes',()=>{
  expect(braveCampaignStages).toHaveLength(18);
  expect(new Set(braveCampaignStages.map(s=>s.id)).size).toBe(18);
  expect(braveCampaignStages.map(s=>s.index)).toEqual(Array.from({length:18},(_,i)=>i));
  expect(braveCampaignStages.slice(0,9).map(s=>s.chapterId)).toEqual([
   'highland','highland','highland','forest','forest','forest','witch','witch','witch'
  ]);
  expect(Object.keys(braveChapterBridges).sort()).toEqual(['bond','castle','forest','highland','shadow','witch']);
  for(const stage of braveCampaignStages.slice(0,9)){
   expect(stage.scene.length).toBeGreaterThan(110);
   expect(stage.merida.length).toBeGreaterThan(65);
   expect(stage.molly.length).toBeGreaterThan(65);
   expect(stage.ending.length).toBeGreaterThan(75);
   expect(stage.hint.length).toBeGreaterThan(25);
   expect(stage.kind==='route').toBe(Boolean(stage.route));
  }
 });
 it('exhaustively proves all seven map puzzles solvable with no softlocks',()=>{
  const levels=braveCampaignStages.slice(0,9).filter(s=>s.kind==='route');
  expect(levels).toHaveLength(7);
  for(const scene of levels){
   const level=scene.route!;
   const analysis=analyzeBravePuzzle(level);
   expect(analysis.issues,scene.id).toEqual([]);
   expect(analysis.reachableStates,scene.id).toBeGreaterThan(10);
   expect(analysis.statesWithRouteToExit,scene.id).toBe(analysis.reachableStates);
   expect(analysis.shortestSolution.length,scene.id).toBeGreaterThan(3);
   let current=braveInitialState(level);
   const events:string[]=[];
   for(const dir of analysis.shortestSolution){
    const next=braveMove(level,current,dir);
    expect(next.moved).toBe(true);
    if(next.event)events.push(next.event);
    current=next.state;
   }
   expect(braveCompleted(level,current),scene.id).toBe(true);
   expect(events,scene.id).toContain('finish');
   expect(events,scene.id).toContain('wisp');
   if(level.rows.join('').includes('G')){expect(events,scene.id).toContain('stone');expect(events,scene.id).toContain('gate')}
   if(level.rows.join('').includes('K'))expect(events,scene.id).toContain('key');
   const minimums:Record<string,number>={courtyard:7,angus:30,'first-light':38,stones:50,clearing:60,bargain:75,secret:85};
   expect(analysis.shortestSolution.length,scene.id).toBeGreaterThanOrEqual(minimums[scene.id]);
  }
 });
 it('requires proper crosswind compensation and draw strength at all three targets',()=>{
  expect(braveArcheryTargets).toHaveLength(3);
  for(const target of braveArcheryTargets){
   const exact=target.wind===1?'left':target.wind===-1?'right':'centre';
   const draw=target.range==='near'?'gentle':'strong';
   expect(braveShotIsCorrect(target,exact,draw)).toBe(true);
   for(const aim of ['left','centre','right'] as const){
    for(const pull of ['gentle','strong'] as const){
     expect(braveShotIsCorrect(target,aim,pull)).toBe(aim===exact&&pull===draw);
    }
   }
  }
 });
 it('solves four-rune carving after exploring the Witch’s clues, with a decoy',()=>{
  expect(braveRuneOrder).toEqual(['oak','river','light','hearth']);
  let at=0;
  at=braveRuneStep(at,'bear',braveRuneOrder);expect(at).toBe(0);
  at=braveRuneStep(at,'oak',braveRuneOrder);expect(at).toBe(1);
  at=braveRuneStep(at,'light',braveRuneOrder);expect(at).toBe(1);
  at=braveRuneStep(at,'river',braveRuneOrder);expect(at).toBe(2);
  at=braveRuneStep(at,'light',braveRuneOrder);expect(at).toBe(3);
  at=braveRuneStep(at,'hearth',braveRuneOrder);expect(at).toBe(4);
 });
 it('unlocks stages in linear story order and permits replay without skipped chapters',()=>{
  let save=freshBraveJourney();
  expect(save.completed).toEqual([]);
  expect(chooseBraveStage(save,braveCampaignStages[4].id)).toEqual(save);
  expect(completeBraveStage(save,braveCampaignStages[1].id)).toEqual(save);
  for(let i=0;i<9;i++){
   const id=braveCampaignStages[i].id;
   expect(chooseBraveStage(save,id).current).toBe(id);
   save=completeBraveStage(save,id);
   expect(save.completed).toHaveLength(i+1);
   expect(completeBraveStage(save,id)).toEqual(save);
  }
  expect(save.completed).toHaveLength(9);
  expect(chooseBraveStage(save,braveCampaignStages[0].id).current).toBe(braveCampaignStages[0].id);
 });
 it('repairs corrupted, old or malicious unlock data with a contiguous prefix',()=>{
  expect(normalizeBraveJourney(null)).toEqual(freshBraveJourney());
  expect(normalizeBraveJourney({version:9,completed:['secret']})).toEqual(freshBraveJourney());
  expect(normalizeBraveJourney({version:1,completed:['secret']})).toEqual(freshBraveJourney());
  const repaired=normalizeBraveJourney({
   version:1,completed:['courtyard','angus','archer','first-light','clearing','secret'],current:'secret'
  });
  expect(repaired.completed).toEqual(['courtyard','angus','archer','first-light']);
  expect(repaired.current).toBe('stones');
 });
 it('uses only its own local browser key and survives missing storage',()=>{
  const store=new Map<string,string>();
  vi.stubGlobal('localStorage',{
   getItem:(k:string)=>store.get(k)??null,setItem:(k:string,v:string)=>{store.set(k,v)}
  });
  try{
   const save=completeBraveStage(freshBraveJourney(),'courtyard');
   writeBraveJourney(save);
   expect(readBraveJourney()).toEqual(save);
   expect([...store.keys()]).toEqual([BRAVE_JOURNEY_KEY]);
   store.set(BRAVE_JOURNEY_KEY,'{damaged');
   expect(readBraveJourney()).toEqual(freshBraveJourney());
  }finally{vi.unstubAllGlobals()}
 });
});
