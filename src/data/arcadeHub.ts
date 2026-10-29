import {christmasWeekStart,isHalloweenLive,nextAnnualRomeDate} from '../lib/seasonalEvents';
/** The arcade's public-facing editorial directory.
 * No future release promises, unverified launch dates or invented messages.
 */
export type UpcomingGame={
 name:string;icon:string;tag:string;teaser:string;theme:string;detail:string;
};
export const comingSoonGames:readonly UpcomingGame[]=[
 {name:'Courage the Cowardly Dog',icon:'🐶',tag:'Spooky mystery',theme:'peach',
 teaser:'Strange happenings in Nowhere—and one very determined, frightened little hero.',
 detail:'A future spooky-comedy mystery with eccentric visitors, clue hunting and nervous bravery. We have not begun building the game yet and no date is confirmed.'},
 {name:'Toy Story',icon:'🧸',tag:'Friendship & toys',theme:'blue',
 teaser:'Tiny perspectives, enormous adventures, and a room full of secrets.',
 detail:'A future story-puzzle adventure inspired by the warmth, mischief and friendship of toys. This is a concept on the roadmap, not a playable game, and no release date has been announced.'},
 {name:'The Addams Family',icon:'🕸️',tag:'Gothic puzzles',theme:'mint',
 teaser:'A delightfully peculiar mansion filled with riddles, secrets and dark humour.',
 detail:'A future playful-gothic puzzle adventure with a mystery mansion and oddball family charm. No game has launched and no date is set.'}
];
export type ArcadeEvent={
 id:'halloween'|'birthday'|'christmas';label:string;icon:string;date:Date;dateText:string;
 summary:string;status:'live'|'scheduled'|'planned';route:'nine'|'vault'|'home';
};
export function upcomingArcadeEvents(now=new Date()):ArcadeEvent[]{
 const halloweenLive=isHalloweenLive(now);
 const events:ArcadeEvent[]=[
  {id:'halloween',label:'Halloween Heist · Beta',icon:'🎃',
   date:nextAnnualRomeDate(10,31,now),dateText:'31 October',
   summary:halloweenLive?'The 99 Files heist is live today! Three stages and a dummy test voucher; closes at midnight (Rome time).':
    'A one-day Halloween Heist beta in The 99 Files, opening only on 31 October (Italy time).',
   status:halloweenLive?'live':'scheduled',route:'nine'},
  {id:'birthday',label:'Molly’s Birthday',icon:'🎂',
   date:nextAnnualRomeDate(11,13,now),dateText:'13 November',
   summary:'The birthday event is still in development. Nothing to redeem yet.',
   status:'planned',route:'vault'},
  {id:'christmas',label:'Christmas Week · Planned',icon:'🎄',
   date:christmasWeekStart(now),dateText:'24–30 December',
   summary:'Our next seasonal milestone: possible Christmas-only puzzles and special levels. Ideas are being developed; nothing is playable yet.',
   status:'planned',route:'home'}
 ];
 return events.sort((a,b)=>a.date.getTime()-b.date.getTime());
}
export type DeveloperNote={
 id:string;date:string;title:string;message:string;icon:string;
};
export const developerNotes:readonly DeveloperNote[]=[
 {id:'holiday-beta',date:'29 October 2026',icon:'🎃',title:'Halloween is our special-events rehearsal',message:'The 99 Files Halloween Heist now opens for 31 October only (Europe/Rome), with an explicitly dummy one-use voucher. Progress is kept after the midnight relock. Christmas Week, 24–30 December, is our next planned creative milestone—not a live event yet.'},
 {id:'noodle-duo',date:'28 October 2026',icon:'🥟',title:'Two orders at once — from Level 4!',message:'Levels 4–8 now open with a noodle order and a dumpling order together. The final two shifts add a second paired rush. Mr. Ping has also trimmed the introduction and footer.'},
 {id:'noodle-pilot',date:'28 October 2026',icon:'🐼',title:'Dragon Chef kitchen — eight levels!',message:'The noodle shop now has eight balanced shifts, two preparation boards, original pacy music, new illustrations and a two-use homemade Ramen or Soup Dumplings reward.'},
 {id:'quest',date:'22 October 2026',icon:'🏹',title:'The full Brave adventure is here',
  message:'All eighteen story scenes across six Highland chapters are playable. Complete the final tapestry to earn your Keeper’s Chronicle.'},
 {id:'music',date:'22 October 2026',icon:'🎻',title:'A note from the workshop',
  message:'The Celtic-inspired synthetic soundtrack is still being refined. A fuller, more natural original score is a future production goal—not a finished feature.'},
 {id:'next',date:'22 October 2026',icon:'✿',title:'More stories are on the shelf',
  message:'Courage the Cowardly Dog, Toy Story and The Addams Family remain concepts. Noodles of Destiny now has eight playable shifts; the remaining three franchises are still future concepts.'}
];
