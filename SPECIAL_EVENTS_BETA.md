# Special Events — Halloween 2026 Beta / Christmas 2026 Roadmap

**Status (29 October 2026):** Halloween event gate and dummy reward implemented and tested; Christmas Week is an upcoming editorial milestone only, with no seasonal content or voucher promised yet.

## Exact Halloween schedule (Italy time)

The Halloween Heist in **The 99 Files** is available **only 31 October, 00:00:00–23:59:59 Europe/Rome**, every year (annual event window). For the 2026 beta this corresponds exactly to:
- **Opens:** 2026-10-30 23:00:00 UTC (2026-10-31 00:00 CET).
- **Closes:** 2026-10-31 23:00:00 UTC (2026-11-01 00:00 CET, exclusive).
- **Timezone:** Europe/Rome is resolved using the browser's IANA Intl timezone database, not the visitor's device locale or a fixed offset. A separate automated test confirms the 2027 Halloween night when daylight savings changes ON 31 October (that year the window is 25 clock hours).

Before opening, the Events menu shows Halloween as scheduled and the Heist tab reveals a locked preview with countdown and three unavailable stages. On the day, the original three stages unlock subject to their own sequential case prerequisites and the clock counts down to closing. At midnight the Heist hides the dossier and locked preview returns. All previously completed cases, stars, deductions and regular 99 Files daily/practice mode remain saved. Actions recheck the actual clock, so a tab open at midnight cannot keep submitting a Halloween case. UI refreshes every second inside 99 Files and periodically in the calendar/Wallet, plus on tab focus.

**Known beta limitation:** This is client-side time authority and localStorage, not a cryptographically trustworthy server clock. A determined player can modify their device time/storage; the future commercial arcade and real prizes require authenticated server enforcement. This is sufficient to test ordinary calendar boundaries and presentation for Molly's personal edition.

## Dummy test voucher (NOT a real reward)

Completing all three Halloween Heist stages, including **winning the final stage during Halloween itself**, issues one fictional **Halloween Heist Dummy Voucher** tied to the event year. Existing historical completed saves do not spontaneously earn it; if the heist was already completed before the beta, a player can replay the final stage on Halloween. A solved stage has a replay button that preserves previous stars and unlocked stages.

The dummy ticket appears in the Coupon Wallet (separate from Pink Rush and the Dragon Chef reward), and beside the live Heist after award. It has **one simulated redemption** button that explicitly confirms **no real gift, goods or service will be provided**. If unused, it expires at midnight Europe/Rome at the end of 31 October. The wallet thereafter displays the saved expired record; a redeemed test ticket remains a recorded practice success. Replaying the heist on the same Halloween does not create additional uses. The test does not alter real coupon counts.

Progress is local to the browser under \`molly-halloween-heist-beta-v1\`. Passport export format **v7** also includes the fictional voucher and still accepts v1–v6 backups. A v7 restore of a null voucher clears the old local test ticket, while older backups preserve current Halloween progress. This is a deliberately reversible test record, not a real benefit.

## Christmas Week as the next seasonal milestone

Christmas Week is visible in Events as **24–30 December** (Europe/Rome), explicitly **PLANNED**. It has no playable event, invented Christmas game or reward yet. We can choose one or more Christmas-only variations of existing games after reviewing Halloween beta feedback and Molly's birthday experience. Potential design areas: seasonal art/music, temporary challenge variants, event-only levels and separate wallet rewards, but none is committed to implementation yet.

## Validation / playtest

Automated tests in \`tests/seasonalEvents.test.ts\` check: exact 2026 midnight opening and exclusive closure; the 2027 daylight-saving transition; annual date rolling and Christmas calendar visibility; dummy award/replay, one simulated redemption, expiry at midnight, and invalid/corrupt coupon recovery. The existing 99 Files game-rule tests continue to verify stage progression/replay and stars; \`tests/arcadeChronicle.test.ts\` now expects Halloween, birthday and Christmas calendar entries.

For the live beta: on **29–30 October**, see the locked Heist with opening countdown, and confirm normal daily/case files still work. On **31 October**, open the Heist, solve three stages, inspect the dummy voucher in Wallet and perform one simulated redemption. On **1 November**, confirm Heist is locked again, old wins and scores persist, the voucher is either recorded redeemed or expired, and Christmas remains upcoming. The automatic opening/closing has been verified in deterministic unit tests; it still needs actual day-boundary observation from a browser in production.

Source: \`src/lib/seasonalEvents.ts\`, \`src/lib/halloweenVoucher.ts\`, \`src/games/NineNine.tsx\`, \`src/games/HalloweenTestVoucherPanel.tsx\`, calendar/navigation/Wallet and Passport.
