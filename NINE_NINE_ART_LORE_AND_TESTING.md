# The 99 Files — Gameplay, lore and original art

## Phase 2H — Molly likeness, portraits and clearer investigations

- A user-supplied personal reference image was viewed privately to design the original Detective Molly SVG (dark side-parted hair, warm smile, checked blazer, small necklace). **The actual photograph is not committed to GitHub or distributed on the live site**, nor is the poster visible in that photo. The game uses only original vector code.
- Other character portraits now use distinctive original hair, expression, outfits and silhouettes, referencing the squad's traits rather than copying cast photographs.
- All case teams now contain Molly and exactly three plot-relevant characters, plus unique team notes. No redundant artwork subheading remains.
- Each successful link displays the two source exhibits, its explanation, names/methods really removed by the case's hypothesis solver, and possibilities remaining. The first-exhibit anchor is Cozy-only; Clever has no anchor; Expert conceals the unlinked investigation prompt until solved.
- Verified solutions are mini-mysteries: incident, imagined character motivation, evidence reconstruction and a small comedic epilogue, plus exact decisive proof. Motives are fictional narrative flavour, not claims about real episodes.
- Halloween Heist has separate spooky-cute evening colours, stage badges and decorative icons; original puzzles and progression unchanged.
- Test every tier and all Heist stages, inspect a full solution, and check Molly's illustrated resemblance on phone and desktop. Automated tests cannot judge portrait aesthetics.


**Status:** Phase 2G. A fully playable, unofficial fan-made game with 12 original investigations, a three-stage Halloween Heist and a standalone evidence-deduction engine.

**Copyright/rights note:** The Nine-Nine and its characters are references to the television series *Brooklyn Nine-Nine*, not a licensed collaboration. Do **not** assume that giving credit permits copied photographs, TV stills, soundtracks, set designs or actor likenesses. This version uses **original code-drawn SVG chibi badges, CSS evidence-board illustrations and new fictional case narratives**, not TV footage or ripped artwork.

## Content and design principles

- The player is honorary Detective Molly of the Nine-Nine.
- A case must be solved from its visible evidence, *not* prior knowledge of a real episode.
- A case includes four possible suspects, three possible methods, six (or seven) inspectable records, three (or four) cross-document deductions, and an accusation selecting **suspect + method + decisive proof**.
- Paired document links are order-insensitive. Matching two documents unlocks the authored deduction. Wrong links reduce available comparisons and potential stars. Cozy has two completed-link hints, Clever one, Expert zero.
- A case is not complete unless every deduction is linked and the final accusation identifies the only supported culprit, method and decisive evidence. The **candidate-pair solver** verifies exactly one final combination; automated tests verify intermediate deductions reduce possibilities without solving the case prematurely.
- Every deduction carries an authored *precinct cross-check* in the readable exhibits, naming eliminated suspects and methods and explaining why the relevant alibi/timing/paper trail excludes them. Test validators reject names or methods eliminated without source text.
- Completed cases reward only incremental improvement over each case's previously awarded best score. Daily case is fixed per local date and difficulty; practice cases can be replayed. Heist stages 2 and 3 unlock after solving the preceding case, not by spending stars.
- The browser alone stores scores under `mollys-99-files-v1`. The fifth game's data appears in the version 3 Passport export; older version 1 and 2 Passport files still restore without overwriting Nine-Nine progress.

## Inspirations and references (no media copied)

These sources informed the tone and recurring references; case plots are *newly written*, not retellings of aired episodes.

1. **Halloween Heists:** The first annual heist grew from Jake and Holt's wager involving Holt's Medal of Valor; the tradition later returned in progressively more elaborate forms. [Halloween (Brooklyn Nine-Nine), plot overview](https://en.wikipedia.org/wiki/Halloween_%28Brooklyn_Nine-Nine%29); [Halloween Heist overview](https://brooklyn99.fandom.com/wiki/Halloween_Heist_Plots). The game's new three-stage medal, Cheddar decoy and double-envelope finale are **invented**.
2. **The Box (S5E14):** Jake and Holt try different interrogation strategies against a sophisticated suspect. [Apple TV episode synopsis](https://tv.apple.com/us/episode/the-box/umc.cmc.3kj9xtgguqkffuy16tplbhw9e?showId=umc.cmc.4yfyvy7lykncbz22kozi9p2yh), [Prime Video episode list](https://www.primevideo.com/-/nb/detail/0NYHXLURCZHMILHS4K743JCORU). The new *Interrogation Clock* story uses original witness/timestamp evidence.
3. **Doug Judy / the Pontiac Bandit:** recurring witty Jake/Judy rivalry and vehicle crimes; the game's *Pontiac Switcheroo* is an original garage-key deduction, not an episode reproduction. [Season 5, The Negotiation overview](https://www.tvguide.com/tvshows/brooklyn-nine-nine/episodes-season-5/1030239847/).
4. **Jimmy Jab Games:** the squad's bizarre in-precinct competition; the game's medal mix-up is newly invented. [Jimmy Jab Games](https://brooklyn99.fandom.com/wiki/Jimmy_Jab_Games).
5. **Amy's organizational obsession**, Holt's calm formality and corgi Cheddar, **Terry's yogurt**, **Boyle's food enthusiasm** and the Nine-Nine detective bullpen are affectionate character references. Avoid reproducing copyrighted lines, exact plots or promotional artwork.

## Twelve release cases

| Difficulty | Case files |
|---|---|
| Cozy | Terry’s missing yogurt; Amy’s missing binder; Cheddar’s collar; *Heist I — The Missing Medal* |
| Clever | The Pontiac Switcheroo; The Interrogation Clock; Santiago’s Puzzle-Master Panic; *Heist II — Cheddar’s Decoy* |
| Expert | Jimmy Jab Mix-Up; Boyle’s Food-Truck Ledger; The Locked Evidence Room; *Heist III — The Final Reveal* |

**Note:** Heist episodes are accessed via the campaign shelf, not the ordinary practice-case list. The daily pool includes all four cases for each difficulty.

## Key files

- `src/data/nineNine.ts`: all 12 case seeds, deterministic daily selection, two-dimensional candidate solver and exhaustive validation
- `src/data/nineNineAudit.ts`: authored witness/alibi/chain-of-custody notes enforcing evidence provenance
- `src/lib/nineNine.ts`: evidence inspection, linking, scoring, accusation, local saves and staged heist unlocking
- `src/games/NineNine.tsx`: playable corkboard, evidence cards, scenario gallery, interview document, accusation forms and result screens
- `src/components/NineNinePortrait.tsx`: original scalable precinct character-icon illustrations; not official likenesses
- `src/styles.css`: scoped responsive scene presentation
- `tests/nineNine.test.ts`: independent completed-case simulations, wrong evidence pairs, accusation proof, reward caps and save round-trip

## Manual browser play-test checklist

Play one Cozy (yogurt), one Clever (interrogation), one Expert (locked evidence room), and the Heist I→II→III unlock progression. Check portrait rendering, body-text contrast, evidence selection/deselection, correct-pair success, mistaken-pair limits, proof selection, touch responsiveness, browser reload continuity and Passport version-3 export/import. A green TypeScript build and rule suite are not proof that every visual detail is correct on the user's device.
