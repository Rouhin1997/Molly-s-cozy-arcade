import { generateToonLineup, type ToonPack, type ToonShow, TOON_ROUNDS } from '../data/toon';

export const TOON_STORAGE_KEY = 'mollys-toon-rewind-v1';
export const MAX_TUNES = 3;
export const MAX_WRONG_CHANNELS = 2;

export type ToonRound = {
  tuneLevel: number;
  attempts: string[];
  status: 'playing' | 'won' | 'lost';
  score: number;
};
export type ToonSession = {
  seed: string;
  pack: ToonPack;
  ids: string[];
  index: number;
  rounds: Record<string, ToonRound>;
};
export type ToonStats = {
  played: number;
  solved: number;
  stars: number;
  perfectSignals: number;
  bestSignal: number;
};
export type ToonProgress = {
  version: 1;
  daily: Record<string, ToonSession>;
  practice: ToonSession | null;
  stats: ToonStats;
};

export function freshToonRound(): ToonRound {
  return { tuneLevel: 1, attempts: [], status: 'playing', score: 0 };
}

export function newToonSession(seed: string, pack: ToonPack = 'all'): ToonSession {
  return { seed, pack, ids: generateToonLineup(seed, pack, TOON_ROUNDS), index: 0, rounds: {} };
}
export function currentToonRound(session: ToonSession): ToonRound {
  const showId = session.ids[session.index];
  return showId ? session.rounds[showId] ?? freshToonRound() : freshToonRound();
}

export function tuneToonSignal(round: ToonRound): ToonRound {
  if (round.status !== 'playing' || round.tuneLevel >= MAX_TUNES) return round;
  return { ...round, tuneLevel: round.tuneLevel + 1 };
}

export function guessToonShow(round: ToonRound, show: ToonShow, guessedId: string): ToonRound {
  if (round.status !== 'playing' || !guessedId || round.attempts.includes(guessedId)) return round;
  const attempts = [...round.attempts, guessedId];
  if (guessedId === show.id) {
    return { ...round, attempts, status: 'won',
      score: Math.max(30, 120 - (round.tuneLevel - 1) * 25 - (attempts.length - 1) * 20) };
  }
  if (attempts.length >= MAX_WRONG_CHANNELS)
    return { ...round, attempts, status: 'lost', score: 0 };
  return { ...round, attempts };
}

export function registerToonScore(stats: ToonStats, result: ToonRound): ToonStats {
  if (result.status === 'playing') return stats;
  return {
    ...stats, played: stats.played + 1,
    solved: stats.solved + (result.status === 'won' ? 1 : 0),
    stars: stats.stars + result.score,
    perfectSignals: stats.perfectSignals + (result.status === 'won' && result.score === 120 ? 1 : 0),
    bestSignal: Math.max(stats.bestSignal, result.score),
  };
}

export function advanceToonSession(session: ToonSession): ToonSession {
  const showId = session.ids[session.index];
  if (!showId || (session.rounds[showId]?.status ?? 'playing') === 'playing') return session;
  return { ...session, index: Math.min(session.ids.length, session.index + 1) };
}

export function initialToonProgress(): ToonProgress {
  return {
    version: 1, daily: {}, practice: null,
    stats: { played: 0, solved: 0, stars: 0, perfectSignals: 0, bestSignal: 0 },
  };
}

export function readToonProgress(): ToonProgress {
  try {
    const raw = localStorage.getItem(TOON_STORAGE_KEY);
    if (!raw) return initialToonProgress();
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1) return initialToonProgress();
    const saved = data as ToonProgress;
    if (!saved.stats || typeof saved.stats.stars !== 'number' || !saved.daily || typeof saved.daily !== 'object') return initialToonProgress();
    return saved;
  } catch { return initialToonProgress(); }
}
export function writeToonProgress(value: ToonProgress): void {
  try { localStorage.setItem(TOON_STORAGE_KEY, JSON.stringify(value)); }
  catch { /* Private browsing/storage disabled: still let the user play. */ }
}
