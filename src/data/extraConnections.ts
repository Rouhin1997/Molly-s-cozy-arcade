import type { ConnectionPuzzle } from './connections';
type G = ConnectionPuzzle['groups'][number];
const g = (label:string,words:[string,string,string,string],note:string): G => ({label,words,note});
export const extraConnections: ConnectionPuzzle[] = [
  {id:'after-school',title:'After School',groups:[
    g('Classroom supplies',['PENCIL','ERASER','RULER','SHARPENER'],'Objects from a pencil case.'),
    g('School subjects',['HISTORY','GEOGRAPHY','CHEMISTRY','ALGEBRA'],'Subjects commonly studied at school.'),
    g('Kinds of bag',['SATCHEL','BACKPACK','TOTE','DUFFEL'],'Ways to carry your belongings.'),
    g('Words before book',['NOTE','TEXT','SKETCH','COOK'],'Notebook, textbook, sketchbook, cookbook.'),
  ]},
  {id:'street-food-tour',title:'Street Food Tour',groups:[
    g('Indian savoury street snacks',['PANIPURI','CHAAT','VADAPAV','PAKORA'],'Four snacks sold across India.'),
    g('Chinese filled dumplings',['JIAOZI','WONTON','BAOZI','SHUMAI'],'Different Chinese dumplings.'),
    g('Italian pasta types',['ORZO','GNOCCHI','RAVIOLI','LINGUINE'],'Italian starches and pasta shapes.'),
    g('Middle Eastern dips',['HUMMUS','BABA GANOUSH','LABNEH','MUHAMMARA'],'Four different dips or spreads.'),
  ]},
  {id:'retro-remote',title:'Retro Remote',groups:[
    g('Ed, Edd n Eddy characters',['ED','EDD','EDDY','PLANK'],'Three Eds and their wooden friend.'),
    g('Scooby-Doo gang',['FRED','DAPHNE','VELMA','SHAGGY'],'The human Mystery Inc. gang.'),
    g('Codename: KND operatives',['NUMBUH ONE','NUMBUH TWO','NUMBUH THREE','NUMBUH FIVE'],'Children identified by their KND numbers.'),
    g('Courage villains',['KATZ','FREAKY FRED','LE QUACK','KING RAMSES'],'Antagonists in Courage the Cowardly Dog.'),
  ]},
  {id:'soft-pastels',title:'A Little Colour',groups:[
    g('Pastel colours',['LAVENDER','BLUSH','MINT','PEACH'],'Soft gentle shades.'),
    g('Types of fabric',['LINEN','SILK','DENIM','VELVET'],'Different textile materials.'),
    g('Things in a garden',['HOSE','SPADE','TROWEL','RAKE'],'Common gardening tools.'),
    g('Words after honey',['BEE','COMB','DEW','MOON'],'Honeybee, honeycomb, honeydew, honeymoon.'),
  ]},
  {id:'picture-perfect',title:'Picture Perfect',groups:[
    g('Photography terms',['EXPOSURE','APERTURE','ISO','SHUTTER'],'Core camera settings.'),
    g('Kinds of clouds',['CIRRUS','STRATUS','CUMULUS','NIMBUS'],'Terms for cloud formations.'),
    g('Art mediums',['WATERCOLOR','PASTEL','ACRYLIC','CHARCOAL'],'Materials used to create artwork.'),
    g('Words before frame',['TIME','DOOR','PICTURE','WINDOW'],'Timeframe, doorframe, picture frame, window frame.'),
  ]},
  {id:'pink-soundcheck',title:'Pink Soundcheck',groups:[
    g('BLACKPINK members',['JENNIE','JISOO','ROSÉ','LISA'],'The members of BLACKPINK.'),
    g('BLACKPINK group songs',['WHISTLE','BOOMBAYAH','SHUT DOWN','PINK VENOM'],'BLACKPINK title tracks.'),
    g('BLACKPINK solo tracks',['FLOWER','MONEY','SOLO','ON THE GROUND'],'Solo releases by BLACKPINK members.'),
    g('Concert equipment',['IN-EARS','MONITOR','SPOTLIGHT','MICROPHONE'],'Items associated with live performances.'),
  ]},
  {id:'hidden-compounds',title:'Hidden Compounds',groups:[
    g('___cake',['PAN','CUP','POUND','CHEESE'],'Pancake, cupcake, pound cake, cheesecake.'),
    g('___fish',['STAR','JELLY','CLOWN','ANGEL'],'Starfish, jellyfish, clownfish, angelfish.'),
    g('___board',['SKATE','KEY','SCORE','WHITE'],'Skateboard, keyboard, scoreboard, whiteboard.'),
    g('___light',['FLASH','STREET','CANDLE','FLOOD'],'Flashlight, streetlight, candlelight, floodlight.'),
  ]},
  {id:'tricky-prefixes',title:'Before and After',groups:[
    g('___room',['BATH','BED','LIVING','DINING'],'Bathroom, bedroom, living room, dining room.'),
    g('___house',['GREEN','TREE','WARE','LIGHT'],'Greenhouse, treehouse, warehouse, lighthouse.'),
    g('___work',['HOME','TEAM','NET','FRAME'],'Homework, teamwork, network, framework.'),
    g('___line',['DEAD','SHORE','PUNCH','STORY'],'Deadline, shoreline, punchline, storyline.'),
  ]},
  {id:'two-meanings',title:'Double Meanings',groups:[
    g('Can be a tree or a name',['ASH','WILLOW','HOLLY','LAUREL'],'Words used for trees and given names.'),
    g('Can be a tool or a bird',['CRANE','JACK','ROBIN','SWALLOW'],'Trick group: only crane is a tool and bird, so this is not valid.'), 
    g('Musical terms',['BEAT','CHORD','PITCH','TEMPO'],'Words used in music.'),
    g('Can follow sun',['FLOWER','RISE','SET','SHINE'],'Sunflower, sunrise, sunset, sunshine.'),
  ]},
  {id:'mix-and-match',title:'Mix & Match',groups:[
    g('Symbols on playing cards',['HEART','CLUB','DIAMOND','SPADE'],'The four suits in a deck.'),
    g('Words before drop',['RAIN','TEAR','BACK','MIC'],'Raindrop, teardrop, backdrop, mic drop.'),
    g('Kinds of light',['NEON','LASER','LED','CANDLE'],'Different light sources.'),
    g('Cooking utensils',['WHISK','LADLE','TONGS','SPATULA'],'Utensils used while cooking.'),
  ]},
  {id:'sitcom-corner',title:'Sitcom Corner',groups:[
    g('Brooklyn Nine-Nine characters',['GINA','TERRY','AMY','ROSA'],'Four from the Nine-Nine precinct.'),
    g('BBT characters',['RAJ','LEONARD','HOWARD','PENNY'],'Friends from The Big Bang Theory.'),
    g('Police terms',['PRECINCT','BADGE','ALIBI','WARRANT'],'Words from police work.'),
    g('Physics terms',['QUARK','PHOTON','SPIN','BOSON'],'Concepts and particles in physics.'),
  ]},
  {id:'word-trickery',title:'Word Trickery',groups:[
    g('Words that sound like numbers',['WON','TOO','FOR','ATE'],'Homophones of one, two, four and eight.'),
    g('Words that sound like letters',['BEE','SEA','EYE','WHY'],'Homophones of B, C, I and Y.'),
    g('Words meaning very happy',['ELATED','GLEEFUL','JUBILANT','THRILLED'],'Synonyms for very happy.'),
    g('Words that are also directions',['LEFT','RIGHT','NORTH','SOUTH'],'Cardinal or relative directions.'),
  ]},
];
