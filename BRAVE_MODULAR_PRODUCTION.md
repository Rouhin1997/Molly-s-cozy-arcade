# Brave: The Wisps’ Trail — Modular Production Roadmap

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

## Approved 22 October 2026 · Modules 03–05 delivered together for story flow review

**Owner direction:** This game requires patience and impeccable storybook artwork, world and atmosphere building. Deliver careful, reviewable modules **one by one**, not a rushed 18-level release. Approval between major creative steps is essential.

### World principles
Molly is Keeper of the Wisps, helping Merida on a new Highland side story. Its six locations must each have distinctive weather, light, architecture, sound, dialogue and puzzle mechanics. The core adventure is map navigation, with environmental archery and an embroidered-tapestry finale. The characters and setting are inspired by Disney/Pixar's Brave, but the actual story, dialogue, illustration and score are original.

Official setting reference: https://www.pixar.com/brave — Pixar emphasizes old DunBroch stonework, mist and highly variable Scottish Highland weather, lichen-covered rocks, forests, the standing stones influenced by the Callanish stones, Merida's horse Angus, and the Witch's carved bear decorations.

### Module gates

| Phase | Deliverables | Proceed only after |
|---|---|---|
| 01 — Open the storybook | World bible; original illustrated interactive map; six scene previews; 18 future level titles; Molly's introductory choice; original gentle harp/wind ambience; responsive layout and safe preview save | Owner evaluates map artwork, mobile legibility, dialogue, music volume and emotional tone; all CI tests pass |
| 02 — Rules of the road | Deterministic tile-map engine, walls, gates, wisp pickups, interactions, undo/reset, movement controls, reachability/solution validator; one minimal test room | Exhaustive state-space tests establish no softlocks, proper movement, keyboard/touch fairness, and meaningful puzzles |
| 03 — Highland Games | Three illustrated playable Chapter I levels, first archery objects, Angus, environmental interaction and opening story | Human playthrough, solvable maps, atmosphere approved |
| 04 — Follow the Wisps | Three forest levels, standing stones and wisp activated paths, optional collectibles | Environment rules clear, validated routes, collectible not required |
| 05 — Witch's Workshop | Three workshop levels with runes, item placement and character comedy | State validation, no inventory softlocks, proper art |
| 06 — Bear in the Castle | Three gentle guard-patrol/secret-passage puzzles and triplet interactions | Predictable stealth rules, fair escape routes |
| 07 — Mor'du's Shadow | Three trickier ruined-stone and hazard puzzles, slightly darker visuals | Hazards visible, no arbitrary sudden losses, clear route reasoning |
| 08 — Mend the Bond | Three final levels, original magical tapestry rotation/assembly finale, warm story conclusion | Tile solution verified, narrative flags coherent, owner approves ending |
| 09 — Integrated QA | Chapter map unlocking, save/resume, stars/stamps and Passport, audio/art polish, accessibility and complete regression suite | Existing six games, Pink Rush coupon wallet, old Passport backups unaffected, production deploy green |

## Phase 3B — Brave Module 02: The First Crossing (22 October 2026)

**Owner feedback and approval:** Module 01's illustrated storybook interface was approved. Player-facing developer phrases ("movement puzzles will arrive", "18 adventures planned", "in development" and "world preview") have been removed or replaced with in-world language. The gentle ambient melody has been made noticeably quicker and more melodic. Each of the six chapters now has its own original instrumental theme; music switches immediately when the player selects a new map chapter and remains opt-in/muted until enabled.

**Module 02 implementation:** A single small, playable **First Crossing** room sits beneath the storybook map. The player follows an 11×7 path, gathers the wisp, lights the standing stone, opens its gate and reaches the far glen using keyboard (arrow/WASD) or touch controls, with undo and reset. This is one engine demonstrator, **not** Chapter I's three finished levels or the 18-level campaign. It awards no Passport stars and has no persistent gameplay scores yet.

**Safety and puzzle proof:** New pure deterministic src/lib/bravePuzzle.ts models movement, blocked steps, pickups, stone activation and gated passage. The BFS validator checks EVERY reachable game state for a route to completion (not just one happy-path solution). The authored room has a shortest winning route of 16 moves, including the mandatory wisp, stone and gate, and the tests cover illegal moves, undo immutability, replay, invalid maps, all-state reachability and six distinct chapter music sketches. src/games/BraveCrossing.tsx is a small accessible player-facing view; src/lib/braveMusic.ts synthesizes six fully original live melodies, preserving audio cleanup and small mute button.

**Next production gate:** Have the owner play the First Crossing on desktop/phone and judge whether the controls and puzzle feel like part of the illustrated world. Tune visuals/music/mechanics before Module 03, which is reserved for THREE polished Highland Games levels and the first environmental archery. Keep the remaining chapters out of scope until individually reviewed.

### Module 01 files already developed
- src/data/braveWorld.ts: six complete setting outlines, locations, dialogue and map coordinates, 18 planned level titles, isolated saved Keeper choice/visited scenes.
- src/games/BraveTrail.tsx: original illustrated SVG Scottish Highland map (castle, forests, standing stones, Witch's cottage, ruins, magical woven clearing, mist and wisps); interactive location/story scroll, prologue and two opening story decisions.
- src/styles.css: parchment, forest/teal/gold visual styling and responsive motion.
- src/App.tsx: Game 07 **WORLD PREVIEW** shelf link. This does not imply the 18 levels are implemented.
- tests/braveWorld.test.ts: validates chapter count, level identifiers, scene substance, coordinates and save resilience.
- Audio: small ♪ toggle, muted by default, soft plucked synthesized harp-like melody with faint wind, no borrowed film tracks. Audio stops on unmount.

### What Module 01 deliberately does NOT include
No real puzzle engine, archery, playable eighteen levels, collectible rewards or Passport points. Preview clicks do not falsely unlock levels. Save is isolated in mollys-brave-wisps-v1. The owner should review the art and sound first; we will not skip to Module 02 until approved.

### Future development checkpoint
Module 01's artwork and direction were approved. Module 02 has been implemented separately with the exhaustive solver and one tiny playable test glen. The next human review covers movement/touch, undo, map clarity and chapter music before starting Module 03. Keep this roadmap and DEVELOPMENT_HANDOFF.md current after each phase.
