import { matchesRiddle, type Riddle } from '../data/questions';
import { scoreWithDifficulty, type Difficulty } from './passport';

export const MAX_GUESSES = 4;
export const MAX_CLUES = 4;

export type Round = {
  cluesShown: number;
  guesses: string[];
  status: 'playing' | 'won' | 'lost';
  score: number;
  difficulty?: Difficulty;
};

export type PracticeSession = {
  ids: string[];
  rounds: Record<string, Round>;
  index: number;
  sessionNumber: number;
};

export type Stats = {
  played: number;
  solved: number;
  points: number;
  currentStreak: number;
  bestStreak: number;
  lastDailyPlayed: string | null;
  lastDailyWon: string | null;
};

export type Progress = {
  version: 1;
  daily: Record<string, Round>;
  practice: PracticeSession | null;
  stats: Stats;
  bestAwards?: Record<string, number>;
};

export const STORAGE_KEY = 'mollys-cozy-arcade-progress-v1';

export function newRound(difficulty: Difficulty = 'easy'): Round {
  return { cluesShown: 1, guesses: [], status: 'playing', score: 0, difficulty };
}

export function maxGuessesForDifficulty(difficulty: Difficulty = 'easy'): number {
  return difficulty === 'easy' ? 5 : difficulty === 'medium' ? 4 : 3;
}
export function maxCluesForDifficulty(difficulty: Difficulty = 'easy'): number {
  return difficulty === 'hard' ? 3 : MAX_CLUES;
}

export function initialProgress(): Progress {
  return {
    version: 1,
    daily: {},
    practice: null,
    stats: { played: 0, solved: 0, points: 0, currentStreak: 0, bestStreak: 0, lastDailyPlayed: null, lastDailyWon: null },
    bestAwards: {},
  };
}

export function scoreRound(cluesShown: number, wrongGuesses: number, difficulty: Difficulty = 'easy'): number {
  return scoreWithDifficulty(Math.max(30, 120 - (cluesShown - 1) * 20 - wrongGuesses * 10), difficulty);
}

export function addClue(round: Round): Round {
  return round.status === 'playing'
    ? { ...round, cluesShown: Math.min(maxCluesForDifficulty(round.difficulty), round.cluesShown + 1) }
    : round;
}

export function submitGuess(round: Round, riddle: Riddle, guess: string): Round {
  const clean = guess.trim();
  if (round.status !== 'playing' || !clean) return round;
  const correct = matchesRiddle(riddle, clean);
  const guesses = [...round.guesses, clean];
  if (correct) return { ...round, guesses, status: 'won', score: scoreRound(round.cluesShown, guesses.length - 1, round.difficulty) };
  if (guesses.length >= maxGuessesForDifficulty(round.difficulty)) return { ...round, guesses, status: 'lost', score: 0 };
  return { ...round, guesses };
}

export function skipRound(round: Round): Round {
  return round.status === 'playing' ? { ...round, status: 'lost', score: 0 } : round;
}

export function previousDateKey(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function registerResult(stats: Stats, round: Round, dailyDate?: string): Stats {
  if (round.status === 'playing') return stats;
  const won = round.status === 'won';
  const next: Stats = {
    ...stats,
    played: stats.played + 1,
    solved: stats.solved + (won ? 1 : 0),
    points: stats.points + round.score,
  };
  if (!dailyDate) return next;
  // Daily streaks only consider the once-a-day challenge, not practice sets.
  if (stats.lastDailyPlayed === dailyDate) return next;
  next.lastDailyPlayed = dailyDate;
  if (won) {
    next.currentStreak = stats.lastDailyWon === previousDateKey(dailyDate) ? stats.currentStreak + 1 : 1;
    next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
    next.lastDailyWon = dailyDate;
  } else {
    next.currentStreak = 0;
  }
  return next;
}

export function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProgress();
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || !('version' in saved) || saved.version !== 1) return initialProgress();
    const state = saved as Progress;
    if (!state.stats || !state.daily || typeof state.stats.played !== 'number') return initialProgress();
    return state;
  } catch {
    return initialProgress();
  }
}

export function writeProgress(progress: Progress): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* Play still works if storage is blocked. */ }
}
