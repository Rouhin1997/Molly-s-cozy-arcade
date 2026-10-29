import {useEffect,useMemo,useState,type FormEvent} from 'react';
import AnswerAssistInput from '../components/AnswerAssistInput';
import {indiaMysteries,indiaKindLabels,photoFileUrl,photoPage,type IndiaMystery,type CommonsPhoto,type MysteryBeat,type IndiaSpot} from '../data/indiaMysteries';
import {currentMystery,dailyMystery,mysteryRound,newMysteryRound,openExpedition,advanceExpedition,submitIndiaGuess,spendIndiaHint,readIndiaSave,writeIndiaSave,creditIndiaResult,HINTS_PER_MYSTERY,attemptsForDifficulty,type IndiaSave,type IndiaDifficulty} from '../lib/indiaQuest';

type Mode='expedition'|'daily';
type Props={today:string;initialMode:'daily'|'practice';onHome:()=>void;onClassic:()=>void};
const PHOTO_ORDER=[8,2,5,11,0,6,3,9,1,10,4,7];
function Mosaic({photo,reveal,solved=false}:{photo:CommonsPhoto;reveal:number;solved?:boolean}){
 const [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[photo.file]);
 const amount=solved?12:[2,5,8,12][Math.min(3,reveal)];
 const url=photoFileUrl(photo);
 return <figure className="india-photo-wrap">
  <div className="india-photo-mosaic" role="img" aria-label={'Photographic puzzle with '+amount+' of 12 parts revealed'}>
   {failed?<div className="india-photo-fallback"><strong>📷 Photo unavailable</strong><p>Use the written clues instead.</p></div>:
    Array.from({length:12},(_,i)=>{
     const x=i%4,y=Math.floor(i/4),open=PHOTO_ORDER.indexOf(i)<amount;
     return <span key={i} className={'india-photo-piece '+(open?'is-revealed':'is-covered')}
      style={open?{backgroundImage:'url("'+url+'")',backgroundPosition:(x*100/3)+'% '+(y*50)+'%'}:{}}>
      {!open&&<small>{String(i+1).padStart(2,'0')}</small>}
     </span>;
    })}
   <img src={url} alt="" aria-hidden="true" className="india-photo-probe" onError={()=>setFailed(true)}/>
  </div>
  <figcaption>Photo: {photo.author} · {photo.license} · <a href={photoPage(photo)} target="_blank" rel="noreferrer">Wikimedia Commons ↗</a> · Cropped for the puzzle</figcaption>
 </figure>;
}
function RegionMap({spot}:{spot:IndiaSpot}){
 return <div className="india-map-card">
  <svg viewBox="0 0 110 108" role="img" aria-label={'Approximate India region marker: '+spot.label}>
   <path d="M28 6 38 11 49 10 57 18 61 22 68 18 73 25 80 24 82 33 93 33 97 38 88 42 79 45 83 53 77 56 73 64 66 68 61 80 57 97 53 105 49 94 44 84 40 72 36 65 37 57 29 52 25 43 16 42 20 34 14 26 19 19 21 11Z" fill="#dfd2a7" stroke="#80613f" strokeWidth="2.1" strokeLinejoin="round"/>
   <path d="M76 36 89 34 105 29 104 39 98 43 93 51 86 49" fill="#dfd2a7" stroke="#80613f" strokeWidth="1.8" strokeLinejoin="round"/>
   <circle cx={spot.x} cy={spot.y} r="6" fill="#cb6240" opacity=".2"/>
   <circle cx={spot.x} cy={spot.y} r="2.7" fill="#9e3529" stroke="#fff6d9" strokeWidth="1.2"/>
  </svg><div><strong>📍 Region field note</strong><span>{spot.label}</span><small>Illustrative association, not exact state borders</small></div>
 </div>;
}
function Note({beat,card,n}:{beat:MysteryBeat;card:IndiaMystery;n:number}){
 return <article className="india-beat">
  <span>FIELD NOTE {String(n).padStart(2,'0')} · {beat.type.toUpperCase()}</span>
  <p>{beat.text}</p>
  {beat.type==='map'&&card.spot&&<RegionMap spot={card.spot}/>}
  {beat.type==='visual'&&card.photo&&card.kind!=='where'&&card.kind!=='who'&&<Mosaic photo={card.photo} reveal={3} solved/>}
  {beat.type==='visual'&&!card.photo&&<div className={'india-visual-note india-visual-'+card.kind}
   aria-label="Original illustrated clue">
    <span aria-hidden="true">{card.visualSymbol??'✦'}</span>
    <div><strong>{card.kind==='when'?'ARCHIVE CLIPPING':card.kind==='who'?'PORTRAIT FILE':card.kind==='where'?'TRAVEL POSTCARD':'OBJECT STUDY'}</strong>
      <small>{card.topic.toUpperCase()} · INDIA</small></div>
   </div>}
 </article>;
}
export default function IndiaQuest({today,initialMode,onHome,onClassic}:Props){
 const [mode,setMode]=useState<Mode>(initialMode==='practice'?'expedition':'daily');
 const [save,setSave]=useState<IndiaSave>(readIndiaSave);
 const [entry,setEntry]=useState('');
 const [guide,setGuide]=useState(()=>{
  try{return localStorage.getItem('india-wwww-rules-seen-v2')!=='yes'}catch{return true}
 });
 const [difficulty,setDifficulty]=useState<IndiaDifficulty>(()=>readIndiaSave().expedition?.difficulty??'balanced');
 const [shareMessage,setShareMessage]=useState('');
 function dismissGuide(){setGuide(false);try{localStorage.setItem('india-wwww-rules-seen-v2','yes')}catch{/* optional */}}
 function shareExpedition(){
  if(!expedition)return;
  const summary='🧭 India Edition · '+solved+'/12 solved · '+total+' points · '+(expedition.difficulty??'balanced')+' difficulty';
  if(navigator.clipboard?.writeText)void navigator.clipboard.writeText(summary).then(()=>setShareMessage('Results copied!')).catch(()=>setShareMessage(summary));
  else setShareMessage(summary);
 }
 const expedition=save.expedition;
 const card=mode==='daily'?dailyMystery(today):expedition?currentMystery(expedition):undefined;
 const round=mode==='daily'?(save.daily[today]??newMysteryRound(dailyMystery(today).id)):expedition?mysteryRound(expedition):undefined;
 const bank=Math.max(0,HINTS_PER_MYSTERY-(round?.extras??0));
 const activeDifficulty:IndiaDifficulty=mode==='daily'?'balanced':(expedition?.difficulty??difficulty);
 const attempts=attemptsForDifficulty(activeDifficulty);
 const finished=mode==='expedition'&&!!expedition?.finished;
 const stage=expedition?.index??0;
 const results=expedition?Object.values(expedition.rounds).filter(r=>r.status!=='playing'):[];
 const solved=results.filter(r=>r.status==='won').length;
 const total=results.reduce((v,r)=>v+r.score,0);
 const options=useMemo(()=>indiaMysteries.filter(x=>x.kind===(card?.kind??'what')).map(x=>({label:x.answer,value:x.answer,aliases:x.aliases})),[card?.kind]);
 useEffect(()=>setEntry(''),[card?.id,mode,stage]);
 function saveNow(next:IndiaSave){setSave(next);writeIndiaSave(next)}
 function start(){
  if(expedition&&!expedition.finished&&!window.confirm('Replace this unfinished expedition? Your earned best scores are kept.'))return;
  const seed=(expedition?.seed??0)+1;
  saveNow({...save,expedition:openExpedition(seed,difficulty),runs:save.runs+1});setMode('expedition');
 }
 function guess(e:FormEvent){
  e.preventDefault();if(!card||!round)return;
  const next=submitIndiaGuess(round,card,entry,activeDifficulty);
  if(next===round)return;
  if(mode==='daily'){
   let update={...save,daily:{...save.daily,[today]:next}};
   if(round.status==='playing'&&next.status!=='playing')update=creditIndiaResult(update,next,'daily',today);
   saveNow(update);
  }else if(expedition){
   let update:IndiaSave={...save,expedition:{...expedition,rounds:{...expedition.rounds,[card.id]:next}}};
   if(round.status==='playing'&&next.status!=='playing')update=creditIndiaResult(update,next,'expedition');
   saveNow(update);
  }
  setEntry('');
 }
 function hint(){
  if(!round||!card)return;
  const result=spendIndiaHint(round,bank);if(result.round===round)return;
  if(mode==='daily')saveNow({...save,daily:{...save.daily,[today]:result.round}});
  else if(expedition)saveNow({...save,expedition:{...expedition,rounds:{...expedition.rounds,[card.id]:result.round}}});
 }
 function skip(){
  if(!round||!card||round.status!=='playing')return;
  const next={...round,status:'missed' as const,score:0,feedback:'The answer is '+card.answer+'. '+card.fact};
  if(mode==='daily')saveNow({...save,daily:{...save.daily,[today]:next}});
  else if(expedition)saveNow({...save,expedition:{...expedition,rounds:{...expedition.rounds,[card.id]:next}}});
 }
 function next(){if(!expedition)return;saveNow({...save,expedition:advanceExpedition(expedition)})}
 return <main className="india-quest">
  <button className="back-link india-back" onClick={onHome}>← Back to the arcade</button>
  <header className="india-hero">
   <div className="india-hero-ornament" aria-hidden="true">✦　🪷　✧　🌞　✦</div>
   <div className="india-hero-content">
    <span className="india-eyebrow">THE FIELD NOTES · INDIA EDITION · GAME 01</span>
    <h1>Who? What?<br/><em>Where? When?</em></h1>
    <p>From hidden landmarks to untold stories. Every answer opens another page of India.</p>
    <div className="india-stamps"><span>🎭 WHO</span><span>🥭 WHAT</span><span>🕌 WHERE</span><span>⌛ WHEN</span></div>
   </div>
   <div className="india-hero-seal" aria-hidden="true"><span>✺</span><strong>INDIA</strong><small>FIELD GUIDE · VOL. 01</small></div>
  </header>
  <div className="india-menu">
   <div role="group" aria-label="Choose mode">
    <button className={mode==='daily'?'active':''} onClick={()=>setMode('daily')}>☀ Daily dispatch</button>
    <button className={mode==='expedition'?'active':''} onClick={()=>setMode('expedition')}>🧭 India expedition</button>
   </div>
   <button onClick={()=>setGuide(true)} aria-expanded={guide}>❔ Rules</button>
  </div>
  {guide&&<div className="india-rule-overlay" role="presentation">
   <section className="india-rule-modal" role="dialog" aria-modal="true" aria-label="How to play India Edition">
    <div className="india-rule-header"><span>🧭 HOW TO PLAY</span><button type="button" onClick={dismissGuide} aria-label="Close game rules">✕</button></div>
    <h2>Every mystery has a story.</h2>
    <div className="india-rule-grid">
     <div><strong>① Discover</strong><p>Guess from the opening clue. Wrong answers uncover new details or more of a hidden picture.</p></div>
     <div><strong>② Choose your challenge</strong><p>Easy gives 5 guesses, Balanced 4 and Challenge 3, with gradually more demanding mysteries.</p></div>
     <div><strong>③ Use your hints</strong><p>You have <b>two optional hints for every individual mystery</b>. Both reset on the next stop. No hint farming or banking.</p></div>
     <div><strong>④ Travel further</strong><p>A journey has twelve mysteries. Recognised alternative spellings work, and suggestions help with names without automatically guessing.</p></div>
    </div>
    <p className="india-rule-caption">Wrong guesses earn new clues. The compass explains genuine connections when it recognises your guess. There is no time limit.</p>
    <div className="india-rule-actions">
     <button type="button" className="india-primary" onClick={dismissGuide}>Let's play →</button>
     <button type="button" className="india-secondary" onClick={()=>{dismissGuide();onClassic()}}>Play classic game</button>
    </div>
   </section>
  </div>}
  {mode==='expedition'&&!expedition&&<section className="india-welcome">
   <div className="india-field-cover"><span>THE INDIA EXPEDITION</span><strong>12</strong><small>MYSTERIES PER JOURNEY</small><span>🎭　🥭　🕌　⌛</span></div>
   <div><span className="india-eyebrow">OPEN THE FIELD GUIDE</span><h2>Twelve mysteries. Four ways to wonder.</h2>
    <p>Discover Indian people, places, food, wildlife and historical moments through words, maps and broken photographs.</p>
    <p>More than two hundred mysteries across familiar favourites and surprising discoveries. Every journey reshuffles its route.</p>
    <div className="india-difficulty-picker"><strong>Choose your difficulty</strong><div role="group" aria-label="Expedition difficulty">
      {(['easy','balanced','challenge'] as const).map(level=><button type="button" key={level} className={difficulty===level?'chosen':''}
       aria-pressed={difficulty===level} onClick={()=>setDifficulty(level)}>
       {level==='easy'?'🌿 Easy':level==='balanced'?'🧭 Balanced':'🔥 Challenge'}
      </button>)}
     </div><small>{difficulty==='easy'?'Recognisable subjects · 5 guesses · relaxed exploration':difficulty==='balanced'?'Gradually harder subjects · 4 guesses · the recommended journey':'Subtler clues and harder subjects · 3 guesses · for experienced explorers'}</small></div>
    <button className="india-primary" onClick={start}>Begin the expedition →</button></div>
  </section>}
  {mode==='expedition'&&finished&&<section className="india-finale">
   <div className="india-finale-fireworks" aria-hidden="true">✦　✧　★　✦　✧　★　✦</div>
   <span>🏆</span><small>ALL TWELVE CHAPTERS COMPLETE</small>
   <h2>{solved===12?'Legend of the Atlas!':solved>=9?'Master Explorer!':solved>=6?'What an adventure!':'The journey continues!'}</h2>
   <p>You uncovered <strong>{solved} of 12</strong> mysteries and earned <strong>{total} points</strong>. That's a complete journey across India!</p>
   <div className="india-finale-honours"><div><strong>{solved}/12</strong><small>Solved</small></div>
    <div><strong>{total.toLocaleString()}</strong><small>Points</small></div>
    <div><strong>{expedition?.difficulty??'balanced'}</strong><small>Difficulty</small></div></div>
   <div className="india-finale-cards">{expedition?.stops.map((id,i)=>{
    const c=indiaMysteries.find(x=>x.id===id),r=expedition.rounds[id];
    return <span key={id} title={c?.answer}>{indiaKindLabels[c?.kind??'what'].icon} {i+1} {r?.status==='won'?'✓':'○'}</span>;
   })}</div>
   <div className="india-difficulty-picker india-finale-difficulty"><strong>Choose your next adventure</strong><div role="group" aria-label="Difficulty of next expedition">
     {(['easy','balanced','challenge'] as const).map(level=><button key={level} type="button"
      className={difficulty===level?'chosen':''} aria-pressed={difficulty===level}
      onClick={()=>setDifficulty(level)}>{level==='easy'?'🌿 Easy':level==='balanced'?'🧭 Balanced':'🔥 Challenge'}</button>)}
    </div></div>
   <div className="india-finale-actions"><button className="india-primary" onClick={start}>Start a new expedition →</button>
    <button className="india-secondary" type="button" onClick={shareExpedition}>Copy my results</button></div>
   {shareMessage&&<p role="status" className="india-share-status">{shareMessage}</p>}
  </section>}
  {mode==='daily'&&<div className="india-daily-header"><div><span className="india-eyebrow">A NEW POSTCARD EACH DAY</span><h2>☀ Daily dispatch</h2><p>One India mystery, the same for everyone today.</p></div><strong>{today}</strong></div>}
  {card&&round&&!finished&&<section className="india-play">
   <div className="india-round-head"><strong>{mode==='daily'?'DAILY DISPATCH':'STOP '+String(stage+1).padStart(2,'0')+' / 12'}　 {indiaKindLabels[card.kind].icon} {indiaKindLabels[card.kind].label}</strong>
    <span>💡 {bank}/{HINTS_PER_MYSTERY} hints　✎ {Math.max(0,attempts-round.guesses.length)}/{attempts} guesses</span></div>
   {mode==='expedition'&&<div className="india-progress">{expedition?.stops.map((id,i)=><span key={id} className={i===stage?'active':i<stage?'done':''} aria-label={'Stop '+(i+1)}/>)}</div>}
   <div className="india-play-grid">
    <article className="india-main-card">
     <div className="india-mystery-intro"><span className="india-eyebrow">FIELD NOTES / {card.kind.toUpperCase()}</span><h2>{card.intro}</h2><span aria-hidden="true">?</span></div>
     {!card.photo&&card.visualSymbol&&round.status==='playing'&&<div className="india-artifact" aria-label="Original themed visual clue"><span>{card.visualSymbol}</span><i>{card.kind.toUpperCase()} · {card.topic.toUpperCase()}</i></div>}
     {card.photo&&(card.kind==='where'||card.kind==='who')&&<Mosaic key={card.id} photo={card.photo} reveal={round.reveal} solved={round.status!=='playing'}/>}
     <div className="india-notes">{card.beats.map((beat,i)=>i<round.reveal?
      <Note key={i} beat={beat} card={card} n={i+1}/>:
      <div key={i} className="india-locked-note">🔒　CLUE {i+2} <small>Unlocks after a guess</small></div>)}</div>
     {round.extras>0&&<div className="india-bonus"><strong>✦ Extra hints</strong>{card.assists.slice(0,round.extras).map((t,i)=><p key={i}>{t}</p>)}</div>}
     {round.status==='playing'?<form onSubmit={guess} className="india-form">
      <label htmlFor="india-answer">Your answer</label>
      <AnswerAssistInput id="india-answer" value={entry} onChange={setEntry} options={options}
       placeholder={'Guess '+({who:'a person',what:'a thing',where:'a place',when:'an event'}[card.kind])+'…'} minChars={3}/>
      <div className="india-actions">
       <button className="india-primary" type="submit" disabled={!entry.trim()}>Make a guess →</button>
       <button className="india-secondary" type="button" onClick={hint} disabled={bank<1||round.extras>=2}>💡 Hint ({bank} left)</button>
       <button className="india-text-button" type="button" onClick={skip}>Reveal answer</button>
      </div>
     </form>:<section className={'india-result india-victory-stage '+(round.status==='won'?'correct':'missed')} aria-live="polite">
      <div className="india-victory-stars" aria-hidden="true">{round.status==='won'?'✦　★　✧　★　✦':'✧　✦　✧'}</div>
      <div className="india-victory-medal">{round.status==='won'?'🏅':'🗝️'}</div>
      <div className="india-victory-eyebrow">{round.status==='won'?(round.guesses.length===1?'PERFECT FIRST GUESS!':'MYSTERY SOLVED!'):'MYSTERY UNCOVERED'}</div>
      <h3>{card.answer}</h3>
      <p>{card.fact}</p>
      <div className="india-victory-stats">
       <div><strong>{round.status==='won'?'+'+round.score:'0'}</strong><small>POINTS</small></div>
       <div><strong>{round.guesses.length}</strong><small>GUESSES</small></div>
       <div><strong>{round.extras}</strong><small>HINTS USED</small></div>
      </div>
      {round.status==='missed'&&<p className="india-victory-encourage">A new mystery awaits. Every clue teaches you something.</p>}
      {card.photo&&card.kind!=='where'&&card.kind!=='who'&&<Mosaic photo={card.photo} reveal={3} solved/>}
     </section>}
     {round.status!=='playing'&&(mode==='expedition'?<button className="india-primary india-next" onClick={next}>{stage===11?'Complete expedition':'Next mystery'} →</button>:
      <button className="india-secondary" onClick={()=>setMode('expedition')}>Explore the expedition →</button>)}
    </article>
    <aside className="india-sidebar">
     <div className="india-compass"><span className="india-eyebrow">🧭 YOUR GUESS</span><p role="status">{round.feedback}</p>
      <div className="india-tries">{Array.from({length:attempts},(_,i)=><i key={i} className={i<round.guesses.length?'used':''}/>)}</div>
      {round.guesses.length>0&&<div className="india-previous">{round.guesses.map((g,i)=><span key={i}>✎ {g}</span>)}</div>}</div>
     <div className="india-mini-hints"><strong>💡 {bank} hints available</strong>
      <span>Resets with the next mystery</span></div>
    </aside>
   </div>
  </section>}
  {mode==='expedition'&&expedition&&!finished&&<div className="india-session-foot"><span>EXPEDITION #{expedition.seed} · {solved} solved · {total} points</span><button onClick={start}>↻ New expedition</button></div>}
  <footer className="india-footer"><button onClick={onClassic}>Classic Guess Who? ↗</button></footer>
 </main>;
}
