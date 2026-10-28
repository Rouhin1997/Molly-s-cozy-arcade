import {describe,it,expect} from 'vitest';
import {braveCampaignStages} from '../src/data/braveCampaign';
import {chroniclePages,CHRONICLE_CHAPTER_TITLES} from '../src/data/braveChronicle';
import {comingSoonGames,developerNotes,upcomingArcadeEvents} from '../src/data/arcadeHub';
import {
 braveChronicleUnlocked,freshBraveJourney,completeBraveStage,normalizeBraveJourney,chooseBraveStage
} from '../src/lib/braveProgress';

describe('Molly’s Chronicle and arcade directory',()=>{
 it('keeps the reward locked until every one of the eighteen canonical scenes is complete',()=>{
  let progress=freshBraveJourney();
  expect(braveChronicleUnlocked(progress)).toBe(false);
  for(let i=0;i<braveCampaignStages.length;i++){
   expect(braveChronicleUnlocked(progress)).toBe(false);
   progress=completeBraveStage(progress,braveCampaignStages[i].id);
  }
  expect(progress.completed).toHaveLength(18);
  expect(braveChronicleUnlocked(progress)).toBe(true);
  // Replaying the opening cannot confiscate the keepsake.
  const replay=chooseBraveStage(progress,'courtyard');
  expect(braveChronicleUnlocked(replay)).toBe(true);
  expect(braveChronicleUnlocked({...progress,completed:[...progress.completed].reverse()})).toBe(false);
 });
 it('guards against forged, skipped or corrupted completion data',()=>{
  const forged=normalizeBraveJourney({version:1,completed:['brave-heart'],current:'brave-heart'});
  expect(braveChronicleUnlocked(forged)).toBe(false);
  const short=normalizeBraveJourney({version:1,completed:braveCampaignStages.slice(0,17).map(s=>s.id),current:'brave-heart'});
  expect(braveChronicleUnlocked(short)).toBe(false);
  const complete=normalizeBraveJourney({version:1,completed:braveCampaignStages.map(s=>s.id),current:'brave-heart'});
  expect(braveChronicleUnlocked(complete)).toBe(true);
 });
 it('contains a complete, standalone and richly described illustrated retelling',()=>{
  expect(CHRONICLE_CHAPTER_TITLES).toHaveLength(6);
  expect(chroniclePages).toHaveLength(13);
  for(let i=1;i<=6;i++){
   const entries=chroniclePages.filter(p=>p.chapterNumber===i);
   expect(entries.length).toBeGreaterThanOrEqual(2);
  }
  for(const page of chroniclePages){
   expect(page.eyebrow.length).toBeGreaterThan(10);
   expect(page.heading.length).toBeGreaterThan(6);
   expect(page.paragraphs.length).toBeGreaterThanOrEqual(3);
   expect(page.paragraphs.join(' ').length).toBeGreaterThan(450);
   expect(page.illustration).toBeGreaterThanOrEqual(0);
   expect(page.illustration).toBeLessThanOrEqual(2);
  }
  const ending=chroniclePages[chroniclePages.length-1];
  expect(ending.eyebrow).toContain('EPILOGUE');
  expect(ending.paragraphs.join(' ')).toMatch(/friends|friendship/i);
  expect(ending.paragraphs.join(' ')).toMatch(/Molly/);
  expect(ending.paragraphs.join(' ')).toMatch(/Merida/);
 });
 it('keeps the three unbuilt game concepts separate from the live arcade and kitchen playtest',()=>{
  expect(comingSoonGames.map(g=>g.name)).toEqual([
   'Courage the Cowardly Dog','Toy Story','The Addams Family'
  ]);
  expect(new Set(comingSoonGames.map(g=>g.name)).size).toBe(3);
  expect(comingSoonGames.some(g=>g.name.includes('Brave'))).toBe(false);
  expect(comingSoonGames.every(g=>g.detail.includes('date')||g.detail.includes('Date'))).toBe(true);
 });
 it('orders real known occasion dates by proximity, rolling annual dates correctly',()=>{
  const october=upcomingArcadeEvents(new Date(2026,9,22));
  expect(october.map(e=>e.id)).toEqual(['halloween','birthday']);
  expect(october[0].date.getFullYear()).toBe(2026);
  expect(october[1].status).toBe('planned');
  const november=upcomingArcadeEvents(new Date(2026,10,1));
  expect(november.map(e=>e.id)).toEqual(['birthday','halloween']);
  expect(november[1].date.getFullYear()).toBe(2027);
  const late=upcomingArcadeEvents(new Date(2026,11,1));
  expect(late.every(e=>e.date.getFullYear()===2027)).toBe(true);
 });
 it('exposes dated workshop notes without pretending a two-way mailbox exists',()=>{
  expect(developerNotes.length).toBeGreaterThanOrEqual(2);
  expect(developerNotes.every(n=>n.date&&n.title&&n.message)).toBe(true);
  expect(developerNotes.some(n=>n.message.includes('soundtrack'))).toBe(true);
 });
});
