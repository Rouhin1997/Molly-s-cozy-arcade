import { describe, expect, it } from 'vitest';
import { extraRiddles } from '../src/data/extraQuestions';
import { dailyRiddle, practiceRiddles, riddleDifficulty, riddles } from '../src/data/questions';
import { connectionPuzzles, connectionPuzzleDifficulty, validateConnectionBank } from '../src/data/connections';
import { toonShows, toonMysteryClues, validateToonCatalogue, optionsForShow } from '../src/data/toon';
import { freshToonRound, guessToonShow, toonWrongLimit } from '../src/lib/toon';
import { maxCluesForDifficulty, maxGuessesForDifficulty, newRound, scoreRound } from '../src/lib/game';
import { bestAward, passportSummary, scoreWithDifficulty } from '../src/lib/passport';
import { initialProgress } from '../src/lib/game';
import { initialConnections } from '../src/lib/connections';
import { initialToonProgress } from '../src/lib/toon';

describe('expansion content', () => {
  it('adds unique, original food riddles across the three difficulty pools', () => {
    expect(extraRiddles.length).toBe(24);
    expect(riddles.length).toBe(48);
    expect(new Set(riddles.map(r=>r.id)).size).toBe(riddles.length);
    expect(riddles.every(r=>r.clues.length===4 && r.accepted.length>0 && !!r.funFact)).toBe(true);
    for (const d of ['easy','medium','hard'] as const) {
      expect(riddles.filter(r=>riddleDifficulty(r)===d).length).toBeGreaterThanOrEqual(7);
      expect(practiceRiddles(5,d)).toHaveLength(5);
    }
  });
  it('preserves 2026-10-21 daily answers in the original 24-riddle pool', () => {
    expect(riddles.slice(0,24)).toContain(dailyRiddle('2026-10-21'));
    expect(riddles).toContain(dailyRiddle('2026-10-22'));
  });
  it('curates 28 unique Connections boards with graded practice categories', () => {
    expect(connectionPuzzles.length).toBe(28);
    expect(validateConnectionBank()).toEqual([]);
    for (const d of ['easy','medium','hard'] as const) {
      expect(connectionPuzzles.filter(p=>connectionPuzzleDifficulty(p)===d).length).toBeGreaterThanOrEqual(5);
    }
  });
  it('keeps 35 CN India show choices and special expert hints', () => {
    expect(toonShows.length).toBe(35);
    expect(validateToonCatalogue()).toEqual([]);
    for (const show of toonShows) {
      expect(toonMysteryClues[show.id]).toHaveLength(3);
      const choices = optionsForShow(show.id,'test',6);
      expect(choices).toContain(show.id);
      expect(new Set(choices).size).toBe(6);
    }
  });
});

describe('difficulty and preservation', () => {
  it('gives progressively more stars for higher difficulty', () => {
    expect(scoreWithDifficulty(120,'easy')).toBe(120);
    expect(scoreWithDifficulty(120,'medium')).toBe(180);
    expect(scoreWithDifficulty(120,'hard')).toBe(240);
  });
  it('alters Guess Who? attempts and hints by difficulty', () => {
    expect(maxGuessesForDifficulty('easy')).toBe(5);
    expect(maxGuessesForDifficulty('medium')).toBe(4);
    expect(maxGuessesForDifficulty('hard')).toBe(3);
    expect(maxCluesForDifficulty('hard')).toBe(3);
    expect(scoreRound(1,0,'hard')).toBe(240);
    expect(newRound('hard').difficulty).toBe('hard');
  });
  it('allows one Expert wrong toon guess and accepts human-typed cartoon titles', () => {
    expect(toonWrongLimit('hard')).toBe(1);
    const show = toonShows.find(s=>s.id==='scooby')!;
    const success = guessToonShow(freshToonRound('hard'),show,'scooby doo');
    const fail = guessToonShow(freshToonRound('hard'),show,'Pokémon');
    expect(success.status).toBe('won');
    expect(success.score).toBe(240);
    expect(fail.status).toBe('lost');
  });
  it('credits only improved high scores, never infinite repeat points', () => {
    const first = bestAward({},'riddle-1',120);
    expect(first.delta).toBe(120);
    const repeat = bestAward(first.awards,'riddle-1',120);
    expect(repeat.delta).toBe(0);
    const improvement = bestAward(repeat.awards,'riddle-1',180);
    expect(improvement.delta).toBe(60);
  });
});

describe('Arcade Passport', () => {
  it('aggregates old game progress without needing a database', () => {
    const guess = initialProgress(); guess.stats.solved=4; guess.stats.points=200;
    const connections = initialConnections(); connections.stats.solved=1; connections.stats.stars=180;
    const toon = initialToonProgress(); toon.stats.solved=5; toon.stats.stars=300; toon.stats.perfectSignals=5;
    const passport = passportSummary({guess,connections,toon});
    expect(passport.stars).toBe(680);
    expect(passport.solved).toBe(10);
    expect(passport.stamps.find(s=>s.id==='connector')?.earned).toBe(true);
    expect(passport.stamps.find(s=>s.id==='signal')?.earned).toBe(true);
    expect(passport.stamps.find(s=>s.id==='fruit')?.earned).toBe(false);
  });
});
