/** The Wisps' Trail — world bible data for Module 01.
 * Locations are intentionally storybook interpretations, not claims of exact
 * screen-accurate floor plans. Gameplay and unlocks arrive in later modules. */
export type BraveChapter={
 id:string;roman:string;name:string;subtitle:string;location:string;
 mood:string;icon:string;palette:string;levelTitles:[string,string,string];
 mapX:number;mapY:number;scene:string;merida:string;wisp:string;
 environment:string[];
};
export const braveChapters:BraveChapter[]=[
 {id:'highland',roman:'I',name:'The Highland Games',subtitle:'The first arrow',location:'Castle DunBroch',
 mood:'A golden morning above the heather.',icon:'🏹',palette:'#c98749',mapX:20,mapY:28,
 levelTitles:['The Courtyard Trial','Angus’s Shortcut','The Archer’s Choice'],
 scene:'Sunlight spills over the old stones. A royal banner catches the wind. Somewhere beyond the courtyard, Angus stamps an impatient hoof. One little blue wisp flickers across the practice field.',
 merida:'“That’s odd. Wisps this close to the castle? I’d best find out what has them so excited.”',
 wisp:'A small light hovers near your shoulder. The hills are calling, Keeper.',
 environment:['DunBroch stonework','archery yard','rolling meadow','Angus’s paddock']},
 {id:'forest',roman:'II',name:'Follow the Wisps',subtitle:'The hidden path',location:'The Whispering Wood',
 mood:'Cold mist, moss, and little blue lights.',icon:'🩵',palette:'#77c9c9',mapX:43,mapY:42,
 levelTitles:['The First Light','The Whispering Stones','The Hidden Clearing'],
 scene:'The trees close in around the winding trail. Glowing wisps drift between ancient standing stones. The clearing at the heart of the forest seems to move each time you look away.',
 merida:'“They’re leading us somewhere. I just hope they know where they’re going.”',
 wisp:'Only the true path answers when the stones are awake.',
 environment:['standing stones','wisp bridges','mossy paths','hidden clearings']},
 {id:'witch',roman:'III',name:'The Witch’s Workshop',subtitle:'A curious bargain',location:'The Carver’s Cottage',
 mood:'Candlelight and the smell of wood shavings.',icon:'🪄',palette:'#e0b77e',mapX:66,mapY:26,
 levelTitles:['A Curious Bargain','The Rune Sequence','The Witch’s Secret'],
 scene:'Bear carvings peer down from crowded shelves. A cauldron steams quietly. The Witch is nowhere to be seen—though something behind the pantry door just sneezed.',
 merida:'“Best keep our wits about us. Last time I trusted a mysterious bargain…”',
 wisp:'A rune glows beneath the dust. Not every secret needs a spell.',
 environment:['carved bears','rune locks','wandering objects','potions and candlelight']},
 {id:'castle',roman:'IV',name:'A Bear in the Castle',subtitle:'A midnight misadventure',location:'DunBroch’s Hidden Halls',
 mood:'Warm hearths, whispered mischief and moonlit passages.',icon:'🐻',palette:'#b1a1d7',mapX:16,mapY:69,
 levelTitles:['The Midnight Escape','Triple Trouble','The Secret Passage'],
 scene:'The halls have quieted, but the triplets are clearly planning trouble. A guard patrols the gallery. A forgotten passage opens behind an old tapestry.',
 merida:'“Those three are up to something. Again. Keep your eyes on the passages.”',
 wisp:'There is a way through without waking a soul.',
 environment:['castle corridors','predictable patrols','secret passages','triplet distractions']},
 {id:'shadow',roman:'V',name:'Mor’du’s Shadow',subtitle:'The broken circle',location:'The Forgotten Stones',
 mood:'Storm clouds, ancient ruins and a distant growl.',icon:'🌑',palette:'#829b9d',mapX:58,mapY:76,
 levelTitles:['Tracks in the Mist','The Broken Circle','Shadow of the Bear'],
 scene:'An old stone circle lies broken. Fresh claw marks scar the earth. Far beyond the ridge, the wind carries an echo that sounds far too much like a growl.',
 merida:'“Courage isn’t the same as charging blindly ahead. We’ll need a clever route.”',
 wisp:'Even in the dark, a single light can show the next step.',
 environment:['ruined circles','moving shadows','broken bridges','storm-swept moor']},
 {id:'bond',roman:'VI',name:'Mend the Bond',subtitle:'The last wisp',location:'The Heart of the Highlands',
 mood:'Dawn after a long night. Threads of magic in the air.',icon:'🧵',palette:'#e2c98b',mapX:83,mapY:65,
 levelTitles:['The Last Wisp','Threads of Fate','A Brave Heart'],
 scene:'The forest falls quiet. The wisps gather around a loom woven from living branches. At its center rests an unfinished tapestry—waiting for its threads to meet again.',
 merida:'“Maybe a path isn’t only about where it takes us. Maybe it’s about who we choose to walk beside.”',
 wisp:'Six journeys, one promise. The story is ready to be mended.',
 environment:['dawn clearing','wisp loom','embroidered patterns','restored pathways']},
];
export type BraveIntroChoice='listen'|'follow';
export type BravePreviewSave={
 version:1;prologueSeen:boolean;vow?:BraveIntroChoice;inspected:string[];soundEnabled:boolean;
};
export const BRAVE_SAVE_KEY='mollys-brave-wisps-v1';
export function freshBraveSave():BravePreviewSave{
 return {version:1,prologueSeen:false,inspected:[],soundEnabled:false};
}
export function normalizeBraveSave(input:unknown):BravePreviewSave{
 if(!input||typeof input!=='object')return freshBraveSave();
 const p=input as Partial<BravePreviewSave>;
 if(p.version!==1)return freshBraveSave();
 return {version:1,prologueSeen:p.prologueSeen===true,
   vow:p.vow==='listen'||p.vow==='follow'?p.vow:undefined,
   inspected:Array.isArray(p.inspected)?[...new Set(p.inspected.filter(id=>braveChapters.some(c=>c.id===id)))]:[],
   soundEnabled:p.soundEnabled===true};
}
export function readBraveSave():BravePreviewSave{
 try{return normalizeBraveSave(JSON.parse(localStorage.getItem(BRAVE_SAVE_KEY)??'null'))}
 catch{return freshBraveSave()}
}
export function writeBraveSave(save:BravePreviewSave):void{
 try{localStorage.setItem(BRAVE_SAVE_KEY,JSON.stringify(save))}catch{/* preview remains usable */}
}
export function braveWorldIssues():string[]{
 const issues:string[]=[];
 if(braveChapters.length!==6)issues.push('Expected six chapter locations');
 if(braveChapters.flatMap(c=>c.levelTitles).length!==18)issues.push('Expected eighteen planned levels');
 const ids=braveChapters.map(c=>c.id);
 if(new Set(ids).size!==ids.length)issues.push('Duplicate chapter ids');
 const titles=braveChapters.flatMap(c=>c.levelTitles);
 if(new Set(titles).size!==titles.length)issues.push('Duplicate level titles');
 for(const c of braveChapters){
  if(c.mapX<5||c.mapX>95||c.mapY<8||c.mapY>90)issues.push(c.id+': marker outside safe map');
  if(c.scene.length<100||c.environment.length<3)issues.push(c.id+': thin art bible');
 }
 return issues;
}
