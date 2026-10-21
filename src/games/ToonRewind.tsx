import { useMemo, useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react';
import {
  optionsForShow, toonShows, type ToonShow, type ToonPack,
} from '../data/toon';
import {
  advanceToonSession, currentToonRound, guessToonShow,
  newToonSession, registerToonScore, tuneToonSignal, MAX_TUNES,
  MAX_WRONG_CHANNELS, type ToonProgress, type ToonRound, type ToonSession,
} from '../lib/toon';

type Props = {
  today: string;
  progress: ToonProgress;
  setProgress: Dispatch<SetStateAction<ToonProgress>>;
  onHome: () => void;
};

function Television({ show, round, number }: { show: ToonShow; round: ToonRound; number: number }) {
  const revealed = round.status !== 'playing';
  const visible = revealed ? MAX_TUNES : round.tuneLevel;
  return <div className="toon-television" aria-label="Retro television revealing cartoon motifs">
    <div className="toon-bezel">
      <div className="toon-glass" style={{ '--toon-colour-a': show.palette[0], '--toon-colour-b': show.palette[1] } as CSSProperties}>
        <div className="toon-scanlines" aria-hidden="true"/>
        <div className="toon-screen-header"><span><i/> ON AIR</span><span>CN INDIA • 2000s</span></div>
        <div className="toon-screen-picture">
          {show.signal.map((symbol, i) => <div key={i} className={`toon-clue ${i < visible ? 'toon-clue-ready' : 'toon-clue-static'}`}>
            <span className="toon-clue-symbol" aria-hidden="true">{i < visible ? symbol : '▨'}</span>
            <span className="toon-clue-text">{i < visible ? show.descriptions[i] : 'SIGNAL LOST'}</span>
          </div>)}
        </div>
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
  const dailySession = progress.daily[today] ?? newToonSession(`toon-daily-${today}`, 'all');
  const session: ToonSession | null = mode === 'daily' ? dailySession : progress.practice;
  const finished = !!session && session.index >= session.ids.length;
  const activeShow = session && !finished ? toonShows.find(s => s.id === session.ids[session.index]) : undefined;
  const round = session && activeShow ? currentToonRound(session) : undefined;
  const choices = useMemo(() => activeShow && session ? optionsForShow(activeShow.id, session.seed) : [],
    [activeShow, session?.seed]);
  const sessionStars = session ? Object.values(session.rounds).reduce((n, r) => n + r.score, 0) : 0;
  const identified = session ? Object.values(session.rounds).filter(r => r.status === 'won').length : 0;

  function updateRound(transform: (round: ToonRound, show: ToonShow) => ToonRound) {
    setProgress(prev => {
      if (mode === 'daily') {
        const current = prev.daily[today] ?? newToonSession(`toon-daily-${today}`, 'all');
        const show = toonShows.find(s => s.id === current.ids[current.index]);
        if (!show) return prev;
        const before = currentToonRound(current);
        const after = transform(before, show);
        if (before === after) return prev;
        const ended = before.status === 'playing' && after.status !== 'playing';
        return { ...prev, daily: { ...prev.daily, [today]: { ...current, rounds: { ...current.rounds, [show.id]: after } } },
          stats: ended ? registerToonScore(prev.stats, after) : prev.stats };
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
        stats: ended ? registerToonScore(prev.stats, after) : prev.stats };
    });
  }

  function nextChannel() {
    setProgress(prev => mode === 'daily'
      ? { ...prev, daily: { ...prev.daily, [today]: advanceToonSession(prev.daily[today] ?? newToonSession(`toon-daily-${today}`)) } }
      : prev.practice ? { ...prev, practice: advanceToonSession(prev.practice) } : prev);
  }
  function startPractice(pack: ToonPack) {
    setChosenPack(pack);
    setProgress(prev => ({ ...prev,
      practice: newToonSession(`toon-practice-${Date.now()}-${Math.random()}`, pack) }));
    setMode('practice');
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
    <div className="mode-intro"><span>📡</span><p><strong>Six mystery transmissions.</strong> Recognise each old CN India show from its picture clues. Turn the tuning dial for a clearer signal, but fewer hints earn more stars. You get two guesses per channel.</p></div>

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
              <span aria-hidden="true">✦</span>{round.tuneLevel === MAX_TUNES ? 'FULL SIGNAL' : 'TUNE +'}<small>{round.tuneLevel === MAX_TUNES ? 'All clues revealed' : 'Reveal another picture clue'}</small>
            </button>
            <p className="toon-remote-instruction">Recognise the show? Choose it below. The earlier you answer, the more stars you earn.</p>
            <div className="toon-chances"><span>Wrong guesses remaining</span><strong>{MAX_WRONG_CHANNELS - round.attempts.length}</strong></div>
          </> : <>
            <div className="toon-remote-done"><span>{round.status === 'won' ? '📺✨' : '📼'}</span><strong>{round.status === 'won' ? 'Signal found!' : 'Transmission missed!'}</strong><small>{round.status === 'won' ? `+${round.score} stars` : 'The answer is revealed below'}</small></div>
            <button className="toon-tune-button" onClick={nextChannel}>{session.index === session.ids.length-1 ? 'WATCH CREDITS ↗' : 'NEXT CHANNEL ↗'}<small>Keep channel surfing</small></button>
          </>}
        </div>
      </div>

      {round.status === 'playing' ? <div className="toon-choice-section">
        <div className="toon-choice-heading"><strong>Which show is this?</strong><span>Pick one broadcast • {round.attempts.length ? 'One more chance' : 'Two chances'}</span></div>
        <div className="toon-choice-grid">
          {choices.map((id, i) => {const candidate=toonShows.find(show => show.id===id)!;const used=round.attempts.includes(id);
            return <button className={`toon-choice ${used ? 'toon-choice-used' : ''}`} key={id} disabled={used} onClick={() => updateRound((r,s)=>guessToonShow(r,s,id))}>
              <span>{String.fromCharCode(65+i)}</span><strong>{candidate.title}</strong>{used && <small>Not this one</small>}</button>})}
        </div>
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
