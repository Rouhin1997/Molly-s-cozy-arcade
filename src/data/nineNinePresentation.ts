import { type NineCase, caseCandidates, type Deduction } from './nineNine';
/** Scenario-specific cast lists and original little case epilogues.
 * Detective Molly is the player character in every investigation. The portrait
 * is illustrated from a privately provided photo; the photo is never published.
 */
export type NinePresentation={team:[string,string,string,string];teamNote:string;scene:string;motivation:string;reconstruction:string;closing:string};
export const ninePresentation:Record<string,NinePresentation>={
 'yogurt-vanish':{
  team:['Molly','Terry','Jake','Charles'],
  teamNote:'Terry filed the complaint. Jake volunteered as lead detective; Boyle insisted that dairy is a serious matter.',
  scene:'Terry’s labelled yogurt shelf was empty, but the detached seal and warm wrapper told a stranger story than a missing delivery.',
  motivation:'Gina treated the snack inventory like one more opportunity to orchestrate chaos in the bullpen; Terry was understandably less amused.',
  reconstruction:'The cart reached the precinct after the disappearance; Charles was away, Hitchcock had a vending assignment, and Jake was in the briefing room. The backup key was never used. Gina’s initials on the replacement stock record, together with the older warm wrapper and the second product code, establish the fridge swap.',
  closing:'Terry requests the return of every tub. Jake suggests naming the crime “Yogurtgate”; Holt declines to authorize the name.',
 },
 'binder-blueprint':{
  team:['Molly','Amy','Holt','Jake'],
  teamNote:'Amy is running the search. Holt expects impeccable documentation. Jake insists the word “binder” makes this a personal matter.',
  scene:'Minutes before inspection, Amy’s prize binder appeared to vanish, leaving only its precise green-and-violet tab system.',
  motivation:'Jake thought moving the binder was a harmless little prank. He seriously underestimated Amy’s relationship with stationery.',
  reconstruction:'The archive had no barcode record and the delivery envelope was far too small to conceal the binder. Rosa was on a recorded garage call, Gina was off-site, and Charles remained at the front desk. Fresh scuffs in Amy’s bottom drawer and Jake’s use of the spare drawer key reveal the drawer switch.',
  closing:'Amy restores the binder to its colour-coded home. Holt awards Molly an imaginary point for respecting procedure.',
 },
 'cheddar-collar':{
  team:['Molly','Holt','Cheddar','Amy'],
  teamNote:'Holt oversees the search. Cheddar remains the most dignified witness; Amy has a photo-call checklist.',
  scene:'Cheddar arrived for his portrait wearing an ordinary costume collar where the ceremonial one should have been.',
  motivation:'Gina wanted a more camera-friendly dog portrait and took it upon herself to reorganize the props. Captain Holt did not request a creative director.',
  reconstruction:'The coat rack lacked matching fibres, the evidence locker had an intact seal, and the prop assistant was the only person handling Cheddar during the water break. The special velvet recess and replacement collar identify a photo-prop swap; Gina ordered the prop box.',
  closing:'The formal collar is located. Cheddar receives a biscuit and a written apology from the humans.',
 },
 'jimmy-jab-medal':{
  team:['Molly','Jake','Amy','Rosa'],
  teamNote:'Jake is convinced the Games need more drama. Amy has prepared fourteen official-looking schedules.',
  scene:'The medal moved during an over-serious rehearsal for the precinct’s unofficial Jimmy Jab competition.',
  motivation:'Amy wanted to guarantee an impeccably executed award ceremony. Her emergency substitution plan looked considerably more suspicious than intended.',
  reconstruction:'The rolling chair was caught on video with only a bag, and the supply closet was opened too late. A second medal case appeared in the inventory, while Amy’s rehearsal permit explained who could access the unlocked trophy case. The duplicate case was exchanged during award setup.',
  closing:'Jake declares the case another Jimmy Jab event. Rosa walks away before he can explain the scoring.',
 },
 'pontiac-switch':{
  team:['Molly','Jake','Rosa','Charles'],
  teamNote:'Jake recognises a familiar Pontiac problem. Rosa is handling the garage records; Boyle is on witness duty.',
  scene:'An impounded vintage Pontiac was replaced with a convincing stand-in before anyone noticed its different tyres.',
  motivation:'Doug Judy could not resist a clever automotive disappearing act, especially one likely to make Jake call him.',
  reconstruction:'The checkpoint image proves an entire car crossed the garage threshold with the expected plates; it was not just a plate swap. The tow permit was created after the replacement, Anita was on a recorded call, and the other workers were at another garage. Scratches on the lock and the key blank purchased under Judy’s alias point to a cloned garage key.',
  closing:'Jake admires the engineering for approximately four seconds before Holt reminds him it is still a crime.',
 },
 'interrogation-contradiction':{
  team:['Molly','Holt','Jake','Rosa'],
  teamNote:'Holt is supervising the interrogation. Jake wants a dramatic reveal; Rosa wants the clocks checked first.',
  scene:'Marlow insists a midnight delivery occurred, complete with a receipt and an elevator journey.',
  motivation:'The false account was meant to place Marlow at a delivery that could not have happened at the stated hour.',
  reconstruction:'The freight elevator shut at 23:40 and remained out of service. Finch and Mills were at dispatch, Clarke was on a monitored call, and no duplicate entry badge was logged. The receipt is a genuine earlier print from a ribbon that failed before midnight; the surveillance clock is accurate. That leaves Marlow’s claimed time—the false timestamp—as the invented element.',
  closing:'Holt offers Molly a nearly imperceptible nod. Jake interprets it as a standing ovation.',
 },
 'santiago-puzzle':{
  team:['Molly','Amy','Holt','Jake'],
  teamNote:'Amy treats a tampered crossword as a personal insult to office organization.',
  scene:'The competition crossword displayed darker diagonal cells even though the official printing queue was idle.',
  motivation:'Victor inserted a concealed hint so he could control how the puzzle was solved without visibly reprinting it.',
  reconstruction:'Jake and Charles were outside archives during the relevant window, while Nina was at printer inspection. No replacement print or graphite transfer exists. Backlighting reveals a second impression, and Victor’s recorded delivery of a carbon overlay explains the altered letters on the original paper.',
  closing:'Amy files the restored crossword under “solved” and considers laminating Molly’s certificate.',
 },
 'food-truck-ledger':{
  team:['Molly','Charles','Terry','Jake'],
  teamNote:'Charles wants a culinary investigation. Terry wants everybody to finish lunch before the next shift.',
  scene:'One gourmet tray seemed to disappear from a food truck, leaving a cheaper box with the premium label.',
  motivation:'Gina exploited Boyle’s elaborate ordering system for a swap that would create the maximum possible fuss at lunchtime.',
  reconstruction:'The side hatch stayed latched, the pickup code was never scanned and Marco’s motorcycle was elsewhere. Hitchcock and Scully were visible arguing at the counter. A duplicate label was printed at 12:10, the adhesive was freshly disturbed and Gina corrected the premium tray entry. Those records support an order swap, not a side-door handoff.',
  closing:'Boyle writes a dramatic food-review-style incident report. Terry recommends a shorter version.',
 },
 'heist-one':{
  team:['Molly','Jake','Holt','Amy'],
  teamNote:'The annual heist begins. Holt monitors the rules; Jake and Amy are already arguing over who has a better plan.',
  scene:'The Halloween medal vanished from an intact case just before the precinct’s annual contest opened.',
  motivation:'Amy prepared a perfect opening gambit with an innocent-looking stand-in—precisely the kind of elaborate preparation she loves.',
  reconstruction:'The locked vent was paint-sealed and the glass case was unbroken. Rosa was on corridor duty, Charles was at a meeting, and Jake remained near security during the crucial interval. Amy had rehearsed the award presentation and commissioned the resin duplicate; the residue left inside the case identifies the substitution.',
  closing:'Jake demands a rematch. Holt merely writes down the result and opens the next heist envelope.',
 },
 'heist-two':{
  team:['Molly','Holt','Rosa','Cheddar'],
  teamNote:'Cheddar is considered a very good boy. Rosa is considered difficult to interrogate.',
  scene:'The heist trophy reached the evidence-locker corridor along a route no cart could explain.',
  motivation:'Rosa preferred a quiet, precise diversion while everyone else argued over loud decoys and fake emergencies.',
  reconstruction:'The locker cart was empty long before the alarm, and the false radio message arrived too late. Jake was in the interrogation room, Gina hosted the briefing and Terry was with the K9 handler. The harness clip, pet hair and matching paw prints show how Cheddar moved the prize to the locker latch while Rosa orchestrated the route.',
  closing:'Holt formally reminds everyone that Cheddar has committed no wrongdoing. The heist continues.',
 },
 'heist-three':{
  team:['Molly','Jake','Amy','Gina'],
  teamNote:'It is the final round. Gina is suspiciously calm; Amy has prepared a flowchart the size of a wall.',
  scene:'Two sealed envelopes and a pristine evidence bag appear to contradict every theory about the final prize.',
  motivation:'Gina wanted the ultimate heist reveal to look effortless, even after an unreasonable amount of preparation.',
  reconstruction:'The extra badge swipe was only a system test, the evidence-bag seam was untouched and Jake and Amy remained in the briefing room. Gina handled paperwork outside the locker. Two matching envelopes carried different tamper strips; the transfer adhesive establishes a double-envelope exchange that never required opening the sealed bag.',
  closing:'Holt records the new champion. Jake protests that he had a better plan. Gina says the scoreboard disagrees.',
 },
 'locked-lab':{
  team:['Molly','Rosa','Holt','Amy'],
  teamNote:'Rosa handles the witnesses, Amy verifies the chain of custody, and Holt scrutinizes the surveillance records.',
  scene:'An antique watch disappeared from storage although the door alarm never triggered and the shelves never shifted.',
  motivation:'Keller exploited a technical blind spot in the camera system to make a routine removal look impossible.',
  reconstruction:'The door magnet worked and shelf tags never moved, ruling out a door bypass or shelf rotation. Morris was in an interview, Finch was clocked out, and Patel was at the delivery dock. Keller retained an active terminal session. Identical clock reflections on adjacent frames match a replayed cache segment, establishing the camera loop.',
  closing:'Rosa offers Molly a single approving nod. Captain Holt calls that an exceptionally strong review.',
 },
};
export type DeductionImpact={before:number;after:number;removedSuspects:string[];removedMethods:string[];remainingSuspects:string[];remainingMethods:string[]};
/** Derive eliminations from the actual solver, not from guesses in prose. */
export function nineDeductionImpact(c:NineCase,linkedBefore:readonly string[],deduction:Deduction):DeductionImpact{
 const before=caseCandidates(c,linkedBefore);
 const next=caseCandidates(c,[...linkedBefore,deduction.id]);
 const getSuspects=(grid:typeof before)=>new Set(grid.map(v=>v.suspect));
 const getMethods=(grid:typeof before)=>new Set(grid.map(v=>v.method));
 const olderSuspects=getSuspects(before),newSuspects=getSuspects(next);
 const olderMethods=getMethods(before),newMethods=getMethods(next);
 return {before:before.length,after:next.length,
  removedSuspects:[...olderSuspects].filter(n=>!newSuspects.has(n)),
  removedMethods:[...olderMethods].filter(n=>!newMethods.has(n)),
  remainingSuspects:[...newSuspects],remainingMethods:[...newMethods]};
}
export function nineCasePresentation(c:NineCase):NinePresentation {
 const p=ninePresentation[c.id];
 if(!p)throw new Error('Missing story resolution for '+c.id);
 return p;
}
export function ninePresentationIssues(cases:NineCase[]):string[]{
 const issues:string[]=[];
 for(const c of cases){
  const p=ninePresentation[c.id];
  if(!p){issues.push(c.id+': missing presentation');continue;}
  if(p.team.length!==4||p.team[0]!=='Molly'||new Set(p.team).size!==4)issues.push(c.id+': bad team');
  if(p.reconstruction.length<230||p.closing.length<45||p.scene.length<65)issues.push(c.id+': too-short solution');
  if(!p.reconstruction.toLowerCase().includes(c.method.toLowerCase())&&
     !p.reconstruction.toLowerCase().includes(c.method.toLowerCase().split(' ')[0]))
    issues.push(c.id+': verified method not explained');
  if(!p.reconstruction.toLowerCase().includes(c.culprit.toLowerCase())&&
     !p.motivation.toLowerCase().includes(c.culprit.toLowerCase()))
    issues.push(c.id+': culprit not identified');
 }
 return issues;
}
