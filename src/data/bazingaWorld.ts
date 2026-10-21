import type { Difficulty } from '../lib/passport';
import { polishRoomCases } from './bazingaPolish';

/** Original top-down game maps inspired by recurring show settings.
 * These are playable schematics, NOT replicas, production blueprints or set photographs.
 * x/y are percentages within the game board; seat IDs are stable save identifiers. */
export type RoomId = 'four-a'|'four-b'|'wolowitz'|'raj'|'cafeteria'|'lab'|'comic'|'cinema';
export type RoomSeat = {
  id:string; label:string; x:number; y:number; tags:string[];
};
export type RoomProp = { icon:string;label:string;x:number;y:number };
export type Room = {
  id:RoomId; name:string; subtitle:string; theme:string;
  seats:RoomSeat[];
  props:RoomProp[];
};
export type RoomRule = {
  type:'has'|'avoids'|'adjacent'|'not-adjacent'|'left'|'closest'|'farthest'|'far-from-guest';
  a:string; b?:string; tag?:string; prop?:string;
  text?:string;
};
export type RoomCase = {
  id:string; room:RoomId; title:string; episode:string; difficulty:Difficulty;
  /** Seat IDs and solution characters are aligned. */
  seatIds:string[]; solution:string[];
  story:string; rules:RoomRule[]; winning:string; losing:string;
};
const seat=(id:string,label:string,x:number,y:number,tags:string[]):RoomSeat=>({id,label,x,y,tags});
const prop=(icon:string,label:string,x:number,y:number):RoomProp=>({icon,label,x,y});
export const rooms: Record<RoomId,Room> = {
  'four-a': {id:'four-a',name:'Apartment 4A',subtitle:'The iconic couch, bookshelves, desk and TV',theme:'apartment',
    seats:[
      seat('spot',"Sofa · window end",27,60,['sofa','tv-view','spot','warm','breeze']),
      seat('middle','Middle cushion',43,60,['sofa','tv-view','warm']),
      seat('right','Sofa end',59,60,['sofa','tv-view']),
      seat('armchair','Armchair',78,44,['chair','tv-view','door','draft']),
      seat('desk','Desk chair',77,76,['chair','desk','partial-view','uncomfortable']),
      seat('stool','Kitchen stool',14,77,['chair','kitchen','snacks','uncomfortable']),
    ],
    props:[prop('📺','Television',46,13),prop('🪟','Window',12,27),prop('🚪','Door',89,23),prop('🍜','Kitchen',9,94),prop('📚','Shelves',47,90)],
  },
  'four-b': {id:'four-b',name:"Penny's Apartment 4B",subtitle:'A smaller, homier living room',theme:'penny',
    seats:[
      seat('love-left','Love seat · left',31,62,['sofa','tv-view','warm']),
      seat('love-right','Love seat · right',47,62,['sofa','tv-view']),
      seat('armchair','Comfy chair',71,58,['chair','tv-view','quiet']),
      seat('window','Window chair',24,32,['chair','window','draft']),
      seat('counter','Counter stool',13,79,['chair','kitchen','snacks','uncomfortable']),
      seat('entry','Entry stool',84,28,['chair','door','uncomfortable','far-corner']),
    ],
    props:[prop('📺','Television',50,13),prop('🪟','Window',11,7),prop('🚪','Door',91,7),prop('🥧','Kitchen',38,89)],
  },
  wolowitz:{id:'wolowitz',name:"Howard & Bernadette's House",subtitle:'Family dining room with kitchen access',theme:'dinner',
    seats:[
      seat('north','Head of table',50,27,['dining','head','kitchen']),
      seat('west-upper','Left · upper',26,46,['dining','kitchen','warm']),
      seat('west-lower','Left · lower',26,67,['dining','snacks']),
      seat('east-upper','Right · upper',74,46,['dining','door','draft']),
      seat('east-lower','Right · lower',74,67,['dining','window']),
      seat('south','End of table',50,85,['dining','uncomfortable','far-corner']),
    ],
    props:[prop('🍲','Kitchen',17,15),prop('🪟','Window',84,86),prop('🚪','Door',90,17),prop('🕯️','Dinner',50,56)],
  },
  raj:{id:'raj',name:"Raj's Apartment",subtitle:'Mood lighting, mystery props and a party table',theme:'raj',
    seats:[
      seat('couch-left','Sofa · left',26,64,['sofa','warm','tv-view']),
      seat('couch-right','Sofa · right',44,64,['sofa','tv-view']),
      seat('chair','Comfy chair',73,61,['chair','quiet','tv-view']),
      seat('snack','Snack-side stool',19,37,['chair','snacks','kitchen']),
      seat('window','Window corner',55,25,['chair','window','draft']),
      seat('entry','Entry stool',84,29,['chair','door','uncomfortable','far-corner']),
    ],
    props:[prop('🕵️','Mystery board',36,7),prop('🥨','Snacks',12,12),prop('🪟','Window',64,7),prop('🚪','Door',93,7)],
  },
  cafeteria:{id:'cafeteria',name:'Caltech Cafeteria',subtitle:'The usual lunch table, but with more equations',theme:'caltech',
    seats:[
      seat('west-head','West end',13,54,['dining','head','quiet']),
      seat('top-left','Window side · left',37,28,['dining','window','warm']),
      seat('top-right','Window side · right',65,28,['dining','window','draft']),
      seat('east-head','East end',88,54,['dining','door','uncomfortable']),
      seat('bottom-left','Food-side · left',37,82,['dining','snacks','kitchen']),
      seat('bottom-right','Food-side · right',65,82,['dining','snacks']),
    ],
    props:[prop('🥪','Serving counter',16,10),prop('🪟','Window',51,11),prop('🚪','Exit',93,14),prop('🥤','Lunch table',50,54)],
  },
  lab:{id:'lab',name:'Caltech Physics Lab',subtitle:'Benches, optics, instruments and dubious safety',theme:'lab',
    seats:[
      seat('safe','Shielded desk',18,27,['desk','quiet','lab-safe','warm']),
      seat('scope','Telescope station',49,26,['desk','window','experiment']),
      seat('laser','Laser bench',81,27,['desk','experiment','draft']),
      seat('computer','Computer chair',19,72,['desk','tv-view','experiment']),
      seat('vent','Air-vent stool',50,75,['chair','draft','uncomfortable']),
      seat('exit','Exit workstation',83,74,['desk','door','lab-safe']),
    ],
    props:[prop('🔭','Telescope',49,8),prop('🧯','Safety shower',11,10),prop('💻','Terminal',10,93),prop('🚪','Exit',95,92)],
  },
  comic:{id:'comic',name:"Stuart's Comic Book Store",subtitle:'Fresh issues, awkward queues and an ill-fated stool',theme:'comic',
    seats:[
      seat('counter','Counter chair',19,25,['chair','counter','warm']),
      seat('shelf','Shelves seat',44,25,['chair','comic','quiet']),
      seat('window','Display window',76,23,['chair','window','draft']),
      seat('aisle','Main aisle',72,65,['chair','door','uncomfortable']),
      seat('beanbag','Cosplay beanbag',40,69,['chair','comic','warm']),
      seat('rickety','Rickety stool',14,75,['chair','uncomfortable','far-corner']),
    ],
    props:[prop('📚','New comics',49,5),prop('🦸','Hero posters',89,42),prop('🚪','Entrance',90,86),prop('🎲','Game table',54,91)],
  },
  cinema:{id:'cinema',name:'Pasadena Movie Theatre',subtitle:'A Star Wars screening with aisle-seat politics',theme:'cinema',
    seats:[
      seat('front-left','Front · left',25,44,['theatre','front','aisle','uncomfortable']),
      seat('front-centre','Front · centre',50,44,['theatre','front','center','screen']),
      seat('front-right','Front · right',75,44,['theatre','front','aisle']),
      seat('back-left','Back · left',25,75,['theatre','back','aisle','quiet']),
      seat('back-centre','Back · centre',50,75,['theatre','back','center','screen']),
      seat('back-right','Back · right',75,75,['theatre','back','aisle','door']),
    ],
    props:[prop('🎞️','Movie screen',50,13),prop('🍿','Popcorn',9,27),prop('🚪','Exit',91,89),prop('🔊','Speakers',88,26)],
  },
};

const c=(id:string,room:RoomId,title:string,episode:string,difficulty:Difficulty,
  seatIds:string[],solution:string[],story:string,rules:RoomRule[],winning:string,losing:string):RoomCase =>
  ({id,room,title,episode,difficulty,seatIds,solution,story,rules,winning,losing});
const has=(a:string,tag:string,text?:string):RoomRule=>({type:'has',a,tag,text});
const adjacent=(a:string,b:string,text?:string):RoomRule=>({type:'adjacent',a,b,text});
const far=(a:string,b:string,text?:string):RoomRule=>({type:'far-from-guest',a,b,text});

const draftRoomCases:RoomCase[] = [
  // Cozy — four visible positions, rich hints, and instantly recognisable scenarios
  c('star-wars-4a','four-a',"Star Wars at Sheldon's",'The Prime Viewing Spot','easy',
    ['spot','middle','right','armchair'],['Sheldon','Leonard','Penny','Raj'],
    'Sheldon has organized an evening of space battles. The seating arrangement is non-negotiable.',
    [has('Sheldon','spot',"This is apartment 4A. Sheldon has eternal dibs on his legendary sofa cushion."),
     adjacent('Leonard','Sheldon',"Leonard must sit immediately beside Sheldon for the inevitable continuity commentary.")],
    "Correct. The screen is visible, the cushions are acceptable, and your deductive reasoning exceeds my expectations.",
    'A violation of the seating agreement. Bazinga!'),
  c('penny-pizza','four-b',"Pizza & Penny's Patience",'The Cushion Density Test','easy',
    ['love-left','love-right','armchair','counter'],['Penny','Leonard','Amy','Sheldon'],
    "Penny has ordered pizza. Sheldon is conducting an uninvited audit of seating comfort.",
    [has('Sheldon','kitchen',"Sheldon insists on supervising the precise distribution of pizza slices."),
     adjacent('Penny','Leonard',"Penny and Leonard plan to share the sofa.")],
    'Acceptable. The snack logistics meet a surprisingly high standard.',
    "Penny has moved the cushions. Bazinga!"),
  c('dinner-wolowitz','wolowitz',"Dinner at Howard's",'A Wolowitz Family Dinner','easy',
    ['north','west-upper','east-upper','south'],['Bernadette','Howard','Amy','Stuart'],
    "Bernadette has set the dinner table. Howard has opinions; Stuart has a wobbly chair.",
    [has('Bernadette','head',"Bernadette runs this dinner and takes the head of the table."),
     has('Stuart','uncomfortable',"Stuart, naturally, gets the least desirable chair.")],
    'An orderly household. Bernadette might even approve.',
    'The seating has achieved maximum domestic instability. Bazinga!'),
  c('comics-release','comic',"New Comic Day",'The First-Issue Incident','easy',
    ['counter','shelf','aisle','rickety'],['Stuart','Sheldon','Leonard','Howard'],
    "A rare issue just arrived. Sheldon is inspecting the comics; Howard is guarding the aisle.",
    [has('Stuart','counter',"Stuart works behind the counter, however reluctantly."),
     has('Sheldon','comic',"Sheldon stands nearest the collectible comics.")],
    'The comics remain mint and your logic is pristine. Good.',
    'That issue is now in the wrong hands. Bazinga!'),
  c('cafeteria-lunch','cafeteria',"Lunch with the Physicists",'The Caltech Lunch Equation','easy',
    ['west-head','top-left','east-head','bottom-left'],['Leonard','Sheldon','Howard','Raj'],
    "At Caltech, even lunchtime turns into a set of formal constraints.",
    [has('Raj','snacks',"Raj chooses the food-side seat so his lunch is never far away."),
     has('Sheldon','window',"Sheldon requires the window side today; the overhead lighting is unacceptable.")],
    'A well-ordered lunch. Theoretical physics can resume.',
    'Lunch has degenerated into social entropy. Bazinga!'),
  c('movie-night','cinema',"The Original Trilogy",'The Theatre Seat Protocol','easy',
    ['front-left','front-centre','back-left','back-centre'],['Stuart','Penny','Howard','Sheldon'],
    'The screening begins in five minutes. Sheldon has a very detailed opinion on sightlines.',
    [has('Sheldon','screen',"Sheldon insists on the centred rear seat: optimal projection, minimal neck strain."),
     has('Stuart','uncomfortable',"Stuart was given the neck-craning seat in the front row.")],
    'Precisely aligned with the screen. It would be irrational to complain.',
    'I cannot accept that viewing angle. Bazinga!'),

  // Clever — five positions, multiple true spatial constraints, less safety margin
  c('raj-mystery','raj',"Murder Mystery Night at Raj's",'The Murder Mystery Reconstruction','medium',
    ['couch-left','couch-right','chair','snack','entry'],['Amy','Penny','Raj','Bernadette','Stuart'],
    'Raj has arranged a murder mystery evening. The suspects must be seated without compromising the clues.',
    [has('Stuart','uncomfortable',"The detective costume does not save Stuart from the awkward entry stool."),
     has('Bernadette','snacks',"Bernadette demands first access to the snack table."),
     adjacent('Amy','Penny',"Amy and Penny want to compare suspect notes from neighbouring sofa cushions.")],
    "An impeccable reconstruction. Even the fictional detective would concede the point.",
    'The culprit is still at large. Bazinga!'),
  c('sick-day','four-b',"The Contagion Contingency",'Sick Day at Penny’s','medium',
    ['love-left','love-right','armchair','window','entry'],['Penny','Leonard','Amy','Raj','Sheldon'],
    "Raj is under the weather. Sheldon calculates the mathematically safest place to sit.",
    [has('Raj','window',"Raj needs the chair near the open window for a little fresh air."),
     far('Sheldon','Raj',"Sheldon has calculated the seat farthest from sick Raj. Personal space is a scientific imperative.")],
    'Excellent. The pathogen exposure probability has been minimized.',
    'The germ perimeter has been breached. Bazinga!'),
  c('halo-marathon','four-a',"Halo Night & the Couch",'The Halo Configuration','medium',
    ['spot','middle','right','armchair','stool'],['Sheldon','Leonard','Raj','Howard','Stuart'],
    "Five gamers. A single couch. Someone brought an extra stool of questionable quality.",
    [has('Sheldon','spot',"In 4A, Sheldon sits in his spot. No negotiations."),
     has('Stuart','uncomfortable',"The spare stool goes to Stuart. Apparently this is tradition."),
     adjacent('Leonard','Sheldon',"Leonard sits beside Sheldon, partly to handle the inevitable complaints.")],
    'The gaming protocol is flawless. You may proceed to the next level.',
    'The roommate agreement rejects this seating chart. Bazinga!'),
  c('wolowitz-thanksgiving','wolowitz',"Thanksgiving Dinner",'The Dinner Table Protocol','medium',
    ['north','west-upper','west-lower','east-upper','south'],['Bernadette','Howard','Raj','Penny','Stuart'],
    'Bernadette is keeping the peace. Howard talks too much; Stuart hopes to remain unnoticed.',
    [has('Bernadette','head',"Bernadette claims the head of the table and the final word."),
     has('Stuart','uncomfortable',"Stuart accepts the chair nobody else wanted."),
     adjacent('Howard','Raj',"Howard and Raj insist on sitting close enough to exchange jokes.")],
    'A dinner arrangement even Bernadette could tolerate.',
    'Somebody just dropped the gravy. Bazinga!'),
  c('lab-flag-show','lab',"Fun with Flags at Caltech",'The Flag Filming Formula','medium',
    ['safe','scope','laser','computer','exit'],['Amy','Sheldon','Howard','Leonard','Raj'],
    "A very special laboratory episode of Fun with Flags needs a filming plan.",
    [has('Sheldon','experiment',"Sheldon insists on the telescope station to explain the significance of a flag."),
     has('Howard','draft',"Howard insists the laser-bench vent provides excellent hair movement."),
     has('Amy','lab-safe',"Amy has reserved the shielded desk for her demonstration.")],
    'Filming can commence. I predict outstanding educational value.',
    'Fun with Flags has been postponed indefinitely. Bazinga!'),
  c('comic-tournament','comic',"The Comic-Shop Tournament",'The Comic Store Seating Paradox','medium',
    ['counter','shelf','window','aisle','rickety'],['Stuart','Sheldon','Raj','Leonard','Howard'],
    "It's game night at Stuart's. Every customer has an opinion about the gaming-table view.",
    [has('Stuart','counter',"Stuart must remain within reach of his cash register."),
     has('Sheldon','comic',"Sheldon takes the seat beside the rare-edition shelves."),
     has('Howard','uncomfortable',"Howard has volunteered for the questionable stool. He may regret it.")],
    'A logically sound tournament table. Victory is deserved.',
    'The dice have declared a critical failure. Bazinga!'),

  // Expert — six positions, complex mixed room geometry and no free hints
  c('sheldon-spot-war','four-a',"The Great Spot Negotiation",'The Roommate Agreement Crisis','hard',
    ['spot','middle','right','armchair','desk','stool'],['Sheldon','Leonard','Amy','Penny','Raj','Stuart'],
    "A full-house movie night has activated eleven clauses of the Roommate Agreement.",
    [has('Sheldon','spot',"Article 4A: Sheldon occupies his designated couch spot, of course."),
     has('Stuart','uncomfortable',"Stuart has been assigned the backup kitchen stool."),
     has('Amy','sofa',"Amy insists on a proper sofa cushion."),
     adjacent('Leonard','Sheldon',"Leonard is within immediate complaining range of Sheldon.")],
    'The seating arrangement is logically impeccable. I acknowledge your intellectual competence.',
    'One does not improvise with a centuries-old couch tradition. Bazinga!'),
  c('cinema-empire','cinema',"The Empire Strikes Back",'The Galactic Projection Paradox','hard',
    ['front-left','front-centre','front-right','back-left','back-centre','back-right'],['Stuart','Penny','Howard','Leonard','Sheldon','Raj'],
    'Six tickets. Two rows. One cinema where nobody can agree about the ideal screen angle.',
    [has('Sheldon','back',"Sheldon will not tolerate the front row's inferior sightline."),
     has('Stuart','uncomfortable',"Stuart is stuck with the front-left neck-straining seat."),
     adjacent('Leonard','Sheldon',"Leonard must be close enough to hear Sheldon critique the special effects."),
     has('Raj','door',"Raj is closest to the exit for the emergency popcorn run.")],
    'Your geometrical appreciation of cinema seating is commendable. Most people lack it.',
    'The Force is not strong with this arrangement. Bazinga!'),
  c('raj-midnight','raj',"Raj's Mystery Gala",'The Midnight Mystery Gambit','hard',
    ['couch-left','couch-right','chair','snack','window','entry'],['Amy','Penny','Bernadette','Raj','Howard','Stuart'],
    "Six suspicious guests, one detective party, and a mysterious missing comic.",
    [has('Stuart','uncomfortable',"Stuart gets the uncomfortable entry stool. Some things are universal constants."),
     has('Raj','snacks',"Raj is running the party and remains nearest the snacks."),
     has('Howard','window',"Howard insists the window seat adds cinematic mystery."),
     adjacent('Amy','Penny',"Amy and Penny are collecting witness statements together.")],
    'Case closed. Your deductive ability is highly satisfactory.',
    'The evidence points to an illogical seating plan. Bazinga!'),
  c('nobel-banquet','wolowitz',"The Nobel After-Party",'The Post-Ceremony Seating Proof','hard',
    ['north','west-upper','west-lower','east-upper','east-lower','south'],['Bernadette','Amy','Leonard','Sheldon','Penny','Stuart'],
    "An official celebration has turned into a perfectly ridiculous dinner-guest optimization.",
    [has('Bernadette','head',"Bernadette controls the seating chart and occupies the head."),
     has('Stuart','uncomfortable',"Stuart gets the wobbly end chair, predictably."),
     has('Sheldon','draft',"Sheldon has accepted a seat by the door after the thermostat was adjusted."),
     adjacent('Amy','Bernadette',"Amy wants to congratulate Bernadette from the neighbouring place.")],
    'A result deserving of peer review. I shall allow a modest celebration.',
    'The seating theorem has been disproven. Bazinga!'),
  c('caltech-quantum','lab',"Quantum Chaos at Caltech",'The Laboratory Safety Conundrum','hard',
    ['safe','scope','laser','computer','vent','exit'],['Bernadette','Sheldon','Howard','Leonard','Stuart','Amy'],
    "Six workstations, a badly timed experiment and a meticulous safety checklist.",
    [has('Sheldon','experiment',"Sheldon has reserved the telescope station for his measurements."),
     has('Stuart','uncomfortable',"Stuart has been given the air-vent stool nobody wanted."),
     has('Bernadette','lab-safe',"Bernadette chooses the shielded desk because safety matters."),
     has('Amy','door',"Amy must keep the emergency exit within reach.")],
    'All safety constraints satisfied. At last, a rational colleague.',
    'Please step away from the experimental apparatus. Bazinga!'),
  c('cafeteria-summit','cafeteria',"The Physics Department Summit",'The Cafeteria Superposition','hard',
    ['west-head','top-left','top-right','east-head','bottom-left','bottom-right'],['Leonard','Sheldon','Amy','Stuart','Howard','Raj'],
    "Six scientists and friends have created an improbably detailed lunch agreement.",
    [has('Sheldon','window',"Sheldon insists on the window side, away from the worst lunch queue."),
     has('Stuart','uncomfortable',"Stuart gets the exposed chair by the exit. Again."),
     has('Howard','snacks',"Howard cannot be too far from the lunch serving area."),
     adjacent('Amy','Sheldon',"Amy insists on sitting where she can challenge Sheldon's hypotheses.")],
    'The lunch arrangement reaches a rare equilibrium. I approve.',
    'The particle of common sense has escaped this cafeteria. Bazinga!'),
];

export const roomCases:RoomCase[] = polishRoomCases(draftRoomCases);

/** Coordinate-based spatial semantics — no linear array assumptions. */
const distance=(a:{x:number;y:number},b:{x:number;y:number})=>Math.hypot(a.x-b.x,a.y-b.y);
function seats(c:RoomCase):RoomSeat[]{const map=rooms[c.room];return c.seatIds.map(id=>{const s=map.seats.find(t=>t.id===id);if(!s)throw Error(`No seat ${id} in ${c.room}`);return s})}
function propPosition(c:RoomCase,label:string):RoomProp|undefined {return rooms[c.room].props.find(p=>p.label===label)}
export function holdsRoomRule(c:RoomCase,order:readonly string[],r:RoomRule):boolean{
  const spots=seats(c),a=order.indexOf(r.a),b=r.b?order.indexOf(r.b):-1;
  if(a<0||!spots[a])return false;
  if(r.type==='has')return !!r.tag&&spots[a].tags.includes(r.tag);
  if(r.type==='avoids')return !!r.tag&&!spots[a].tags.includes(r.tag);
  if(r.type==='adjacent'||r.type==='not-adjacent'){
    if(b<0)return false;
    const near=distance(spots[a],spots[b])<=34;
    return r.type==='adjacent'?near:!near;
  }
  if(r.type==='left')return b>=0&&spots[a].x<spots[b].x;
  if(r.type==='far-from-guest'){
    if(b<0)return false;
    const longest=Math.max(...spots.map(s=>distance(s,spots[b])));
    return distance(spots[a],spots[b])>=longest-0.001;
  }
  const p=r.prop?propPosition(c,r.prop):undefined;
  if(!p)return false;
  const distances=spots.map(s=>distance(s,p));
  return r.type==='closest'?distances[a]<=Math.min(...distances)+0.001:distances[a]>=Math.max(...distances)-0.001;
}
export const seatForGuest=(c:RoomCase,name:string)=>seats(c)[c.solution.indexOf(name)];
const tagText:Record<string,string> = {
  spot:'the sacred cushion that everybody knows belongs to Sheldon',
  sofa:'a proper sofa cushion',uncomfortable:'one of the least comfortable places in the room',
  'tv-view':'an unobstructed view of the television',warm:'the warmer part of the room',
  draft:'a seat exposed to a noticeable draft',kitchen:'a position by the kitchen',
  snacks:'a spot within easy reach of the snacks',door:'a seat near the doorway',
  window:'a window-side seat',chair:'a separate chair, not the sofa',quiet:'a relatively quiet corner',
  experiment:'a seat beside the experiment', 'lab-safe':'a safety-conscious workstation',
  desk:'a desk or workstation',dining:'a seat at the main table',
  head:'the head of the table',comic:'a place beside the comic shelves',
  counter:'a place at the register',front:'a seat in the front row',back:'a seat in the back row',
  center:'a centre seat',aisle:'an aisle seat',screen:'a seat squarely oriented to the screen',
  'far-corner':'a far-corner position', 'partial-view':'a place with a less convenient TV angle',
};
export function roomRuleText(_c:RoomCase,r:RoomRule):string {
  if(r.text)return r.text;
  if(r.type==='has')return `${r.a} must sit in ${tagText[r.tag??'']??'the designated position'}.`;
  if(r.type==='avoids')return `${r.a} refuses ${tagText[r.tag??'']??'that kind of chair'}.`;
  if(r.type==='adjacent')return `${r.a} and ${r.b} insist on neighbouring seats.`;
  if(r.type==='not-adjacent')return `${r.a} and ${r.b} need space between their seats.`;
  if(r.type==='left')return `${r.a} sits to the left of ${r.b} on the room map.`;
  if(r.type==='far-from-guest')return `${r.a} must be as far as possible from ${r.b} — statistically prudent.`;
  return `${r.a} needs the ${r.type==='closest'?'nearest':'farthest'} seat from ${r.prop}.`;
}
const permutations=(names:string[]):string[][]=>{
  if(names.length===0)return [[]];
  return names.flatMap((a,i)=>permutations(names.filter((_,j)=>j!==i)).map(rest=>[a,...rest]));
};
const cache=new Map<string,string[][]>();
const candidates=(c:RoomCase):string[][]=>{
  const key=[...c.solution].sort().join('|');
  if(!cache.has(key))cache.set(key,permutations([...c.solution]));
  return cache.get(key)!;
};
function hash(s:string){let v=2166136261;for(const char of s){v^=char.charCodeAt(0);v=Math.imul(v,16777619)}return v>>>0}
function shuffle<T>(items:T[],seed:string):T[]{let v=hash(seed);const arr=[...items];for(let i=arr.length-1;i>0;i--){v=(Math.imul(v,1664525)+1013904223)>>>0;const j=v%(i+1);[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
const uniqueKey=(r:RoomRule)=>[r.type,r.a,r.b??'',r.tag??'',r.prop??''].join('|');
const rulesCache=new Map<string,RoomRule[]>();
export function roomRules(c:RoomCase):RoomRule[]{
  const previous=rulesCache.get(c.id);if(previous)return previous;
  const chairs=seats(c), pool:RoomRule[]=[];
  const tagFrequency=new Map<string,number>();
  for(const tag of new Set(chairs.flatMap(s=>s.tags))){
    tagFrequency.set(tag,chairs.filter(seat=>seat.tags.includes(tag)).length);
  }
  // Narrative anchors are hand-authored and tested; the remaining clues are
  // real spatial facts derived from each venue's map, NOT seat indices.
  for(const name of c.solution){
    const seat=chairs[c.solution.indexOf(name)];
    // Keep medium/expert property clues genuinely broad; do not translate a
    // unique image label directly into a person's exact chair.
    for(const tag of seat.tags){
      if((tagFrequency.get(tag)??0)>=2)pool.push({type:'has',a:name,tag});
    }
    for(const tag of tagFrequency.keys()){
      if(!seat.tags.includes(tag)&&(tagFrequency.get(tag)??0)>=2)
        pool.push({type:'avoids',a:name,tag});
    }
    // Object-distance facts are harder to reason about than a name on a chair,
    // but reserve single-location anchors mainly for Cozy puzzles.
    if(c.difficulty==='easy')for(const p of rooms[c.room].props){
      for(const type of ['closest','farthest'] as const){
        const rule:RoomRule={type,a:name,prop:p.label};
        if(holdsRoomRule(c,c.solution,rule))pool.push(rule);
      }
    }
  }
  for(let i=0;i<c.solution.length;i++)for(let j=0;j<c.solution.length;j++)if(i!==j){
    const a=c.solution[i],b=c.solution[j];
    const options:RoomRule[]=[{type:'adjacent',a,b},{type:'not-adjacent',a,b},
      {type:'left',a,b},{type:'far-from-guest',a,b}];
    for(const r of options)if(holdsRoomRule(c,c.solution,r))pool.push(r);
  }
  const chosen=[...c.rules];
  let viable=candidates(c).filter(order=>chosen.every(r=>holdsRoomRule(c,order,r)));
  const order=shuffle(pool,c.id+'-deduction');
  const relation=(r:RoomRule)=>['adjacent','not-adjacent','left','far-from-guest'].includes(r.type);
  while(viable.length>1){
    const usable=order.filter(r=>!chosen.some(cue=>uniqueKey(cue)===uniqueKey(r)))
      .map(r=>({rule:r,count:viable.filter(candidate=>holdsRoomRule(c,candidate,r)).length}))
      .filter(({count})=>count>0&&count<viable.length);
    if(!usable.length)throw new Error(`Room case ${c.id} cannot be uniquely solved`);
    // Expert clues are chosen for chained reasoning, not for instant solution.
    // Target moderate information per clue instead of always taking the most
    // brutally eliminating constraint. Relations take priority over seat tags.
    const target=c.difficulty==='hard'?.45:c.difficulty==='medium'?.35:.20;
    usable.sort((x,y)=>{
      const weight=(v:typeof x)=>{
        const ratio=v.count/viable.length;
        const isRel=relation(v.rule);
        const tooEasy=c.difficulty==='hard'&&ratio<.19?.38:0;
        return Math.abs(ratio-target)+(isRel?0:c.difficulty==='hard'?.28:.11)+tooEasy;
      };
      return weight(x)-weight(y);
    });
    const next=usable[0];
    chosen.push(next.rule);
    viable=viable.filter(candidate=>holdsRoomRule(c,candidate,next.rule));
  }
  // Extra authentic room constraints make clue chains richer, without
  // spoon-feeding exact positions after the deduction is already solved.
  const min=c.difficulty==='easy'?4:c.difficulty==='medium'?7:9;
  const supplementary=order.filter(r=>relation(r)&&!chosen.some(x=>uniqueKey(x)===uniqueKey(r)));
  for(const rule of supplementary){
    if(chosen.length>=min)break;
    // Avoid mirror-image duplicates: A beside B == B beside A.
    if(['adjacent','not-adjacent'].includes(rule.type)&&
       chosen.some(x=>x.type===rule.type&&x.a===rule.b&&x.b===rule.a))continue;
    chosen.push(rule);
  }
  const result=[...c.rules,...shuffle(chosen.slice(c.rules.length),c.id+'-present')];
  rulesCache.set(c.id,result);
  return result;
}
/** Diagnostic metrics are checked in tests so Expert does not regress into
 * a collection of one-clue-one-chair instructions. */
export function roomClueDiagnostics(c:RoomCase){
  const rules=roomRules(c);
  const all=candidates(c);
  const firstThree=all.filter(order=>rules.slice(0,3).every(rule=>holdsRoomRule(c,order,rule))).length;
  const positions=seats(c);
  const directSeatClues=rules.filter(rule=>rule.type==='has'&&
    positions.filter(pos=>pos.tags.includes(rule.tag??'')).length===1).length;
  const relationshipClues=rules.filter(rule=>['adjacent','not-adjacent','left','far-from-guest'].includes(rule.type)).length;
  return {firstThree,ruleCount:rules.length,directSeatClues,relationshipClues,initialOptions:all.length};
}

/** Prevent a decorative fixture from obscuring a real clickable seat.
 * The normalized bounding boxes match the room's 650×500 min-size layout. */
export function roomPropOverlaps(c:RoomCase):string[]{
  const problems:string[]=[];
  const map=rooms[c.room];
  for(const fixture of map.props) for(const chair of seats(c)){
    const wide=fixture.label==='Television'||fixture.label==='Movie screen'?150:110;
    const dx=Math.abs(fixture.x-chair.x)*6.5,dy=Math.abs(fixture.y-chair.y)*5;
    if(dx<(wide+90)/2+4 && dy<=(67+90)/2+2)
      problems.push(`${fixture.label} overlaps ${chair.id}`);
  }
  return problems;
}

export function roomSolutions(c:RoomCase):string[][]{
  const rules=roomRules(c);
  return candidates(c).filter(order=>rules.every(r=>holdsRoomRule(c,order,r)));
}
export function validateRoomWorld():string[]{
  const problems:string[]=[];
  if(new Set(roomCases.map(c=>c.id)).size!==roomCases.length)problems.push('duplicate case IDs');
  for(const c of roomCases){
    if(new Set(c.seatIds).size!==c.seatIds.length||new Set(c.solution).size!==c.solution.length)problems.push(`${c.id}: duplicate seat/character`);
    if(c.solution.length!==c.seatIds.length||c.solution.length!==({easy:4,medium:5,hard:6})[c.difficulty])problems.push(`${c.id}: difficulty mismatch`);
    if(c.rules.some(r=>!holdsRoomRule(c,c.solution,r)))problems.push(`${c.id}: story clue contradicts answer`);
    const solved=roomSolutions(c);
    if(solved.length!==1||solved[0].join('|')!==c.solution.join('|'))problems.push(`${c.id}: ${solved.length} solutions`);
  }
  return problems;
}
export function dailyRoomCase(date:string,difficulty:Difficulty):RoomCase {
  const list=roomCases.filter(c=>c.difficulty===difficulty);
  const [y,m,d]=date.split('-').map(Number);
  const i=Math.floor(Date.UTC(y,m-1,d)/86400000);
  return list[((i%list.length)+list.length)%list.length];
}
export function practiceRoomCase(difficulty:Difficulty,recent:string[]=[],random=Math.random):RoomCase {
  const list=roomCases.filter(c=>c.difficulty===difficulty);
  const available=list.filter(c=>!recent.includes(c.id));
  const pool=available.length?available:list;
  return pool[Math.min(pool.length-1,Math.floor(random()*pool.length))];
}
