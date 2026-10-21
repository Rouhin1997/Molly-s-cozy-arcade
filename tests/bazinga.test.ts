import { describe,expect,it } from 'vitest';
import {
  seatingCases,seatingRules,validSeatingArrangements,validateSeatingCases,ruleHolds,
  dailySeatingCase,practiceSeatingCase,cast,
} from '../src/data/bazinga';
import {
  awardSeatingResult,bazingaAttempts,bazingaHints,newSeatingRound,
  selectGuest,seatGuest,checkSeating,revealSeatingHint,isSeatingUntouched,
  initialBazingaProgress,
} from '../src/lib/bazinga';
import { passportSummary } from '../src/lib/passport';
import { initialProgress } from '../src/lib/game';
import { initialConnections } from '../src/lib/connections';
import { initialToonProgress } from '../src/lib/toon';

const easy=seatingCases.find(c=>c.difficulty==='easy')!;
const clever=seatingCases.find(c=>c.difficulty==='medium')!;
const expert=seatingCases.find(c=>c.difficulty==='hard')!;

describe('18 curated seating cases',()=>{
  it('has exactly six unique cases per difficulty, with distinct roster sizes',()=>{
    expect(seatingCases).toHaveLength(18);
    for(const [d,n] of [['easy',4],['medium',5],['hard',6]] as const){
      const group=seatingCases.filter(c=>c.difficulty===d);
      expect(group).toHaveLength(6);
      expect(group.every(c=>c.solution.length===n)).toBe(true);
    }
    expect(Object.keys(cast)).toHaveLength(8);
    expect(validateSeatingCases()).toEqual([]);
  });
  it('exhaustively proves there is one solution to EVERY clue set',()=>{
    for(const c of seatingCases){
      expect(validSeatingArrangements(c)).toEqual([c.solution]);
      expect(seatingRules(c)).toEqual(seatingRules(c));
      expect(seatingRules(c).length).toBeGreaterThanOrEqual(3);
    }
  });
  it('has deterministic daily puzzles, and grade-filtered practice',()=>{
    expect(dailySeatingCase('2026-10-21','easy')).toEqual(dailySeatingCase('2026-10-21','easy'));
    expect(dailySeatingCase('2026-10-21','easy').id).not.toBe(dailySeatingCase('2026-10-21','hard').id);
    expect(practiceSeatingCase('medium',[],()=>0).difficulty).toBe('medium');
    const avoid=seatingCases.filter(c=>c.difficulty==='medium').slice(0,4).map(c=>c.id);
    expect(avoid).not.toContain(practiceSeatingCase('medium',avoid,()=>0).id);
  });
  it('ensures every statement in each case is true for its solution',()=>{
    for(const c of seatingCases){
      expect(seatingRules(c).every(rule=>ruleHolds(c.solution,rule))).toBe(true);
    }
  });
});

describe('seating interactions',()=>{
  it('allows selecting, assigning, moving, swapping, and clearing chairs',()=>{
    let r=newSeatingRound(easy);
    expect(isSeatingUntouched(r)).toBe(true);
    r=seatGuest(selectGuest(r,easy.solution[0]),0);
    expect(r.chairs[0]).toBe(easy.solution[0]);
    expect(isSeatingUntouched(r)).toBe(false);
    r=seatGuest(selectGuest(r,easy.solution[1]),1);
    r=seatGuest(selectGuest(r,easy.solution[0]),1);
    expect(r.chairs[1]).toBe(easy.solution[0]);
    expect(r.chairs[0]).toBe(easy.solution[1]);
    r=seatGuest(r,0);
    expect(r.chairs[0]).toBe(null);
  });
  it('cannot score until every seat is occupied',()=>{
    const r=newSeatingRound(easy);
    expect(checkSeating(r,easy)).toBe(r);
  });
  it('awards stars on valid solution using challenge multipliers',()=>{
    for(const c of [easy,clever,expert]){
      let r=newSeatingRound(c);
      c.solution.forEach((guest,i)=>{r=seatGuest(selectGuest(r,guest),i)});
      r=checkSeating(r,c);
      expect(r.status).toBe('won');
      expect(r.score).toBe(c.difficulty==='easy'?180:c.difficulty==='medium'?270:360);
    }
  });
  it('limits tries by tier, and never gives points for a lost round',()=>{
    expect(bazingaAttempts('easy')).toBe(4);
    expect(bazingaAttempts('medium')).toBe(3);
    expect(bazingaAttempts('hard')).toBe(2);
    for(const c of [easy,clever,expert]){
      let r=newSeatingRound(c);
      const reversed=[...c.solution].reverse();
      reversed.forEach((guest,i)=>{r=seatGuest(selectGuest(r,guest),i)});
      for(let i=0;i<bazingaAttempts(c.difficulty);i++)r=checkSeating(r,c);
      expect(r.status).toBe('lost');
      expect(r.score).toBe(0);
    }
  });
  it('gives no hints on Expert and fills a correct fixed seat on Cozy',()=>{
    expect(bazingaHints('hard')).toBe(0);
    let r=revealSeatingHint(newSeatingRound(easy),easy);
    expect(r.hints).toBe(1);
    const seat=r.locked[0];
    expect(r.chairs[seat]).toBe(easy.solution[seat]);
    expect(seatGuest(r,seat)).toBe(r);
    expect(revealSeatingHint(newSeatingRound(expert),expert).hints).toBe(0);
  });
  it('does not award duplicate stars for playing a case twice',()=>{
    let r=newSeatingRound(easy);
    easy.solution.forEach((guest,i)=>{r=seatGuest(selectGuest(r,guest),i)});
    r=checkSeating(r,easy);
    const first=awardSeatingResult(initialBazingaProgress(),r);
    expect(first.stats.stars).toBe(180);
    expect(first.stats.solved).toBe(1);
    const repeat=awardSeatingResult(first,r);
    expect(repeat.stats.stars).toBe(180);
    expect(repeat.stats.solved).toBe(1);
    expect(repeat.stats.played).toBe(2);
  });
});

describe('Passport integration and legacy compatibility',()=>{
  it('includes new achievements and records while preserving existing totals',()=>{
    const b=initialBazingaProgress();
    b.stats.solved=5;
    b.stats.stars=300;
    const p=passportSummary({guess:initialProgress(),connections:initialConnections(),toon:initialToonProgress(),bazinga:b});
    expect(p.stars).toBe(300);
    expect(p.solved).toBe(5);
    expect(p.games.map(x=>x.id)).toContain('bazinga');
    expect(p.stamps.find(x=>x.id==='logic')?.earned).toBe(true);
    expect(p.stamps.find(x=>x.id==='theorem')?.earned).toBe(true);
  });
  it('still accepts old three-game Passport summaries',()=>{
    const p=passportSummary({guess:initialProgress(),connections:initialConnections(),toon:initialToonProgress()});
    expect(p.stars).toBe(0);
    expect(p.games.find(x=>x.id==='bazinga')?.solved).toBe(0);
  });
});
