# Bazinga! Lab — original art, inspiration & attribution

**Status:** Phase 2E room-adventure edition. This is an unofficial, free, fan-made browser minigame. It is not affiliated with, endorsed by or licensed by Warner Bros., CBS, Chuck Lorre Productions or the creators and performers of *The Big Bang Theory*.

## What appears in the public site

- Eight **original, playable schematic room maps**, including the apartments, comic shop, university locations, Howard and Bernadette's home, Raj's apartment and theatre. They are **inspired by** recognizable settings and do not claim exact scale, blueprint accuracy, set-construction detail or reproduced props.
- Eight original **vector/chibi sticker portraits** (drawn in `src/components/BazingaSticker.tsx`). They use simple, generic stylized hair, glasses, outfits and symbolic accessories associated with characters. They are not screenshots, actor photographs, official character artworks, tracings or licensed marketing assets.
- Original illustrated win/loss scenes generated from those stickers, with entirely new short puzzle reactions written for this arcade. The brief word “Bazinga!” is used as a recognizable verbal reference, not copied theme music or a video clip.
- 18 original episode-like puzzle situations with room constraints, plus the earlier 18 Classic Lab puzzles.
- No externally hosted imagery, fonts beyond the existing site theme, video, show logos, TV stills, audio or unauthorized screenshots were added in this release. Attribution alone would not confer permission to distribute copyrighted show stills.

## Set and lore references consulted

These references informed scene titles and game-friendly design decisions. None of their photos, screenshots, scripts or other media were copied into the repo.

1. Warner Bros. Studio Tour Hollywood: official description of Apartment 4A, Apartment 4B and Caltech cafeteria exhibition recreations. https://www.wbstudiotour.com/hollywood-made-here/
2. Warner Bros. Studio Tour Hollywood (press announcement): “Sheldon's spot” and the apartment and cafeteria sets. https://www.prnewswire.co.uk/news-releases/warner-bros-studio-tour-hollywood-adds-sets-from-the-big-bang-theory-for-fans-to-relive-their-favorite-moments-818467996.html
3. Fan episode guide, “The Staircase Implementation” (S3E22): discussion of Sheldon's designated couch seat and TV/temperature rationale. https://the-big-bang-theory.com/episodeguide/episode/322/The-Staircase-Implementation/
4. Fan episode guide, Sheldon's Spot: scene references concerning airflow, sun and TV viewing, including the difference between the *comfortable cross-breeze* in 4A and an *unpleasant door-side draft* in the original game maps. https://the-big-bang-theory.com/sheldons_spot/

### Accuracy policy

- The apartment 4A scene reserves a left-side couch cushion for Sheldon and visually includes a TV, window, desk and kitchen, drawing on recognizable set features. Seat dimensions and map furniture placements are creative abstractions, **not official production layouts**.
- Rules like “Stuart gets the bad stool” or “Sheldon sits farthest from sick Raj” are **original fan-fictional episode premises** inspired by characters' comic tendencies, not assertions about particular aired episodes.
- Sheldon sometimes prefers a specific cross-breeze when properly conditioned; “no draft” is therefore treated as avoiding *uncomfortable* drafts, not a blanket canonical rule.
- Future contributions with actual images must verify the license, any model/character likeness permissions, attribution terms, and legal appropriateness for a publicly hosted project. Prefer continuing the original vector-art direction.

## Code modules

- `src/data/bazingaWorld.ts`: room coordinates, seat properties, props, 18 stories, geometry-based clue generator and exhaustive uniqueness checks.
- `src/lib/bazingaWorld.ts`: room interactions and scoring using the pre-existing Bazinga progress object.
- `src/components/BazingaSticker.tsx`: original scalable vector character-inspired portrait tokens.
- `src/games/BazingaRoomGame.tsx`: episode gallery, room maps, clue paper, result scenes.
- `src/games/BazingaClassic.tsx`: preserved earlier linear puzzle edition with legacy save compatibility.
- `tests/bazingaWorld.test.ts`: checks all authored cases have exactly one possible solution; verifies spatial lore constraints, scores, hints, completed results and previous totals.

## Phase 2F lore research and dialogue policy

Phase 2F further consulted the following fan-maintained, episode-linked resources, **without copying scripts, image assets, or dialogue**:

- [The Big Bang Theory — Sheldon's Spot](https://the-big-bang-theory.com/sheldons_spot/) explains the contextual seasonal airflow, screen angles and the very different response to an uncomfortable cold draft.
- [Roommate Agreement](https://the-big-bang-theory.com/roommate_agreement/) provides context for Sheldon's many absurd contractual demands and his reliance on checklists.
- [Weekly Calendar](https://the-big-bang-theory.com/weekly_calendar/) identifies recurring Wednesday comic-book and Halo routines.
- [Bernadette biography](https://the-big-bang-theory.com/characters.Bernadette/) explains the later Wolowitz household's connection to Stuart.
- [The Gorilla Experiment (S3E10)](https://www.imdb.com/title/tt1558529/quotes/) offers a real example of Sheldon offering restrained, reluctant praise after someone accurately explains his seating rationale.

**Original creative work policy:** all 18 scenario descriptions and winner messages have been rewritten as newly authored fan-fictional situations. Win messages are *inspired by* Sheldon's precision, caveats and faint praise but do not reproduce show catchphrases or long quotations. Loss uses only the short recognizable “Bazinga!” reference.

Phase 2F deliberately removes any “Sheldon's spot” marker from the displayed seat name/legend, leaving genuine physical clues. Spatial fairness is improved by an optional on-map neighbour-line diagram. `tests/bazingaWorld.test.ts` enforces geometric clearance, multi-step Expert deductions and strict uniqueness.
