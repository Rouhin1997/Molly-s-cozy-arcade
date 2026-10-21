# Molly's Cozy Arcade — Development Handoff

**Checkpoint:** 21 October 2026, completion of Phase 2D (difficulty consistency + Bazinga! Lab)
**Repository:** https://github.com/Rouhin1997/Molly-s-cozy-arcade
**Live arcade:** https://rouhin1997.github.io/Molly-s-cozy-arcade/
**Default branch:** `main`; GitHub Actions publishes `main` to GitHub Pages
**Primary milestone:** complete a meaningful November 13 birthday experience. All regular games should remain playable year-round.

## The intended user experience

This is a private-feeling, cozy birthday gift, but the GitHub Pages repository and its deployed contents are **public**. Keep text warm, personalized and lighthearted without publishing genuine secrets or sensitive photos. Respect game variety—each minigame needs its own mechanic, not the same trivia engine in different clothes. Molly should enjoy the casual arcade even before or after November 13. The user values carefully curated, clever questions, an Indian Cartoon Network nostalgia focus, and iterative browser play-tests.

## Current playable features (Phase 2D)

| Game | UI and engine | Play modes | Content | Difficulty |
|---|---|---|---|---|
| Guess Who? | `src/App.tsx`, `src/lib/game.ts` | Local-date daily & five-round practice | 48 authored foods/fruits/vegetables | Cozy 5 guesses/4 clues, Clever 4/4, Expert 3/3 |
| Little Connections | `src/games/Connections.tsx`, `src/lib/connections.ts` | Local-date daily & curated practice | 28 groups-of-four boards | Cozy 5 mistakes, Clever 4, Expert 3; hard removes one-away feedback |
| Toon Rewind | `src/games/ToonRewind.tsx`, `src/lib/toon.ts` | Six-channel daily & six-channel themed practice | 35 CN India/Toonami-era cartoons | Cozy 4 choices/emoji props, Clever 6 choices/subtler hints, Expert typed show names/one miss |
| Bazinga! Lab | `src/games/BazingaLab.tsx`, `src/lib/bazinga.ts`, `src/data/bazinga.ts` | One local-date puzzle & replayable difficulty-filtered practice | 18 distinct uniquely solvable seating cases | Cozy 4 seats/4 checks/2 hints, Clever 5/3/1, Expert 6/2/0 |

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
- `src/games/`: Toon Rewind, Connections, Bazinga and Passport.
- `src/data/`: original problem banks and deterministic selectors. `src/data/bazinga.ts` also exhaustively validates case uniqueness.
- `src/lib/`: game rules, local saving and scoring.
- `src/styles.css`: shared pastel theme plus scoped game CSS and responsive breakpoints.
- `tests/connections.test.ts`, `tests/toon.test.ts`, `tests/expansion.test.ts`, `tests/bazinga.test.ts`: Vitest suites.
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
