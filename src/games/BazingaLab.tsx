import { useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react';
import DifficultyPicker from '../components/DifficultyPicker';
import { readPreferredDifficulty, savePreferredDifficulty, type Difficulty } from '../lib/passport';
import {
  awardSeatingResult,bazingaAttempts,bazingaHints,checkSeating,getDailySeatingRound,
  isSeatingUntouched,newPracticeSeatingRound,newSeatingRound,revealSeatingHint,seatGuest,selectGuest,
  type BazingaProgress,type SeatingRound,
} from '../lib/bazinga';
import {
  cast,dailySeatingCase,ruleHolds,ruleText,seatingCases,seatingRules,type SeatingCase,
} from '../data/bazinga';

type Props={
  today:string;
  progress:BazingaProgress;
  setProgress:Dispatch<SetStateAction<BazingaProgress>>;
  onHome:()=>void;
};
export default function BazingaLab({today,progress,setProgress,onHome}:Props){
  const [mode,setMode]=useState<'daily'|'practice'>('daily');
  const [difficulty,setDifficulty]=useState<Difficulty>(()=>readPreferredDifficulty('bazinga'));
  const daily=getDailySeatingRound(progress,today,difficulty);
  const round=mode==='daily'?daily:progress.practice;
  const currentCase=round?seatingCases.find(c=>c.id===round.caseId):undefined;
  const level=round?.difficulty??difficulty;
  const locked=!!round&&!isSeatingUntouched(round);
  const rules=currentCase?seatingRules(currentCase):[];
  const completed=round?.status!=='playing';
  const chosen=round?.selected;
  const activeRoster=currentCase?.solution??[];
  const used=round?.chairs.filter(Boolean)??[];
  const mistakesRemaining=round?bazingaAttempts(level)-round.attempts:0;

  function startPractice(d:Difficulty=difficulty){
    setProgress(prev=>{
      const r=newPracticeSeatingRound(prev,d);
      return {...prev,practice:r,recent:[...prev.recent,r.caseId].slice(-4)};
    });
    setMode('practice');
  }
  function chooseLevel(d:Difficulty){
    if(locked||d===level)return;
    setDifficulty(d);
    savePreferredDifficulty('bazinga',d);
    if(mode==='daily'){
      setProgress(prev=>({...prev,daily:{...prev.daily,[today]:newSeatingRound(dailySeatingCase(today,d))}}));
    } else if(progress.practice) {
      startPractice(d);
    }
  }
  function changeRound(fn:(r:SeatingRound,c:SeatingCase)=>SeatingRound){
    setProgress(prev=>{
      const current=mode==='daily'?getDailySeatingRound(prev,today,difficulty):prev.practice;
      if(!current)return prev;
      const c=seatingCases.find(item=>item.id===current.caseId);
      if(!c)return prev;
      const next=fn(current,c);
      if(next===current)return prev;
      const previous=mode==='daily'?{...prev,daily:{...prev.daily,[today]:next}}:{...prev,practice:next};
      return current.status==='playing'&&next.status!=='playing'?
        awardSeatingResult(previous,next):previous;
    });
  }
  return <main className="game-page bazinga-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="game-head">
      <div><div className="overline">THE LITTLE PUZZLE CLUB / GAME 04</div>
        <h1><span aria-hidden="true">⚛️</span> Bazinga! Lab</h1>
        <p>One seating plan. A few impossible roommate rules. Can you crack the logic?</p>
      </div><span className="decorative-berry" aria-hidden="true">✳</span>
    </div>
    <div className="mode-tabs" role="group" aria-label="Bazinga game mode">
      <button className={mode==='daily'?'selected':''} aria-pressed={mode==='daily'} onClick={()=>setMode('daily')}>☀ Daily experiment</button>
      <button className={mode==='practice'?'selected':''} aria-pressed={mode==='practice'} onClick={()=>setMode('practice')}>✿ Practice laboratory</button>
    </div>
    <DifficultyPicker value={level} onChange={chooseLevel} disabled={locked}
      lockedMessage="This experiment has begun or finished. Select the difficulty before your next experiment."/>
    <div className="mode-intro"><span>🔬</span><p><strong>Deduce, don't guess.</strong> Select a guest and tap a chair to build a seating arrangement. Every rule must hold simultaneously. Cozy has four chairs and two hints, Clever has five chairs, and Expert has six chairs and no hints. Each case has exactly one correct solution.</p></div>
    {mode==='practice'&&!round&&<section className="start-panel">
      <span>🧠</span><h2>Welcome to the logic laboratory</h2>
      <p>Choose a challenge, read the clues carefully, then rearrange the guests until every condition is true.</p>
      <button className="btn btn-primary" onClick={()=>startPractice()}>Start an experiment ↗</button>
    </section>}
    {round&&currentCase&&<section className="bazinga-lab-panel">
      <div className="bazinga-heading">
        <div><span className="overline">{mode==='daily'?'TODAY’S CALTECH CHALLENGE':'PRACTICE EXPERIMENT'} · {currentCase.place}</span>
          <h2>{currentCase.title}</h2><p>{currentCase.narrative}</p></div>
        <div className="bazinga-case-tag">CASE FILE <strong>{currentCase.id.split('-').slice(0,2).join(' ').toUpperCase()}</strong></div>
      </div>
      <div className="bazinga-scoreline">
        <span>🔍 {bazingaAttempts(level)-round.attempts} checks remaining</span>
        <span>💡 {bazingaHints(level)-round.hints} hints available</span>
        <span>✦ {level==='hard'?'2×':level==='medium'?'1.5×':'1×'} stars</span>
      </div>
      <div className="bazinga-layout">
        <div className="bazinga-table-card">
          <div className="bazinga-table-title"><span>THE SEATING EXPERIMENT</span><small>Left ← → Right</small></div>
          <div className="bazinga-table-surface" aria-hidden="true"><span>✦ THE CALTECH TABLE ✦</span></div>
          <div className="bazinga-seats" style={{gridTemplateColumns:`repeat(${currentCase.solution.length},minmax(0,1fr))`}}>
            {round.chairs.map((guest,index)=>{
              const fixed=round.locked.includes(index);
              return <button key={index} type="button"
                className={`bazinga-seat ${fixed?'is-fixed':''} ${guest?'is-occupied':''} ${chosen?'can-place':''}`}
                disabled={round.status!=='playing'||fixed}
                onClick={()=>changeRound(r=>seatGuest(r,index))}
                aria-label={`Chair ${index+1}: ${guest??'empty'}${fixed?' (hint-locked)':''}`}>
                <small>CHAIR {index+1}</small>
                <span aria-hidden="true">{guest?cast[guest]?.icon??'⭐':'+'}</span>
                <strong>{guest??'Empty'}</strong>
                {fixed&&<em>✦ Fixed</em>}
              </button>;
            })}
          </div>
          <p className="bazinga-seat-help">Pick a guest, then tap a chair. You can move, swap, or clear guests until the arrangement feels right.</p>
          <div className="bazinga-guests" aria-label="Select a guest to place">
            {activeRoster.map(name=><button key={name} type="button"
              disabled={round.status!=='playing'||round.locked.some(i=>round.chairs[i]===name)}
              className={`bazinga-guest ${chosen===name?'selected':''} ${used.includes(name)?'already-seated':''}`}
              style={{'--guest-bg':cast[name]?.tint??'#eee'} as CSSProperties}
              onClick={()=>changeRound(r=>selectGuest(r,name))} aria-pressed={chosen===name}>
              <span aria-hidden="true">{cast[name]?.icon??'⭐'}</span><strong>{name}</strong>
              {used.includes(name)&&<small>Seated</small>}
            </button>)}
          </div>
        </div>
        <div className="bazinga-rules-card">
          <div className="bazinga-rules-title"><span>📜</span><div><strong>The Roommate Rules</strong><small>All of these statements must be true</small></div></div>
          <ol className="bazinga-rules">
            {rules.map((rule,index)=><li key={index}>
              <span>{index+1}</span><p>{ruleText(rule,currentCase.solution.length)}</p>
              {round.attempts>0 && round.status==='playing' && round.chairs.every(Boolean)&&
              <b aria-label={ruleHolds(round.chairs as string[],rule)?'Pass':'Not met'}>
                {ruleHolds(round.chairs as string[],rule)?'✓':'×'}</b>}
            </li>)}
          </ol>
          <div className="bazinga-rules-footnote">✧ Each case is checked against every possible seating order to guarantee one logical answer.</div>
        </div>
      </div>
      {round.status==='playing'?<div className="bazinga-controls">
        <div role="status" className="bazinga-feedback">{round.feedback}</div>
        <div className="bazinga-action-buttons">
          <button className="btn btn-outline" disabled={round.hints>=bazingaHints(level)}
            onClick={()=>changeRound((r,c)=>revealSeatingHint(r,c))}>💡 Reveal one chair ({bazingaHints(level)-round.hints})</button>
          <button className="btn btn-primary" disabled={round.chairs.some(x=>!x)}
            onClick={()=>changeRound((r,c)=>checkSeating(r,c))}>Check arrangement ↗</button>
        </div>
        <small>{mistakesRemaining} checks left · {currentCase.solution.length} guests · {rules.length} logical constraints</small>
      </div>:<div className={`bazinga-result ${round.status==='won'?'is-win':'is-loss'}`} role="status">
        <span>{round.status==='won'?'🎉':'🧪'}</span>
        <div><h3>{round.status==='won'?'Bazinga! The theorem holds!':'Experiment concluded!'}</h3>
          <p>{round.status==='won'?`You solved all ${rules.length} constraints and earned ${round.score} stars.`:'A tricky case! Here is the one arrangement that satisfies all the rules.'}</p>
          <div className="bazinga-answer-key">{currentCase.solution.map((name,i)=><span key={i}>{i+1}. {name}</span>)}</div>
        </div>
        <button className="btn btn-primary" onClick={()=>startPractice()}>Next experiment ↗</button>
      </div>}
    </section>}
    <p className="privacy-note">✧ Your seating scores join Molly’s Arcade Passport automatically. Original character-inspired icons; no copyrighted television images.</p>
  </main>;
}
