import {describe,it,expect} from 'vitest';
import {indiaMysteries,indiaMysteryById,photoPage,photoFileUrl,indiaKindLabels} from '../src/data/indiaMysteries';
import {openExpedition,expeditionIds,mysteryRound,currentMystery,newMysteryRound,
 submitIndiaGuess,spendIndiaHint,matchesIndiaAnswer,proximity,advanceExpedition,
 dailyMystery,normalizeIndiaSave,freshIndiaSave,creditIndiaResult,MAX_ATTEMPTS,HINT_EARNING_STOPS} from '../src/lib/indiaQuest';

describe('WWWW India atlas · content and licensing',()=>{
 it('has a diverse subject bank with playable progressive hints and credited real photos',()=>{
  expect(indiaMysteries.length).toBeGreaterThanOrEqual(20);
  expect(new Set(indiaMysteries.map(x=>x.id)).size).toBe(indiaMysteries.length);
  for(const kind of ['who','what','where','when'] as const){
   expect(indiaMysteries.filter(x=>x.kind===kind).length).toBeGreaterThanOrEqual(3);
   expect(indiaKindLabels[kind].label).toBeTruthy();
  }
  for(const m of indiaMysteries){
   expect(m.intro.length).toBeGreaterThan(40);
   expect(m.beats).toHaveLength(3);
   expect(m.assists).toHaveLength(2);
   expect(m.aliases.length).toBeGreaterThanOrEqual(1);
   expect(m.fact.length).toBeGreaterThan(35);
   expect(indiaMysteryById(m.id)).toBe(m);
   if(m.photo){
    expect(m.photo.author.length).toBeGreaterThan(5);
    expect(m.photo.license).toMatch(/^(CC BY|Public domain)/);
    expect(photoPage(m.photo)).toContain('commons.wikimedia.org/wiki/File:');
    expect(photoFileUrl(m.photo)).toContain('/Special:FilePath/');
   }
  }
 });
 it('accepts meaningful regional synonyms, spaces, punctuation and transliterations',()=>{
  const pani=indiaMysteryById('pani-puri')!;
  for(const name of ['Pani Puri','Puchka','phuchka','FUCHKA','gol gappa','gupchup']){
   expect(matchesIndiaAnswer(pani,name)).toBe(true);
  }
  expect(matchesIndiaAnswer(indiaMysteryById('red-fort')!,'Laal Qila')).toBe(true);
  expect(matchesIndiaAnswer(indiaMysteryById('hawa-mahal')!,'Palace of Winds')).toBe(true);
  expect(matchesIndiaAnswer(pani,'chole kulche')).toBe(false);
 });
});
describe('Expedition gameplay and fairness',()=>{
 it('shuffles 12 unique stops with exactly three of each question kind',()=>{
  for(const seed of [1,2,12,99,12345]){
   const ids=expeditionIds(seed);
   expect(ids).toHaveLength(12);
   expect(new Set(ids).size).toBe(12);
   expect(expeditionIds(seed)).toEqual(ids);
   for(const k of ['who','what','where','when'])expect(ids.filter(x=>indiaMysteryById(x)?.kind===k)).toHaveLength(3);
  }
  expect(expeditionIds(1)).not.toEqual(expeditionIds(2));
 });
 it('reveals exactly one new clue per WRONG guess; duplicate attempts cost nothing',()=>{
  const card=indiaMysteryById('chole-kulche')!;
  let r=newMysteryRound(card.id);
  r=submitIndiaGuess(r,card,'pani puri');
  expect(r.reveal).toBe(1);
  expect(r.guesses).toHaveLength(1);
  expect(r.status).toBe('playing');
  const repeated=submitIndiaGuess(r,card,'PANI-PURI');
  expect(repeated.guesses).toHaveLength(1);
  expect(repeated.reveal).toBe(1);
  r=submitIndiaGuess(r,card,'dhuska');
  expect(r.reveal).toBe(2);
  r=submitIndiaGuess(r,card,'Taj Mahal');
  expect(r.reveal).toBe(3);
  r=submitIndiaGuess(r,card,'Hawa Mahal');
  expect(r.guesses).toHaveLength(MAX_ATTEMPTS);
  expect(r.status).toBe('missed');
  expect(r.feedback).toContain('Chole Kulche');
 });
 it('awards a clue budget on stops 1–10, banks unspent hints, and no new ones on the final two',()=>{
  let quest=openExpedition(5);
  expect(quest.hintBank).toBe(1);
  for(let i=0;i<12;i++){
   expect(quest.index).toBe(i);
   const c=currentMystery(quest)!;
   const completed=submitIndiaGuess(newMysteryRound(c.id),c,c.answer);
   quest={...quest,rounds:{...quest.rounds,[c.id]:completed}};
   quest=advanceExpedition(quest);
   expect(quest.hintBank).toBe(Math.min(i+2,HINT_EARNING_STOPS));
  }
  expect(quest.finished).toBe(true);
  expect(quest.index).toBe(12);
  expect(advanceExpedition(quest)).toBe(quest);
 });
 it('spends finite hints and caps extra notes at two per mystery',()=>{
  let round=newMysteryRound('dhuska'),bank=3;
  for(let i=0;i<2;i++){const result=spendIndiaHint(round,bank);round=result.round;bank=result.bank;}
  expect(round.extras).toBe(2);
  expect(bank).toBe(1);
  const denied=spendIndiaHint(round,bank);
  expect(denied.round).toBe(round);
  expect(denied.bank).toBe(1);
  expect(spendIndiaHint(newMysteryRound('dhuska'),0).round.extras).toBe(0);
 });
 it('awards a win, penalises hints/wrong guesses and avoids unlimited replay points',()=>{
  const c=indiaMysteryById('pani-puri')!;
  let r=newMysteryRound(c.id);
  r=submitIndiaGuess(r,c,'fuchka');
  expect(r.status).toBe('won');expect(r.score).toBe(260);
  const save=creditIndiaResult(freshIndiaSave(),r,'expedition');
  const repeat=creditIndiaResult(save,r,'expedition');
  expect(repeat.bestRun).toBe(save.bestRun);
  const harder=submitIndiaGuess(newMysteryRound(c.id),c,'dhuska');
  const hinted=spendIndiaHint(harder,1).round;
  const win=submitIndiaGuess(hinted,c,'golgappa');
  expect(win.score).toBeLessThan(r.score);
  expect(creditIndiaResult(repeat,win,'expedition').bestRun).toBe(save.bestRun);
 });
 it('gives factual proximity on known alternatives and never fabricates closeness',()=>{
  const c=indiaMysteryById('red-fort')!;
  expect(proximity(c,'Taj Mahal')).toContain('same topic');
  expect(proximity(indiaMysteryById('chole-kulche')!,'chole bhature')).toContain('same topic');
  expect(proximity(indiaMysteryById('red-fort')!,'Jama Masjid')).toContain('same associated region');
  expect(proximity(c,'zzzzxyq')).toMatch(/not in the comparison deck/);
  expect(proximity(c,'Red Fort')).toBe('Correct!');
 });
 it('maintains deterministic daily mystery and restores valid progress',()=>{
  expect(dailyMystery('2026-10-29')).toEqual(dailyMystery('2026-10-29'));
  const e=openExpedition(2),save={...freshIndiaSave(),expedition:e,runs:4};
  const restored=normalizeIndiaSave(JSON.parse(JSON.stringify(save)));
  expect(restored.expedition?.stops).toEqual(e.stops);
  expect(restored.runs).toBe(4);
  expect(normalizeIndiaSave({version:900}).expedition).toBeNull();
  expect(normalizeIndiaSave({...save,expedition:{...e,stops:[...e.stops].reverse()}}).expedition).toBeNull();
 });
});
