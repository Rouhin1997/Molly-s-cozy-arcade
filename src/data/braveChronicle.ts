/** The Keeper's Chronicle: a stand-alone fairy tale retelling all six playable
 * chapters. Unlocked only by finishing the final tapestry. Original prose.
 * Page pairs have original chapter art composed in the in-game book.
 */
export type ChronicleChapterId='highland'|'forest'|'witch'|'castle'|'shadow'|'bond';
export type ChroniclePage={
 chapter:ChronicleChapterId;chapterNumber:number;heading:string;eyebrow:string;
 paragraphs:readonly string[];illustration:number;
};
export const chroniclePages:readonly ChroniclePage[]=[
 {chapter:'highland',chapterNumber:1,eyebrow:'CHAPTER ONE · DUNBROCH',heading:'A Little Light in the Courtyard',illustration:0,paragraphs:[
  'On a morning when the hills looked painted with gold, Castle DunBroch was full of noise. Banners snapped above the Highland Games, the clans argued cheerfully over whose champion had the surest hand, and Merida was looking for a reason to escape another speech.',
  'She found Molly instead—or rather, she found Molly standing beneath the archway, watching a tiny blue light drift against the wind. Wisps were not meant to wander so close to the castle. This one circled Molly twice and waited, almost politely, beside an old, forgotten passage.',
  '“Well,” said Merida, tucking a curl behind her ear, “either that wee thing is lost, or it knows something we don’t.” Molly glanced from the mysterious light to the wild hills. She had the peculiar feeling that the little creature was asking a question. And that, somehow, she had already promised to answer.'
 ]},
 {chapter:'highland',chapterNumber:1,eyebrow:'CHAPTER ONE · A PROMISE',heading:'Angus Knows the Way',illustration:2,paragraphs:[
  'The wisp led them through twisting courtyard stones to the meadows where Angus waited. He gave the old marker stone a suspicious sniff before refusing to budge until Merida scratched his forehead. Molly gathered the wandering blue light, and a rune beneath the moss answered with a soft, waking glow.',
  'A gate older than any of the clan banners opened before them. But farther on, the road ended at a practice range. Wind pulled the red ribbons sideways, and Merida lifted her bow with a grin. Molly watched the hills, read the gusts and helped choose the angle of each shot. Three arrows found their marks, and a hidden trail appeared beyond the targets.',
  'At the edge of the forest, even Angus stopped. Merida looked into the dark trees, then at Molly. “I’ve followed wisps before,” she admitted. “It doesn’t always go the way you expect.” The tiny blue light bobbed as if it agreed. Together, they stepped beneath the branches.'
 ]},
 {chapter:'forest',chapterNumber:2,eyebrow:'CHAPTER TWO · THE WOOD',heading:'Where the Paths Wander',illustration:0,paragraphs:[
  'The Whispering Wood did not seem to have one particular shape. Paths curled into loops that ought not to exist. Roots crossed stones worn smooth by feet from centuries past, and pale mist clung to the fern beds even when sunlight shone above.',
  'There were more wisps here. One guided Molly to a rune that had fallen asleep; another waited beyond a narrow turning where the old road vanished into leaves. When both lights were gathered, the stones sang and a gate opened as gently as a flower.',
  'Merida tried to pretend the forest was not troubling her. She told Molly stories about climbing cliffs, escaping lessons and following her own stubborn heart. Molly laughed at the right moments, but she also noticed how often Merida glanced over her shoulder, checking that her new companion was still there.'
 ]},
 {chapter:'forest',chapterNumber:2,eyebrow:'CHAPTER TWO · THE CLEARING',heading:'The Carved Bear',illustration:2,paragraphs:[
  'The deeper they went, the stranger the crossings became. Some roads wanted a golden key; others would not wake until the wisps had visited their ancient guardians. Molly learned to stop, look and think before taking the first inviting path. Merida, who preferred charging ahead, learned to ask what Molly had noticed.',
  'At last they came to a clearing lit by a tiny circle of afternoon sun. In its centre rested a pale wooden bear. It was holding a spindle between its paws. Around the carving, a fine strand of golden thread trembled although there was no wind.',
  'Merida stared at the bear, then groaned. “I know this sort of trouble.” The light floated toward a crooked chimney beyond the trees. “Of course,” she added. “We’re going to see the Witch.” Molly lifted the little carving carefully. Whatever the light had brought them here to find, it was not finished telling its story.'
 ]},
 {chapter:'witch',chapterNumber:3,eyebrow:'CHAPTER THREE · THE COTTAGE',heading:'A Curious Bargain',illustration:0,paragraphs:[
  'The Witch’s cottage smelled of shavings, wood smoke and tea brewed by someone with highly unusual ideas about tea. Every shelf held carved bears. Some were smiling. Some were frowning. One appeared to be watching Molly, although it looked the other way whenever she turned.',
  'A note on the door offered one spool in exchange for one good turn. Inside, the spool was hidden behind sleeping runes, winding shelves and a small golden key. Merida kept her hands folded very firmly behind her back. “The last time I accepted a bargain here,” she muttered, “it became a family matter.”',
  'Molly followed the wisps, awakened the rune stones and finally opened the enchanted cupboard. Within lay a spindle wound with gold. The carving in her hand trembled, as though its little bear had been waiting all along for the thread to return.'
 ]},
 {chapter:'witch',chapterNumber:3,eyebrow:'CHAPTER THREE · THE THREAD',heading:'The Witch’s Riddle',illustration:2,paragraphs:[
  'Four wooden marks stood upon a table: an oak, a river, a star-like light and a hearth. A fifth mark, shaped like a bear, smiled far too knowingly. Above them the Witch had scratched a riddle about roots, currents, light and warmth.',
  'Merida read it twice, then sighed. Molly thought of the road they had travelled: the great old tree by the castle, the water that wound between the stones, the wisps that guided them, and the home to which they hoped to return. She arranged the four signs in that order. The bear gave a small, offended wobble, as if disappointed not to have fooled them.',
  'The spindle began to turn. Across the table ran a golden thread that stitched a moving picture: DunBroch’s west tower under the moon. Merida’s laughter faded. “They weren’t leading us away from home,” she said softly. Molly felt the light gather at her shoulder. Their next road led back to the castle.'
 ]},
 {chapter:'castle',chapterNumber:4,eyebrow:'CHAPTER FOUR · THE RETURN',heading:'Shadows in DunBroch',illustration:0,paragraphs:[
  'DunBroch was quieter at midnight. Its fires burned low, and the feast had long since ended. Yet an ancient stitch glowed beneath a door near the west stair. Merida knew the familiar corridors; Molly could feel that something older than the castle lived behind their stones.',
  'They crept through forgotten turns until they reached a gallery watched by a patient guard. He marched the same route over and over, and the little alcoves beside the hall offered places to wait. Then three red-haired heads peered from behind a barrel. Harris, Hubert and Hamish had been following their sister all along.',
  'Merida glared. The boys grinned. Moments later a pie tin clattered across the flagstones, the guard hurried after the noise, and Molly and Merida slipped through to the other side. “Don’t tell Mother,” Merida whispered. Molly could only laugh. The triplets were already planning how to tell Mother themselves.'
 ]},
 {chapter:'castle',chapterNumber:4,eyebrow:'CHAPTER FOUR · OLD STITCHES',heading:'The Queen Remembers',illustration:2,paragraphs:[
  'Behind a faded hanging tapestry they found a stair so old that even the carved bears along its rail looked solemn. Two sleeping stones guarded a final gate. Molly carried both wisps to their marks, found a little key in the forgotten passage, and opened the way.',
  'Beyond lay a much older tapestry, its colours almost gone. Golden threads reached toward mountains, a forest, a cottage and a ring of standing stones—but in its centre, the embroidery had split. Queen Elinor appeared in the doorway carrying a candle. She did not scold Merida. Instead, she touched the torn cloth with great care.',
  '“This pattern was made to help the old roads find one another,” she explained. “But someone tried to make every road lead where he wished.” Merida looked at Molly. They both remembered the twisted paths in the wood. Elinor traced a fraying stitch toward the distant moor. The broken thread pointed toward the Forgotten Stones.'
 ]},
 {chapter:'shadow',chapterNumber:5,eyebrow:'CHAPTER FIVE · THE MOOR',heading:'The Shape of an Old Fear',illustration:0,paragraphs:[
  'They rode out beneath a sky the colour of iron. Rain silvered the heather, and far beyond the ridges the standing stones rose from the earth like the teeth of some great sleeping beast. There were claw marks in the ground, but they were old—echoes of a legend rather than signs of a living monster.',
  'Merida spoke of Mor’du, the prince who had tried to take everything for himself and had lost the person he once was. The story made Molly shiver. Yet Merida did not reach for her bow. “Courage,” she said, “is sometimes knowing when a shadow is only a shadow.”',
  'The maze among the ruins was the hardest road they had met. Wisps waited in separate hollows, stones required careful waking, and keys shone beneath rain-washed rock. Every time a route closed, Molly considered another way. Together they went forward, not because the moor was harmless, but because they trusted one another.'
 ]},
 {chapter:'shadow',chapterNumber:5,eyebrow:'CHAPTER FIVE · THE CIRCLE',heading:'What the Stones Remember',illustration:2,paragraphs:[
  'At the heart of the moor stood five fallen monoliths. Their old faces spoke in compass riddles: dawn, dusk, the northern star, the southern vale. Molly turned each carving until the stones finally looked in the directions their makers had intended. Blue light filled a shallow basin at the centre.',
  'For a heartbeat a terrible bear-shaped shadow crossed the hill. Then the wind moved, and it was gone. No creature had returned. It was the memory of a choice: a warning about what happens when one heart decides that every other heart must obey.',
  'Beneath the last gate, Molly found a tiny piece of embroidery protected from the storm. Its threads still joined freely, none pulling harder than the rest. Merida remembered Elinor’s voice: “Threads are made to hold people together, not bind them.” She tucked the fragment beside the golden spindle. The final wisp rose toward a pale line of dawn.'
 ]},
 {chapter:'bond',chapterNumber:6,eyebrow:'CHAPTER SIX · FIRST LIGHT',heading:'The Living Loom',illustration:0,paragraphs:[
  'Beyond the ruins, the Highlands opened into a clearing washed in quiet gold. An ancient oak stood at its centre. Within its branches hung a loom of living wood, and around it drifted more wisps than Molly had ever seen. The spindle began to hum, as if it had finally found its home.',
  'There was still one tangled road beneath the oak’s great roots. Molly and Merida walked it together, gathering the final lights and waking the last standing stones. A gate opened without a sound. The wind carried the smell of sunlight after rain.',
  'On the loom lay nine small patches of cloth. Their gold embroidery did not meet. Molly turned one piece, then another, until a single thread ran through the whole design. The wisps shimmered with delight. Beneath the small weaving, a larger tapestry unfolded—sixteen patches waiting for a keeper who understood the meaning of the road.'
 ]},
 {chapter:'bond',chapterNumber:6,eyebrow:'CHAPTER SIX · THE PROMISE',heading:'The Golden Thread',illustration:2,paragraphs:[
  'The great tapestry showed the places they had been: the sunny courtyard, the wandering wood, the Witch’s cottage, the moonlit castle and the storm-dark stones. Molly turned the embroidered pieces until each road joined the next. Nothing was forced into place. At last, with no loose thread left behind, golden light travelled from one border of the cloth to the other.',
  'The wisps rose like a hundred new stars. Paths once tangled opened through the Highlands, but they were no longer fixed to one ruler’s choice. They met where travellers wanted them to meet. Elinor, who had followed the thread to the clearing, put her arms around Merida. Angus nosed Molly’s hand. Nearby the triplets were already inventing wildly untrue accounts of how they had saved the entire kingdom.',
  'Merida laughed, then looked at Molly with something gentler than a grin. “You were never only following the wisps,” she said. “You helped me find my way.” The thread gleamed one final time, and the old oak stirred above them.'
 ]},
 {chapter:'bond',chapterNumber:6,eyebrow:'EPILOGUE · THE HILLS REMEMBER',heading:'Until the Next Adventure',illustration:1,paragraphs:[
  'Later, when the castle banners were bright against the afternoon sky, Molly and Merida stood on the hillside where their adventure had begun. Angus grazed nearby. There was no villain to chase, no mysterious gate to open and—for once—no one telling Merida where she ought to be.',
  'Merida reached into her satchel and drew out a short length of tartan ribbon. Elinor had woven a single golden stitch into its edge. “It’s not some grand royal medal,” Merida said. “And don’t go calling me Your Highness because of it.” She wrapped the ribbon around Molly’s wrist. “It’s so you’ll remember there’s always a road back here, if you want one.”',
  'Molly smiled. “I don’t think I could forget any of it.”',
  '“Good.” Merida’s eyes flashed with familiar mischief. “Because next time, you’re picking the path. I’ve made enough wrong turns for the both of us.”',
  'They parted as friends, each with a different road to follow. Molly had not become a princess, nor a hero in someone else’s story. She had kept a promise and found a friendship of her own. And when a little blue wisp appeared beside her at the next bend, it did not hurry her on. It simply kept her company until the hills opened before her.'
 ]}
];
export const CHRONICLE_CHAPTER_TITLES=['The Highland Games','Follow the Wisps',"The Witch’s Workshop",
 'A Bear in the Castle',"Mor’du’s Shadow",'Mend the Bond'] as const;
