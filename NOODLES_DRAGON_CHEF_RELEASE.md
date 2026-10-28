# Noodles of Destiny — Dragon Chef campaign and QA

## Update: two-ticket rushes and shorter game copy (28 October 2026)

The game now opens with two **simultaneous customer tickets** in Levels 4–8. Each pair deliberately includes one noodle/pot order and one dumpling/steamer order, so both serving boards and both appliances can be used at once from the very start. Levels 7–8 introduce **a second paired wave** with a long break between waves; Levels 1–3 keep their original single-ticket learning curve.

**Arrival times in seconds:**
- Level 4: 0, 0, 50, 74.
- Level 5: 0, 0, 51, 74, 97.
- Level 6: 0, 0, 50, 72, 94.
- Level 7: 0, 0, 55, 55, 112, 135.
- Level 8: 0, 0, 58, 58, 116, 140.

The existing patience windows and shift durations remain unchanged. Validation now permits sorted identical timestamps in pairs, rejects groups larger than two, and checks that **even sequentially completing a pair** fits within its patience with 12 seconds of extra slack. New tests verify both tickets are immediately available and real parallel pot/steamer preparation works in Level 4. The shop opening copy and disclaimer were shortened; the fan-made notice is now one simple sentence.


## Complete campaign (28 October 2026)

Eight playable levels, in order, with a replayable untimed tutorial, original illustrated characters and temple backdrop, an original fast procedural accompaniment, two concurrent appliances, two independent assembly boards, flexible ingredient ordering, eight recipes and a special two-use coupon.

| # | Shift | Guests | Arrival schedule | Patience each | Total time | Passing |
|---|---|---:|---:|---:|---:|---:|
| 1 | First Bell | 3 | 25 s | 110 s | 180 s | 2/3 |
| 2 | Bamboo Breakfast | 3 | 24 s | 104 s | 175 s | 2/3 |
| 3 | The Jade Market | 4 | 23 s | 100 s | 196 s | 3/4 |
| 4 | Lantern Festival | 4 | 0 / 0 / 50 / 74 s | 96 s | 191 s | 3/4 |
| 5 | Five-Style Feast | 5 | 0 / 0 / 51 / 74 / 97 s | 93 s | 215 s | 4/5 |
| 6 | The Master's Table | 5 | 0 / 0 / 50 / 72 / 94 s | 90 s | 213 s | 4/5 |
| 7 | Dragon Lantern Night | 6 | 0 / 0 / 55 / 55 / 112 / 135 s | 88 s | 232 s | 5/6 |
| 8 | The Dragon Chef | 6 | 0 / 0 / 58 / 58 / 116 / 140 s | 86 s | 230 s | 5/6 |

## Gameplay and fairness

The campaign is defined in src/lib/noodleShopCampaign.ts; the version-two pure state engine is src/lib/noodleShopV2.ts. Recipes require the correct main ingredient and cooker but plating can begin before cooking; garnishes can be added whenever the correct customer's bowl is present. Cooked food and dishes carry immutable customer identifiers so switching order tickets does not destroy work on the other board. Both dishes and both cookers can operate simultaneously. Burnt food can be discarded without discarding another order.

The difficulty estimate assumes 8 seconds overhead + 3.2 seconds per garnish + real cooker duration + 5 seconds input and mobile buffer. Each customer is given at least 2.5 times this estimated workload, and every shift lasts beyond the last order's complete patience window. More levels introduce more guests and toppings, not unrealistic reflex thresholds.

## Art, sound, accessibility

The visual design switches from the pastel arcade style to hand-drawn temple fantasy with cinnabar red, brushed gold, bamboo green, sunset ink-wash mountains and pagoda details. Source assets src/games/NoodleWorldArt.tsx, NoodleDishArt.tsx and NoodleShopArt.tsx contain original vector character, kitchen, and layered recipe illustrations, without borrowed film frames. src/lib/noodleMusic.ts creates an original 118–136 BPM rhythmic melody with percussion, plucks and gong-like accents. It is not the movie soundtrack; sound can be muted and follows game pause. Desktop pointer drag, touch drag and select-then-place work. On phones, a sticky quick-drop toolbar prevents having to drag across a long scrolling page, and customer tickets scroll horizontally.

## Special home-cooked reward

Completing Level 8 by serving at least 5/6 guests grants one nonrenewable local voucher in the Coupon Wallet for Molly: homemade Ramen or Soup Dumplings cooked by Rouhin. Two redemptions TOTAL within three calendar months from the first unlock; each redemption is chosen and confirmed separately. Replay never extends expiry or restores redeemed uses. The wallet stores and shows the dates and food choices, but does not automatically schedule a meal. Separate from Pink Rush coupons. Logic in src/lib/noodleCoupon.ts and panel src/games/NoodleCouponPanel.tsx. Passport export v6 includes noodle progress and coupon while retaining imports from versions 1–5. Enforcement is local to the browser, not fraud-proof or server-synchronized.

## Playtest

Run the tutorial again; play each level on desktop and a real phone. Start cooking before placing a bowl; plate on board 1 while steaming a second customer’s dumplings on board 2; switch tickets and serve both correctly. Try wrong topping, undercooked transfer, overcooking and disposal, pause/music controls, menu and replay. Verify patience is fair and late orders leave enough time. Finish Level 8 and redeem one of the two treats; reopen Wallet and confirm one use remains. Test Passport export/import. Automated tests/noodleShopV2.test.ts covers campaign fairness and coupon boundaries, while the original first-slice suite remains for backward compatibility.

Known constraints: Procedural synthesized music is original but not a professionally recorded soundtrack; visual and audio experience still requires the owner's hands-on feedback. This is Molly's personal fan-made edition; separate commercial work would need a new IP review.
