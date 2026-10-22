# Game 07 — Brave: The Wisps' Trail
## Planned only · Coming Soon · design approved 22 October 2026

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
