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
/** Bounded Levenshtein distance with early rejection; only tiny query/token
 * pairs are evaluated. Covers inserted letters, swapped words, common typos.
 */
function editDistance(a:string,b:string,max=2):number{
 if(Math.abs(a.length-b.length)>max)return max+1;
 let previous=Array.from({length:b.length+1},(_,j)=>j);
 for(let i=1;i<=a.length;i++){
  const row=[i];let min=i;
  for(let j=1;j<=b.length;j++){
   row[j]=Math.min(previous[j]+1,row[j-1]+1,previous[j-1]+(a[i-1]===b[j-1]?0:1));
   min=Math.min(min,row[j]);
  }
  if(min>max)return max+1;
  previous=row;
 }
 return previous[b.length];
}
function rankMatch(term:string,query:string):number{
 if(term===query)return 0;
 const unspacedTerm=term.replaceAll(' ','');
 const unspacedQuery=query.replaceAll(' ','');
 if(unspacedTerm===unspacedQuery)return .3; // shahrukh vs shah rukh
 if(term.startsWith(query)||unspacedTerm.startsWith(unspacedQuery))return 1;
 const words=term.split(' '),parts=query.split(' ');
 if(words.some(w=>w.startsWith(query)))return 2;
 // "Chopra Priyanka" and "Priyanka Chopra" should lead to the same person.
 if(parts.length>1&&parts.every(p=>words.some(w=>w.startsWith(p))))return 2.3;
 if(term.includes(query)||unspacedTerm.includes(unspacedQuery))return 3;
 if(query.length>=4&&words.some(w=>editDistance(w,query,1)<=1))return 4;
 if(query.length>=5&&editDistance(unspacedTerm,unspacedQuery,1)<=1)return 4.5;
 if(query.length>=6&&words.some(w=>editDistance(w,query,2)<=2))return 5;
 if(query.length>=7&&editDistance(unspacedTerm,unspacedQuery,2)<=2)return 5.5;
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
