import {describe,it,expect} from 'vitest';
import {matchingAnswerSuggestions,normalizeAnswerQuery} from '../src/lib/answerAssist';
import {toonShows} from '../src/data/toon';
import {riddles} from '../src/data/questions';

const toonCatalogue=toonShows.map(show=>({value:show.title,label:show.title,aliases:[show.id]}));
const foodCatalogue=riddles.map(riddle=>({
 value:riddle.answer,label:riddle.answer,aliases:riddle.accepted
}));

describe('Name autocomplete — fair catalogue assistance',()=>{
 it('never exposes any answers before three meaningful characters are typed',()=>{
  expect(matchingAnswerSuggestions(foodCatalogue,'')).toEqual([]);
  expect(matchingAnswerSuggestions(foodCatalogue,'e')).toEqual([]);
  expect(matchingAnswerSuggestions(foodCatalogue,'br')).toEqual([]);
  expect(matchingAnswerSuggestions(toonCatalogue,'  ')).toEqual([]);
  expect(matchingAnswerSuggestions(toonCatalogue,'..!!')).toEqual([]);
 });
 it('finds alternate regional food names while selecting the accepted canonical guess',()=>{
  const brinjal=matchingAnswerSuggestions(foodCatalogue,'brinj');
  expect(brinjal[0]).toMatchObject({label:'Eggplant',value:'Eggplant',matchedBy:'brinjal'});
  expect(matchingAnswerSuggestions(foodCatalogue,'bhind').some(x=>x.label==='Okra')).toBe(true);
  expect(matchingAnswerSuggestions(foodCatalogue,'carambola').some(x=>x.label==='Star fruit')).toBe(true);
 });
 it('matches full show titles and normalized accents without requiring exact punctuation',()=>{
  expect(matchingAnswerSuggestions(toonCatalogue,'pow').some(x=>x.label==='The Powerpuff Girls')).toBe(true);
  expect(matchingAnswerSuggestions(toonCatalogue,'poke').some(x=>x.label==='Pokémon')).toBe(true);
  expect(normalizeAnswerQuery('  Pokémon—  ')).toBe('pokemon');
 });
 it('tolerates a small spelling mistake, but never offers unrelated candidates',()=>{
  const sample=[{label:'Dexter’s Laboratory',value:'Dexter’s Laboratory',aliases:['dexters lab']},
   {label:'Dragon Ball Z',value:'Dragon Ball Z'}];
  expect(matchingAnswerSuggestions(sample,'dextrs').map(x=>x.value)).toContain('Dexter’s Laboratory');
  expect(matchingAnswerSuggestions(sample,'zxqnv')).toEqual([]);
 });
 it('ranks strong prefixes above substring and typo candidates',()=>{
  const entries=[
   {label:'Red Strawberry',value:'red'},
   {label:'Strawberry',value:'strawberry'},
   {label:'Wild Strawberry',value:'wild'},
   {label:'Star fruit',value:'star'}
  ];
  expect(matchingAnswerSuggestions(entries,'stra').map(x=>x.value)[0]).toBe('strawberry');
 });
 it('deduplicates alias matches, enforces sensible list limit and never scores itself',()=>{
  const c=[
   {label:'Eggplant',value:'eggplant',aliases:['brinjal','brinjal','Brinjal']},
   {label:'Another Brinjal',value:'other'}
  ];
  const res=matchingAnswerSuggestions(c,'brinj',3,1);
  expect(res).toHaveLength(1);
  expect(res[0].value).toBe('eggplant');
  expect(c).toHaveLength(2);
 });
});
