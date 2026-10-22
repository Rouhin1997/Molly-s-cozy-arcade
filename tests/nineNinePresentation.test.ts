import { describe,it,expect } from 'vitest';
import { nineCases,caseCandidates } from '../src/data/nineNine';
import { ninePresentation,nineCasePresentation,nineDeductionImpact,ninePresentationIssues } from '../src/data/nineNinePresentation';
import { newNineRound,inspectNineEvidence,connectNineEvidence,submitNineAccusation,setNineAccusation } from '../src/lib/nineNine';

describe('Molly-led Nine-Nine polish',()=>{
 it('assigns Detective Molly and a unique, pertinent crew to every investigation',()=>{
  expect(Object.keys(ninePresentation)).toHaveLength(12);
  expect(ninePresentationIssues(nineCases)).toEqual([]);
  for(const c of nineCases){
   const story=nineCasePresentation(c);
   expect(story.team[0]).toBe('Molly');
   expect(new Set(story.team).size).toBe(4);
   expect(story.teamNote.length).toBeGreaterThan(65);
   expect(story.motivation.length).toBeGreaterThan(75);
   expect(story.reconstruction.toLowerCase()).toContain(c.culprit.toLowerCase().split(' ')[0]);
   expect(story.reconstruction.length).toBeGreaterThan(230);
  }
 });
 it('never invents the eliminated names or methods in completed explanation cards',()=>{
  for(const c of nineCases){
   let solved:string[]=[];
   for(const d of c.deductions){
    const impact=nineDeductionImpact(c,solved,d);
    const before=caseCandidates(c,solved);
    const after=caseCandidates(c,[...solved,d.id]);
    expect(impact.before).toBe(before.length);
    expect(impact.after).toBe(after.length);
    expect(impact.after).toBeLessThan(impact.before);
    for(const name of impact.removedSuspects){
     expect(before.some(x=>x.suspect===name)).toBe(true);
     expect(after.some(x=>x.suspect===name)).toBe(false);
    }
    for(const method of impact.removedMethods){
     expect(before.some(x=>x.method===method)).toBe(true);
     expect(after.some(x=>x.method===method)).toBe(false);
    }
    solved.push(d.id);
   }
   expect(caseCandidates(c,solved)).toEqual([{suspect:c.culprit,method:c.method}]);
  }
 });
 it('simulates a complete evidence-chain playthrough and final accusation across all case tiers',()=>{
  for(const c of nineCases){
   let r=newNineRound(c);
   for(const d of c.deductions){
    r=inspectNineEvidence(r,c,d.pair[0]);
    r=inspectNineEvidence(r,c,d.pair[1]);
    r=connectNineEvidence(r,c);
   }
   r=setNineAccusation(r,c,'suspect',c.culprit);
   r=setNineAccusation(r,c,'method',c.method);
   r=setNineAccusation(r,c,'proof',c.decisive);
   r=submitNineAccusation(r,c);
   expect(r.status).toBe('won');
  }
 });
});
