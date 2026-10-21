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
| Toon Rewind | Channel surfing and visual recognition; only shows confirmed to have aired on **Cartoon Network India** c. 2000–2010 | Planned |
| The 99 Files | Small detective cases; inspect evidence, interview witnesses and deduce the culprit | Planned |
| Bazinga! Lab | Interactive constraint-solving and logic games inspired by The Big Bang Theory | Planned |
| Pink Rush | Timed BLACKPINK setlist, era and performance-related puzzles; combos and sequencing | Planned |
| Little Connections | Group sixteen words into four hidden themes | Planned |

Future possible packs: Bollywood, historical photographs, semantic word guessing.

### Guess Who? rules (v1)

- One daily riddle based on the local date; scores persist per day.
- Practice mode contains five randomly selected distinct riddles.
- Four clues, revealed progressively. Player begins with one.
- Four free-text guesses; regional names and alternate spellings accepted.
- Score: 120 stars minus 20 for each extra clue and 10 for each earlier incorrect guess, minimum 30 for a correct answer; 0 for a missed or skipped puzzle.
- Daily win streak tracks **daily** riddles only, not practice.
- Completed puzzles reveal a fun fact and a next-step (practice) or the daily result.

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
2. **Game variety:** dedicated mechanics and curated content for Toon Rewind, The 99 Files, Bazinga! Lab, Pink Rush and Connections. Fact-check specifically **Indian CN broadcast history**.
3. **Birthday Quest and coupons:** annual event, surprise reveal, wallet and redemption rules. Decide on a secure backend only if required.
4. **Polish and QA:** test on phones, keyboard use, screen readers, scoring, storage failures, new-day rollovers and GitHub Pages URL.

## Future engineering considerations

- Extract independent React components, reusable game engine interfaces and dedicated puzzle content packs as each game matures.
- Track question IDs, schema versions and migrations to avoid breaking saved progress after content updates.
- Support optional reduced motion, offline mode / PWA and player-selected sounds after the core games work reliably.
- Expand puzzle packs rather than replacing entire game code. Add reproducible logic tests and browser tests.
