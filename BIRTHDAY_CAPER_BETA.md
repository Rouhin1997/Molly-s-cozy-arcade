# Molly's Birthday 2026 — The Great Birthday Caper

**Release:** Official birthday special, scheduled for **13 November 2026, 00:00–23:59 (Europe/Rome)**. `BIRTHDAY_EVENT_PUBLISHED=true` is set in `src/lib/birthdayQuest.ts`; only the 2026 public edition opens. Players who start on the day may finish afterward. The Wallet keeps their gift.

**Creator preview:** `https://rouhin1997.github.io/Molly-s-cozy-arcade/?birthday-beta=1`

The creator preview URL opens immediately with independently saved game progress and a **test-only birthday coupon**. The green beta/developer notice and on-screen reset control have been removed for a clean, fully official interface. This URL is not private; anyone with it can rehearse the game. It never issues the real birthday Wallet coupon. For a fresh preview, clear the `molly-birthday-beta-2026-v1` and `molly-birthday-coupon-beta-2026-v1` localStorage keys in browser developer tools (not the `live` keys).

## The three short chapters

1. **The 99 Files · Cake Caper:** connect matching evidence from a receipt, corridor camera, sticky note and storage register; deduce which room holds Jake's misplaced birthday cake. Two matching pairs are required.
2. **Bazinga! · Party Seating:** arrange Sheldon, Leonard, Penny, Amy and Raj around Molly using six stated constraints. The exhaustive logic checker confirms one correct arrangement.
3. **Who? What? Where? When? · The Hometown Cipher:** complete three quick field notes and find the town password `Chaibasa`. Four optional hints are hidden until revealed, in order: eastern India and forests; eight letters; Kolhan/Saranda; Jharkhand/tea.

Each chapter has brief story copy, gentle error feedback, and a small celebration on completion. The event has a birthday-themed paper/confetti backdrop, bunting, balloons, and a gift reveal.

**Opening-day welcome:** Whenever Molly opens or reloads the arcade on **13 November 2026 (Rome time)**, an accessible birthday welcome popup appears on the home screen. She can dismiss it or enter the Birthday Caper immediately. Closing it suppresses it for the remainder of that open page; reopening/reloading the site shows it again on birthday day. An arcade left open across midnight checks the clock every 15 seconds, so the welcome and game entry turn on without a fresh deployment. Outside the day, the welcome does not render.

**Official navigation:** The "Little occasions" card displays a non-interactive **Opens 13 November** label before launch and a **Play Birthday Caper** button during the event. The birthday is also listed in the **Games** dropdown only on the live day. No "See the preview" or creator note appears on the public interface.

## The official gift

At the unlocked vault, Molly sees **three visible coupons** and can select **exactly one**:

- **Holiday Snackbox:** a festive snack box prepared for her.
- **Movie Experience of Your Choice:** she chooses the film and cinema outing.
- **Fund My Makeover:** a makeover of her choice (hair colour/highlights, mani-pedi, laser appointment or another treatment), planned together.

She selects a card, explicitly confirms her choice, and the coupon is saved in the arcade's existing **Wallet** under a separate birthday gift section. A saved coupon cannot be replaced or obtained again by replaying, even when marked received. She can later mark the gift as **received** in the Wallet; this action also requires confirmation. No expiration or monetary amount is imposed by the game.

**Storage:** Browser `localStorage` only. Gift selections, voucher status and chapter progress belong to this browser, not an authenticated server account. Cross-device synchronisation or tamper-proof redemptions would require a backend; avoid clearing site data before preserving a backup.

## Release QA

- [ ] 12 November (Rome): public event remains locked; calendar says *Opens 13 November*, without preview buttons or developer notice.
- [ ] 13 November (Rome), starting 00:00: public event opens; welcome popup appears on page load and from an already-open tab within 15 seconds. Test both *Enter the Birthday Caper* and dismissal.\n- [ ] Games navigation lists the birthday adventure only on 13 November; events and homepage CTA show the playable mode.
- [ ] Verify incorrect evidence pairs and cake locations do not advance.
- [ ] Verify the six-seat puzzle rejects incomplete and invalid arrangements; accepts the single valid one.
- [ ] Verify the hometown hints remain hidden until requested and unlock accepts `Chaibasa` case-insensitively.
- [ ] At the finale, try all three choices **before** confirming; ensure final confirmation saves only the selected coupon.
- [ ] Navigate to Wallet; confirm exactly the chosen birthday ticket is shown alongside existing rewards.
- [ ] Refresh and return to Wallet: coupon is still present; reopening vault cannot award a second.
- [ ] Mark the live coupon received and verify the Wallet retains the redeemed record.
- [ ] Run through creator preview and ensure its coupon never alters the real birthday Wallet; clear *beta* storage keys if a fresh preview is needed.
- [ ] Test desktop and small mobile widths; verify reduced-motion mode and keyboard navigation.

Automated tests: `tests/birthdayQuest.test.ts` and `tests/birthdayCoupon.test.ts`.
