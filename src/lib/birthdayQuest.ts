import {romeMidnightUtc,romeParts} from './seasonalEvents';

/** The public birthday release must stay CLOSED until the real gift is supplied and approved. */
export const BIRTHDAY_EVENT_PUBLISHED=false;

/** Birthday live gate is evaluated in Rome time. Beta access is an explicit preview URL
 * and uses a separate save so the creator's rehearsal cannot spoil Molly's actual run. */
export function birthdayWindow(now=new Date()){
  const year=romeParts(now).year;
  const start=romeMidnightUtc(year,11,13);
  const end=romeMidnightUtc(year,11,14);
  return {year,start,end,active:now>=start&&now<end};
}
export function birthdayBetaFromSearch(search:string):boolean{
  return new URLSearchParams(search).get('birthday-beta')==='1';
}
export type BirthdayStep=0|1|2|3;
export type QuestionId='who'|'what'|'when';
export type BirthdaySave={
  version:1;
  step:BirthdayStep;
  connected:string[];
  evidenceTries:number;
  cakeTries:number;
  seating:string[];
  seatingTries:number;
  answers:QuestionId[];
  codeTries:number;
  openedAt:string|null;
};
export const birthdayGuests=['Leonard','Sheldon','Molly','Amy','Penny','Raj'] as const;
export const BIRTHDAY_SOLUTION=['Leonard','Sheldon','Molly','Amy','Penny','Raj'];
export const chairs=['A','B','C','D','E','F'] as const;
export const birthdayEvidence=[
 {id:'receipt',icon:'🧾',label:'Cake shop receipt',type:'FORENSICS',
  body:'Pickup 17:40. Strawberry-and-vanilla layer cake, pale blue box, little silver star on the ribbon.'},
 {id:'camera',icon:'📸',label:'Corridor camera still',type:'SCENE',
  body:'17:47. Jake enters the service corridor carrying a pale blue box with a silver star on its ribbon. He leaves empty-handed.'},
 {id:'sticky',icon:'🗒️',label:'Jake’s sticky note',type:'RECORD',
  body:'“Holt must NOT spot it. Filed as #99-B. Somewhere boring, controlled, and cool. I am a genius.”'},
 {id:'register',icon:'📋',label:'Storage register',type:'RECORD',
  body:'17:48 · #99-B · temporary transfer into the evidence room’s temperature-controlled cabinet. Signed: J. Peralta.'},
] as const;
export const BIRTHDAY_PAIRS=[
 {id:'receipt-camera',items:['receipt','camera'] as const,label:'The same cake box passed through the service corridor.'},
 {id:'sticky-register',items:['sticky','register'] as const,label:'Jake’s code matches the temperature-controlled storage log.'},
] as const;
export const cakeLocations=[
 {id:'kitchen',label:'Break-room fridge',icon:'🧁',detail:'Scully says there might be leftover yogurt.'},
 {id:'office',label:'Holt’s office',icon:'🗃️',detail:'A suspiciously tidy filing cabinet.'},
 {id:'evidence',label:'Evidence-room cold cabinet',icon:'🧊',detail:'Usually reserved for very serious things.'},
 {id:'rooftop',label:'Precinct rooftop',icon:'🌆',detail:'The party decorations were delivered up here.'},
] as const;
export const seatRules=[
 "Leonard sits immediately to Sheldon's left.",
 'Amy must be directly beside the birthday girl, Molly.',
 'Penny refuses to sit directly beside Sheldon during his cake lecture.',
 'Raj has claimed one of the two end chairs.',
 'Sheldon will not sit at either end of the table.',
 'Amy does not want the chair beside the entrance (chair B).'
] as const;
export const birthdayQuestions=[
 {id:'who' as const,category:'WHO?',icon:'👤',
  question:'Whose elaborately labelled present is behind this security system?',
  choices:['Howard','Sheldon','Stuart','Jake'],correct:'Sheldon',
  note:'Correct. He calls it “responsible gift distribution.” Everyone else calls it a lock.'},
 {id:'what' as const,category:'WHAT?',icon:'🎁',
  question:'What is safely sealed inside the birthday vault?',
  choices:['A secret surprise gift','The precinct’s missing case files','A broken elevator','A physics exam'],correct:'A secret surprise gift',
  note:'Exactly. Even Leonard does not know what Sheldon has done to the wrapping.'},
 {id:'when' as const,category:'WHEN?',icon:'📅',
  question:'Which date is written on the birthday invitation?',
  choices:['31 October','13 November','24 December','1 January'],correct:'13 November',
  note:'The day the whole arcade puts on its party hat.'},
] as const;
/** WHERE finale: optional, cumulative hints ordered from subtle to revealing.
 * Present the next hint only when the player actively requests it. */
export const birthdayWhereHints=[
 {id:'landscape',icon:'🌳',label:'Hint 1 · Geographical',
  text:'Look toward eastern India, where wooded hills, sal forests and old landscapes carry stories much older than ours.'},
 {id:'eight-letters',icon:'🗺️',label:'Hint 2 · Gentle',
  text:'Eight letters. Not a capital, not a bustling metropolis. A place that might seem ordinary on a map, but never to the person whose story it holds.'},
 {id:'kolhan',icon:'📜',label:'Hint 3 · Historical',
  text:'A town associated with the Kolhan region, not far from the forests of Saranda—the fabled land of seven hundred hills.'},
 {id:'chai',icon:'☕',label:'Hint 4 · Strong',
  text:'The place lies in Jharkhand. Its first four letters might remind you of something warm and comforting in an Indian teacup.'}
] as const;

export function initialBirthdaySave():BirthdaySave{
 return {version:1,step:0,connected:[],evidenceTries:0,cakeTries:0,
  seating:['','','Molly','','',''],seatingTries:0,answers:[],codeTries:0,openedAt:null};
}
export function birthdayStorageKey(beta:boolean,year=2026):string{
 return 'molly-birthday-'+(beta?'beta':'live')+'-'+year+'-v1';
}
export function normalizeBirthdaySave(value:unknown):BirthdaySave{
 const fallback=initialBirthdaySave();
 if(!value||typeof value!=='object')return fallback;
 const v=value as Partial<BirthdaySave>;
 if(v.version!==1||!Number.isInteger(v.step)||Number(v.step)<0||Number(v.step)>3)return fallback;
 const connected=Array.isArray(v.connected)?v.connected.filter(id=>BIRTHDAY_PAIRS.some(pair=>pair.id===id)):[];
 const answers=Array.isArray(v.answers)?v.answers.filter(id=>birthdayQuestions.some(q=>q.id===id)) as QuestionId[]:[];
 const seating=Array.isArray(v.seating)&&v.seating.length===6&&v.seating.every(x=>typeof x==='string')
  ?v.seating:['','','Molly','','',''];
 seating[2]='Molly';
 const safe=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)?Math.max(0,Math.floor(n)):0;
 const step=v.step as BirthdayStep;
 return {version:1,step,connected:[...new Set(connected)],evidenceTries:safe(v.evidenceTries),
  cakeTries:safe(v.cakeTries),seating,seatingTries:safe(v.seatingTries),
  answers:[...new Set(answers)],codeTries:safe(v.codeTries),openedAt:step===3&&typeof v.openedAt==='string'?v.openedAt:null};
}
export function readBirthdaySave(beta:boolean,year=2026):BirthdaySave{
 try{return normalizeBirthdaySave(JSON.parse(localStorage.getItem(birthdayStorageKey(beta,year))||'null'))}
 catch{return initialBirthdaySave()}
}
export function writeBirthdaySave(save:BirthdaySave,beta:boolean,year=2026){
 try{localStorage.setItem(birthdayStorageKey(beta,year),JSON.stringify(save))}catch{/* private browsing */}
}
export function pairForEvidence(a:string,b:string){
 return BIRTHDAY_PAIRS.find(pair=>pair.items.includes(a as never)&&pair.items.includes(b as never))??null;
}
export function submitEvidencePair(save:BirthdaySave,a:string,b:string):{save:BirthdaySave;message:string}{
 if(save.step!==0||a===b)return{save,message:'Select two different exhibits.'};
 const pair=pairForEvidence(a,b);
 if(!pair)return{save:{...save,evidenceTries:save.evidenceTries+1},message:'Not quite. Those reports do not corroborate the same detail. Compare the box or Jake’s code.'};
 if(save.connected.includes(pair.id))return{save,message:'That evidence connection is already on the board.'};
 return {save:{...save,connected:[...save.connected,pair.id]},message:'Connection established: '+pair.label};
}
export function submitCakeLocation(save:BirthdaySave,id:string):{save:BirthdaySave;correct:boolean;message:string}{
 if(save.step!==0||save.connected.length<2)return {save,correct:false,message:'Connect both pairs of exhibits first.'};
 if(id!=='evidence')return {save:{...save,cakeTries:save.cakeTries+1},correct:false,
  message:'Nothing there! Use both deductions: follow the box and the storage code.'};
 return {save:{...save,step:1},correct:true,
  message:'Case closed! Jake really did book a cake into evidence. Holt is going to have questions.'};
}
export function seatingIsValid(seating:readonly string[]):boolean{
 if(seating.length!==6||seating[2]!=='Molly')return false;
 if([...seating].sort().join('|')!==[...birthdayGuests].sort().join('|'))return false;
 const seat=(name:string)=>seating.indexOf(name);
 return seat('Leonard')+1===seat('Sheldon') &&
  Math.abs(seat('Amy')-2)===1 &&
  Math.abs(seat('Penny')-seat('Sheldon'))!==1 &&
  [0,5].includes(seat('Raj')) &&
  ![0,5].includes(seat('Sheldon')) &&
  seat('Amy')!==1;
}
export function allValidBirthdaySeatings():string[][]{
 const guests=['Sheldon','Leonard','Penny','Amy','Raj'];
 const out:string[][]=[];
 function fill(used:string[],remaining:string[]){
  if(!remaining.length){
   const arrangement=[used[0],used[1],'Molly',used[2],used[3],used[4]];
   if(seatingIsValid(arrangement))out.push(arrangement);
   return;
  }
  for(const person of remaining)fill([...used,person],remaining.filter(other=>other!==person));
 }
 fill([],guests);
 return out;
}
export function submitBirthdaySeating(save:BirthdaySave):{save:BirthdaySave;correct:boolean;message:string}{
 if(save.step!==1)return{save,correct:false,message:'The seating puzzle is locked.'};
 if(save.seating.some(seat=>!seat))return{save,correct:false,message:'Give each guest a chair before asking Sheldon to inspect.'};
 if(!seatingIsValid(save.seating))return{save:{...save,seatingTries:save.seatingTries+1},
  correct:false,message:'Sheldon has a correction. At least one condition is not met. Recheck adjacency, the end chairs and the entrance.'};
 return{save:{...save,step:2},correct:true,message:'All six conditions hold. Sheldon approves the arrangement—and finally accepts his cake.'};
}
export function answerBirthdayQuestion(save:BirthdaySave,id:QuestionId,answer:string):{save:BirthdaySave;correct:boolean;message:string}{
 if(save.step!==2)return{save,correct:false,message:'The final dossier is not unlocked yet.'};
 const question=birthdayQuestions.find(q=>q.id===id);
 if(!question||save.answers.includes(id))return{save,correct:false,message:'That note is already cleared.'};
 if(question.correct!==answer)return{save,correct:false,message:'Not quite. Check the invitation and the birthday story.'};
 return{save:{...save,answers:[...save.answers,id]},correct:true,message:question.note};
}
export function isBirthdayPassword(input:string):boolean{
 return input.normalize('NFKC').toLowerCase().replace(/[^a-z]/g,'')==='chaibasa';
}
export function unlockBirthdayVault(save:BirthdaySave,pass:string,now=new Date()):{save:BirthdaySave;correct:boolean;message:string}{
 if(save.step!==2||save.answers.length!==birthdayQuestions.length)return{save,correct:false,message:'Unlock the WHO, WHAT and WHEN notes first.'};
 if(!isBirthdayPassword(pass))return{save:{...save,codeTries:save.codeTries+1},correct:false,
  message:'That is not the place Sheldon sealed into the password. Think of Molly’s first chapter.'};
 return {save:{...save,step:3,openedAt:now.toISOString()},correct:true,message:'Password accepted. Happy Birthday, Molly!'};
}
