# Molly's Cozy Arcade ✿

## Phase 2L — Pink Rush final trivia and concert-sound polish (22 October 2026)

Player testing caught overly obvious song clues and implausible alternatives (especially the Selena Gomez/Ice Cream question), performer clues which named potential answers in the question, and frequent repeats over three concerts. The full question bank has now received an **editorial clue-and-distractor audit** and grown from about **70 to 87** verified public-fact entries. The reviewed prompts are in `src/data/pinkRushEditorial.ts` and 17 additional sourced fan-life questions in `src/data/pinkRushFanExtra.ts`. New practice shows **prioritize unused songs, solo and fan-culture questions**, deliberately rotating away from recent concerts until each category is exhausted. Daily selections remain fixed for a date; existing completed and in-progress saves remain intact.

The fake synthesized "crowd" has been replaced with **a real public-domain recording of cheering/clapping** from [Wikimedia Commons: *Clapping hurray* (starlite / PDsounds)](https://commons.wikimedia.org/wiki/File:Clapping_hurray.ogg). The recording streams directly from Wikimedia Commons when a right answer triggers a reaction, at increasing volume as the stage fills; a miss cuts the cheering. The old misleading crowd synthesizer is gone. Only the existing original musical finale stinger remains synthetic. The sound control is a **single small corner icon**. External sound needs network access and browser audio support; visual stage cues work without it.

The in-game footer now says simply: “Unofficial fan-made BLACKPINK tribute, researched using YG’s official discography and independent sources.” No boilerplate about original graphics, licensing exclusions, browser saves or game difficulty appears there.

Additional automated tests check for clue/answer leakage, comparable collaboration distractors, **four consecutive fresh practice concerts with no repeated regular question**, reliable score/reward preservation, and all existing game regressions. Pink Rush’s established coupon and finale mechanics are unchanged. Brave remains Coming Soon.

## Phase 2K — Pink Rush 2.0 · Fan Festival + One-Time Reward Wallet

**Latest update (22 October 2026):** Pink Rush has been redesigned as a **12-act BLINK fan festival** with a black/hot-pink concert identity, stage and question controls visible together on desktop and phone (compact sticky stage on phones), original synthesized crowd/cheer pulses and a much stronger fullscreen encore finale. **It still has no difficulty picker.**

Each fresh show features **2 song rounds, 1 era-ordering round, 3 solo-artist spotlights, 5 fan-culture challenges and 1 repeatable encore pattern**. The fan-life pool adds 30 source-checked public facts about pets, fashion ambassadors, HBO acting appearances, 2019/2023/2025 Coachella moments, LISA's official FIFA World Cup 2026 collaboration with Anitta and Rema, and the Labubu craze. About **70 independently authored challenges** now rotate in daily and practice shows. The old decorative scrapbook is replaced with a clickable live tour-log of unlocked memories.

Correct answers pulse the stage and generate an original electronic cheer; a wrong answer **switches off a previously lit stage segment and moves Molly back one round**, which she must clear again to resume. Completed personal-best scores are never re-awarded on replay. Mobile players can see both the encore colour pads and active stage in a compact layout. Real recordings are **not** embedded or streamed.

**Molly's BLINK Wallet:** The first completed new concert unlocks three hidden gift cards; she selects **one** and the remaining prizes are revealed afterward. Options: teach Rouhin a BLACKPINK/solo choreo, have him sing one song, or demand a **one-minute speech praising Lisa**. Before redemption, she can surrender the coupon to play a new full show for a new blind draw. After clicking **Redeem** it becomes a permanent **redeemed** Passport keepsake and the game will not issue another coupon. A separate local redemption marker and Passport import reconciler prevent accidental reissuance from older backups in the same browser. This is browser-local, **not tamper-proof/cross-device entitlement security**; implementing that will require a server-backed user identity and protected reward records.

Current save key remains `mollys-pink-rush-v1`; Passport remains **v4** and accepts v1–v3 backups. Legacy in-progress eight-round concerts remain playable. [Full architecture, test coverage, source references and redemption rules](PINK_RUSH_GAME_AND_SOURCES.md).

**Brave: The Wisps' Trail** stays **Coming Soon** only; see [the approved six-chapter design](BRAVE_THE_WISPS_TRAIL_PLAN.md). Work on the Brave code requires a separate green light.

## Phase 2J — Pink Rush! is playable; Brave is Coming Soon

**Pink Rush!** joins the arcade as Game 06: a fully playable, **no-difficulty-selector** BLACKPINK memory-lane concert. Molly answers three track memories, arranges two discography timelines, identifies two solo member spotlights and completes an original visual lightstick encore. Eight rounds illuminate an original four-member stage before a personalized grand finale. Each show is untimed and impossible to lose; wrong answers simply reduce that round's star score. The show spans SQUARE ONE (2016) through DEADLINE (2026), with verified official release facts rather than copyrighted lyric/audio clips.

**Brave: The Wisps' Trail** is Game 07 on the **Coming Soon** shelf, with a six-chapter, 18-level Highlands pathfinding, archery and tapestry adventure drafted in [the Brave development docket](BRAVE_THE_WISPS_TRAIL_PLAN.md). Do **not** implement it until the user greenlights that game separately.

The Passport exports six games in **format v4** and can still import versions 1/2/3 without replacing progress from games absent in those older backups. Three BLINK stamps have been added. [Pink Rush design, references, testing and rights notes](PINK_RUSH_GAME_AND_SOURCES.md) explain the release.

## Phase 2I — The 99 Files, redesigned for real deductions

The Nine-Nine's 12 cases were audited for a more fundamental quality standard than mere unique solvability: **every connected pair of evidence must be necessary** for the complete culprit-and-method conclusion. Cozy cases remain approachable; Clever and Expert retain multiple suspects until their final decisive deduction. The evidence text and mini case stories have been comprehensively rewritten; no long alibi list may reveal one remaining culprit on its own. The player always sees the full question prompts (including Expert), and evidence-pairing links carry the detective reasoning.

Unfinished cases from older saves are safely restarted when reopened, because their document connections have changed; **awarded stars, solved rounds, Heist progression and earlier Passport backups are preserved**. Holt's portrait has also been refined to the correct short-shaven/bald look, with Molly's illustration unchanged. The canonical source is `src/data/nineNineVerified.ts`; audit tests are in `tests/nineNineLogicAudit.test.ts`.

## Phase 2H — Detective Molly & Nine-Nine polish

Detective Molly (an **original SVG portrait inspired by a private reference photo, not a publicly stored photo**) now leads each case-specific four-person squad, alongside redesigned and more recognizable Nine-Nine character stickers. Successful evidence links explain exactly which source reports were compared, which suspects and methods the logic excludes, and how many candidate hypotheses remain. Cozy highlights the starting evidence card; Clever does not; Expert hides unsolved investigation questions and requires four evidence connections.

Every one of the twelve cases has a concise four-part story resolution. The Halloween Heist has a visually distinct twilight-purple, pumpkin-and-amber festival theme, with the same three-stage campaign logic and saved progress. No existing saves, games, awards or Passport import versions have changed.


A tiny, cheerful puzzle arcade built as a birthday gift, and designed to be fun all year long.

**Status: Milestone 2J — Six playable games with Pink Rush!** The 99 Files remains evidence-audited; Bazinga retains contextual room layouts and stories. Brave appears as Coming Soon. The November 13 Birthday Quest and coupon wallet remain separate future work.

## Play locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

For a production check:

```bash
npm run build
npm run preview
npm test
```

## Hosting via GitHub Pages

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds and publishes the website on every push to `main`.

For the first deployment, open the repository's **Settings → Pages** and select **GitHub Actions** under *Build and deployment → Source*. The workflow publishes the `dist/` directory to:

**https://rouhin1997.github.io/Molly-s-cozy-arcade/**

(The link becomes live once GitHub Pages is enabled and the workflow succeeds.)

## What's playable so far?

- A responsive arcade lobby showing all six games, with **five playable**.
- **Guess Who?** with a daily mystery and 5-round randomized practice picnics.
- Four progressive clues per mystery (three in Expert), difficulty-based guess limits, aliases and fun facts.
- 48 original food / fruit / vegetable riddles, with lots of familiar Indian names.
- **Little Connections**: 28 curated puzzles, a four-by-four word grid, four hidden categories, difficulty-specific mistake limits, "one away" feedback on non-Expert modes, daily boards and practice boards.
- **Toon Rewind**: India-focused nostalgic TV with 35 shows, symbolic picture clues and original reveal posters, a reception-tuning remote, typed titles in Expert mode, six transmissions and early-answer star bonuses. Daily broadcasts and practice packs for early 2000s and 2005–2010.
- **Bazinga! Lab — Room Adventures**: 18 uniquely solvable BBT-themed episodes across eight original playable layouts (Apartment 4A/4B, Raj’s, Howard and Bernadette’s, Caltech cafeteria/lab, comic shop and movie theatre). Place original illustrated character stickers on actual room maps; solve spatial clues about Sheldon's spot, TV views, uncomfortable drafts, sick-day social distancing, snacks and Stuart's unfortunate seats. Each difficulty has 4, 5 or 6 guests, variable checks/hints and a different curated episode set. Sheldon-inspired original win compliments and a “Bazinga!” loss card accompany the solution. **Classic Lab** preserves the 18 original straight-line puzzles and their old saves.
- **The 99 Files**: 12 original Brooklyn Nine-Nine-inspired detective investigations (four per difficulty, including three sequential Halloween Heist cases). Read and select physical evidence, interview statements and record cards; connect pairs to form deductions; submit a culprit, method and decisive proof. Practice case gallery, deterministic daily files and unlockable three-stage heist. Original illustrated squad badges and a responsive precinct corkboard. All final answer combinations and evidence eliminations are tested, and the case score only rewards personal-best improvements.
- **Arcade Passport**: scrapbook-style achievements and unlocked stamps, lifetime game records, stars, best scores, and personal progress.
- **Cozy / Clever / Expert** difficulty controls in each game. Higher difficulty increases the challenge and multiplies potential stars.
- **Best-score rewards**: replaying the same puzzle only grants the improvement over its previously awarded high score. Older saved points remain unchanged.
- **Manual Passport backup and restore**: export a JSON save file and restore it on another device, with a confirmation step before replacing local scores.
- Combined arcade totals for solved puzzles and earned stars; browser-local progress kept independently for each game.
- Browser-local puzzle progress, daily streaks, number solved and earned stars.
- A clearly marked preview of the future November 13 Birthday Vault.

> **Privacy and persistence:** game progress still lives in `localStorage` for the current browser. It is not automatically synced across devices: use **Passport → Export / Restore** to move saves manually. Clearing browser data can erase unsaved progress. The current birthday countdown is informational only; rewards and redemptions will be implemented in Milestone 3. Browser date-based gates should never be considered secure access control.

## Project layout

```text
src/
  App.tsx             Arcade UI, game screens and first playable game
  styles.css          Responsive visual theme
  data/questions.ts   Guess Who? question bank and deterministic daily selection
  lib/game.ts         Guess Who? rules and persistence
  lib/connections.ts  Connections group rules and persistence
  data/connections.ts Curated Connections boards and deterministic scheduling
  games/Connections.tsx  Dedicated Connections interface
  games/ToonRewind.tsx   Retro TV channel recognition interface
  data/toon.ts          Curated CN India show catalogue and clue motifs
  lib/toon.ts           Toon scoring, session progression, and save rules
  lib/passport.ts       Difficulty, best reward and Passport achievements
  games/Passport.tsx   Passport screen, stamps and save export/import
  games/NineNine.tsx   Five-game detective desk, evidence browser and heist campaign
  components/NineNinePortrait.tsx Original detective and corgi badge art
  data/nineNine.ts    12 curated cases, evidence connections and deduction solver
  data/nineNineAudit.ts Authored alibi/method cross-checks for every deduction
  lib/nineNine.ts     Detective engine, case scoring and browser saves
  data/bazingaPolish.ts    Episode-specific scripts and seat names
  games/BazingaLab.tsx  Edition switcher (new Room Adventures + preserved Classic Lab)
  games/BazingaRoomGame.tsx  Spatial room-map gameplay and episode shelf
  games/BazingaClassic.tsx  Previous original line-up puzzles
  components/BazingaSticker.tsx  Original scalable character-sticker illustrations
  data/bazingaWorld.ts  Eight room maps, 18 authored cases and unique-solution solver
  lib/bazingaWorld.ts   New spatial controls, hints and reward logic
  data/bazinga.ts      18 cases, logic clues and exhaustive solution validator
  lib/bazinga.ts       Interaction rules, score caps and local progress
  components/DifficultyPicker.tsx  Shared difficulty selector
  data/extraQuestions.ts   Additional curated riddles
  data/extraConnections.ts  Additional authored Connections boards
.github/workflows/
  deploy.yml          GitHub Pages build/deploy pipeline
public/
  favicon.svg
GAME_DESIGN.md         Games and milestones, including future birthday mechanics
```

## Game-rule tests

The repository runs `npm run build` and `npm test` on GitHub Actions for new game branches and pull requests. The test suite validates board uniqueness, scoring, daily scheduling, mistakes, one-away feedback, and earlier Guess Who? behaviour. The Toon Rewind test suite checks channel lineups, alternatives, scoring and tuning. Bazinga! Lab's original and Room Adventures test suites exhaustively check each of the **36** authored seating cases for exactly one valid solution, and test interaction, spatial constraints, hints and anti-farming. The 99 Files suite tests unique suspect-method combinations, source-grounded eliminations, case playthroughs, hint and accusation limits, save preservation and staged heist unlocks. The separate deployment workflow publishes successful changes on `main`.

## Adding content

Add a new object to `riddles` in `src/data/questions.ts`. Each needs a unique `id`, a category (`fruit`, `vegetable`, `food`), a display answer, accepted aliases, four clues ordered from subtle to obvious, and an original fun fact. Answers are case-insensitive and ignore punctuation / spacing differences.

To expand Toon Rewind, add a new show with three symbolic visual motifs in `src/data/toon.ts`, after verifying that it aired on **Cartoon Network India** (not just in the US). The public release uses original show-inspired symbolic artwork and animated static/reveal screens, not copyrighted TV stills or audio. Actual character images require appropriate permission.

Connections boards can be added to `src/data/connections.ts` with a unique ID, one title, and four groups of four unique words each. Each group needs a label and a short explanation. Keep every set logically fair, not just technically distinct.

The daily riddle is picked deterministically from the date in the player's local timezone. Practice selects five riddles at random without repeats within a single set.

## Asset policy

The initial build uses CSS, emoji and original puzzle copy. Later TV and music themed games should use licensed / permissioned images and audio, original illustrations, or legally appropriate links rather than hosting copied episodes, concert recordings or copyrighted stills without permission.

Made with love, and a little bit of mischief. ♡

## Difficulty switching contract

For the **five earlier games**, choose Cozy, Clever or Expert **before the first meaningful action**. **Pink Rush deliberately has no difficulty selector**—its eight rounds have a single welcoming BLINK challenge level. Once a daily puzzle has begun, its difficulty cannot be changed or its earned result reset. A practice puzzle/session similarly locks after the first action; after the session ends, selecting another difficulty starts a new challenge. Switching before the first action immediately starts a fresh, correctly graded practice puzzle/session. A game's preferred difficulty is remembered for the next attempt. Locked rounds never silently receive an increased multiplier.

## Phase 2F difficulty and layout polish

Room puzzles now favour **chains of deductions** over clue text that names a unique chair, especially in Expert. All 18 episodes have revised show-specific original dialogue and qualified Sheldon compliments. The famous Apartment 4A seat is no longer explicitly labeled with its occupant. Furnishings are larger and separated from interactive chairs, with regression-tested fixture clearance. The room guide includes an **optional neighbour-line overlay**, ensuring diagonal adjacency rules are transparent. Wrong guesses give a tally without individual clause checks on Clever and Expert. Losing says **“Bazinga! You lose!”** and offers the solution in an expandable panel. Classic Lab and existing scores stay intact.

## Room Adventures — maps and art

The new maps are **original, approximate playable floor plans**, not official or architecturally accurate replicas of actual production sets. Room geography and accessible seat guides expose usable clues about TV sightlines, window drafts, door positions and chair comfort. The art is a bespoke vector/chibi sticker set (not screenshots or official cast photos); win/loss scenes also use only those original stickers. Visit [art and reference notes](BAZINGA_ART_AND_SOURCES.md) for show-set lore references and copyright details.

The fourth game's original progress key `mollys-bazinga-v1` remains unchanged. New `worldDaily`, `worldPractice` and `worldRecent` fields are optional additions; older data and Passport exports remain compatible.

## Phase 2G: Detective case files and Bazinga polish

Bazinga’s clues no longer use the “Roommate Agreement” as a universal heading. Each of the 18 room puzzles has a location/story-specific title (The Lunch Protocol, Bernadette’s House Rules, etc.) and contextual non-spoiler seat labels. The extra “original schematic” disclaimer was removed from the map header; the footer copyright note remains.

The 99 Files stores independent progress under `mollys-99-files-v1`, integrated into the Passport. Export **format v3** saves all five games and can still import v1/v2 files without overwriting newer game records absent from those backups. The game features nine standalone cases plus three Halloween Heist stages, with all twelve available in the daily rotation. Refer to [Nine-Nine art/lore/testing notes](NINE_NINE_ART_LORE_AND_TESTING.md) for exact design and evidence verification.

## Next development session

Read **`DEVELOPMENT_HANDOFF.md`** first. It contains the current code/release status, test and deployment commands, progress schema, milestone priorities and blockers. For detailed game mechanics and longer-term plans, see `GAME_DESIGN.md`.

## Cloud synchronization (not connected yet)

Molly can export and import the entire save from her Passport. A later version can use the owner's Supabase account for optional sign-in and cross-device backups. Before implementation, confirm authentication, Row Level Security policies, schema migrations, and a secure coupon-redemption mechanism. Never commit Supabase service-role secrets or other private credentials to this public repository.
