# Pink Rush! — BLACKPINK Memory-Lane Concert
**Game 06 · Phase 2J · Implemented, awaiting browser play-test**

Pink Rush is a cozy, upbeat BLACKPINK fan homage made especially for Molly. **There are no difficulty levels.** A BLINK should be rewarded for remembering memorable songs and eras, without needing to memorize chart minutiae or face countdown timers.

## Eight-round concert loop
Each deterministically generated show has exactly **three track memories, two era-ordering challenges, two member-spotlight memories and one lightstick encore**, interleaved to make the concert feel varied.

1. Guess the Track: 20 original clues cover BLACKPINK group songs from their SQUARE ONE debut through DEADLINE, with four plausible track titles. We write fresh clue descriptions rather than using copyrighted song lyrics.
2. Era Rush: 8 curated chronology sequences of three release names. Player selects earliest → latest from shuffled cards. A wrong ordering clears the selected cards and gives encouragement.
3. Spotlight Shuffle: 12 BLINK memories from each member's solo career, covering JISOO, JENNIE, ROSÉ and LISA. We use the real project/song names, not subjective personality stereotyping.
4. Encore Rush: eight optional visual memory sequences use **original coloured lightstick patterns**, 4–6 beats long. Every sequence can be replayed indefinitely; there are no timers or hard fails. A player-initiated optional sound toggle synthesizes simple independent oscillator notes on presses, not recordings of BLACKPINK music.

### Concert and award design
- Original CSS/vector-style four-member stage, spotlights, lightstick audience, illuminated riser, animated confetti and personalized Molly VIP pass. Original illustrations are symbolic, not official band photographs or likeness reproductions.
- **One welcoming challenge setting**, no Cozy/Clever/Expert picker. Wrong answers have a small effect on the round's star score but cannot end the show.
- Daily concert selected deterministically from the calendar date and keeps its progress; unlimited practice concerts rotate independently from a session counter. Each round persists in localStorage (`mollys-pink-rush-v1`).
- Round star score = max(22, 60 − 9 × mistakes). Maximum **480** performance points per show.
- Anti-farming: practice stars are awarded only for improvements to the personal-best score of each unique challenge; daily awards are unique to date and challenge. Replaying can improve a record without double-counting its first solved achievement. A fully correct show earns a Perfect Comeback achievement.
- Passport achievements: VIP BLINK (first complete concert), Encore Superstar (three shows) and Perfect Comeback (perfect-score show).
- Passport backup advances to **version 4** including all six game states, still importing version 1, 2 and 3 backups without overwriting games absent from older saves.
- Records are browser-only unless optional account/cloud syncing is explicitly implemented later.

## Source-grounded music references
We verified release dates, album titles and track relationships primarily from **YG Entertainment's official BLACKPINK discography**:

- [Official BLACKPINK discography](https://ygfamily.com/en/artists/blackpink/discography)
- [SQUARE ONE (8 August 2016): WHISTLE and BOOMBAYAH](https://ygfamily.com/en/artists/blackpink/discography/228)
- [SQUARE TWO (1 November 2016): PLAYING WITH FIRE and STAY](https://ygfamily.com/en/artists/blackpink/discography/231)
- [JUMP (11 July 2025)](https://ygfamily.com/en/artists/blackpink/discography/1632)
- [DEADLINE (27 February 2026): JUMP, GO, Me and my, Champion, Fxxxboy](https://ygfamily.com/en/artists/blackpink/discography/1651)
- [GRAMMY: BLACKPINK's solo career timeline through Jennie's Ruby (7 March 2025)](https://www.grammy.com/news/blackpink-solo-acts-jennie-jisoo-rose-lisa-single-album-born-pink-world-tour/)
- [Yonhap: Jisoo AMORTAGE details (14 February 2025)](https://en.yna.co.kr/view/AEN20250214002900315)

The short fact descriptions can serve as fan memory sparks; they are newly authored, not quotations from songs or scripts. Official discography links are references, not copied artwork or embedded media.

## Project files and test coverage
- `src/data/pinkRush.ts`: 40 individually authored puzzles, four-member facts, 8 encore patterns, deterministic eight-round setlist and validation.
- `src/lib/pinkRush.ts`: pure engine for guesses, chronology, pattern repeats, scores, best-award credits, versioned save state and show completion.
- `src/games/PinkRush.tsx`: performance UI, original stage illustration, lightstick control, 8-round progression, optional sound and VIP finale.
- `src/styles.css`: dedicated pink/black concert world, responsive controls, reduced-motion fallback.
- `tests/pinkRush.test.ts`: every factual answer and chronology, wrong attempts, full eight-round daily/practice playthroughs, score non-farming and save continuity.

## Player / beta tester checklist
1. Play a fresh daily concert, close/reopen during a stage, and resume the same challenge.
2. Identify 2016 and 2026 songs. Check that every clue is recognizable and factually accurate for a serious BLINK without feeling like a stressful examination.
3. Try one wrong chronology order, then solve correctly; no stuck selections or repeat errors.
4. Replay an encore pattern more than once and try it muted with visual-only feedback. Test mobile taps and accessibility.
5. Finish eight rounds and view the full personalized stage finale. Finish a practice set and repeat a known question: only improved personal-best star records should increase.
6. Export Passport v4 and import a legacy v3 (or v1/v2) without losing Pink Rush progress.
7. Check that the new **Brave: The Wisps' Trail** preview on the shelf accurately says *Coming Soon* and doesn't claim implementation.

## Next development
Obtain owner and friends' BLINK play-test feedback; revise any prompts that are too obscure, confusing or insufficiently celebratory. The next substantial game in the approved docket is **Brave: The Wisps' Trail**; see `BRAVE_THE_WISPS_TRAIL_PLAN.md`. Its actual implementation still requires a later explicit green light. Preserve space for Molly's November 13 Birthday Quest.
