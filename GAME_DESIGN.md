# Molly's Cozy Arcade — game design & roadmap

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
| The 99 Files | Small detective cases; inspect evidence, interview witnesses and deduce the culprit | Planned |
| Bazinga! Lab | Interactive constraint-solving and logic games inspired by The Big Bang Theory | Planned |
| Pink Rush | Timed BLACKPINK setlist, era and performance-related puzzles; combos and sequencing | Planned |
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
2. **Game variety:** Little Connections (2A) and Toon Rewind (2B) are playable; The 99 Files, Bazinga! Lab, and Pink Rush follow. Fact-check specifically **Indian CN broadcast history**.
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

Implemented as a personal scrapbook with achievements, total stars, games solved, daily streaks, and per-game records. Manual export/restore allows moving progress between devices. The eventual birthday coupon wallet remains a separate gift system, not a purchase mechanic. No login is needed for basic play.

## Future engineering considerations

- Extract independent React components, reusable game engine interfaces and dedicated puzzle content packs as each game matures.
- Track question IDs, schema versions and migrations to avoid breaking saved progress after content updates.
- Support optional reduced motion, offline mode / PWA and player-selected sounds after the core games work reliably.
- Expand puzzle packs rather than replacing entire game code. Add reproducible logic tests and browser tests.
