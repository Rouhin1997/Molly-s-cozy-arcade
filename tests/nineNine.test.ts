import { describe,it,expect,vi } from 'vitest';
import { nineCases,caseCandidates,allNineCaseIssues,heistCaseIds,dailyNineCase,practiceNineCase } from '../src/data/nineNine';
import {
  freshNineProgress,newNineRound,inspectNineEvidence,connectNineEvidence,
  hintNine,allNineLinksSolved,setNineAccusation,submitNineAccusation,
  creditNineResult,pristineNineRound,nineHintLimit,nineGuessLimit,nineWrongPairLimit,
  readNineProgress,writeNineProgress,unlockedHeistCount,
} from '../src/lib/nineNine';
describe('Twelve curated 99 precinct files',()=>{
  it('covers all tiers and three linked Halloween Heist stages',()=>{
    expect(nineCases).toHaveLength(12);
    expect(allNineCaseIssues()).toEqual([]);
    for(const tier of ['easy','medium','hard'] as const)
      expect(nineCases.filter(c=>c.difficulty===tier)).toHaveLength(4);
    expect(nineCases.filter(c=>c.track==='heist').map(c=>c.id)).toEqual([...heistCaseIds]);
  });
  it('deduces one suspect and one method only from the full evidence',()=>{
    for(const c of nineCases){
      const ids=c.deductions.map(d=>d.id);
      expect(caseCandidates(c,[])).toHaveLength(12);
      expect(caseCandidates(c,ids)).toEqual([{suspect:c.culprit,method:c.method}]);
      expect(caseCandidates(c,ids.slice(0,-1)).length).toBeGreaterThan(1);
      for(let i=1;i<=ids.length;i++)
        expect(caseCandidates(c,ids.slice(0,i)).length).toBeLessThan(caseCandidates(c,ids.slice(0,i-1)).length);
    }
  });
  it('chooses reproducible daily cases and filtered practice cases',()=>{
    expect(dailyNineCase('2026-10-22','hard')).toEqual(dailyNineCase('2026-10-22','hard'));
    const avoid=nineCases.filter(c=>c.difficulty==='medium'&&c.track==='detective').slice(0,2).map(c=>c.id);
    expect(avoid).not.toContain(practiceNineCase('medium',avoid,()=>0).id);
  });
});
describe('Evidence investigation and deduction gameplay',()=>{
  it('inspects evidence, pins pairs, resolves authentic deductions',()=>{
    for(const c of nineCases){
      let round=newNineRound(c);
      expect(pristineNineRound(round)).toBe(true);
      for(const link of c.deductions){
        round=inspectNineEvidence(round,c,link.pair[0]);
        round=inspectNineEvidence(round,c,link.pair[1]);
        round=connectNineEvidence(round,c);
      }
      expect(allNineLinksSolved(round,c)).toBe(true);
      expect(round.wrongPairs).toBe(0);
      round=setNineAccusation(round,c,'suspect',c.culprit);
      round=setNineAccusation(round,c,'method',c.method);
      round=setNineAccusation(round,c,'proof',c.decisive);
      round=submitNineAccusation(round,c);
      expect(round.status).toBe('won');
      expect(round.score).toBe(c.difficulty==='easy'?210:c.difficulty==='medium'?315:420);
    }
  });
  it('rejects wrong evidence pairs without making unsupported links',()=>{
    const c=nineCases[0];let r=newNineRound(c);
    r=inspectNineEvidence(r,c,'e0');
    r=inspectNineEvidence(r,c,'e2');
    r=connectNineEvidence(r,c);
    expect(r.linked).toHaveLength(0);
    expect(r.wrongPairs).toBe(1);
  });
  it('applies difficulty-dependent hints and attempts',()=>{
    expect(nineHintLimit('easy')).toBe(2);
    expect(nineHintLimit('medium')).toBe(1);
    expect(nineHintLimit('hard')).toBe(0);
    expect(nineGuessLimit('hard')).toBe(1);
    expect(nineWrongPairLimit('hard')).toBeLessThan(nineWrongPairLimit('easy'));
    for(const c of nineCases){
      const r=hintNine(newNineRound(c),c);
      expect(r.linked.length).toBe(c.difficulty==='hard'?0:1);
    }
  });
  it('requires culprit, method AND decisive proof',()=>{
    const c=nineCases[0];let r=newNineRound(c);
    for(const link of c.deductions){
      r=inspectNineEvidence(r,c,link.pair[0]);
      r=inspectNineEvidence(r,c,link.pair[1]);
      r=connectNineEvidence(r,c);
    }
    r=setNineAccusation(r,c,'suspect',c.culprit);
    r=setNineAccusation(r,c,'method',c.method);
    r=setNineAccusation(r,c,'proof',c.deductions[0].id);
    r=submitNineAccusation(r,c);
    expect(r.status).toBe('playing');
    expect(r.attempts).toBe(1);
    r=setNineAccusation(r,c,'proof',c.decisive);
    r=submitNineAccusation(r,c);
    expect(r.status).toBe('won');
    expect(r.score).toBeLessThan(210);
  });
  it('awards a case only when its high score improves and heist unlocks sequentially',()=>{
    const c=nineCases.find(c=>c.id==='heist-one')!;
    let r=newNineRound(c);
    for(const link of c.deductions){r=inspectNineEvidence(r,c,link.pair[0]);r=inspectNineEvidence(r,c,link.pair[1]);r=connectNineEvidence(r,c)}
    r=setNineAccusation(r,c,'suspect',c.culprit);
    r=setNineAccusation(r,c,'method',c.method);
    r=setNineAccusation(r,c,'proof',c.decisive);
    r=submitNineAccusation(r,c);
    expect(unlockedHeistCount(freshNineProgress())).toBe(0);
    const once=creditNineResult(freshNineProgress(),r);
    expect(unlockedHeistCount(once)).toBe(1);
    const twice=creditNineResult(once,r);
    expect(twice.stats.stars).toBe(once.stats.stars);
    expect(twice.stats.solved).toBe(once.stats.solved);
  });
  it('round-trip reads and writes a versioned local save',()=>{
    const memory=new Map<string,string>();
    vi.stubGlobal('localStorage',{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>{memory.set(k,v)}});
    try{
      let p=freshNineProgress();p.stats.stars=140;
      p.practice=newNineRound(nineCases[1]);
      writeNineProgress(p);
      const restored=readNineProgress();
      expect(restored.stats.stars).toBe(140);
      expect(restored.practice?.caseId).toBe(nineCases[1].id);
    }finally{vi.unstubAllGlobals()}
  });
});
