# Molly's Cozy Arcade ✿

## Phase 2I — The 99 Files, redesigned for real deductions

The Nine-Nine's 12 cases were audited for a more fundamental quality standard than mere unique solvability: **every connected pair of evidence must be necessary** for the complete culprit-and-method conclusion. Cozy cases remain approachable; Clever and Expert retain multiple suspects until their final decisive deduction. The evidence text and mini case stories have been comprehensively rewritten; no long alibi list may reveal one remaining culprit on its own. The player always sees the full question prompts (including Expert), and evidence-pairing links carry the detective reasoning.

Unfinished cases from older saves are safely restarted when reopened, because their document connections have changed; **awarded stars, solved rounds, Heist progression and earlier Passport backups are preserved**. Holt's portrait has also been refined to the correct short-shaven/bald look, with Molly's illustration unchanged. The canonical source is `src/data/nineNineVerified.ts`; audit tests are in `tests/nineNineLogicAudit.test.ts`.

## Phase 2H — Detective Molly & Nine-Nine polish

Detective Molly (an **original SVG portrait inspired by a private reference photo, not a publicly stored photo**) now leads each case-specific four-person squad, alongside redesigned and more recognizable Nine-Nine character stickers. Successful evidence links explain exactly which source reports were compared, which suspects and methods the logic excludes, and how many candidate hypotheses remain. Cozy highlights the starting evidence card; Clever does not; Expert hides unsolved investigation questions and requires four evidence connections.

Every one of the twelve cases has a concise four-part story resolution. The Halloween Heist has a visually distinct twilight-purple, pumpkin-and-amber festival theme, with the same three-stage campaign logic and saved progress. No existing saves, games, awards or Passport import versions have changed.


A tiny, cheerful puzzle arcade built as a birthday gift, and designed to be fun all year long.

**Status: Milestone 2H — Detective Molly and Nine-Nine polish.** Five games are playable. The 99 Files is a fully interactive detective game with 12 original evidence cases and a three-stage Halloween Heist. Bazinga has custom clue-panel titles for each scenario, improved seat naming and a lighter map presentation. Pink Rush and the November 13 Birthday Quest/coupon wallet remain planned.

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

For **all five games**, choose Cozy, Clever or Expert **before the first meaningful action**. Once a daily puzzle has begun, its difficulty cannot be changed or its earned result reset. A practice puzzle/session similarly locks after the first action; after the session ends, selecting another difficulty starts a new challenge. Switching before the first action immediately starts a fresh, correctly graded practice puzzle/session. A game's preferred difficulty is remembered for the next attempt. Locked rounds never silently receive an increased multiplier.

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
