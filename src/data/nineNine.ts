import type { Difficulty } from '../lib/passport';
import { auditedExhibitNotes } from './nineNineAudit';

/** Original, fictional case files inspired by the setting and running gags of
 * Brooklyn Nine-Nine. NOT reproductions of aired plots or official dialogue. */
export type Evidence = {id:string; icon:string; title:string; text:string; kind:'forensics'|'interview'|'record'|'scene'};
export type Deduction = {
  id:string; pair:[string,string]; prompt:string; conclusion:string;
  /** Logical survivors, verified by candidate-grid exhaustiveness. */
  possibleSuspects?:string[]; possibleMethods?:string[];
};
export type NineCase = {
  id:string; title:string; subtitle:string; location:string; difficulty:Difficulty;
  track:'detective'|'heist'; style:'interrogation'|'timeline'|'forensics'|'heist';
  icon:string; brief:string; lead:string;
  suspects:string[]; methods:string[]; evidence:Evidence[]; deductions:Deduction[];
  culprit:string; method:string; decisive:string; finale:string;
};
type Seed={
  id:string;title:string;subtitle:string;location:string;difficulty:Difficulty;
  track?:'detective'|'heist';style:NineCase['style'];icon:string;brief:string;lead:string;
  suspects:[string,string,string,string];methods:[string,string,string];
  evidence:[string,string,string,string,string,string,...string[]];
  links:[string,string,string,...string[]];culprit:string;method:string;finale:string;
};
/** Evidence string syntax: emoji~category~title~description
 * Link string syntax: index,index~Deduction prompt~Verified reasoning
 * Clue meanings are authored; survivor sets are constructed separately and tested. */
function unpackEvidence(raw:string,i:number):Evidence {
  const parts=raw.split('~');
  if(parts.length!==4)throw new Error('Malformed evidence '+raw);
  return {id:'e'+i,icon:parts[0],kind:parts[1] as Evidence['kind'],title:parts[2],text:parts[3]};
}
function unpackLink(raw:string,i:number,s:Seed):Deduction {
  const [pair,prompt,conclusion]=raw.split('~');
  const [a,b]=pair.split(',').map(Number);
  const others=s.suspects.filter(name=>name!==s.culprit);
  const otherMethods=s.methods.filter(x=>x!==s.method);
  const hard=s.difficulty==='hard';
  const filters=hard?[
    {possibleSuspects:[s.culprit,others[0],others[1]]},
    {possibleSuspects:[s.culprit,others[1]],possibleMethods:[s.method,otherMethods[0]]},
    {possibleSuspects:[s.culprit,others[2]]},
    {possibleMethods:[s.method,otherMethods[1]]},
  ]:[
    {possibleSuspects:[s.culprit,others[0]]},
    {possibleSuspects:[s.culprit,others[1]],possibleMethods:[s.method,otherMethods[0]]},
    {possibleMethods:[s.method,otherMethods[1]]},
  ];
  if(!filters[i])throw new Error('Too many links '+s.id);
  return {id:'link'+i,pair:['e'+a,'e'+b],prompt,conclusion,...filters[i]};
}
function makeCase(s:Seed):NineCase {
  const deductions=s.links.map((line,i)=>unpackLink(line,i,s));
  const notes=auditedExhibitNotes[s.id];
  if(!notes||notes.length!==deductions.length)throw new Error('Missing forensic audit notes for '+s.id);
  const evidence=s.evidence.map(unpackEvidence);
  deductions.forEach((d,i)=>{
    const record=evidence.find(e=>e.id===d.pair[1]);
    if(!record)throw new Error('Missing referenced report in '+s.id);
    record.text+=' PRECINCT CROSS-CHECK: '+notes[i];
  });
  return {...s,track:s.track??'detective',evidence,deductions,
    decisive:'link'+(s.links.length-1)};
}

export const nineCases:NineCase[]=[
  makeCase({id:'yogurt-vanish',title:'The Great Yogurt Disappearance',subtitle:"Terry's emergency yogurt has vanished",location:'The Nine-Nine bullpen',difficulty:'easy',style:'forensics',icon:'🥛',
    brief:"A sealed yogurt tub has disappeared from Terry's labelled fridge shelf. Jake calls it a major crime against gains.",
    lead:'Detective Jeffords: "Find my yogurt. And please stop calling it a dairy heist."',
    suspects:['Jake','Charles','Gina','Hitchcock'],methods:['Fridge swap','Borrowed key','Delivery cart'],
    evidence:[
      '🥛~scene~Empty shelf~The labelled compartment is empty but its seal-sticker remains on the bottom shelf.',
      '📦~record~Kitchen inventory~A second tub was logged on the morning delivery sheet; its code is different.',
      '🧾~record~Cart delivery sheet~The courier cart arrived after the refrigerator was already reported empty.',
      '⏰~interview~Break-room witness~Charles was at the precinct doors with lunch receipts when the alarm sounded.',
      '🔑~forensics~Key cabinet~The backup cabinet key has not been removed this morning.',
      '🧊~scene~Fridge temperature~A warm tub wrapper was found in the recycling bin; it did not arrive chilled.',
    ],
    links:[
      '2,3~Who could not have moved the tub in the delivery window?~The cart arrived too late and Charles was out of the kitchen. The missing tub was handled earlier.',
      '0,4~What does the untouched key reveal?~The fridge was opened normally, not using the restricted backup key; the seal was peeled off deliberately.',
      '1,5~Which missing-product method fits both packaging records?~One tub was replaced with an older warm one under a second inventory code: a fridge swap, not a new delivery.',
    ],culprit:'Gina',method:'Fridge swap',finale:'Terry loves an evidence-based solution. And yogurt. Especially yogurt.'}),
  makeCase({id:'binder-blueprint',title:"Amy's Missing Binder",subtitle:'A stationery emergency at the precinct',location:"Amy's desk",difficulty:'easy',style:'timeline',icon:'📋',
    brief:'The colour-coded quarterly binder is missing just before Holt arrives for inspection.',
    lead:'Amy: "I have an emergency backup binder, but it is alphabetically inferior."',
    suspects:['Jake','Charles','Rosa','Gina'],methods:['Drawer switch','Archive transfer','Disguised delivery'],
    evidence:[
      '📚~scene~Binder tabs~The missing binder contained green and violet tabs, which are still on the desk.',
      '🗃️~record~Archive log~No sign-out entry exists for the archive room before noon.',
      '🪪~record~Desk access list~Only two people borrowed the desk key during the morning briefing.',
      '🗣️~interview~Rosa’s statement~Rosa reports being on a call in the garage until Holt came upstairs.',
      '✉️~scene~Envelope fibres~A sealed courier envelope at the desk is too small to hold the binder.',
      '✏️~forensics~Drawer scuffs~Fresh scuff marks inside the bottom drawer match a binder-sized object.',
    ],
    links:[
      '2,3~Which access story survives the briefing and garage times?~The garage call excludes Rosa during the desk-access window.',
      '1,4~What can the archive ledger and envelope size rule out?~The binder was neither signed into archives nor hidden in the small delivery envelope.',
      '0,5~Where did the missing binder actually go?~Its tabs were left behind while the binder itself was exchanged inside Amy’s own lower drawer.',
    ],culprit:'Jake',method:'Drawer switch',finale:'Amy has filed the solution under “satisfactory investigative competence.”'}),
  makeCase({id:'cheddar-collar',title:"Cheddar's Missing Collar",subtitle:'A tiny dignified mystery',location:"Captain Holt's office",difficulty:'easy',style:'forensics',icon:'🐕',
    brief:'Cheddar’s ceremonial collar has vanished before the precinct pet-calendar photo.',
    lead:'Captain Holt: "I expect a measured investigation. Cheddar is not merely some common basset hound."',
    suspects:['Jake','Amy','Charles','Gina'],methods:['Coat pocket','Evidence locker','Photo-prop swap'],
    evidence:[
      '🐕~scene~Cheddar’s leash~The ordinary leash is present but the formal collar has been replaced with a costume copy.',
      '📸~record~Photo studio booking~The pet-calendar photographer checked the prop box before the collar was reported missing.',
      '🧥~forensics~Lint inspection~No decorative fibres are found in the coats on the rack.',
      '🔐~record~Locker audit~The evidence-locker seal is intact from yesterday.',
      '👀~interview~Photographer~One assistant rearranged the props while Cheddar was drinking water.',
      '🎀~scene~Prop box~A velvet collar-shaped recess is visible in the photo-prop case.',
    ],
    links:[
      '1,4~Who had the opportunity during the photo preparation?~Only the photographer’s assistant handled the prop tray during the relevant time.',
      '2,3~What hiding places do the coat and locker checks eliminate?~Neither a coat nor the sealed evidence locker could have concealed the collar.',
      '0,5~What happened to the real collar?~The prop copy on Cheddar and the matching recess show a deliberate photo-prop swap.',
    ],culprit:'Gina',method:'Photo-prop swap',finale:'Captain Holt is pleased. His face may not show it.'}),
  makeCase({id:'jimmy-jab-medal',title:'The Jimmy Jab Mix-Up',subtitle:'A suspiciously competitive lunch break',location:'Precinct training floor',difficulty:'hard',style:'timeline',icon:'🏅',
    brief:'The unofficial Jimmy Jab Games medal has moved before the finals and nobody admits touching it.',
    lead:'Jake: "This is a heist. But with office furniture. And significantly less dignity."',
    suspects:['Jake','Amy','Rosa','Charles'],methods:['Trophy case','Supply closet','Rolling chair'],
    evidence:[
      '🏅~scene~Medal stand~Dust outlines the medal’s original location; the display latch was not broken.',
      '🛞~forensics~Wheel tracks~A rolling chair crossed the aisle shortly before the medal vanished.',
      '📹~record~Camera snapshot~The moving chair carried only a bag; the medal’s case remained visible afterward.',
      '🧹~interview~Cleaning staff~The supply closet was opened for towels after the race ended.',
      '🔐~record~Display latch~The trophy cabinet was unlocked during the midday award rehearsal.',
      '📁~scene~Case inventory~The rehearsal inventory lists a second, nearly identical medal case.',
      '🎟️~record~Rehearsal passes~Temporary display permits were issued to award coordinators while the case stood open for inspection.',
    ],
    links:[
      '1,2~Does the moving chair explain the missing medal?~The camera proves the medal remained on display after the chair passed.',
      '3,4~Where could the medal be hidden before the rehearsal?~The closet timing is wrong, but the cabinet was freely accessible while contestants prepared.',
      '0,5~What object explains the two outlines?~The unused duplicate medal case explains a substitution during the award rehearsal.',
      '6,4~What finally pins down the way the medal moved?~The temporary display permit and unlocked latch identify the trophy case, not a chair or supply closet, as the access route.',
    ],culprit:'Amy',method:'Trophy case',finale:'The Games are officially ridiculous, and the investigation is officially excellent.'}),
  makeCase({id:'pontiac-switch',title:'The Pontiac Switcheroo',subtitle:'A familiar criminally charming distraction',location:'Garage C',difficulty:'medium',style:'forensics',icon:'🚘',
    brief:'A vintage Pontiac booked as evidence has been switched for a matching shell before inspection.',
    lead:'Jake: "Nobody say Doug Judy’s name unless you have actual evidence. ...I already said it, didn’t I?"',
    suspects:['Doug Judy','Anita','Marcos','Vincent'],methods:['Plate swap','Tow-truck decoy','Garage key clone'],
    evidence:[
      '🚗~scene~Garage tyre marks~The replacement Pontiac has a different rear tyre tread from the impounded vehicle.',
      '🎫~record~Towing permit~A tow-truck permit was created two hours after the replacement was noticed.',
      '🔐~forensics~Lock cylinder~The garage door cylinder bears fresh scratches consistent with an unauthorized duplicate key.',
      '📞~interview~Receptionist~Anita was on a recorded call while the security alarm registered garage entry.',
      '🧰~record~Key-cutting receipt~One suspect purchased a restricted garage-key blank earlier in the morning.',
      '🚨~record~Checkpoint image~The replacement already carried the correct plates when it entered the garage.',
    ],
    links:[
      '1,3~Can the towing story survive the recorded times?~The permit was filed too late, while the call rules out Anita as the entry-time driver.',
      '0,5~Which methods fail the checkpoint and tyre evidence?~The car itself was replaced, not merely its plates, and the tow-truck timetable fails.',
      '2,4~Who could open the locked garage without the original key?~The cut key blank and scratches support a cloned garage key used before the switch.',
    ],culprit:'Doug Judy',method:'Garage key clone',finale:'Jake is delighted; Holt is withholding his approval until the paperwork arrives.'}),
  makeCase({id:'interrogation-contradiction',title:'The Interrogation Clock',subtitle:'An uncomfortable night in Room C',location:'Interrogation Room C',difficulty:'medium',style:'interrogation',icon:'⏱️',
    brief:'A witness claims to have been at a midnight delivery, but the evidence makes their statement impossible.',
    lead:'Holt: "Detective. Facts first. Dramatic pauses second."',
    suspects:['Marlow','Clarke','Finch','Mills'],methods:['False timestamp','Altered receipt','Duplicate badge'],
    evidence:[
      '🗣️~interview~Marlow testimony~Marlow says the delivery was accepted while the freight elevator was operational.',
      '🛗~record~Elevator service sheet~The freight elevator shut down at 23:40 and remained locked until morning.',
      '🧾~forensics~Receipt ink~The receipt was printed on a machine whose ribbon failed before the claimed delivery.',
      '🏷️~record~Access badges~Badge-number logs show no duplicate access badges at the delivery entrance.',
      '📞~interview~Night supervisor~Clarke was speaking to dispatch during the alleged midnight handover.',
      '🕛~scene~Platform clock~The surveillance clock was accurate within one minute, not the twenty-minute gap the account needs.',
    ],
    links:[
      '0,1~Where does the testimony contradict the building record?~The claimed elevator delivery cannot have occurred during the documented shutdown.',
      '3,4~Which person and entry method are excluded by the logs?~The access badges are unique, and Clarke’s dispatch call covers the alleged entry window.',
      '2,5~Which forged detail survives the printer and camera checks?~The time was falsified after the receipt machine had already failed; the timestamp is the inconsistent part.',
    ],culprit:'Marlow',method:'False timestamp',finale:'Holt gives an almost imperceptible nod. That is practically a parade.'}),
  makeCase({id:'santiago-puzzle',title:"Santiago's Puzzle-Master Panic",subtitle:'A crossword that was far too organized',location:'Precinct archive',difficulty:'medium',style:'forensics',icon:'🧠',
    brief:'Amy’s competition crossword contains a hidden message that seems to have been altered after printing.',
    lead:'Amy: "I labeled every sheet. Alphabetically. And then emotionally."',
    suspects:['Victor','Nina','Charles','Jake'],methods:['Carbon overlay','Reprinted page','Pencil substitution'],
    evidence:[
      '🧩~scene~Grid sheet~Every printed letter has consistent ink density except a few darker diagonal cells.',
      '🖨️~record~Printer queue~The office printer produced no replacement sheets after 09:00.',
      '✏️~forensics~Graphite traces~The suspicious letters leave no pencil transfer on an eraser.',
      '📂~record~Archive access~Victor and Nina both entered the archive; Jake was elsewhere when the sheet was replaced.',
      '🔦~scene~Backlit page~A faint second impression appears underneath the upper sheet when lit from behind.',
      '🧾~interview~Supplier note~The transparent overlay supplier delivered one sheet to Victor before the competition.',
    ],
    links:[
      '1,3~Who could edit the grid without rerunning the printer?~The printer was idle; only an archive visitor could change the existing sheet.',
      '0,2~What do the different ink densities and absent graphite rule out?~The text was neither a fully reprinted page nor a pencil rewrite.',
      '4,5~What object explains the second impression?~Victor’s thin carbon overlay produced the ghost lettering without touching the printer.',
    ],culprit:'Victor',method:'Carbon overlay',finale:'Amy regards the solution as excellent and has prepared a laminated certificate.'}),
  makeCase({id:'food-truck-ledger',title:"Boyle's Food-Truck Ledger",subtitle:'Something smells like a bookkeeping error',location:'Shaw’s parking lot',difficulty:'hard',style:'timeline',icon:'🌮',
    brief:'One of Boyle’s premium lunch trays vanished from a food-truck order before pickup.',
    lead:'Charles: "Every missing tray is a personal tragedy for a chef."',
    suspects:['Hitchcock','Scully','Gina','Marco'],methods:['Order swap','Pickup code','Side-door handoff'],
    evidence:[
      '🌮~scene~Tray labels~The missing tray label has been placed on a lower-priced vegetarian box.',
      '📱~record~Pickup app~The pickup code was never scanned for the premium order.',
      '🚪~record~Side door camera~The side hatch remained latched throughout the lunch rush.',
      '👀~interview~Runner witness~Hitchcock and Scully were arguing at the front counter when the swap happened.',
      '🧾~record~Printed receipts~A duplicate order label was printed from the truck tablet at 12:10.',
      '🔎~forensics~Adhesive marks~The box’s original label was peeled away minutes after the printer made the duplicate.',
      '📚~record~Packing ledger~The packing tally contains a corrected premium tray entry but no second dispatch.',
    ],
    links:[
      '2,3~Who and which access route are ruled out by the witness and door log?~Neither a side-door handoff nor the counter argument can explain the swapped box.',
      '1,4~Why is the pickup code a poor explanation?~The code was unused, but the truck tablet generated a second label before the pickup window.',
      '0,5~What does the altered adhesive tell you?~The premium tray label was transferred to a cheaper box while the expensive order vanished.',
      '6,5~Which method satisfies both records?~The packing tally and peeled adhesive establish an order swap, not a second pickup or a side-door removal.',
    ],culprit:'Gina',method:'Order swap',finale:'Boyle is reassured. He would also like to explain the sauce in significant detail.'}),
  makeCase({id:'heist-one',title:'Heist I — The Missing Medal',subtitle:'The first of three precinct heists',location:"Captain Holt's office",difficulty:'easy',track:'heist',style:'heist',icon:'🎃',
    brief:'The honorary Halloween medal disappears from a locked glass case just before Holt announces the rules.',
    lead:'Jake: "Whoever solves this gets to be the official opening-act detective."',
    suspects:['Jake','Amy','Rosa','Charles'],methods:['Office key','Medal duplicate','Service vent'],
    evidence:[
      '🏅~scene~Medal case~The stand is empty, but its glass has not been damaged.',
      '🗝️~record~Office key register~The office key was checked out during the morning briefing and returned promptly.',
      '🪜~scene~Vent cover~A fresh coat of paint seals the service vent screws.',
      '📸~record~Security image~Rosa stood in the corridor while Charles was in a meeting when the case opened.',
      '🧪~forensics~Medal resin~Small traces of casting resin remain inside the display base.',
      '🎭~interview~Costume technician~A contestant ordered a resin medal replica two days before the game.',
    ],
    links:[
      '1,3~Whose schedule survives the key and hallway evidence?~The check-out happened during a meeting, eliminating the people who never approached Holt’s office.',
      '0,2~Does the intact case support a vent break-in?~No: the vent was sealed; the glass was unlocked normally, leaving no forced-entry marks.',
      '4,5~What was actually taken from the display?~The resin residue and replica commission prove a medal duplicate was substituted during setup.',
    ],culprit:'Amy',method:'Medal duplicate',finale:'Holt has recorded the result under “unexpectedly competent.” The heist continues.'}),
  makeCase({id:'heist-two',title:'Heist II — Cheddar’s Decoy',subtitle:'Somebody borrowed the best detective',location:'Evidence locker hallway',difficulty:'medium',track:'heist',style:'heist',icon:'🐾',
    brief:'A decoy trophy passes through the corridor while Cheddar mysteriously appears beside the evidence locker.',
    lead:'Holt: "My dog is a capable participant. He is not a prop."',
    suspects:['Jake','Gina','Rosa','Terry'],methods:['Dog harness','Locker cart','False radio call'],
    evidence:[
      '🐾~scene~Paw prints~The prints end where a quiet alcove leads to the locker corridor.',
      '📹~record~Hallway camera~A rolling evidence cart passed empty long before the trophy alarm.',
      '📻~record~Radio transcript~The supposed emergency message was broadcast after the trophy left the office.',
      '🦴~scene~Harness tag~A special clip designed for a small dog hangs from Cheddar’s leash.',
      '🗣️~interview~Dog walker~Terry was with the K9 handler while Jake stayed by the interview room.',
      '🔐~forensics~Locker residue~Tiny pet-hair fibres and the same harness clip material were found by the latch.',
    ],
    links:[
      '1,4~Can the moving cart and two known alibis explain the trophy’s passage?~The cart was empty and the two alibis cover the only possible departure.',
      '2,3~Was the radio message the trick?~The message came too late; someone used a harness instead of broadcasting a diversion.',
      '0,5~Which concealed device moved the trophy?~The dog-size harness and fur connect Cheddar’s route directly to the locker latch.',
    ],culprit:'Rosa',method:'Dog harness',finale:'The precinct now has a new prime suspect. Cheddar remains above suspicion.'}),
  makeCase({id:'heist-three',title:'Heist III — The Final Reveal',subtitle:'A heist inside another heist',location:'Precinct bullpen',difficulty:'hard',track:'heist',style:'heist',icon:'👑',
    brief:'The final prize has apparently been moved twice. Captain Holt insists there must be an auditable chain of custody.',
    lead:'Jake: "Okay, this is either genius-level deception or we lost the trophy again."',
    suspects:['Jake','Amy','Gina','Rosa'],methods:['Fake evidence bag','Badge clone','Double-envelope'],
    evidence:[
      '📦~scene~Two sealed envelopes~Both envelopes carry the same handwriting but different internal security strips.',
      '📹~record~Camera log~The hallway camera shows a badge swipe, then the same badge holder still inside the bullpen.',
      '🪪~record~Badge audit~No badge was copied; the second swipe was a maintenance-system test.',
      '✉️~forensics~Seal adhesive~One envelope uses normal station sealing tape; the other uses tamper-evident transfer adhesive.',
      '📅~record~Shift roster~Jake and Amy are in the evidence briefing while the envelopes exchange hands.',
      '🧷~scene~Evidence-bag seam~The clear evidence bag is uncut and bears no sign of a recent opening.',
      '🗣️~interview~Gina’s account~Gina says the prize never entered the locker; it was hidden among paperwork.',
    ],
    links:[
      '1,4~Can the badge swipe identify who moved the envelopes?~The timing and roster rule out the detectives visible elsewhere during the handoff.',
      '2,5~Which apparently technical trick is unsupported?~The badge was not cloned and the bag seam was never opened, undermining both alternative stories.',
      '0,6~What does the paperwork statement change?~The matching envelopes and Gina’s account point to paperwork handled away from the evidence locker.',
      '3,0~How was the final prize hidden despite two sealed containers?~Transfer adhesive proves a double-envelope switch that never required opening the sealed bag.',
    ],culprit:'Gina',method:'Double-envelope',finale:'Holt has officially entered the result into the precinct’s absurdly competitive history.'}),
  makeCase({id:'locked-lab',title:'The Locked Evidence Room',subtitle:'A surveillance puzzle with one false alibi',location:'99th precinct evidence room',difficulty:'hard',style:'timeline',icon:'🔎',
    brief:'A tagged antique watch disappeared from an internal storage shelf without tripping a door alarm.',
    lead:'Rosa: "Someone lied. Work out who before I ask them again."',
    suspects:['Keller','Morris','Finch','Patel'],methods:['Shelf rotation','Camera loop','Door magnet'],
    evidence:[
      '⌚~scene~Empty shelf~The watch’s foam cutout remains undisturbed, but the evidence box is missing.',
      '📹~record~Camera frames~Two consecutive frames show identical movement in the reflection of a wall clock.',
      '🚪~forensics~Door alarm~The magnetic sensor operated continuously and shows no tampering.',
      '🪪~record~Access sheet~Finch was logged out during the disputed window; Patel signed a delivery receipt.',
      '🗣️~interview~Morris statement~Morris claims the shelf was reorganized only after the camera alert.',
      '📁~scene~Shelf tags~All shelving tags match the original inventory; no items shifted shelves.',
      '📡~record~Recording software~The camera system stores a cached one-minute segment that can be replayed remotely.',
    ],
    links:[
      '3,4~Which witness story conflicts with the recorded entry period?~Morris’s claimed late reorganization does not match the signed entry records.',
      '2,5~Which physical explanations fail at the door and shelves?~The door magnet was intact and no shelf rotation occurred.',
      '0,6~Which system can conceal removal without touching the door alarm?~The recording software can replay a stored segment while the box is removed.',
      '1,6~What identifies the decisive concealment method?~The repeated clock reflection and cached segment prove a camera loop, not a genuine uninterrupted recording.',
    ],culprit:'Keller',method:'Camera loop',finale:'Rosa offers a single approving nod. It is the highest available commendation.'}),
];

export function caseCandidates(c:NineCase,solvedIds:readonly string[]=[]):{suspect:string;method:string}[] {
  const active=c.deductions.filter(d=>solvedIds.includes(d.id));
  const grid=c.suspects.flatMap(suspect=>c.methods.map(method=>({suspect,method})));
  return grid.filter(({suspect,method})=>active.every(link=>
    (!link.possibleSuspects||link.possibleSuspects.includes(suspect)) &&
    (!link.possibleMethods||link.possibleMethods.includes(method))));
}
export function allNineCaseIssues():string[]{
  const issues:string[]=[];
  if(new Set(nineCases.map(c=>c.id)).size!==nineCases.length)issues.push('duplicate IDs');
  for(const c of nineCases){
    const evIds=c.evidence.map(e=>e.id);
    if(c.suspects.length!==4||c.methods.length!==3||new Set(c.suspects).size!==4||new Set(c.methods).size!==3)
      issues.push(c.id+': invalid suspect or method menu');
    if(!c.suspects.includes(c.culprit)||!c.methods.includes(c.method))issues.push(c.id+': missing solution');
    const seen=new Set<string>();
    for(const d of c.deductions){
      const evidenceText=d.pair.map(id=>c.evidence.find(e=>e.id===id)?.text??'').join(' ').toLowerCase();
      for(const suspect of c.suspects.filter(name=>d.possibleSuspects&&!d.possibleSuspects.includes(name))) {
        if(!evidenceText.includes(suspect.toLowerCase()))
          issues.push(c.id+': missing source-based alibi for '+suspect+' in '+d.id);
      }
      for(const method of c.methods.filter(name=>d.possibleMethods&&!d.possibleMethods.includes(name))) {
        if(!evidenceText.includes(method.toLowerCase()))
          issues.push(c.id+': missing source-based elimination for '+method+' in '+d.id);
      }
      if(d.pair[0]===d.pair[1]||d.pair.some(id=>!evIds.includes(id)))issues.push(c.id+': bad evidence pair');
      const key=[...d.pair].sort().join('|');
      if(seen.has(key))issues.push(c.id+': repeated link pair');
      seen.add(key);
      if(d.possibleSuspects&&!d.possibleSuspects.includes(c.culprit))issues.push(c.id+': contradiction suspect');
      if(d.possibleMethods&&!d.possibleMethods.includes(c.method))issues.push(c.id+': contradiction method');
    }
    const all=c.deductions.map(d=>d.id);
    const finals=caseCandidates(c,all);
    if(finals.length!==1||finals[0]?.suspect!==c.culprit||finals[0]?.method!==c.method)
      issues.push(c.id+': case has '+finals.length+' final deductions');
    const prefix=all.slice(0,-1);
    if(caseCandidates(c,prefix).length<2)issues.push(c.id+': final link is unnecessary');
    if(c.deductions.length!==(c.difficulty==='hard'?4:3))issues.push(c.id+': wrong number of deductive connections');
    for(let i=1;i<=all.length;i++){
      if(caseCandidates(c,all.slice(0,i)).length>=caseCandidates(c,all.slice(0,i-1)).length)
        issues.push(c.id+': redundant lead '+i);
    }
  }
  return issues;
}
export const heistCaseIds=['heist-one','heist-two','heist-three'] as const;
export function dailyNineCase(date:string,d:Difficulty):NineCase{
  const pool=nineCases.filter(c=>c.difficulty===d);
  const [y,m,day]=date.split('-').map(Number);
  const dayIndex=Math.floor(Date.UTC(y,m-1,day)/86400000);
  return pool[((dayIndex%pool.length)+pool.length)%pool.length];
}
export function practiceNineCase(d:Difficulty,recent:string[],random=Math.random):NineCase{
  const pool=nineCases.filter(c=>c.difficulty===d&&c.track==='detective');
  const choice=pool.filter(c=>!recent.includes(c.id));
  const usable=choice.length?choice:pool;
  return usable[Math.min(usable.length-1,Math.floor(random()*usable.length))];
}
