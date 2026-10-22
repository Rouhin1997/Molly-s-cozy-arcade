import { describe,it,expect } from 'vitest';
import { nineCases,caseCandidates,allNineCaseIssues } from '../src/data/nineNine';
import { verifiedCases,verifiedCaseIssues } from '../src/data/nineNineVerified';
import { nineCasePresentation } from '../src/data/nineNinePresentation';
import { freshNineProgress,newNineRound,normalizeNineProgress } from '../src/lib/nineNine';

describe('Evidence-first casebook: exhaustive counterfactual audit',()=>{
 it('requires EVERY evidence link to identify both the culprit and the method, regardless of connection order',()=>{
  expect(nineCases).toHaveLength(12);
  expect(verifiedCaseIssues()).toEqual([]);
  expect(allNineCaseIssues()).toEqual([]);
  for(const c of nineCases){
   const n=c.deductions.length;
   const all=c.deductions.map(d=>d.id);
   expect(caseCandidates(c,all)).toEqual([{suspect:c.culprit,method:c.method}]);
   for(let mask=0;mask<(1<<n)-1;mask++){
    const links=all.filter((_,i)=>(mask&(1<<i))!==0);
    const grid=caseCandidates(c,links);
    expect(grid.length,`${c.id} has a premature complete solution from ${links.join(',')}`).toBeGreaterThan(1);
   }
   if(c.difficulty==='hard'||c.difficulty==='medium'){
    const beforeFinal=caseCandidates(c,all.slice(0,-1));
    expect(new Set(beforeFinal.map(p=>p.suspect)).size,`${c.id} culprit is obvious before final link`).toBeGreaterThan(1);
   }
   for(let i=0;i<n;i++){
    const d=c.deductions[i];
    const combined=d.pair.map(id=>c.evidence.find(e=>e.id===id)!.text).join(' ');
    for(const wrong of c.suspects.filter(x=>d.possibleSuspects&&!d.possibleSuspects.includes(x))){
      expect(combined.toLowerCase(),`${c.id}/${d.id} did not name excluded suspect ${wrong}`).toContain(wrong.toLowerCase());
    }
    for(const wrong of c.methods.filter(x=>d.possibleMethods&&!d.possibleMethods.includes(x))){
      expect(combined.toLowerCase(),`${c.id}/${d.id} did not name eliminated method ${wrong}`).toContain(wrong.toLowerCase());
    }
   }
  }
 });
 it('separates difficulty by real uncertainty throughout the evidence chain',()=>{
  const expected={easy:[12,4,2,1],medium:[12,6,4,1],hard:[12,9,6,4,1]};
  for(const c of nineCases){
    const ids=c.deductions.map(d=>d.id);
    const counts=Array.from({length:ids.length+1},(_,k)=>caseCandidates(c,ids.slice(0,k)).length);
    expect(counts,`${c.id} does not match its ${c.difficulty} tier`).toEqual(expected[c.difficulty]);
  }
 });
 it('gives every mystery an authored narrative that agrees with the verified deduction trail',()=>{
  for(const c of nineCases){
    const p=nineCasePresentation(c);
    const v=verifiedCases[c.id];
    expect(p.scene).toBe(v.scene);
    expect(p.reconstruction).toBe(v.reconstruction);
    expect(p.reconstruction.toLowerCase()).toContain(c.culprit.toLowerCase());
    expect(p.reconstruction.toLowerCase()).toContain(c.method.toLowerCase());
    expect(p.closing.length).toBeGreaterThan(40);
    expect(c.evidence.length).toBe(2*c.deductions.length);
    expect(new Set(c.evidence.map(e=>e.title)).size).toBe(c.evidence.length);
    // We deliberately withhold positive culprit identification from the earlier
    // alibi chains. That is what made Interrogation Clock too obvious before.
    for(const d of c.deductions.slice(0,-1)){
      const words=d.pair.map(id=>c.evidence.find(e=>e.id===id)!.text).join(' ').toLowerCase();
      expect(words,`${c.id} revealed culprit too early`).not.toContain(c.culprit.toLowerCase());
    }
  }
 });
 it('restores completed awards and cleared cases while refreshing obsolete active investigations',()=>{
  const p=freshNineProgress();
  const c=nineCases.find(c=>c.id==='interrogation-contradiction')!;
  const prior={...newNineRound(c),revision:undefined,linked:['link0'],inspected:['e1','e4']};
  p.practice=prior;
  p.daily['2026-10-22']=prior;
  p.heist['heist-one']={...newNineRound(nineCases.find(c=>c.id==='heist-one')!),revision:undefined,status:'won',score:210};
  p.bestAwards['99:heist-one']=210;p.stats.stars=210;p.stats.solved=1;
  const next=normalizeNineProgress(p);
  expect(next.practice?.linked).toEqual([]);
  expect(next.practice?.revision).toBe(2);
  expect(next.daily['2026-10-22'].linked).toEqual([]);
  expect(next.practice?.feedback).toContain('updated');
  expect(next.heist['heist-one'].status).toBe('won');
  expect(next.bestAwards['99:heist-one']).toBe(210);
  expect(next.stats.stars).toBe(210);
  expect(next.stats.solved).toBe(1);
 });
});
