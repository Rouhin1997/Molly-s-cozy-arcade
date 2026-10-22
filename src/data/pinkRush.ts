/** Fan-made concert puzzles: original prose, factual song/release references
 * checked against official BLACKPINK discography, no reproduced lyrics/audio.
 * Difficulty is purposefully one welcoming-to-BLINK setting. */
import { pinkFanQuestions } from './pinkRushFan';
export type PinkMember='JISOO'|'JENNIE'|'ROSÉ'|'LISA';
export type PinkChallenge={
 id:string;kind:'track'|'era'|'spotlight'|'fan'|'encore'; category?:string; title:string;
 prompt:string;emoji:string;answer:string;options:string[];
 explanation:string;year:string;source:string;
};
const official='https://ygfamily.com/en/artists/blackpink/discography';
const solo='https://www.grammy.com/news/blackpink-solo-acts-jennie-jisoo-rose-lisa-single-album-born-pink-world-tour/';
const track=(id:string,year:string,title:string,emoji:string,prompt:string,answer:string,options:string[],explanation:string):PinkChallenge=>
 ({id:'track-'+id,kind:'track',title,emoji,prompt,answer,options,explanation,year,source:official});
const spotlight=(id:string,year:string,title:string,emoji:string,prompt:string,answer:PinkMember,explanation:string):PinkChallenge=>
 ({id:'spot-'+id,kind:'spotlight',title,emoji,prompt,answer,options:['JISOO','JENNIE','ROSÉ','LISA'],explanation,year,source:solo});
const era=(id:string,year:string,title:string,emoji:string,prompt:string,order:string[],explanation:string):PinkChallenge=>
 ({id:'era-'+id,kind:'era',title,emoji,prompt,answer:order.join('→'),options:[order[1],order[2],order[0]],explanation,year,source:official});

export const pinkTrackQuestions:PinkChallenge[]=[
 track('whistle','2016','A whistle starts it all','🎶','Debut-day memory: which SQUARE ONE song shares its name with the sound of a sharp little tune?','WHISTLE',['WHISTLE','STAY','JUMP','Shut Down'],'SQUARE ONE arrived in August 2016 with WHISTLE and BOOMBAYAH. The beginning of it all!'),
 track('boombayah','2016','Debut energy','🔥','2016! Which explosive debut track shares SQUARE ONE with WHISTLE?','BOOMBAYAH',['BOOMBAYAH','Pink Venom','Lovesick Girls','GO'],'BOOMBAYAH and WHISTLE were the two SQUARE ONE debut tracks on August 8, 2016.'),
 track('fire','2016','Autumn flames','🔥','Which 2016 SQUARE TWO title sounds like something you absolutely should not do indoors?','PLAYING WITH FIRE',['PLAYING WITH FIRE','Ice Cream','Shut Down','JUMP'],'PLAYING WITH FIRE and STAY arrived together on SQUARE TWO in November 2016.'),
 track('stay','2016','The gentle moment','🌙','Between the fireworks, which softer one-word single shared the SQUARE TWO release?','STAY',['STAY','JUMP','WHISTLE','GO'],'STAY was paired with PLAYING WITH FIRE on SQUARE TWO.'),
 track('last','2017','One more song','💞','Which bright standalone 2017 single sounds like a promise to make the moment count?',"AS IF IT'S YOUR LAST",["AS IF IT'S YOUR LAST",'STAY','Forever Young','Ready For Love'],'AS IF IT’S YOUR LAST arrived in June 2017, before the SQUARE UP era.'),
 track('ddu','2018','Four unforgettable syllables','💥','Which 2018 SQUARE UP title is almost a drum sound written out?','DDU-DU DDU-DU',['DDU-DU DDU-DU','BOOMBAYAH','JUMP','WHISTLE'],'DDU-DU DDU-DU is a signature 2018 SQUARE UP track.'),
 track('forever','2018','Summer, forever','🌅','Which SQUARE UP track sounds like a wish that the best summers might never end?','Forever Young',['Forever Young','The Happiest Girl','STAY','Champion'],'Forever Young sits alongside DDU-DU DDU-DU on the 2018 mini album SQUARE UP.'),
 track('kill','2019','Heartbreak with a fanfare','🎺','Which 2019 title is also the name of BLACKPINK’s second mini album?','Kill This Love',['Kill This Love','Lovesick Girls','Pink Venom','GO'],'KILL THIS LOVE became the title of BLACKPINK’s April 2019 mini album.'),
 track('hylt','2020','The triumphant return','👑','Which 2020 pre-release single almost sounds like a confident comeback question?','How You Like That',['How You Like That','Typa Girl','WHISTLE','JUMP'],'How You Like That preceded THE ALBUM in June 2020.'),
 track('ice','2020','Summer sweetness','🍦','2020 brought a collaboration with Selena Gomez. Which sweet treat gives the song its title?','Ice Cream',['Ice Cream','Pink Venom','Stay','GO'],'Ice Cream with Selena Gomez arrived in August 2020 ahead of THE ALBUM.'),
 track('lovesick','2020','A bittersweet anthem','💌','Which THE ALBUM title describes a group of romantics with some serious feelings?','Lovesick Girls',['Lovesick Girls','The Happiest Girl','Playing With Fire','Shut Down'],'Lovesick Girls is on BLACKPINK’s first full studio record, THE ALBUM, from October 2020.'),
 track('pretty','2020','Confident, obviously','💅','Complete this fan-favourite title from THE ALBUM: Pretty _____.','Pretty Savage',['Pretty Savage','Pink Venom','Typa Girl','Forever Young'],'Pretty Savage was part of THE ALBUM era.'),
 track('venom','2022','A taste of pink','🐍','Which 2022 BORN PINK pre-release single pairs a colour with something poisonous?','Pink Venom',['Pink Venom','Kill This Love','BOOMBAYAH','GO'],'Pink Venom arrived in August 2022 ahead of BORN PINK in September.'),
 track('shutdown','2022','A dramatic arrival','🎻','Which BORN PINK title uses a classical music sample and suggests the show is taking over?','Shut Down',['Shut Down','STAY','JUMP','WHISTLE'],'Shut Down is on BORN PINK, released in September 2022.'),
 track('typa','2022','An attitude','🕶️','Which BORN PINK track ends its title with the word “Girl”?','Typa Girl',['Typa Girl','Lovesick Girls','The Happiest Girl','Forever Young'],'Typa Girl is one of the songs on BORN PINK.'),
 track('ready','2022','Almost time to play','🎮','Which BORN PINK track has a title that sounds like a question about readiness?','Ready For Love',['Ready For Love','How You Like That','STAY','Kill This Love'],'Ready For Love is part of BORN PINK’s track list.'),
 track('jump','2025','The return jump','⚡','Which 2025 digital single marked BLACKPINK’s hardstyle-flavoured group return?','JUMP',['JUMP','GO','Shut Down','BOOMBAYAH'],'JUMP was released on July 11, 2025 and later appeared on DEADLINE.'),
 track('go','2026','No stopping now','🚀','Which short, two-letter track shares BLACKPINK’s 2026 DEADLINE mini album with JUMP?','GO',['GO','STAY','WHISTLE','JUMP'],'GO is one of five tracks listed for DEADLINE, released February 27, 2026.'),
 track('champion','2026','Victory lap','🏆','Which triumphant DEADLINE track title sounds like a winner being crowned?','Champion',['Champion','Forever Young','Ready For Love','Typa Girl'],'Champion is on the 2026 DEADLINE mini album.'),
 track('me','2026','In my era','✨','One track from DEADLINE is written exactly as a short phrase starting with “Me”. Which one?','Me and my',['Me and my','You Never Know','Love To Hate Me','Stay'],'Me and my is a track on DEADLINE, BLACKPINK’s 2026 mini album.'),
];
export const pinkEraQuestions:PinkChallenge[]=[
 era('debut-to-stage','2016–2018','From the beginning','📼','Tap these three releases in the order they first appeared:', ['SQUARE ONE','AS IF IT’S YOUR LAST','SQUARE UP'],'SQUARE ONE (2016) → AS IF IT’S YOUR LAST (2017) → SQUARE UP (2018).'),
 era('midyears','2018–2020','A growing discography','💿','Which of these eras came first, second and third?',['SQUARE UP','KILL THIS LOVE','THE ALBUM'],'SQUARE UP (2018) → KILL THIS LOVE (2019) → THE ALBUM (2020).'),
 era('albums','2019–2022','First full album memories','🎧','Rewind through these three iconic album releases:',['KILL THIS LOVE','THE ALBUM','BORN PINK'],'KILL THIS LOVE (2019) → THE ALBUM (2020) → BORN PINK (2022).'),
 era('singles','2017–2020','The single timeline','💖','Put these singles into their release order:',['AS IF IT’S YOUR LAST','How You Like That','Ice Cream'],'AS IF IT’S YOUR LAST (2017) → How You Like That (June 2020) → Ice Cream (August 2020).'),
 era('pinkfuture','2022–2026','From pink to the future','🌟','Place these BLACKPINK eras in the order BLINKs experienced them:',['BORN PINK','JUMP','DEADLINE'],'BORN PINK (2022) → JUMP (2025) → DEADLINE (2026).'),
 era('debut-three','2016–2017','A first-year scrapbook','📷','Step through the earliest three releases:',['SQUARE ONE','SQUARE TWO','AS IF IT’S YOUR LAST'],'SQUARE ONE (August 2016) → SQUARE TWO (November 2016) → AS IF IT’S YOUR LAST (June 2017).'),
 era('pink-venom','2020–2022','A pink comeback','🩷','Put the full album and two later releases in chronological order:',['THE ALBUM','Pink Venom','BORN PINK'],'THE ALBUM (2020) → Pink Venom (August 2022) → BORN PINK (September 2022).'),
 era('girlgroup','2016–2019','Early-years time capsule','🎀','Start with the debut and end in 2019:',['SQUARE TWO','SQUARE UP','KILL THIS LOVE'],'SQUARE TWO (2016) → SQUARE UP (2018) → KILL THIS LOVE (2019).'),
];
export const pinkSpotQuestions:PinkChallenge[]=[
 spotlight('flower','2023','A blooming solo','🌸','Which member released the solo single FLOWER in 2023?','JISOO','JISOO’s FLOWER became one of the defining solo moments of 2023.'),
 spotlight('solo','2018','The original SOLO','💎','Which member’s 2018 solo debut was literally titled SOLO?','JENNIE','JENNIE began her own solo chapter with SOLO in 2018.'),
 spotlight('ground','2021','On the Ground','🌎','Which member debuted solo with On The Ground in 2021?','ROSÉ','ROSÉ released On The Ground as part of her first solo single album R in 2021.'),
 spotlight('lalisa','2021','Her own name','⭐','Which member used her own name as a 2021 solo single title?','LISA','LISA released LALISA as part of her first solo era.'),
 spotlight('apt','2024','Apartment memories','🏠','Which member teamed up with Bruno Mars for APT. in 2024?','ROSÉ','ROSÉ and Bruno Mars made APT. an unforgettable 2024 pop moment.'),
 spotlight('rockstar','2024','Born a rockstar','🎸','Which member released ROCKSTAR in 2024?','LISA','LISA released ROCKSTAR in 2024.'),
 spotlight('mantra','2024','A personal mantra','💫','Which member released Mantra in 2024?','JENNIE','JENNIE’s Mantra was released in October 2024.'),
 spotlight('amortage','2025','Love, in chapters','💗','Which member’s 2025 project was titled AMORTAGE?','JISOO','JISOO released AMORTAGE in February 2025, including earthquake.'),
 spotlight('ruby','2025','A red jewel of an album','❤️','Which member’s 2025 solo album is called Ruby?','JENNIE','JENNIE’s Ruby marked a major 2025 solo album chapter.'),
 spotlight('alterego','2025','Different sides of herself','🪞','Which member released the 2025 solo album Alter Ego?','LISA','LISA released Alter Ego in February 2025.'),
 spotlight('rosie','2024','Her own name, a new album','🌹','Which member’s 2024 studio album was titled rosie?','ROSÉ','ROSÉ released rosie in December 2024.'),
 spotlight('earthquake','2025','Heartquake','💓','Which member released earthquake as part of AMORTAGE?','JISOO','JISOO’s earthquake is from AMORTAGE (2025).'),
];
export const pinkEncouragements=[
 'That one takes me straight back. Another light on the stage! 🩷',
 'Exactly! That era deserves its own spotlight. ✨',
 'A BLINK memory unlocked. The crowd is getting louder! 🎶',
 'Yes! The show is coming together beautifully. 💖',
 'Perfect! Molly is running this comeback like a pro. 🌟',
];
export const pinkEncoreColors=[
 {id:'rose',name:'Rose pink',color:'#e995c6',symbol:'🩷'},
 {id:'gold',name:'Golden glow',color:'#eac17a',symbol:'✨'},
 {id:'violet',name:'Violet beam',color:'#ae97e9',symbol:'💜'},
 {id:'blue',name:'Midnight blue',color:'#89cbe5',symbol:'💠'},
] as const;
export const pinkEncoreVariants=[
 [0,2,1,3],[1,0,3,2,1],[2,2,0,1,3],[3,1,0,2,0,3],
 [0,3,2,1,2],[1,2,3,0,1],[3,0,1,3,2],[2,1,0,3,0],
] as const;
export const pinkQuestionPool=[...pinkTrackQuestions,...pinkEraQuestions,...pinkSpotQuestions,...pinkFanQuestions];
export {pinkFanQuestions};
export function pinkQuestionById(id:string):PinkChallenge|undefined{
 return pinkQuestionPool.find(q=>q.id===id);
}
function hashSeed(text:string){
 let hash=2166136261;
 for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
 return hash>>>0;
}
function pickFromPool(pool:PinkChallenge[],count:number,seed:string):string[]{
 const offset=hashSeed(seed)%pool.length;
 // Prime stride; ensures there is no repetition within each show.
 const stride=pool.length===20?7:pool.length===12?5:pool.length===30?7:3;
 return Array.from({length:count},(_,i)=>pool[(offset+stride*i)%pool.length].id);
}
export function pinkSetlist(seed:string):string[]{
 const tracks=pickFromPool(pinkTrackQuestions,2,'tracks:'+seed);
 const eras=pickFromPool(pinkEraQuestions,1,'eras:'+seed);
 const members=pickFromPool(pinkSpotQuestions,3,'spot:'+seed);
 const culture=pickFromPool(pinkFanQuestions,5,'culture:'+seed);
 const encore=hashSeed('encore:'+seed)%pinkEncoreVariants.length;
 // Twelve acts, not an ordinary album quiz: the fan-life rounds are dominant.
 return [culture[0],tracks[0],members[0],culture[1],eras[0],culture[2],
   members[1],culture[3],tracks[1],members[2],culture[4],'encore-'+encore];
}
export function pinkChallengeFor(id:string):PinkChallenge{
 if(id.startsWith('encore-')){
  const variant=Number(id.slice('encore-'.length));
  if(!Number.isInteger(variant)||!pinkEncoreVariants[variant])throw Error('Invalid encore variant');
  return {id,kind:'encore',title:'The final lightstick encore',emoji:'🪄',
   prompt:'Watch the original light pattern, then repeat it with the four stage lights. Replay as many times as you like!',answer:pinkEncoreVariants[variant].join('-'),options:[],
   explanation:'Four beams, one brilliant encore! You made the stage glow for Molly.',year:'Tonight',source:official};
 }
 const c=pinkQuestionById(id);
 if(!c)throw Error('Unknown Pink Rush challenge '+id);
 return c;
}
export function pinkQuestionIssues():string[]{
 const issues:string[]=[];
 const ids=pinkQuestionPool.map(q=>q.id);
 if(new Set(ids).size!==ids.length)issues.push('duplicate question ids');
 if(pinkTrackQuestions.length<18||pinkEraQuestions.length<7||pinkSpotQuestions.length<12||pinkFanQuestions.length<25)issues.push('insufficient BLINK variety');
 for(const c of pinkQuestionPool){
  if(c.options.length<3||new Set(c.options).size!==c.options.length)issues.push(c.id+': invalid options');
  if(c.kind!=='era'&&!c.options.includes(c.answer))issues.push(c.id+': answer not in choices');
  if(c.kind==='era'&&c.answer.split('→').length!==3)issues.push(c.id+': bad ordering solution');
  if(c.explanation.length<30||!c.source.startsWith('https://'))issues.push(c.id+': insufficient context');
 }
 for(const seed of ['2026-10-22','show-3','practice-100']){
  const plan=pinkSetlist(seed);
  if(plan.length!==12||new Set(plan).size!==12)issues.push(seed+': duplicate show items');
  if(plan.filter(id=>id.startsWith('track-')).length!==2||plan.filter(id=>id.startsWith('era-')).length!==1||
     plan.filter(id=>id.startsWith('spot-')).length!==3||plan.filter(id=>id.startsWith('fan-')).length!==5||
     !plan[11].startsWith('encore-'))issues.push(seed+': missing fan-festival act');
 }
 return issues;
}
