# Brave: The Wisps' Trail — Three-Chapter Story Flow Playtest

## Phase 3D — Chapters I–III adventure-quality overhaul (22 October 2026)

**Owner review and approval:** Three-chapter story flow is promising, but simple mazes, decorative archery targets, fatiguing "ting ting" music and visually similar environments must be overhauled *before Chapter IV*. This revision preserves the established story and focuses exclusively on the nine playable scenes of Chapters I–III. Chapter IV remains out of scope until the owner plays and approves this revision.

**Gameplay overhaul:** Seven authored and exhaustively verified mazes now progress from a welcoming starter to genuinely long branching routes (later paths require about 40–95 optimal moves). Objectives include multiple wisps, activating two rune stones, a hidden golden key, locked doors and two-stone moon gates. All reachable states retain a path to victory, with keyboard/touch movement, undo/reset, automatic horizontal mobile follow and optional three-tier hints from the *current* position. The Witch's trivial three-click sequence is replaced by a four-slot carving deduction with a decoy, undo and arrangement feedback.

**Archery overhaul:** The decorative image is replaced by an original illustrated Highland range. Aim compensation (five horizontal offsets), elevation (three angles) and draw strength (three speeds) affect an explicit gravity/crosswind ballistic model. Three calibrated targets span different distances/heights/winds; failures show measured offsets, correct hits display a flight trace and remain on screen until the player turns to the next target. Untimed and deterministic, never an arbitrary accuracy penalty.

**Atmosphere overhaul:** Chapters now have distinct original SVG stage art: golden DunBroch with Angus and banners, misty standing stones and luminous woodlands, candlelit cottage shelves, carved bears and magical cauldron. The soundtrack is re-arranged into layered 64-beat evolving original Celtic-inspired sketches with sustained fiddle-like/flute-like melody, harp arpeggios, string harmony, soft wind, occasional hand drum and fade on chapter changes. Audio remains muted until enabled, and this is browser synthesis, **not a professionally recorded ensemble**; owner evaluation of musical quality remains essential. The continuous adventure comes first and the six-chapter illustrated atlas is an optional fold; the player's existing local saves and all older games, coupons and Passport records remain unaffected.

**Next gate:** Owner should replay from Chapter I using the visible restart shortcut, then play all three chapters continuously on desktop and phone, judging whether puzzle challenge feels earned, archery is visually and mechanically satisfying, music is comfortable for long listening and chapter environments really feel distinct. Follow up on any flaws **before** building Chapter IV. Tests must remain green before deployment.


**Checkpoint:** 22 October 2026 · Phase 3C · owner requested testing 2–3 chapters together to judge narrative/interface/flow rather than reviewing individual prototypes.

## Scope

A connected, nine-scene mini-campaign built as three three-scene chapters:

1. **The Highland Games:** Courtyard Trial (guided route) → Angus's Shortcut (light/stone/gate) → The Archer's Choice (wind-and-range archery).
2. **Follow the Wisps:** First Light → Whispering Stones → Hidden Clearing (progressively longer misty map puzzles with mandatory light, stone and gate).
3. **The Witch's Workshop:** A Curious Bargain (rune-locked path) → The Rune Sequence (order puzzle) → The Witch's Secret (long final route and castle cliffhanger).

All narrative is original and connected through wisps, a carved bear, a spindle, golden thread and a return to DunBroch. Chapter transitions use an authored ending passage and a distinct atmospheric music theme. Story locations IV–VI remain in the clickable atlas; no later chapters or rewards are falsely playable.

## Architecture

- src/data/braveCampaign.ts: complete nine-scene story script, seven authored maps, archery targets, rune symbols and chapter bridges.
- src/games/BraveJourney.tsx: single continuous playthrough, parchment scenes, chapter paintings, dialogue, gate/path board, archery/rune controls, ending pages, next-chapter transitions, gentle hints, mouse/touch/keyboard.
- src/lib/braveChallenges.ts: deterministic, forgiving wind-range shot and rune sequencing rules.
- src/lib/bravePuzzle.ts: existing exhaustively verified state-machine extended for first routes with optional puzzles; all gated route scenes retain mandatory pickup→stone→gate sequence.
- src/lib/braveProgress.ts: separate browser-local versioned progress key; contiguous-only completed-stage ledger and resume/replay. No changes to Passport, wallet or six existing games.
- tests/braveCampaign.test.ts: all nine scenes authored, all seven levels BFS validated for solution and reverse reachability, crosswind/strength logic and full campaign unlock/save integrity.

## Playtest journey

Open Brave from the game shelf and choose **Begin the journey**. The story starts in the Highland Games; proceed through the three scenes without returning to the arcade. Follow the page-turn prompts into the Whispering Wood and then the Witch's Workshop. On map pages, touch/keyboard arrows guide the character. The wind-and-range shooting scene is untimed; missed shots provide a diagnostic hint without restarting the chapter. The rune scene is untimed and forgiving.

**Important things to evaluate:** Whether the first puzzle is welcoming; how it feels moving through seven increasingly complicated paths; whether the two alternative mechanics provide relief rather than disrupt immersion; whether the story between chapters creates real anticipation; whether music switches at the right point; phone controls and scroll behavior; whether completion scenes appear at a natural pace; whether a page refresh resumes the right stage; and whether replaying earlier scenes preserves progress.

### Quality gates

- [x] No visible developer notes in player-facing scenes.
- [x] No forced countdown or reflex challenge.
- [x] Nine scenes in story order, seven route maps and two other puzzle formats.
- [x] Every route map has a verified shortest solution and no reachable softlock states.
- [x] Distinct soundtrack per chapter, opt-in and small mute control.
- [x] Safe, isolated browser save preventing skipping ahead while allowing revisits.
- [ ] Owner desktop and phone playthrough for visual/story flow.
- [ ] Owner feedback on challenge variety, pacing, art detail and soundtrack.
- [ ] Only then begin Chapter IV castle mechanics and later content.

**Scope limitation:** This is a flow-validation beta; it does not include full character portraits, inventory, later castle/ruins/finale chapters or Passport rewards. Campaign progress is stored in this browser only.
