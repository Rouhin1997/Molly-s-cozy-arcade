import {describe,it,expect} from 'vitest';
import {indiaMysteries,indiaMysteryById} from '../src/data/indiaMysteries';
import {expeditionIds,openExpedition,submitIndiaGuess,newMysteryRound,
 spendIndiaHint,advanceExpedition,mysteryRound,attemptsForDifficulty} from '../src/lib/indiaQuest';
import {matchingAnswerSuggestions} from '../src/lib/answerAssist';
describe('India Edition: 240-card content and 3 real difficulties',()=>{
 it('has exactly 60 Who, What, Where and When mysteries without repeated IDs or answers',()=>{
  expect(indiaMysteries).toHaveLength(240);
  for(const kind of ['who','what','where','when']){
   const list=indiaMysteries.filter(x=>x.kind===kind);
   expect(list).toHaveLength(60);
   expect(new Set(list.map(x=>x.id)).size).toBe(60);
   expect(new Set(list.map(x=>x.answer.toLowerCase())).size).toBe(60);
   expect(new Set(list.map(x=>x.topic)).size).toBeGreaterThan(4);
   expect(list.filter(x=>x.difficulty==='easy').length).toBeGreaterThanOrEqual(14);
   expect(list.filter(x=>x.difficulty==='hard').length).toBeGreaterThanOrEqual(12);
  }
 });
 it('keeps every generated stage answerable, with a distinct 3-beat progression',()=>{
  for(const card of indiaMysteries){
   expect(card.intro.length).toBeGreaterThan(25);
   expect(card.beats).toHaveLength(3);
   expect(new Set(card.beats.map(x=>x.text)).size).toBe(3);
   expect(card.assists).toHaveLength(2);
   expect(card.fact.length).toBeGreaterThan(30);
   expect(indiaMysteryById(card.id)).toBe(card);
   expect(submitIndiaGuess(newMysteryRound(card.id),card,card.answer).status).toBe('won');
  }
 });
 it('generates balanced mixed journeys and fair easy/challenge choices over many seeds',()=>{
  for(const difficulty of ['easy','balanced','challenge'] as const)for(let seed=1;seed<=40;seed++){
   let e=openExpedition(seed,difficulty);
   expect(expeditionIds(seed,difficulty)).toEqual(e.stops);
   expect(new Set(e.stops).size).toBe(12);
   expect(e.stops.map(id=>indiaMysteryById(id)?.kind).sort().filter(x=>x==='who')).toHaveLength(3);
   for(let i=0;i<12;i++){
    const card=indiaMysteryById(e.stops[i])!;
    let round=mysteryRound(e)!;
    const firstHint=spendIndiaHint(round,2);
    expect(firstHint.bank).toBe(1);
    round=submitIndiaGuess(firstHint.round,card,card.answer,difficulty);
    expect(round.status).toBe('won');
    e={...e,rounds:{...e.rounds,[card.id]:round}};
    e=advanceExpedition(e);
    expect(e.hintBank).toBe(2);
   }
   expect(e.finished).toBe(true);
  }
  expect(attemptsForDifficulty('easy')).toBe(5);
  expect(attemptsForDifficulty('challenge')).toBe(3);
 });
 it('offers intelligent non-submitting candidates for nicknames, spelling errors and reversed words',()=>{
  const entries=indiaMysteries.map(x=>({label:x.answer,value:x.answer,aliases:x.aliases}));
  function options(q:string){return matchingAnswerSuggestions(entries,q,3,12).map(x=>x.value)}
  expect(options('shahrukh')).toContain('Shah Rukh Khan');
  expect(options('King Khan')).toContain('Shah Rukh Khan');
  expect(options('Priyanka Chopra')).toContain('Priyanka Chopra');
  expect(options('Chopra Priyanka')).toContain('Priyanka Chopra');
  expect(options('Puchka')).toContain('Pani Puri');
  expect(options('Visswanathan')).toContain('Viswanathan Anand');
  expect(options('Qutb Minar')).toContain('Qutub Minar');
 });
});
