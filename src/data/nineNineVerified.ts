/**
 * SECOND EDITION CASEBOOK — hand-authored, evidence-first deduction chains.
 *
 * The previous cases were mathematically unique but sometimes revealed the
 * culprit after one or two broad alibis. Here each link has a precise,
 * *independently necessary* exclusion supported by two specific reports.
 *
 * Every proper subset of links MUST leave multiple full suspect/method
 * hypotheses. Clever/Expert also retain multiple viable suspects until the
 * final connection. A name in one report is not by itself an accusation.
 */
export type VerifiedExhibit=[icon:string,kind:'scene'|'record'|'interview'|'forensics',title:string,text:string];
export type VerifiedLink={
 a:VerifiedExhibit; b:VerifiedExhibit; question:string; inference:string;
 excludesSuspects:string[]; excludesMethods:string[];
};
export type VerifiedCase={links:VerifiedLink[];scene:string;motivation:string;reconstruction:string;closing:string};
const e=(icon:string,kind:VerifiedExhibit[1],title:string,text:string):VerifiedExhibit=>[icon,kind,title,text];
const L=(a:VerifiedExhibit,b:VerifiedExhibit,question:string,inference:string,excludesSuspects:string[]=[],excludesMethods:string[]=[]):VerifiedLink=>
 ({a,b,question,inference,excludesSuspects,excludesMethods});

export const verifiedCases:Record<string,VerifiedCase>={
'yogurt-vanish':{
 links:[
  L(e('🕒','record','Break-room entry clock','The refrigerator alarm sounded at 10:12. A sign-out slip puts Jake in the briefing at 10:10. The delivery cart was not checked in until 10:31.'),
    e('📷','record','Two corridor timestamps','A camera shows Hitchcock at the ground-floor vending machine throughout the 10:08–10:16 window, and confirms the delivery cart was still outside at 10:20.'),
    'Who could not reach the fridge during the disappearance?',
    'Jake and Hitchcock were elsewhere during the alarm. The delivery cart arrived after the yogurt disappeared, so it could not be the removal method.',
    ['Jake','Hitchcock'],['Delivery cart']),
  L(e('🗝️','forensics','Backup key envelope','The Borrowed key theory would require opening the envelope; the backup refrigerator key remains inside it with an unbroken numbered seal. The seal was recorded intact before and after the alarm.'),
    e('🚪','record','Lock service note','The refrigerator has a regular opening handle and a restricted key override. The override mechanism has no new turning marks or recorded service event.'),
    'Was a borrowed key necessary or even used?',
    'The numbered seal was never broken and the restricted override has not moved. A Borrowed key is inconsistent with both independent observations.',
    [],['Borrowed key']),
  L(e('🥛','scene','Warm wrapper and replacement tub','A previously chilled yoghurt tub has been replaced by an older warm container with a different stock code. The replacement sheet identifies the handler only by initials G.L.'),
    e('🧾','record','Shift initials and lunch receipts','The stock ledger says G.L. is Gina Linetti, who signed out the replacement container. Charles was on the cash-register camera paying for lunch at the exact exchange time.'),
    'Whose hands connect the replaced container to the missing yogurt?',
    'The wrapper proves a Fridge swap; the initials and time-stamped ledger connect it to Gina, while the register footage excludes Charles. Gina performed the switch.',
    ['Charles'],[])
 ],
 scene:'Terry discovers an empty labelled fridge compartment; the untouched backup key and oddly warm replacement container suggest this was not an ordinary delivery error.',
 motivation:'Gina treated the bullpen snack inventory as a stage for one of her elaborate pranks. Terry did not appreciate becoming the star of a dairy mystery.',
 reconstruction:'The first pair clears Jake and Hitchcock and rules out the Delivery cart. The second pair eliminates the Borrowed key. Only the final matching stock documents connect Gina to the exchange, while the register camera excludes Charles. Her Fridge swap is the only combination consistent with every record.',
 closing:'Terry reclaims the good yogurt. Jake attempts to name the incident Yogurtgate; Holt declines to approve the paperwork.'
},
'binder-blueprint':{
 links:[
  L(e('📹','record','Garage access log','Rosa’s badge and the garage recording place her below the precinct from 09:00 to 09:25. The morning courier delivered a flat envelope.'),
    e('🧾','record','Visitor and training register','Gina signed into an off-site course at 08:45. The flat envelope was catalogued as A5 stationery; the Disguised delivery theory would require a thick binder that could not fit inside it.'),
    'Which tempting suspects and hiding method contradict the morning schedule?',
    'Rosa was downstairs, Gina was off-site, and the envelope was too small for a binder. Those records exclude Rosa, Gina and a Disguised delivery.',
    ['Rosa','Gina'],['Disguised delivery']),
  L(e('🗄️','record','Archive barcode register','An Archive transfer must produce a barcode scan at the archive door. Amy’s missing binder has no archive scan.'),
    e('🔐','forensics','Archive-door seal inspection','The archive’s binding-cart lock and seal remained undisturbed from 08:30 until inspection. No unlogged binder transfer could pass through the sealed cart.'),
    'Could the binder simply have been transferred to archives?',
    'Neither the required barcode event nor a broken cart seal exists. An Archive transfer would leave at least one of them.',
    [],['Archive transfer']),
  L(e('📎','scene','Scuff inside the lower drawer','The bottom drawer contains a rectangular scuff exactly the size of the missing binder, but the colored tab inserts remain on the desk.'),
    e('📱','record','Desk-key and doorway sequence','The desk key was briefly signed to Jake. A hallway camera puts Charles collecting lunch deliveries when the lower drawer was opened; Jake returns the key minutes later.'),
    'Who could have hidden the binder without leaving the desk area?',
    'The scuff establishes a Drawer switch; the key and doorway record implicate Jake while Charles was occupied with deliveries. The binder never left Amy’s desk.',
    ['Charles'],[])
 ],
 scene:'Amy’s prized, meticulously organized binder disappears just before Holt’s inspection, with its colour-coded dividers left behind like a cruel joke.',
 motivation:'Jake assumed a temporary drawer switch would be harmless. He miscalculated how seriously Amy takes archival precision.',
 reconstruction:'The first reports clear Rosa and Gina and disprove a Disguised delivery. The archive paperwork then eliminates Archive transfer. Only the last pair locates the binder-size scuff and identifies Jake’s borrowed key while Charles is elsewhere. The Drawer switch uniquely explains the scene.',
 closing:'Amy restores the dividers in their correct order. Holt gives Detective Molly an approvingly brief entry in the official log.'
},
'cheddar-collar':{
 links:[
  L(e('🧥','forensics','Coat-rack fibres','The rack was sealed after the formal collar went missing, and neither Jake’s nor Charles’s coat contains its distinctive velvet fibres.'),
    e('📋','record','Pre-photo briefing roster','Jake and Charles attended the pre-photo safety briefing continuously. The evidence locker’s numbered seal was unbroken throughout.'),
    'Which explanations fail when the coats and briefing are compared?',
    'Jake and Charles had no access to the photo table during the exchange, and the undisturbed evidence locker cannot contain the collar.',
    ['Jake','Charles'],['Evidence locker']),
  L(e('🧵','forensics','Loose velvet thread','The collar’s clasp is too wide for the thin coat pocket discovered near the studio. The pocket stitching bears no new strain.'),
    e('🔎','scene','Pocket inspection report','The coat pocket was checked on camera immediately after the disappearance; it was flat and empty, including its inside seams.'),
    'Could the collar have been hidden in a coat pocket?',
    'The clasp cannot fit through the pocket opening, and the empty stitched pocket confirms that a Coat pocket concealment is impossible.',
    [],['Coat pocket']),
  L(e('📸','scene','Costume collar in the photograph','Cheddar wears a lightweight copy of his ceremonial collar. It has a tiny gold star placed where the original has a silver clasp.'),
    e('🎀','record','Prop-order and assistant log','Gina ordered a gold-star prop copy and was the only photo assistant handling the tray during Cheddar’s water break. Amy stayed at the checklist table.'),
    'Who replaced the original collar, and with what?',
    'The unique gold-star copy and Gina’s receipt establish a Photo-prop swap. Amy was at the checklist table, so Gina alone made the change.',
    ['Amy'],[])
 ],
 scene:'Cheddar steps onto the pet-calendar set wearing the wrong collar, prompting Holt to call for a properly documented search.',
 motivation:'Gina decided the original looked insufficiently photogenic and replaced it with a sparkly prop without informing the captain.',
 reconstruction:'The briefing and coat checks clear Jake and Charles, while the locker seal rules out the Evidence locker. A pocket physically cannot hold the clasp. The final photo and prop order identify Gina’s specially marked copy; Amy remained at her desk. This is a Photo-prop swap, not a theft through the locker.',
 closing:'Cheddar gets his dignified collar back and a biscuit. Holt requests that all future dog fashion decisions receive written authorization.'
},
'heist-one':{
 links:[
  L(e('🎥','record','Corridor duty footage','Rosa remained at the hallway checkpoint; Charles was in a separate training meeting throughout the display-case opening.'),
    e('🔩','forensics','Painted-over vent bolts','The service vent screws were sealed with fresh paint before breakfast, and the paint is still intact after the medal vanished.'),
    'Which suspects and route can be removed from the heist map?',
    'Rosa and Charles could not reach the medal during the window. The vent seal makes a Service vent route impossible.',
    ['Rosa','Charles'],['Service vent']),
  L(e('🗝️','record','Captain’s key custody sheet','The physical Office key never left Holt’s signed key ring during the opening ceremony. The glass case also has a rehearsal latch.'),
    e('🔐','scene','Glass-case lock inspection','No scratch, new key mark or broken latch appears on the case. The rehearsal latch was opened under authorized supervision.'),
    'Could the medal have been taken with the office key?',
    'An Office key theft is inconsistent with the continuous custody record and untouched lock; the authorized rehearsal latch is the relevant access point.',
    [],['Office key']),
  L(e('🏅','forensics','Gold resin under the display stand','A tiny star-shaped resin flake sits under the medal plinth. The true medal is metal and cannot shed that material.'),
    e('🧾','record','Replica commission and rehearsal photo','Amy commissioned a gold-resin Medal duplicate with the same star-shaped mould and handled the stand during rehearsal. Jake is visible at the security desk in the same photo.'),
    'Who used the rehearsal access, and why was there resin?',
    'The resin flake and Amy’s mould order prove a Medal duplicate substitution. The photo excludes Jake during the exchange, leaving Amy as the author of the first heist.',
    ['Jake'],[])
 ],
 scene:'A prized Halloween medal is missing from its locked display despite no damage to the cabinet or the nearby vent.',
 motivation:'Amy prepared a meticulous opening trick for the annual competition, confident that her teammates would chase an imaginary break-in.',
 reconstruction:'The corridor video places Rosa at the checkpoint and Charles at his training meeting, while the freshly painted vent seal has never been disturbed. Holt’s Office key remains on his signed key ring, disproving that route without yet identifying who used the authorized rehearsal access. Only the final gold-resin flake, the matching commission and the rehearsal photograph establish Amy’s Medal duplicate; Jake was at the security desk when she switched it.',
 closing:'Holt records the first result. Jake announces that this was merely the warm-up. Amy has already filed a victory memo.'
},
'pontiac-switch':{
 links:[
  L(e('🚚','record','Tow schedule with correction','The purported Tow-truck decoy permit was filed at 14:20; security noticed the replacement car at 14:05.'),
    e('📍','record','Workshop GPS receipt','Marcos checked in at the north workshop from 13:30 through 14:40. The late tow permit cannot put a truck at the garage early enough.'),
    'What do the corrected times rule out?',
    'Marcos was at the workshop when the switch happened, and the Tow-truck decoy permit arrived after the discovery. Neither explains the replacement.',
    ['Marcos'],['Tow-truck decoy']),
  L(e('🔧','record','Service-bay clock punches','Vincent entered the industrial paint booth at 13:49 and his timed safety pass expired at 14:18. No second entry was possible mid-cycle.'),
    e('📹','record','Garage threshold image','At 14:01 the replacement car passed the checkpoint. A continuous booth camera still places Vincent at work at 14:01.'),
    'Who could not have driven the replacement through the gate?',
    'The checkpoint and paint-booth footage overlap, excluding Vincent from the vehicle exchange.',
    ['Vincent'],[]),
  L(e('🔑','forensics','Restricted blank with spiral nick','A recently used garage key blank has a distinctive spiral nick and matches fresh lock-cylinder scratches. It came from a shop using buyer aliases.'),
    e('🧾','record','Key invoice and vehicle-frame report','The alias on the key invoice belongs to Doug Judy; Anita remained at reception on a recorded call. The VIN and tyre tread identify a different entire car, not a Plate swap.'),
    'Who had the duplicate access and what really moved?',
    'The matched key nick and Judy’s invoice establish a Garage key clone. Anita’s call excludes her, while the VIN proves the whole Pontiac was switched rather than only its plates.',
    ['Anita'],['Plate swap'])
 ],
 scene:'A vintage Pontiac held as evidence is secretly replaced with a visually similar vehicle before the morning inspection.',
 motivation:'Doug Judy enjoys an automotive sleight of hand, especially one that forces Jake into an exasperated phone call.',
 reconstruction:'Marcos was at another workshop and the Tow-truck decoy paperwork was late. Vincent’s paint-booth recording also excludes him. The final key blank and VIN records connect Doug Judy to a Garage key clone while Anita is still on reception, eliminating the Plate swap theory.',
 closing:'Jake mutters that the trick was impressive. Holt reminds him that admiration does not constitute an arrest report.'
},
'interrogation-contradiction':{
 links:[
  L(e('🛗','record','Elevator shutdown notice','The freight elevator stopped at 23:40 and did not restart before morning. A delivery was allegedly made after midnight.'),
    e('📍','record','Dispatch-room card scan','Finch signed into dispatch at 23:35 and remained on the authenticated terminal there until 00:19; he could not have made the elevator delivery. The badge reader reports no Duplicate badge swipe.'),
    'Who and which entry trick fail the midnight timeline?',
    'The shut-down elevator makes Finch’s delivery story impossible given his dispatch login, and the reader has no Duplicate badge event.',
    ['Finch'],['Duplicate badge']),
  L(e('📞','interview','Dispatch line recording','Mills reported an urgent call at 00:02. The call recorder contains his continuous voice and the line did not disconnect until 00:20.'),
    e('🎥','record','Hallway camera at 00:07','The camera shows a courier cart moving down the hall at 00:07, while Mills’s phone is still connected in another room.'),
    'Which suspect cannot have escorted the courier cart?',
    'Mills is audibly speaking on a continuous recorded call when the hallway camera shows the cart, excluding him from escorting it.',
    ['Mills'],[]),
  L(e('🧾','forensics','Ribbon sequence and receipt imprint','The Altered receipt theory requires modified paper; the receipt instead contains genuine thermal-imprint ink from a machine that stopped at 23:32. Its written time says 00:11 but an earlier plate has the same serial number.'),
    e('🕓','record','Interview claim and operator access','Clarke is recorded collecting overnight uniforms at 00:11; Marlow was the person who manually amended the delivery ledger. A forensic comparison shows no overwritten receipt paper.'),
    'Which statement was falsified rather than the underlying paper?',
    'The receipt itself was not an Altered receipt: it genuinely predates midnight. Clarke was elsewhere, while Marlow edited the ledger’s False timestamp to invent a later delivery.',
    ['Clarke'],['Altered receipt'])
 ],
 scene:'A witness claims a parcel was delivered at midnight, yet the elevator schedule, receipt and camera logs disagree about when anything moved.',
 motivation:'Marlow moved the recorded time to protect an earlier unauthorized handover, relying on the detectives to focus on the delivery cart rather than the ledger.',
 reconstruction:'The elevator and badge records exclude Finch and a Duplicate badge; the uninterrupted call clears Mills. Neither pair singles out Marlow, because Clarke remains plausible. Only the final receipt serial and operator log place Clarke elsewhere and identify Marlow’s False timestamp, not an Altered receipt.',
 closing:'Holt delivers a one-second approving nod. Jake requests a replay of the moment; Holt declines.'
},
'santiago-puzzle':{
 links:[
  L(e('🖨️','record','Printer queue audit','No replacement page was printed after 09:00. The office system records every page job automatically.'),
    e('🪪','record','Evidence-briefing sign-in','Jake was on a locked video briefing from 09:10 until 09:40, when the tampering occurred; a Reprinted page could not appear without a print job.'),
    'Whose opportunity and which printing explanation are unsupported?',
    'Jake was occupied during the edit. The unbroken printer audit eliminates a Reprinted page as the alteration method.',
    ['Jake'],['Reprinted page']),
  L(e('☕','interview','Coffee-shop receipt','Charles ordered and paid for coffee at 09:23 across the street; the archive alarm window starts at 09:22.'),
    e('📍','record','Street camera and archive time','The street camera shows Charles leaving the café at 09:28. The paper was altered inside the archive before 09:27.'),
    'Which person arrived too late to edit the crossword?',
    'The receipt and street footage exclude Charles; he could not cross the street before the documented archive event.',
    ['Charles'],[]),
  L(e('🔬','forensics','Crossword under ultraviolet light','Under UV light, a translucent second letter impression appears beneath the dark squares. No graphite smear or eraser indentation is present, arguing against Pencil substitution.'),
    e('📦','record','Supplies manifest and visitor assignment','Victor requested a Carbon overlay and signed for it before entering the archive; Nina was on printer inspection until the paper was resealed.'),
    'Which overlay explains the second layer without pencil work?',
    'The UV layer and supply manifest identify Victor’s Carbon overlay while Nina was inspecting printers. The absence of graphite excludes Pencil substitution.',
    ['Nina'],['Pencil substitution'])
 ],
 scene:'Amy’s immaculate competition crossword is mysteriously altered without a corresponding printout.',
 motivation:'Victor inserted a hidden answer pattern to gain an advantage in the puzzle contest, not anticipating Amy’s attention to paper chemistry.',
 reconstruction:'Jake was on a video briefing and no Reprinted page exists. Charles was at the café; neither early lead identifies the editor because Nina remains possible. The UV impression finally matches Victor’s Carbon overlay order, while Nina was with the printers and Pencil substitution leaves no physical trace.',
 closing:'Amy restores the crossword with almost ceremonial care. Detective Molly receives a properly indexed congratulatory sticker.'
},
'heist-two':{
 links:[
  L(e('🛒','record','Locker cart checkout','The last locker cart was checked in at 13:18, 22 minutes before the trophy alarm. It was empty on the return scan.'),
    e('🐕','record','K9 handling log','Terry was with the K9 handler from 13:25 to 14:00. He never left the kennel briefing. A Locker cart could not move a prize during the later window.'),
    'Who and which transport method do the logs contradict?',
    'Terry was at K9 training when the prize moved. The early-returned empty cart excludes a Locker cart transfer.',
    ['Terry'],['Locker cart']),
  L(e('🎬','record','Interrogation-room clock','Jake entered the interrogation room at 13:30. The recording is uninterrupted until 13:55.'),
    e('📹','record','Alarm and corridor footage','The trophy moved past the hallway camera at 13:44. Jake is visible in the continuous interrogation video at that exact minute.'),
    'Who cannot have crossed the corridor with the trophy?',
    'The synchronized video timestamps eliminate Jake; he cannot occupy both the interview room and trophy corridor at 13:44.',
    ['Jake'],[]),
  L(e('🐾','scene','Unusual paw prints','Cheddar’s paw prints form a continuous trail from Holt’s office to the locker latch, with a thin line from a harness clip.'),
    e('🦴','forensics','Harness clip and transmitter log','Rosa ordered a Dog harness with this unique clip, and its tag was scanned beside the locker. Gina was on a broadcasted precinct briefing; the claimed False radio call was transmitted after the trophy reached the locker.'),
    'How did the prize reach the locker without a cart?',
    'The matching harness tag identifies Rosa’s Dog harness route with Cheddar. Gina was in the briefing and the False radio call was too late to produce the movement.',
    ['Gina'],['False radio call'])
 ],
 scene:'The Halloween trophy crosses a locked corridor without any corresponding luggage cart, but Cheddar has been unusually active.',
 motivation:'Rosa prefers a quiet, precision heist over the ridiculous theatrical distractions favored by the rest of the squad.',
 reconstruction:'The cart log clears Terry and rules out Locker cart travel; the interrogation video clears Jake. Gina remains possible until the final records show her briefing activity and a radio message too late. Rosa’s Dog harness clip and Cheddar’s paw prints provide the positive identification.',
 closing:'Holt certifies that Cheddar is an excellent dog. Jake requests that the rules explicitly address canine accomplices.'
},
'food-truck-ledger':{
 links:[
  L(e('📍','record','Motorcycle courier GPS','Marco’s courier bike never entered the parking lot; its GPS trace places him on another route from 12:00 until 12:25.'),
    e('🕛','record','Truck incident clock','The premium tray was labelled at 12:11 and vanished by 12:14. Marco was still 1.4 km away at 12:14.'),
    'Which suspect could not reach the truck when the label changed?',
    'Marco was 1.4 km away throughout the three-minute tray window, so he could not have handled the missing order.',
    ['Marco'],[]),
  L(e('🍔','record','Scully’s meal ticket','Scully ordered his own lunch at the station cafeteria at 12:05 and remained in the checkout line until 12:20.'),
    e('📹','record','Cafeteria register camera','The camera includes Scully holding his untouched receipt at 12:12 while the truck reported the missing premium meal.'),
    'Who was visible somewhere else while the tray disappeared?',
    'The 12:12 camera still shows Scully at the station cafeteria checkout, not at the food truck. The ticket and independent video exclude him from the tray exchange.',
    ['Scully'],[]),
  L(e('🚪','scene','Side-hatch tamper seal','The sealed side hatch has no broken tape, moved hinges or dust disturbance during the lunch service.'),
    e('📷','record','Rear service camera','The rear camera covers the side hatch throughout 12:05–12:20 and records no opening or Side-door handoff.'),
    'Does the rear exit allow a side-door transfer?',
    'The intact tamper seal plus continuous camera recording eliminate a Side-door handoff, but do not yet identify who took the tray through the counter.',
    [],['Side-door handoff']),
  L(e('🏷️','forensics','Sticker alignment and unused code','The premium label on the cheaper box has a fresh adhesive tear; the order was collected without any scanned Pickup code.'),
    e('🧾','record','Corrected printer ledger','Gina initialled a corrected premium-stock entry at 12:12; Hitchcock is visible continuously at the front-counter camera arguing over his own order.'),
    'Which person moved the real tray, and what physical act proves it?',
    'The peeled label and stock correction establish Gina’s Order swap. Hitchcock remained in view at the counter; an unused Pickup code cannot explain the physical sticker transfer.',
    ['Hitchcock'],['Pickup code'])
 ],
 scene:'Boyle’s elaborate lunch order is replaced with a cheaper box wearing the premium tray’s label.',
 motivation:'Gina aimed to create chaos by rearranging food orders while watching Charles take the loss deeply personally.',
 reconstruction:'Marco’s GPS and Scully’s register footage eliminate them separately. The still-sealed side hatch rules out a Side-door handoff but leaves Hitchcock and Gina both plausible. Only the final torn label, register footage and Gina’s corrected ledger establish an Order swap rather than an unused Pickup code.',
 closing:'Boyle gives the replacement sandwich a 0-star review. Terry asks everyone to stop describing lunch as a felony.'
},
'heist-three':{
 links:[
  L(e('🔐','record','Floor assignment roster','Rosa was supervising an adjacent floor from 14:00–14:30; she could not reach the main precinct mail desk.'),
    e('📸','record','Stairwell video clock','At the critical envelope handoff of 14:19, Rosa is still visible beside the same floor checkpoint.'),
    'Who lacked the opportunity to handle the final envelope?',
    'Rosa’s roster places her on another floor throughout the handoff, and the independent synchronized checkpoint footage confirms she never approached the mail desk.',
    ['Rosa'],[]),
  L(e('📋','record','Jake’s briefing log','Jake spoke continuously during a mandatory evidence briefing from 14:08 to 14:26. No breaks or phone calls were logged.'),
    e('🎥','record','Briefing-room recording','At 14:19 Jake is shown leading the demonstration, while the disputed envelope travels through the precinct mail desk.'),
    'Which detective can be cleared using the synchronized briefing?',
    'Jake is continuously visible giving the recorded briefing during the mail-desk handoff, so he could not have carried or exchanged either envelope.',
    ['Jake'],[]),
  L(e('🪪','record','Badge system self-test','The apparent second badge swipe was an automated badge-reader self-test at 14:19, not a human credential.'),
    e('🧪','forensics','Access panel inspection','No copied-card imprint or altered badge-authentication log exists, ruling out the claimed Badge clone. The reader’s test entry matches the manufacturer diagnostic code.'),
    'Does the badge event establish a cloned credential?',
    'The independent manufacturer code and the reader log identify the second swipe as an automatic self-test. No Badge clone was used, leaving the envelopes themselves as the unexplained part of the heist.',
    [],['Badge clone']),
  L(e('✉️','scene','Seal strips on matching envelopes','Two envelopes carry matching handwriting but different security strips. The clear evidence bag nearby has its original untouched seam, contradicting the proposed Fake evidence bag switch.'),
    e('🧷','forensics','Mail desk adhesive and handoff','The transfer adhesive matches a roll signed out by Gina. Amy remains in the uninterrupted briefing recording during the transfer. The bag contains no fresh cut or tape.'),
    'Which paper exchange moved the prize without opening the evidence bag?',
    'Gina used a Double-envelope transfer with the matching tamper strip. Amy never left the briefing, while the untouched bag excludes a Fake evidence bag switch.',
    ['Amy'],['Fake evidence bag'])
 ],
 scene:'The final Halloween prize appears sealed inside two different envelopes, accompanied by a perfectly intact evidence bag.',
 motivation:'Gina designed the final trick as a deliberately low-effort-looking victory over everyone else’s excessively complicated plans.',
 reconstruction:'Rosa and Jake are both cleared by synchronized footage, but Amy and Gina remain equally plausible. A diagnostic badge swipe rules out Badge clone, leaving two physical methods until the last pair: Gina’s transfer adhesive, Amy’s filmed alibi and the untouched bag establish Double-envelope rather than Fake evidence bag.',
 closing:'The heist scoreboard has its champion. Jake insists he would have solved it given another thirty seconds.'
},
'jimmy-jab-medal':{
 links:[
  L(e('🏅','record','Competition briefing roster','Charles remained in a building-wide meeting during the medals rehearsal. The relevant corridor is three floors away.'),
    e('📷','record','Rehearsal camera at 12:08','At 12:08 the medal case is open for official checks, while Charles is visible answering questions in the recorded meeting.'),
    'Which contestant was outside the rehearsal window?',
    'Charles appears in an uninterrupted meeting at the moment the medal moved, so he cannot be the exchange author.',
    ['Charles'],[]),
  L(e('🎤','record','Safety briefing microphone','Jake hosts a mandatory safety announcement from 12:02 to 12:15, and his microphone does not cut out.'),
    e('📹','record','Two-room synchronized footage','At 12:08 Jake stands in the training room while the medal pedestal is being inspected elsewhere.'),
    'Who could not be at the pedestal when it was exchanged?',
    'Jake’s continuous recorded address places him away from the medal while it was swapped.',
    ['Jake'],[]),
  L(e('🛞','forensics','Rolling-chair wheel impression','Wheel marks seen near the display belong to a chair that passed the corridor before the medal was officially checked.'),
    e('🎥','record','Chair-corridor frame sequence','A Rolling chair transfer is impossible on these frames: the same chair carries only a gym bag at 11:47; the medal is still on its plinth in the 12:00 frame.'),
    'Could the rolling chair account for the disappearance?',
    'The Rolling chair passed before the disappearance and held no medal. Its wheel marks are a coincidence, not the hiding place.',
    [],['Rolling chair']),
  L(e('🗃️','scene','Two nearly identical medal cases','The case inventory shows an unused duplicate plinth hidden beside the award station, with a matching pedestal indentation.'),
    e('🪪','record','Authorized medal display access','Amy signed the medal-rehearsal permit and handled the Trophy case at 12:08. Rosa is visible at the front gate, and the Supply closet seal is intact.'),
    'Who handled the duplicate medal display, and where?',
    'The duplicate plinth and signed access identify Amy’s Trophy case switch. Rosa remained at the gate and the sealed Supply closet could not hide the medal.',
    ['Rosa'],['Supply closet'])
 ],
 scene:'The annual Jimmy Jab medal is replaced in plain sight amid a chaotic training-floor competition.',
 motivation:'Amy wanted the ceremony to run so smoothly that she prepared a backup medal case, then made the exchange unnecessarily secretive.',
 reconstruction:'Charles was in a meeting and Jake was delivering a continuous briefing. The chair was empty and too early, so Rolling chair is not the method. Rosa and Amy still have opportunity until the final display permit and gate footage reveal Amy’s Trophy case substitution while the Supply closet stays sealed.',
 closing:'Jake declares the investigation a bonus Jimmy Jab event; Rosa declines to attend the medal ceremony.'
},
'locked-lab':{
 links:[
  L(e('🚚','record','Patel delivery appointment','Patel signed a loading-dock bill for an outside delivery between 16:02 and 16:18. The watch was reported missing at 16:10.'),
    e('📹','record','Loading dock and hall cameras','The same continuous footage shows Patel handling crates outside until after 16:15, not visiting the secured evidence room.'),
    'Who could not physically reach the watch in the required window?',
    'Patel stayed on the loading dock for the entire disappearance window and cannot be the evidence-room mover.',
    ['Patel'],[]),
  L(e('🪪','record','Finch’s building logout','Finch surrendered his building pass at 15:46 and took the exit turnstile; his pass did not reactivate.'),
    e('🚪','record','Exit camera and staff register','The camera shows Finch walking off-site at 15:47, while the secure-room alarm starts at 16:07.'),
    'Whose access had already ended before the watch disappeared?',
    'Finch was off-site, without an activated pass, before the relevant recording window.',
    ['Finch'],[]),
  L(e('🧲','forensics','Unbroken magnetic seal','The storage-door contact magnet passed its built-in self-check on both sides of 16:10. The protective tape has no disturbance.'),
    e('📟','record','Independent door-alarm replay','A separate battery logger agrees with the main door contact for every second. It would flag the displacement required for a Door magnet bypass.'),
    'Could the door alarm have been suppressed with a magnet?',
    'Two independent working detectors exclude a Door magnet bypass, but still leave both camera and shelf techniques plausible.',
    [],['Door magnet']),
  L(e('🕛','scene','Repeating clock reflection','The camera shows the identical second-hand angle and moving shadow in two frames 60 seconds apart; the storage shelf tags did not shift.'),
    e('💻','record','Terminal session and inventory stills','Keller’s account launched a cached replay at 16:08. Morris was speaking on a recorded interview call; untouched shelf labels contradict a Shelf rotation.'),
    'Who controlled the apparent continuous recording?',
    'Keller activated the Camera loop during the removal. Morris was on a continuous call, and the stationary shelf tags rule out Shelf rotation.',
    ['Morris'],['Shelf rotation'])
 ],
 scene:'An antique watch vanishes from a supposedly monitored storage shelf without a broken door alarm or a moved shelf label.',
 motivation:'Keller used a cached surveillance segment to conceal a quick theft, relying on everyone to treat the camera recording as live.',
 reconstruction:'Patel was at the dock and Finch had clocked out, leaving Keller and Morris plausible. The two door sensors eliminate Door magnet without pointing to either person. The final repeating reflection, recorded interview, untouched shelf labels and Keller terminal session establish Camera loop rather than Shelf rotation.',
 closing:'Rosa gives Molly a small nod. Captain Holt calls the evidence trail appropriately rigorous.'
}
};

/** Authoring contract: every listed exclusion must be explicitly supported by
 * the texts that player can read in that pair. */
export function verifiedCaseIssues():string[]{
 const errors:string[]=[];
 const expected=['yogurt-vanish','binder-blueprint','cheddar-collar','jimmy-jab-medal','pontiac-switch','interrogation-contradiction','santiago-puzzle','food-truck-ledger','heist-one','heist-two','heist-three','locked-lab'];
 for(const id of expected){
  const c=verifiedCases[id];
  if(!c){errors.push(id+': missing rewritten case');continue;}
  const expert=['jimmy-jab-medal','food-truck-ledger','heist-three','locked-lab'].includes(id);
  if(c.links.length!==(expert?4:3))errors.push(id+': wrong chain count');
  const pairs=new Set<string>();
  for(const link of c.links){
   const text=(link.a[3]+' '+link.b[3]+' '+link.inference).toLowerCase();
   for(const name of [...link.excludesSuspects,...link.excludesMethods]){
    if(!text.includes(name.toLowerCase()))errors.push(id+': '+name+' not justified in visible chain');
   }
   if(!link.question.includes('?'))errors.push(id+': non-question');
   if(link.inference.length<75)errors.push(id+': weak deduction explanation');
   const p=link.a[2]+'|'+link.b[2];
   if(pairs.has(p))errors.push(id+': duplicate evidence pair');
   pairs.add(p);
  }
  if(c.reconstruction.length<240)errors.push(id+': short reconstruction');
 }
 return errors;
}
