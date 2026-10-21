import { describe, expect, it } from 'vitest';
import { generateToonLineup, optionsForShow, showsForPack, toonShows, validateToonCatalogue, TOON_ROUNDS } from '../src/data/toon';
import { advanceToonSession, currentToonRound, freshToonRound, guessToonShow, initialToonProgress,
  MAX_TUNES, MAX_WRONG_CHANNELS, newToonSession, registerToonScore, tuneToonSignal } from '../src/lib/toon';
import { initialProgress } from '../src/lib/game';
import { initialConnections } from '../src/lib/connections';

const dexter = toonShows.find(show => show.id === 'dexter')!;
const courage = toonShows.find(show => show.id === 'courage')!;

describe('Cartoon Network India content', () => {
  it('has unique show titles, visual clue sets, and a full pack for both eras', () => {
    expect(toonShows.length).toBeGreaterThanOrEqual(18);
    expect(validateToonCatalogue()).toEqual([]);
    expect(showsForPack('classics').length).toBeGreaterThanOrEqual(TOON_ROUNDS);
    expect(showsForPack('later').length).toBeGreaterThanOrEqual(TOON_ROUNDS);
  });
  it('creates six reproducible, non-repeating daily channels', () => {
    const a = generateToonLineup('daily-2026-10-21');
    expect(a).toEqual(generateToonLineup('daily-2026-10-21'));
    expect(a).toHaveLength(6);
    expect(new Set(a).size).toBe(a.length);
    expect(a).not.toEqual(generateToonLineup('daily-2026-10-22'));
  });
  it('limits an era-based practice session to the chosen era', () => {
    const later = new Set(showsForPack('later').map(s => s.id));
    const s = newToonSession('practice-era', 'later');
    expect(s.ids.length).toBe(6);
    expect(s.ids.every(id => later.has(id))).toBe(true);
  });
  it('provides four different choices with the correct broadcast included', () => {
    for (const show of toonShows) {
      const ids = optionsForShow(show.id, 'seed');
      expect(ids.length).toBe(4);
      expect(new Set(ids).size).toBe(4);
      expect(ids).toContain(show.id);
      expect(ids).toEqual(optionsForShow(show.id, 'seed'));
    }
  });
});

describe('Tune the TV and identify its channel', () => {
  it('starts with one clue and two guesses', () => {
    const r = freshToonRound();
    expect(r.tuneLevel).toBe(1);
    expect(r.attempts).toEqual([]);
    expect(r.status).toBe('playing');
    expect(MAX_WRONG_CHANNELS).toBe(2);
  });
  it('reveals reception progressively but never past full signal', () => {
    let r = freshToonRound();
    for (let i=0; i<5; i++) r = tuneToonSignal(r);
    expect(r.tuneLevel).toBe(MAX_TUNES);
    expect(tuneToonSignal(r)).toBe(r);
  });
  it('awards a maximum 120 stars on the first-signal guess', () => {
    const r = guessToonShow(freshToonRound(), dexter, dexter.id);
    expect(r.status).toBe('won');
    expect(r.score).toBe(120);
  });
  it('scores progressively fewer stars for revealing clues', () => {
    const r = guessToonShow(tuneToonSignal(tuneToonSignal(freshToonRound())), dexter, dexter.id);
    expect(r.status).toBe('won');
    expect(r.score).toBe(70);
  });
  it('allows a recovery guess with a 20-star penalty', () => {
    const wrong = guessToonShow(freshToonRound(), dexter, courage.id);
    const won = guessToonShow(wrong, dexter, dexter.id);
    expect(wrong.status).toBe('playing');
    expect(won.status).toBe('won');
    expect(won.score).toBe(100);
    expect(won.attempts).toEqual([courage.id, dexter.id]);
  });
  it('ignores repeated wrong answers rather than consuming a second chance', () => {
    const wrong = guessToonShow(freshToonRound(), dexter, courage.id);
    expect(guessToonShow(wrong, dexter, courage.id)).toBe(wrong);
  });
  it('ends a transmission on a second distinct wrong answer', () => {
    const a = guessToonShow(freshToonRound(), dexter, courage.id);
    const b = guessToonShow(a, dexter, 'samurai');
    expect(b.status).toBe('lost');
    expect(b.score).toBe(0);
    expect(tuneToonSignal(b)).toBe(b);
    expect(guessToonShow(b, dexter, dexter.id)).toBe(b);
  });
  it('does not advance until the current show is finished', () => {
    const session = newToonSession('advance-test');
    expect(advanceToonSession(session)).toBe(session);
    expect(currentToonRound(session).status).toBe('playing');
    const id = session.ids[0];
    const show = toonShows.find(s=>s.id === id)!;
    const won = guessToonShow(freshToonRound(),show,id);
    const updated = { ...session, rounds: { [id]: won } };
    expect(advanceToonSession(updated).index).toBe(1);
    expect(session.index).toBe(0);
  });
  it('records shared totals and perfect-signal achievements', () => {
    const first = registerToonScore(initialToonProgress().stats,guessToonShow(freshToonRound(),dexter,dexter.id));
    expect(first).toEqual({ played: 1, solved: 1, stars: 120, perfectSignals: 1, bestSignal: 120 });
  });
});

describe('arcade regression', () => {
  it('preserves Guess Who? and Connections local-progress formats', () => {
    expect(initialProgress().version).toBe(1);
    expect(initialConnections().version).toBe(1);
  });
});
