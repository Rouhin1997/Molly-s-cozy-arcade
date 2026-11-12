import {describe,it,expect} from 'vitest';
import {
 birthdayWindow,birthdayBetaFromSearch,birthdayCanPlay,BIRTHDAY_EVENT_PUBLISHED,BIRTHDAY_EVENT_YEAR,initialBirthdaySave,birthdayStorageKey,
 BIRTHDAY_PAIRS,pairForEvidence,submitEvidencePair,submitCakeLocation,
 birthdayGuests,allValidBirthdaySeatings,seatingIsValid,submitBirthdaySeating,
 birthdayQuestions,birthdayWhereHints,answerBirthdayQuestion,isBirthdayPassword,unlockBirthdayVault,normalizeBirthdaySave
} from '../src/lib/birthdayQuest';

describe('Molly’s birthday clock and preview isolation',()=>{
 it('opens on 13 November (Rome time) only, exactly at local midnight',()=>{
  const before=new Date('2026-11-12T22:59:59Z');
  const opening=new Date('2026-11-12T23:00:00Z');
  const closing=new Date('2026-11-13T23:00:00Z');
  expect(birthdayWindow(before).active).toBe(false);
  expect(birthdayWindow(opening).active).toBe(true);
  expect(birthdayWindow(new Date(closing.getTime()-1)).active).toBe(true);
  expect(birthdayWindow(closing).active).toBe(false);
  expect(birthdayWindow(opening).start.toISOString()).toBe(opening.toISOString());
  expect(birthdayWindow(opening).end.toISOString()).toBe(closing.toISOString());
 });
 it('gates the real 2026 event and allows an in-progress story to finish',()=>{
  const fresh=initialBirthdaySave();
  const started={...fresh,step:1 as const};
  const before=new Date('2026-11-12T22:59:59Z');
  const live=new Date('2026-11-13T12:00:00Z');
  const after=new Date('2026-11-13T23:00:00Z');
  expect(birthdayCanPlay(false,fresh,before)).toBe(false);
  expect(birthdayCanPlay(false,fresh,live)).toBe(true);
  expect(birthdayCanPlay(false,fresh,after)).toBe(false);
  expect(birthdayCanPlay(false,started,after)).toBe(true);
  expect(birthdayCanPlay(false,{...fresh,connected:['receipt-camera']},after)).toBe(true);
  expect(birthdayCanPlay(false,{...fresh,evidenceTries:1},after)).toBe(true);
  expect(birthdayCanPlay(true,fresh,before)).toBe(true);
  expect(birthdayCanPlay(false,started,new Date('2027-11-13T12:00:00Z'))).toBe(false);
 });
 it('only accepts the explicit rehearsal flag and keeps preview saves apart',()=>{
  expect(BIRTHDAY_EVENT_PUBLISHED).toBe(true); // official event is configured for the 2026 birthday
  expect(BIRTHDAY_EVENT_YEAR).toBe(2026);
  expect(birthdayBetaFromSearch('?birthday-beta=1')).toBe(true);
  expect(birthdayBetaFromSearch('?birthday-beta=true')).toBe(false);
  expect(birthdayBetaFromSearch('?other=1')).toBe(false);
  expect(birthdayStorageKey(true,2026)).not.toBe(birthdayStorageKey(false,2026));
  expect(birthdayStorageKey(false,2027)).not.toBe(birthdayStorageKey(false,2026));
 });
});
describe('Act one: the 99 files missing cake',()=>{
 it('requires two substantiated exhibit pairs and a correct location',()=>{
  let save=initialBirthdaySave();
  expect(pairForEvidence('receipt','sticky')).toBeNull();
  expect(pairForEvidence('camera','receipt')?.id).toBe('receipt-camera');
  expect(BIRTHDAY_PAIRS).toHaveLength(2);
  const wrongPair=submitEvidencePair(save,'receipt','register');
  expect(wrongPair.save.connected).toHaveLength(0);
  save=submitEvidencePair(wrongPair.save,'receipt','camera').save;
  expect(save.connected).toEqual(['receipt-camera']);
  expect(submitCakeLocation(save,'evidence').correct).toBe(false);
  save=submitEvidencePair(save,'sticky','register').save;
  expect(save.connected).toHaveLength(2);
  expect(submitEvidencePair(save,'sticky','register').save.connected).toHaveLength(2);
  const wrongSpot=submitCakeLocation(save,'office');
  expect(wrongSpot.correct).toBe(false);
  expect(wrongSpot.save.step).toBe(0);
  const found=submitCakeLocation(wrongSpot.save,'evidence');
  expect(found.correct).toBe(true);
  expect(found.save.step).toBe(1);
 });
});
describe('Act two: Sheldon’s birthday seating inspection',()=>{
 it('has precisely one valid arrangement among all five-guest permutations',()=>{
  const candidates=allValidBirthdaySeatings();
  expect(candidates).toHaveLength(1);
  expect(candidates[0]).toEqual(['Leonard','Sheldon','Molly','Amy','Penny','Raj']);
  expect(new Set(candidates[0]).size).toBe(birthdayGuests.length);
  expect(seatingIsValid(['Leonard','Sheldon','Molly','Amy','Raj','Penny'])).toBe(false);
  expect(seatingIsValid(['Leonard','Sheldon','Penny','Amy','Molly','Raj'])).toBe(false);
 });
 it('does not advance for incomplete or incorrect layouts',()=>{
  const stageOne={...initialBirthdaySave(),step:1 as const};
  expect(submitBirthdaySeating(stageOne).correct).toBe(false);
  const wrong={...stageOne,seating:['Sheldon','Leonard','Molly','Amy','Penny','Raj']};
  const failed=submitBirthdaySeating(wrong);
  expect(failed.correct).toBe(false);
  expect(failed.save.seatingTries).toBe(1);
  const passed=submitBirthdaySeating({...failed.save,seating:allValidBirthdaySeatings()[0]});
  expect(passed.correct).toBe(true);
  expect(passed.save.step).toBe(2);
 });
});
describe('Act three: WWWW hometown cipher and gift vault',()=>{
 it('offers four optional clues, starting with geography before letter count and saving the strong hint for last',()=>{
  expect(birthdayWhereHints).toHaveLength(4);
  expect(birthdayWhereHints.map(h=>h.id)).toEqual(['landscape','eight-letters','kolhan','chai']);
  expect(birthdayWhereHints[0].text).toMatch(/eastern India/i);
  expect(birthdayWhereHints[1].text).toMatch(/Eight letters/i);
  expect(birthdayWhereHints[2].text).toMatch(/Kolhan/i);
  expect(birthdayWhereHints[3].text).toMatch(/Jharkhand/i);
  expect(birthdayWhereHints[0].text).not.toMatch(/Jharkhand|West Singhbhum|Chaibasa/i);
 });

 it('requires the three notes before password attempts',()=>{
  let save={...initialBirthdaySave(),step:2 as const};
  expect(unlockBirthdayVault(save,'Chaibasa').correct).toBe(false);
  for(const question of birthdayQuestions){
   const wrong=answerBirthdayQuestion(save,question.id,'obviously not the answer');
   expect(wrong.correct).toBe(false);
   const right=answerBirthdayQuestion(save,question.id,question.correct);
   expect(right.correct).toBe(true);
   save=right.save;
  }
  expect(save.answers).toHaveLength(3);
  expect(isBirthdayPassword('  ChAi BaSa!  ')).toBe(true);
  expect(isBirthdayPassword('Ranchi')).toBe(false);
  const miss=unlockBirthdayVault(save,'Ranchi');
  expect(miss.save.codeTries).toBe(1);
  expect(miss.save.step).toBe(2);
  const done=unlockBirthdayVault(miss.save,'chAiBaSa',new Date('2026-11-13T10:00:00Z'));
  expect(done.correct).toBe(true);
  expect(done.save.step).toBe(3);
  expect(done.save.openedAt).toBe('2026-11-13T10:00:00.000Z');
 });
 it('recovers broken saves and preserves a valid birthday success',()=>{
  expect(normalizeBirthdaySave({version:2,step:3})).toEqual(initialBirthdaySave());
  const incomplete=normalizeBirthdaySave({version:1,step:0,connected:['receipt-camera','garbage'],seating:['nope']});
  expect(incomplete.connected).toEqual(['receipt-camera']);
  expect(incomplete.seating).toEqual(['','','Molly','','','']);
  const valid=normalizeBirthdaySave({...initialBirthdaySave(),step:3,openedAt:'2026-11-13T10:00:00.000Z'});
  expect(valid.step).toBe(3);
  expect(valid.openedAt).not.toBeNull();
 });
});
