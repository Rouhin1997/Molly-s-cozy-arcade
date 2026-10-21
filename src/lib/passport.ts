import type { Progress } from './game';
import type { ConnectionProgress } from './connections';
import type { ToonProgress } from './toon';

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
};

export type PassportStamp = {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
};

export function passportSummary(p: ArcadeProgress) {
  const totalStars = p.guess.stats.points + p.connections.stats.stars + p.toon.stats.stars;
  const solved = p.guess.stats.solved + p.connections.stats.solved + p.toon.stats.solved;
  const played = p.guess.stats.played + p.connections.stats.played + p.toon.stats.played;
  const stamps: PassportStamp[] = [
    { id: 'hello', icon: '🎟️', name: 'First Ticket', description: 'Solve your first arcade puzzle.', earned: solved > 0 },
    { id: 'food', icon: '🍓', name: 'Food Sleuth', description: 'Solve five Guess Who? mysteries.', earned: p.guess.stats.solved >= 5 },
    { id: 'fruit', icon: '🥑', name: 'Kitchen Detective', description: 'Solve fifteen Guess Who? mysteries.', earned: p.guess.stats.solved >= 15 },
    { id: 'connector', icon: '🧩', name: 'Pattern Spotter', description: 'Complete your first Connections board.', earned: p.connections.stats.solved > 0 },
    { id: 'master', icon: '🟪', name: 'Four of a Kind', description: 'Complete ten Connections boards.', earned: p.connections.stats.solved >= 10 },
    { id: 'toons', icon: '📺', name: 'Channel Surfer', description: 'Identify five cartoon broadcasts.', earned: p.toon.stats.solved >= 5 },
    { id: 'signal', icon: '📡', name: 'Perfect Reception', description: 'Recognise five shows at the first signal.', earned: p.toon.stats.perfectSignals >= 5 },
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
