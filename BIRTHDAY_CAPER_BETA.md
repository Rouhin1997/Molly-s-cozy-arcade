# Molly's Birthday 2026 — The Great Birthday Caper (creator beta)

**Status:** Three-stage playable birthday event and purely decorative gift-vault placeholder. The actual gift is intentionally **not included** until the creator chooses it after beta playtesting.

## Creator playtest URL

For an immediate test before 13 November, open the deployed arcade with `?birthday-beta=1` added to the end of the GitHub Pages URL, then navigate to **Events → Molly's Birthday** or the home birthday banner.

Example: `https://rouhin1997.github.io/Molly-s-cozy-arcade/?birthday-beta=1`

The test flag unlocks the birthday event **only in the current browser**. It stores a separate beta save and marks the rehearsal prominently; no real prize, promise, coupon, or redeemable benefit is issued. The beta reset button only deletes its own adventure progress. This is a friendly preview mode, not a private security measure: a person who knows the query parameter can access it.

On 13 November the actual event automatically opens from 00:00 to 23:59:59 **Europe/Rome**, according to the browser's timezone-capable clock. A live player who already unlocked the vault can return to the finale after the event day, rather than lose their completed card. All logic is client-side, not tamper-resistant.

## Story / mechanics

1. **The 99 Files: The Cake Caper.** Jake picked up the cake, then filed it where nobody would find it. Examine four original case-file exhibits. Pair receipt with camera still and sticky note with storage register to derive two deductions, then identify the evidence-room cold cabinet. Wrong links or locations produce hints; there is no punishing fail or timer.
2. **Bazinga! Lab: Sheldon's Party Seating Protocol.** Molly owns the central chair. Place Sheldon, Leonard, Penny, Amy and Raj into the remaining five seats, satisfying **all six** meaningful conditions. Click a guest chip and then a chair. Exactly **one** solution exists (verified by exhaustive permutation test); missing or invalid arrangements do not advance. An extra hint appears after two incorrect inspections.
3. **Who? What? Where? When? — the hometown cipher.** Three short sequential WHO / WHAT / WHEN questions reveal the final WHERE field note, which provides Jharkhand and West Singhbhum as geographical clues. Enter **Chaibasa**, Molly's place of birth, to unlock the decorative gift vault.

Between stages, a celebratory interstitial appears and the next chapter unlocks. Progress is saved to localStorage under a key independent of the eight normal arcade games. The gift vault has no real content, activation, redemption, or wallet integration at beta stage.

## Playtest checklist

- [ ] Before 13 November, birthday page is locked without `?birthday-beta=1`; creator beta opens it.
- [ ] Try a mismatched evidence pair and a wrong cake location; neither advances.
- [ ] Match both exhibit pairs, then locate the cake; see the chapter celebration.
- [ ] Seat five guests; ensure incomplete and wrong layouts are rejected gently.
- [ ] Complete the unique seating solution; see the chapter celebration.
- [ ] Answer WHO / WHAT / WHEN; try a wrong town, then enter Chaibasa (case insensitive).
- [ ] Confirm the vault displays a birthday message **and an explicitly empty placeholder**, not an actual redeemable gift.
- [ ] Refresh mid-run; verify stage progress resumes.
- [ ] Click **Restart beta** and verify the rehearsal resets independently of main-arcade saves.
- [ ] Test on a phone, keyboard-only navigation, and with reduced motion enabled.
- [ ] On 13 November, verify the actual non-beta birthday gate and separate save.

Automated rules and timezone checks: `tests/birthdayQuest.test.ts`.

## Gift follow-up

The actual gift must be supplied and approved separately. Until then the unlocked card deliberately says the birthday gift is not yet installed; there is no dummy coupon, actual coupon or unannounced promise. Once the gift is chosen, add a dedicated reward display/redeem flow based on the gift's real terms, while retaining the story stages.
