import { useEffect, useMemo, useState, type FormEvent, type Dispatch, type SetStateAction } from 'react';
import Connections from './games/Connections';
import ToonRewind from './games/ToonRewind';
import BazingaLab from './games/BazingaLab';
import NineNine from './games/NineNine';
import PinkRush from './games/PinkRush';
import PinkWallet from './games/PinkWallet';
import BraveTrail from './games/BraveTrail';
import ArcadeNavigation from './components/ArcadeNavigation';
import {comingSoonGames,upcomingArcadeEvents} from './data/arcadeHub';
import { readPinkProgress,writePinkProgress,type PinkProgress,type PinkStats } from './lib/pinkRush';
import { readNineProgress, writeNineProgress, type NineProgress, type NineStats } from './lib/nineNine';
import { readBazingaProgress, writeBazingaProgress, type BazingaProgress, type BazingaStats } from './lib/bazinga';
import Passport from './games/Passport';
import DifficultyPicker from './components/DifficultyPicker';
import { bestAward, readPreferredDifficulty, savePreferredDifficulty, type Difficulty } from './lib/passport';
import { readToonProgress, writeToonProgress, type ToonProgress, type ToonStats } from './lib/toon';
import { readConnections, writeConnections, type ConnectionStats } from './lib/connections';
import type { ConnectionProgress } from './lib/connections';
import { dailyRiddle, localDateKey, practiceRiddles, riddles, matchesRiddle, type Riddle } from './data/questions';
import {
  addClue, maxCluesForDifficulty, maxGuessesForDifficulty, scoreRound, newRound,
  readProgress, registerResult, skipRound, submitGuess, writeProgress,
  type Progress, type Round,
} from './lib/game';

type View = 'home' | 'guess' | 'connections' | 'toon' | 'bazinga' | 'nine' | 'pink' | 'wallet' | 'brave' | 'passport' | 'vault';
type Mode = 'daily' | 'practice';

const upcoming = comingSoonGames;

function dateUntilBirthday(now = new Date()): number {
  let next = new Date(now.getFullYear(), 10, 13);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (next < today) next = new Date(now.getFullYear() + 1, 10, 13);
  return Math.round((next.getTime() - today.getTime()) / 86_400_000);
}

function Sparkle({ className = '' }: { className?: string }) {
  return <span className={`sparkle ${className}`} aria-hidden="true">✦</span>;
}

function Logo({ onClick }: { onClick: () => void }) {
  return <button className="brand" onClick={onClick} aria-label="Molly's Cozy Arcade home">
    <span className="brand-mark">✿</span>
    <span><strong>Molly's</strong><small>COZY ARCADE</small></span>
  </button>;
}

function Home({ onNavigate, onChooseGame, progress, connectionStats, toonStats, bazingaStats, nineStats, pinkStats, today }: {
  onNavigate: (view: View, mode?: Mode) => void;
  onChooseGame: (name: string) => void;
  progress: Progress;
  connectionStats: ConnectionStats;
  toonStats: ToonStats;
  bazingaStats: BazingaStats;
  nineStats: NineStats;
  pinkStats: PinkStats;
  today: string;
}) {
  const daily = progress.daily[today];
  const days = dateUntilBirthday();
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> A LITTLE CORNER OF HAPPY</div>
        <h1 id="hero-title">A pocket full of <em>playtime.</em> <span aria-hidden="true">✳</span></h1>
        <p>A cozy collection of puzzles, tiny victories and lovely little distractions. Made especially for Molly. ♡</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('guess', 'daily')}>
            {daily?.status === 'playing' || !daily ? 'Play today’s puzzle' : 'See today’s puzzle'} <span aria-hidden="true">↗</span>
          </button>
          <button className="btn btn-soft" onClick={() => onNavigate('guess', 'practice')}>Explore Guess Who? <span aria-hidden="true">→</span></button>
        </div>
        <div className="hero-foot"><span>✿</span> Little games, big smiles, no rush.</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <Sparkle className="sparkle-top"/><Sparkle className="sparkle-left"/>
        <span className="floating-token token-strawberry">🍓</span>
        <span className="floating-token token-star">⭐</span>
        <div className="arcade-cabinet">
          <div className="machine-top"><span>✧ TODAY'S LITTLE JOY ✧</span></div>
          <div className="machine-screen">
            <span className="screen-stars">✷ &nbsp; ✳ &nbsp; ✷</span>
            <span className="screen-title">GUESS<br/>WHO?</span>
            <span className="screen-smile">☺</span>
            <span className="screen-invite">press play!</span>
          </div>
          <div className="machine-controls"><span className="control-arrow">✣</span><span className="control-buttons"><i/><i/></span></div>
          <div className="machine-bottom">M ♥ C</div>
        </div>
        <div className="tiny-bubble">you got this! ♡</div>
      </div>
    </section>

    <section className="stats-strip" aria-label="Player progress">
      <div><span className="stats-icon">🏆</span><span className="stats-number">{progress.stats.solved + connectionStats.solved + toonStats.solved + bazingaStats.solved + nineStats.solved + pinkStats.roundsSolved}</span><span className="stats-label">puzzles solved</span></div>
      <div><span className="stats-icon">✨</span><span className="stats-number">{progress.stats.points + connectionStats.stars + toonStats.stars + bazingaStats.stars + nineStats.stars + pinkStats.stars}</span><span className="stats-label">stars collected</span></div>
      <div><span className="stats-icon">🔥</span><span className="stats-number">{progress.stats.bestStreak}</span><span className="stats-label">best daily streak</span></div>
      <div><span className="stats-icon">💝</span><span className="stats-number">{days === 0 ? 'Today!' : days}</span><span className="stats-label">{days === 0 ? 'happy birthday!' : 'days to birthday'}</span></div>
    </section>

    <section className="passport-home-invite">
      <div><span>📖</span><div><strong>Molly's Arcade Passport</strong><small>Your stamps, achievements, game records and saved stars.</small></div></div>
      <button className="btn btn-soft" onClick={() => onNavigate('passport')}>Open Passport ↗</button>
    </section>
    <section className="games-section" id="games">
      <div className="section-heading"><div><span className="overline">PICK YOUR ADVENTURE</span><h2>The game shelf <span aria-hidden="true">✦</span></h2></div><span className="section-note">Seven adventures ready to play</span></div>
      <div className="game-grid">
        <article className="game-card featured-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">01 / 07</span></div>
          <div className="featured-art" aria-hidden="true"><span>🥑</span><span>🍓</span><span>🍜</span></div>
          <div className="card-content"><span className="card-category">FOOD & DEDUCTION</span><h3>Guess Who?</h3><p>Four clever clues. One mystery ingredient. How soon can you guess it?</p>
            <button className="card-link" onClick={() => onNavigate('guess', 'practice')}>Let's play <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-mint connection-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">02 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">🧩</div>
          <div className="card-content"><span className="card-category">WORDS & PATTERNS</span><h3>Little Connections</h3><p>Sixteen words, four hidden connections and four chances to find them all.</p>
            <button className="card-link" onClick={() => onNavigate('connections')}>Find the links <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-blue toon-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">03 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">📺</div>
          <div className="card-content"><span className="card-category">CARTOON NETWORK INDIA • 2000s</span><h3>Toon Rewind</h3><p>Turn the dial on a nostalgic TV. Recognise six shows from their picture signals.</p>
            <button className="card-link" onClick={() => onNavigate('toon')}>Switch on the TV <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-yellow bazinga-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">04 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">⚛️</div>
          <div className="card-content"><span className="card-category">LOGIC & SEATING EXPERIMENTS</span><h3>Bazinga! Lab</h3>
            <p>Sheldon’s spot, Raj’s mystery night, comic-shop chaos: solve 18 story puzzles across eight familiar rooms!</p>
            <button className="card-link" onClick={() => onNavigate('bazinga')}>Enter the lab <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-peach nn-game-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">05 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">🕵️</div>
          <div className="card-content"><span className="card-category">DETECTIVE CASE FILES & HALLOWEEN HEISTS</span><h3>The 99 Files</h3>
            <p>Investigate 12 original mysteries, connect evidence, and solve a three-stage Halloween Heist. Nine-Nine!</p>
            <button className="card-link" onClick={() => onNavigate('nine')}>Open case files <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-pink pink-home-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">06 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">🖤🩷🎤</div>
          <div className="card-content"><span className="card-category">BLACKPINK · BLINK MEMORY-LANE CONCERT</span><h3>Pink Rush!</h3>
            <p>Recognize beloved songs, revisit eras, celebrate the four members, and light up Molly’s own encore!</p>
            <button className="card-link" onClick={() => onNavigate('pink')}>Enter the concert <span aria-hidden="true">↗</span></button></div>
        </article>
        <article className="game-card game-card-mint brave-live-card">
          <div className="card-topline"><span className="live-pill"><span/> PLAY NOW</span><span className="card-number">07 / 07</span></div>
          <div className="game-emoji" aria-hidden="true">🏹</div>
          <div className="card-content"><span className="card-category">ILLUSTRATED HIGHLAND ADVENTURE</span><h3>Brave: The Wisps’ Trail</h3>
            <p>Six chapters, eighteen magical challenges, a complete finale—and a secret illustrated storybook reward.</p>
            <button className="card-link" onClick={() => onNavigate('brave')}>Begin your adventure <span aria-hidden="true">↗</span></button></div>
        </article>
      </div>
    </section>

    <section className="future-shelf" id="coming-soon" aria-labelledby="future-shelf-title">
      <div className="section-heading">
        <div><span className="overline">DREAMING UP NEW WORLDS</span><h2 id="future-shelf-title">Still in the workshop <span aria-hidden="true">✧</span></h2></div>
        <span className="section-note">Ideas for later · no release dates announced</span>
      </div>
      <div className="future-grid">
        {upcoming.map(game=><article className={`future-card game-card-${game.theme}`} key={game.name}>
          <div className="future-card-top"><span>CONCEPT · NOT PLAYABLE YET</span><span aria-hidden="true">✧</span></div>
          <div className="future-card-icon" aria-hidden="true">{game.icon}</div>
          <strong>{game.name}</strong><p>{game.teaser}</p>
          <button onClick={()=>onChooseGame(game.name)}>A little sneak peek ↗</button>
        </article>)}
      </div>
    </section>
    <section className="arcade-events-home" aria-labelledby="arcade-events-home-title">
      <div className="section-heading"><div><span className="overline">MARK YOUR CALENDAR</span><h2 id="arcade-events-home-title">Little occasions <span aria-hidden="true">✿</span></h2></div><span className="section-note">Next up, in calendar order</span></div>
      <div className="arcade-event-cards">
        {upcomingArcadeEvents().map(event=><article className="arcade-event-card" key={event.id}>
          <span className="arcade-event-emoji" aria-hidden="true">{event.icon}</span>
          <div><span className="overline">{event.date.toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'})}</span>
          <h3>{event.label}</h3><p>{event.summary}</p></div>
          <button className="btn btn-soft" onClick={()=>onNavigate(event.route)}>{event.status==='playing'?'Explore the game':'See the preview'} ↗</button>
        </article>)}
      </div>
    </section>

    <section className="birthday-banner">
      <div className="birthday-illustration" aria-hidden="true"><span>🎁</span><Sparkle/></div>
      <div className="birthday-copy"><span className="overline">SOMETHING SPECIAL IS COMING</span><h2>There's a little magic in November.</h2><p>Every November 13, a birthday-only adventure will appear here—with mystery gifts you can redeem in real life. We're still building the surprise!</p></div>
      <button className="btn btn-secondary" onClick={() => onNavigate('vault')}>Peek at the vault <span aria-hidden="true">↗</span></button>
    </section>
  </>;
}

function RoundResult({ round, riddle, onNext, nextText }: { round: Round; riddle: Riddle; onNext?: () => void; nextText?: string }) {
  return <div className={`result-panel ${round.status === 'won' ? 'result-win' : 'result-loss'}`} role="status">
    <div className="result-icon">{round.status === 'won' ? '🎉' : '💌'}</div>
    <h3>{round.status === 'won' ? 'You clever little bean!' : 'Mystery revealed!'}</h3>
    <p>It was <strong>{riddle.answer}</strong>. {round.status === 'won' ? `You earned ${round.score} stars!` : 'There’s always another little mystery.'}</p>
    <p className="fact"><strong>Did you know?</strong> {riddle.funFact}</p>
    {onNext && <button className="btn btn-primary" onClick={onNext}>{nextText ?? 'Next puzzle'} <span aria-hidden="true">→</span></button>}
  </div>;
}

function Puzzle({ riddle, round, onGuess, onHint, onSkip, onNext, nextText, mode, roundLabel }: {
  riddle: Riddle;
  round: Round;
  onGuess: (guess: string) => void;
  onHint: () => void;
  onSkip: () => void;
  onNext?: () => void;
  nextText?: string;
  mode: Mode;
  roundLabel: string;
}) {
  const [value, setValue] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => { setValue(''); setNotice(''); }, [riddle.id, mode]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim() || round.status !== 'playing') return;
    onGuess(value);
    setValue('');
    setNotice('');
  }
  const wrong = round.guesses.filter(guess => !matchesRiddle(riddle, guess));
  const allowedClues = maxCluesForDifficulty(round.difficulty);
  const allowedGuesses = maxGuessesForDifficulty(round.difficulty);
  return <section className="puzzle-card">
    <div className="puzzle-meta"><span className="category-label"><span aria-hidden="true">❋</span> {riddle.category === 'food' ? 'Dish detective' : riddle.category === 'fruit' ? 'Fruity mystery' : 'Garden mystery'}</span><span className="round-label">{roundLabel}</span></div>
    <h2>Who am I<span className="question-mark">?</span></h2>
    <p className="puzzle-subtitle">I'm hiding in plain sight. Can you figure me out?</p>
    <div className="clue-list">
      {riddle.clues.map((clue, index) => <div key={index} className={`clue-item ${index < round.cluesShown ? 'clue-revealed' : 'clue-hidden'}`}>
        <span className="clue-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="clue-text">{index < round.cluesShown || round.status !== 'playing' ? clue : 'A little mystery waiting to be uncovered…'}</span>
        <span className="clue-indicator" aria-hidden="true">{index < round.cluesShown || round.status !== 'playing' ? '✦' : '○'}</span>
      </div>)}
    </div>
    {round.status === 'playing' ? <>
      <div className="puzzle-support"><span>{allowedGuesses - round.guesses.length} guesses left</span><span>{scoreRound(round.cluesShown, round.guesses.length, round.difficulty)} stars up for grabs</span></div>
      <form className="guess-form" onSubmit={handleSubmit}>
        <label htmlFor="guess-answer">Your best guess</label>
        <div className="guess-input-row"><input id="guess-answer" autoComplete="off" spellCheck="false" value={value} maxLength={60} onChange={e => setValue(e.target.value)} placeholder="Type a fruit, vegetable or dish…"/><button className="btn btn-primary" disabled={!value.trim()} type="submit">Guess ↗</button></div>
      </form>
      {round.guesses.length > 0 && <div className="guess-history"><span>Not quite yet:</span> {wrong.map((guess, i) => <span className="wrong-guess" key={`${guess}-${i}`}>{guess} <span aria-hidden="true">×</span></span>)}</div>}
      {notice && <p role="status">{notice}</p>}
      <div className="puzzle-actions"><button className="btn btn-outline" onClick={() => { onHint(); if (round.cluesShown >= allowedClues) setNotice('All clues are already showing. You’ve got this!'); }} disabled={round.cluesShown >= allowedClues}>✧ Reveal another clue <span>({allowedClues - round.cluesShown} left)</span></button><button className="text-button" onClick={onSkip}>Reveal answer instead →</button></div>
    </> : <RoundResult round={round} riddle={riddle} onNext={onNext} nextText={nextText}/>}
  </section>;
}

function GuessWho({ progress, setProgress, initialMode, today, onHome }: {
  progress: Progress;
  setProgress: Dispatch<SetStateAction<Progress>>;
  initialMode: Mode;
  today: string;
  onHome: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [difficulty, setDifficulty] = useState<Difficulty>(()=>readPreferredDifficulty('guess'));
  const daily = dailyRiddle(today);
  const dailyRound = progress.daily[today] ?? newRound(difficulty);
  const session = progress.practice;
  const finished = !!session && session.index >= session.ids.length;
  const practiceRiddle = session && !finished ? riddles.find(r => r.id === session.ids[session.index]) : undefined;
  const practiceRound = practiceRiddle ? session?.rounds[practiceRiddle.id] ?? newRound(difficulty) : null;
  const playingRiddle = mode === 'daily' ? daily : practiceRiddle;
  const activeRound = mode === 'daily' ? dailyRound : practiceRound;
  const currentDifficulty = activeRound?.difficulty ?? (mode === 'daily' && !!progress.daily[today] ? 'easy' : difficulty);
  const hasStarted = !!activeRound && (activeRound.guesses.length>0 || activeRound.cluesShown>1 || activeRound.status !== 'playing');
  const sessionStarted = mode === 'practice' && !!session && (session.index > 0 || Object.values(session.rounds).some(r=>r.guesses.length>0 || r.cluesShown>1 || r.status !== 'playing'));
  const difficultyLocked = mode === 'daily' ? hasStarted : !!sessionStarted && !finished;
  const earned = session ? Object.values(session.rounds).reduce((total, r) => total + r.score, 0) : 0;
  const solved = session ? Object.values(session.rounds).filter(r => r.status === 'won').length : 0;

  function newPractice(level: Difficulty = difficulty) {
    const ids = practiceRiddles(5, level).map(r => r.id);
    setProgress(prev => ({ ...prev, practice: { ids, rounds: {}, index: 0, sessionNumber: (prev.practice?.sessionNumber ?? 0) + 1 } }));
  }

  function chooseDifficulty(level: Difficulty) {
    if (difficultyLocked || level === currentDifficulty) return;
    setDifficulty(level);
    savePreferredDifficulty('guess', level);
    if (mode === 'daily') {
      setProgress(prev => ({...prev,daily:{...prev.daily,[today]:newRound(level)}}));
    } else if (session) {
      newPractice(level);
    }
  }

  function updateRound(transform: (round: Round) => Round) {
    setProgress(prev => {
      if (mode === 'daily') {
        const before = prev.daily[today] ?? newRound(difficulty);
        const after = transform(before);
        if (after === before) return prev;
        const justFinished = before.status === 'playing' && after.status !== 'playing';
        if (!justFinished) return {...prev, daily:{...prev.daily,[today]:after}};
        const award = bestAward(prev.bestAwards, daily.id, after.score);
        const stats = registerResult(prev.stats,after,today);
        const earlier = prev.bestAwards?.[daily.id] ?? 0;
        return {...prev,daily:{...prev.daily,[today]:after},bestAwards:award.awards,
          stats:{...stats,points:prev.stats.points+award.delta,solved:prev.stats.solved+(after.status==='won' && earlier===0 ? 1 : 0)}};
      }
      const practice = prev.practice;
      if (!practice || practice.index >= practice.ids.length) return prev;
      const id = practice.ids[practice.index];
      const before = practice.rounds[id] ?? newRound(difficulty);
      const after = transform(before);
      if (after === before) return prev;
      const justFinished = before.status === 'playing' && after.status !== 'playing';
      if(!justFinished) return {...prev,practice:{...practice,rounds:{...practice.rounds,[id]:after}}};
      const award = bestAward(prev.bestAwards,id,after.score);
      const stats = registerResult(prev.stats,after);
      const earlier = prev.bestAwards?.[id] ?? 0;
      return {...prev,practice:{...practice,rounds:{...practice.rounds,[id]:after}},bestAwards:award.awards,
        stats:{...stats,points:prev.stats.points+award.delta,solved:prev.stats.solved+(after.status==='won' && earlier===0 ? 1 : 0)}};
    });
  }

  function nextPractice() {
    setProgress(prev => prev.practice ? { ...prev, practice: { ...prev.practice, index: Math.min(prev.practice.ids.length, prev.practice.index + 1) } } : prev);
  }

  return <main className="game-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="game-head"><div><div className="overline">THE LITTLE PUZZLE CLUB / GAME 01</div><h1><span aria-hidden="true">🍓</span> Guess Who?</h1><p>For curious minds and adventurous taste buds.</p></div><span className="decorative-berry" aria-hidden="true">✿</span></div>
    <div className="mode-tabs" role="tablist" aria-label="Game mode"><button role="tab" aria-selected={mode === 'daily'} className={mode === 'daily' ? 'selected' : ''} onClick={() => setMode('daily')}>☀ Today's riddle</button><button role="tab" aria-selected={mode === 'practice'} className={mode === 'practice' ? 'selected' : ''} onClick={() => setMode('practice')}>✿ Practice picnic</button></div>
    <DifficultyPicker value={currentDifficulty} onChange={chooseDifficulty} disabled={difficultyLocked}
      lockedMessage="This mystery or practice set has started. Finish it, then select a new difficulty for your next session."/>
    {mode === 'daily' ? <div className="mode-intro"><span>🍯</span><p><strong>One mystery every day.</strong> The same puzzle waits for you all day, and your progress is saved automatically. Come back tomorrow for another!</p></div> : <div className="mode-intro"><span>🧺</span><p><strong>Five bites of fun.</strong> Play a little set of five randomly picked riddles. Collect stars and try to beat your score!</p></div>}
    {mode === 'practice' && !session ? <div className="start-panel"><span>🧺</span><h2>Ready for a little picnic?</h2><p>Five mini mysteries from your chosen difficulty. Each set locks its challenge level after the first move.</p><button className="btn btn-primary" onClick={()=>newPractice()}>Start a five-puzzle set ↗</button></div> : null}
    {mode === 'practice' && finished ? <div className="start-panel summary-panel"><span>🌷</span><h2>Picnic complete!</h2><p>You solved {solved} out of 5 little mysteries and collected <strong>{earned} stars</strong>.</p><div className="summary-stars">{session?.ids.map((id, i) => <span key={id} title={`Puzzle ${i + 1}: ${session.rounds[id]?.status === 'won' ? 'solved' : 'missed'}`}>{session.rounds[id]?.status === 'won' ? '⭐' : '☆'}</span>)}</div><button className="btn btn-primary" onClick={()=>newPractice()}>Play a fresh set ↗</button></div> : null}
    {playingRiddle && activeRound && <>
      {mode === 'practice' && session && <div className="progress-pebbles" aria-label={`Puzzle ${session.index + 1} of 5`}>{session.ids.map((_, index) => <span key={index} className={index < session.index ? 'completed' : index === session.index ? 'active' : ''}/>)}</div>}
      <Puzzle key={`${mode}-${playingRiddle.id}`} riddle={playingRiddle} round={activeRound} mode={mode} roundLabel={mode === 'daily' ? 'DAILY CHALLENGE' : `ROUND ${(session?.index ?? 0) + 1} / 5`} onGuess={guess => updateRound(round => submitGuess(round, playingRiddle, guess))} onHint={() => updateRound(addClue)} onSkip={() => updateRound(skipRound)} onNext={mode === 'practice' ? nextPractice : undefined} nextText={mode === 'practice' ? (session && session.index === 4 ? 'See picnic results' : 'Next little mystery') : undefined}/>
    </>}
    <p className="privacy-note">✧ Your puzzle progress lives in this browser. No account, no tracking, just play.</p>
  </main>;
}

function Vault({ onHome }: { onHome: () => void }) {
  const days = dateUntilBirthday();
  return <main className="vault-page"><button className="back-link" onClick={onHome}>← Back to the arcade</button><div className="vault-inner"><div className="vault-gift" aria-hidden="true">🎁<Sparkle/></div><span className="overline">THE BIRTHDAY VAULT</span><h1>A little surprise is on its way...</h1><p>On November 13, a special birthday adventure will join the arcade. Complete its challenges to uncover sweet little real-life gifts and collect them in your coupon wallet.</p><div className="vault-countdown"><strong>{days === 0 ? 'November 13 is here! 🎂' : `${days} days until November 13`}</strong><span>Birthday Quest and coupon wallet are planned for a later milestone. Nothing to redeem just yet.</span></div><button className="btn btn-primary" onClick={onHome}>Back to play ↗</button></div></main>;
}

function App() {
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<Mode>('daily');
  const [progress, setProgress] = useState<Progress>(readProgress);
  const [connectionProgress, setConnectionProgress] = useState<ConnectionProgress>(readConnections);
  const [toonProgress, setToonProgress] = useState<ToonProgress>(readToonProgress);
  const [bazingaProgress, setBazingaProgress] = useState<BazingaProgress>(readBazingaProgress);
  const [nineProgress, setNineProgress] = useState<NineProgress>(readNineProgress);
  const [pinkProgress, setPinkProgress] = useState<PinkProgress>(readPinkProgress);
  const [sneakPeek, setSneakPeek] = useState<string | null>(null);
  const [today, setToday] = useState(localDateKey);
  const selectedGame = useMemo(() => upcoming.find(g => g.name === sneakPeek), [sneakPeek]);

  useEffect(() => { writeProgress(progress); }, [progress]);
  useEffect(() => { writeConnections(connectionProgress); }, [connectionProgress]);
  useEffect(() => { writeToonProgress(toonProgress); }, [toonProgress]);
  useEffect(() => { writeBazingaProgress(bazingaProgress); }, [bazingaProgress]);
  useEffect(() => { writeNineProgress(nineProgress); }, [nineProgress]);
  useEffect(() => { writePinkProgress(pinkProgress); }, [pinkProgress]);
  useEffect(() => {
    const refresh = () => setToday(localDateKey());
    window.addEventListener('focus', refresh);
    window.addEventListener('visibilitychange', refresh);
    return () => { window.removeEventListener('focus', refresh); window.removeEventListener('visibilitychange', refresh); };
  }, []);

  function navigate(next: View, nextMode: Mode = 'daily') {
    setView(next); setMode(nextMode); setSneakPeek(null); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function comingSoonShelf(){
    navigate('home');
    window.setTimeout(()=>document.getElementById('coming-soon')?.scrollIntoView({behavior:'smooth',block:'start'}),70);
  }

  return <div className="site-shell"><header className="site-header"><div className="header-inner">
    <Logo onClick={() => navigate('home')}/>
    <ArcadeNavigation active={view} onNavigate={(route)=>navigate(route)} onPreview={setSneakPeek} onComingSoon={comingSoonShelf}/>
    <button className="header-cta" onClick={() => navigate('guess', 'daily')}>Play now <span aria-hidden="true">↗</span></button>
   </div></header>
    <div className="page-content">{view === 'home' ? <Home today={today} progress={progress} connectionStats={connectionProgress.stats} toonStats={toonProgress.stats} bazingaStats={bazingaProgress.stats} nineStats={nineProgress.stats} pinkStats={pinkProgress.stats} onNavigate={navigate} onChooseGame={setSneakPeek}/> : view === 'guess' ? <GuessWho key={mode} today={today} initialMode={mode} progress={progress} setProgress={setProgress} onHome={() => navigate('home')}/> : view === 'connections' ? <Connections today={today} progress={connectionProgress} setProgress={setConnectionProgress} onHome={() => navigate('home')}/> : view === 'toon' ? <ToonRewind today={today} progress={toonProgress} setProgress={setToonProgress} onHome={() => navigate('home')}/> : view === 'bazinga' ? <BazingaLab today={today} progress={bazingaProgress} setProgress={setBazingaProgress} onHome={() => navigate('home')}/> : view === 'nine' ? <NineNine today={today} progress={nineProgress} setProgress={setNineProgress} onHome={() => navigate('home')}/> : view === 'pink' ? <PinkRush today={today} progress={pinkProgress} setProgress={setPinkProgress} onHome={() => navigate('home')} onWallet={() => navigate('wallet')}/> : view === 'wallet' ? <PinkWallet progress={pinkProgress} setProgress={setPinkProgress} onHome={() => navigate('home')} onPlay={() => navigate('pink')} onPassport={() => navigate('passport')}/> : view === 'brave' ? <BraveTrail onHome={() => navigate('home')}/> : view === 'passport' ? <Passport guess={progress} connections={connectionProgress} toon={toonProgress} bazinga={bazingaProgress} nine={nineProgress} pink={pinkProgress} setGuess={setProgress} setConnections={setConnectionProgress} setToon={setToonProgress} setBazinga={setBazingaProgress} setNine={setNineProgress} setPink={setPinkProgress} onWallet={() => navigate('wallet')} onHome={() => navigate('home')}/> : <Vault onHome={() => navigate('home')}/>}</div>
    <footer className="site-footer"><span>Made with love, curiosity & a little bit of mischief. ♡</span><span>© {new Date().getFullYear()} Molly's Cozy Arcade</span></footer>
    {selectedGame && <div className="modal-scrim" role="presentation" onMouseDown={() => setSneakPeek(null)}><section className="peek-modal" role="dialog" aria-modal="true" aria-labelledby="peek-title" onMouseDown={event => event.stopPropagation()}><button className="modal-close" autoFocus onClick={() => setSneakPeek(null)} aria-label="Close preview">×</button><div className="peek-emoji" aria-hidden="true">{selectedGame.icon}</div><span className="overline">COMING TO THE ARCADE</span><h2 id="peek-title">{selectedGame.name}</h2><p>{selectedGame.detail}</p><p className="peek-fine">Still in the workshop! We'll add this in a future release.</p><button className="btn btn-primary" onClick={() => setSneakPeek(null)}>Sounds lovely ♡</button></section></div>}
  </div>;
}

export default App;
