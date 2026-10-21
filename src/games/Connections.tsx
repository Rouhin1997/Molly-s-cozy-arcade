import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import {
  CONNECTION_COLOURS, connectionPuzzles, dailyConnectionPuzzle,
  pickPracticeConnection, shuffledConnectionWords, type ConnectionPuzzle,
} from '../data/connections';
import {
  connectionMistakeLimit, clearConnectionSelection, newConnectionRound, recordConnectionResult,
  submitConnectionSelection, toggleConnectionTile, type ConnectionProgress, type ConnectionRound,
} from '../lib/connections';
import { bestAward, readPreferredDifficulty, savePreferredDifficulty, type Difficulty } from '../lib/passport';
import DifficultyPicker from '../components/DifficultyPicker';

type Mode = 'daily' | 'practice';

type Props = {
  today: string;
  progress: ConnectionProgress;
  setProgress: Dispatch<SetStateAction<ConnectionProgress>>;
  onHome: () => void;
};

function GroupRow({ puzzle, index, revealed = false }: { puzzle: ConnectionPuzzle; index: number; revealed?: boolean }) {
  const group = puzzle.groups[index];
  return (
    <section className={`connections-group connections-${CONNECTION_COLOURS[index]}`} aria-label={`${group.label}: ${group.words.join(', ')}`}>
      <strong>{group.label}</strong>
      <span>{group.words.join(' · ')}</span>
      {revealed && <small>{group.note}</small>}
    </section>
  );
}

export default function Connections({ today, progress, setProgress, onHome }: Props) {
  const [mode, setMode] = useState<Mode>('daily');
  const [shuffleCount, setShuffleCount] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(()=>readPreferredDifficulty('connections'));
  const dailySaved = progress.daily[today];
  const dailyPuzzle = connectionPuzzles.find(p => p.id === dailySaved?.puzzleId) ?? dailyConnectionPuzzle(today);
  const practice = progress.practice;
  const practicePuzzle = connectionPuzzles.find(p => p.id === practice?.puzzleId);
  const puzzle = mode === 'daily' ? dailyPuzzle : practicePuzzle;
  const round = mode === 'daily' ? (dailySaved?.round ?? newConnectionRound(difficulty)) : practice?.round;
  const boardSeed = mode === 'daily' ? `daily-${today}` : practice?.seed ?? 'practice';
  const tiles = useMemo(() => puzzle ? shuffledConnectionWords(puzzle, `${boardSeed}-${shuffleCount}`) : [],
    [puzzle, boardSeed, shuffleCount]);
  const effectiveDifficulty = round?.difficulty ?? difficulty;
  const limit = connectionMistakeLimit(effectiveDifficulty);
  const left = round ? limit - round.mistakes : limit;
  const difficultyLocked = !!round && (round.attempts.length>0 || round.solved.length>0 || round.selected.length>0 || round.status !== 'playing');

  function updateRound(transform: (r: ConnectionRound, p: ConnectionPuzzle) => ConnectionRound) {
    setProgress(prev => {
      if (mode === 'daily') {
        const stored = prev.daily[today];
        const currentPuzzle = connectionPuzzles.find(p => p.id === stored?.puzzleId) ?? dailyConnectionPuzzle(today);
        const before = stored?.round ?? newConnectionRound(difficulty);
        const after = transform(before, currentPuzzle);
        if (after === before) return prev;
        const completed = before.status === 'playing' && after.status !== 'playing';
        return {
          ...prev,
          daily: { ...prev.daily, [today]: { puzzleId: currentPuzzle.id, round: after } },
          ...(!completed ? {stats:prev.stats} : (() => {
            const award = bestAward(prev.bestAwards, currentPuzzle.id, after.score);
            const stats = recordConnectionResult(prev.stats, after);
            const previousBest = prev.bestAwards?.[currentPuzzle.id] ?? 0;
            return { bestAwards: award.awards, stats: { ...stats,
              stars: prev.stats.stars + award.delta,
              solved: prev.stats.solved + (after.status === 'won' && previousBest === 0 ? 1 : 0),
            } };
          })()),
        };
      }
      const existing = prev.practice;
      const currentPuzzle = connectionPuzzles.find(p => p.id === existing?.puzzleId);
      if (!existing || !currentPuzzle) return prev;
      const after = transform(existing.round, currentPuzzle);
      if (after === existing.round) return prev;
      const completed = existing.round.status === 'playing' && after.status !== 'playing';
      return {
        ...prev,
        practice: { ...existing, round: after },
        ...(!completed ? {stats:prev.stats} : (() => {
          const award = bestAward(prev.bestAwards, currentPuzzle.id, after.score);
          const stats = recordConnectionResult(prev.stats, after);
          const previousBest = prev.bestAwards?.[currentPuzzle.id] ?? 0;
          return { bestAwards: award.awards, stats: { ...stats,
            stars: prev.stats.stars + award.delta,
            solved: prev.stats.solved + (after.status === 'won' && previousBest === 0 ? 1 : 0),
          } };
        })()),
      };
    });
  }

  function newPractice(level: Difficulty = difficulty) {
    setProgress(prev => {
      const recent = prev.practice?.recentIds ?? [];
      const next = pickPracticeConnection(recent.slice(-5), Math.random, level);
      return {
        ...prev,
        practice: {
          puzzleId: next.id, seed: `${Date.now()}-${Math.random()}`,
          round: newConnectionRound(level),
          recentIds: [...recent, next.id].slice(-5),
        },
      };
    });
    setShuffleCount(0);
    setMode('practice');
  }

  function chooseDifficulty(level: Difficulty) {
    if (difficultyLocked && round?.status==='playing') return;
    setDifficulty(level);
    savePreferredDifficulty('connections',level);
    if (mode==='daily' && !difficultyLocked) {
      setProgress(prev=>({...prev,daily:{...prev.daily,[today]:{puzzleId: dailyPuzzle.id,round:newConnectionRound(level)}}}));
    }
    if (mode==='practice' && round?.status!=='playing') newPractice(level);
  }

  const solvedIndices = round?.solved ?? [];
  const unsolvedTiles = puzzle && round ? tiles.filter(word => !solvedIndices.some(i => puzzle.groups[i].words.includes(word))) : [];

  return <main className="game-page connections-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="game-head">
      <div>
        <div className="overline">THE LITTLE PUZZLE CLUB / GAME 02</div>
        <h1><span aria-hidden="true">🧩</span> Little Connections</h1>
        <p>Sixteen words. Four secret themes. Connect the dots!</p>
      </div>
      <span className="decorative-berry" aria-hidden="true">✳</span>
    </div>

    <div className="mode-tabs" role="group" aria-label="Connections game mode">
      <button className={mode === 'daily' ? 'selected' : ''} aria-pressed={mode === 'daily'} onClick={() => { setMode('daily'); setShuffleCount(0); }}>☀ Daily board</button>
      <button className={mode === 'practice' ? 'selected' : ''} aria-pressed={mode === 'practice'} onClick={() => { setMode('practice'); setShuffleCount(0); }}>✿ Practice boards</button>
    </div>
    <DifficultyPicker value={effectiveDifficulty} onChange={chooseDifficulty} disabled={difficultyLocked && round?.status==='playing'}
      lockedMessage="The puzzle has begun. Finish this board to choose a new difficulty." />
    <div className="mode-intro"><span>🧠</span><p><strong>Find four words that belong together.</strong> Cozy has five mistakes and approachable categories, Clever gives four, and Expert allows only three mistakes with trickier groups and no “one away” hint. Higher difficulty earns more stars!</p></div>

    {mode === 'practice' && !practicePuzzle ? <section className="start-panel">
      <span>🧩</span><h2>Ready to make connections?</h2>
      <p>Sixteen themed puzzle boards, ranging from food to cartoons and sneaky wordplay. Every practice attempt picks a fresh board.</p>
      <button className="btn btn-primary" onClick={()=>newPractice()}>Start a practice board ↗</button>
    </section> : null}

    {puzzle && round && <section className="connections-board" aria-label="Little Connections puzzle board">
      <div className="connections-board-head">
        <div><span className="overline">{mode === 'daily' ? 'TODAY’S LITTLE CONNECTIONS' : 'PRACTICE PUZZLE'}</span>
          <h2>{puzzle.title}</h2></div>
        <div className="connections-score">✦ <strong>{round.status === 'won' ? round.score : mode === 'daily' ? 'Daily' : 'Play'}</strong><span>{round.status === 'won' ? 'stars earned' : 'puzzle'}</span></div>
      </div>

      <div className="connections-groups" aria-live="polite">
        {puzzle.groups.map((_, i) => solvedIndices.includes(i) ?
          <GroupRow key={i} puzzle={puzzle} index={i} /> : null)}
      </div>
      {round.status === 'playing' && <div className="connections-tiles" aria-label="Select four words">
        {unsolvedTiles.map(word => <button key={word} className={`connections-tile${round.selected.includes(word) ? ' selected' : ''}`}
          aria-pressed={round.selected.includes(word)}
          onClick={() => updateRound(r => toggleConnectionTile(r, word, puzzle))}>{word}</button>)}
      </div>}

      {round.status === 'playing' ? <>
        <div className="connections-controls">
          <div className="connections-mistakes" aria-label={`${left} of ${limit} mistakes remaining`}>
            <span>Mistakes remaining</span>
            <div aria-hidden="true">{Array.from({length: limit}, (_, i) => <i key={i} className={i < left ? 'left' : ''}/>)}</div>
          </div>
          <span className="connections-selection-count">{round.selected.length} / 4 selected</span>
        </div>
        <p className="connections-feedback" role="status" aria-live="polite">{round.feedback || 'Tap four tiles that share a hidden connection.'}</p>
        <div className="connections-actions">
          <button className="btn btn-outline" onClick={() => setShuffleCount(c => c + 1)}>⤨ Shuffle</button>
          <button className="btn btn-outline" disabled={round.selected.length === 0} onClick={() => updateRound(r => clearConnectionSelection(r))}>Deselect all</button>
          <button className="btn btn-primary" disabled={round.selected.length !== 4} onClick={() => updateRound((r, p) => submitConnectionSelection(r, p))}>Submit four ↗</button>
        </div>
      </> : <div className={`connections-finale ${round.status === 'won' ? 'connections-won' : 'connections-lost'}`} role="status">
        <div className="connections-finale-icon">{round.status === 'won' ? '🎉' : '💌'}</div>
        <h3>{round.status === 'won' ? 'Beautifully connected!' : 'A little mystery revealed!'}</h3>
        <p>{round.status === 'won'
          ? `You found all four groups and earned ${round.score} stars! ${round.mistakes ? `Only ${round.mistakes} little stumble(s).` : 'A perfect board!'}`
          : 'Four tricky guesses — no worries! Here are the connections.'}</p>
        {round.status === 'lost' && <div className="connections-reveal">
          {puzzle.groups.map((_, i) => solvedIndices.includes(i) ? null : <GroupRow key={i} puzzle={puzzle} index={i} revealed />)}
        </div>}
        <p className="connections-finale-note">✧ These connections are yours to remember.</p>
        <div className="connections-finale-actions">
          <button className="btn btn-primary" onClick={()=>newPractice()}>Play another board ↗</button>
          {mode === 'practice' && <button className="btn btn-outline" onClick={() => { setMode('daily'); setShuffleCount(0); }}>Today's puzzle</button>}
        </div>
      </div>}
    </section>}
    <section className="connections-help" aria-label="Connections scoring">
      <span>✿</span>
      <p><strong>How scoring works:</strong> Solve all four groups to earn stars multiplied by difficulty (Cozy 1×, Clever 1.5×, Expert 2×), minus the mistake penalty. Identical wrong guesses don't cost extra. Daily boards are saved until tomorrow; practice boards can be replayed with a fresh set.</p>
    </section>
    <p className="privacy-note">✧ Your Connections results are saved in this browser, alongside your other arcade progress.</p>
  </main>;
}
