import { describe, expect, it } from 'vitest';
import {
  connectionPuzzles, dailyConnectionPuzzle, pickPracticeConnection,
  shuffledConnectionWords, validateConnectionBank,
} from '../src/data/connections';
import {
  CONNECTION_MISTAKES, clearConnectionSelection, newConnectionRound, recordConnectionResult,
  submitConnectionSelection, toggleConnectionTile,
} from '../src/lib/connections';
import { initialProgress, newRound, submitGuess } from '../src/lib/game';
import { riddles } from '../src/data/questions';

const puzzle = connectionPuzzles[0];

function choose(round = newConnectionRound(), words: string[] = puzzle.groups[0].words) {
  return words.reduce((state, word) => toggleConnectionTile(state, word, puzzle), round);
}

describe('content validation', () => {
  it('has at least 12 authored puzzles with 16 unique tiles', () => {
    expect(connectionPuzzles.length).toBeGreaterThanOrEqual(12);
    expect(validateConnectionBank()).toEqual([]);
  });

  it('rotates daily boards without an immediate repeat', () => {
    expect(dailyConnectionPuzzle('2026-10-21').id).not.toBe(dailyConnectionPuzzle('2026-10-22').id);
    expect(dailyConnectionPuzzle('2026-10-21').id).toBe(dailyConnectionPuzzle('2026-10-21').id);
  });

  it('shuffles deterministically without losing any tiles', () => {
    const a = shuffledConnectionWords(puzzle, '2026-10-21');
    expect(a).toEqual(shuffledConnectionWords(puzzle, '2026-10-21'));
    expect(a).toHaveLength(16);
    expect(new Set(a).size).toBe(16);
  });

  it('avoids recently played puzzles in practice', () => {
    const recent = connectionPuzzles.slice(0, 5).map(p => p.id);
    expect(recent).not.toContain(pickPracticeConnection(recent, () => 0).id);
  });
});

describe('connections game rules', () => {
  it('selects and deselects a word', () => {
    const selected = toggleConnectionTile(newConnectionRound(), puzzle.groups[0].words[0], puzzle);
    expect(selected.selected).toHaveLength(1);
    expect(toggleConnectionTile(selected, puzzle.groups[0].words[0], puzzle).selected).toEqual([]);
  });

  it('allows at most four selected tiles', () => {
    const five = [...puzzle.groups[0].words, puzzle.groups[1].words[0]];
    expect(choose(newConnectionRound(), five).selected).toHaveLength(4);
  });

  it('does not submit fewer than four selections', () => {
    const r = choose(newConnectionRound(), [puzzle.groups[0].words[0]]);
    expect(submitConnectionSelection(r, puzzle)).toBe(r);
  });

  it('solves a group and removes its tiles from selection', () => {
    const r = submitConnectionSelection(choose(), puzzle);
    expect(r.solved).toEqual([0]);
    expect(r.selected).toEqual([]);
    expect(r.status).toBe('playing');
  });

  it('recognises being one word away and counts one mistake', () => {
    const mixed = [...puzzle.groups[0].words.slice(0, 3), puzzle.groups[1].words[0]];
    const r = submitConnectionSelection(choose(newConnectionRound(), mixed), puzzle);
    expect(r.feedback).toContain('One away');
    expect(r.mistakes).toBe(1);
  });

  it('does not penalize a repeated incorrect combination', () => {
    const mixed = [...puzzle.groups[0].words.slice(0, 2), ...puzzle.groups[1].words.slice(0, 2)];
    const first = submitConnectionSelection(choose(newConnectionRound(), mixed), puzzle);
    const second = submitConnectionSelection(choose(first, mixed), puzzle);
    expect(second.mistakes).toBe(1);
    expect(second.feedback).toContain('already tried');
  });

  it('clears selections', () => {
    expect(clearConnectionSelection(choose()).selected).toEqual([]);
  });

  it('wins and scores after four solved groups', () => {
    let round = newConnectionRound();
    puzzle.groups.forEach(group => { round = submitConnectionSelection(choose(round, group.words), puzzle); });
    expect(round.status).toBe('won');
    expect(round.score).toBe(180);
    expect(round.solved).toHaveLength(4);
  });

  it('loses after four different incorrect guesses', () => {
    let round = newConnectionRound();
    for (let i = 0; i < CONNECTION_MISTAKES; i++) {
      const words = [...puzzle.groups[0].words.slice(0, 2), puzzle.groups[1].words[i]];
      // Choose one other distinct tile so every guess contains exactly four tiles.
      const mixed = [...words, puzzle.groups[2].words[0]];
      round = submitConnectionSelection(choose(round, mixed), puzzle);
    }
    expect(round.mistakes).toBe(CONNECTION_MISTAKES);
    expect(round.status).toBe('lost');
    expect(round.score).toBe(0);
  });

  it('records completed stats exactly once when called', () => {
    let round = newConnectionRound();
    puzzle.groups.forEach(group => { round = submitConnectionSelection(choose(round, group.words), puzzle); });
    const updated = recordConnectionResult({played:0,solved:0,stars:0,bestScore:0}, round);
    expect(updated).toEqual({ played:1, solved:1, stars:180, bestScore:180 });
  });
});

describe('Guess Who? regression', () => {
  it('does not alter initial existing progress schema', () => {
    expect(initialProgress().version).toBe(1);
  });

  it('still accepts familiar alternate food names', () => {
    const eggplant = riddles.find(r => r.id === 'aubergine')!;
    expect(submitGuess(newRound(), eggplant, 'baingan').status).toBe('won');
  });
});
