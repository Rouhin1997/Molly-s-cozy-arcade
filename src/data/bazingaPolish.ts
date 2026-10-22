import type { RoomCase, RoomRule } from './bazingaWorld';

/** Original fan-fictional scenario dialogue with BBT lore as a constraint-writing tool.
 * Authored clues are purposely indirect: knowing the characters helps, but does not solve
 * the entire board. Final puzzle uniqueness is proven by the spatial solver. */
type Scene = { story:string; rules:RoomRule[]; winning:string; };
const H=(a:string,tag:string,text:string):RoomRule=>({type:'has',a,tag,text});
const A=(a:string,b:string,text:string):RoomRule=>({type:'adjacent',a,b,text});
const N=(a:string,b:string,text:string):RoomRule=>({type:'not-adjacent',a,b,text});
const F=(a:string,b:string,text:string):RoomRule=>({type:'far-from-guest',a,b,text});
const V=(a:string,tag:string,text:string):RoomRule=>({type:'avoids',a,tag,text});
const scenes:Record<string,Scene>={
  'star-wars-4a':{
    story:"A Star Wars marathon starts in six minutes. Sheldon cites an 'optimal viewing geometry' clause. Leonard hasn't even unwrapped the takeout.",
    rules:[
      H('Sheldon','breeze',"Sheldon has calibrated one cushion for its pleasant cross-breeze, winter radiator distance, and conversational TV angle. He refuses to identify it for everyone."),
      A('Leonard','Sheldon',"The official continuity checker (Leonard) needs to be within conversational range of Sheldon."),
    ],
    winning:"I had assumed the couch would defeat you. Apparently, that assumption was premature. Acceptably done.",
  },
  'penny-pizza':{
    story:"Penny has ordered pizza without submitting a 60-day restaurant-change petition. Sheldon wants the food distribution to be mathematically defensible.",
    rules:[
      H('Sheldon','kitchen',"Someone must supervise the allocation of slices. Sheldon has nominated himself for kitchen access."),
      A('Penny','Leonard',"Penny has informed Leonard that sharing a seat is not necessary, but sitting nearby is."),
    ],
    winning:"The slices are distributed equitably. My expectations were low, but you have exceeded them.",
  },
  'dinner-wolowitz':{
    story:"At Howard and Bernadette's, dinner has been delayed by a debate over the household seating hierarchy. Stuart quietly volunteers to do the dishes.",
    rules:[
      H('Bernadette','head',"Bernadette has final authority over dinner service. She will not be seated at a side position."),
      N('Stuart','Bernadette',"Stuart would rather not be within immediate scolding range of the person running dinner."),
    ],
    winning:"Remarkable. A family dinner in which the seating plan is the least objectionable feature.",
  },
  'comics-release':{
    story:"Wednesday's new comic shipment is late. Sheldon has an inventory theory, Stuart is fielding complaints, and Howard claims to have found the rare variant cover.",
    rules:[
      H('Stuart','counter',"The proprietor cannot abandon the register while a valuable issue is unpacked."),
      A('Sheldon','Stuart',"Sheldon intends to inspect the issue without letting Stuart out of his sight."),
    ],
    winning:"No damaged first editions, no misplaced inventory. I suppose one could call that competence.",
  },
  'cafeteria-lunch':{
    story:"Caltech lunch is interrupted by Sheldon's insistence that table assignment is a branch of applied mathematics, not a social activity.",
    rules:[
      H('Raj','snacks',"Raj wants rapid access to an additional helping without walking around the entire table."),
      H('Sheldon','window',"Sheldon has rejected the seats away from natural light for today's observation."),
    ],
    winning:"Your solution is internally consistent. I can find no immediate grounds to object. How irritating.",
  },
  'movie-night':{
    story:"Original-trilogy night. Sheldon is calculating parallax distortion while Penny wonders why anyone needs an equation to watch a film.",
    rules:[
      H('Sheldon','back',"Sheldon considers the rear part of the theatre the only reasonable starting point for screen analysis."),
      N('Stuart','Sheldon',"Stuart's ticket is nowhere near the seat Sheldon has claimed for himself."),
    ],
    winning:"The screen geometry is tolerable and nobody obstructs my field of view. That passes for success.",
  },
  'raj-mystery':{
    story:"Raj has written a murder mystery in which everyone insists they are innocent. Amy has brought a notebook; Penny has already guessed the wrong culprit.",
    rules:[
      H('Stuart','door',"The least convincing suspect wants to keep a clear route to the exit."),
      H('Bernadette','snacks',"Bernadette has reserved snack duty. The host knows better than to argue."),
      A('Amy','Penny',"Amy needs to quietly compare alibis with Penny while the suspects debate."),
    ],
    winning:"You eliminated the contradictions systematically. A distressingly effective display of reasoning.",
  },
  'sick-day':{
    story:"Raj has a cold. Sheldon has consulted an imaginary epidemiological model; Penny is unimpressed by the proposed quarantine perimeter.",
    rules:[
      H('Raj','window',"Raj wants fresh air. His position should be next to a window."),
      F('Sheldon','Raj',"By Sheldon's new biosecurity protocol, his chair must maximize the distance from the symptomatic guest."),
      A('Penny','Leonard',"Penny and Leonard plan to watch over the situation from neighbouring places."),
    ],
    winning:"Pathogen separation was handled with uncommon precision. You may retain your visitor privileges.",
  },
  'halo-marathon':{
    story:"It's Wednesday, which means Halo, comics, and Sheldon reciting the Roommate Agreement instead of actually starting the game.",
    rules:[
      H('Sheldon','breeze',"Only one seat offers the precise airflow and television geometry Sheldon insists upon during gameplay."),
      H('Stuart','uncomfortable',"Stuart has volunteered for one of the spare seats, neither of which is comfortable."),
      A('Howard','Raj',"Howard and Raj intend to strategize together within easy whispering distance."),
    ],
    winning:"The seating protocol has survived a multiplayer stress test. I am mildly impressed.",
  },
  'wolowitz-thanksgiving':{
    story:"Bernadette has hosted dinner. Howard and Raj have planned jokes; Penny would prefer the food before the debate over cutlery orientation.",
    rules:[
      H('Bernadette','head',"Bernadette is directing the meal; she claims a commanding position at the table."),
      H('Stuart','far-corner',"Stuart volunteered for a place well away from the main serving bustle."),
      A('Howard','Raj',"Howard and Raj have a shared set of jokes that require close-range delivery."),
    ],
    winning:"Against all statistical expectation, the dinner allocation is defensible. Enjoy this moment.",
  },
  'lab-flag-show':{
    story:"Amy agreed to film Fun with Flags in the lab. Sheldon wants physics props; Howard wants to discuss his hair; Leonard wants the experiment to end.",
    rules:[
      H('Sheldon','experiment',"The host will only demonstrate a flag beside active research equipment."),
      H('Howard','draft',"Howard has chosen the position where the moving air could give his hair a dramatic entrance."),
      H('Amy','lab-safe',"Amy requires a protected work surface before signing off on the filming."),
    ],
    winning:"The arrangement satisfies both scientific and broadcast standards. A rare convergence.",
  },
  'comic-tournament':{
    story:"Stuart's game night is running behind schedule. Sheldon has brought his own rules; Howard is pretending not to care who wins.",
    rules:[
      H('Stuart','counter',"Stuart cannot leave the register unguarded during the tournament."),
      A('Raj','Sheldon',"Raj wants to question Sheldon's rule interpretations without raising his voice."),
      H('Howard','uncomfortable',"Howard volunteered for the cheapest available chair, before he examined it."),
    ],
    winning:"You reached a valid configuration without abusing the rules. I should record the date.",
  },
  'sheldon-spot-war':{
    story:"A viewing party in Apartment 4A has triggered a roommate-agreement audit. The familiar couch, a door-side draft and the backup stools all complicate matters.",
    rules:[
      H('Sheldon','breeze',"Sheldon insists on a precisely tempered cross-breeze and the television angle that permits conversation without image distortion."),
      H('Stuart','uncomfortable',"Stuart has accepted one of the less desirable spare positions, without making a fuss."),
      H('Amy','sofa',"Amy is not accepting a workstation chair during a social occasion."),
      A('Leonard','Sheldon',"Leonard has agreed to field Sheldon's running commentary from an adjoining place."),
    ],
    winning:"I have reviewed your reasoning twice and found no obvious defect. Consider that unusually high praise.",
  },
  'cinema-empire':{
    story:"The Empire Strikes Back is screening. Sheldon's measurements, Raj's popcorn logistics and Stuart's questionable ticket must all coexist.",
    rules:[
      H('Sheldon','back',"Sheldon rejects the first row on physiological and optical grounds."),
      H('Stuart','front',"Stuart's budget ticket is for the front half, much to his disappointment."),
      A('Leonard','Sheldon',"Leonard must be close enough for a whispered objection to Sheldon's commentary."),
      H('Raj','back',"Raj intends to watch from the row that leaves the least interference with the aisle."),
    ],
    winning:"I did not expect you to grasp the geometry of cinematic immersion. Yet here we are.",
  },
  'raj-midnight':{
    story:"Raj's midnight murder mystery is underway. A missing vintage comic, an untrustworthy alibi and six different temperaments have made the seating chart evidence.",
    rules:[
      H('Stuart','chair',"Stuart has decided the sofa is far too public for his detective persona."),
      V('Raj','tv-view',"Raj does not want a direct view of the screen to spoil his carefully arranged clues."),
      A('Amy','Penny',"Amy and Penny are comparing contradictory witness statements in neighbouring seats."),
      N('Raj','Howard',"Howard's improvised detective accent has persuaded Raj to demand some personal space."),
    ],
    winning:"Your reconstruction is coherent. That is more than I can say for most fictional detectives.",
  },
  'nobel-banquet':{
    story:"A Nobel-themed dinner has become a test of Bernadette's patience. Sheldon is cross-examining the seating chart as though it were a journal submission.",
    rules:[
      A('Bernadette','Amy',"Bernadette has a quiet announcement for Amy and needs her close enough to hear it."),
      N('Stuart','Bernadette',"Stuart asks not to sit directly next to the person who can assign him more chores."),
      V('Sheldon','kitchen',"Sheldon will not sit near the kitchen while somebody is handling raw food."),
      V('Amy','door',"Amy would rather not have the dining-room door opening behind her."),
    ],
    winning:"I inspected your answer expecting a flaw. Annoyingly, I found none. Well done, I suppose.",
  },
  'caltech-quantum':{
    story:"A Caltech safety demonstration has drawn in everyone. Sheldon has written a procedural appendix longer than the laboratory manual.",
    rules:[
      H('Sheldon','experiment',"Sheldon must be near the instrumentation to demonstrate the hypothesis."),
      V('Stuart','experiment',"Stuart, who has not completed safety training, must stay clear of the active experimental benches."),
      H('Bernadette','lab-safe',"Bernadette insists on a station that meets the lab's protective criteria."),
      H('Amy','lab-safe',"Amy also refuses to work at an unprotected station."),
    ],
    winning:"The apparatus survived, the logic survived, and Howard did not explode anything. Unprecedented.",
  },
  'cafeteria-summit':{
    story:"The Caltech cafeteria has become a physics summit. Sheldon insists this is merely combinatorics, Howard wants lunch, and Raj is conducting a social experiment.",
    rules:[
      H('Sheldon','window',"Sheldon has ruled out the interior side after studying the lighting conditions."),
      N('Stuart','Leonard',"Stuart would prefer not to sit within immediate range of Leonard's lunch debate."),
      H('Howard','snacks',"Howard intends to eat promptly, with minimum queuing overhead."),
      A('Amy','Sheldon',"Amy plans to challenge Sheldon's assumptions from an adjacent position."),
    ],
    winning:"Your deduction is consistent with every constraint. I am prepared to call it adequate.",
  },
};
export function polishRoomCases(all:RoomCase[]):RoomCase[]{
  return all.map(c=>{
    const next=scenes[c.id];
    return next?{...c,story:next.story,rules:next.rules,winning:next.winning,losing:'Bazinga! You lose!'}:c;
  });
}

/** Seat captions are local to each story, not the resident's identity.
 * In particular, never explicitly reveal which cushion belongs to Sheldon. */
const scenarioSeatNames:Record<string,Record<string,string>>={
 'star-wars-4a':{'spot':'Sofa · window-end cushion','middle':'Sofa · centre cushion','right':'Sofa · hallway end','armchair':'Reading armchair'},
 'penny-pizza':{'love-left':'Love seat · kitchen side','love-right':'Love seat · window side','armchair':'Living-room armchair','counter':'Breakfast-counter stool'},
 'dinner-wolowitz':{'north':'Dining table · head','west-upper':'Left side · kitchen end','east-upper':'Right side · doorway end','south':'Dining table · far end'},
 'comics-release':{'counter':'Cash-register chair','shelf':'Collectibles corner','aisle':'Main shop aisle','rickety':'Wobbly back stool'},
 'cafeteria-lunch':{'west-head':'Table · west end','top-left':'Window side · west','east-head':'Table · passage end','bottom-left':'Serving counter side'},
 'movie-night':{'front-left':'Row A · left aisle','front-centre':'Row A · centre','back-left':'Row C · left aisle','back-centre':'Row C · centre'},
 'raj-mystery':{'couch-left':'Velvet sofa · left','couch-right':'Velvet sofa · right','chair':'Reading armchair','snack':'Refreshments-side stool','entry':'Hallway entry stool'},
 'sick-day':{'love-left':'Love seat · kitchen end','love-right':'Love seat · far end','armchair':'Armchair by rug','window':'Window-side chair','entry':'Doorway stool'},
 'halo-marathon':{'spot':'Player sofa · window end','middle':'Player sofa · centre','right':'Player sofa · doorway end','armchair':'Multiplayer armchair','stool':'Extra controller stool'},
 'wolowitz-thanksgiving':{'north':'Host’s end of table','west-upper':'Kitchen-side · upper','west-lower':'Kitchen-side · lower','east-upper':'Door-side · upper','south':'Dining table · far end'},
 'lab-flag-show':{'safe':'Shielded workbench','scope':'Telescope station','laser':'Laser workstation','computer':'Monitor workstation','exit':'Emergency exit desk'},
 'comic-tournament':{'counter':'Register stool','shelf':'Rare editions corner','window':'Display-window seat','aisle':'Tournament aisle','rickety':'Spare folding stool'},
 'sheldon-spot-war':{'spot':'Sofa · window end','middle':'Sofa · middle','right':'Sofa · doorway end','armchair':'Comfortable armchair','desk':'Computer desk chair','stool':'Kitchen overflow stool'},
 'cinema-empire':{'front-left':'Row A · left','front-centre':'Row A · centre','front-right':'Row A · right','back-left':'Row C · left','back-centre':'Row C · centre','back-right':'Row C · right'},
 'raj-midnight':{'couch-left':'Velvet sofa · west','couch-right':'Velvet sofa · east','chair':'Lounge chair','snack':'Buffet stool','window':'Window alcove','entry':'Corridor-side stool'},
 'nobel-banquet':{'north':'Banquet table · head','west-upper':'Left · upper','west-lower':'Left · lower','east-upper':'Right · upper','east-lower':'Right · lower','south':'Banquet table · far end'},
 'caltech-quantum':{'safe':'Shielded bench','scope':'Telescope platform','laser':'Laser table','computer':'Data-analysis chair','vent':'Ventilation stool','exit':'Exit-side workstation'},
 'cafeteria-summit':{'west-head':'Quiet west end','top-left':'Window side · west','top-right':'Window side · east','east-head':'Walkway end','bottom-left':'Serving side · west','bottom-right':'Serving side · east'},
};
export function seatLabelForCase(c:RoomCase,id:string,defaultLabel:string):string{
 return scenarioSeatNames[c.id]?.[id]??defaultLabel;
}
