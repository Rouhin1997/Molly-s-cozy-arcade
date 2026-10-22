/** The arcade's public-facing editorial directory.
 * No future release promises, unverified launch dates or invented messages.
 */
export type UpcomingGame={
 name:string;icon:string;tag:string;teaser:string;theme:string;detail:string;
};
export const comingSoonGames:readonly UpcomingGame[]=[
 {name:'Kung Fu Panda',icon:'🐼',tag:'Training & courage',theme:'yellow',
 teaser:'A bamboo-filled journey of balance, timing and the unexpected Dragon Warrior.',
 detail:'A future adventure inspired by Kung Fu Panda’s humour and the idea that greatness can come from unlikely places. We’re exploring training trials, movement and playful wisdom puzzles. No release date has been announced.'},
 {name:'Courage the Cowardly Dog',icon:'🐶',tag:'Spooky mystery',theme:'peach',
 teaser:'Strange happenings in Nowhere—and one very determined, frightened little hero.',
 detail:'A future spooky-comedy mystery with eccentric visitors, clue hunting and nervous bravery. We have not begun building the game yet and no date is confirmed.'},
 {name:'Toy Story',icon:'🧸',tag:'Friendship & toys',theme:'blue',
 teaser:'Tiny perspectives, enormous adventures, and a room full of secrets.',
 detail:'A future story-puzzle adventure inspired by the warmth, mischief and friendship of toys. This is a concept on the roadmap, not a playable game or release announcement.'},
 {name:'The Addams Family',icon:'🕸️',tag:'Gothic puzzles',theme:'mint',
 teaser:'A delightfully peculiar mansion filled with riddles, secrets and dark humour.',
 detail:'A future playful-gothic puzzle adventure with a mystery mansion and oddball family charm. No game has launched and no date is set.'}
];
export type ArcadeEvent={
 id:string;label:string;icon:string;date:Date;dateText:string;
 summary:string;status:'playing'|'planned';route:'nine'|'vault';
};
function nextCalendarDate(monthIndex:number,day:number,now:Date):Date{
 const start=new Date(now.getFullYear(),monthIndex,day);
 const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
 return start<today?new Date(now.getFullYear()+1,monthIndex,day):start;
}
export function upcomingArcadeEvents(now=new Date()):ArcadeEvent[]{
 const events:ArcadeEvent[]=[
  {id:'halloween',label:'Halloween Heist',icon:'🎃',date:nextCalendarDate(9,31,now),dateText:'31 October',
   summary:'Celebrate with the already-playable Halloween Heist in The 99 Files.',
   status:'playing',route:'nine'},
  {id:'birthday',label:'Molly’s Birthday',icon:'🎂',date:nextCalendarDate(10,13,now),dateText:'13 November',
   summary:'The Birthday Vault is an upcoming surprise preview. Gifts and rewards are not live yet.',
   status:'planned',route:'vault'}
 ];
 return events.sort((a,b)=>a.date.getTime()-b.date.getTime());
}
export type DeveloperNote={
 id:string;date:string;title:string;message:string;icon:string;
};
export const developerNotes:readonly DeveloperNote[]=[
 {id:'quest',date:'22 October 2026',icon:'🏹',title:'The full Brave adventure is here',
  message:'All eighteen story scenes across six Highland chapters are playable. Complete the final tapestry to earn your Keeper’s Chronicle.'},
 {id:'music',date:'22 October 2026',icon:'🎻',title:'A note from the workshop',
  message:'The Celtic-inspired synthetic soundtrack is still being refined. A fuller, more natural original score is a future production goal—not a finished feature.'},
 {id:'next',date:'22 October 2026',icon:'✿',title:'More stories are on the shelf',
  message:'Kung Fu Panda, Courage the Cowardly Dog, Toy Story and The Addams Family are ideas for future games. Their dates have not been announced.'}
];
