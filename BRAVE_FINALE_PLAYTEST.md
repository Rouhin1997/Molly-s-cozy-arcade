# Brave: The Wisps' Trail — Complete Six-Chapter Playtest

## Phase 4A — Passport Chronicle and expandable arcade hub (22 October 2026)

**Owner direction and completion scope:** Make Molly's six-chapter Brave completion a meaningful Passport keepsake rather than just a score; after solving all 18 scenes, unlock a permanent Keeper of the Wisps stamp and a beautiful, readable storybook with an original Merida–Molly friendship epilogue. Redesign overcrowded top navigation into icon-based categories: a live-games drop-down, direct Passport/Wallet access, a separate Coming Soon list, chronological seasonal-events drop-down, and a developer postbox. Tease four future games without implementing them yet. Preserve everything already released and update logs.

**Implemented:** \`src/data/braveChronicle.ts\` now holds thirteen original, richly written illustrated-story spreads across the six Brave chapters, culminating in a warm Highland farewell where Merida and Molly part as friends without rewriting the movie's ending. \`src/games/BraveChronicle.tsx\` provides a parchment open-book reader with chapter bookmarks, page-turn controls, original in-game chapter landscape illustrations, keyboard support and an epilogue. **Unlocks only after every canonical Brave stage is completed.** The Passport shows a lock/progress meter while unfinished, then awards the Keeper's stamp and a permanent book-open control; the final tapestry's win panel now links straight into the Passport. Replaying any stage does not revoke the book. \`src/games/Passport.tsx\` exports version-5 backups including Brave progress while accepting backups from versions 1–4 without erasing their separate Brave save. All seven playable games are represented in the Passport record list; the existing Pink Rush coupon wallet is unmodified.

**Navigation overhaul:** \`src/components/ArcadeNavigation.tsx\` replaces ten separate header links with compact, responsive native expand/collapse category menus. **Games** includes only the seven released games (including Brave); **Passport** and **Wallet** stay direct; **Coming Soon** holds *Kung Fu Panda, Courage the Cowardly Dog, Toy Story and The Addams Family* with honest not-yet-playable descriptions and no announced dates; **Events** sorts verified yearly occasions, October 31 (Halloween Heist, existing playable Nine-Nine game) and November 13 (Molly's birthday, preview/roadmap vault only), by the nearest local-calendar occurrence; the **✉ Developer Postbox** displays dated, read-only release/workshop notes and explicitly does not receive messages. The homepage now has separate **Live Games**, **Coming Soon** and **Little Occasions** sections. No fake new mini-games, event bookings, emails, or live birthday prizes were introduced.

**Quality and boundaries:** \`tests/arcadeChronicle.test.ts\` checks the strict unlock and old saves, thirteen complete chapter/epilogue spreads, honest upcoming list, seasonal date rollover/sorting and developer notes; keep all prior game tests green. No cloud sync: keepsake and unlock still live in the browser; Passport backup can preserve them. **Owner's concern that the generated synthetic Celtic music is unsatisfying remains open**—neither this change nor the Chronicle resolves original recorded-score production. Next release gate is the owner's UI and reading-flow feedback, mobile testing, and a proper music-production plan rather than building the teaser games immediately.


**Phase 3E, 22 October 2026.** The owner greenlit Chapters IV–VI after approving the overall story, puzzles and illustrations of I–III, but explicitly **did not approve the current synth soundtrack**. Do not treat the score as final; a produced, original Celtic/Scottish quest-music pass is still required after this story build. Do not use Disney/Pixar recordings or score motifs.

## Complete playable campaign

The six chapters now contain exactly **18 connected scenes**, with three scenes per chapter and safe unlock/resume/replay.

| Chapter | Three playable scenes | Mood and special rules |
|---|---|---|
| I — The Highland Games | Courtyard Trial, Angus's Shortcut, Archer's Choice | Golden castle, route puzzles, physically simulated arrow ballistics |
| II — Follow the Wisps | First Light, Whispering Stones, Hidden Clearing | Cold blue forest, longer gated paths and two wisps |
| III — Witch's Workshop | Curious Bargain, Rune Sequence, Witch's Secret | Warm carved interior, golden key, four-carving deduction |
| IV — A Bear in the Castle | Midnight Escape, Triple Trouble, Secret Passage | Moonlit DunBroch, deterministic guard patrol with triplet distraction, deep passage route |
| V — Mor'du's Shadow | Tracks in the Mist, Broken Circle, Shadow of the Bear | Storm ruins, fixed compass/bearing puzzle, two layered long routes (no resurrected Mor'du) |
| VI — Mend the Bond | Last Wisp, Threads of Fate, A Brave Heart | Dawn forest, final wisp route, genuine 3×3 practice and 4×4 connected-tapestry weaving |

## How the ending works

The Witch's golden spindle points to DunBroch's west tower. The triplets help Molly and Merida reach an old tapestry. Elinor recognizes the old stitching and explains the link to the Forgotten Stones. Mor'du's legacy appears as a spectral memory of selfish choices—not a resurrected villain. Molly learns the loom's rules in the nine-patch tapestry and ultimately stitches a sixteen-patch pathway connecting every region. The final choice is to preserve connections rather than constrain anyone's fate. Dawn returns; Elinor and Merida reunite, Angus and the triplets appear, and Molly is thanked as Keeper of the Wisps.

## New gameplay implementation

- src/lib/braveFinaleRoutes.ts: five deterministic, fixed-seed branching route compositions from size-bounded mazes. Wisp pickups, rune stones, golden keys, moon gates and locked doors placed upstream of mandatory closures. All validated exhaustively with the established BFS and reverse-state reachability engine.
- src/lib/braveStealth.ts: guard only advances when the player makes a move, observes the current tile and adjacent corridor, can be distracted by the triplets once, and never causes a permanent loss. An exhaustive time-state solver proves an escape route. src/games/BraveCastleSneak.tsx displays the next guard step and safe alcoves.
- src/lib/braveCircle.ts and src/games/BraveStoneCircle.tsx: five compass bearings matched to readable stone inscriptions, with reset and number-correct feedback.
- src/lib/braveTapestry.ts and src/games/BraveTapestryWeave.tsx: rotating two-ended thread segments, strict border and neighbor validation, BFS connectivity requiring *all* patches in a single joined path. Known verified solutions for 3×3 and 4×4 arrangements; randomized-at-runtime scrambles are NOT used. Undo, reset, progressive wisp guidance and responsive embroidered art.
- src/games/BraveFinaleBackdrop.tsx: three original illustrations with separate castle moonlight, stormy ruined stones, and a living loom at dawn.
- src/games/BraveJourney.tsx: combines 18 stages, six illustrated chapter themes, optional replay and an actual ending. The six-location atlas remains accessible.
- tests/braveFinale.test.ts: verifies five no-softlock routes, stealth solver, compass solution, both tapestry proofs and compatibility with a 9-scene Chapter III browser save. Other game tests unchanged.

## Creative testing checklist

1. Return as a previous player with nine scenes completed and check Chapter IV unlocks without deleting progress.
2. At the Chapter III ending, choose **Turn to the next chapter**. Verify the music/scene changes to moonlit DunBroch.
3. Traverse Midnight Escape, use **Wait**, a side alcove and the triplet distraction in the patrol scene, then enter the old passage. Verify the guard is predictable, not a sudden timed chase.
4. Play the darker Mor'du chapter and rotate the five compass stones. Check that the story preserves the film's ending and doesn't invent a resurrected Mor'du.
5. Reach the loom at dawn. Rotate all nine practice cloth patches, then all sixteen final pieces. Verify no dangling gold-thread joins and a complete epilogue. Replay and resume after reloading.
6. Evaluate mobile horizontal route scrolling, large arrows, switch/undo, and accessibility labels.
7. **Soundtrack remains an explicit pending quality pass.** The existing synthesized themes are functional but owner feedback says they do not yet feel like proper quest music. Composed and licensed-original recorded tracks, if feasible, should replace them before calling audio complete.

## Release state

**Full story and its 18 connected scenes are implemented.** Keep the prior six games, Passport, and coupon wallet unaffected. There is **no Brave star/coupon/Passport reward integration yet**, and native soundtrack production, human mobile UX review, and final polish remain for the last QA module.
