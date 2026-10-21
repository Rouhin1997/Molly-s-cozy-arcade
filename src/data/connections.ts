export type ConnectionGroup = {
  label: string;
  words: [string, string, string, string];
  note: string;
};

export type ConnectionPuzzle = {
  id: string;
  title: string;
  groups: [ConnectionGroup, ConnectionGroup, ConnectionGroup, ConnectionGroup];
};

// Group order is intentional: yellow (easiest), green, blue, purple (trickiest).
// Each entry is independently curated; nothing here is scraped from Connections.
export const connectionPuzzles: ConnectionPuzzle[] = [
  { id: 'sunday-mix', title: 'A Sunday Sort', groups: [
    { label: 'Breakfast dishes', words: ['POHA','IDLI','TOAST','OATS'], note: 'Four familiar ways to start a morning.' },
    { label: 'Pasta shapes', words: ['PENNE','FUSILLI','FARFALLE','RIGATONI'], note: 'These are all shapes of pasta.' },
    { label: 'Plane shapes', words: ['CIRCLE','SQUARE','HEXAGON','TRIANGLE'], note: 'Two-dimensional geometric figures.' },
    { label: 'Video game genres', words: ['RACING','PLATFORMER','STRATEGY','SIMULATION'], note: 'Different styles of video games.' },
  ]},
  { id: 'favourite-faces', title: 'Familiar Faces', groups: [
    { label: 'BLACKPINK members', words: ['JISOO','JENNIE','ROSÉ','LISA'], note: 'The four members of BLACKPINK.' },
    { label: 'Brooklyn Nine-Nine detectives', words: ['JAKE','AMY','ROSA','HOLT'], note: 'Familiar faces from the Nine-Nine.' },
    { label: 'The Big Bang Theory characters', words: ['SHELDON','LEONARD','PENNY','RAJ'], note: 'Friends from the Pasadena apartment gang.' },
    { label: 'Cartoon Network characters', words: ['DEXTER','COURAGE','BLOSSOM','JOHNNY'], note: 'Dexter, Courage, Blossom, and Johnny Bravo.' },
  ]},
  { id: 'spice-cabinet', title: 'Spice Cabinet', groups: [
    { label: 'Leafy herbs', words: ['MINT','BASIL','THYME','PARSLEY'], note: 'Culinary herbs used for aroma and flavour.' },
    { label: 'Whole spices', words: ['CLOVE','CARDAMOM','CUMIN','FENNEL'], note: 'Spices commonly sold whole.' },
    { label: 'Popular sauces', words: ['PESTO','SALSA','KETCHUP','MAYO'], note: 'Condiments or sauces.' },
    { label: 'Kinds of flour', words: ['BESAN','ATTA','MAIDA','SEMOLINA'], note: 'Flours or milled grain products used in cooking.' },
  ]},
  { id: 'cartoon-afternoon', title: 'Cartoon Afternoon', groups: [
    { label: 'Powerpuff Girls', words: ['BLOSSOM','BUBBLES','BUTTERCUP','PROFESSOR'], note: 'The three girls and Professor Utonium.' },
    { label: 'Ben 10 aliens', words: ['HEATBLAST','FOUR ARMS','XLR8','DIAMONDHEAD'], note: 'Alien transformations from Ben 10.' },
    { label: 'Dexter’s Laboratory characters', words: ['DEXTER','DEE DEE','MANDARK','MOM'], note: 'Characters from Dexter’s Laboratory.' },
    { label: 'Courage the Cowardly Dog characters', words: ['COURAGE','MURIEL','EUSTACE','KATZ'], note: 'Characters from Courage the Cowardly Dog.' },
  ]},
  { id: 'sweet-tooth', title: 'Sweet Tooth', groups: [
    { label: 'Indian desserts', words: ['JALEBI','BARFI','KHEER','RASMALAI'], note: 'Popular sweet treats from India.' },
    { label: 'Ice cream flavours', words: ['VANILLA','PISTACHIO','BUTTERSCOTCH','CHOCOLATE'], note: 'Classic ice cream flavours.' },
    { label: 'Things a baker uses', words: ['WHISK','SPATULA','OVEN','SIEVE'], note: 'Baking tools and equipment.' },
    { label: 'Types of pastry', words: ['PUFF','FILO','CHOUX','SHORTCRUST'], note: 'Pastry dough families.' },
  ]},
  { id: 'on-the-map', title: 'Around the Map', groups: [
    { label: 'Italian cities', words: ['ROME','MILAN','TURIN','NAPLES'], note: 'All cities in Italy.' },
    { label: 'Indian hill stations', words: ['SHIMLA','OOTY','MUNNAR','DARJEELING'], note: 'Popular hill-station destinations.' },
    { label: 'Major rivers', words: ['GANGES','NILE','AMAZON','DANUBE'], note: 'Four rivers from different continents.' },
    { label: 'World currencies', words: ['YEN','EURO','WON','RUPEE'], note: 'National or multinational currencies.' },
  ]},
  { id: 'sound-check', title: 'Sound Check', groups: [
    { label: 'Musical instruments', words: ['VIOLIN','TABLA','GUITAR','FLUTE'], note: 'Instruments played around the world.' },
    { label: 'Music tempos', words: ['LARGO','ADAGIO','ALLEGRO','PRESTO'], note: 'Italian tempo markings used in music.' },
    { label: 'Types of voice', words: ['SOPRANO','ALTO','TENOR','BASS'], note: 'Common vocal ranges.' },
    { label: 'Parts of a song', words: ['VERSE','CHORUS','BRIDGE','OUTRO'], note: 'Structural sections of many songs.' },
  ]},
  { id: 'kitchen-detective', title: 'Kitchen Detective', groups: [
    { label: 'Cooking methods', words: ['STEAM','GRILL','ROAST','POACH'], note: 'Ways to cook food.' },
    { label: 'Kinds of lentils', words: ['MASOOR','MOONG','URAD','TOOR'], note: 'Four dals used in Indian kitchens.' },
    { label: 'Citrus fruits', words: ['LEMON','LIME','POMELO','GRAPEFRUIT'], note: 'Members of the citrus family.' },
    { label: 'Types of noodles', words: ['UDON','SOBA','RAMEN','VERMICELLI'], note: 'Different kinds of noodles.' },
  ]},
  { id: 'colour-me-happy', title: 'Colour Me Happy', groups: [
    { label: 'Shades of blue', words: ['NAVY','COBALT','AZURE','CERULEAN'], note: 'All names for shades of blue.' },
    { label: 'Flowers', words: ['DAISY','LOTUS','TULIP','IRIS'], note: 'Four flowering plants.' },
    { label: 'Precious gemstones', words: ['RUBY','SAPPHIRE','EMERALD','DIAMOND'], note: 'Four well-known gemstones.' },
    { label: 'Words before light', words: ['MOON','SUN','STAR','DAY'], note: 'Moonlight, sunlight, starlight, daylight.' },
  ]},
  { id: 'movie-snacks', title: 'Movie Night', groups: [
    { label: 'Cinema snacks', words: ['POPCORN','NACHOS','PRETZEL','CANDY'], note: 'Snacks often enjoyed with a movie.' },
    { label: 'Film crew roles', words: ['DIRECTOR','EDITOR','GAFFER','PRODUCER'], note: 'Jobs involved in filmmaking.' },
    { label: 'Movie genres', words: ['THRILLER','COMEDY','HORROR','ROMANCE'], note: 'Styles of stories on screen.' },
    { label: 'Words before screen', words: ['SILVER','GREEN','SPLIT','TOUCH'], note: 'Silver screen, green screen, split screen, touch screen.' },
  ]},
  { id: 'the-outdoors', title: 'A Little Outdoors', groups: [
    { label: 'Weather phenomena', words: ['RAIN','HAIL','SNOW','SLEET'], note: 'Types of precipitation.' },
    { label: 'Tree types', words: ['OAK','PINE','MAPLE','BIRCH'], note: 'Four kinds of trees.' },
    { label: 'Things in a garden', words: ['TROWEL','RAKE','HOSE','SPADE'], note: 'Tools used for gardening.' },
    { label: 'Words after sea', words: ['HORSE','SHELL','WEED','LION'], note: 'Seahorse, seashell, seaweed, sea lion.' },
  ]},
  { id: 'game-night', title: 'Game Night', groups: [
    { label: 'Chess pieces', words: ['BISHOP','KNIGHT','ROOK','PAWN'], note: 'Four chess pieces.' },
    { label: 'Card suits', words: ['SPADES','CLUBS','HEARTS','DIAMONDS'], note: 'Suits in a standard card deck.' },
    { label: 'Board games', words: ['SCRABBLE','MONOPOLY','CLUE','CATAN'], note: 'Four popular tabletop games.' },
    { label: 'Words before board', words: ['KEY','SCORE','SKATE','WHITE'], note: 'Keyboard, scoreboard, skateboard, whiteboard.' },
  ]},
  { id: 'the-breakfast-club', title: 'Morning Rituals', groups: [
    { label: 'Tea varieties', words: ['ASSAM','OOLONG','MATCHA','EARL GREY'], note: 'Types and blends of tea.' },
    { label: 'Coffee drinks', words: ['LATTE','MOCHA','ESPRESSO','CAPPUCCINO'], note: 'Coffee drinks.' },
    { label: 'Breakfast breads', words: ['BAGEL','CROISSANT','PARATHA','MUFFIN'], note: 'Bread and pastry often eaten at breakfast.' },
    { label: 'Things with a handle', words: ['MUG','KETTLE','PAN','LADLE'], note: 'Kitchen items that usually have handles.' },
  ]},
  { id: 'screen-and-stage', title: 'Screen & Stage', groups: [
    { label: 'Things at a concert', words: ['STAGE','MICROPHONE','SPEAKER','SPOTLIGHT'], note: 'Essentials at a live show.' },
    { label: 'TV genres', words: ['SITCOM','SOAP','DOCUMENTARY','REALITY'], note: 'Types of television programming.' },
    { label: 'Fictional detectives', words: ['HOLMES','POIROT','MARPLE','COLUMBO'], note: 'Famous fictional sleuths.' },
    { label: 'Words after sound', words: ['TRACK','CHECK','WAVE','PROOF'], note: 'Soundtrack, soundcheck, soundwave, soundproof.' },
  ]},
  { id: 'travel-bag', title: 'Pack Your Bags', groups: [
    { label: 'Travel documents', words: ['PASSPORT','VISA','TICKET','ITINERARY'], note: 'Documents useful when travelling.' },
    { label: 'Kinds of bags', words: ['TOTE','DUFFEL','SATCHEL','BACKPACK'], note: 'Different styles of bag.' },
    { label: 'Airport areas', words: ['GATE','TERMINAL','RUNWAY','LOUNGE'], note: 'Places or features of an airport.' },
    { label: 'Words before case', words: ['SUIT','BOOK','BRIEF','SHOW'], note: 'Suitcase, bookcase, briefcase, showcase.' },
  ]},
  { id: 'little-animals', title: 'Animal Kingdom', groups: [
    { label: 'Big cats', words: ['LION','TIGER','LEOPARD','JAGUAR'], note: 'Large wild cats.' },
    { label: 'Sea mammals', words: ['WHALE','DOLPHIN','SEAL','MANATEE'], note: 'Mammals adapted to aquatic environments.' },
    { label: 'Birds of prey', words: ['EAGLE','HAWK','FALCON','OSPREY'], note: 'Predatory birds.' },
    { label: 'Collective animal nouns', words: ['PRIDE','HERD','SCHOOL','FLOCK'], note: 'Collective nouns for groups of animals.' },
  ]},
];

export const CONNECTION_COLOURS = ['yellow', 'green', 'blue', 'purple'] as const;

export function dateIndex(dateKey: string): number {
  const [year, month, day] = dateKey.split('-').map(Number);
  if (!year || !month || !day) throw new Error('Invalid date key');
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function dailyConnectionPuzzle(dateKey: string): ConnectionPuzzle {
  // Rotate through the curated bank in order: no consecutive daily repeats.
  return connectionPuzzles[((dateIndex(dateKey) % connectionPuzzles.length) + connectionPuzzles.length) % connectionPuzzles.length];
}

export function pickPracticeConnection(recentIds: string[], random = Math.random): ConnectionPuzzle {
  const unused = connectionPuzzles.filter(p => !recentIds.includes(p.id));
  const pool = unused.length ? unused : connectionPuzzles;
  return pool[Math.floor(random() * pool.length)];
}

export function shuffledConnectionWords(puzzle: ConnectionPuzzle, seed: string): string[] {
  let state = 2166136261;
  for (const char of `${puzzle.id}-${seed}`) {
    state ^= char.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  const tiles = puzzle.groups.flatMap(group => group.words);
  for (let i = tiles.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

export function validateConnectionBank(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const p of connectionPuzzles) {
    if (ids.has(p.id)) errors.push(`${p.id}: duplicate id`);
    ids.add(p.id);
    if (p.groups.length !== 4) errors.push(`${p.id}: must have four groups`);
    const words = p.groups.flatMap(g => g.words.map(w => w.toLocaleUpperCase('en')));
    if (words.length !== 16 || new Set(words).size !== 16) errors.push(`${p.id}: words must be 16 distinct values`);
    if (p.groups.some(g => !g.label || !g.note || g.words.length !== 4)) errors.push(`${p.id}: incomplete group`);
  }
  return errors;
}
