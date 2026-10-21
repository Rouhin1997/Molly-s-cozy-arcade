# Molly's Cozy Arcade — Development Handoff

**Checkpoint:** 22 October 2026, Phase 2F (richer BBT logic, spatial-fairness and polished storybook maps)
**Repository:** https://github.com/Rouhin1997/Molly-s-cozy-arcade
**Live arcade:** https://rouhin1997.github.io/Molly-s-cozy-arcade/
**Default branch:** `main`; GitHub Actions publishes `main` to GitHub Pages
**Primary milestone:** complete a meaningful November 13 birthday experience. All regular games should remain playable year-round.

## Latest polish — Phase 2F: Deduction depth, canon calibration and room clarity

**User play-test feedback:** Room Adventures maps, sticker portraits and themed reactions were praised, but **Expert clues gave away too many exact seats**, the seat labeled “Sheldon's spot” was a giveaway, some character dialogue did not sound like Sheldon, and multiple decorative fixture icons overlapped playable seats (notably Raj's mystery gala). User requested more authentic lore, more rigor, bigger room furniture, and a short losing message. **Classic Lab must remain untouched.**

### Implemented Phase 2F improvements

1. **18 rewritten, hand-authored BBT-inspired stories and clues** in `src/data/bazingaPolish.ts`, layered over the existing stable 18 case IDs and solutions. New dialogue references Sheldon's preferred *comfortable* cross-breeze/TV angle, Roommate Agreement clauses, Halo and new-comic Wednesdays, Raj's party scenarios, Howard/Bernadette and Stuart's living arrangement, lab safety and movie viewing geometry. These are *original hypothetical episode premises*, not reproduced script lines.
2. **Expert puzzle-generation hardening** in `src/data/bazingaWorld.ts`: generated property clues cannot instantly map a character to a single identifiable chair; the solver favors relational deductions (nearby, apart, left/right, guest distance). No longer simply picks the most decisive clue every time. Automated diagnostics enforce Expert opening clues leave **more than three valid arrangements** and at most **one uniquely pinning property clue**, with multiple relationship clues. Every finished case still has **exactly one** valid seating solution by exhaustive permutations.
3. **No automatic answer label** in Apartment 4A: the cushion is identified as “Sofa · left cushion”, with its physical warmth and breeze attributes discoverable. The special `spot` marker stays internal for game rules but is not displayed in the seat guide or chair tooltip. Sheldon’s canonical couch justification involves radiator warmth, summer cross-breeze and a conversationally suitable screen angle, not the blanket absence of airflow.
4. **Sheldon reactions revised** from generic enthusiastic praise to grudging, qualified, precise, mildly condescending original compliments (e.g. “I inspected your answer expecting a flaw. Annoyingly, I found none. Well done, I suppose.”). Loss headline is now simply **“Bazinga! You lose!”** with the correct solution hidden in a voluntary expandable detail panel.
5. **Room maps enlarged and props repositioned**, especially Raj’s window/mystery board, Penny’s window/door, Caltech terminal, and comic shop display. Enlarged TV, windows, comic/lab equipment and other icon panels. A new `roomPropOverlaps()` test verifies visual fixture collision clearance across all playable chairs in the enlarged minimum 650×500 map.
6. **Transparent adjacency semantics**: an optional “Draw lines between chairs the puzzle treats as neighbours” checkbox in the seat guide shows exactly the same neighbour edges the solver uses (including eligible diagonals). Expert still does not reveal which characters belong in those seats. Automated tests compare all visual edges to the actual rule predicate.
7. **Difficulty feedback refinement**: after a wrong submission, only Cozy reveals individual pass/fail clue marks; Clever and Expert receive a count without revealing exactly which conditions pass. Existing Cozy/Clever/Expert attempt, hint and reward rules remain unchanged.
8. Existing save formats, case IDs, room positions/answers, Passport award ledgers and Classic Lab remain compatible. **No new official image assets** or copyrighted screenshots were introduced.

### References / source context
- [Sheldon's spot explanation from Pilot and The Gorilla Experiment](https://the-big-bang-theory.com/sheldons_spot/)
- [The Roommate Agreement](https://the-big-bang-theory.com/roommate_agreement/)
- [Recurring schedule, including comic book/Halo Wednesday](https://the-big-bang-theory.com/weekly_calendar/)
- [Howard & Bernadette / Stuart living arrangement](https://the-big-bang-theory.com/characters.Bernadette/)
- `BAZINGA_ART_AND_SOURCES.md` also documents original-art copyright policy.

### Next session

First ask the user to **play-test Star Wars at Sheldon's, Raj's Mystery Gala and at least two Expert cases**, plus the new neighbour overlay. Confirm the clues require deduction rather than obvious lore alone, and that enlarged icons do not obstruct seats on their actual device. If the user approves, proceed with **The 99 Files** or the **November 13 birthday experience** based on priority. Preserve all previous scores and Classic Lab. The tests guarantee uniqueness and basic collisions, **not** a fully completed manual browser QA.

## Latest release — Phase 2E: Bazinga! Room Adventures

**Current default Bazinga screen is now Room Adventures**, not the old line-of-chairs activity. A clearly labeled **Classic seating puzzles** link opens the old, completely preserved game. `src/games/BazingaLab.tsx` is a small mode router; the original `BazingaLab.tsx` implementation was copied into `BazingaClassic.tsx` with the same props and save schema.

### New gameplay and art
- Room map settings: Apartment 4A, Apartment 4B, Howard & Bernadette's house, Raj's apartment, Caltech cafeteria, Caltech physics lab, Stuart's comic store, movie theatre. **Original schematic layouts** approximating iconic recurring set features; never claim to be official set reproductions.
- **18 new handcrafted episode cases** in `src/data/bazingaWorld.ts` (6 per difficulty; no random filler), separate from the previous 18 Classic puzzles. Examples: Star Wars Night in Apartment 4A, Dinner at Howard's, Raj's Murder Mystery, New Comic Day, Caltech Lunch, Sick-Day Contingency, and movie-theatre screening puzzles.
- **Actual 2D spatial constraints**: a unique traditional spot, sofa, line of sight to TV, kitchen and window proximity, cold drafts versus *pleasant* cross-breeze, Stuart's inconvenient seats, and Sheldon’s maximized distance from a sick guest. Each authored case is exhaustively checked for precisely **one** arrangement satisfying all clues.
- A visible map/props and expandable **room seat guide** show draft/sightline/chair details, ensuring answerability without secret seat tags. The UI supports keyboard buttons; on narrow phones the room map scrolls horizontally.
- Eight entirely original, hand-coded scalable SVG chibi sticker tokens in `src/components/BazingaSticker.tsx`; these appear on chair buttons and in original illustrated reaction cards. A solved case displays Sheldon’s unique, newly written praise and group art; loss says “Bazinga!” via a Sheldon sticker and shows the one valid arrangement.
- Art/copyright documentation: `BAZINGA_ART_AND_SOURCES.md`, citing official Warner Bros. set exhibitions and fan episode references. **No official actor photos, screenshots, scripts, logos or television audio were distributed**.

### Compatibility and scores
- No database or external image dependency. Extend `BazingaProgress`'s existing v1 object with optional `worldDaily`, `worldPractice` and `worldRecent`. Old `daily` / `practice` and statistics remain; `readBazingaProgress` populates safe defaults. `mollys-bazinga-v1` stays the storage key, and old Passport v1/v2 JSON exports still import.
- Per-case star ledger prefix `room:` prevents score collisions with classic case IDs. Both editions contribute to one Bazinga total and the Passport.
- Room challenge tiers use Cozy/Clever/Expert multipliers (1×/1.5×/2×), with 4/3/2 checks and 2/1/0 fixed-chair hints, respectively.
- **Tests:** `tests/bazingaWorld.test.ts` checks 18 unique solution counts via permutations, each narrative clue, all completed level outcomes, interaction, hint locks, room-distance logic, score replay safety. Older Bazinga game tests still run.

### Exact next action in a future chat
1. **Ask the owner to play-test the new room maps** on desktop and phone: placement, scrolling, whether scene/story clues are understandable and whether character sticker art feels sufficiently BBT-like.
2. Fix any discovered UX bugs or impossible-seeming scenario based on their feedback. Automated tests passing does not substitute for real device/browser QA.
3. After the user approves this refreshed Bazinga, implement **The 99 Files** or shift to **November 13 Birthday Quest**, depending on remaining time. Pink Rush remains planned. Avoid adding any copied BBT assets without a vetted license.
4. Keep this checkpoint updated in GitHub after each substantive milestone.

## The intended user experience

This is a private-feeling, cozy birthday gift, but the GitHub Pages repository and its deployed contents are **public**. Keep text warm, personalized and lighthearted without publishing genuine secrets or sensitive photos. Respect game variety—each minigame needs its own mechanic, not the same trivia engine in different clothes. Molly should enjoy the casual arcade even before or after November 13. The user values carefully curated, clever questions, an Indian Cartoon Network nostalgia focus, and iterative browser play-tests.

## Current playable features (Phase 2D)

| Game | UI and engine | Play modes | Content | Difficulty |
|---|---|---|---|---|
| Guess Who? | `src/App.tsx`, `src/lib/game.ts` | Local-date daily & five-round practice | 48 authored foods/fruits/vegetables | Cozy 5 guesses/4 clues, Clever 4/4, Expert 3/3 |
| Little Connections | `src/games/Connections.tsx`, `src/lib/connections.ts` | Local-date daily & curated practice | 28 groups-of-four boards | Cozy 5 mistakes, Clever 4, Expert 3; hard removes one-away feedback |
| Toon Rewind | `src/games/ToonRewind.tsx`, `src/lib/toon.ts` | Six-channel daily & six-channel themed practice | 35 CN India/Toonami-era cartoons | Cozy 4 choices/emoji props, Clever 6 choices/subtler hints, Expert typed show names/one miss |
| Bazinga! Room Adventures (default) + Classic Lab | `src/games/BazingaRoomGame.tsx`, `src/data/bazingaWorld.ts`, `src/lib/bazingaWorld.ts`; original `src/games/BazingaClassic.tsx` remains | Daily episode & browseable scenario collection; legacy Classic daily/practice | **18 new authored 2D room cases across 8 venues + 18 preserved Classic cases** | Room Cozy 4 guests/4 checks/2 hints, Clever 5/3/1, Expert 6/2/0 |

**Bazinga gameplay:** select character chip → select numbered chair to assign or swap; clear an occupied chair by clicking it with no selected guest. Use written spatial constraints to deduce the only valid left-to-right arrangement. Revealing a hint locks one correct guest in their chair. The rule generator checks all possible permutations so each case has one unique solution. All difficulty levels award different star multipliers, and per-case highest-score rewards cap repetitive farming.

### Difficulty life cycle — IMPORTANT

For **all four games**:
1. The chosen difficulty is shown above the board and is saved as a per-game preference in `localStorage`, key `mollys-difficulty-<game>`.
2. Before the first meaningful action (first hint, guess, seat placement, or tile selection), changing tier restarts a **fresh appropriately graded practice puzzle/session**. The daily puzzle is retained or replaced with that tier's unopened version, depending on game.
3. After first action, the current session/round tier is locked, even if the user navigates to another game then returns. The old score cannot be upgraded by selecting Expert late.
4. A completed daily round is read-only. After completing a practice set, a new difficulty can be chosen for a **new** attempt without changing the finished result.
5. Cozy/Clever/Expert use 1×/1.5×/2× star multipliers. All repeat attempts give only the improvement above the prior best-awarded score for each puzzle/show/case.

When extending new games, follow this same contract and test the unopened, in-progress and completed states explicitly.

## Arcade Passport & saving

Passport UI: `src/games/Passport.tsx`. Shared summary, stamps and difficulty helpers: `src/lib/passport.ts`. Passport includes total stars, completed games, best records, and **12 achievement stamps** (10 original + 2 Bazinga achievements).

Storage is browser-local with separate **v1 data schemas**:
- `mollys-cozy-arcade-progress-v1` for Guess Who?
- `mollys-connections-v1` for Little Connections
- `mollys-toon-rewind-v1` for Toon Rewind
- `mollys-bazinga-v1` for Bazinga! Lab

The Passport's manual JSON export uses **file format version 2**, including all four game states. Import remains backward-compatible with version 1 (three-game backups) and keeps the current Bazinga state if the old file lacks it. Confirm before replacing device-local records.

**Cloud:** NOT CONNECTED. The user has a Supabase account and offered it, but no database URL, password or API keys have been configured or committed. An optional future feature should use Supabase Auth, Row Level Security, a migration/import path, and an authoritative server-side coupon redemption service. Never put a privileged service-role key in front-end code. Do not pretend local browser awards/coupons are secure against manipulation.

### Migration invariants
- Keep all three old save keys, object properties and awarded scores readable.
- Historical daily puzzle selections before 2026-10-22 should not change when question banks expand.
- New `bestAwards` ledgers are seeded on read from previous solved rounds for all original games.
- Maintain a versioned Passport export/import format; do not break legacy version 1 backups.
- User should not lose stars when an individual game is expanded, replayed or difficulty-changed.

## Source organization and release process

- `src/App.tsx`: lobby, Guess Who?, view router, global progress.
- `src/games/`: Toon Rewind, Connections, Bazinga (room adventure + Classic) and Passport.
- `src/data/`: original problem banks and deterministic selectors. `src/data/bazinga.ts` also exhaustively validates case uniqueness.
- `src/lib/`: game rules, local saving and scoring.
- `src/styles.css`: shared pastel theme plus scoped game CSS and responsive breakpoints.
- `tests/connections.test.ts`, `tests/toon.test.ts`, `tests/expansion.test.ts`, `tests/bazinga.test.ts`, `tests/bazingaWorld.test.ts`: Vitest suites.
- `.github/workflows/test.yml`: on pushes to feature branches, main and pull requests runs Node 22, `npm run build`, `npm test`.
- `.github/workflows/deploy.yml`: on changes to `main`, builds Vite and deploys the `dist` directory to GitHub Pages.
- There is no committed npm lockfile yet: CI uses `npm install --no-audit --no-fund`. Reproducibility could be improved later.

**Workflow:** create `feature/...` from the latest `main`; implement one change; wait for a green build/tests; open a PR; merge only after green pull-request checks; check the Pages workflow reaches **Publish: success**. Ask the user to browser-test meaningful new features and mobile layout, because passing automated builds is not the same as browser QA.

## Art/copyright strategy

Visuals are original CSS and symbols. Toon Rewind win/loss displays are show-specific motif posters and a static transition; **actual official Scooby-Doo / Ben 10 copyrighted character portraits are not included**. If permissioned or appropriately licensed character pictures become available, add clear credit and licensing records before deployment. Do not upload ripped screenshots or music.

## Still to build — suggested next milestones

1. **Browser QA/polish of Phase 2D:** Play-test all four difficulty settings and stale local saves. Verify Passport version 1→2 restore, desktop/mobile chairs and keyboard navigation. Fix reported bugs first.
2. **The 99 Files:** an *original interactive detective evidence* minigame inspired by Brooklyn Nine-Nine, distinct from guessing show facts. Proposed loop: examine case file, interview suspects, connect contradictory statements, and identify suspect with evidence. Include curated tier-specific cases, finite deductions, unique-solvable-case validation, daily+practice, score caps, Passport stamps. Only design and preview are committed so far, not playable.
3. **Pink Rush:** BLACKPINK concert/setlist/era sequencing with high-energy combos and time/chronology puzzles—different interaction from detective or seating logic; use original/permissioned art rather than copyrighted audio.
4. **November 13 Birthday Quest and coupon wallet (deadline-sensitive):** Design a narrative chain of activities that ends with three distinct random love coupons (e.g., massage, cook dinner, ask-anything, snack box). Keep redemption records, available/requested/redeemed statuses. Decide trust-based local-only vs server-backed one-time verification **before** implementing. Rewards should never require perfect scores. Do not publicly expose surprises/private content prematurely.
5. **Optional Supabase setup** when it genuinely improves cross-device safety and coupon state; propose schema/Auth/RLS before asking the owner to connect/configure.
6. Content curation and licensed artwork improvements can happen incrementally, but the birthday deadline takes priority over chasing very high puzzle counts.

## Where to resume next chat

Ask the user how Bazinga! Lab and the newly consistent difficulty switching felt in the browser. Start from a fresh `main` branch after confirming the latest Pages deployment is green. If the four games are satisfactory, draft and implement **The 99 Files**, or prioritize November 13 Birthday Quest if the deadline is approaching. Use this handoff plus `README.md` and `GAME_DESIGN.md` rather than relying on recalled chat state.

**Session rule:** user approved implementing and deploying Phase 2D and then stopping for the day. Do not silently begin another major game in the same work session.
