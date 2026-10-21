import { useMemo, useState, type CSSProperties, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import {
  optionsForShow, toonShows, toonMysteryClues, type ToonShow, type ToonPack,
} from '../data/toon';
import {
  advanceToonSession, currentToonRound, guessToonShow,
  newToonSession, registerToonScore, tuneToonSignal, MAX_TUNES,
  toonWrongLimit, type ToonProgress, type ToonRound, type ToonSession,
} from '../lib/toon';
import { bestAward, readPreferredDifficulty, savePreferredDifficulty, type Difficulty } from '../lib/passport';
import DifficultyPicker from '../components/DifficultyPicker';

type Props = {
  today: string;
  progress: ToonProgress;
  setProgress: Dispatch<SetStateAction<ToonProgress>>;
  onHome: () => void;
};

function ToonPoster({ show }: { show: ToonShow }) {
  return <div className="toon-poster" style={{'--toon-colour-a':show.palette[0],'--toon-colour-b':show.palette[1]} as CSSProperties}>
    <span className="toon-poster-spark" aria-hidden="true">✳</span>
    <div className="toon-poster-art" aria-hidden="true">
      <span>{show.signal[0]}</span><span>{show.signal[1]}</span><span>{show.signal[2]}</span>
    </div>
    <strong>{show.title}</strong><small>THE MYSTERY CHANNEL ✦</small>
  </div>;
}

function Television({ show, round, number }: { show: ToonShow; round: ToonRound; number: number }) {
  const revealed = round.status !== 'playing';
  const visible = revealed ? MAX_TUNES : round.tuneLevel;
  return <div className="toon-television" aria-label="Retro television revealing cartoon motifs">
    <div className="toon-bezel">
      <div className="toon-glass" style={{ '--toon-colour-a': show.palette[0], '--toon-colour-b': show.palette[1] } as CSSProperties}>
        <div className="toon-scanlines" aria-hidden="true"/>
        <div className="toon-screen-header"><span><i/> ON AIR</span><span>CN INDIA • 2000s</span></div>
        {revealed ? <div className={`toon-finale-screen ${round.status === 'lost' ? 'toon-screen-static' : 'toon-screen-won'}`}>
          {round.status === 'lost' && <div className="toon-no-signal" aria-hidden="true">NO SIGNAL <span>📡</span></div>}
          <ToonPoster show={show}/>
        </div> : round.difficulty === 'hard' ? <div className="toon-hard-screen">
          <span>CLASSIFIED BROADCAST • DECODE THE STORY</span>
          {(toonMysteryClues[show.id] ?? show.descriptions).map((clue,i) => <div key={i} className={i < visible ? 'toon-hard-clue is-visible' : 'toon-hard-clue'}>
            <strong>{i < visible ? `SIGNAL ${i+1}` : '???'}</strong><p>{i < visible ? clue : 'Transmission encrypted...'}</p></div>)}
        </div> : <div className={`toon-screen-picture ${round.difficulty === 'medium' ? 'toon-medium-picture' : ''}`}>
          {show.signal.map((symbol, i) => <div key={i} className={`toon-clue ${i < visible ? 'toon-clue-ready' : 'toon-clue-static'}`}>
            <span className="toon-clue-symbol" aria-hidden="true">{i < visible && round.difficulty !== 'medium' ? symbol : '▨'}</span>
            <span className="toon-clue-text">{i < visible ? (round.difficulty === 'medium' ? (toonMysteryClues[show.id] ?? show.descriptions)[i] : show.descriptions[i]) : 'SIGNAL LOST'}</span>
          </div>)}
        </div>}
        <div className="toon-screen-footer"><span>CH {String(number).padStart(2,'0')}</span><span>{revealed ? 'SIGNAL IDENTIFIED' : `RECEPTION ${round.tuneLevel} / 3`}</span></div>
      </div>
    </div>
    <div className="toon-tv-base">
      <div className="toon-tv-speaker" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <span className="toon-tv-brand">NOSTALGIA-VISION ✦</span>
      <div className="toon-tv-indicators" aria-hidden="true"><i/><i/></div>
    </div>
  </div>;
}

export default function ToonRewind({ today, progress, setProgress, onHome }: Props) {
  const [mode, setMode] = useState<'daily' | 'practice'>('daily');
  const [chosenPack, setChosenPack] = useState<ToonPack>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>(()=>readPreferredDifficulty('toon'));
  const [typedAnswer, setTypedAnswer] = useState('');
  const dailySession = progress.daily[today] ?? newToonSession(`toon-daily-${today}`, 'all', difficulty);
  const session: ToonSession | null = mode === 'daily' ? dailySession : progress.practice;
  const finished = !!session && session.index >= session.ids.length;
  const activeShow = session && !finished ? toonShows.find(s => s.id === session.ids[session.index]) : undefined;
  const round = session && activeShow ? currentToonRound(session) : undefined;
  const effectiveDifficulty = session?.difficulty ?? (mode === 'daily' && progress.daily[today] ? 'easy' : difficulty);
  const choices = useMemo(() => activeShow && session ? optionsForShow(activeShow.id, session.seed, effectiveDifficulty === 'medium' ? 6 : 4) : [],
    [activeShow, session?.seed, effectiveDifficulty]); 
  const difficultyLocked = !!session && (session.index > 0 || Object.values(session.rounds).some(r=>r.tuneLevel>1 || r.attempts.length>0 || r.status !== 'playing'));
  const sessionStars = session ? Object.values(session.rounds).reduce((n, r) => n + r.score, 0) : 0;
  const identified = session ? Object.values(session.rounds).filter(r => r.status === 'won').length : 0;

  function updateRound(transform: (round: ToonRound, show: ToonShow) => ToonRound) {
    setProgress(prev => {
      if (mode === 'daily') {
        const current = prev.daily[today] ?? newToonSession(`toon-daily-${today}`, 'all', difficulty);
        const show = toonShows.find(s => s.id === current.ids[current.index]);
        if (!show) return prev;
        const before = currentToonRound(current);
        const after = transform(before, show);
        if (before === after) return prev;
        const ended = before.status === 'playing' && after.status !== 'playing';
        return { ...prev, daily: { ...prev.daily, [today]: { ...current, rounds: { ...current.rounds, [show.id]: after } } },
          ...(!ended ? { stats: prev.stats } : (() => {
            const award = bestAward(prev.bestAwards, show.id, after.score);
            const score = registerToonScore(prev.stats, after);
            const prior = prev.bestAwards?.[show.id] ?? 0;
            return { bestAwards: award.awards, stats: {
              ...score, stars: prev.stats.stars + award.delta,
              solved: prev.stats.solved + (after.status==='won' && prior===0 ? 1 : 0),
              perfectSignals: prev.stats.perfectSignals + (after.status==='won' && after.tuneLevel===1 && after.attempts.length===1 && prior===0 ? 1 : 0)
            } };
          })()) };
      }
      const current = prev.practice;
      if (!current) return prev;
      const show = toonShows.find(s => s.id === current.ids[current.index]);
      if (!show) return prev;
      const before = currentToonRound(current);
      const after = transform(before, show);
      if (before === after) return prev;
      const ended = before.status === 'playing' && after.status !== 'playing';
      return { ...prev, practice: { ...current, rounds: { ...current.rounds, [show.id]: after } },
        ...(!ended ? { stats: prev.stats } : (() => {
          const award = bestAward(prev.bestAwards, show.id, after.score);
          const score = registerToonScore(prev.stats, after);
          const prior = prev.bestAwards?.[show.id] ?? 0;
          return { bestAwards: award.awards, stats: {
            ...score, stars: prev.stats.stars + award.delta,
            solved: prev.stats.solved + (after.status==='won' && prior===0 ? 1 : 0),
            perfectSignals: prev.stats.perfectSignals + (after.status==='won' && after.tuneLevel===1 && after.attempts.length===1 && prior===0 ? 1 : 0)
          } };
        })()) };
    });
  }

  function nextChannel() {
    setTypedAnswer('');
    setProgress(prev => mode === 'daily'
      ? { ...prev, daily: { ...prev.daily, [today]: advanceToonSession(prev.daily[today] ?? newToonSession(`toon-daily-${today}`)) } }
      : prev.practice ? { ...prev, practice: advanceToonSession(prev.practice) } : prev);
  }
  function startPractice(pack: ToonPack, level: Difficulty = difficulty) {
    setChosenPack(pack);
    setTypedAnswer('');
    setProgress(prev => ({ ...prev,
      practice: newToonSession(`toon-practice-${Date.now()}-${Math.random()}`, pack, level) }));
    setMode('practice');
  }

  function chooseDifficulty(next: Difficulty) {
    if (difficultyLocked || next === effectiveDifficulty) return;
    setDifficulty(next);
    savePreferredDifficulty('toon', next);
    setTypedAnswer('');
    if (mode === 'daily') {
      setProgress(prev => ({...prev,daily:{...prev.daily,[today]:newToonSession(`toon-daily-${today}`,'all',next)}}));
    } else if (session && !finished) {
      // Retune the entire six-channel session before any channel is attempted.
      startPractice(session.pack, next);
    }
  }
  function submitTyped(event: FormEvent) {
    event.preventDefault();
    if (!typedAnswer.trim()) return;
    const answer = typedAnswer.trim();
    updateRound((r, show) => guessToonShow(r, show, answer));
    setTypedAnswer('');
  }

  return <main className="game-page toon-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="game-head">
      <div><div className="overline">THE LITTLE PUZZLE CLUB / GAME 03</div>
        <h1><span aria-hidden="true">📺</span> Toon Rewind</h1>
        <p>Your favourite childhood channel is back. Can you recognise what's on TV?</p></div>
      <span className="decorative-berry" aria-hidden="true">✳</span>
    </div>
    <div className="mode-tabs" role="group" aria-label="Toon Rewind mode">
      <button aria-pressed={mode === 'daily'} className={mode === 'daily' ? 'selected' : ''} onClick={() => setMode('daily')}>☀ Daily broadcast</button>
      <button aria-pressed={mode === 'practice'} className={mode === 'practice' ? 'selected' : ''} onClick={() => setMode('practice')}>✿ Free channel surfing</button>
    </div>
    <DifficultyPicker value={effectiveDifficulty} onChange={chooseDifficulty} disabled={difficultyLocked}
      lockedMessage="This broadcast has started or finished. Pick a new difficulty before your next six-channel session."/>
    <div className="mode-intro"><span>📡</span><p><strong>Six mystery transmissions.</strong> Cozy shows familiar symbols and four choices; Clever uses subtler clues and six choices; Expert hides the picture and asks you to type the title. Tune for more hints, but fewer clues earn more stars.</p></div>

    {mode === 'practice' && !session && <div className="toon-intro">
      <span className="toon-big-antenna" aria-hidden="true">📺</span>
      <h2>Ready to rewind?</h2>
      <p>Pick a nostalgic broadcast era, then try to identify six mystery channels.</p>
      <div className="toon-era-choices" role="group" aria-label="Select nostalgic era">
        {([['all','All my childhood'], ['classics','Early 2000s'], ['later','2005–2010']] as const).map(([p,label]) =>
          <button key={p} aria-pressed={chosenPack === p} className={chosenPack === p ? 'is-active' : ''} onClick={() => setChosenPack(p)}>{label}</button>)}
      </div>
      <button className="btn btn-primary" onClick={() => startPractice(chosenPack)}>Switch on the TV ↗</button>
    </div>}

    {session && finished && <div className="toon-summary" role="status">
      <div className="toon-summary-icon">📼✨</div>
      <span className="overline">THAT'S ALL FOR TODAY'S BROADCAST</span>
      <h2>The credits are rolling!</h2>
      <p>You recognised <strong>{identified} of 6</strong> channels and earned <strong>{sessionStars} stars</strong>.</p>
      <div className="toon-summary-reel">
        {session.ids.map((id, i) => <span key={id} className={session.rounds[id]?.status === 'won' ? 'cleared' : 'missed'} title={toonShows.find(s => s.id === id)?.title}>{session.rounds[id]?.status === 'won' ? '✦' : '×'}<small>CH {i+1}</small></span>)}
      </div>
      <div className="toon-summary-actions">
        <button className="btn btn-primary" onClick={() => startPractice('all')}>Surf more channels ↗</button>
        {mode === 'practice' && <button className="btn btn-outline" onClick={() => setMode('daily')}>See the daily broadcast</button>}
      </div>
    </div>}

    {session && activeShow && round && <section className="toon-station" aria-label="Channel surf game">
      <div className="toon-station-head">
        <div><span className="overline">{mode === 'daily' ? 'TODAY’S BROADCAST' : session.pack === 'classics' ? 'EARLY 2000s CHANNEL' : session.pack === 'later' ? '2005–2010 CHANNEL' : 'CHANNEL SURFING'}</span>
          <h2>What's on the telly?</h2></div>
        <div className="toon-progress-label">CHANNEL {session.index + 1} <span>/ {session.ids.length}</span></div>
      </div>
      <div className="toon-channel-progress" aria-label={`Channel ${session.index+1} of ${session.ids.length}`}>
        {session.ids.map((id,i) => <span key={id} className={i < session.index ? 'finished' : i === session.index ? 'current' : ''}/>)}
      </div>
      <div className="toon-game-layout">
        <Television show={activeShow} round={round} number={session.index + 1}/>
        <div className="toon-remote-panel">
          <div className="toon-remote-top"><span>📡</span><strong>THE REMOTE</strong><small>CH {String(session.index+1).padStart(2,'0')}</small></div>
          {round.status === 'playing' ? <>
            <div className="toon-tune-meter" aria-label={`Signal ${round.tuneLevel} of 3`}>
              <span>Signal strength</span><div>{Array.from({length:3}, (_, i)=><i key={i} className={i < round.tuneLevel ? 'active' : ''}/>)}</div>
            </div>
            <button className="toon-tune-button" disabled={round.tuneLevel >= MAX_TUNES} onClick={() => updateRound(tuneToonSignal)}>
              <span aria-hidden="true">✦</span>{round.tuneLevel === MAX_TUNES ? 'FULL SIGNAL' : 'TUNE +'}<small>{round.tuneLevel === MAX_TUNES ? 'All clues revealed' : 'Reveal another clue'}</small>
            </button>
            <p className="toon-remote-instruction">Recognise the show? Choose it below. The earlier you answer, the more stars you earn.</p>
            <div className="toon-chances"><span>Wrong guesses remaining</span><strong>{toonWrongLimit(round.difficulty) - round.attempts.length}</strong></div>
          </> : <>
            <div className="toon-remote-done"><span>{round.status === 'won' ? '📺✨' : '📼'}</span><strong>{round.status === 'won' ? 'Signal found!' : 'Transmission missed!'}</strong><small>{round.status === 'won' ? `+${round.score} stars` : 'The answer is revealed below'}</small></div>
            <button className="toon-tune-button" onClick={nextChannel}>{session.index === session.ids.length-1 ? 'WATCH CREDITS ↗' : 'NEXT CHANNEL ↗'}<small>Keep channel surfing</small></button>
          </>}
        </div>
      </div>

      {round.status === 'playing' ? <div className="toon-choice-section">
        <div className="toon-choice-heading"><strong>Which show is this?</strong><span>{effectiveDifficulty === 'hard' ? 'Expert: type the show title' : `${choices.length} choices · ${toonWrongLimit(round.difficulty)-round.attempts.length} chances`}</span></div>
        {effectiveDifficulty === 'hard' ? <form className="toon-expert-form" onSubmit={submitTyped}>
          <label htmlFor="toon-expert-answer">Name the cartoon</label>
          <input id="toon-expert-answer" value={typedAnswer} maxLength={80} autoComplete="off" spellCheck="false" onChange={e=>setTypedAnswer(e.target.value)} placeholder="Type the show’s name…"/>
          <button className="btn btn-primary" type="submit" disabled={!typedAnswer.trim()}>Lock in answer ↗</button>
        </form> : <div className="toon-choice-grid">
          {choices.map((id, i) => {const candidate=toonShows.find(show => show.id===id)!;const used=round.attempts.includes(id);
            return <button className={`toon-choice ${used ? 'toon-choice-used' : ''}`} key={id} disabled={used} onClick={() => updateRound((r,s)=>guessToonShow(r,s,id))}>
              <span>{String.fromCharCode(65+i)}</span><strong>{candidate.title}</strong>{used && <small>Not this one</small>}</button>})}
        </div>}
      </div> : <div className={`toon-reveal-panel ${round.status === 'won' ? 'is-win' : 'is-loss'}`} role="status">
        <span className="toon-reveal-emoji">{round.status === 'won' ? '🎊' : '📼'}</span>
        <div><span className="overline">YOU WERE WATCHING...</span><h3>{activeShow.title}</h3><p>{activeShow.reveal}</p></div>
      </div>}
    </section>}

    {mode === 'practice' && session && <div className="toon-bottom-actions">
      <span>Different era?</span>
      {([['all','All shows'],['classics','Early 2000s'],['later','2005–2010']] as const).map(([pack, label]) =>
        <button key={pack} disabled={!finished && pack === session.pack} onClick={() => startPractice(pack)}>{label} ↗</button>)}
    </div>}
    <div className="toon-smallprint"><span>✿</span><p>Original symbolic clues, lovingly inspired by shows broadcast on Cartoon Network India in the 2000s. No frames, logos or music clips are copied. Daily broadcasts save automatically on this browser, as do practice scores.</p></div>
  </main>;
}
