export type ToonEra = 'classics' | 'later';
export type ToonShow = {
  id: string;
  title: string;
  era: ToonEra;
  signal: [string, string, string];
  descriptions: [string, string, string];
  palette: [string, string];
  reveal: string;
};

// India-specific Cartoon Network/Toonami era, not the US launch schedule.
// These are original symbolic *props*, not copyrighted show frames or artwork.
// See GAME_DESIGN.md for programming-history references.
export const toonShows: ToonShow[] = [
  { id: 'dexter', title: "Dexter's Laboratory", era: 'classics',
    signal: ['🧪', '🥼', '🧤'], descriptions: ['A lab experiment', 'A white scientist’s coat', 'Protective gloves'],
    palette: ['#fbd58d', '#c7e7f3'], reveal: 'A tiny genius, a secret laboratory, and one sister who never stops meddling.' },
  { id: 'powerpuff', title: 'The Powerpuff Girls', era: 'classics',
    signal: ['🍬','🌸','💥'], descriptions: ['A sprinkle of sweetness','A pink blossom','A miniature superpowered explosion'],
    palette: ['#f9d5df','#c7f0d5'], reveal: 'Sugar, spice and everything nice: Blossom, Bubbles and Buttercup.' },
  { id: 'courage', title: 'Courage the Cowardly Dog', era: 'classics',
    signal: ['🏚️','🐕','👻'], descriptions: ['A lonely old farmhouse','A frightened dog','Something supernatural'],
    palette: ['#d9c8f0','#f8c7d8'], reveal: 'The brave-but-terrified pink dog who protects Muriel and Eustace.' },
  { id: 'johnny', title: 'Johnny Bravo', era: 'classics',
    signal: ['💪','🕶️','💛'], descriptions: ['An exaggerated bicep','Dark sunglasses','A very bright yellow quiff'],
    palette: ['#fce6a2','#b2d4ef'], reveal: 'Big hair, bigger ego, and an endless supply of failed pick-up lines.' },
  { id: 'samurai', title: 'Samurai Jack', era: 'classics',
    signal: ['🌸','⚔️','⏳'], descriptions: ['Falling cherry blossoms','A warrior’s sword','Time slipping away'],
    palette: ['#cfe0ed','#f6cbcf'], reveal: 'A wandering samurai battles Aku to find a way back to his own time.' },
  { id: 'pokemon', title: 'Pokémon', era: 'classics',
    signal: ['🔴','⚡','🎒'], descriptions: ['A red-and-white round device','A burst of electricity','A trainer’s backpack'],
    palette: ['#f7dc91','#f7a9a6'], reveal: 'Ash, Pikachu and the dream of becoming a Pokémon Master; on CN India from 2003.' },
  { id: 'dbz', title: 'Dragon Ball Z', era: 'classics',
    signal: ['🐉','🟠','⚡'], descriptions: ['A mighty dragon','An orange wish-granting orb','An explosive energy surge'],
    palette: ['#fbd7a0','#e4b6ee'], reveal: 'Dragon Balls, epic training and transformations—an early Toonami-era favourite.' },
  { id: 'tomjerry', title: 'Tom and Jerry', era: 'classics',
    signal: ['🧀','🐭','🐈'], descriptions: ['A wedge of cheese','A mischievous mouse','A very persistent cat'],
    palette: ['#f8dfb5','#d0e4f0'], reveal: 'One cat, one mouse, and the most chaotic chase in cartoon history.' },
  { id: 'scooby', title: 'Scooby-Doo', era: 'classics',
    signal: ['🔎','🚐','🐾'], descriptions: ['A magnifying glass','A flower-painted mystery van','A very large paw print'],
    palette: ['#bde0cb','#eedab1'], reveal: 'A hungry Great Dane and a mystery-solving gang chasing supposedly haunted villains.' },
  { id: 'justice-league', title: 'Justice League', era: 'classics',
    signal: ['🌍','🛡️','🦸'], descriptions: ['A planet in danger','A symbol of protection','A team of superheroes'],
    palette: ['#b9d5f6','#f2d5dc'], reveal: 'DC superheroes unite to protect the world; the series came to CN India in 2002.' },
  { id: 'tintin', title: 'The Adventures of Tintin', era: 'classics',
    signal: ['📰','🧳','🐕'], descriptions: ['A reporter’s notebook','A suitcase for distant adventures','A small white dog'],
    palette: ['#f7d7a8','#c4e6e7'], reveal: 'An intrepid young reporter, Snowy, and mysteries around the globe.' },
  { id: 'sheep', title: 'Sheep in the Big City', era: 'classics',
    signal: ['🐑','🏙️','📺'], descriptions: ['A fluffy sheep','A crowded city skyline','An absurd television commercial'],
    palette: ['#d3edf5','#e7d4f7'], reveal: 'Sheep flees to the big city while a bizarre military organization pursues him.' },
  { id: 'timesquad', title: 'Time Squad', era: 'classics',
    signal: ['🕰️','🚀','📜'], descriptions: ['An antique clock','A space-travelling vehicle','A historical scroll'],
    palette: ['#f8dba9','#b8d7f0'], reveal: 'Time travellers visit historical figures and try to put history back on track.' },
  { id: 'transformers', title: 'Transformers: Armada', era: 'classics',
    signal: ['🚛','🤖','⚙️'], descriptions: ['A transforming vehicle','A giant robot','A machine gear'],
    palette: ['#d2d8fa','#f4ccba'], reveal: 'Autobots and Decepticons battle over the mysterious Mini-Cons; aired on CN India in 2004.' },
  { id: 'beyblade', title: 'Beyblade', era: 'later',
    signal: ['🌀','🏟️','🔥'], descriptions: ['A spinning top','A battling stadium','An intense competitive spirit'],
    palette: ['#bcd9f5','#f3cdc8'], reveal: 'Let it rip! Beyblade started airing on CN India in June 2005.' },
  { id: 'juniper', title: 'The Life and Times of Juniper Lee', era: 'later',
    signal: ['🌳','✨','👹'], descriptions: ['An ancient magical tree','An otherworldly shimmer','A troublesome monster'],
    palette: ['#c3e8c7','#d8c8ef'], reveal: 'Juniper balances ordinary life with her responsibilities as the Te Xuan Ze.' },
  { id: 'lazlo', title: 'Camp Lazlo', era: 'later',
    signal: ['🏕️','🐒','🌲'], descriptions: ['A summer camp','A fun-loving monkey','A woodland adventure'],
    palette: ['#c9e8b8','#f7dda9'], reveal: 'Lazlo the monkey and his friends turn a summer camp into joyful chaos.' },
  { id: 'ben10', title: 'Ben 10', era: 'later',
    signal: ['⌚','👽','💚'], descriptions: ['A mysterious wristwatch','A new alien form','A glowing green emblem'],
    palette: ['#c7efbb','#c1d5f3'], reveal: 'The original Ben Tennyson discovers the Omnitrix; CN India premiered it in October 2006.' },
  { id: 'ben10-af', title: 'Ben 10: Alien Force', era: 'later',
    signal: ['🌌','⌚','🛸'], descriptions: ['A threat from deep space','A familiar device returns','A ship from another world'],
    palette: ['#ccd5fc','#c5e7cf'], reveal: 'An older Ben returns to his alien-transforming adventures; CN India aired Alien Force in 2008.' },
  { id: 'spider', title: 'The Spectacular Spider-Man', era: 'later',
    signal: ['🕸️','🏙️','🕷️'], descriptions: ['A web of sticky threads','A tall city skyline','A small spider emblem'],
    palette: ['#f6c6c8','#c5dcf2'], reveal: 'Peter Parker balances school life and web-slinging heroics; CN India aired it in 2009.' },
  { id: 'jackie', title: 'Jackie Chan Adventures', era: 'later',
    signal: ['🥋','🐉','🧿'], descriptions: ['A martial-arts uniform','An ancient dragon symbol','A magical talisman'],
    palette: ['#fad4a5','#c9e1ee'], reveal: 'Jackie, Jade and Uncle chase magical talismans; part of the CN India classics block.' },
];

// Additional titles documented in Cartoon Network India's 1999–2010 lineup.
// Kept as data so the same tuning engine can scale without more screen code.
toonShows.push(
  { id:'ed-edd-eddy',title:"Ed, Edd n Eddy",era:'classics',signal:['🪙','🍬','🛴'],descriptions:['A shiny coin','A jawbreaker sweet','A suburban cul-de-sac'],palette:['#f7dbaf','#d4ecdf'],reveal:'Three neighbourhood friends chase enormous jawbreakers and even bigger schemes.' },
  { id:'cow-chicken',title:'Cow and Chicken',era:'classics',signal:['🐄','🐓','😈'],descriptions:['A talking cow','Her chicken brother','A devilish red troublemaker'],palette:['#fad7d5','#f7e9b8'],reveal:'Siblings Cow and Chicken survived an absurd world and the Red Guy.' },
  { id:'i-am-weasel',title:'I Am Weasel',era:'classics',signal:['🦦','🐒','🥼'],descriptions:['An impossibly clever weasel','A jealous baboon','Yet another unlikely invention'],palette:['#e4dcf1','#f5d6ad'],reveal:'The accomplished I.M. Weasel constantly outshines I.R. Baboon.' },
  { id:'mike-lu-og',title:'Mike, Lu & Og',era:'classics',signal:['🏝️','👧','🥥'],descriptions:['A tropical island','An adventurous little girl','A very strange coconut contraption'],palette:['#d1f1d1','#fbe5af'],reveal:'Mike lives on a secluded island with the eccentric Lu and inventive Og.' },
  { id:'flintstones',title:'The Flintstones',era:'classics',signal:['🪨','🚙','🦕'],descriptions:['A prehistoric stone','A foot-powered family car','A household dinosaur'],palette:['#f7d7ba','#e0e8c5'],reveal:'Meet the modern Stone Age family—Fred, Wilma, Barney and Betty.' },
  { id:'jetsons',title:'The Jetsons',era:'classics',signal:['🚀','🏙️','🤖'],descriptions:['A flying commute','An apartment above the clouds','A household robot'],palette:['#cae7fb','#efdae9'],reveal:'George Jetson, Jane, Judy and Elroy live in a retro-futuristic family world.' },
  { id:'swat-kats',title:'SWAT Kats: The Radical Squadron',era:'classics',signal:['🐈','✈️','🏙️'],descriptions:['Two fearless feline pilots','An experimental fighter jet','A city of dangerous villains'],palette:['#d4d9ef','#f6d7b5'],reveal:'T-Bone and Razor protect Megakat City in the Turbokat.' },
  { id:'mask',title:'The Mask: Animated Series',era:'classics',signal:['🎭','💚','🌪️'],descriptions:['A magical mask','A wildly green face','Cartoonish impossible transformations'],palette:['#bfe3b9','#f8d4a5'],reveal:'Stanley Ipkiss becomes an unpredictable green whirlwind with the ancient mask.' },
  { id:'fosters',title:"Foster's Home for Imaginary Friends",era:'later',signal:['🏠','👻','🎩'],descriptions:['A crowded imaginary boarding house','A mischievous blue friend','A tall, oddly polite companion'],palette:['#c5ebf0','#f8ccd9'],reveal:'Mac and Bloo explore a mansion filled with imaginary friends.' },
  { id:'knd',title:'Codename: Kids Next Door',era:'later',signal:['🔢','🏠','🕶️'],descriptions:['Numbers as secret identities','A massive treehouse','A covert children’s organization'],palette:['#dbeec8','#d5daf4'],reveal:'Five young operatives fight grown-up tyranny from their treehouse HQ.' },
  { id:'billy-mandy',title:'The Grim Adventures of Billy & Mandy',era:'later',signal:['💀','🍪','👧'],descriptions:['A reluctant Grim Reaper','A very silly boy’s snack','One very stern little girl'],palette:['#e7d1ea','#e7e4c4'],reveal:'Grim becomes an unwilling companion to Billy and Mandy.' },
  { id:'digimon',title:'Digimon Adventure',era:'later',signal:['💻','🥚','🦖'],descriptions:['A digital portal','A mysterious egg','A monster with multiple evolutions'],palette:['#cde7f2','#fbe2b3'],reveal:'Children enter the Digital World and bond with evolving partner monsters.' },
  { id:'xmen',title:'X-Men: Evolution',era:'later',signal:['🧬','🏫','⚡'],descriptions:['Unusual genetics','A school for gifted teenagers','Young mutants discovering their abilities'],palette:['#d6d2ec','#f8d4c4'],reveal:'The younger X-Men balance high-school worries and superpowered threats.' },
  { id:'grim-evil',title:'Grim & Evil',era:'classics',signal:['💀','🧠','😈'],descriptions:['A hooded skeleton','An ambitious villainous brain','A very odd cartoon anthology'],palette:['#e6d6e8','#d6e2f2'],reveal:'The original pairing that brought Grim’s adventures and Evil Con Carne together.' },
);

export const toonMysteryClues: Record<string, [string,string,string]> = {
  dexter: ['There is a room in this house that should not exist.', 'An older sibling keeps disrupting an extremely private hobby.', 'An accent, a lab coat, and a brilliant but short-tempered inventor.'],
  powerpuff: ['A chemical accident changes an unusual household forever.', 'A bespectacled scientist calls his creations family.', 'Three sisters defend a city from a green-faced rival.'],
  courage: ['A lonely rural household receives truly impossible visitors.', 'Two elderly people rarely realize how often danger visits them.', 'Their nervous pink pet keeps saving them.'],
  johnny: ['Confidence exceeds competence in almost every situation.', 'His relationship with his mother is warmer than his romantic luck.', 'Sunglasses, blonde hair, and exaggerated muscles.'],
  samurai: ['An old battle remains unfinished in an unfamiliar future.', 'A demonic ruler constantly delays the hero’s return.', 'A robed warrior tries to go back to the past.'],
  pokemon: ['A journey begins with an unusually reluctant companion.', 'A new region always means a fresh collection to master.', 'A yellow electric partner travels with a young trainer.'],
  dbz: ['A family’s battles stretch far beyond their home planet.', 'Seven objects can summon an extraordinary power.', 'An orange-clad martial artist trains for his next transformation.'],
  tomjerry: ['The household is a battlefield and words are rarely spoken.', 'The smaller opponent usually controls the outcome.', 'A mouse and cat cause spectacular destruction.'],
  scooby: ['A strange town’s monster rarely turns out to be supernatural.', 'Food often motivates the most reluctant investigators.', 'A talking Great Dane travels in the Mystery Machine.'],
  'justice-league': ['One hero could never handle every catastrophe.', 'An invisible aircraft and a flying cape share the same mission.', 'Superman and Batman are joined by other DC heroes.'],
  tintin: ['A young reporter frequently survives international conspiracies.', 'A sailor friend and a white dog accompany his adventures.', 'The famous quiff belongs to a Belgian reporter.'],
  sheep: ['A farm animal runs away to find a different sort of life.', 'A secret military unit tracks an utterly unusual target.', 'A runaway sheep lives in a chaotic metropolis.'],
  timesquad: ['Someone has misplaced a crucial part of the past.', 'A young boy and two unlikely adults travel through history.', 'Their mission is to fix mistakes in the historical timeline.'],
  transformers: ['A war is fought over extraordinarily small allies.', 'Two groups of transforming robots continue an ancient feud.', 'A generation of Autobots and Decepticons pursue Mini-Cons.'],
  beyblade: ['Skill matters, but a fighting spirit might matter more.', 'A mystical beast can hide inside a sporting object.', 'Young competitors battle with spinning tops.'],
  juniper: ['A young guardian hides a second life from most of the world.', 'Mythical beings cause disruptions in an ordinary city.', 'A girl called June is secretly the Te Xuan Ze.'],
  lazlo: ['Rules are almost never followed at this summer retreat.', 'A trio of very different friends live among woodland cabins.', 'A monkey turns Camp Kidney into chaos.'],
  ben10: ['One holiday changes an ordinary child’s future.', 'An unfamiliar object arrives from the stars.', 'A boy’s wrist device lets him turn into aliens.'],
  'ben10-af': ['Old powers awaken again as a new threat arrives.', 'Several years have passed since a childhood summer adventure.', 'An older Ben Tennyson once again wears the Omnitrix.'],
  spider: ['The city’s most unlikely hero also has homework.', 'A science student takes photographs between fights.', 'Peter Parker swings through New York City.'],
  jackie: ['Ordinary martial arts cannot solve magical problems.', 'A young relative makes a legendary fighter’s life complicated.', 'Twelve animal talismans and Uncle’s wisdom guide the adventure.'],
  'ed-edd-eddy': ['One small neighbourhood inspires a thousand schemes.', 'Their biggest dream is a single giant sweet.', 'Three boys sharing almost the same name live in a cul-de-sac.'],
  'cow-chicken': ['The siblings in this house are a biological puzzle.', 'A red antagonist causes endless trouble.', 'A cow and her chicken brother star in bizarre adventures.'],
  'i-am-weasel': ['One rival wins effortlessly; the other hates that fact.', 'Success and incompetence are personified by two mammals.', 'I.M. Weasel and I.R. Baboon are their names.'],
  'mike-lu-og': ['A visitor adjusts to a place very far from home.', 'Inventing things is one islander’s favourite pastime.', 'Mike befriends Lu and Og on a remote island.'],
  flintstones: ['Modern domestic worries exist in an ancient setting.', 'Vehicles do not need petrol in this town.', 'Fred and Wilma share a home with a pet dinosaur.'],
  jetsons: ['Technology has improved, but family troubles remain familiar.', 'Their domestic helper is a robot.', 'George Jetson drives a flying car.'],
  'swat-kats': ['Two heroes operate outside an official police force.', 'Their secret hangar contains a combat aircraft.', 'Feline pilots defend Megakat City.'],
  mask: ['A harmless-looking object destroys its wearer’s inhibitions.', 'The hero’s pet struggles with its owner’s transformations.', 'Stanley Ipkiss becomes a green-faced cartoon whirlwind.'],
  fosters: ['The residents are the products of childhood imaginations.', 'A human child’s best friend is blue and a little selfish.', 'Mac visits Bloo in Madame Foster’s mansion.'],
  knd: ['The agents’ names hide their identities in plain sight.', 'The adults are often their opponents.', 'Five kids operate a high-tech treehouse.'],
  'billy-mandy': ['A supernatural servant is trapped by a bizarre friendship.', 'One of the children is painfully cheerful, the other terrifyingly calm.', 'Billy and Mandy have the Grim Reaper as a companion.'],
  digimon: ['Friendships are formed in a world that obeys different rules.', 'Creatures change form when the stakes increase.', 'The DigiDestined travel with evolving monsters.'],
  xmen: ['Adolescence is especially difficult when powers appear.', 'Some classmates want to hide their abilities.', 'Teenage X-Men attend a special institute.'],
  'grim-evil': ['Two contrasting stories share a single title.', 'One stars a Reaper; the other an evil brain.', 'Grim’s adventures were originally paired with Evil Con Carne.'],
};

export type ToonPack = 'all' | ToonEra;
export const TOON_ROUNDS = 6;

export function showsForPack(pack: ToonPack): ToonShow[] {
  return pack === 'all' ? toonShows : toonShows.filter(show => show.era === pack);
}

function hash(str: string): number {
  let n = 2166136261;
  for (const char of str) {
    n ^= char.charCodeAt(0);
    n = Math.imul(n, 16777619);
  }
  return n >>> 0;
}
function seededShuffle<T>(items: T[], seed: string): T[] {
  const copy = [...items];
  let n = hash(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    const j = n % (i + 1);
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy;
}
export function generateToonLineup(seed: string, pack: ToonPack = 'all', count = TOON_ROUNDS): string[] {
  return seededShuffle(showsForPack(pack), `lineup-${seed}-${pack}`).slice(0, count).map(x => x.id);
}
export function optionsForShow(showId: string, seed: string, count = 4): string[] {
  const target = toonShows.find(show => show.id === showId);
  if (!target) throw new Error('Unknown channel');
  const matchingEra = toonShows.filter(show => show.era === target.era && show.id !== target.id);
  const otherEra = toonShows.filter(show => show.era !== target.era && show.id !== target.id);
  // Two era-appropriate distractors, and one from elsewhere in the catalogue.
  const distractors = [...seededShuffle(matchingEra, `same-${seed}-${showId}`).slice(0, Math.min(count - 2, matchingEra.length)), ...seededShuffle(otherEra, `other-${seed}-${showId}`).slice(0, Math.max(1, count - 1 - Math.min(count - 2, matchingEra.length)))];
  return seededShuffle([target, ...distractors], `choices-${seed}-${showId}`).map(s => s.id);
}
export function validateToonCatalogue(): string[] {
  const issues: string[] = [];
  if (new Set(toonShows.map(s => s.id)).size !== toonShows.length) issues.push('Duplicate show IDs');
  if (new Set(toonShows.map(s => s.title)).size !== toonShows.length) issues.push('Duplicate show titles');
  for(const s of toonShows) {
    if (s.signal.length !== 3 || s.descriptions.length !== 3 || !s.title || !s.reveal) issues.push(`Incomplete: ${s.id}`);
  }
  if (showsForPack('classics').length < TOON_ROUNDS || showsForPack('later').length < TOON_ROUNDS) issues.push('Too few shows in an era pack');
  return issues;
}
