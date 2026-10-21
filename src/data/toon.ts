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
export function optionsForShow(showId: string, seed: string): string[] {
  const target = toonShows.find(show => show.id === showId);
  if (!target) throw new Error('Unknown channel');
  const matchingEra = toonShows.filter(show => show.era === target.era && show.id !== target.id);
  const otherEra = toonShows.filter(show => show.era !== target.era && show.id !== target.id);
  // Two era-appropriate distractors, and one from elsewhere in the catalogue.
  const distractors = [...seededShuffle(matchingEra, `same-${seed}-${showId}`).slice(0, 2), seededShuffle(otherEra, `other-${seed}-${showId}`)[0]];
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
