# Game 07 — Brave: The Wisps' Trail

## Phase 4A — Passport Chronicle and expandable arcade hub (22 October 2026)

**Owner direction and completion scope:** Make Molly's six-chapter Brave completion a meaningful Passport keepsake rather than just a score; after solving all 18 scenes, unlock a permanent Keeper of the Wisps stamp and a beautiful, readable storybook with an original Merida–Molly friendship epilogue. Redesign overcrowded top navigation into icon-based categories: a live-games drop-down, direct Passport/Wallet access, a separate Coming Soon list, chronological seasonal-events drop-down, and a developer postbox. Tease four future games without implementing them yet. Preserve everything already released and update logs.

**Implemented:** \`src/data/braveChronicle.ts\` now holds thirteen original, richly written illustrated-story spreads across the six Brave chapters, culminating in a warm Highland farewell where Merida and Molly part as friends without rewriting the movie's ending. \`src/games/BraveChronicle.tsx\` provides a parchment open-book reader with chapter bookmarks, page-turn controls, original in-game chapter landscape illustrations, keyboard support and an epilogue. **Unlocks only after every canonical Brave stage is completed.** The Passport shows a lock/progress meter while unfinished, then awards the Keeper's stamp and a permanent book-open control; the final tapestry's win panel now links straight into the Passport. Replaying any stage does not revoke the book. \`src/games/Passport.tsx\` exports version-5 backups including Brave progress while accepting backups from versions 1–4 without erasing their separate Brave save. All seven playable games are represented in the Passport record list; the existing Pink Rush coupon wallet is unmodified.

**Navigation overhaul:** \`src/components/ArcadeNavigation.tsx\` replaces ten separate header links with compact, responsive native expand/collapse category menus. **Games** includes only the seven released games (including Brave); **Passport** and **Wallet** stay direct; **Coming Soon** holds *Kung Fu Panda, Courage the Cowardly Dog, Toy Story and The Addams Family* with honest not-yet-playable descriptions and no announced dates; **Events** sorts verified yearly occasions, October 31 (Halloween Heist, existing playable Nine-Nine game) and November 13 (Molly's birthday, preview/roadmap vault only), by the nearest local-calendar occurrence; the **✉ Developer Postbox** displays dated, read-only release/workshop notes and explicitly does not receive messages. The homepage now has separate **Live Games**, **Coming Soon** and **Little Occasions** sections. No fake new mini-games, event bookings, emails, or live birthday prizes were introduced.

**Quality and boundaries:** \`tests/arcadeChronicle.test.ts\` checks the strict unlock and old saves, thirteen complete chapter/epilogue spreads, honest upcoming list, seasonal date rollover/sorting and developer notes; keep all prior game tests green. No cloud sync: keepsake and unlock still live in the browser; Passport backup can preserve them. **Owner's concern that the generated synthetic Celtic music is unsatisfying remains open**—neither this change nor the Chronicle resolves original recorded-score production. Next release gate is the owner's UI and reading-flow feedback, mobile testing, and a proper music-production plan rather than building the teaser games immediately.


## Phase 3E — Full Brave Six-Chapter Adventure (22 October 2026)

**Owner greenlight:** Chapters IV–VI are approved for implementation following the Chapters I–III quality overhaul. The owner **still rejects the current synthesized music as final-quality**, so audio is explicitly unfinished even after the complete game is playable.

**Implemented:** The second act adds *A Bear in the Castle* (Midnight Escape, Triple Trouble, Secret Passage), *Mor’du's Shadow* (Tracks in the Mist, Broken Circle, Shadow of the Bear) and *Mend the Bond* (Last Wisp, Threads of Fate, A Brave Heart). The campaign now contains **six connected chapters and 18 actual playable stages**. A predictable castle guard and triplet distraction, a five-stone compass puzzle and real 3×3/4×4 embroidered tile-rotation finale complement five new complex, exhaustively validated labyrinths. Distinct original chapter art now covers six settings, and the narrative concludes with Merida, Elinor, Molly and the wisps. Previously saved Chapter III progress remains compatible. No film soundtrack or recorded Pixar assets were used.

**Important limitations:** The owner hasn't yet played Chapters IV–VI; current Celtic-inspired synthesized audio remains a known unsatisfied requirement. Brave Passport/star rewards, professionally produced original music, final mobile UX and editorial QA remain a separate polish gate. The existing arcade games and coupons are unchanged. See **BRAVE_FINALE_PLAYTEST.md** for exact testing and code notes.


## Phase 3D — Chapters I–III adventure-quality overhaul (22 October 2026)

**Owner review and approval:** Three-chapter story flow is promising, but simple mazes, decorative archery targets, fatiguing "ting ting" music and visually similar environments must be overhauled *before Chapter IV*. This revision preserves the established story and focuses exclusively on the nine playable scenes of Chapters I–III. Chapter IV remains out of scope until the owner plays and approves this revision.

**Gameplay overhaul:** Seven authored and exhaustively verified mazes now progress from a welcoming starter to genuinely long branching routes (later paths require about 40–95 optimal moves). Objectives include multiple wisps, activating two rune stones, a hidden golden key, locked doors and two-stone moon gates. All reachable states retain a path to victory, with keyboard/touch movement, undo/reset, automatic horizontal mobile follow and optional three-tier hints from the *current* position. The Witch's trivial three-click sequence is replaced by a four-slot carving deduction with a decoy, undo and arrangement feedback.

**Archery overhaul:** The decorative image is replaced by an original illustrated Highland range. Aim compensation (five horizontal offsets), elevation (three angles) and draw strength (three speeds) affect an explicit gravity/crosswind ballistic model. Three calibrated targets span different distances/heights/winds; failures show measured offsets, correct hits display a flight trace and remain on screen until the player turns to the next target. Untimed and deterministic, never an arbitrary accuracy penalty.

**Atmosphere overhaul:** Chapters now have distinct original SVG stage art: golden DunBroch with Angus and banners, misty standing stones and luminous woodlands, candlelit cottage shelves, carved bears and magical cauldron. The soundtrack is re-arranged into layered 64-beat evolving original Celtic-inspired sketches with sustained fiddle-like/flute-like melody, harp arpeggios, string harmony, soft wind, occasional hand drum and fade on chapter changes. Audio remains muted until enabled, and this is browser synthesis, **not a professionally recorded ensemble**; owner evaluation of musical quality remains essential. The continuous adventure comes first and the six-chapter illustrated atlas is an optional fold; the player's existing local saves and all older games, coupons and Passport records remain unaffected.

**Next gate:** Owner should replay from Chapter I using the visible restart shortcut, then play all three chapters continuously on desktop and phone, judging whether puzzle challenge feels earned, archery is visually and mechanically satisfying, music is comfortable for long listening and chapter environments really feel distinct. Follow up on any flaws **before** building Chapter IV. Tests must remain green before deployment.


## Phase 3C — Brave three-chapter continuous story playtest (22 October 2026)

**New owner direction:** Evaluate the story, interface and—especially—the **flow across two or three consecutive chapters**, not one isolated module. We therefore implemented all nine connected scenes of Chapters I–III as a single playable test arc, with story bridges and distinct atmospheric chapter music. This explicitly supersedes the older Module 02-only / Coming Soon / world preview status entries below, which are retained as historical milestones.

**Available now:** Chapter I The Highland Games (two routes + wind-aware archery), Chapter II Follow the Wisps (three increasingly involved routes), Chapter III The Witch's Workshop (two routes + rune-order puzzle). Seven authored routes pass exhaustive reverse-reachability and solution checks; wrong archery choices and runes are retryable without penalties. Story progress, unlocked pages and resume/replay are isolated in mollys-brave-journey-v1. Original Keeper prologue and six-place atlas remain, while Chapters IV–VI are illustrated story previews only. No Passport rewards yet.

**Flow review gate:** Owner plays the three chapters together (desktop and mobile if possible), focusing on emotional continuity, chapter transition pacing, dialogue, visuals, music changes, puzzle variety and save/resume. Pause further chapter work until that review. See BRAVE_FLOW_PLAYTEST.md for exact coverage and QA prompts.

## Nine-scene playable Chapters I–III · Chapters IV–VI still in development

## Phase 3B — Brave Module 02: The First Crossing (22 October 2026)

**Owner feedback and approval:** Module 01's illustrated storybook interface was approved. Player-facing developer phrases ("movement puzzles will arrive", "18 adventures planned", "in development" and "world preview") have been removed or replaced with in-world language. The gentle ambient melody has been made noticeably quicker and more melodic. Each of the six chapters now has its own original instrumental theme; music switches immediately when the player selects a new map chapter and remains opt-in/muted until enabled.

**Module 02 implementation:** A single small, playable **First Crossing** room sits beneath the storybook map. The player follows an 11×7 path, gathers the wisp, lights the standing stone, opens its gate and reaches the far glen using keyboard (arrow/WASD) or touch controls, with undo and reset. This is one engine demonstrator, **not** Chapter I's three finished levels or the 18-level campaign. It awards no Passport stars and has no persistent gameplay scores yet.

**Safety and puzzle proof:** New pure deterministic src/lib/bravePuzzle.ts models movement, blocked steps, pickups, stone activation and gated passage. The BFS validator checks EVERY reachable game state for a route to completion (not just one happy-path solution). The authored room has a shortest winning route of 16 moves, including the mandatory wisp, stone and gate, and the tests cover illegal moves, undo immutability, replay, invalid maps, all-state reachability and six distinct chapter music sketches. src/games/BraveCrossing.tsx is a small accessible player-facing view; src/lib/braveMusic.ts synthesizes six fully original live melodies, preserving audio cleanup and small mute button.

**Next production gate:** Have the owner play the First Crossing on desktop/phone and judge whether the controls and puzzle feel like part of the illustrated world. Tune visuals/music/mechanics before Module 03, which is reserved for THREE polished Highland Games levels and the first environmental archery. Keep the remaining chapters out of scope until individually reviewed.

## Implementation status update — Phase 3A, Module 01 (22 October 2026)

**The user has now explicitly GREENLIT Brave development**, then requested a **careful, one-module-at-a-time process** with exceptional attention to illustrated atmosphere and world-building. The earlier instructions below saying “planned only / do not start until greenlit” are historical; they are superseded by this update.

**Current playable status: WORLD PREVIEW ONLY.** An original illustrated six-destination Highlands map, personal Keeper prologue choice, chapter/character scene scrolls and gentle opt-in ambient music are implemented in Module 01. None of the eighteen future chapter puzzles is live yet. The game shelf says WORLD PREVIEW instead of Coming Soon. This is by design while awaiting owner visual/music review.

See [BRAVE_MODULAR_PRODUCTION.md](BRAVE_MODULAR_PRODUCTION.md) for the authoritative nine-module roadmap, art direction, detailed scope and quality gates. Next is Module 02 (deterministic map puzzle solver), **only after owner approval of the first module**.

**Approval:** User enthusiastically approved this direction as a *Brave*-inspired storybook puzzle adventure but requested **Pink Rush first**. Do not start Brave implementation until the user explicitly gives a later green light. The arcade shelf must show Brave as **COMING SOON** with an actual preview, not a dead link.

### The promise
Molly becomes **Keeper of the Wisps**, a gentle guiding companion on Merida's new side adventure through a magical Scottish Highlands-inspired landscape. The tone is curious, brave, warm, a little suspenseful and gorgeously illustrated. The narrative is an ORIGINAL tribute, not a retelling of the Disney/Pixar film or a copy of its dialogues.

### Gameplay structure
- **Core puzzle:** interactive **map-based pathfinding**, not a reskinned Connections or Bazinga logic game. Move Merida along grounded traversable paths and react to map mechanics: bridges, streams, gates, coloured wisps, stones, bear tracks, hidden forest routes. Every puzzle has a verifiable route and an explicit description of its rules. Free camera movement and zoom on touch devices; high contrast movement options.
- **Secondary mechanic:** a **logic-friendly archery minigame** at narrative chapter checkpoints. Plan shots accounting for wind, range, moving obstacles or order of targets. Keyboard and touch controls; no reflex-only requirement. For accessibility, offer a slower/non-timed mode.
- **Finale:** **Mend the Tapestry**, a visually engaging tile-arrangement/rotation puzzle in which embroidered thread motifs connect between neighboring pieces. Use an original cloth pattern rather than reproducing the screen-used tapestry.
- **Quest map:** six illustrated chapters, three handcrafted levels each for **18 levels**. Optional replay and chapter progress tied into the Passport. Cozy/Clever/Expert distinction may be achieved through natural campaign progression rather than a disruptive global selector (decide when user greenlights).
- **No opaque puzzle dependencies:** maps and target states are programmatically verified using a path search, and the tapestry has a known constructed solution. A visible solution shouldn't be exposed prematurely, but all move rules must be readable. Test multiple valid/invalid routes and graceful reset/undo.

### Campaign chapters
1. **The Highland Games** — castle courtyard, archery target basics, choose-your-path introduction; a welcoming first quest.
2. **Follow the Wisps** — glowing forest, stone circles, wisps activating doors and branching safe routes.
3. **The Witch's Workshop** — rune sequences, matching components, magical object-placement and mechanical controls.
4. **A Bear in the Castle** — gentle stealth-route puzzle, triplet distractions, guards' predictable patrol paths; no punishing chase.
5. **Mor'du's Shadow** — wilderness ruins, multiple interacting environmental hazards, strategic planning with predictable movement.
6. **Mend the Bond** — final forest crossing and tapestry reconstruction. Original uplifting conclusion about courage, empathy, choices and family.

### Original artwork/style
- Misty Celtic-inspired hills, ancient stone circles, foxglove/pine silhouettes, teal-blue floating wisps, weathered castle interiors, embroidered borders and warm candlelight. Merida is represented by an ORIGINAL stylized red-curled archer heroine inspired by the theme, not licensed stills or traced model sheets. Cute original bear, horse and witch-shop graphics.
- Do not embed Disney animation frames, posters, logo, recorded soundtrack, actor voices or copied screenplay. Crediting a third-party image is not a blanket reproduction license. Show-level source notes should document reference inspiration and asset authorship.
- The UI should still feel at home within Molly's Cozy Arcade, but visually distinct from the dark-pink concert and the Nine-Nine detective board.

### Research/checks before implementation
- Reverify the relevant narrative facts against Pixar/Disney official *Brave* resources: Merida, Queen Elinor, wisps, Mor'du, tapestry, brothers and DunBroch setting. Avoid invented claims about exact geography or film canon.
- Write the map engine and tests *before* creating 18 level files. Include a solution validator, path legality assertions, chapter unlock/save migrations, keyboard/touch navigation and screen-reader alternatives.
- Put new stars and a few achievements into the existing Passport without discarding older backups. Maintain all six playable existing games and all score ledgers.

### Release dependencies
1. Pink Rush six-game release deployed and beta tested.
2. User provides explicit **green light for Brave development**.
3. Build mechanics prototype → two playable chapter demos → full 18-level storybook campaign → CI and player testing.

### Birthday project
November 13 Birthday Quest and real coupon wallet have separate high priority. Brave must not unexpectedly displace the user's birthday-project timeline; defer the adventure if birthday preparations become urgent.
