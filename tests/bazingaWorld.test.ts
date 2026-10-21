import { describe,expect,it } from 'vitest';
import { rooms, roomCases, roomRules, roomSolutions, validateRoomWorld, holdsRoomRule, dailyRoomCase, practiceRoomCase, roomRuleText } from '../src/data/bazingaWorld';
import { newWorldRound,placeWorldGuest,selectWorldGuest,checkWorld,hintWorld,untouchedWorldRound,worldOrder,creditWorldRound,worldHints,worldAttempts } from '../src/lib/bazingaWorld';
import { initialBazingaProgress } from '../src/lib/bazinga';

describe('Eight original sitcom-inspired room maps',()=>{
  it('provides eight different furniture maps and 18 authored levels',()=>{
    expect(Object.keys(rooms)).toHaveLength(8);
    expect(roomCases).toHaveLength(18);
    for(const d of ['easy','medium','hard'] as const) expect(roomCases.filter(c=>c.difficulty===d)).toHaveLength(6);
    expect(validateRoomWorld()).toEqual([]);
  });
  it('guarantees exactly one answer for each scenario by exhaustive permutation',()=>{
    for(const c of roomCases){
      expect(roomSolutions(c)).toEqual([c.solution]);
      expect(roomRules(c).every(r=>holdsRoomRule(c,c.solution,r))).toBe(true);
      expect(roomRules(c).length).toBeGreaterThanOrEqual(c.difficulty==='hard'?8:c.difficulty==='medium'?6:4);
      expect(roomRules(c).every(r=>roomRuleText(c,r).length>15)).toBe(true);
    }
  });
  it('makes room geography matter, especially Sheldon’s sacred seat and sick-day distance',()=>{
    const apartment=roomCases.find(c=>c.id==='star-wars-4a')!;
    expect(apartment.seatIds[apartment.solution.indexOf('Sheldon')]).toBe('spot');
    const sickness=roomCases.find(c=>c.id==='sick-day')!;
    const distancing=sickness.rules.find(r=>r.type==='far-from-guest')!;
    expect(holdsRoomRule(sickness,sickness.solution,distancing)).toBe(true);
    const incorrect=[...sickness.solution];
    const a=incorrect.indexOf('Sheldon'),b=incorrect.indexOf('Penny');
    [incorrect[a],incorrect[b]]=[incorrect[b],incorrect[a]];
    expect(holdsRoomRule(sickness,incorrect,distancing)).toBe(false);
  });
  it('fixes daily selection and filters practices by tier and recent cases',()=>{
    expect(dailyRoomCase('2026-10-22','easy').id).toBe(dailyRoomCase('2026-10-22','easy').id);
    const exclude=roomCases.filter(c=>c.difficulty==='hard').slice(0,4).map(c=>c.id);
    expect(exclude).not.toContain(practiceRoomCase('hard',exclude,()=>0).id);
  });
});

describe('Room adventure scoring, hints and preservation',()=>{
  const c=roomCases.find(x=>x.id==='star-wars-4a')!;
  it('places, swaps, clears and locks real seat IDs, without scoring an incomplete board',()=>{
    let r=newWorldRound(c);
    expect(untouchedWorldRound(r)).toBe(true);
    expect(checkWorld(r,c)).toBe(r);
    r=placeWorldGuest(selectWorldGuest(r,c,c.solution[0]),c,c.seatIds[0]);
    expect(r.placements[c.seatIds[0]]).toBe(c.solution[0]);
    r=placeWorldGuest(selectWorldGuest(r,c,c.solution[1]),c,c.seatIds[1]);
    r=placeWorldGuest(selectWorldGuest(r,c,c.solution[0]),c,c.seatIds[1]);
    expect(r.placements[c.seatIds[0]]).toBe(c.solution[1]);
    r=placeWorldGuest(r,c,c.seatIds[0]);
    expect(r.placements[c.seatIds[0]]).toBe(null);
  });
  it('validates all 18 completed arrangements with scaled scores',()=>{
    for(const puzzle of roomCases){
      let r=newWorldRound(puzzle);
      puzzle.solution.forEach((name,i)=>{r=placeWorldGuest(selectWorldGuest(r,puzzle,name),puzzle,puzzle.seatIds[i])});
      expect(worldOrder(r,puzzle)).toEqual(puzzle.solution);
      r=checkWorld(r,puzzle);
      expect(r.status).toBe('won');
      expect(r.score).toBe(puzzle.difficulty==='easy'?180:puzzle.difficulty==='medium'?270:360);
    }
  });
  it('loses after the correct number of tries and shows the solution in data',()=>{
    expect(worldAttempts('easy')).toBe(4);expect(worldAttempts('hard')).toBe(2);
    for(const puzzle of roomCases){
      let r=newWorldRound(puzzle);
      const bad=[...puzzle.solution].reverse();
      bad.forEach((name,i)=>{r=placeWorldGuest(selectWorldGuest(r,puzzle,name),puzzle,puzzle.seatIds[i])});
      for(let t=0;t<worldAttempts(puzzle.difficulty);t++)r=checkWorld(r,puzzle);
      expect(r.status).toBe('lost');
      expect(r.score).toBe(0);
    }
  });
  it('uses fixed chair hints on Cozy, but none on Expert',()=>{
    expect(worldHints('hard')).toBe(0);
    const r=hintWorld(newWorldRound(c),c);
    expect(r.hints).toBe(1);
    const id=r.fixed[0];
    expect(r.placements[id]).toBe(c.solution[c.seatIds.indexOf(id)]);
    expect(placeWorldGuest(r,c,id)).toBe(r);
    const hard=roomCases.find(p=>p.difficulty==='hard')!;
    expect(hintWorld(newWorldRound(hard),hard).hints).toBe(0);
  });
  it('credits only the improved best score while keeping classic game data',()=>{
    let r=newWorldRound(c);
    c.solution.forEach((n,i)=>{r=placeWorldGuest(selectWorldGuest(r,c,n),c,c.seatIds[i])});
    r=checkWorld(r,c);
    const legacy=initialBazingaProgress();
    legacy.stats.stars=12;legacy.bestAwards['movie-sofa']=90;
    const once=creditWorldRound(legacy,r);
    const twice=creditWorldRound(once,r);
    expect(once.stats.stars).toBe(192);
    expect(twice.stats.stars).toBe(192);
    expect(twice.bestAwards['movie-sofa']).toBe(90);
  });
});
