/** Brave: the first three connected story chapters.
 * Every scene is original writing. Later chapters remain a story atlas, not fake playable content.
 */
import type {BraveLevel} from '../lib/bravePuzzle';

export type BraveChapterId='highland'|'forest'|'witch';
export type BraveStageKind='route'|'archery'|'runes';
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
 }
};
const route=(id:string,title:string,rows:string[]):BraveLevel=>({id,title,rows});
export const braveCampaignStages:readonly BraveStage[]=[
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
 hint:'Take the wisp to the rune stone, then pass through the glowing gate.',
 route:route('angus','Angus’s Shortcut',[
 '###########','#S..#....E#','#.#.#####G#','#.#...#...#','#.#####.#.#','#..W...A..#','###########'])
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
 hint:'Follow the wisp before touching the stone. The old gateway cannot open while the stone sleeps.',
 route:route('first-light','The First Light',[
 '###########','#S.#.....E#','#..#.####G#','##...#....#','#..###.##.#','#..W....A.#','###########'])
 },
 {
 id:'stones',chapterId:'forest',index:4,title:'The Whispering Stones',kind:'route',
 scene:'Stone faces emerge from the mist. One is broken, one leans, and a third is bound in pale moss. The wind hums through their gaps like a half-remembered lullaby.',
 merida:'“Careful. A wrong turn is not dangerous here—but it may lead us in a circle until supper.”',
 molly:'The standing stone at the far edge waits for a borrowed blue flame. The gate beside it is still asleep.',
 ending:'The broken circle shines briefly, and a little picture appears in the air: a carved bear, and a golden thread caught on its paw.',
 hint:'Take the blue light round the lower path. You can retrace your steps as often as you like.',
 route:route('stones','The Whispering Stones',[
 '#############','#S....#.....#','###.#.#.#####','#..W..#.#.#E#','#.#####.#.#G#','#.....A.....#','#############'])
 },
 {
 id:'clearing',chapterId:'forest',index:5,title:'The Hidden Clearing',kind:'route',
 scene:'A tiny circle of sunlight lies in the darkest part of the wood. Every path seems to turn away from it—until the wisps gather in a bright line through the ferns.',
 merida:'“I have followed an arrow into stranger places. But I have never followed a promise before.”',
 molly:'Someone has left a spindle carved from pale wood at the edge of the clearing. The last wisp circles it twice.',
 ending:'The spindle fits perfectly into an empty notch in a weathered tree. A track appears, leading toward a cottage with a crooked chimney.',
 hint:'The route winds around the clearing. Collect the wisp, wake the marker and return through the gate.',
 route:route('clearing','The Hidden Clearing',[
 '#############','#S...#.....E#','#.##.#.####G#','#....#.#....#','####.#.#.##.#','#W.......A..#','#############'])
 },
 {
 id:'bargain',chapterId:'witch',index:6,title:'A Curious Bargain',kind:'route',
 scene:'A handwritten note hangs on the cottage door: ONE SPOOL FOR ONE GOOD TURN. Inside, a glowing thread rolls under the shelves, just beyond a rune-locked cupboard.',
 merida:'“I know that handwriting. If we touch anything, it will probably turn into a bear.”',
 molly:'The note folds itself into a tiny paper bird and points toward the wisp beside the fire.',
 ending:'The cupboard opens—not with a crash, but with a polite little cough. Inside rests a spindle wound with gold.',
 hint:'Follow the light around the shelves; the cupboard unlocks only after the rune is awakened.',
 route:route('bargain','A Curious Bargain',[
 '###########','#S.#....#E#','#..#.#.##G#','##...#....#','#.####.##.#','#W....A...#','###########'])
 },
 {
 id:'runes',chapterId:'witch',index:7,title:'The Rune Sequence',kind:'runes',
 scene:'Three small bear carvings turn their wooden heads toward Molly. Above them, someone has written: REMEMBER THE ROAD, NOT THE DESTINATION.',
 merida:'“The first was where we began. The second showed us where to go. And the last… well. That is what we are trying to protect.”',
 molly:'You remember the oak by the castle wall, the star-like wisp in the wood, and the warm hearth you hope to return to.',
 ending:'Oak, light, hearth. The carvings nod, one after another. The little spindle begins to spin a thread that points toward the back room.',
 hint:'Remember the journey: first the oak, then the guiding light, then the warmth of home.'
 },
 {
 id:'secret',chapterId:'witch',index:8,title:'The Witch’s Secret',kind:'route',
 scene:'The back room seems much larger than the cottage. A winding trail of carved bears leads to a sealed door, and on the floor a golden thread trembles in a sudden draught.',
 merida:'“The Witch does love a puzzle. Molly, whatever happens, do not make a bargain with a talking broom.”',
 molly:'The wisp carries the golden thread like a lantern. One last standing stone waits beneath the door.',
 ending:'The door swings open onto a moonlit painting of DunBroch. A thread in the painting glows at the west tower. Merida grows quiet. “We need to get home.”',
 hint:'The golden thread guides you to the wisp. Wake the last rune and find the hidden door.',
 route:route('secret','The Witch’s Secret',[
 '#############','#S.....#..#E#','#.#.##.#.#.G#','#...#....#..#','###.#.##.#..#','#W....A.....#','#############'])
 }
];
export const braveArcheryTargets=[
 {name:'The Near Ribbon',wind:1,range:'near' as const,description:'The red ribbon pulls to the east.'},
 {name:'The Far Pennant',wind:-1,range:'far' as const,description:'The blue pennant streams west across the glen.'},
 {name:'The Last Feather',wind:0,range:'far' as const,description:'The heather grows still beneath the final target.'}
];
export const braveRuneOrder=['oak','light','hearth'] as const;
export const braveRuneOptions=[
 {id:'hearth',symbol:'♨',label:'Hearth'},
 {id:'light',symbol:'✧',label:'Wisp-light'},
 {id:'oak',symbol:'❧',label:'Oak'},
 {id:'river',symbol:'≈',label:'River'}
] as const;
