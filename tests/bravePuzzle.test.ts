import {describe,it,expect} from 'vitest';
import {
 analyzeBravePuzzle,bravePrototypeLevel,bravePuzzleIssues,braveInitialState,braveMove,
 braveCompleted,bravePosition,braveTile,braveStateKey,braveDirections,type BraveDirection
} from '../src/lib/bravePuzzle';
import {braveMusicThemes} from '../src/lib/braveMusic';
import {braveChapters} from '../src/data/braveWorld';

const level=bravePrototypeLevel;
describe('Brave Module 02 — deterministic path engine',()=>{
 it('has a rectangular, legible and solvable authored glen',()=>{
  expect(bravePuzzleIssues(level)).toEqual([]);
  const analysis=analyzeBravePuzzle(level);
  expect(analysis.issues).toEqual([]);
  expect(analysis.reachableStates).toBeGreaterThan(20);
  expect(analysis.reachableStates).toBe(analysis.statesWithRouteToExit);
  expect(analysis.shortestSolution.length).toBeGreaterThan(10);
 });
 it('starts on S without silently awarding progress',()=>{
  const fresh=braveInitialState(level);
  expect(braveTile(level,fresh.position)).toBe('S');
  expect(fresh.wisps).toEqual([]);expect(fresh.stones).toEqual([]);
  expect(fresh.moves).toBe(0);expect(braveCompleted(level,fresh)).toBe(false);
 });
 it('cannot walk through walls, bounds or an unawakened gate',()=>{
  const first=braveInitialState(level);
  const wall=braveMove(level,first,'up');
  expect(wall.moved).toBe(false);expect(wall.state).toBe(first);
  const gate=level.rows.join('').indexOf('G');
  const below={...first,position:gate+level.rows[0].length};
  const locked=braveMove(level,below,'up');
  expect(locked.moved).toBe(false);
  expect(locked.reason).toMatch(/Awaken/);
 });
 it('collects a wisp, lights a stone, opens the only gate and finishes in order',()=>{
  const directions=analyzeBravePuzzle(level).shortestSolution;
  let state=braveInitialState(level);
  const events:string[]=[];
  for(const dir of directions){
   const attempt=braveMove(level,state,dir);
   expect(attempt.moved).toBe(true);
   if(attempt.event)events.push(attempt.event);
   expect(attempt.state.moves).toBe(state.moves+1);
   state=attempt.state;
  }
  expect(events).toEqual(['wisp','stone','gate','finish']);
  expect(braveCompleted(level,state)).toBe(true);
  const completed=braveMove(level,state,'left');
  expect(completed.moved).toBe(false);expect(completed.state).toBe(state);
 });
 it('never mutates snapshots, so undo/reset are lossless',()=>{
  const before=braveInitialState(level);
  const after=braveMove(level,before,'down').state;
  expect(braveStateKey(before)).not.toBe(braveStateKey(after));
  expect(before.moves).toBe(0);
  expect(after.moves).toBe(1);
  expect(bravePosition(level,before.position)).toEqual({row:1,col:1});
  expect(braveStateKey(braveInitialState(level))).toBe(braveStateKey(before));
 });
 it('rejects structurally corrupt and impossible rooms',()=>{
  expect(bravePuzzleIssues({...level,rows:['S','E']})).not.toEqual([]);
  expect(bravePuzzleIssues({...level,rows:level.rows.map(r=>r.replace('W','?'))})).not.toEqual([]);
  const blocked={...level,rows:level.rows.map((row,i)=>i===4?'#######.#.#':row)};
  const audit=analyzeBravePuzzle(blocked);
  expect(audit.issues).toContain('No winning path from the starting tile');
 });
 it('supports all four cardinal steps and has no hidden random actions',()=>{
  expect(braveDirections).toEqual(['up','right','down','left'] satisfies BraveDirection[]);
  const s=braveInitialState(level);
  expect(braveMove(level,s,'down')).toEqual(braveMove(level,s,'down'));
  expect(braveMove(level,s,'right')).toEqual(braveMove(level,s,'right'));
 });
});
describe('Brave soundtrack — six original changing chapter moods',()=>{
 it('pairs each illustrated destination with a different melody and pace',()=>{
  const ids=braveChapters.map(c=>c.id);
  expect(Object.keys(braveMusicThemes).sort()).toEqual([...ids].sort());
  expect(new Set(ids.map(id=>braveMusicThemes[id].melody.join(','))).size).toBe(6);
  expect(new Set(ids.map(id=>braveMusicThemes[id].title)).size).toBe(6);
  for(const id of ids){
   const tune=braveMusicThemes[id];
   expect(tune.beatMs).toBeGreaterThanOrEqual(500);
   expect(tune.beatMs).toBeLessThan(800);
   expect(tune.melody).toHaveLength(16);
   expect(tune.bass).toHaveLength(4);
   expect(tune.melody.filter(note=>note>=0).length).toBeGreaterThan(12);
  }
 });
});
