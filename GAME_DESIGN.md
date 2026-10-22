# Molly's Cozy Arcade — game design & roadmap

## Phase 2K — Pink Rush 2.0 fan-festival, comeback stakes and coupon wallet

**User testing findings:** The first BLACKPINK version was too discography-heavy, too pastel and too easy. Stage and controls were too far apart; the finale needed real spectacle; the decorative scrapbook felt pointless. User authorized a complete refactor plus a one-time real-life coupon system with explicit rules.

- **12 acts in each fresh show:** 2 track memories, 1 chronology, 3 member-solo spotlights, 5 sourced fan-culture questions, 1 colour-lightstick encore. No global difficulty selector. About 70 factual items in rotating source-backed pools, with pets, brand ambassadors, public screen roles, World Cup single Goals, Coachella, Labubu and public career facts. Avoid unverified personal preferences, invented quotes and copied music.
- Black/hot-pink concert stage, original CSS performer silhouettes, animated audience, sound-reactive spotlights, blinking progress bulbs and a stage that's **always visible during the gameplay** using side-by-side desktop and sticky compact mobile layout. Crowd reaction and finale fanfare synthesized from scratch in WebAudio; no samples or licensed music. User can mute sound; sound only starts after user interaction.
- **Actual challenge:** wrong answer extinguishes the previous lit stage segment, steps back to the preceding act and resets it. The player must solve that round again before returning to the still-pending challenge. First act has no previous light to lose. The original per-challenge best-award ledger prevents repeat points. A successful encore triggers a fullscreen performance celebration and a link directly to the rewards.
- **Meaningful tour log:** completed segments unlock clickable mini cards with explanatory notes and link to the wallet. Replaces the noninteractive pastel banner.
- **Coupon state machine:** `locked → ready (one completed new show) → active (one of three blind cards chosen) → redeemed`, or `active → seeking (surrender) → ready (complete another FULL new show)`. `redeemed` is terminal even after further wins. Card permutations are deterministic per earned draw but hidden from the player until selection; other cards are revealed afterward. Exactly three offers: Rouhin learns a short BLACKPINK choreo, Rouhin sings a BLACKPINK/solo song, or Rouhin delivers a one-minute speech praising Lisa. No secret unlock codes are shipped.
- `PinkWallet` is a dedicated reachable arcade view; the Passport always displays the coupon's status, and after redemption contains an archived gift panel that will remain visible. Passport v4 export includes coupons and import merges any existing terminal redemption marker; separate browser-localStorage redemption key prevents accidental rollback by stale backups on the same device. **No true secure one-time enforcement across devices without server-authenticated storage.**
- Browser compatibility: `PinkProgress.version` and `mollys-pink-rush-v1` unchanged; old 8-act active sessions are still usable, while new shows have 12 acts.
- New `tests/pinkRush.test.ts` exercises 12 acts, ~70 question checks, loss of lights, reclaiming prior act, star anti-farming, coupon selection, surrender and replay, irreversible redemption, old 8-act saves, stale backup safety.

## Phase 2J — Pink Rush! (implemented) and Brave (approved docket only)

The user approved two new concepts. **Pink Rush!** (Game 06) launched first, while **Brave: The Wisps' Trail** (Game 07) must remain explicitly **Coming Soon** pending a separate future implementation green light.

### Pink Rush — BLACKPINK memory-lane concert
- **Single comfortable BLINK challenge level: no Cozy/Clever/Expert picker.** These puzzles should feel like nostalgic fan recognition, not obscure trivia or an investigative exam. No timers or game-over conditions.
- Eight-round show loop per daily or practice concert: three group-song guesses from 20 crafted prompts; two three-release chronology puzzles from 8 timelines; two member solo-career memories from 12 hand-crafted prompts; final original four-lightstick pattern sequence with eight possible patterns and unlimited replay.
- Factual song/album/solo details are checked against the official BLACKPINK YG discography and identified solo references, covering debut 2016 through DEADLINE 2026. Original descriptions, no lyric transcriptions or borrowed audio/video/image files.
- Stage grows more spectacular after every victory: four silhouette performers, pink spotlights, riser lights, lightstick crowd, confetti and a customized VIP Molly finale. Original CSS illustrations and optional synthesised tones; no licensed media.
- Wrong answers gently lower the score (60 − 9 points per mistake, minimum 22); player always progresses after finding the answer. Maximum 480 for eight perfect rounds. Date-fixed daily show and repeatable practice show; best-award ledger prevents repeated practice star farming.
- New browser key `mollys-pink-rush-v1`. Passport v4 saves all six game states and adds VIP BLINK, Encore Superstar and Perfect Comeback stamps; old v1/v2/v3 backups remain accepted without clearing newer games. See [Pink Rush design and references](PINK_RUSH_GAME_AND_SOURCES.md). Automated `tests/pinkRush.test.ts` simulates complete shows and source-data invariants.
- **Next QA:** have user and BLINK beta testers play complete shows; check difficulty *feel*, comfort on phones, timeline wording, finale satisfaction and optional audio. Correct any factual mistakes against official discography.

### Brave — The Wisps' Trail
- Future six-chapter interactive storybook adventure in the Scottish Highlands, with pathfinding as the backbone, strategy-based archery trials and a final tapestry reconstruction. 18 handcrafted levels (three/chapter), personal chapter map, evolving environmental rules and actual solver-verified routes.
- Six approved chapter locations: Highland Games, Follow the Wisps, Witch’s Workshop, A Bear in the Castle, Mor’du’s Shadow and Mend the Bond.
- Never recreate Disney Pixar copyrighted film stills, artwork, recorded soundtrack or dialogue. Build original storybook visuals; request user green light before any implementation. Complete docket is [BRAVE_THE_WISPS_TRAIL_PLAN.md](BRAVE_THE_WISPS_TRAIL_PLAN.md).

## Phase 2I — Mystery construction standards (implemented)

A mathematically unique case is **not automatically an interesting or fair detective mystery**. Every one of The 99 Files' 12 cases now follows these standards:

1. Four suspects and three possible mechanisms start as twelve plausible hypotheses. Each evidence connection requires cross-reading **two distinct, freely inspectable documents**. Every exclusion must be grounded in those actual documents, not an invisible scripted list.
2. **Every link is essential:** the intersection of any proper subset of the case's three or four links must leave more than one complete suspect/mechanism combination. Only all three (Cozy/Clever) or all four (Expert) may isolate the joint answer.
3. For Clever and Expert, the intended natural order must leave **at least two plausible culprits** immediately before the final, incriminating link. Cozy leads a little more clearly and highlights a suggested source document.
4. Difficulty comes from the *logic and linguistic subtlety* of the case, not from hiding question text. Expert's questions are now always visible. Complete evidence is never withheld and every successful connection has an intelligible written deduction.
5. Each result offers a short original crime reconstruction and cites the exact decisive report pair. The evidence-first source has been reviewed separately from the computational solver.

Added `src/data/nineNineVerified.ts`, exhaustive formal tests and safe migration for unfinished older browser saves. Revised Holt sticker to a properly shaved head and recognisable facial geometry. No official cast images or audio copied. Molly's private photo remains unpublished.

## Phase 2H — Evidence quality and portrait redesign (implemented)

Nine-Nine uses original, individualized chibi sticker portraits; private user reference photos are never checked into GitHub. Detective Molly appears first in every case-specific squad. Cozy offers one suggested first exhibit, two optional hints and generous attempts; Clever uses questions without direct evidence anchors; Expert must uncover four sealed investigation threads, with no hints and stricter guessing. At every difficulty the full reports remain readable and completed deductions reveal paired document sources plus deductions, eliminated suspect/method options and the remaining candidate count from the actual solver.

Every case now has an original four-part story resolution (scene, motive, forensic reconstruction and squad reaction). The Halloween Heist mode is a visually distinct nighttime precinct world featuring amber/gold, pumpkins, purple and festive evidence. The same all-case uniqueness tests, score ledgers, save keys, Passport v3 schema and original art-only content policy are preserved.


**Launch target:** a meaningful birthday experience by November 13, 2026. **Evergreen goal:** a real puzzle website to revisit all year.

## Design pillars

1. **Every game feels different.** Do not reskin the same trivia engine.
2. **Cozy, not childish.** Soft pastel colours, playful feedback, responsive touch targets, gentle motion.
3. **Fun even without knowing the relationship.** Most puzzles are standalone; personal touches are saved for the Birthday Quest.
4. **Small sessions, lasting interest.** A daily challenge plus free play, without punitive mechanics.
5. **Honest progress and rewards.** Never display an unimplemented feature as playable.

## Game shelf

| Game | Core interaction | Status |
|---|---|---|
| Guess Who? | Free-text answer to gradually revealed clues about fruits, vegetables and food | **Milestone 1 playable** |
| Toon Rewind | CRT-style channel surfing, visual prop recognition and tunable signals from Cartoon Network India c. 2000–2010 | **Milestone 2B playable** |
| The 99 Files | Hands-on detective evidence board, source-grounded deductions, culprit/method/proof accusations and a special three-stage Halloween Heist | **Milestone 2G playable** |
| Bazinga! Lab | Original room-map, character-sticker seating puzzles with BBT-flavored story rules, plus the preserved classic seating edition | **Milestone 2E Room Adventures playable** |
| Pink Rush! | Untimed BLACKPINK track recognition, era chronology, solo spotlights and a lightstick finale; one friendly BLINK challenge level | **Phase 2J playable** |
| Little Connections | Find four hidden groups of four words, using four mistakes and one-away feedback | **Milestone 2A playable** |

Future possible packs: Bollywood, historical photographs, semantic word guessing.

### Guess Who? rules (v1)

- One daily riddle based on the local date; scores persist per day.
- Practice mode contains five randomly selected distinct riddles.
- Four clues, revealed progressively. Player begins with one.
- Four free-text guesses; regional names and alternate spellings accepted.
- Score: 120 stars minus 20 for each extra clue and 10 for each earlier incorrect guess, minimum 30 for a correct answer; 0 for a missed or skipped puzzle.
- Daily win streak tracks **daily** riddles only, not practice.
- Completed puzzles reveal a fun fact and a next-step (practice) or the daily result.

## Phase 2C — Passport & deeper games

### Implemented
- **Arcade Passport:** scrapbook view with 10 achievement stamps, unlocked from real saved statistics; per-game scores, stars, streaks and records.
- **Manual backup/import:** a JSON download covering all three independently saved games and an explicit-confirmation restore workflow. User data stays in local browser storage; optional Supabase sync is *not yet connected*.
- **Three challenge tiers per game:** Cozy (1×), Clever (1.5×), Expert (2×). Each game remembers a preferred difficulty in local browser storage.
- **Guess Who?**: Cozy 5 guesses/4 clues, Clever 4/4, Expert 3/3; dedicated difficulty-curated practice pools and 48 hand-written riddles.
- **Little Connections:** 28 curated boards with graded practice; Cozy 5 mistakes, Clever 4, Expert 3. One-away hints are disabled in Expert.
- **Toon Rewind:** 35 Indian-CN-era shows, curated expert narrative hints; Cozy keeps four choices and familiar imagery, Clever uses subtler clues and six options, Expert requires a typed cartoon title and allows one wrong answer.
- **Toon artwork:** a small original, show-specific poster assembled from motif artwork, with success transition; on failure, animated television interference transitions to the solution. These are **not copyrighted character stills**.
- **Anti-farming:** per-puzzle best-awarded stars are stored; replay awards only the improved difference rather than full repeated points.
- **Backward compatibility:** existing v1 browser saves are imported on load, previous scores preserved, completed rounds seeded into the best-reward ledger; historical daily puzzle schedules from before 2026-10-22 stay stable.

### Next work
- Real browser QA, especially on narrow phone screens and restoring a backup into a clean profile.
- More authored level packs over time rather than flooding the game with low-quality filler.
- Optional, authenticated Supabase synchronization if needed for cross-device durability; schema and RLS/security review first.
- Licensed or permissioned show/character images can be plugged into individual reveal cards later; **never scrape and hotlink random copyrighted screenshots**.
- Remaining Phase 2 games and Birthday Quest & coupon wallet are not in this release.

## Phase 2D — Difficulty consistency & Bazinga! Lab

- **Uniform difficulty lifecycle (implemented):** choose Cozy/Clever/Expert before the first meaningful action; after play begins the game's difficulty is locked. A completed *daily* result is never overwritten by selecting a new tier. Selecting a different difficulty at the end of a practice session starts a new practice puzzle/session; selecting a different tier before beginning immediately starts a properly graded fresh one. Preferences are stored per game.
- **Bazinga! Lab (implemented):** a standalone, non-quiz, spatial constraint puzzle inspired by *The Big Bang Theory*. Players assign recognizable characters to chairs, reading a set of seating rules. Selecting a character then a seat moves/swaps them; tapping an occupied seat can clear it. Failed checks indicate how many rules pass; the correct order is revealed at the end.
- 18 authored scenarios: six Cozy cases with 4 guests, six Clever cases with 5, and six Expert cases with 6. Each set's correctness and **unique solution** are exhaustively verified against every possible permutation in automated tests.
- Cozy: four checks and two locking seat hints. Clever: three checks and one hint. Expert: two checks, no hints. Stars = max(50, 180 − 25×prior incorrect checks − 30×hints used) × 1, 1.5, or 2. Full loss = 0.
- One deterministically selected case per day **and** difficulty tier, persisted by local date (only the chosen tier counts as that day's played result); unlimited non-repeating practice cases in the selected pool. One best-awarded score per case ID prevents duplicate farming.
- Integrates into the game shelf and cumulative four-game Passport totals, with two new unlockable achievement stamps. New save key: `mollys-bazinga-v1`. Passport exports now use version 2 with all four games; older version 1 backups can still be imported without erasing the new game's data.
- Asset note: stylized characters are original emoji and hand-coded CSS, not copied TV show character artwork or footage.
- **Future difficulty refinements:** fresh hard-specific narrative puzzle packs, optional explicit confirmation before resetting a pristine practice board, mobile/keyboard tests, and accessibility focus improvements.

## Phase 2G — The 99 Files and Bazinga finishing pass (implemented)

**Job A: Bazinga**
- Removed the duplicated “Original schematic · not a studio blueprint” micro-disclaimer from the game map title bar. The existing bottom-of-page unofficial/original-art notice remains.
- All **18** room adventures have individually styled clue-panel titles and flavorful subtitles (e.g., The Lunch Protocol, the Roommate Agreement *only* for apartment 4A, the Mystery Dossier, and Bernadette's House Rules).
- Story-sensitive but non-spoiling **seat labels** for all 18 scenarios: Row A/Row C seats for the cinema, tabletop positions for Caltech/Howard's, spatial couch/end-of-sofa seats for the apartments. Names never reveal an occupant. Icons/floor plans, character stickers, Classic Lab, award ledgers and saved progress remain untouched.
- Automated tests now cover panel-title completeness and uniqueness/spoiler checks for seat labels, as well as the old exhaustive seating solver, geometric neighbour links, prop clearance and score/hint logic. A live browser review by the owner is still pending.
- For future puzzle-writing polish, continue distinguishing **factually sufficient clue sets**, **human-readable natural language**, and **engaging deduction depth**. Unique-solution validation alone cannot guarantee the user enjoys the clues.

**Job B: The 99 Files**
- Fully playable fifth arcade game. Mechanic is **evidence inspection + pairing related exhibits on a corkboard + a three-part accusation (culprit, method, decisive proof)**. Not another trivia or seating game.
- **12 original investigations** (four Cozy, four Clever, four Expert); each contains four suspects, three candidate methods, six or seven original evidence records, three or four paired-document deductions, and a case-specific fictional culprit/method/proof.
- A chain-of-evidence validator verifies each deduction eliminates at least one candidate, **all** the deductions uniquely determine the answer, the penultimate deduction leaves multiple hypotheses, and every excluded person/method is explicitly supported by the contents of its paired exhibit records. Playthrough tests submit the actual winning accusation for every case.
- **Hybrid Halloween Heist**: three separate original cases (Cozy → Clever → Expert) with a sequential campaign unlock, plus **nine independent practice cases**; daily cases rotate through all twelve with difficulty restrictions.
- Lore: an homage to the Halloween Heists and Holt/Jake competition, Doug Judy and the Pontiac Bandit, the interrogation-room atmosphere of *The Box*, Amy's binders, Holt's corgi Cheddar, Terry's yogurt, Charles Boyle's food, and the Jimmy Jab games. All plots, clues and dialogue are original; no episodes or actual broadcast dialogue copied.
- Original **vector detective portrait badges**, warm precinct desk/evidence sleeves, cream paper documents, corkboard deductions and playful but restrained detective-style reactions. Responsive mobile layout and keyboard buttons.
- Daily and case browser, 1x/1.5x/2x star multipliers, grade-specific wrong-pair limits/hint limits/final accusation attempts. Incremental personal-best rewards disallow replay star farming.
- Browser save: `mollys-99-files-v1`; Passport now includes five games and three new detective stamps. **Passport JSON export format v3** includes Nine-Nine, while existing v1 and v2 backups still import and leave absent new game data intact.
- Asset/lore and manual QA records: `NINE_NINE_ART_LORE_AND_TESTING.md`; code: `src/data/nineNine.ts`, `src/data/nineNineAudit.ts`, `src/lib/nineNine.ts`, `src/games/NineNine.tsx`, `src/components/NineNinePortrait.tsx`; tests: `tests/nineNine.test.ts`.
- **Next play-test:** user to investigate one Cozy case, one Clever interrogation, one Expert, and verify Halloween Heist 3-stage unlocking and Passport v3 backup from the browser. Specifically check whether each deduction's visible testimony *feels fair*, beyond mechanically satisfying the source-text audit.

## Phase 2F — Higher-quality BBT deduction and presentation (implemented)

- Hand-curate the 18 episode stories and clue premises rather than revealing Sheldon's seat or automatically mapping guest → one unique location. Research calibrates details: the special couch cushion is comfortable across seasons because of temperature, cross-breeze and screen geometry; it is **not** uniformly a no-draft location. Wednesday comic-book/Halo nights and Roommate Agreement rituals are used as creative references, not as lifted teleplay dialogue.
- Generator prioritizes informative **multi-person spatial relationships** and targets moderately revealing constraints instead of greedily selecting maximally narrowing properties. Uniqueness is *still exhaustively proven*. Expert-specific tests measure clue ambiguity and reject too many direct single-seat clues. Cozy remains intentionally more approachable.
- Room art has enlarged 650×500 floor plans, large original TV/window/furniture plaques, improved decorative prop spacing and regression tests rejecting collisions with interactive seats.
- A voluntary connection overlay draws the actual neighbours specified by the room engine so geometric clues (including diagonal adjacency) are interpretable without arbitrary guessing. Clever/Expert feedback no longer gives away pass/fail per clause; Cozy still does.
- Every result card uses **new original, restrained Sheldon-style reluctant praise** on success; on loss the reaction is simply “Bazinga! You lose!” with an optional expandable answer. Preserve the previous Classic Lab unchanged and do not clear saved scores.

## Phase 2E — Bazinga! Room Adventures (implemented)

**Goal:** replace generic “linear seat order” as the default with a location-driven, explicitly *Big Bang Theory*-inspired episode adventure. Retain the original Classic Lab for nostalgia and backward-compatible saves.

- **Room map families:** Apartment 4A (Sheldon's spot), Penny's Apartment 4B (cushion/sick guest), Howard & Bernadette's house (dinner table), Raj's apartment (murder mystery), Caltech cafeteria (lunch seating), Caltech lab (workstations), Stuart's comic shop (new issue/game night), Pasadena movie theatre (Star Wars screening). These are original **schematic** stage-inspired environments, not exact production floor plans.
- **18 brand-new episodic cases:** six Cozy (four assigned guests), six Clever (five), six Expert (six); each scenario has authored lore-inflected conditions plus additional true spatial clues. 18 Classic Lab cases remain accessible separately.
- **Geometry-aware logic:** room locations are % coordinates and stable seat IDs, with public tags (sofa, spot, window, TV sightline, unpleasant draft, uncomfortable stool, kitchen, snacks, exit, lab-safety). Rules include seat traits, exclusions, next-to/not-next-to measured in two dimensions, relative leftness, proximity to fixed room objects, and maximum distance from another character (e.g. Sheldon vs sick Raj). **All cases are proved unique by exhaustive permutation search in the test suite.**
- **Discoverable information:** accessible on-map chair labels, visible furniture props, and a collapsible room guide listing seat properties mean no hidden metadata is required to solve a puzzle. A wrong check returns a rule tally; Cozy/Clever can show per-clause pass/fail, while Expert keeps that hidden.
- **Character art:** eight bespoke hand-coded vector sticker portraits with original styling (not actor stills or copied official artwork). Losing reveals a large Sheldon sticker and a “Bazinga!” reaction; winning shows an original group illustration and a distinctive, newly written Sheldon-style compliment.
- **Episodes and difficulty:** daily puzzle and freely browsable practice gallery, variable checks (4/3/2) and seat hints (2/1/0), higher star multipliers (1×/1.5×/2×), and best-awarded-score rewards only. Difficulty locks after first placement/hint; next practice episode can use a new tier.
- **Save migration:** same `mollys-bazinga-v1` key; optional `worldDaily`, `worldPractice`, `worldRecent` properties added, leaving legacy `daily`, `practice`, `recent`, `stats` and `bestAwards` intact. Passport v2's four-game data export automatically carries optional new fields. Old backups remain importable.
- **Rights strategy:** original art/locations/short dialogue, non-affiliated fan homage, no BBT stills or theme music. Details and reference URLs in `BAZINGA_ART_AND_SOURCES.md`.
- **Post-release QA:** actual play-test in desktop and touch browsers, narrow-screen map panning, keyboard/tab focus, readability of venue details and clue challenge balance.

## Birthday-only experience (Milestone 3, not currently implemented)

- Each **November 13**, offer a curated Birthday Quest that links several mechanics.
- Three unique coupons awarded through that year's quest, randomly selected from a controlled pool; rewards should be obtainable without perfect scores.
- Example coupons: a 15-minute massage, one question that must be answered honestly, cook a meal of her choice, curate a snack box.
- Coupon wallet states: available, redemption requested, redeemed. Redemption via a prefilled message to the giver, then acknowledged as fulfilled.
- Past earned coupons remain viewable after November 13. A new event may be authored for later years.
- Important: GitHub Pages + local storage alone **cannot securely enforce one-time coupon redemption, ensure cross-device synchronization, or prevent manipulation of date-gated content**. Decide between a trust-based wallet and a small backend before implementing.
- Do **not** put private letters, sensitive photos, or genuine secrets into publicly deployed static files.

## Development milestones

1. **Foundation:** React / TypeScript / Vite app, GitHub Pages workflow, home screen, Guess Who?, local progress, documentation.
2. **Game variety:** Little Connections (2A), Toon Rewind (2B), the Phase 2C Passport expansion, and Bazinga! Lab (2D) are playable; The 99 Files and Pink Rush remain. Fact-check specifically **Indian CN broadcast history**.
3. **Birthday Quest and coupons:** annual event, surprise reveal, wallet and redemption rules. Decide on a secure backend only if required.
4. **Polish and QA:** test on phones, keyboard use, screen readers, scoring, storage failures, new-day rollovers and GitHub Pages URL.

## Little Connections (Milestone 2A)

- A curated set of 16 original boards, each containing 16 unique words divided into four groups.
- Groups appear in four tiers (yellow, green, blue, purple). Solved groups move into coloured answer strips.
- Four incorrect submissions are allowed. Matching 3 of the 4 members of an unsolved group triggers a "One away" message.
- Repeating an identical wrong set never costs a second mistake.
- Full success earns 180 stars, minus 30 per incorrect attempt. A failed board earns zero.
- A daily board rotates deterministically without adjacent-day repeats and is persisted by date. Practice selects a new board, avoiding the five most recently started.
- Existing Guess Who? browser data uses a separate storage key and remains intact. The arcade lobby displays combined solved counts and stars.
- Content, engine, UI, and automated tests live in independent modules; more boards can be added without rewriting rules.

## Toon Rewind (Milestone 2B)

- Retro cartoon-TV layout with an interactive tuning remote and symbolic visual clues, without licensed television frames.
- 21 CN India classics and Toonami-era shows, chosen for Indian broadcast relevance (2000–2010) rather than American debuts.
- Six transmissions per session, each with four possible shows and two incorrect guesses available.
- One clue to start; tune reception twice to reveal the remaining two picture motifs. Score up to 120 stars for a first-signal identification, minus 25 for each extra motif and 20 per earlier incorrect guess.
- One fixed daily broadcast for each local date and free six-show practice sessions across all shows, early 2000s, or 2005–2010.
- Progress saved under an independent browser-local key; stars and identified shows contribute to the arcade lobby's combined totals.
- Asset strategy: original emoji motifs and CSS, not reproduced CN artwork, copyrighted scenes, character portraits, theme music or logos.
- Programming-history references: https://en.wikipedia.org/wiki/Cartoon_Network_(India) and https://en.wikipedia.org/wiki/List_of_programmes_broadcast_by_Cartoon_Network_(India).
- The show catalogue is an initial curated set and can be improved after the user's India-specific nostalgia feedback.

## Arcade Passport (implemented in Phase 2C)

Implemented as a personal scrapbook with achievements, total stars, games solved, daily streaks, and per-game records. Manual export/restore allows moving progress between devices; as of Phase 2D it covers **four games** (v2), and imports prior v1 three-game backups. The eventual birthday coupon wallet remains a separate gift system, not a purchase mechanic. No login is needed for basic play.

## Future engineering considerations

- Extract independent React components, reusable game engine interfaces and dedicated puzzle content packs as each game matures.
- Track question IDs, schema versions and migrations to avoid breaking saved progress after content updates.
- Support optional reduced motion, offline mode / PWA and player-selected sounds after the core games work reliably.
- Expand puzzle packs rather than replacing entire game code. Add reproducible logic tests and browser tests.

## Session resumption

**Read `DEVELOPMENT_HANDOFF.md` first.** It records the exact GitHub release milestone, testing commands, priorities and compatibility notes for the next session. This roadmap is conceptual; the handoff contains operational instructions.
