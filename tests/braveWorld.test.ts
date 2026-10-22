import {describe,it,expect,vi} from 'vitest';
import {braveChapters,braveWorldIssues,freshBraveSave,normalizeBraveSave,readBraveSave,writeBraveSave,BRAVE_SAVE_KEY} from '../src/data/braveWorld';

describe('The Wisps’ Trail — Module 01 storybook world',()=>{
 it('introduces six distinct locations and exactly eighteen individually named future levels',()=>{
  expect(braveWorldIssues()).toEqual([]);
  expect(braveChapters).toHaveLength(6);
  expect(braveChapters.flatMap(c=>c.levelTitles)).toHaveLength(18);
  expect(new Set(braveChapters.flatMap(c=>c.levelTitles)).size).toBe(18);
  expect(braveChapters.map(c=>c.roman)).toEqual(['I','II','III','IV','V','VI']);
 });
 it('makes every place a genuine, well-specified storybook setting',()=>{
  for(const c of braveChapters){
   expect(c.scene.length).toBeGreaterThan(100);
   expect(c.merida).toMatch(/“.*”/);
   expect(c.wisp.length).toBeGreaterThan(35);
   expect(c.environment.length).toBeGreaterThanOrEqual(3);
   expect(c.mapX).toBeGreaterThan(5);
   expect(c.mapY).toBeLessThan(90);
  }
 });
 it('normalizes old, bad or corrupted browser state without dropping valid choices',()=>{
  expect(normalizeBraveSave(null)).toEqual(freshBraveSave());
  expect(normalizeBraveSave({version:8})).toEqual(freshBraveSave());
  const saved=normalizeBraveSave({version:1,prologueSeen:true,vow:'listen',
    inspected:['forest','forest','not-a-place','highland'],soundEnabled:true});
  expect(saved).toEqual({version:1,prologueSeen:true,vow:'listen',
    inspected:['forest','highland'],soundEnabled:true});
  expect(normalizeBraveSave({version:1,vow:'destroy',inspected:{},soundEnabled:'yes'})).toEqual(freshBraveSave());
 });
 it('saves a Keeper choice and explored map locations without touching any other game',()=>{
  const store=new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>store.get(k)??null,
    setItem:(k:string,v:string)=>{store.set(k,v)}});
  try{
   const p={version:1 as const,prologueSeen:true,vow:'follow' as const,
     inspected:['highland','witch'],soundEnabled:false};
   writeBraveSave(p);
   expect(readBraveSave()).toEqual(p);
   expect([...store.keys()]).toEqual([BRAVE_SAVE_KEY]);
   store.set(BRAVE_SAVE_KEY,'{broken');
   expect(readBraveSave()).toEqual(freshBraveSave());
  }finally{vi.unstubAllGlobals()}
 });
});
