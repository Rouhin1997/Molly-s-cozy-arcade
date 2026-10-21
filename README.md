# Molly's Cozy Arcade ✿

A tiny, cheerful puzzle arcade built as a birthday gift, and designed to be fun all year long.

**Status: Milestone 2C — Arcade Passport and game expansion.** Three playable games now feature adjustable challenge levels, expanded puzzle libraries, and arcade-wide achievements. A Birthday Quest (November 13), coupon wallet and three further themed games remain on the roadmap.

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

- A responsive arcade lobby showing all six games, with three playable.
- **Guess Who?** with a daily mystery and 5-round randomized practice picnics.
- Four progressive clues per mystery (three in Expert), difficulty-based guess limits, aliases and fun facts.
- 48 original food / fruit / vegetable riddles, with lots of familiar Indian names.
- **Little Connections**: 28 curated puzzles, a four-by-four word grid, four hidden categories, difficulty-specific mistake limits, "one away" feedback on non-Expert modes, daily boards and practice boards.
- **Toon Rewind**: India-focused nostalgic TV with 35 shows, symbolic picture clues and original reveal posters, a reception-tuning remote, typed titles in Expert mode, six transmissions and early-answer star bonuses. Daily broadcasts and practice packs for early 2000s and 2005–2010.
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

The repository runs `npm run build` and `npm test` on GitHub Actions for new game branches and pull requests. The test suite validates board uniqueness, scoring, daily scheduling, mistakes, one-away feedback, and earlier Guess Who? behaviour. The Toon Rewind test suite checks channel lineups, alternatives, scoring and tuning. The separate deployment workflow publishes successful changes on `main`.

## Adding content

Add a new object to `riddles` in `src/data/questions.ts`. Each needs a unique `id`, a category (`fruit`, `vegetable`, `food`), a display answer, accepted aliases, four clues ordered from subtle to obvious, and an original fun fact. Answers are case-insensitive and ignore punctuation / spacing differences.

To expand Toon Rewind, add a new show with three symbolic visual motifs in `src/data/toon.ts`, after verifying that it aired on **Cartoon Network India** (not just in the US). The public release uses original show-inspired symbolic artwork and animated static/reveal screens, not copyrighted TV stills or audio. Actual character images require appropriate permission.

Connections boards can be added to `src/data/connections.ts` with a unique ID, one title, and four groups of four unique words each. Each group needs a label and a short explanation. Keep every set logically fair, not just technically distinct.

The daily riddle is picked deterministically from the date in the player's local timezone. Practice selects five riddles at random without repeats within a single set.

## Asset policy

The initial build uses CSS, emoji and original puzzle copy. Later TV and music themed games should use licensed / permissioned images and audio, original illustrations, or legally appropriate links rather than hosting copied episodes, concert recordings or copyrighted stills without permission.

Made with love, and a little bit of mischief. ♡

## Cloud synchronization (not connected yet)

Molly can export and import the entire save from her Passport. A later version can use the owner's Supabase account for optional sign-in and cross-device backups. Before implementation, confirm authentication, Row Level Security policies, schema migrations, and a secure coupon-redemption mechanism. Never commit Supabase service-role secrets or other private credentials to this public repository.
