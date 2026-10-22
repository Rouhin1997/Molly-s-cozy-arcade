# Pink Rush! — BLACKPINK Memory-Lane Concert
**Game 06 · Phase 2J · Implemented, awaiting browser play-test**

## Phase 2L — Edited BLINK questionbank, public-domain cheering and anti-repeat sessions

The live questions are now created by `src/data/pinkRush.ts` combining 20 track, 8 era, 12 member, 30 original fan-life, and 17 additional sourced fan-life cards (**87**). `src/data/pinkRushEditorial.ts` is the authoritative **wording/answer-option polish layer** for the original 62 single-choice questions. `src/data/pinkRushFanExtra.ts` provides 17 additional cards with individual source URLs. A title, emoji, question or year label must not reveal the answer; options should be comparable, not randomly unrelated. The rule validator and regression tests enforce answer-leak prevention, a realistic all-collaboration answer set for the previously trivial Selena Gomez/Ice Cream question, and lack of member names as accidental eliminators.

**New research references:** [The Recording Academy: ROSÉ and her 2026 Grammy nominations](https://www.grammy.com/artists/rose/59634/); [2026 Grammys APT opening performance](https://www.grammy.com/video/rose-bruno-mars-apt-performance/); [GRAMMY: the Korean game behind APT](https://www.grammy.com/news/2026-grammys-nominations-song-of-the-year/); [Korean Film Council: JISOO's Newtopia](https://www.koreanfilm.or.kr/eng/news/news.jsp?mode=VIEW&seq=6135); [Yonhap: JISOO and Zayn's EYES CLOSED](https://en.yna.co.kr/view/AEN20251010006300315); [TIME recognition reported by Soompi](https://www.soompi.com/article/1557345wpp/blackpink-becomes-first-girl-group-in-history-to-be-named-time-magazines-entertainer-of-the-year).

**Repetition fix:** An optional `recentPractice:string[]` is stored with the existing PinkProgress v1. Each new practice setlist records the previous practice IDs, prioritizes never-seen questions per category, then reuses the least-recently seen when no others remain. Across four consecutive fresh practice concerts, all 44 regular questions are distinct. The final lightstick puzzle may repeat (only 8 patterns), but regular trivia does not repeat prematurely. Existing in-progress sessions and awards are not migrated or reset.

**Real audience audio:** Public-domain recording [*Clapping hurray.ogg*](https://commons.wikimedia.org/wiki/File:Clapping_hurray.ogg) by **starlite**, recorded for PDsounds.org, uploaded to Wikimedia Commons by Fæ. License: **public domain** (see file page and uploader's permission statement). Exact original-media URL: `https://upload.wikimedia.org/wikipedia/commons/a/a8/Clapping_hurray.ogg`. The app directly plays the remote audio element on correct answers, louder as the stage fills; wrong answers interrupt playback. Accessible stage-corner mute icon. This is a real human recording rather than synthetic crowd impersonation. If external fetch/Ogg decoding fails, the sound is silent but stage pulse UI remains functional. The pre-existing composed finale chime is separate. Source and licensing documentation stay in this file, not in the game UI.

**Player-visible footer:** “Unofficial fan-made BLACKPINK tribute, researched using YG’s official discography and independent sources.” This keeps the experience uncluttered.

## Phase 2K — Black-and-pink BLINK fan festival, original concert audio and reward wallet

The user play-tested Phase 2J and authorized a substantially expanded, more BLACKPINK-specific game. **New concerts are 12 acts**, not eight. The old no-stakes disco quiz has become a rewarding concert journey: two group tracks, one release-order puzzle, three solo/members, **five fan-life questions**, and a rhythm encore. Earlier eight-act saves still work. There is still **one welcoming difficulty setting**, and guessing wrong switches off a light and takes the player one act back (with the previously cleared round replayed before resuming). No timers.

**Verified public-fact categories (30 new cards, ~70 total):**
- Pets: Jisoo’s Dalgom; Jennie’s Kuma; Rosé’s adopted Hank; Lisa’s all-L-named cats and Love.
- Fashion ambassadors: Jisoo/Dior, Jennie/Chanel, Rosé/Saint Laurent, Lisa/Louis Vuitton, Bvlgari and former Celine work.
- Live performances: BLACKPINK's 2019 Coachella stage and 2023 headliner milestone, JENNIE and LISA’s separate 2025 festival sets.
- Public roles: JENNIE appeared in The Idol; LISA acted in season three of The White Lotus.
- FIFA: LISA joined Anitta and Rema for the World Cup 2026 album track Goals.
- Fan culture: LISA’s connection to the Labubu bag-charm trend and POP MART blind boxes.

**Source URLs:** [FIFA Goals release](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/lisa-anitta-rema-debut-new-single-for-world-cup-album); [Yonhap 2023 Coachella](https://en.yna.co.kr/view/AEN20230417002100315); [CNA 2025 solo stages](https://cnalifestyle.channelnewsasia.com/entertainment/blackpink-jennie-lisa-rose-coachella-463271); [CNA luxury fashion](https://cnaluxury.channelnewsasia.com/obsessions/blackpink-lisa-louis-vuitton-ambassador-246046); [Tatler pets](https://www.tatlerasia.com/lifestyle/entertainment/pets-of-the-blackpink-girls); [Reuters acting](https://www.reuters.com/lifestyle/two-members-k-pop-group-blackpink-go-solo-coachella-festival-2025-04-14/); [License Global Labubu](https://www.licenseglobal.com/trends-insights/the-meteoric-rise-of-labubu). Trivia source IDs are recorded alongside every question in `src/data/pinkRushFan.ts`. Avoid unverified favourite foods/private habits.

**Visual/audio:** Original black/hot-pink stage and fan audience, animated reactive spots; desktop side-by-side game and stage; phone sticky compact stage above choices, so pattern and buttons remain visible concurrently. `src/lib/pinkConcertAudio.ts` creates original crowd-like synth sounds and a crescendo without external samples or copyrighted music. Muting is supported, and the outcome stays clear visually.

**Wallet state machine (local only):**
`locked --full show--> ready --choose 1 of 3 hidden cards--> active --Redeem--> redeemed`.
Before redemption, `active --surrender--> seeking --complete fresh full show--> ready`. Redeemed is a terminal state; replays do not award more vouchers. After choosing, all three card fronts become visible with the chosen one highlighted. Gift options: choreo lesson to Rouhin, song to be sung by Rouhin, or a sixty-second Lisa praise speech by Rouhin. The Wallet has a Redeem button and direct play-again path; redeemed gift becomes a permanent in-browser Passport record. Separate localStorage redemption marker protects against old import rollback **within the same browser**. This is **not server-enforced anti-tamper security**; clearing or changing browser storage can defeat it. Truly persistent cross-device gifts require authenticated server storage/RLS.

**Tests:** `tests/pinkRush.test.ts` covers the full 12-act performance, 30 new fan facts, all question mechanics, light-off rollback/recovery, no duplicate practice stars, all blind-card/claim/surrender/redeem transitions, redeemed marker restoration, and backwards-compatible old saves. See DEVELOPMENT_HANDOFF.md.

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
