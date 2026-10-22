import type { Progress } from './game';
import type { ConnectionProgress } from './connections';
import type { ToonProgress } from './toon';
import type { BazingaProgress } from './bazinga';
import type { NineProgress } from './nineNine';

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTIES: Record<Difficulty, { label: string; multiplier: number; description: string }> = {
  easy: { label: 'Cozy', multiplier: 1, description: 'A little breather, with generous hints.' },
  medium: { label: 'Clever', multiplier: 1.5, description: 'A thoughtful challenge with balanced clues.' },
  hard: { label: 'Expert', multiplier: 2, description: 'For an impressive puzzle-solving brain.' },
};

export function scoreWithDifficulty(base: number, difficulty: Difficulty): number {
  return Math.round(base * DIFFICULTIES[difficulty].multiplier);
}

/** The most recent stored high score for a puzzle is authoritative for awarding stars.
 * Returning only an improvement prevents endless practice replays farming stars. */
export function bestAward(previous: Record<string, number> | undefined, puzzleId: string, score: number) {
  const old = Math.max(0, previous?.[puzzleId] ?? 0);
  const next = Math.max(old, score);
  return { delta: next - old, awards: { ...previous, [puzzleId]: next } };
}

export type ArcadeProgress = {
  guess: Progress;
  connections: ConnectionProgress;
  toon: ToonProgress;
  bazinga?: BazingaProgress;
  nine?: NineProgress;
};

export type PassportStamp = {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
};

export function passportSummary(p: ArcadeProgress) {
  const bazinga = p.bazinga?.stats;
  const nine = p.nine?.stats;
  const totalStars = p.guess.stats.points + p.connections.stats.stars + p.toon.stats.stars + (bazinga?.stars??0) + (nine?.stars??0);
  const solved = p.guess.stats.solved + p.connections.stats.solved + p.toon.stats.solved + (bazinga?.solved??0) + (nine?.solved??0);
  const played = p.guess.stats.played + p.connections.stats.played + p.toon.stats.played + (bazinga?.played??0) + (nine?.played??0);
  const stamps: PassportStamp[] = [
    { id: 'hello', icon: '🎟️', name: 'First Ticket', description: 'Solve your first arcade puzzle.', earned: solved > 0 },
    { id: 'food', icon: '🍓', name: 'Food Sleuth', description: 'Solve five Guess Who? mysteries.', earned: p.guess.stats.solved >= 5 },
    { id: 'fruit', icon: '🥑', name: 'Kitchen Detective', description: 'Solve fifteen Guess Who? mysteries.', earned: p.guess.stats.solved >= 15 },
    { id: 'connector', icon: '🧩', name: 'Pattern Spotter', description: 'Complete your first Connections board.', earned: p.connections.stats.solved > 0 },
    { id: 'master', icon: '🟪', name: 'Four of a Kind', description: 'Complete ten Connections boards.', earned: p.connections.stats.solved >= 10 },
    { id: 'toons', icon: '📺', name: 'Channel Surfer', description: 'Identify five cartoon broadcasts.', earned: p.toon.stats.solved >= 5 },
    { id: 'signal', icon: '📡', name: 'Perfect Reception', description: 'Recognise five shows at the first signal.', earned: p.toon.stats.perfectSignals >= 5 },
    { id: 'logic', icon: '⚛️', name: 'Logic Rookie', description: 'Solve a Bazinga! Lab experiment.', earned: (bazinga?.solved??0) > 0 },
    { id: 'theorem', icon: '🧠', name: 'Seating Theorem', description: 'Solve five Bazinga! Lab experiments.', earned: (bazinga?.solved??0) >= 5 },
    { id: 'detective', icon: '🕵️', name: 'Honorary Detective', description: 'Close your first Nine-Nine case.', earned: (nine?.solved??0) >= 1 },
    { id: 'nine-master', icon: '📌', name: 'Evidence Whisperer', description: 'Solve five Nine-Nine cases.', earned: (nine?.solved??0) >= 5 },
    { id: 'heist-hero', icon: '🎃', name: 'Heist Champion', description: 'Complete the three-stage Halloween Heist.', earned: ['heist-one','heist-two','heist-three'].every(id=>(p.nine?.bestAwards?.['99:'+id]??0)>0) },
    { id: 'collector', icon: '✨', name: 'Star Collector', description: 'Collect 1,000 stars across the arcade.', earned: totalStars >= 1000 },
    { id: 'streak', icon: '🔥', name: 'Daily Ritual', description: 'Reach a 3-day Guess Who? daily streak.', earned: p.guess.stats.bestStreak >= 3 },
    { id: 'superstar', icon: '🌟', name: 'Arcade Superstar', description: 'Solve 50 puzzles across the arcade.', earned: solved >= 50 },
  ];
  return {
    stars: totalStars,
    solved, played,
    completion: stamps.filter(s => s.earned).length,
    stamps,
    games: [
      { id: 'guess', icon: '🍓', name: 'Guess Who?', solved: p.guess.stats.solved, played: p.guess.stats.played, stars: p.guess.stats.points, best: p.guess.stats.bestStreak, bestLabel: 'Best daily streak' },
      { id: 'connections', icon: '🧩', name: 'Little Connections', solved: p.connections.stats.solved, played: p.connections.stats.played, stars: p.connections.stats.stars, best: p.connections.stats.bestScore, bestLabel: 'Best board' },
      { id: 'toon', icon: '📺', name: 'Toon Rewind', solved: p.toon.stats.solved, played: p.toon.stats.played, stars: p.toon.stats.stars, best: p.toon.stats.bestSignal, bestLabel: 'Best signal' },
      { id: 'bazinga', icon: '⚛️', name: 'Bazinga! Lab', solved: bazinga?.solved??0, played: bazinga?.played??0, stars: bazinga?.stars??0, best: bazinga?.bestScore??0, bestLabel: 'Best theorem' },
      { id: 'nine', icon: '🕵️', name: 'The 99 Files', solved: nine?.solved??0, played: nine?.played??0, stars: nine?.stars??0, best: nine?.bestScore??0, bestLabel: 'Best case' },
    ],
  };
}

export function readPreferredDifficulty(game: string): Difficulty {
  try {
    const stored = localStorage.getItem(`mollys-difficulty-${game}`);
    return stored === 'easy' || stored === 'medium' || stored === 'hard' ? stored : 'medium';
  } catch { return 'medium'; }
}

export function savePreferredDifficulty(game: string, level: Difficulty): void {
  try { localStorage.setItem(`mollys-difficulty-${game}`, level); } catch { /* Still playable. */ }
}
