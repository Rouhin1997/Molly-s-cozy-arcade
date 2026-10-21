import type { Difficulty } from '../lib/passport';

export type SeatingCase = {
  id: string;
  title: string;
  difficulty: Difficulty;
  narrative: string;
  place: string;
  /** The left-to-right correct chair assignment. The rule generator verifies uniqueness. */
  solution: string[];
};
export type SeatingRule = {
  type: 'seat' | 'before' | 'next' | 'immediately-before' | 'apart';
  a: string;
  b?: string;
  index?: number;
};
export const cast: Record<string, { icon: string; tint: string; caption: string }> = {
  Sheldon: { icon: '⚛️', tint: '#e5d9f8', caption: 'The rule enthusiast' },
  Leonard: { icon: '👓', tint: '#d1e6f4', caption: 'The peacemaker' },
  Penny: { icon: '⭐', tint: '#f7dfc7', caption: 'The quick thinker' },
  Amy: { icon: '🌼', tint: '#e5ecc7', caption: 'The biologist' },
  Howard: { icon: '🚀', tint: '#f5d6dc', caption: 'The engineer' },
  Bernadette: { icon: '🧪', tint: '#d8e8ed', caption: 'The microbiologist' },
  Raj: { icon: '🌙', tint: '#f0dcef', caption: 'The astrophysicist' },
  Stuart: { icon: '📚', tint: '#f1e4cd', caption: 'The comic shop owner' },
};

export const seatingCases: SeatingCase[] = [
  { id:'movie-sofa',title:'The Movie Night Treaty',difficulty:'easy',place:'Apartment 4A',narrative:'The living-room seating chart is being treated as a peer-reviewed document.',solution:['Penny','Leonard','Sheldon','Raj'] },
  { id:'takeout-table',title:'Takeout Diplomacy',difficulty:'easy',place:'The takeout table',narrative:'Four friends have been assigned places before the dumplings arrive.',solution:['Amy','Penny','Bernadette','Leonard'] },
  { id:'comic-line',title:'Comic Shop Queue',difficulty:'easy',place:'The comic book store',narrative:'Everyone has to stand in precisely the right order for an exclusive issue.',solution:['Raj','Stuart','Howard','Sheldon'] },
  { id:'lunch-break',title:'A Caltech Lunch',difficulty:'easy',place:'University cafeteria',narrative:'The lunch seats must satisfy a suspiciously formal set of rules.',solution:['Howard','Bernadette','Amy','Leonard'] },
  { id:'boardgame',title:'Board Game Protocol',difficulty:'easy',place:'Apartment 4A',narrative:'Game night cannot begin until everyone sits in the approved order.',solution:['Stuart','Amy','Sheldon','Raj'] },
  { id:'elevator',title:'The Elevator Simulation',difficulty:'easy',place:'Caltech study hall',narrative:'An imaginary elevator is much easier to organize than the real one.',solution:['Penny','Howard','Leonard','Bernadette'] },

  { id:'roommate-agreement',title:'The Roommate Agreement',difficulty:'medium',place:'Apartment 4A',narrative:'A fresh clause specifies exactly which guest sits beside whom.',solution:['Sheldon','Amy','Leonard','Penny','Raj'] },
  { id:'physics-symposium',title:'The Symposium Seating',difficulty:'medium',place:'Physics department',narrative:'The seminar’s seating plan has turned into an unexpected constraint puzzle.',solution:['Bernadette','Howard','Raj','Leonard','Sheldon'] },
  { id:'restaurant-booth',title:'The Restaurant Booth',difficulty:'medium',place:'Favourite restaurant',narrative:'Five friends, five places, and an oddly specific dinner reservation.',solution:['Penny','Amy','Stuart','Leonard','Howard'] },
  { id:'comic-con',title:'Convention Diplomacy',difficulty:'medium',place:'Comic convention',narrative:'The panel seats must satisfy the world’s fussiest seating chart.',solution:['Howard','Sheldon','Stuart','Raj','Penny'] },
  { id:'science-fair',title:'A Science-Fair Shuffle',difficulty:'medium',place:'Science fair',narrative:'No exhibit will be judged until the team stands in its agreed order.',solution:['Amy','Raj','Bernadette','Sheldon','Leonard'] },
  { id:'pizza-peace',title:'Pizza Peace Talks',difficulty:'medium',place:'Apartment 4B',narrative:'The peace treaty specifies who gets which pizza-side chair.',solution:['Stuart','Penny','Howard','Amy','Raj'] },

  { id:'caltech-ball',title:'The Caltech Gala',difficulty:'hard',place:'University gala',narrative:'Six places, no compromises, and an intimidating collection of logic clauses.',solution:['Amy','Leonard','Raj','Sheldon','Bernadette','Howard'] },
  { id:'marathon',title:'The Movie Marathon',difficulty:'hard',place:'Apartment 4A',narrative:'A six-person movie marathon has acquired enough rules to earn a doctorate.',solution:['Stuart','Howard','Penny','Amy','Sheldon','Raj'] },
  { id:'comic-shop-finale',title:'The Collector’s Showcase',difficulty:'hard',place:'Comic book store',narrative:'A precious first edition demands a perfectly arranged fan club.',solution:['Sheldon','Raj','Bernadette','Stuart','Leonard','Penny'] },
  { id:'nobel-table',title:'The Nobel Dinner',difficulty:'hard',place:'Banquet hall',narrative:'Six guests must find their chairs without violating the seating theorem.',solution:['Howard','Amy','Penny','Leonard','Raj','Bernadette'] },
  { id:'train-journey',title:'The Train Carriage Puzzle',difficulty:'hard',place:'Night train',narrative:'A long train ride gives everyone far too long to argue about seat assignments.',solution:['Leonard','Bernadette','Stuart','Sheldon','Howard','Amy'] },
  { id:'robotics-demo',title:'The Robotics Demonstration',difficulty:'hard',place:'Engineering lab',narrative:'The demo will begin as soon as all six researchers are in their logical places.',solution:['Raj','Penny','Sheldon','Howard','Amy','Stuart'] },
];

export function ruleHolds(order: readonly string[], rule: SeatingRule): boolean {
  const a=order.indexOf(rule.a), b=rule.b ? order.indexOf(rule.b) : -1;
  if(a<0) return false;
  if(rule.type==='seat') return a===rule.index;
  if(b<0) return false;
  if(rule.type==='before') return a<b;
  if(rule.type==='next') return Math.abs(a-b)===1;
  if(rule.type==='immediately-before') return a+1===b;
  return Math.abs(a-b)>1;
}
export function ruleText(rule: SeatingRule, seats: number): string {
  if(rule.type==='seat') return `${rule.a} must sit in chair ${(rule.index ?? 0)+1} of ${seats}.`;
  if(rule.type==='before') return `${rule.a} sits somewhere to the left of ${rule.b}.`;
  if(rule.type==='next') return `${rule.a} sits immediately beside ${rule.b}.`;
  if(rule.type==='immediately-before') return `${rule.a} sits immediately to the left of ${rule.b}.`;
  return `${rule.a} and ${rule.b} may NOT sit next to each other.`;
}
function permutations(items: string[]): string[][] {
  if(items.length===0)return [[]];
  const out:string[][]=[];
  for(let i=0;i<items.length;i++) {
    for(const tail of permutations([...items.slice(0,i),...items.slice(i+1)]))
      out.push([items[i],...tail]);
  }
  return out;
}
const allPermutations = new Map<string,string[][]>();
function candidatesFor(c: SeatingCase):string[][] {
  const k=[...c.solution].sort().join('|');
  if(!allPermutations.has(k))allPermutations.set(k,permutations([...c.solution]));
  return allPermutations.get(k)!;
}
function hashSeed(s:string) {
  let n=2166136261;
  for(const char of s){n^=char.charCodeAt(0);n=Math.imul(n,16777619)}
  return n>>>0;
}
function shuffled<T>(a:T[],seed:string):T[]{
  const copy=[...a];let x=hashSeed(seed);
  for(let i=copy.length-1;i>0;i--){x=(Math.imul(x,1664525)+1013904223)>>>0;const j=x%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}
  return copy;
}
/** Each candidate clue is true for the author's solution. Greedy selection
 * chooses an informative mixture, then exhaustively proves it is unique. */
export function seatingRules(c: SeatingCase):SeatingRule[] {
  const answer=c.solution, n=answer.length;
  const candidates:SeatingRule[]=[];
  const seatIndex=hashSeed(c.id+'-chair')%n;
  if(c.difficulty!=='hard') candidates.push({type:'seat',a:answer[seatIndex],index:seatIndex});
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) {
    candidates.push({type:'before',a:answer[i],b:answer[j]});
    if(j===i+1){
      candidates.push({type:'next',a:answer[i],b:answer[j]});
      candidates.push({type:'immediately-before',a:answer[i],b:answer[j]});
    } else candidates.push({type:'apart',a:answer[i],b:answer[j]});
  }
  const pool=shuffled(candidates,c.id+'-logic');
  let viable=candidatesFor(c);
  const selected:SeatingRule[]=[];
  if(c.difficulty!=='hard'){
    const anchored=pool.find(r=>r.type==='seat')!;
    selected.push(anchored);
    viable=viable.filter(order=>ruleHolds(order,anchored));
  }
  while(viable.length>1){
    const options=pool.filter(r=>!selected.includes(r));
    let best:SeatingRule|undefined, lowest=viable.length;
    for(const rule of options){
      const count=viable.reduce((sum,order)=>sum+(ruleHolds(order,rule)?1:0),0);
      if(count>0 && count<lowest){lowest=count;best=rule}
    }
    if(!best)throw new Error(`No unique solution for ${c.id}`);
    selected.push(best);viable=viable.filter(order=>ruleHolds(order,best));
  }
  return shuffled(selected,c.id+'-rule-display');
}
export function validSeatingArrangements(c: SeatingCase):string[][] {
  const rules=seatingRules(c);
  return candidatesFor(c).filter(order=>rules.every(rule=>ruleHolds(order,rule)));
}
export function dailySeatingCase(date:string,difficulty:Difficulty):SeatingCase {
  const cases=seatingCases.filter(c=>c.difficulty===difficulty);
  const [year,month,day]=date.split('-').map(Number);
  const idx=Math.floor(Date.UTC(year,month-1,day)/86400000);
  return cases[((idx%cases.length)+cases.length)%cases.length];
}
export function practiceSeatingCase(difficulty:Difficulty,recent:string[]=[],random=Math.random):SeatingCase {
  const cases=seatingCases.filter(c=>c.difficulty===difficulty);
  const unused=cases.filter(c=>!recent.includes(c.id));
  const pool=unused.length?unused:cases;
  return pool[Math.min(pool.length-1,Math.floor(random()*pool.length))];
}
export function validateSeatingCases():string[] {
  const issues:string[]=[];
  for(const c of seatingCases){
    if(new Set(c.solution).size!==c.solution.length || c.solution.some(n=>!(n in cast)))issues.push(`${c.id}: bad roster`);
    if(c.solution.length !== (c.difficulty==='easy'?4:c.difficulty==='medium'?5:6))issues.push(`${c.id}: bad seat count`);
    const sols=validSeatingArrangements(c);
    if(sols.length!==1 || sols[0].join('|')!==c.solution.join('|'))issues.push(`${c.id}: nonunique solution: ${sols.length}`);
  }
  if(new Set(seatingCases.map(c=>c.id)).size!==seatingCases.length)issues.push('duplicate id');
  return issues;
}
