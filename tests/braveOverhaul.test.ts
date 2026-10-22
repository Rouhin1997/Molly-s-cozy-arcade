import {describe,it,expect} from 'vitest';
import {braveArcheryTargets,braveCampaignStages,braveRuneOrder} from '../src/data/braveCampaign';
import {braveShot,braveShotArc,BRAVE_AIM_ANGLES,BRAVE_DRAW_SPEEDS,BRAVE_ELEVATIONS} from '../src/lib/braveBallistics';
import {braveRuneScore,braveRuneSolved} from '../src/lib/braveChallenges';
import {braveInitialState,braveMove,nextBraveHint,braveCompleted,bravePuzzleIssues} from '../src/lib/bravePuzzle';

describe('Brave overhaul — real archery physics and fair challenge progression',()=>{
 it('calibrates three distinct shots using elevation, draw and wind compensation',()=>{
  const solutions=[
   {aim:-3,elevation:12,speed:40},
   {aim:3,elevation:12,speed:48},
   {aim:-3,elevation:20,speed:40}
  ];
  expect(braveArcheryTargets).toHaveLength(3);
  for(const [i,target] of braveArcheryTargets.entries()){
   const result=braveShot(target,solutions[i]);
   expect(result.hit,target.name).toBe(true);
   expect(result.quality).toBe('bullseye');
   expect(result.flightTime).toBeGreaterThan(0);
   const path=braveShotArc(target,solutions[i]);
   expect(path.split(' ')).toHaveLength(41);
  }
 });
 it('misses consistently when the player ignores wind, elevation or strength',()=>{
  for(const target of braveArcheryTargets){
   const shots=BRAVE_AIM_ANGLES.flatMap(aim=>
    BRAVE_ELEVATIONS.flatMap(elevation=>
     BRAVE_DRAW_SPEEDS.map(speed=>braveShot(target,{aim,elevation,speed}))));
   expect(shots.some(x=>x.hit),target.name).toBe(true);
   expect(shots.some(x=>!x.hit),target.name).toBe(true);
  }
  expect(braveShot(braveArcheryTargets[0],{aim:0,elevation:28,speed:32}).hit).toBe(false);
 });
 it('rejects invalid control values instead of silently faking a shot',()=>{
  expect(()=>braveShot(braveArcheryTargets[0],{aim:45,elevation:20,speed:40})).toThrow();
 });
 it('uses progressively more consequential puzzles with alternate locks',()=>{
  const routes=braveCampaignStages.slice(0,9).filter(s=>s.route).map(s=>s.route!);
  expect(routes).toHaveLength(7);
  expect(routes[0].rows.join('')).not.toMatch(/[KDH]/);
  expect(routes[3].rows.join('').split('W').length-1).toBe(2);
  expect(routes[5].rows.join('')).toMatch(/H/);
  expect(routes[6].rows.join('')).toMatch(/K/);
  for(const route of routes)expect(bravePuzzleIssues(route)).toEqual([]);
 });
 it('provides the next useful step from the CURRENT puzzle state, including after a detour',()=>{
  const level=braveCampaignStages.find(s=>s.id==='clearing')!.route!;
  let state=braveInitialState(level),count=0;
  while(!braveCompleted(level,state)&&count++<150){
   const direction=nextBraveHint(level,state);
   expect(direction).not.toBeNull();
   const next=braveMove(level,state,direction!);
   expect(next.moved).toBe(true);
   state=next.state;
  }
  expect(braveCompleted(level,state)).toBe(true);
  expect(nextBraveHint(level,state)).toBeNull();
 });
 it('makes the Witch rune puzzle an arrangement with one decoy and real feedback',()=>{
  expect(braveRuneOrder).toHaveLength(4);
  expect(braveRuneSolved(['oak','river','light','hearth'],braveRuneOrder)).toBe(true);
  expect(braveRuneSolved(['oak','bear','light','hearth'],braveRuneOrder)).toBe(false);
  expect(braveRuneScore(['oak','bear','light','hearth'],braveRuneOrder)).toBe(3);
 });
});
