/** Brave: the first three connected story chapters.
 * Every scene is original writing. Later chapters remain a story atlas, not fake playable content.
 */
import type {BraveLevel} from '../lib/bravePuzzle';
import {braveFinaleStages} from '../lib/braveFinaleCampaign';

export type BraveChapterId='highland'|'forest'|'witch'|'castle'|'shadow'|'bond';
export type BraveStageKind='route'|'archery'|'runes'|'stealth'|'circle'|'tapestry';
export type BraveStage={
 id:string;chapterId:BraveChapterId;index:number;title:string;kind:BraveStageKind;
 scene:string;merida:string;molly:string;ending:string;hint:string;
 route?:BraveLevel;
};
export const braveChapterBridges:Record<BraveChapterId,{opening:string;closing:string;next:string}>={
 highland:{
  opening:'The courtyard bells ring across DunBroch, but one small blue light refuses to follow the music. Molly feels it tug gently at the promise she made.',
  closing:'Angus stops at the forest edge. He will not take another step. Merida sees three blue lights arranging themselves like an arrow among the trees. “I think we have been invited,” she says, a little less certain than she sounds.',
  next:'Beyond the last sun-warmed wall, the Whispering Wood drinks the afternoon light.'
 },
 forest:{
  opening:'Mist gathers on the heather. Here even ordinary footsteps sound borrowed, and the standing stones seem to listen when Molly speaks.',
  closing:'At the clearing, three lights become one. They hover above a carving of a small bear holding a spindle. Merida recognizes the work. “Oh, no,” she says. “I know exactly whose cottage that is.”',
  next:'The cottage door opens before anyone knocks. Somewhere inside, something sneezes.'
 },
 witch:{
  opening:'The Carver’s Cottage smells of pine shavings, tea and trouble. Wooden bears watch from every shelf. A note waits beside an unfinished spool of golden thread.',
  closing:'The spindle turns once, all by itself. On the table a new stitch appears: the outline of DunBroch’s west tower. Merida looks back toward home. “The wisps were not leading us away,” she whispers. “They were trying to bring us back before something happened.”',
  next:'The next page waits in the moonlit halls of DunBroch.'
 },
 castle:{
  opening:'DunBroch is quiet beneath the moon, but a golden thread glows on the old west stair. The triplets are awake. Naturally.',
  closing:'Queen Elinor smooths the broken tapestry. “These threads were meant to keep our roads together,” she says. “Something has twisted them toward an old, terrible story.” She points across the moor.',
  next:'Beyond the castle walls, thunder rolls over the Forgotten Stones.'
 },
 shadow:{
  opening:'Clouds gather where the Highlands remember Mor’du. A shadow is not a resurrection, but the past can still teach a dangerous lesson.',
  closing:'A small untouched fragment survives beneath the stones. Merida wraps it beside the golden spindle. The last wisp leads away from the storm, toward an oak at the heart of the Highlands.',
  next:'The sky begins to brighten. The living loom waits beneath a tree of ancient roots.'
 },
 bond:{
  opening:'Dawn reaches the Heart of the Highlands. Queen Elinor’s teaching and Merida’s courage finally belong to the same story.',
  closing:'The old thread is mended, but not to constrain a single road. Paths now meet because people choose them. Molly has given the Highlands back their freedom.',
  next:'The last wisp settles near Molly. The adventure is complete, but the storybook can always be opened again.'
 }
};
const route=(id:string,title:string,rows:string[]):BraveLevel=>({id,title,rows});
const braveOpeningStages:readonly BraveStage[]=[
 {
 id:'courtyard',chapterId:'highland',index:0,title:'The Courtyard Trial',kind:'route',
 scene:'A blue wisp slips between the archery banners as the clan cheers for the morning games. It is heading straight toward a little-used passage in the courtyard wall.',
 merida:'“That wee light is going to get us both in trouble. Come on, Molly—let us see where it thinks it is going.”',
 molly:'The light pauses whenever you stop. It is not running away. It is waiting.',
 ending:'The wisp waits beneath the wall arch, then turns to face you. For a heartbeat, you think it bows.',
 hint:'Find the wisp and walk to the golden exit. No gate or switch is needed here.',
 route:route('courtyard','The Courtyard Trial',[
 '#########','#S...#E##','#.##...##','#...W..##','#.#...###','#.....###','#########'])
 },
 {
 id:'angus',chapterId:'highland',index:1,title:'Angus’s Shortcut',kind:'route',
 scene:'Angus paws at the meadow gate. The latch is covered in ivy, and an ancient marker stone lies beside the path. The wisp seems to know both.',
 merida:'“Angus knows these hills better than any royal map. That gate must have a story of its own.”',
 molly:'The wisp settles on the old marker stone. Under the moss, an inscription wakes.',
 ending:'The meadow gate swings aside with a sigh of old wood. Angus snorts triumphantly, as though he had opened it himself.',
 hint:'The ivy hides a longer trail than Angus expected. Trace the paths carefully; the rune answers the wisp.',
 route:route('angus','Angus’s Shortcut',[
 '###########',
 '#S#....W..#',
 '#.#####.#.#',
 '#.....#.#A#',
 '#####.###.#',
 '#...#.....#',
 '#G#.#####.#',
 '#E#.......#',
 '###########'])
 },
 {
 id:'archer',chapterId:'highland',index:2,title:'The Archer’s Choice',kind:'archery',
 scene:'A gust catches a ribbon tied to three distant targets. Merida raises her bow, but the wisp whispers that the arrows must fly in the right wind.',
 merida:'“The bow is steady. The wind is not. Tell me when the shot feels true, Keeper.”',
 molly:'One target close, one beyond the stream, and one beneath the red banner. The wind changes between shots.',
 ending:'The third arrow strikes home. The ribbon falls across a hidden forest trail; the wisp brightens as if laughing. Angus lowers his head and follows.',
 hint:'Aim opposite the crosswind. A near target needs a gentle draw; a far target needs a strong one.'
 },
 {
 id:'first-light',chapterId:'forest',index:3,title:'The First Light',kind:'route',
 scene:'Branches meet overhead. What had been one cheerful light becomes a thread of blue sparks, slipping between roots and stones like a path only Molly can see.',
 merida:'“There you are. I was beginning to think the forest had swallowed you whole.”',
 molly:'The lights gather around a standing stone. It must wake before the path ahead will open.',
 ending:'The first stone answers with a low, bell-like note. Farther in the trees, something answers back.',
 hint:'Some forest paths circle back on themselves. The sleeping gate will answer once the rune is awake.',
 route:route('first-light','The First Light',[
 '#############',
 '#S..#.GE#...#',
 '###.#.###.#.#',
 '#.#.#..A..#.#',
 '#.#.#######.#',
 '#.#.#.....#.#',
 '#.#.#.###.#.#',
 '#.....#W....#',
 '#############'])
 },
 {
 id:'stones',chapterId:'forest',index:4,title:'The Whispering Stones',kind:'route',
 scene:'Stone faces emerge from the mist. One is broken, one leans, and a third is bound in pale moss. The wind hums through their gaps like a half-remembered lullaby.',
 merida:'“Careful. A wrong turn is not dangerous here—but it may lead us in a circle until supper.”',
 molly:'The standing stone at the far edge waits for a borrowed blue flame. The gate beside it is still asleep.',
 ending:'The broken circle shines briefly, and a little picture appears in the air: a carved bear, and a golden thread caught on its paw.',
 hint:'Two blue lights wander among these stones. Both must be gathered before the way feels complete.',
 route:route('stones','The Whispering Stones',[
 '#############',
 '#S#W....#...#',
 '#.###.#.#G#.#',
 '#...#.#.#E#.#',
 '###.#.#.###W#',
 '#.#.#.#A....#',
 '#.#.#.#######',
 '#.#.#.......#',
 '#.#.#######.#',
 '#...........#',
 '#############'])
 },
 {
 id:'clearing',chapterId:'forest',index:5,title:'The Hidden Clearing',kind:'route',
 scene:'A tiny circle of sunlight lies in the darkest part of the wood. Every path seems to turn away from it—until the wisps gather in a bright line through the ferns.',
 merida:'“I have followed an arrow into stranger places. But I have never followed a promise before.”',
 molly:'Someone has left a spindle carved from pale wood at the edge of the clearing. The last wisp circles it twice.',
 ending:'The spindle fits perfectly into an empty notch in a weathered tree. A track appears, leading toward a cottage with a crooked chimney.',
 hint:'The golden key unlocks the cottage trail. Listen for both wisps before searching for the stone.',
 route:route('clearing','The Hidden Clearing',[
 '###############',
 '#S#D...W...A..#',
 '#.#G#####.#.###',
 '#.#E#...#W#...#',
 '#.###.#.#####.#',
 '#...#.#.....#K#',
 '###.#.#####.#.#',
 '#.#.#...#...#.#',
 '#.#.###.#.###.#',
 '#.......#.....#',
 '###############'])
 },
 {
 id:'bargain',chapterId:'witch',index:6,title:'A Curious Bargain',kind:'route',
 scene:'A handwritten note hangs on the cottage door: ONE SPOOL FOR ONE GOOD TURN. Inside, a glowing thread rolls under the shelves, just beyond a rune-locked cupboard.',
 merida:'“I know that handwriting. If we touch anything, it will probably turn into a bear.”',
 molly:'The note folds itself into a tiny paper bird and points toward the wisp beside the fire.',
 ending:'The cupboard opens—not with a crash, but with a polite little cough. Inside rests a spindle wound with gold.',
 hint:'Two stones guard the Witch’s enchanted cupboard. The key and the wisps are hidden among the winding shelves.',
 route:route('bargain','A Curious Bargain',[
 '#################',
 '#S..#.......DHGE#',
 '###.#A#.###.#####',
 '#...#.#...#W#...#',
 '#.#####.#.###.#.#',
 '#.....#A#.....#.#',
 '#####.#######.#.#',
 '#...#.#.....#W#.#',
 '###.#.#.###.###.#',
 '#...#.#.#.#.#...#',
 '#.###.#.#.#.#.#.#',
 '#.......#.....#K#',
 '#################'])
 },
 {
 id:'runes',chapterId:'witch',index:7,title:'The Rune Sequence',kind:'runes',
 scene:'Four enchanted wooden carvings turn toward Molly. A fifth bear carving smiles mischievously. The Witch has left a riddle: ROOT BEFORE CURRENT; LIGHT BEFORE WARMTH. THE STREAM COMES AFTER THE TREE, AND BEFORE THE GUIDING STAR.',
 merida:'“She always hides the answer in the telling. Start where the old oak stood; the rest is a journey, not a guess.”',
 molly:'A carved river curves beneath the other signs. Which four marks tell our journey—and in what order?',
 ending:'The oak roots, the river flows, the wisp shines and the hearth glows. The four carvings bow. The spindle begins to spin a golden thread toward the back room.',
 hint:'Read the inscription carefully: the stream must come after the tree, and the guiding light comes before home.'
 },
 {
 id:'secret',chapterId:'witch',index:8,title:'The Witch’s Secret',kind:'route',
 scene:'The back room seems much larger than the cottage. A winding trail of carved bears leads to a sealed door, and on the floor a golden thread trembles in a sudden draught.',
 merida:'“The Witch does love a puzzle. Molly, whatever happens, do not make a bargain with a talking broom.”',
 molly:'The wisp carries the golden thread like a lantern. One last standing stone waits beneath the door.',
 ending:'The door swings open onto a moonlit painting of DunBroch. A thread in the painting glows at the west tower. Merida grows quiet. “We need to get home.”',
 hint:'The final door has several locks. Gather both lights, wake both stones, and seek the golden key.',
 route:route('secret','The Witch’s Secret',[
 '###################',
 '#S....#A...K#.....#',
 '#####.#.###.#.###.#',
 '#...#.#.#W#.#...#.#',
 '###.#.#.#.#.###.#.#',
 '#...#.#A#.#.....#.#',
 '#.#.#.#.#.#####.#.#',
 '#.#.#.#...#...#W#.#',
 '#.###.###D#.#.#.#.#',
 '#.#...#EGH#.#.#.#.#',
 '#.#.#######.#.###.#',
 '#...........#.....#',
 '###################'])
 }
];
export const braveCampaignStages:readonly BraveStage[]=[
 ...braveOpeningStages,
 ...braveFinaleStages
];

export const braveArcheryTargets=[
 {name:'The Near Ribbon',wind:1,crosswind:4,distance:42,height:3.2,range:'near' as const,description:'The red ribbon snaps east above the near target.'},
 {name:'The Far Pennant',wind:-1,crosswind:-6,distance:68,height:4.2,range:'far' as const,description:'The blue pennant streams west across the long clearing.'},
 {name:'The Last Feather',wind:0,crosswind:4,distance:75,height:7.8,range:'far' as const,description:'High on the wooden frame, a feather twists in an easterly crosswind.'}
];
export const braveRuneOrder=['oak','river','light','hearth'] as const;
export const braveRuneOptions=[
 {id:'hearth',symbol:'♨',label:'Hearth'},
 {id:'light',symbol:'✧',label:'Wisp-light'},
 {id:'oak',symbol:'❧',label:'Oak'},
 {id:'river',symbol:'≈',label:'River'},
 {id:'bear',symbol:'♧',label:'Carved Bear'}
] as const;
