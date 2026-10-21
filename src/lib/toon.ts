import { generateToonLineup, type ToonPack, type ToonShow, TOON_ROUNDS } from '../data/toon';
import { scoreWithDifficulty, type Difficulty } from './passport';

export const TOON_STORAGE_KEY = 'mollys-toon-rewind-v1';
export const MAX_TUNES = 3;
export const MAX_WRONG_CHANNELS = 2;

export type ToonRound = {
  tuneLevel: number;
  attempts: string[];
  status: 'playing' | 'won' | 'lost';
  score: number;
  difficulty?: Difficulty;
};
export type ToonSession = {
  seed: string;
  pack: ToonPack;
  ids: string[];
  index: number;
  rounds: Record<string, ToonRound>;
  difficulty?: Difficulty;
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
  bestAwards?: Record<string, number>;
};

export function freshToonRound(difficulty: Difficulty = 'easy'): ToonRound {
  return { tuneLevel: 1, attempts: [], status: 'playing', score: 0, difficulty };
}
export function toonWrongLimit(difficulty: Difficulty = 'easy'): number {
  return difficulty === 'hard' ? 1 : MAX_WRONG_CHANNELS;
}

export function newToonSession(seed: string, pack: ToonPack = 'all', difficulty: Difficulty = 'easy'): ToonSession {
  return { seed, pack, ids: generateToonLineup(seed, pack, TOON_ROUNDS), index: 0, rounds: {}, difficulty };
}
export function currentToonRound(session: ToonSession): ToonRound {
  const showId = session.ids[session.index];
  return showId ? session.rounds[showId] ?? freshToonRound(session.difficulty) : freshToonRound(session.difficulty);
}

export function tuneToonSignal(round: ToonRound): ToonRound {
  if (round.status !== 'playing' || round.tuneLevel >= MAX_TUNES) return round;
  return { ...round, tuneLevel: round.tuneLevel + 1 };
}

export function normalizedToonAnswer(value: string): string {
  return value.toLocaleLowerCase('en').normalize('NFKD').replace(/[^a-z0-9]+/g, '');
}
export function guessToonShow(round: ToonRound, show: ToonShow, guessedId: string): ToonRound {
  if (round.status !== 'playing' || !guessedId || round.attempts.includes(guessedId)) return round;
  const aliases: Record<string, string[]> = {
    scooby: ['scooby doo', 'scooby doo where are you'],
    dexter: ['dexters lab', 'dexters laboratory'],
    dbz: ['dragon ball z','dbz'],
    'ben10-af': ['ben 10 alien force'],
    powerpuff: ['powerpuff girls','the powerpuff girls'],
    'ed-edd-eddy': ['ed edd and eddy'],
    'billy-mandy': ['billy and mandy'],
    knd: ['kids next door','codename kids next door'],
  };
  const correct = guessedId === show.id || [show.title, ...(aliases[show.id] ?? [])]
    .some(title => normalizedToonAnswer(title) === normalizedToonAnswer(guessedId));
  const attempts = [...round.attempts, guessedId];
  if (correct) {
    return { ...round, attempts, status: 'won',
      score: scoreWithDifficulty(Math.max(30, 120 - (round.tuneLevel - 1) * 25 - (attempts.length - 1) * 20), round.difficulty ?? 'easy') };
  }
  if (attempts.length >= toonWrongLimit(round.difficulty))
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
    bestAwards: {},
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
    if(saved.bestAwards) return saved;
    const awards: Record<string,number> = {};
    const sessions = [...Object.values(saved.daily), ...(saved.practice ? [saved.practice] : [])];
    for(const session of sessions) {
      for(const [id,round] of Object.entries(session.rounds)) {
        if(round.status==='won') awards[id] = Math.max(awards[id] ?? 0,round.score);
      }
    }
    return {...saved,bestAwards:awards};
  } catch { return initialToonProgress(); }
}
export function writeToonProgress(value: ToonProgress): void {
  try { localStorage.setItem(TOON_STORAGE_KEY, JSON.stringify(value)); }
  catch { /* Private browsing/storage disabled: still let the user play. */ }
}
