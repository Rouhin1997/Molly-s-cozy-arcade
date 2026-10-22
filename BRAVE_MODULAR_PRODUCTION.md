# Brave: The Wisps’ Trail — Modular Production Roadmap
## Approved 22 October 2026

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
After the owner tests the Module 01 live preview and requests any visual refinements, build **Module 02 only** on its own branch with an exhaustive solver and one tiny test environment. Keep this roadmap and DEVELOPMENT_HANDOFF.md current after each phase.
