/** Catalogue-backed name assistance shared by free-text arcade modes.
 * Searches the FULL public answer catalogue, never the mystery answer.
 * Suggestions appear only after a meaningful prefix is typed.
 */
export type AnswerCandidate={value:string;label:string;aliases?:readonly string[]};
export type AnswerSuggestion={value:string;label:string;matchedBy?:string};
export function normalizeAnswerQuery(input:string):string{
 return input.toLocaleLowerCase('en').normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}
function typoDistanceAtMostOne(a:string,b:string):boolean{
 if(Math.abs(a.length-b.length)>1)return false;
 let i=0,j=0,errors=0;
 while(i<a.length&&j<b.length){
  if(a[i]===b[j]){i++;j++;continue}
  if(++errors>1)return false;
  if(a.length>b.length)i++;
  else if(a.length<b.length)j++;
  else{i++;j++}
 }
 return errors+(a.length-i)+(b.length-j)<=1;
}
function rankMatch(term:string,query:string):number{
 if(term===query)return 0;
 if(term.startsWith(query))return 1;
 if(term.split(' ').some(word=>word.startsWith(query)))return 2;
 if(term.includes(query))return 3;
 // Only tolerate a single genuine typo with enough typed context.
 if(query.length>=4&&term.split(' ').some(word=>typoDistanceAtMostOne(word,query)))return 4;
 return Infinity;
}
/** Canonical deduplication prevents alias-heavy answers from dominating results. */
export function matchingAnswerSuggestions(
 catalogue:readonly AnswerCandidate[],raw:string,minChars=3,limit=7
):AnswerSuggestion[]{
 const query=normalizeAnswerQuery(raw);
 if(query.length<minChars||!/[a-z0-9]/.test(query))return [];
 const unique=new Map<string,{item:AnswerSuggestion;rank:number}>();
 for(const entry of catalogue){
  const candidateTerms=[entry.label,...(entry.aliases??[])];
  let best=Infinity,matchedBy: string|undefined;
  for(const term of candidateTerms){
   const score=rankMatch(normalizeAnswerQuery(term),query);
   if(score<best){best=score;matchedBy=term===entry.label?undefined:term}
  }
  if(!Number.isFinite(best))continue;
  const existing=unique.get(entry.value);
  if(!existing||best<existing.rank)unique.set(entry.value,{
   item:{value:entry.value,label:entry.label,...(matchedBy?{matchedBy}:{})},rank:best
  });
 }
 return [...unique.values()].sort((a,b)=>a.rank-b.rank||a.item.label.localeCompare(b.item.label))
  .slice(0,Math.max(0,limit)).map(x=>x.item);
}
