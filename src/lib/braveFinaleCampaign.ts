/** The second act of Molly's original six-chapter Highland adventure.
 * Follows the golden thread from the Witch's spindle all the way home. */
import type {BraveStage} from '../data/braveCampaign';
import {braveFinaleRoutes} from './braveFinaleRoutes';

export const braveFinaleStages:readonly BraveStage[]=[
 {
  id:'midnight',chapterId:'castle',index:9,title:'The Midnight Escape',kind:'route',
  scene:'DunBroch has changed in the dark. The feast is over, the banners hang still, and a golden thread flickers beneath a door in the west wing. The castle is familiar to Merida; to Molly, every passage hides another story.',
  merida:'“Those windows should be dark by now. If Father catches us creeping about, we will both be helping scrub the great hall tomorrow.”',
  molly:'Behind the sleeping hearth, a little wisp hovers over the staircase. It knows a way that the guards have forgotten.',
  ending:'A final stone slides aside beneath the stair. Beyond it, a torchlit gallery echoes with the delighted giggling of three very small conspirators.',
  hint:'The rune marks open the stairway. Find the wisp, then work your way around the sleeping corridors and into the west passage.',
  route:braveFinaleRoutes.midnight
 },
 {
  id:'triplets',chapterId:'castle',index:10,title:'Triple Trouble',kind:'stealth',
  scene:'The triplets appear at the gallery entrance carrying a stolen pie and the expressions of entirely innocent children. Across the hall, a guard makes the same slow patrol again and again. There are hiding alcoves and exactly one useful distraction.',
  merida:'“Harris, Hubert, Hamish—no setting fire to anything. You can make him look the other way, though. Just this once.”',
  molly:'The guard follows a predictable path. Watch his next step, slip into the little alcoves, or ask the triplets to draw his attention away.',
  ending:'The guard follows the clatter of a dropped pie tin. Three small shadows dart past him and Molly emerges beside Merida, trying not to laugh.',
  hint:'Each move advances the guard by one predictable step. Wait safely or hide in a side alcove; the triplets can distract him for four turns.'
 },
 {
  id:'passage',chapterId:'castle',index:11,title:'The Secret Passage',kind:'route',
  scene:'Behind the hanging tapestry is a staircase no servant remembers. The carved bears on the bannister match the Witch’s handiwork. The spindle glows brightly; the farther the thread reaches, the more ancient the stonework becomes.',
  merida:'“Mother was right about this old wall. She said it had been mended long before the castle was built. She never told me what was hidden inside.”',
  molly:'Two sleeping runes guard the last gate. Somewhere along the forgotten rooms, a golden key waits beside a second wisp.',
  ending:'The final lock yields, revealing a tapestry so old its colours have almost vanished. Queen Elinor arrives quietly, holding a candle. “I remember that pattern,” she says. “And I fear it has begun to unravel.”',
  hint:'Both rune stones must wake to open the moon gate. A lost key and two wisps are waiting among the old castle walls.',
  route:braveFinaleRoutes.passage
 },
 {
  id:'tracks',chapterId:'shadow',index:12,title:'Tracks in the Mist',kind:'route',
  scene:'Elinor shows Molly a faded embroidery: the same stones that stand beyond the storm ridge. If the tapestry is mended wrongly, its old pathways will remain tangled. At dawn the two adventurers ride into the moor, following claw-shaped markings in wet earth.',
  merida:'“Those are not fresh tracks. They are memories carved into the land. I have seen what comes of trusting a legend more than the people beside you.”',
  molly:'The ruined road winds between distant lights. There are no shortcuts through this weather; each stone remembers a different part of the old path.',
  ending:'Two ancient runes answer the wisps. A broken circle rises out of the mist, its stones turned away from one another as though they had refused to listen.',
  hint:'Gather both lights and wake both stones before passing the old moon gate. The safe route curves far around the ruined hills.',
  route:braveFinaleRoutes.tracks
 },
 {
  id:'circle',chapterId:'shadow',index:13,title:'The Broken Circle',kind:'circle',
  scene:'Five carved monoliths surround a stone basin. Their faces bear symbols of sunrise, home, water and night. Once, the stones guided travellers toward each other. Now the carvings point apart, and a long-forgotten inscription asks for the true bearings.',
  merida:'“Mor’du wished for a kingdom that would bend to his will. This place remembers the cost. We are not here to command the stones; we are here to set them free.”',
  molly:'The stone faces can rotate. Follow the inscription carefully; all five bearings must agree before the basin will catch the light.',
  ending:'The last monolith settles into place and the basin fills with a blue reflection. It shows no monster—only a choice made long ago, and the loneliness left behind.',
  hint:'Read the carved bearings around the ring, then rotate each stone until its arrow points where the inscription asks.'
 },
 {
  id:'shadow-bear',chapterId:'shadow',index:14,title:'Shadow of the Bear',kind:'route',
  scene:'A storm passes over the final ruins, casting the shadow of a great bear across the hill. It is only the memory of Mor’du, not the creature himself, yet the sight steals the warmth from the air. The old pathways split again, and the only light belongs to the wisps.',
  merida:'“Being brave does not mean we run at every shadow. Look at the stones, Molly. Look at the roads. We can choose where to go.”',
  molly:'The shadow falls across broken gates, but the runes still hold. The spindle’s thread grows warm when you walk toward the true passage.',
  ending:'The last gate gives way. Behind it lies a small piece of tapestry, untouched by the storm. Elinor’s words return to Merida: “Threads are made to hold people together, not bind them.”',
  hint:'Do not follow the shadow. Secure both wisps, wake the two stones and recover the golden key before crossing the ruined gate.',
  route:braveFinaleRoutes.shadow
 },
 {
  id:'last-wisp',chapterId:'bond',index:15,title:'The Last Wisp',kind:'route',
  scene:'The storm fades into a pale dawn. Molly and Merida reach a clearing where a loom of living branches waits beneath an ancient oak. Tiny blue lights gather around the spindle, but the thread is unfinished. One last journey must be made through the tangled roots.',
  merida:'“Every step brought us here: Angus, the stones, even that ridiculous cottage. I thought I was chasing a mystery, but perhaps we were learning how to listen.”',
  molly:'The final wisp waits beyond the oak roots. The way to the loom opens only when the last two stones have awakened.',
  ending:'The final wisp rises in a little spiral of light. The loom wakes; a thousand golden threads hang in the dawn like the first rays of sunlight.',
  hint:'This is your longest woodland journey. Both lights, both stones and the golden key must be found. You can retrace every path.',
  route:braveFinaleRoutes.last
 },
 {
  id:'threads',chapterId:'bond',index:16,title:'Threads of Fate',kind:'tapestry',
  scene:'The loom shows Molly a small fragment of the old embroidery. Its golden road has been twisted into knots. A familiar wisp dances over the fabric, teaching the Keeper how to turn each piece until no thread hangs loose.',
  merida:'“Mother always said a good stitch is strong because every thread helps the next. I used to think she was talking about sewing.”',
  molly:'Rotate the little embroidered tiles. The golden line must weave through every patch without breaking before the larger tapestry can be restored.',
  ending:'The small patch mends itself with a shimmer of blue. The wisps rise higher, revealing a much larger tapestry beneath the branches—one whose last design has yet to be chosen.',
  hint:'Turn each tile until the golden thread enters from the left, travels through every patch and leaves through the far border.'
 },
 {
  id:'brave-heart',chapterId:'bond',index:17,title:'A Brave Heart',kind:'tapestry',
  scene:'The great tapestry begins to move. On its cloth appear the castle, the forest, the Witch’s cottage and the old stones, no longer separated by fear. Molly must mend every crossing, allowing each path to join another without forcing anyone to follow.',
  merida:'“I once thought being free meant never letting anyone guide me. Now I know: choosing to walk together is freedom, too. Molly, let’s finish this—our own way.”',
  molly:'This is the last pattern. Follow the threads from the first border to the final edge until every piece joins a continuous journey.',
  ending:'The final stitch settles. Golden dawn spills across the Highlands, and the wisps scatter along new paths of their own. Elinor embraces Merida beneath the ancient oak. Angus nudges Molly’s hand, the triplets race through the ferns, and Merida offers her a grateful smile. “You were never just following the wisps, Keeper. You helped us find our way home.”',
  hint:'Mend the full sixteen-patch tapestry. Every patch must join the golden thread, with no loose ends except where the journey enters and leaves the cloth.'
 }
];
