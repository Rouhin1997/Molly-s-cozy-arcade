# India Edition — 240 Mysteries · Gameplay & Experience Overhaul

## Release scope, 29 October 2026

Who? What? Where? When? is a playable, curated India discovery game. The starter bank of **24** mysteries has been expanded by **216 freshly authored puzzles**, to exactly **240**: **60 Who, 60 What, 60 Where and 60 When**. Each of the new entries has its own opening riddle, two distinct editorial clues, a region/era clue, a topic/period/region metadata record and two optional hint prompts. The launch bank reaches beyond the initial food and buildings: major film personalities, singers, athletes, writers, scientists, businesspeople and independence figures; street food, crafts, wildlife, fruits and plants; mountains, rivers, cities and temples; sports championships, historical milestones, cinema releases, space missions and naval history.

**A 12-stop expedition still contains three puzzles of each kind.** The engine selects a deterministic shuffled sample; it does **not** promise 240 distinct quests or literally infinite new content. Each next expedition changes its seeded selection. The question bank is made of data text files grouped by subject and difficulty, compiled through \`src/data/indiaMysteryPacks.ts\`, imported via \`src/data/indiaAtlasExpansion.ts\` and combined with the original 24 in \`src/data/indiaMysteries.ts\`. Individual puzzles can be edited independently without changing the engine.

## Three meaningful difficulty presets

| Level | Question pool | Guess allowance | Typical feeling |
|---|---|---:|---|
| 🌿 Easy | Familiar easy cards across all 12 stops | 5 | Relaxed discovery |
| 🧭 Balanced | 4 easy → 4 medium → 4 hard | 4 | Progressively more demanding |
| 🔥 Challenge | 4 medium → 8 hard | 3 | Strong clues and real deduction |

All modes contain **three of each Who/What/Where/When type**, with each group shuffled. Difficulty can be selected before the first campaign and again on the 12-stop celebration screen for subsequent campaigns. Old saved journeys remain restorable, even if their initial seed and order were generated under the earlier 24-card algorithm.

## Hint and guess mechanics

- **Two optional hints for every individual mystery.** A hint costs nothing outside that one mystery. When the player moves to the next stop, the allowance resets to two. There are no shared currency pools, bonus accrual rules, final-round exceptions or hint farming. The original record format retains a legacy \`hintBank\` field only so older browser data can still load.
- A distinct wrong guess still progressively unlocks the next of **three additional clue beats**. Repeated guesses consume no attempt. If a difficulty allows more than four guesses, the extra try simply offers another chance to solve with all standard clues visible.
- The name-assist function now understands shortened/merged names, reordered first and surnames, regional aliases, small spelling errors and up to two edits for sufficiently long terms. Suggestions are pulled from the full public candidate bank **within the question kind**, never just the correct hidden answer, and selection fills the input without submitting.
- Guess feedback can point to genuinely shared topic, region, period or question category for known candidates. It never presents fake percentages or invents a relationship for an unrecognised guess.

## Cleaner presentation and more satisfying rewards

On first open, players receive an automatically opened **How to Play** overlay. The visible Rules button reopens it at any time; after dismissing once, it stays closed on subsequent visits to the browser. The rules describe guessing, hints, difficulty and the 12-stop trip. Gameplay now focuses on the actual riddle, progressively revealed notes, answer search and a concise feedback compass. The previous explanatory sidebar about growing the catalogue and hint mechanics is gone. The footer contains only a link to Classic Guess Who; photograph credits stay beside their respective images.

The homepage featured-game artwork is now a **single original compass-and-question-mark emblem**, replacing three overlapping emoji and fixing cramped text. Supported new visual clues include original postcard/graphic/archival designs with region pointers. Existing Commons/NASA photos remain attributed where they appear, and network failures fall back to usable text hints. No copyrighted movie posters, album artwork or celebrity publicity photos were added without an appropriate reusable license.

Winning a mystery now reveals an illustrated medal, animated stars, the answer, a short explanation, points and attempt/hint statistics. Failure has a deliberately gentler distinct treatment with answer/explanation and onward progress. Finishing **all twelve** mysteries receives a larger celebratory screen: explorer rank, award animation, 12 completed stamps, total score, solved count, chosen difficulty, the ability to copy a results summary, and a selector for the next journey. Animations respect reduced-motion preferences.

## Saving and backwards compatibility

The key remains \`molly-wwww-india-v1\`; no existing browser data is intentionally discarded. Save normalization now accepts older 12-stop selections (valid, unique, balanced per category) even if reordering that seed under the expanded catalogue would choose different cards. Earlier fields are accepted. The Classic Guess Who archive remains available with all its original statistics; Passport backup v8 continues to export the India game and all other games unchanged.

## Validation and owner playtest

- \`tests/indiaAtlas240.test.ts\` audits the **240 exact count, 60-per-type balance, no repeated IDs/answers, content clarity**, all three difficulties over forty shuffled expeditions each, two-hint refresh on every stop, and smarter autocomplete (merged names, alternative spellings and reordered words).
- \`tests/indiaQuest.test.ts\` verifies hints, progression, scores, aliases, integrity and legacy save acceptance. All older arcade regression tests must remain green.
- CI TypeScript/Vite/Vitest is necessary but **not** a substitute for a real browser and touch-screen playtest.
- Owner should try one journey at each difficulty, both a photographic and a generated illustration mystery, no hints and both hints, miss/solve results, final 12-stop award screen, returning after refresh, home icon on mobile, and Passport backup export/import.

**Future work:** increase individually licensed photo assets (particularly real film, spacecraft and object photos), diversify geography/map art, audit harder clues after playtest, and expand answer alias/thesaurus coverage. The goal is an enjoyable recognition-and-deduction game, not obscure quiz-bowl trivia.
