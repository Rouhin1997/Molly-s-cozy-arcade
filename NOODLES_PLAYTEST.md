# Noodles of Destiny — first-slice playtest

**Status:** playable tutorial + Level 1 only, awaiting Molly's owner's playtest. Not the complete game.

## Creative direction

In the Valley of Peace, Mr. Ping's noodle shop needs Chef Molly's help. The owner asked for a fully interactive *Kung Fu Panda*-inspired food shop with customers, appliances, ingredients and truly physical drag/drop cooking. This initial slice prioritises kitchen atmosphere, recognisable stylised character portraits and a fair input model over premature level production. The illustrated storefront, Po, Mr. Ping and three customers are original SVG artwork drawn inside this repository (not film frames). This is an unofficial personal fan-made experience, with franchise rights belonging to their owners.

## What is actually playable

**Guided tutorial (always replayable):** Serve Po one Garden Noodle Bowl. Drop bowl on the board, drag noodles into the pot, wait about 3.6 seconds, drag cooked noodles to the bowl, add warm broth and bok choy, and drag the completed bowl to the serving bell. Mr. Ping provides the next relevant instruction. There is no customer patience timer, global deadline or overcooking in the tutorial. The tutorial saves a completion flag.

**Level 1 — Lunch Rush:** Exactly three orders are scheduled:
1. Bunny: Garden Noodle Bowl, at shift start;
2. Monkey: Lucky Dumpling Plate, arrives at 19 seconds; this introduces the bamboo steamer, cooked dumplings, plate and dipping sauce;
3. Tigress: Forest Mushroom Noodles, arrives at 41 seconds; the pot returns, but the bowl now needs mushrooms instead of greens.

Guests have generous individual patience (~63–67 seconds), the shift has a 155-second limit, and preparation needs the correct bowl/plate, uncooked food, correct appliance, cooking time and toppings. Ready food can become burnt after 13–15 seconds; discard it in the bin and cook another batch. Wrong drags show context feedback without automatically failing the order. Serving awards points for each correct dish and remaining customer patience. Orders appear automatically in the ticket bar, can be switched when the kitchen is empty, and are marked served/missed independently. A final scorecard shows results and supports replays. Saves are local to the browser under \`molly-noodles-of-destiny-v1\` (tutorial completed, best guests served, top score, shifts attempted).

**Input:** pointer capture provides actual drag-follow/drop with both mouse and touch. For accessibility and phone ease, select an ingredient or ready food and tap its destination (keyboard: focus item, Enter/Space, focus destination, Enter/Space; Escape clears selection). Visual cooking progress meters, ready/burnt indications, illustrated plated food and a responsive pantry are included. No external media or database required.

## Test script for the owner

1. Open arcade → Games → **Noodles of Destiny**. From first use only the tutorial is available.
2. Complete the lesson with mouse drag and test the same with tap-to-select/tap-destination. Check that the guide follows your progression and that the pot's ready food can be lifted onto the bowl.
3. Replay the lesson from the menu or **↶ Tutorial** even after it is marked completed.
4. Play Level 1. Watch second and third tickets arrive, plate dumplings in the steamer, and prepare the mushroom variation. Try to serve all three.
5. Intentionally drag the wrong item to a station; it must not quietly complete a dish. Try dragging undercooked food (rejected). Let a batch burn, discard it, and cook another.
6. Pause and resume the shift; verify the timers stop. On mobile, see whether dragging is natural, the pantry is legible and tap-to-place is comfortable.
7. Finish/replay, reload, and confirm tutorial progress and best score remain in the browser.

## Known intentional limitations / owner feedback gate

- No second or later level, shop-upgrade system, currency economy, animated character dialogue scenes, sound production, full Passport stamp or coupon reward yet.
- No cooking-session resume in the middle of an active shift; only completed tutorial / best-score records persist. The existing arcade and coupon wallet remain unaffected.
- The default food is drawn with layered emoji over original illustrated stations, which is a temporary playtest art choice; ingredient sprites, oil splashes and dish animations should be refined after tactile-feedback review.
- Time values, patience windows, recipe count, hit areas, mobile response and difficulty need owner's firsthand judgement before expanding.
- The challenge and cuisine are an original fan-made scenario and should remain in Molly's one-of-one edition, not imported automatically into any future commercial arcade.

## Key implementation

- \`src/lib/noodleShop.ts\` — pure mechanics, recipe registry, timing, customer queue and local best record.
- \`src/games/NoodleShopArt.tsx\` — original hand-drawn SVG shop and character portrait compositions.
- \`src/games/NoodleShop.tsx\` — pointer drag and drop, alternative select/drop, guide, appliances, tutorial and Level 1.
- \`src/styles.css\` — new \`noodle-*\` responsive visual layer.
- \`tests/noodleShop.test.ts\` — pure tutorial and multi-order regression checks.

**Release gate:** pass TypeScript/Vite and existing test suite, merge to main, verify GitHub Pages deployment. Then stop adding levels and collect owner's playtest feedback.
