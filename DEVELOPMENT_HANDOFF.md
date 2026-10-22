# Molly's Cozy Arcade — Development Handoff

## Phase 3C — Brave three-chapter continuous story playtest (22 October 2026)

**New owner direction:** Evaluate the story, interface and—especially—the **flow across two or three consecutive chapters**, not one isolated module. We therefore implemented all nine connected scenes of Chapters I–III as a single playable test arc, with story bridges and distinct atmospheric chapter music. This explicitly supersedes the older Module 02-only / Coming Soon / world preview status entries below, which are retained as historical milestones.

**Available now:** Chapter I The Highland Games (two routes + wind-aware archery), Chapter II Follow the Wisps (three increasingly involved routes), Chapter III The Witch's Workshop (two routes + rune-order puzzle). Seven authored routes pass exhaustive reverse-reachability and solution checks; wrong archery choices and runes are retryable without penalties. Story progress, unlocked pages and resume/replay are isolated in mollys-brave-journey-v1. Original Keeper prologue and six-place atlas remain, while Chapters IV–VI are illustrated story previews only. No Passport rewards yet.

**Flow review gate:** Owner plays the three chapters together (desktop and mobile if possible), focusing on emotional continuity, chapter transition pacing, dialogue, visuals, music changes, puzzle variety and save/resume. Pause further chapter work until that review. See BRAVE_FLOW_PLAYTEST.md for exact coverage and QA prompts.


## Phase 3B — Brave Module 02: The First Crossing (22 October 2026)

**Owner feedback and approval:** Module 01's illustrated storybook interface was approved. Player-facing developer phrases ("movement puzzles will arrive", "18 adventures planned", "in development" and "world preview") have been removed or replaced with in-world language. The gentle ambient melody has been made noticeably quicker and more melodic. Each of the six chapters now has its own original instrumental theme; music switches immediately when the player selects a new map chapter and remains opt-in/muted until enabled.

**Module 02 implementation:** A single small, playable **First Crossing** room sits beneath the storybook map. The player follows an 11×7 path, gathers the wisp, lights the standing stone, opens its gate and reaches the far glen using keyboard (arrow/WASD) or touch controls, with undo and reset. This is one engine demonstrator, **not** Chapter I's three finished levels or the 18-level campaign. It awards no Passport stars and has no persistent gameplay scores yet.

**Safety and puzzle proof:** New pure deterministic src/lib/bravePuzzle.ts models movement, blocked steps, pickups, stone activation and gated passage. The BFS validator checks EVERY reachable game state for a route to completion (not just one happy-path solution). The authored room has a shortest winning route of 16 moves, including the mandatory wisp, stone and gate, and the tests cover illegal moves, undo immutability, replay, invalid maps, all-state reachability and six distinct chapter music sketches. src/games/BraveCrossing.tsx is a small accessible player-facing view; src/lib/braveMusic.ts synthesizes six fully original live melodies, preserving audio cleanup and small mute button.

**Next production gate:** Have the owner play the First Crossing on desktop/phone and judge whether the controls and puzzle feel like part of the illustrated world. Tune visuals/music/mechanics before Module 03, which is reserved for THREE polished Highland Games levels and the first environmental archery. Keep the remaining chapters out of scope until individually reviewed.


## Latest development — Phase 3A: Brave world-first modular preview (22 October 2026)

**User direction:** Fully greenlit Brave, specifically a **beautiful illustrated storybook** with original gentle Celtic-style harp tones, soft wind ambience and a small mute icon. Shortly afterward the user *explicitly slowed down the workflow*: **break development into careful modules and build them one by one; patience and impeccable world/atmosphere building are essential.** Do not attempt all eighteen playable levels in a single run. The authoritative nine-module roadmap and quality/review gates live at **`BRAVE_MODULAR_PRODUCTION.md`**.

**Module 01 COMPLETE IN CODE — world preview, not chapter gameplay:**
- `src/data/braveWorld.ts`: six scene-rich original location briefs and chapter map coordinates, 18 **proposed future level names**, bespoke new Merida and wisp lines, four environmental motifs per chapter. Save model `BravePreviewSave` version 1 isolated at `mollys-brave-wisps-v1`, holding Keeper vow and inspected locations only. No Passport point manipulation.
- `src/games/BraveTrail.tsx`: detailed original vector map (painted mountains, mists, castle, river, pines, stone circle, Witch’s timber cottage, moonlit ruins, wisp loom); six clickable illustrated chapter markers and chapter/story parchment; Molly's first interactive prologue (listen or follow), short original character interaction. Original AudioContext slow triangular plucks and airy undertone, off until user clicks ♪; cleanup on mute/unmount. Full reduced-motion CSS and accessible map navigation. Tiny screen map scrolls sideways at fixed coordinate aspect ratio with a six-button chapter strip to avoid losing pins.
- `src/styles.css`: dedicated parchment/pine/teal/gold storybook styling with large banner, illustrated map, animated wisp lights, readable parchment chapter scroll, responsive design.
- `src/App.tsx`: Game 07 shelf now **WORLD PREVIEW** and directly opens the new Brave route. Six existing playable titles and their stats remain untouched. No new fake completion awards.
- `tests/braveWorld.test.ts`: verifies six settings, exactly eighteen uniquely named **future** levels, map bounds, authored scenes and isolated save/import fallback.

**Research grounding:** Official Pixar Brave story/world page https://www.pixar.com/brave (Merida, Angus, Witch, Elinor, Mor’du, old DunBroch castle, variable Highland weather, Callanish-inspired standing stones). This is an original storybook reinterpretation, not a reproduction of Pixar assets or film audio.

**Critical continuation rule:** **STOP after Module 01** and obtain owner's feedback on map art, phone legibility, music and pacing BEFORE beginning Module 02. Module 02 is a distinct deterministic grid-state engine with BFS/solver, undo/reset and no-softlock tests; only one small prototype test room, not an entire chapter. Modules 03–08 will implement one chapter at a time after explicit staged review. Module 09 integrates saves/Passport/end-to-end QA.

Existing Pink Rush remains fully intact with v4 Passport and the redeemed coupon's browser-local terminal marker. Birthday Quest and secure rewards are separate later work.

## Latest checkpoint — Phase 2L: 87-question BLINK content audit, rotation and real crowd sound (22 October 2026)

**User feedback from full Pink Rush 2.0 play-through:** screenshot showed a 2020 Selena Gomez clue saying "sweet treat" while the other three answers were Pink Venom/STAY/GO; trivial elimination made the game dull. Another 2025 Coachella clue named ROSÉ and LISA in the crowd while offering them as answer options. Three practice shows repeated too many questions. The existing synth "crowd cheering" was mostly beeps. A wide "sound on/off" bar dominated the stage; in-game disclaimer contained redundant claims. User liked the **existing full-screen winner** and wants it retained.

**Implemented in this phase:**
- **`src/data/pinkRushEditorial.ts`** centrally overrides and audits the 20 group-song, 12 solo and 30 original fan-life questions. It rewrites flimsy prompts, removes answer-title and emoji giveaways, supplies plausible distractors, and stops identifying three of four suspects (members) in questions. The Selena Gomez question is now about her prior Disney Channel role, among four actual BLACKPINK collaborations. Coachella solo question asks about the Sunday solo set, without naming ROSÉ/LISA as excluded participants.
- **`src/data/pinkRushFanExtra.ts`** adds **17** source-grounded questions (the 2026 Grammy APT. nominations and opening performance, Korean game cultural reference, JISOO's Newtopia, Zayn/EYES CLOSED 2025 collaboration, TIME's 2022 Entertainer of the Year). **87 total**. Official Grammy, Yonhap, Korean Film Council, TIME/Soompi URLs in source data.
- `src/data/pinkRush.ts`: applies editorial layer when questions are used in the live game, hides answer year badges automatically, enumerates visible clue-answer leaks, picks questions by seeded order *and least-recently seen* when provided with history.
- `src/lib/pinkRush.ts`: optional browser-saved `recentPractice` history migrates safely from existing v1 progress and helps fresh practice shows avoid overlap until category exhaustion. Does **not** reset existing scores, coupon redemptions, old daily shows, or legacy saves.
- **Sound:** Wikimedia Commons [Clapping hurray.ogg](https://commons.wikimedia.org/wiki/File:Clapping_hurray.ogg) is a public-domain 11.6-second real recording with cheering/clapping from PDsounds.org by starlite. It is linked as an `HTMLAudioElement` in `src/games/PinkRush.tsx` (Wikimedia original URL `https://upload.wikimedia.org/wikipedia/commons/a/a8/Clapping_hurray.ogg`) and played in a short increasing-volume excerpt on success; incorrect responses interrupt it. Only the pre-existing short original instrumental finale stinger remains from `src/lib/pinkConcertAudio.ts`, which no longer pretends to synthesize a crowd. Sound toggle is now one accessible `🔊/🔇` icon at the **upper-right corner of the stage**, rather than a full-width button. External audio requires network availability and Ogg support; unsupported cases fail silently without hurting the game.
- In-game footer is now intentionally one concise fan-game attribution sentence linking YG's discography, without extraneous commentary about storage, original graphics, commercial recordings or timelines.
- `tests/pinkRush.test.ts`: automated checks to reject answer leakage from labels/prompts, member names in four-member choices, require a real collaboration distractor set for the Ice Cream example, and ensure **four new consecutive practice concerts contain no repeat regular question**. Other 2K tests remain, including wallet redemption.
- Docs README, GAME_DESIGN, PINK_RUSH_GAME_AND_SOURCES, DEVELOPMENT_HANDOFF updated to preserve continuity.

**Next user QA:** Play three back-to-back fresh practice concerts (old already-started sessions will retain their question IDs); judge the difficulty without arbitrary obscurity. Verify audible human crowd cheers after correct answers, fading on miss, corner icon on desktop/mobile, and existing finale/coupon path. External Wikimedia audio may not load offline; no fake "crowd" tones remain. Brave still Coming Soon.

## Latest release — Phase 2K: Pink Rush 2.0, fuller BLINK trivia + one-time wallet (22 October 2026)

**Greenlight:** User played the first Pink Rush, wanted (1) black/pink theme with less explanatory filler; (2) wider BLINK fan-culture trivia, including pets/brand ambassadors/film-TV/Coachella/Lisa's FIFA 2026 song/Labubu, not just albums; (3) concert stage and gameplay **simultaneously visible on PC/phone**; (4) pulsing stage, synth crowd cheering that rises with a correct answer and dims on mistakes, plus a spectacle finale; (5) consequential mistakes that turn off a lit stage light and require replaying the previous act; (6) greater variety/replayability and a one-time blind-choice coupon for Molly.

### Implemented
- New canonical `src/data/pinkRushFan.ts`: 30 public, checked fan-life cards, attributed to sources such as FIFA, Yonhap, CNA, Tatler, Reuters, License Global. Song/solo/era content remains; ~70 total items. `src/data/pinkRush.ts`: new deterministically rotating **12-act** setlist with 5 fan-life, 3 solo spotlights, 2 group tracks, 1 era ordering and 1 encore. Old eight-act saved shows still work.
- `src/lib/pinkRush.ts`: genuinely consequential mistake rollback (decrements session index, resets the previous won round while preserving the current failed answer), score-best anti-farming and reward state machine.
- **Voucher choices:** (A) Teach Rouhin a short BLACKPINK or BP solo dance, (B) Have Rouhin sing a BLACKPINK or solo song, (C) Rouhin gives one full minute praising Lisa. `src/games/PinkWallet.tsx`: three blind cards, player choice, reveals all prizes after selection, one active gift, Redeem confirmation, ability to **surrender it for a new draw only after completing another full concert**, and permanent redeemed keepsake. The wallet is reachable through navigation, Pink Rush and Passport.
- On redemption, `PinkProgress.coupon.status='redeemed'` forever unless user tampers with/clears browser state; replay never issues a second reward. A separate `mollys-pink-rush-redeemed-v1` marker is written and merged into loaded saves and imported Passport backups. **Do not claim client-only/browser-local permanence is secure across browsers or devices.** Backend auth + durable reward ledger is future work if user needs unforgeable entitlement.
- `src/lib/pinkConcertAudio.ts`: original synthesized crowd-cheer wash, pulse accents and finale fanfare, independent of copyrighted sound samples. Sound enabled on actual click, mute control present. 
- `src/games/PinkRush.tsx`: responsive black/pink **stage and trivia board in one live composition**, sticky compact stage above question controls on phones; correct-answer light pulses, wrong-answer dimming, finale fullscreen animated celebration and mystery reward entry; replaces decorative bottom scrapbook with real interactive 12-act tour log.
- `src/styles.css`: full black/hot-pink concert identity, sticky responsive mobile stage, wallet blind-card views, redeem UI and full-screen crescendo finale. No rework to the other five games.
- `src/App.tsx`: sixth game's route now passes `onWallet`, plus a dedicated Wallet nav; Birthday Vault is still a separate planned feature. `src/games/Passport.tsx`: redeemed gift archived on Passport; restore reconciles irreversible local redeemed marker. Passport **format version 4** unchanged.
- `tests/pinkRush.test.ts`: reworked to test fan-life pool, deterministic 12 acts, wrong choice rollback, comeback path, personal best and anti-farming, three unique hidden rewards, surrender/replay, permanent redemption, old eight-act shows, local redemption marker and stale-backup imports.

### Next session / owner's browser QA
1. Test Pink Rush on desktop and phone: stage **must** remain visible while tapping choices/encore; check subtle member light pulses and synthesized crowd at comfortable volume. Check sound mute/unmute and fullscreen final celebration.
2. Try one wrong answer from act 2 onward: previous stage light should go dark, previous act should become playable again, and the originally failed act should resume afterward. Replay cannot double-award stars.
3. Finish a fresh show, select one of three blind gifts, check that other two reveal afterward. Verify Wallet and Passport display it. Try the **surrender-and-repeat** route on an unredeemed coupon; redeem one and verify it becomes terminal even after another concert and an older backup restore.
4. Real-world coupon redemption enforcement across devices is NOT secure in current browser-only architecture; future server-backend task requires owner decision. Existing private birthday-coupon wallet architecture remains a separate longer-term concern.
5. Beta testers and owner should judge whether factual BLINK content feels playful; any fan fact not matching official/public reputable sources should be corrected. Brave still **Coming Soon** and still needs its own greenlight. November 13 Birthday Quest remains important.

## Latest development — Phase 2J: BLACKPINK Pink Rush + Brave approved docket (22 October 2026)

**Direct user approval:** Plan BOTH games as dedicated worlds. Implement **Pink Rush** immediately and place the *Brave*-inspired adventure on the **Coming Soon** shelf. The user explicitly requested **NO difficulty levels** for Pink Rush: a relaxed, joyful BLINK memory-lane challenge appealing to a knowledgeable fan but not crushingly hard. Harder detective puzzles remain appropriate to The 99 Files, not this music game.

### Implemented in this release
- **Game 06 Pink Rush!** All-original, BLACKPINK-inspired concert stage with four member-coded stylized silhouettes, four pink/purple/teal/gold beams, lightstick crowd, audience glints, riser lights, original optional synthesizer tones and personalized VIP Molly finale. **No commercial BLACKPINK recordings, music videos, actor/member photographs or copyrighted lyrics are used**.
- A deterministic **eight-round show**: 3 track memories (20 original questions, from 2016 debut to 2026 DEADLINE), 2 three-era ordering puzzles (8 variants), 2 solo/member spotlights (12 variants for Jisoo, Jennie, Rosé and Lisa), and an encore lightstick memory sequence (8 variants). All references reviewed against official YG discography and Grammy/Yonhap solo sources; see `PINK_RUSH_GAME_AND_SOURCES.md`.
- **No difficulty selector.** Entire game is untimed; incorrect answers gently reduce that round's score and display encouraging hints, but cannot lock the player out. Original rhythm pad is replayable as often as desired and playable muted. Round rewards max 60 (show max 480).
- `src/data/pinkRush.ts` contains 40 fact-checked puzzles, release source links, deterministic daily/practice selection and 8 finale patterns. `src/lib/pinkRush.ts` contains save state, scoring, game-loop transitions and first-score/best-award anti-farming. `src/games/PinkRush.tsx` renders the original stage world, interactive concert puzzles, memory pattern and reward/finale UI. `src/styles.css` adds responsive concert artwork.
- `src/App.tsx`: adds Pink Rush as **live sixth game**, shows six-game totals and user navigation, and replaces its former Coming Soon slot with **Brave: The Wisps' Trail** (Game 07) plus an interactive sneak-peek dialog.
- `src/lib/passport.ts`: Pink Rush stars, play metrics and three new achievement stamps (VIP BLINK, Encore Superstar, Perfect Comeback). `src/games/Passport.tsx`: **export version 4** includes all six games; still imports prior v1/v2/v3 backups, leaving absent newer-game progress intact.
- `tests/pinkRush.test.ts`: 40-question/source invariants, stable eight-round daily/practice sets, wrong answer recovery, full concert simulations, maximum scoring, no practice farming, local save/load and repeatable visual encore tests.
- Canonical references and beta checklist: `PINK_RUSH_GAME_AND_SOURCES.md`.

### Brave: approved plan ONLY
- **The Wisps' Trail** is **Coming Soon**, not implemented. User approved six-chapter Scottish Highlands magical adventure with pathfinding maps, archery challenges and tapestry finale. Plan specifies **18 handcrafted levels**, solver-tested routes, accessibility and original illustrated artwork. Docket: **`BRAVE_THE_WISPS_TRAIL_PLAN.md`**. Do not begin code before a later user green light.
- The November 13 Birthday Quest and genuinely secure coupon wallet remain separate upcoming priorities; respect that timeline.

### Next session
1. Invite Molly/owner and other BLINK beta testers to play Pink Rush from the live arcade. Test song clue fun, chronological release ambiguity, accessibility of the lightstick replay and whether the finale is worth the buildup. Adjust for fan satisfaction while preserving no-timer/single-setting design.
2. Verify Brave preview works from the shelf but hasn't been accidentally published as a playable game. Discuss Brave implementation scope only when user wishes.
3. Keep previous saved scores, all five existing game rules and Passport v1-v4 imports intact. Continue birthday planning.

## Latest development — Phase 2I: evidence-first Nine-Nine casebook and Holt likeness

**User's play-test finding:** A supposedly Clever case, *The Interrogation Clock*, exposed its culprit before the third evidence chain; other mysteries suffered from broad "three people have alibis" shortcuts. Player explicitly requested that all evidence links are essential for the complete **culprit + method** finding, genuine suspect ambiguity through Clever/Expert until the last clue, and show-accurate character portraits (starting with Holt). User specifically does **not** want artificial difficulty from hiding investigation question text.

**What changed:**
- New canonical source **`src/data/nineNineVerified.ts`** completely re-audits and authors all 12 fictional cases. Each has three (Cozy, Clever) or four (Expert) two-document evidence links with explicit exclusion semantics, new record text, detective questions, clear inferences and scene/motive/reconstruction/squad epilogue. We retained the original titles, IDs, difficulty tier, people, methods, daily selector, awards and heist campaign.
- The old automatically fabricated survivors and blanket alibis were **removed from active gameplay logic** in `src/data/nineNine.ts`; survivor grids are derived from **specifically authored per-link suspect/method exclusions**. `src/data/nineNineAudit.ts` contains retired Phase 2G audit text and must not be treated as the current puzzle source. The original seed strings within `nineNine.ts` are historical scaffolding, not the rendered clues.
- **Strong contract:** for every case, all \(2^n-1\) proper subsets of its `n` evidence links must leave at least **two complete suspect/method combinations**. Every linked deduction is essential, not just the last one. The intended sequential first `n-1` links in Clever and Expert must retain **at least two plausible suspect identities**. The third or fourth is conclusive. Tests also verify all explicitly eliminated suspects/methods are named in that pair's readable reports. The full set yields exactly one answer.
- **Fair difficulty:** Cozy keeps approachable readable document pairings and stronger guidance; Clever requires multiple independently cross-checked alibi/timing/physical links; Expert uses four evidence chains with harder red herrings. ***All unsolved question text is visible at every difficulty***; hiding questions was removed because it artificially inflated difficulty. Difficulty-specific scoring, mistake limits and optional hints remain.
- **Save migration:** active previously started Nine-Nine puzzles are restarted at evidence revision 2, with an explanatory message, because their cached link IDs refer to an obsolete puzzle. Previously solved cases, credits/stars, Heist stage unlocks, game statistics and Passport backups remain intact. The same normalization applies when importing older Passport v3 files.
- `src/data/nineNinePresentation.ts` now uses the revised scene and forensic reconstruction rather than outdated Phase 2H endings. `src/components/NineNinePortrait.tsx` gives **Captain Holt a closely-shaven/bald head, broader face and stronger brow**, based on verified character-reference imagery rather than a dark hair-cap silhouette; Molly unchanged.
- `tests/nineNineLogicAudit.test.ts` adds exhaustive subset analysis, evidence-provenance checks, no early naming of the culprit, story/solver agreement and old-save migration checks. Previous tests for all other games remain untouched.

**Manual next step:** Owner play-tests *The Interrogation Clock* in Clever again, plus one Cozy and Expert case and a Halloween Heist stage. Automated formal answer checks cannot guarantee narrative elegance or intuitive comprehension. Next large gameplay project remains Pink Rush after approval.

## Latest release — Phase 2H: Detective Molly and Nine-Nine polish (22 October 2026)

**This release** comes after the user play-tested the first Nine-Nine build and requested recognizable character avatars, a photo-inspired Detective Molly, dynamic squad assignments, clearer deduction explanations, deeper case endings and a special Halloween Heist setting. No change to existing score or local-save schemas.

- **GitHub workflow:** the authenticated GitHub connector can read/write `Rouhin1997/Molly-s-cozy-arcade` directly. Do not use terminal `git clone` in the isolated workspace and do not ask for a ZIP; this was an incorrect tool choice during an earlier turn.
- `src/components/NineNinePortrait.tsx`: new, more distinctive original SVG stickers for Jake, Holt, Amy, Rosa, Terry, Boyle, Gina and Cheddar, plus **Detective Molly**, whose checked-blazer, dark side-parted hairstyle and smile were drawn from a privately shared reference. The **original photo was never copied into the public repo**, and is not used on the public webpage.
- `src/data/nineNinePresentation.ts`: **12** episode-specific Molly-led cast lists (Molly + three case-relevant Nine-Nine characters), custom team banter and short four-part case stories (incident, plausible motivation, fact-supported reconstruction and humorous epilogue).
- `nineDeductionImpact` calculates *real* suspect/method exclusions from the case solver, given whichever clues Molly resolved first. `src/games/NineNine.tsx` displays the paired source documents, conclusion, eliminated suspects/methods, and remaining possible combinations following every successful deduction.
- Better **tier identity**: Cozy provides one clearly highlighted starting evidence file and two optional hints, Clever provides question prompts but no selected-document guidance and one hint, Expert shows only unlabeled investigation threads until they are resolved, with four mandatory links, no hints and tighter mistake limits. All evidence is readable in all tiers.
- **Read the verified case solution** now provides four small narrative chapters and identifies the culprit, exact method and uniquely decisive report pair. The team panel no longer contains the redundant “original squad artwork” subtitle.
- **Halloween Heist** visually transforms the precinct with twilight purple, orange-gold badge accents, pumpkins, bat/spider decorations, different evidence surfaces and a campaign banner; the original three-stage unlock/retry logic and saves are unchanged.
- `src/styles.css` contains scoped and mobile-responsive Phase 2H styling. `tests/nineNinePresentation.test.ts` validates all 12 solution stories, Molly participation in every cast, authentic solver-derived exclusions and scripted complete case walkthroughs.

**Next session:** user tests improved character likeness and the investigation logic in a real browser. Refine feedback if needed. Then start **Pink Rush**, followed by the November 13 Birthday Quest. Maintain Passport v3 backwards compatibility and all existing score keys. No manual visual QA has been completed by the assistant.


**Checkpoint:** 22 October 2026, Phase 2H — Detective Molly, portrait redesign, stronger investigation explanations and themed Halloween Heist
**Repository:** https://github.com/Rouhin1997/Molly-s-cozy-arcade
**Live arcade:** https://rouhin1997.github.io/Molly-s-cozy-arcade/
**Default branch:** `main`; GitHub Actions publishes `main` to GitHub Pages
**Primary milestone:** complete a meaningful November 13 birthday experience. All regular games should remain playable year-round.

## Latest release — Phase 2G: Bazinga final touches + The 99 Files (22 October 2026)

**User authorization:** After playing Bazinga! Lab, the owner approved a finish pass for its clue wording and seat names plus a new *Brooklyn Nine-Nine*-inspired detective game with **both standalone investigations and a connected Halloween Heist campaign**. User will browser-test the new game later. The next chat should prioritize their real play-test feedback, then planning Pink Rush and November 13 Birthday Quest.

### A — Bazinga! Lab polish

- Removed the duplicate schematic/blueprint disclaimer above the room map; retained the fan-made copyright notice at the page bottom.
- `src/games/BazingaRoomGame.tsx`: `casePanelTitles` now provides 18 bespoke clue-card headings and taglines. The Roommate Agreement is reserved for Apartment 4A scenes. Examples: The Lunch Protocol, Bernadette's Dinner Plan, the Mystery Dossier, the Viewing Protocol, the Caltech Lab Safety Protocol.
- `src/data/bazingaWorld.ts`: supplementary spatial clue sentences have been rewritten for clearer grammar, context-specific examples (lunch notes, mystery whispering, lab collaboration, cinema neighbour geometry) and explicit geometric meaning. The exhaustive solver still determines which clauses are true.
- `src/data/bazingaPolish.ts`: `seatLabelForCase()` provides story-specific descriptive labels (cinema row A/C, cafeteria table sides, sofa/window ends, lab workstations, Howard/Bernadette table sides). Labels describe physical positions, not occupants; no explicit “Sheldon's spot” in map text.
- `tests/bazingaWorld.test.ts` now checks all 18 headings exist and all case-specific seat labels are unique, meaningful and do not name a character.
- Existing 18 Room Adventures cases, spatial validity tests, exact original character artwork, 18 Classic Lab cases and all saved stars/puzzles remain unchanged. Further human clue-writing feedback is expected from actual play-testing.

### B — The 99 Files (fifth fully playable game)

**New gameplay:** player becomes honorary precinct detective Molly. Choose **Daily case**, **Open case files** or **Halloween Heist**. Inspect evidence documents (reports, interview notes, forensic and scene cards), pin **two** documents together on a corkboard to create a deduction, then submit a three-field accusation: suspect + method + decisive proof. The system penalizes incorrect pairs and allegations within tier-specific limits.

- 12 original cases, four per tier, with 9 standalone investigations and **3 sequential Halloween Heist stages**. The Heist is its own mode and unlocks Stage II (Clever) and Stage III (Expert) only after prior heists are won. Daily cases rotate among all four tier-matching cases; an independent practice gallery has three case choices per tier.
- Recurring B99 inspirations: Captain Holt, Jake Peralta, Amy Santiago, Rosa Diaz, Charles Boyle, Terry Jeffords, Gina Linetti, corgi Cheddar, Doug Judy / the Pontiac Bandit, Jimmy Jab Games, Halloween Heists, Terry's yogurt, Amy's color-coded binders and the *The Box* interrogation dynamic. All twelve crime puzzles and cast reactions are new/fan-fictional, **not reenactments, ripped dialogue or official pictures**.
- Evidence architecture: case suspects x candidate methods form a grid of twelve hypotheses. Individual correct paired links progressively narrow that grid. Tests verify each link reduces hypotheses, that the last link is necessary, and that the finished case has exactly **one** suspect-and-method answer. A source-provenance auditor additionally requires eliminated names and methods to be explicitly supported in the **two readable paired evidence reports**, via the handmade precinct cross-checks. The player must cite the linked **decisive** proof at accusation, not only pick the culprit.
- `src/data/nineNine.ts`: twelve original case stories, evidence records, authored pairs, candidate solver, deterministic selectors and validation. `src/data/nineNineAudit.ts`: written alibi and method eliminations tied to specific document pairs. `src/lib/nineNine.ts`: document inspection, matching, hints, accusation, scoring, local save, sequential heist unlocking. `src/games/NineNine.tsx`: polished precinct case UI and interactions. `src/components/NineNinePortrait.tsx`: **original scalable vector caricature-inspired stickers**, not actual cast photographs or official assets. `src/styles.css`: responsive pastel detective stationery, corkboard and case art.
- `tests/nineNine.test.ts`: data validation, completed scripted investigations for all cases, evidence matching, wrong comparisons, required decisive proof, grade-based hints/attempts, personal-best anti-farming, heist progression and save round-trip.
- `src/App.tsx`: fifth playable shelf card, navigation, persisted fifth-game state and sitewide star totals. `src/lib/passport.ts`: three new achievements (Honorary Detective, Evidence Whisperer, Heist Champion). `src/games/Passport.tsx`: **JSON export version 3** now contains all five game states. Version 1 (three games) and version 2 (four games) still import, preserving missing newer game data; no automatic cloud sync. New key **`mollys-99-files-v1`**.
- Full art, specific story inspirations and QA checklist: **`NINE_NINE_ART_LORE_AND_TESTING.md`**. GitHub public site must never ship licensed photographs/scripts/audio without permission.

### Next development session

1. Ask what the user thought of The 99 Files during actual desktop/mobile browser play. Start with an easy case like Terry's Yogurt, a Clever interrogation case and a difficult case, then evaluate the Halloween Heist’s sequential unlocks and logical fairness of real evidence reports.
2. Fix user-reported narrative or mechanical inconsistencies, cross-check every evidence linkage, compare visual balance with Bazinga, and protect older Passport saves. Automated correctness does **not** guarantee human narrative plausibility or browser accessibility.
3. If the fifth game is approved, next likely priorities: Pink Rush (BLACKPINK era/setlist original-art game) and **November 13 Birthday Quest**. Do not let the birthday deadline be eclipsed by content polishing.
4. **Preserve all achievements, save keys, versioned Passport imports, four other working games and both Bazinga editions.** Current GitHub handoff is authoritative for restarting.

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
