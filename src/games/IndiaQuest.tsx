import {useEffect,useMemo,useState,type FormEvent} from 'react';
import AnswerAssistInput from '../components/AnswerAssistInput';
import {indiaMysteries,indiaKindLabels,photoFileUrl,photoPage,type IndiaMystery,type CommonsPhoto,type MysteryBeat,type IndiaSpot} from '../data/indiaMysteries';
import {currentMystery,dailyMystery,mysteryRound,newMysteryRound,openExpedition,advanceExpedition,submitIndiaGuess,spendIndiaHint,readIndiaSave,writeIndiaSave,creditIndiaResult,MAX_ATTEMPTS,HINT_EARNING_STOPS,type IndiaSave} from '../lib/indiaQuest';

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
  {beat.type==='visual'&&card.photo&&card.kind!=='where'&&<Mosaic photo={card.photo} reveal={3} solved/>}
 </article>;
}
export default function IndiaQuest({today,initialMode,onHome,onClassic}:Props){
 const [mode,setMode]=useState<Mode>(initialMode==='practice'?'expedition':'daily');
 const [save,setSave]=useState<IndiaSave>(readIndiaSave);
 const [entry,setEntry]=useState('');
 const [guide,setGuide]=useState(false);
 const expedition=save.expedition;
 const card=mode==='daily'?dailyMystery(today):expedition?currentMystery(expedition):undefined;
 const round=mode==='daily'?(save.daily[today]??newMysteryRound(dailyMystery(today).id)):expedition?mysteryRound(expedition):undefined;
 const bank=mode==='daily'?(save.dailyHints[today]??1):expedition?.hintBank??0;
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
  saveNow({...save,expedition:openExpedition(seed),runs:save.runs+1});setMode('expedition');
 }
 function guess(e:FormEvent){
  e.preventDefault();if(!card||!round)return;
  const next=submitIndiaGuess(round,card,entry);
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
  if(mode==='daily')saveNow({...save,daily:{...save.daily,[today]:result.round},dailyHints:{...save.dailyHints,[today]:result.bank}});
  else if(expedition)saveNow({...save,expedition:{...expedition,hintBank:result.bank,rounds:{...expedition.rounds,[card.id]:result.round}}});
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
   <button onClick={()=>setGuide(x=>!x)} aria-expanded={guide}>❔ How to play</button>
  </div>
  {guide&&<aside className="india-guide"><h2>How the mystery unfolds</h2>
   <p>Each wrong guess opens exactly one new field note and repairs pieces of a hidden photo where available. There are four distinct guesses per mystery; repeat guesses are free.</p>
   <p>A 12-stop expedition grants one new hint credit on each of the first ten stops. Save credits for later; spend up to two per mystery on extra trivia. The final two stops grant no new credits.</p>
   <p>Our compass compares only known clues such as category, topic and region—it doesn't fabricate a percentage. Alternative spellings such as phuchka, fuchka and golgappa count.</p>
   <button onClick={onClassic}>📚 Original Guess Who? archive ↗</button>
  </aside>}
  {mode==='expedition'&&!expedition&&<section className="india-welcome">
   <div className="india-field-cover"><span>THE INDIA EXPEDITION</span><strong>12</strong><small>MYSTERIES PER JOURNEY</small><span>🎭　🥭　🕌　⌛</span></div>
   <div><span className="india-eyebrow">OPEN THE FIELD GUIDE</span><h2>Twelve mysteries. Four ways to wonder.</h2>
    <p>Discover Indian people, places, food, wildlife and historical moments through words, maps and broken photographs.</p>
    <p>Every expedition deals a fresh selection from our curated atlas. No timer, and unused hints carry forward.</p>
    <button className="india-primary" onClick={start}>Begin the expedition →</button></div>
  </section>}
  {mode==='expedition'&&finished&&<section className="india-finale">
   <span>🏵️</span><small>THE EXPEDITION IS COMPLETE</small><h2>What a journey!</h2>
   <p>You identified <strong>{solved} of 12 mysteries</strong> and earned <strong>{total} points</strong>.</p>
   <div className="india-finale-cards">{expedition?.stops.map((id,i)=>{
    const c=indiaMysteries.find(x=>x.id===id),r=expedition.rounds[id];
    return <span key={id} title={c?.answer}>{indiaKindLabels[c?.kind??'what'].icon} {i+1} {r?.status==='won'?'✓':'○'}</span>;
   })}</div>
   <button className="india-primary" onClick={start}>Shuffle a new expedition →</button>
  </section>}
  {mode==='daily'&&<div className="india-daily-header"><div><span className="india-eyebrow">A NEW POSTCARD EACH DAY</span><h2>☀ Daily dispatch</h2><p>One India mystery, the same for everyone today.</p></div><strong>{today}</strong></div>}
  {card&&round&&!finished&&<section className="india-play">
   <div className="india-round-head"><strong>{mode==='daily'?'DAILY DISPATCH':'STOP '+String(stage+1).padStart(2,'0')+' / 12'}　 {indiaKindLabels[card.kind].icon} {indiaKindLabels[card.kind].label}</strong>
    <span>🪙 {bank} banked hints　✎ {MAX_ATTEMPTS-round.guesses.length}/{MAX_ATTEMPTS} guesses</span></div>
   {mode==='expedition'&&<div className="india-progress">{expedition?.stops.map((id,i)=><span key={id} className={i===stage?'active':i<stage?'done':''} aria-label={'Stop '+(i+1)}/>)}</div>}
   <div className="india-play-grid">
    <article className="india-main-card">
     <div className="india-mystery-intro"><span className="india-eyebrow">FIELD NOTES / {card.kind.toUpperCase()}</span><h2>{card.intro}</h2><span aria-hidden="true">?</span></div>
     {card.photo&&card.kind==='where'&&<Mosaic key={card.id} photo={card.photo} reveal={round.reveal} solved={round.status!=='playing'}/>}
     <div className="india-notes">{card.beats.map((beat,i)=>i<round.reveal?
      <Note key={i} beat={beat} card={card} n={i+1}/>:
      <div key={i} className="india-locked-note">🔒　FIELD NOTE {String(i+1).padStart(2,'0')} <small>Reveals after a wrong guess</small></div>)}</div>
     {round.extras>0&&<div className="india-bonus"><strong>✦ Explorer's extra field notes</strong>{card.assists.slice(0,round.extras).map((t,i)=><p key={i}>{t}</p>)}</div>}
     {round.status==='playing'?<form onSubmit={guess} className="india-form">
      <label htmlFor="india-answer">Your answer</label>
      <AnswerAssistInput id="india-answer" value={entry} onChange={setEntry} options={options}
       placeholder={'Guess '+({who:'a person',what:'a thing',where:'a place',when:'an event'}[card.kind])+'…'} minChars={3}/>
      <div className="india-actions">
       <button className="india-primary" type="submit" disabled={!entry.trim()}>Make a guess →</button>
       <button className="india-secondary" type="button" onClick={hint} disabled={bank<1||round.extras>=2}>🪙 Extra hint ({bank})</button>
       <button className="india-text-button" type="button" onClick={skip}>Reveal answer</button>
      </div>
     </form>:<div className={'india-result '+(round.status==='won'?'correct':'missed')}>
      <div><span>{round.status==='won'?'🏆 CORRECT!':'📖 MYSTERY REVEALED'}</span><h3>{card.answer}</h3><p>{card.fact}</p>
       {round.status==='won'&&<strong>+{round.score} points</strong>}</div>
      {card.photo&&card.kind!=='where'&&<Mosaic photo={card.photo} reveal={3} solved/>}
     </div>}
     {round.status!=='playing'&&(mode==='expedition'?<button className="india-primary india-next" onClick={next}>{stage===11?'Complete expedition':'Next mystery'} →</button>:
      <button className="india-secondary" onClick={()=>setMode('expedition')}>Explore the expedition →</button>)}
    </article>
    <aside className="india-sidebar">
     <div className="india-compass"><span className="india-eyebrow">THE COMPASS · GUESS FEEDBACK</span><p role="status">{round.feedback}</p>
      <div className="india-tries">{Array.from({length:4},(_,i)=><i key={i} className={i<round.guesses.length?'used':''}/>)}</div>
      {round.guesses.length>0&&<div className="india-previous">{round.guesses.map((g,i)=><span key={i}>✎ {g}</span>)}</div>}</div>
     <div className="india-hint-bank"><span>🪙</span><strong>{bank} field-note credits</strong>
      <p>{mode==='daily'?'One optional extra note today.':'One new hint on stops 1–'+HINT_EARNING_STOPS+'. Unused hints stack. Final two stops give none.'}</p>
      <small>🧠 Trivia　📷 Photos　🗺️ Maps</small></div>
     <div className="india-atlas"><span className="india-eyebrow">THE EVER-GROWING ATLAS</span>
      <strong>{indiaMysteries.length} hand-curated mysteries</strong><p>The catalogue can grow indefinitely. Each new expedition shuffles a distinct 12-stop route; repeated answers become possible on later trips.</p></div>
    </aside>
   </div>
  </section>}
  {mode==='expedition'&&expedition&&!finished&&<div className="india-session-foot"><span>EXPEDITION #{expedition.seed} · {solved} solved · {total} points</span><button onClick={start}>↻ New expedition</button></div>}
  <footer className="india-footer"><span>India Edition · Licensed photographs credited on display · Progress saved in this browser</span><button onClick={onClassic}>Classic Guess Who? archive ↗</button></footer>
 </main>;
}
