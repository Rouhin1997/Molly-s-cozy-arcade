# Noodles of Destiny — Dragon Chef campaign and QA

## Complete campaign (28 October 2026)

Eight playable levels, in order, with a replayable untimed tutorial, original illustrated characters and temple backdrop, an original fast procedural accompaniment, two concurrent appliances, two independent assembly boards, flexible ingredient ordering, eight recipes and a special two-use coupon.

| # | Shift | Guests | Arrival gap | Patience each | Total time | Passing |
|---|---|---:|---:|---:|---:|---:|
| 1 | First Bell | 3 | 25 s | 110 s | 180 s | 2/3 |
| 2 | Bamboo Breakfast | 3 | 24 s | 104 s | 175 s | 2/3 |
| 3 | The Jade Market | 4 | 23 s | 100 s | 196 s | 3/4 |
| 4 | Lantern Festival | 4 | 23 s | 96 s | 191 s | 3/4 |
| 5 | Five-Style Feast | 5 | 23 s | 93 s | 215 s | 4/5 |
| 6 | The Master's Table | 5 | 22 s | 90 s | 213 s | 4/5 |
| 7 | Dragon Lantern Night | 6 | 22 s | 88 s | 232 s | 5/6 |
| 8 | The Dragon Chef | 6 | 22 s | 86 s | 230 s | 5/6 |

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
