# Who? What? Where? When? — India Edition

**Development checkpoint — 29 October 2026**

## Why Game 01 was rebuilt

The original **Guess Who?** used a single food-riddle pattern with an easily spammed clue button. The owner wanted four classes of mysteries (*Who? What? Where? When?*), visual puzzles, geographically relevant clues, an accumulating limited hint budget, meaningful proximity feedback and no repetitive clue button. This is a full new engine and UI, not a recoloured wrapper. The original food quiz and its stats remain available through a clearly marked **Classic Guess Who? archive** link; the main Games dropdown now points to WWWW India Edition.

## First playable edition

- **23 curated mysteries**, spanning five photographic landmarks, street foods and fruit, birds/wildlife, Indian historical events and space exploration, filmmakers, athletes, scientists, business leaders and historical figures. They are grouped into the four question kinds.
- **Twelve-stop India expedition:** three of each type in a reproducible, shuffled order. Fresh expeditions reshuffle a selection from the question bank. Because this is a finite curated collection, truly endless *unique* questions are not claimed; the data-driven engine can be expanded without changing the gameplay logic.
- **Daily Dispatch:** deterministic single mystery for the calendar date. Both modes save progress in a separate v1 browser key, `molly-wwww-india-v1`.
- **Clue progression:** one opening clue is immediately visible. Each of up to **four distinct guesses** automatically opens one more field note (three additional notes total), including contextual trivia, maps and imagery. A repeated guess is free; skipping gives the answer and lets the player proceed. A photo-based *Where?* puzzle starts with two of twelve mosaic tiles visible, then reveals 5 / 8 / 12 tiles as wrong guesses unfold. Photos have an on-error fallback, so the game remains playable without internet access.
- **Hint economy:** one credit on entry to each of stops **1–10**, including the initial one. No new credit on the penultimate or final stop (11–12). Credits carry forward if unused. Up to two special optional hints may be purchased per mystery, with score deductions. This is a budget, **not** an unlimited free “reveal clue” button.
- **Proximity feedback:** a submitted known catalogue answer may share the target's **question kind, topic, associated region or historical era**. A labelled “Warm trail”/“Getting oriented” result identifies only grounded overlap, not fake mathematical percentage or LLM speculation. Unknown words report “not in comparison deck”; players still get the next field note. Winning regional aliases and transliterations include **phuchka, fuchka, puchka, golgappa, gupchup** for pani puri and **Lal/Laal Qila** for Red Fort. Answer suggestions begin only after three letters, and selecting a suggestion does not submit it.
- **Look and feel:** a new hand-crafted deep indigo/saffron/terracotta atlas theme with postal stamps, page borders, a clear question-type emblem, visual map pointer, film-style fragment reveals, a feedback compass, banked hint indicator and expedition progress. Mobile layout stacks the clue board and sidebar and keeps the photograph's mosaic intact. Maps are intentionally **illustrative point/region prompts, not administrative boundary maps**.

## Verified photographic sources, licensing and attribution

The following photos are retrieved from Wikimedia Commons on demand and attributed in the visible clue screen, including author, CC license and source link. Commons states that publicly reusable photos may have attribution and ShareAlike conditions; confirm every asset's individual license before use in any public commercial edition. The original photograph remains on Commons, and **the game crops/masks the visible copy** for the puzzle. License conditions apply to any adapted assets.

| Mystery / visual hint | Wikimedia Commons file | Photographer credited | License |
|---|---|---|---|
| Red Fort | [Red Fort, Delhi India.jpg](https://commons.wikimedia.org/wiki/File:Red_Fort,_Delhi_India.jpg) | Pankajksharma92 | CC BY-SA 3.0 |
| Hawa Mahal | [HawaMahal.jpg](https://commons.wikimedia.org/wiki/File:HawaMahal.jpg) | Jacob Uriel (Psychocadet) | CC BY-SA 3.0 |
| Golden Temple | [Golden Temple.jpg](https://commons.wikimedia.org/wiki/File:Golden_Temple.jpg) | Bunti90 | CC BY 3.0 |
| Taj Mahal | [Taj-Mahal.jpg](https://commons.wikimedia.org/wiki/File:Taj-Mahal.jpg) | Joel Godwin | CC BY-SA 4.0 |
| India Gate | [The india gate.jpg](https://commons.wikimedia.org/wiki/File:The_india_gate.jpg) | Nihalkonan | CC BY-SA 4.0 |
| Chole Kulche clue: a tandoor | [Tandoor.jpg](https://commons.wikimedia.org/wiki/File:Tandoor.jpg) | Alina AlamgiR | CC BY-SA 4.0 |
| Pani Puri clue | [PaaniPuri.jpg](https://commons.wikimedia.org/wiki/File:PaaniPuri.jpg) | Foody1989 | CC BY-SA 4.0 |

Image URL model: Wikimedia Commons `Special:FilePath/<filename>` resolution-free redirect; no scraped social-media photos, film stills or proprietary celebrity portraits. **Important:** photos are hosted externally, so Wikimedia accessibility/CORS/network conditions may affect rendering. On-image fallback is automatic; real-device visual testing is still required.

## What still needs design feedback

- Does four guesses with three progressively unlocked clues feel right? Does the bonus-hint economy get too generous around stages 7–10?
- Is the compass feedback understandable and specific enough without making false “percent close” claims?
- Do the partial images actually show enough at each reveal threshold?
- Do the map pins and text remain readable on small phones?
- Should we extend with **more photos** for birds, fruits, people and events in later content packs? For people, ensure rights and careful attribution.
- Build a much broader curated catalogue over time so repeat expeditions are genuinely surprising; 23 mysteries are a **first edition**, not limitless content.

## Compatibility, tests and release

`src/data/indiaMysteries.ts` stores clues and photo provenance, `src/lib/indiaQuest.ts` is the pure mechanics engine, and `src/games/IndiaQuest.tsx` renders the puzzle. App now routes Game 01 to India Edition, and the original `GuessWho` remains accessible as the Classic archive with its original save key. Passport **v8** exports the new India-game save while retaining legacy backup compatibility and existing game data. Old previous-version imports preserve the new game save as-is rather than erasing it.

`tests/indiaQuest.test.ts` covers catalogue integrity, key aliases, deterministic balanced campaigns, automatic clue progression, blocked duplicate guesses, hint accumulation, last-two stop lock, spend limits, honest comparison signals, scoring and save normalization. Other arcade tests must continue passing.

**Visual/manual verification remains necessary** before declaring the photo and mobile experience final. Do not treat a successful Vite build as a browser/device playtest.
