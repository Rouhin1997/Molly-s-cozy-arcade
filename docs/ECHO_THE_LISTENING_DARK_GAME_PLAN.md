# ECHO: The Listening Dark — game design checkpoint

**Project:** Molly's Cozy Arcade  
**Status:** Concept and gameplay plan agreed; **not yet in development**  
**Checkpoint date:** 14 November 2026  
**Purpose:** Preserve the design decisions for a future standalone arcade adventure. Do not confuse this with another planned game.

## 1. Creative direction

- **Working title:** ECHO: The Listening Dark.
- **Art direction selected:** **Hand-drawn Gothic**, preferred over the glossy blue/purple fantasy platformer and atmospheric 2.5D alternatives. Ink-and-charcoal etched textures, storybook illustration, parchment/stone greys, subdued sepia and muted mauve; near-black chambers interrupted by warm ivory/chalk sonar and restrained gold accents. Atmospheric, eerie, mysterious rather than jump-scare horror.
- **Premise:** Vesper, a small bat, enters *The Hollow*, an ancient cave system after echoes mysteriously stop returning from its deepest rooms. Some echoes begin arriving from empty places. Eventually, something answers back.
- **Tone:** Dark fantasy mystery with thoughtful exploration, occasional danger and luminous moments of wonder. Avoid constant pursuit; keep the experience atmospheric, coherent and fair.
- **Central rule:** You cannot see most of the world unless you make a sound; something in the world is listening for you.
- **Distinctive late-game twist:** Some returning echoes are false. Their timing, shape or movement gives them away.

## 2. Camera, world, and movement

- **View:** Cinematic **2D side-view**, primarily horizontal chambers with vertical passages; layered parallax art to imply depth. Not a conventional platformer.
- **Player:** Vesper flies freely on both axes, with smooth acceleration/deceleration, gentle hovering, modest inertia and slight body tilt. Responsive and forgiving, not a flight simulator.
- **Collision:** Real level geometry is present even when unseen. Vesper stops at walls rather than clipping through; show a short-range contact silhouette to avoid unfair blindness. Camera follows smoothly with room for looking ahead.
- **Desktop inputs:** WASD or arrows = movement; tap Space = soft ping; hold/release Space = deep ping; E = context interaction; Esc = pause.
- **Touch inputs:** Floating thumb joystick, tap/hold sonar control, contextual action button, pause. Design responsive play areas for phone/tablet.

## 3. How echolocation looks and works

**Layered graphics architecture**
1. **Hand-drawn art**: modular pieces such as rocky surfaces, arches, roots, ancient bells, stairs, water, statues, doors; foreground/background parallax and subtle atmospheric animation.
2. **Sonar/echo rendering**: thin imperfect chalk/ink-like wavefronts; reflection/reply with distance-dependent delay. Geometry contours light up as though drawn with light. Not giant neon circles permanently covering the screen.
3. **Visibility/darkness**: masks fade lit geometry back toward black, leaving a subtle remembered outline of discovered nearby walls/routes. Maintain legibility; avoid constant repetitive pinging.

**Illustrative first-pass pulse sequence**
- **t=0:** chirp and slim ivory wave emitted from Vesper.
- **t~0.2 s:** wavefront travels outward; opaque surfaces obstruct it.
- **t~0.4–1.0 s:** near and then distant surfaces answer with delayed echo geometry.
- **t~1–3 s:** illuminated outlines and details fade into dark; faint remembered contours may persist.

These are **art/gameplay timings to tune**, not literal real-speed acoustics. Use simplified physics-style **raycasts** or carefully designed visibility checks against level geometry to simulate obstacles, echo arrival, distance and limited reflections; do not require full acoustic simulation.

**Sonar modes**
- **Soft ping:** short range (~7 game tiles in initial balance), quieter, short reveal (~2 sec), navigation and nearby examination.
- **Deep ping:** long range (~16 tiles), louder, longer reveal (~5 sec), reveals distant features or special structures, but attracts more attention. Holding Space (or touch control) charges it.
- These values are provisional and should be adjusted through playtests.
- Echo signatures: stone = subtle ivory/blue-white chalk edges; water = wavy distorted contours; metal/resonators = restrained golden sharp edges; creatures = pulsing organic shapes; unnatural/false returns = irregular mauve/crimson shape or timing. Distinguish by motion/shape, not just color.

**Design safeguard:** The game remains readable between pings. Nearby contact outlines and faint persistence matter; darkness should feel mysterious, not inconvenient.

## 4. Puzzle interaction model

Two complementary interaction modes:
- **Physical:** Sonar reveals objects such as bells, levers, gears, stones or doors. Approach, then press E/tap action. Use small, consistent interaction prompts only when in range.
- **Acoustic:** Some structures react directly to emitted sound, frequency/pulse pattern or reflected echo. Distance, timing and geometry are part of the puzzle.

Four puzzle families:
1. **Echo mapping:** Reveal cavities, passages, breaks in walls, absorbent materials; develop a spatial picture.
2. **Resonance:** Activate bells, resonators, ancient machinery in a meaningful order or pattern.
3. **Echo reflection:** Redirect pulses off crystals, metal or angled surfaces to access occluded mechanisms.
4. **False echoes:** Distinguish authentic geometry from misleading responses using timing, movement, persistence or cross-checking. Introduce only after players understand normal returns.

### Concrete vertical-slice puzzle: The Three Bells

A single Gothic chamber with three hanging bells of different heights and a sealed stone door. Initial sonar reveals their locations and distinct return signatures. A legible carved inscription says **“From the faintest voice to the loudest, awaken the three.”** The puzzle's echo-count order is:
- Left bell: 1 echo
- Middle bell: 3 echoes
- Right bell: 2 echoes
- **Solution:** left → right → middle.
Vesper must find, interpret, navigate, and activate; pressing the correct sequence opens the hand-drawn stone door with a small light-bloom animation. Wrong sequences give clear feedback without a harsh penalty.

## 5. The Listener — tension and stealth

- Introduce a mysterious sound-sensitive entity, **The Listener**, gradually rather than as constant pressure.
- It investigates **noise events** where it last heard Vesper instead of knowing Vesper's live position. Sound attention increases slightly from soft pings, more from deep pings; decays or redirects during quiet movement.
- Clear visual/sonar telegraphs when its attention rises, it approaches, searches or retreats. No arbitrary instant captures or jump scares.
- Puzzle interactions can also create distractions (e.g. remotely strike a bell to draw it away).
- Capture returns Vesper to the chamber checkpoint, preserving solved puzzles and discoveries.
- Desired balance: roughly **60% exploration/puzzles, 25% stealth tension, 15% story/discovery**; tune to feel rather than enforce strict percentages.

## 6. Initial five-chamber story arc (proposed, not locked)

| Chapter | Name | Core introduction |
| --- | --- | --- |
| I | **The First Echo** | Introduce flight, geometry and soft/deep sonar at the entrance |
| II | **The Whispering Halls** | Hidden routes, carved tunnels, resonance and reflection |
| III | **The Drowned Gallery** | Water-distorted echoes and submerged structures |
| IV | **The Listening Chamber** | The Listener, stealth and beginning of false echoes |
| V | **The Heart of Silence** | Combine systems and resolve the missing-echo mystery |

A rough **25–40-minute** total play target, with autosaves by chamber and meaningful discovery. Finale concept: a final pulse does not fade; the whole environment gradually becomes visible and blossoms into a warm, full-colour illustration for the first time.

## 7. Difficulty, feedback and accessibility

- **Story:** longer-lasting reveals, more hints, forgiving detection.
- **Explorer (default):** intended balance.
- **Nightfall:** tighter echoes, stronger sound-response and fewer hints; challenge from information management, not punishing timers.
- Gentle failure, informative feedback, readable interaction symbols, visualized sound cues, mute control, reduced-motion option, keyboard/touch accessibility, and persistent faint discovered geometry. Avoid compulsory real-world audio ability or color-only clues.

## 8. Proposed implementation for the existing arcade

- Keep **React + TypeScript** for outer arcade navigation, menu, settings, chapter list, progress/wallet integrations as appropriate.
- Investigate **Phaser** embedded as a 2D scene to handle player movement, camera, collision, input, animated sprites and rendering. Confirm exact rendering/masking support and performance before committing to implementation. A custom Canvas/WebGL approach remains a fallback.
- Do not expect a single generated illustration to behave like a game. Split images into reusable foreground/background layers, objects and sprite animation frames; author level collision shapes, material types and puzzles separately.
- Core logical modules: **movement**, **sonar and masks**, **Gothic art/animation**, **interactions/puzzle rules/persistence**, and **Listener AI**. Keep logic testable independently of rendering.
- Aim for smooth performance on desktop and mobile, performance scaling for fog/particle/detail, plus reliable resize and input handling. Favor stylized effects over expensive lighting.

## 9. First deliverable — validate the loop, not the whole story

**The Whispering Chamber**, a single playable vertical slice targeted at **3–5 minutes**:
1. Vesper moves and hovers through an authentic hand-drawn Gothic cave.
2. Soft and deep pings produce animated wavefronts, blocked surfaces, echo reveals and smooth fade-outs.
3. Three hanging bells demonstrate discover → interpret → approach → interact.
4. Solving the puzzle opens a stone door and gives a tasteful level-end payoff.
5. Include small amount of sound/visual feedback and a basic accessibility/settings menu.
6. Optionally add one isolated, highly readable Listener encounter **after** the basic exploration and bell puzzle are fun.

**Go/no-go criterion:** Is revealing and exploring the environment enjoyable as an action, not merely a visual trick? Is navigation understandable without spam-pinging? Does the puzzle truly require sonar? Is the art direction clear and technically practical? Only then build further chambers.

## 10. Future decisions

- Lock final bat design/animation sheets and level camera scale.
- Decide how persistent cartographic memory should look.
- Tune sonar ranges, charge speed, noise sensitivity and sound design.
- Prototype the Listener's pursuit feedback, including non-audio indicators.
- Decide what the missing echoes mean and how the ending resolves the mystery.
- Review art reference panels created during concept chat; those are conceptual moodboards, **not** production-ready sprites or a built level.

**Boundary:** Planning checkpoint only. No ECHO code or live arcade item has been added. This file is the source of truth until we explicitly revise the design together.
