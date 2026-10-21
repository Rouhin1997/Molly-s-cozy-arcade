export type Category = 'fruit' | 'vegetable' | 'food';
export type Riddle = {
  id: string;
  category: Category;
  answer: string;
  accepted: string[];
  clues: [string, string, string, string];
  funFact: string;
};

// Curated original puzzle copy. A riddle can be solved without opening every clue.
// No outside API is required, so the arcade also works with unreliable internet.
export const riddles: Riddle[] = [
  {
    id: 'aubergine', category: 'vegetable', answer: 'Eggplant', accepted: ['eggplant', 'aubergine', 'brinjal', 'baingan'],
    clues: ['Botanists call me a fruit, but cooks often call me a vegetable.', 'I belong to the same plant family as tomatoes and potatoes.', 'I soak up flavours beautifully in curries and roasted dishes.', 'My most familiar variety is shiny and purple.'],
    funFact: 'Eggplants are botanically berries. In India, you might know them as brinjal or baingan.'
  },
  {
    id: 'pineapple', category: 'fruit', answer: 'Pineapple', accepted: ['pineapple', 'ananas'],
    clues: ['I look like one fruit, but I develop from many flowers.', 'My leaves form a spiky crown.', 'I contain an enzyme called bromelain.', 'My sweet yellow flesh sits behind a rough, patterned skin.'],
    funFact: 'A pineapple is a multiple fruit formed by many fused flowers.'
  },
  {
    id: 'okra', category: 'vegetable', answer: 'Okra', accepted: ['okra', 'bhindi', 'lady finger', 'ladies finger', 'ladyfinger'],
    clues: ['I am the tender green seed pod of a flowering plant.', 'I can make a stew pleasantly thick.', 'I am particularly popular in Indian and West African cooking.', 'Sliced into rounds, I often reveal a neat star shape.'],
    funFact: 'Okra is rich in soluble fibre and is also called bhindi or lady’s finger.'
  },
  {
    id: 'lychee', category: 'fruit', answer: 'Lychee', accepted: ['lychee', 'litchi'],
    clues: ['I am a tropical fruit with a fragrant floral sweetness.', 'My edible part is pale and translucent.', 'A single glossy brown seed sits at my centre.', 'Peel away my rough red shell to eat me.'],
    funFact: 'Lychees originated in southern China and are enjoyed across South and Southeast Asia.'
  },
  {
    id: 'cauliflower', category: 'vegetable', answer: 'Cauliflower', accepted: ['cauliflower', 'phool gobi', 'gobi'],
    clues: ['The part you eat is a cluster of immature flower buds.', 'I belong to the cabbage family.', 'I am delicious roasted, mashed or cooked with potatoes.', 'My classic head is white and resembles a tiny cloud.'],
    funFact: 'Cauliflower also comes in purple, orange and green varieties.'
  },
  {
    id: 'pomegranate', category: 'fruit', answer: 'Pomegranate', accepted: ['pomegranate', 'anar'],
    clues: ['I am a fruit that hides dozens of jewel-like treasures.', 'My juicy parts are called arils.', 'I am traditionally associated with abundance in several cultures.', 'Crack my leathery red shell and you will find ruby-coloured seeds.'],
    funFact: 'The colourful arils around pomegranate seeds are the juicy, edible parts.'
  },
  {
    id: 'mushroom', category: 'vegetable', answer: 'Mushroom', accepted: ['mushroom', 'mushrooms'],
    clues: ['I am often sold with vegetables, but I am neither a plant nor an animal.', 'I help break down organic matter in nature.', 'Some of my relatives are poisonous.', 'Many edible varieties have a cap and a stalk.'],
    funFact: 'Mushrooms are fungi, a kingdom distinct from plants and animals.'
  },
  {
    id: 'dragonfruit', category: 'fruit', answer: 'Dragon fruit', accepted: ['dragon fruit', 'dragonfruit', 'pitaya', 'pitahaya'],
    clues: ['I grow on a climbing cactus.', 'My flowers are large and often bloom at night.', 'My flesh is dotted with tiny black seeds.', 'My outside is bright pink or yellow, with dramatic scales.'],
    funFact: 'Dragon fruit is produced by several species of cactus.'
  },
  {
    id: 'jackfruit', category: 'fruit', answer: 'Jackfruit', accepted: ['jackfruit', 'kathal'],
    clues: ['I am unusually large for something that grows on a tree.', 'Unripe, I can be cooked in savoury dishes.', 'Ripe, my yellow pods are sweet and fragrant.', 'I have a green, bumpy exterior and may weigh many kilograms.'],
    funFact: 'Jackfruit is among the largest tree-borne fruits in the world.'
  },
  {
    id: 'beetroot', category: 'vegetable', answer: 'Beetroot', accepted: ['beetroot', 'beet', 'beets'],
    clues: ['I am a swollen underground root.', 'My natural pigments can colour food.', 'I can be roasted, pickled or grated into salads.', 'Cut me open and you will often see an intense dark red-purple colour.'],
    funFact: 'Beetroot pigments are called betalains and are used as natural food colourants.'
  },
  {
    id: 'papaya', category: 'fruit', answer: 'Papaya', accepted: ['papaya'],
    clues: ['I come from a tropical plant with a tall, usually unbranched stem.', 'Both ripe and unripe versions of me are used in cooking.', 'I contain an enzyme called papain.', 'My orange flesh surrounds many small, dark seeds.'],
    funFact: 'Papain from papaya can help tenderise meat.'
  },
  {
    id: 'starfruit', category: 'fruit', answer: 'Star fruit', accepted: ['star fruit', 'starfruit', 'carambola', 'kamrakh'],
    clues: ['I have long ridges running along my sides.', 'I am juicy and range from tart to sweet.', 'I am also known as carambola.', 'Slice me across and each piece looks like a five-pointed star.'],
    funFact: 'People with kidney disease should avoid star fruit because it can contain harmful neurotoxins.'
  },
  {
    id: 'asparagus', category: 'vegetable', answer: 'Asparagus', accepted: ['asparagus'],
    clues: ['People eat me while my shoots are young.', 'I am a perennial plant.', 'I can be green, white or purple depending on how I am grown.', 'My slender stalks end in tight, pointed tips.'],
    funFact: 'White asparagus is grown without light to prevent it becoming green.'
  },
  {
    id: 'tamarind', category: 'fruit', answer: 'Tamarind', accepted: ['tamarind', 'imli'],
    clues: ['I grow inside a brown pod.', 'My pulp is used in sweet and savoury dishes.', 'My strong sweet-sour flavour appears in chutneys and rasam.', 'You may know me as imli.'],
    funFact: 'Tamarind pulp brings the distinctive tang to many Indian and Southeast Asian dishes.'
  },
  {
    id: 'artichoke', category: 'vegetable', answer: 'Artichoke', accepted: ['artichoke'],
    clues: ['I am a flower bud harvested before it blooms.', 'My plant is related to the thistle.', 'My tender centre is known as a heart.', 'I have many overlapping leaf-like scales.'],
    funFact: 'Left unharvested, an artichoke can bloom into a large purple flower.'
  },
  {
    id: 'rasgulla', category: 'food', answer: 'Rasgulla', accepted: ['rasgulla', 'rosogolla', 'rasagola'],
    clues: ['I am a sweet often served at celebrations.', 'My main ingredient is a soft, fresh cheese.', 'I soak in a light, sugary syrup.', 'I am round, pale, springy, and famous in eastern India.'],
    funFact: 'Rasgulla is made from chhena, a fresh acid-set cheese.'
  },
  {
    id: 'kimchi', category: 'food', answer: 'Kimchi', accepted: ['kimchi'],
    clues: ['Fermentation is central to my flavour.', 'I am often eaten as a side dish.', 'I am an iconic food of Korea.', 'My best-known version is spicy, tangy and made with napa cabbage.'],
    funFact: 'There are hundreds of varieties of kimchi, including non-spicy versions.'
  },
  {
    id: 'dhokla', category: 'food', answer: 'Dhokla', accepted: ['dhokla', 'khaman', 'khaman dhokla'],
    clues: ['I am a savoury Indian snack with a fluffy texture.', 'Steaming is central to how I am made.', 'I am strongly associated with Gujarat.', 'My yellow pieces are often topped with mustard seeds and green chillies.'],
    funFact: 'Khaman and dhokla are related Gujarati preparations, though their ingredients and methods can differ.'
  },
  {
    id: 'momo', category: 'food', answer: 'Momo', accepted: ['momo', 'momos', 'dumpling', 'dumplings'],
    clues: ['I am a beloved snack with a filling wrapped in dough.', 'I am often eaten with a spicy dipping sauce.', 'I can be steamed, fried or served in soup.', 'I am a Himalayan-style dumpling popular across Nepal and India.'],
    funFact: 'Momos are commonly enjoyed with spicy tomato- or chilli-based achar.'
  },
  {
    id: 'falooda', category: 'food', answer: 'Falooda', accepted: ['falooda', 'faluda'],
    clues: ['I am part drink, part dessert.', 'A chilled serving of me often includes basil seeds.', 'I may contain vermicelli and ice cream.', 'Rose syrup is a familiar flavour in my tall glass.'],
    funFact: 'Falooda comes in many regional variations across South Asia.'
  },
  {
    id: 'avocado', category: 'fruit', answer: 'Avocado', accepted: ['avocado'],
    clues: ['My creamy flesh contains plenty of unsaturated fat.', 'I grow on an evergreen tree.', 'I am an important ingredient in guacamole.', 'My green flesh surrounds one very large seed.'],
    funFact: 'Avocado is botanically a berry with one seed.'
  },
  {
    id: 'bittergourd', category: 'vegetable', answer: 'Bitter gourd', accepted: ['bitter gourd', 'bitter melon', 'karela'],
    clues: ['I am a climbing vine crop.', 'My flavour is far from sweet.', 'I am often cooked with spices or stuffed.', 'My warty green skin and intense bitterness are hard to miss.'],
    funFact: 'Bitter gourd, or karela, is a member of the cucumber family.'
  },
  {
    id: 'guava', category: 'fruit', answer: 'Guava', accepted: ['guava', 'amrood'],
    clues: ['I am a fragrant tropical fruit.', 'My small edible seeds may be quite hard.', 'My flesh can be white or pink.', 'I am called amrood in Hindi and often eaten with salt or chilli.'],
    funFact: 'Guavas are notably rich in vitamin C.'
  },
  {
    id: 'samosa', category: 'food', answer: 'Samosa', accepted: ['samosa', 'samosas'],
    clues: ['I am a popular savoury snack.', 'My filling may include spiced potatoes or peas.', 'I am usually served with chutney.', 'My best-known Indian form has a crisp triangular shell.'],
    funFact: 'Samosas have a long history, with related pastries found across Asia and the Middle East.'
  }
];

export function normalizeGuess(value: string): string {
  return value.toLocaleLowerCase('en').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function matchesRiddle(riddle: Riddle, guess: string): boolean {
  const normalized = normalizeGuess(guess);
  return riddle.accepted.some(answer => normalizeGuess(answer) === normalized);
}

export function localDateKey(date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function hash(input: string): number {
  let n = 2166136261;
  for (const char of input) { n ^= char.charCodeAt(0); n = Math.imul(n, 16777619); }
  return n >>> 0;
}

export function dailyRiddle(dateKey: string): Riddle {
  return riddles[hash(`molly-daily-${dateKey}`) % riddles.length];
}

export function practiceRiddles(count = 5): Riddle[] {
  // Separate random practice from the daily seed; no repeats within a set.
  const shuffled = [...riddles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
