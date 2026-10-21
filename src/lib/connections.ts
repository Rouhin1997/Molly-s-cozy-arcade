import type { ConnectionPuzzle } from '../data/connections';
import { scoreWithDifficulty, type Difficulty } from './passport';

export const CONNECTION_MISTAKES = 4;
export const CONNECTION_STORAGE_KEY = 'mollys-connections-v1';

export type ConnectionRound = {
  selected: string[];
  solved: number[];
  attempts: string[][];
  mistakes: number;
  status: 'playing' | 'won' | 'lost';
  score: number;
  feedback: string;
  difficulty?: Difficulty;
};

export type ConnectionStats = {
  played: number;
  solved: number;
  stars: number;
  bestScore: number;
};

export type ConnectionPractice = {
  puzzleId: string;
  seed: string;
  round: ConnectionRound;
  recentIds: string[];
};

export type ConnectionProgress = {
  version: 1;
  daily: Record<string, { puzzleId: string; round: ConnectionRound }>;
  practice: ConnectionPractice | null;
  stats: ConnectionStats;
  bestAwards?: Record<string, number>;
};

export function newConnectionRound(difficulty: Difficulty = 'medium'): ConnectionRound {
  return { selected: [], solved: [], attempts: [], mistakes: 0, status: 'playing', score: 0, feedback: '', difficulty };
}

export function connectionMistakeLimit(difficulty: Difficulty = 'medium'): number {
  return difficulty === 'easy' ? 5 : difficulty === 'hard' ? 3 : CONNECTION_MISTAKES;
}

export function initialConnections(): ConnectionProgress {
  return { version: 1, daily: {}, practice: null, stats: { played: 0, solved: 0, stars: 0, bestScore: 0 }, bestAwards: {} };
}

export function toggleConnectionTile(round: ConnectionRound, word: string, puzzle: ConnectionPuzzle): ConnectionRound {
  if (round.status !== 'playing' || !puzzle.groups.some((g, i) => !round.solved.includes(i) && g.words.includes(word))) return round;
  const selected = round.selected.includes(word)
    ? round.selected.filter(w => w !== word)
    : round.selected.length < 4 ? [...round.selected, word] : round.selected;
  return selected === round.selected ? round : { ...round, selected, feedback: '' };
}

export function clearConnectionSelection(round: ConnectionRound): ConnectionRound {
  return round.status === 'playing' ? { ...round, selected: [], feedback: '' } : round;
}

export function submitConnectionSelection(round: ConnectionRound, puzzle: ConnectionPuzzle): ConnectionRound {
  if (round.status !== 'playing' || round.selected.length !== 4) return round;
  const selected = [...round.selected].sort();
  const duplicate = round.attempts.some(previous => previous.length === 4 && previous.every((word, i) => word === selected[i]));
  if (duplicate) return { ...round, selected: [], feedback: 'You already tried that combination — no mistake lost.' };

  const matching = puzzle.groups.findIndex((group, i) => !round.solved.includes(i) && group.words.every(word => selected.includes(word)));
  const attempts = [...round.attempts, selected];
  if (matching >= 0) {
    const solved = [...round.solved, matching];
    const won = solved.length === 4;
    return {
      ...round, selected: [], solved, attempts,
      status: won ? 'won' : 'playing',
      score: won ? scoreWithDifficulty(Math.max(60, 180 - round.mistakes * 30), round.difficulty ?? 'medium') : 0,
      feedback: won ? 'Perfectly connected! All four groups found. ✨' : 'Lovely connection! One more group down. ✨',
    };
  }
  const mistakes = round.mistakes + 1;
  const oneAway = round.difficulty !== 'hard' && puzzle.groups.some((group, i) => !round.solved.includes(i) && group.words.filter(word => selected.includes(word)).length === 3);
  return {
    ...round, selected: [], attempts, mistakes,
    status: mistakes >= connectionMistakeLimit(round.difficulty) ? 'lost' : 'playing',
    feedback: mistakes >= connectionMistakeLimit(round.difficulty)
      ? 'Out of guesses! The groups are revealed below.'
      : oneAway ? 'One away! Three of those words belong together.' : 'Not a group yet. Try another combination.',
  };
}

export function recordConnectionResult(stats: ConnectionStats, round: ConnectionRound): ConnectionStats {
  if (round.status === 'playing') return stats;
  return {
    played: stats.played + 1,
    solved: stats.solved + (round.status === 'won' ? 1 : 0),
    stars: stats.stars + round.score,
    bestScore: Math.max(stats.bestScore, round.score),
  };
}

export function readConnections(): ConnectionProgress {
  try {
    const raw = localStorage.getItem(CONNECTION_STORAGE_KEY);
    if (!raw) return initialConnections();
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1) return initialConnections();
    const saved = data as ConnectionProgress;
    if (!saved.stats || typeof saved.stats.stars !== 'number' || !saved.daily || typeof saved.daily !== 'object') return initialConnections();
    if(saved.bestAwards) return saved;
    const awards: Record<string, number> = {};
    for(const entry of Object.values(saved.daily)) {
      if(entry.round.status==='won') awards[entry.puzzleId] = Math.max(awards[entry.puzzleId] ?? 0, entry.round.score);
    }
    if(saved.practice?.round.status === 'won') {
      const id = saved.practice.puzzleId;
      awards[id] = Math.max(awards[id] ?? 0,saved.practice.round.score);
    }
    return {...saved,bestAwards:awards};
  } catch {
    return initialConnections();
  }
}

export function writeConnections(state: ConnectionProgress): void {
  try { localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(state)); }
  catch { /* Puzzles remain playable when browser storage is unavailable. */ }
}
