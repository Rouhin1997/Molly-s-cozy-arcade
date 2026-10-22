import { useEffect,useRef,useState,type CSSProperties,type Dispatch,type SetStateAction } from 'react';
import { pinkChallengeFor,pinkEncoreColors,pinkEncouragements } from '../data/pinkRush';
import { advancePink,applyPinkRound,choosePink,getActivePinkRound,pinkDailySession,pinkEncorePattern,pinkNextPractice,pinkShowScore,type PinkProgress } from '../lib/pinkRush';

type Props={today:string;progress:PinkProgress;setProgress:Dispatch<SetStateAction<PinkProgress>>;onHome:()=>void};
const stageMembers=[
 {name:'JISOO',tone:'#c2a5eb',hair:'wave'},
 {name:'JENNIE',tone:'#ee9cca',hair:'bob'},
 {name:'ROSÉ',tone:'#e9c286',hair:'long'},
 {name:'LISA',tone:'#8fcfd3',hair:'fringe'},
] as const;
function PinkStage({lit,finale,active}:{lit:number;finale:boolean;active:number}){
 return <div className={'pink-stage '+(finale?'is-finale':'')} role="img" aria-label={'Original illuminated concert stage: '+lit+' of 8 special effects unlocked'}>
  <div className="pink-stage-grid" aria-hidden="true"/>
  <div className="pink-spotlights" aria-hidden="true">
   {stageMembers.map((member,i)=><span key={member.name}
     className={'pink-stage-beam '+(lit>i?'is-lit ':'')+(active===i?'is-beat-lit':'')}
     style={{'--beam':member.tone} as CSSProperties}/>)}
  </div>
  <div className="pink-stage-name">PINK <span>RUSH!</span><b>✦</b></div>
  <div className="pink-stage-member-row" aria-hidden="true">
   {stageMembers.map((m,i)=><div className={'pink-performer '+(finale||lit>i+1?'is-ready':'')}
      key={m.name} style={{'--tone':m.tone} as CSSProperties}>
     <div className={'pink-performer-hair pink-hair-'+m.hair}/><div className="pink-performer-face"/>
     <div className="pink-performer-outfit"/><small>{m.name}</small>
   </div>)}
  </div>
  <div className="pink-stage-riser"/>
  <div className="pink-stage-lights" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i} className={lit>=4?'is-on':''}/>)}</div>
  <div className="pink-stage-audience" aria-hidden="true">
   {Array.from({length:23},(_,i)=><span key={i} style={{'--delay':(i%7)*.13+'s'} as CSSProperties}>{i%3===0?'🩷':'✦'}</span>)}
  </div>
  {finale&&<div className="pink-stage-confetti" aria-hidden="true">
   {Array.from({length:24},(_,i)=><i key={i} style={{'--x':(i*37)%100+'%','--delay':(i%8)*.15+'s'} as CSSProperties}/>)}
  </div>}
  <div className="pink-stage-caption">{finale?'✨ MOLLY’S VERY OWN ENCORE ✨':lit>6?'ENCORE UNLOCKED':'A MEMORY-LANE CONCERT FOR ONE SPECIAL BLINK'}</div>
 </div>;
}
export default function PinkRush({today,progress,setProgress,onHome}:Props){
 const [mode,setMode]=useState<'daily'|'practice'>('daily');
 const [replay,setReplay]=useState(0);
 const [light,setLight]=useState(-1);
 const [previewing,setPreviewing]=useState(false);
 const [sound,setSound]=useState(false);
 const audio=useRef<AudioContext|null>(null);
 const session=mode==='daily'?(progress.daily[today]??pinkDailySession(today)):progress.practice;
 const round=session?getActivePinkRound(session):null;
 const question=round?pinkChallengeFor(round.id):null;
 const lit=session?session.index+(round?.status==='won'?1:0):0;
 const done=session?.completed??false;
 const score=session?pinkShowScore(session):0;
 const encore=question?.kind==='encore'&&round?.status==='playing';
 function ping(n:number){
  if(!sound)return;
  try{
   const ctx=audio.current??new window.AudioContext();audio.current=ctx;
   if(ctx.state==='suspended')void ctx.resume();
   const osc=ctx.createOscillator(),gain=ctx.createGain();
   osc.type='sine';osc.frequency.value=[330,440,523,659][n];
   gain.gain.setValueAtTime(.001,ctx.currentTime);
   gain.gain.exponentialRampToValueAtTime(.13,ctx.currentTime+.025);
   gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);
   osc.connect(gain);gain.connect(ctx.destination);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+.24);
  }catch{/* optional sound; visual pattern remains playable */}
 }
 useEffect(()=>{
  if(!encore||!question)return;
  const pattern=pinkEncorePattern(question.id);
  const timers:number[]=[];setPreviewing(true);setLight(-1);
  pattern.forEach((n,i)=>{
   timers.push(window.setTimeout(()=>setLight(n),400+i*710));
   timers.push(window.setTimeout(()=>setLight(-1),820+i*710));
  });
  timers.push(window.setTimeout(()=>{setPreviewing(false);setLight(-1)},450+pattern.length*710));
  return ()=>timers.forEach(window.clearTimeout);
 },[encore,question?.id,replay]);
 useEffect(()=>()=>{if(audio.current)void audio.current.close()},[]);
 function pick(choice:string){
  if(!question||!round||previewing||round.status!=='playing')return;
  if(question.kind==='encore')ping(Number(choice));
  setProgress(p=>applyPinkRound(p,mode,today,(r,c)=>choosePink(r,c,choice)));
 }
 function advance(){setProgress(p=>advancePink(p,mode,today));setReplay(0);setLight(-1)}
 function startPractice(){
  if(mode==='practice'&&round?.status==='playing'&&session&&session.index>0&&
   !window.confirm('Open a new show? Your finished performances and stars are safe.'))return;
  setProgress(p=>pinkNextPractice(p));setMode('practice');setReplay(0);setLight(-1);
 }
 function setShow(next:'daily'|'practice'){setMode(next);setReplay(0);setLight(-1)}
 const kindLabel=question?.kind==='track'?'GUESS THE TRACK':question?.kind==='era'?'ERA RUSH':
   question?.kind==='spotlight'?'SPOTLIGHT SHUFFLE':'LIGHTSTICK ENCORE';
 return <main className="game-page pink-rush-game">
  <button className="back-link" onClick={onHome}>← Back to Molly's arcade</button>
  <div className="pink-rush-hero"><div><span className="overline">GAME 06 / YOUR VIP BACKSTAGE PASS</span>
   <h1>PINK <em>RUSH!</em> <span>🖤🩷</span></h1>
   <p>An eight-round memory-lane concert made for Molly. Recognize the songs, revisit the eras, celebrate all four members and light up your very own encore.</p>
   <div className="pink-hero-tags"><span>✦ BLINK KNOWLEDGE</span><span>♡ NO TIMERS</span><span>♪ ONE HAPPY DIFFICULTY</span></div>
  </div><div className="pink-vip-ticket"><span>VIP</span><strong>MOLLY</strong><small>ALL ACCESS • FOREVER BLINK</small>🎟️</div></div>
  <div className="pink-mode-tabs" role="group" aria-label="Choose concert">
   <button aria-pressed={mode==='daily'} className={mode==='daily'?'is-active':''} onClick={()=>setShow('daily')}>☀ Today's show</button>
   <button aria-pressed={mode==='practice'} className={mode==='practice'?'is-active':''} onClick={()=>setShow('practice')}>🎤 Backstage replay</button>
   <button className="pink-new-show" onClick={startPractice}>✧ New practice concert</button>
  </div>
  <PinkStage lit={done?8:lit} finale={done} active={light}/>
  <div className="pink-show-meter">
   <span>🎟️ {done?'SHOW COMPLETE':session?'SETLIST '+(Math.min(8,session.index+1))+' / 8':'READY TO REHEARSE'}</span>
   <span>✨ {score} show points</span><span>🩷 {progress.stats.stars} Passport stars</span>
   <div className="pink-setlist-track"><div style={{width:(done?100:lit/8*100)+'%'}}/></div>
  </div>
  {mode==='practice'&&!session&&<section className="pink-empty-concert">
   <span>🎵</span><h2>Ready for a private comeback show?</h2>
   <p>Eight BLINK memories and one big finale. No timers, no difficulty tiers and no impossible trivia.</p>
   <button className="btn btn-primary" onClick={startPractice}>Start a practice show ↗</button>
  </section>}
  {done&&session&&<section className="pink-encore-result" role="status">
   <span className="pink-finale-crown">👑</span><span className="overline">THE LIGHTS ARE YOURS, MOLLY</span>
   <h2>BLACKPINK in your area… and Molly in the spotlight!</h2>
   <p>From SQUARE ONE to the latest era, you brought the memories back to life. The crowd goes wild. The night belongs to you. 🩷</p>
   <div className="pink-score-row"><strong>{score} / 480</strong><span>concert score</span><strong>8 / 8</strong><span>memories relived</span></div>
   <p className="pink-finale-note">All performances use original illustrations and light patterns, not licensed recordings.</p>
   <div className="pink-final-actions"><button className="btn btn-primary" onClick={startPractice}>Another concert ↗</button>
    <button className="btn btn-outline" onClick={onHome}>Back to the game shelf</button></div>
  </section>}
  {question&&round&&!done&&<section className="pink-challenge" aria-labelledby="pink-current-title">
   <div className="pink-challenge-heading"><div><span className="overline">ROUND {session!.index+1} • {kindLabel}</span>
    <h2 id="pink-current-title">{question.emoji} {question.title}</h2><p>{question.prompt}</p></div>
    <div className="pink-challenge-record"><span>{question.year}</span><small>{kindLabel}</small></div>
   </div>
   {question.kind==='era'&&<div className="pink-timeline-picked">{Array.from({length:3},(_,i)=><div key={i}>
    <small>0{i+1}</small><strong>{round.picks[i]??'Choose an era'}</strong></div>)}</div>}
   {question.kind==='encore'?<>
    <div className="pink-encore-instructions"><strong>Follow the lightstick pattern!</strong>
     <p>Watch the coloured beams above, then tap the four pads in the same order. Replay whenever you like. No time limit.</p></div>
    <div className="pink-encore-buttons">
     {pinkEncoreColors.map((c,i)=><button key={c.id} className={'pink-encore-pad '+(light===i?'is-shining':'')}
      style={{'--pad':c.color} as CSSProperties} disabled={previewing||round.status!=='playing'}
      onClick={()=>pick(String(i))} aria-label={'Play '+c.name+' light'}><span>{c.symbol}</span><small>{c.name}</small></button>)}
    </div>
    <div className="pink-beat-controls">
     <button className="btn btn-outline" disabled={previewing||round.status==='won'} onClick={()=>setReplay(n=>n+1)}>↻ {previewing?'Showing the sequence…':'Replay light sequence'}</button>
     <button className="btn btn-soft" aria-pressed={sound} onClick={()=>setSound(n=>!n)}>{sound?'🔊 Original soft tones on':'🔇 Optional sound'}</button>
     <span className="pink-beat-count">{round.picks.length}/{pinkEncorePattern(question.id).length} lights</span>
    </div>
   </>:<div className={'pink-answer-grid '+(question.kind==='spotlight'?'pink-member-choice':'')}>
    {question.options.map(choice=><button key={choice}
      disabled={round.status==='won'||(question.kind==='era'&&round.picks.includes(choice))}
      className={'pink-answer-option '+(question.kind==='era'&&round.picks.includes(choice)?'is-picked':'')}
      onClick={()=>pick(choice)}>
      {question.kind==='spotlight'?<span className="pink-member-monogram" aria-hidden="true">{choice[0]}</span>:
       <span className="pink-answer-shine" aria-hidden="true">✦</span>}
      <span>{choice}</span>{question.kind==='era'&&round.picks.includes(choice)&&<small>✓</small>}
     </button>)}
   </div>}
   <div className={'pink-feedback '+(round.status==='won'?'is-win':'')} role="status"><span>{round.status==='won'?'💖':'✧'}</span><p>{round.note}</p></div>
   {round.status==='won'?<div className="pink-round-victory"><span>✨ +{round.score} concert points!</span>
     <p>{pinkEncouragements[session!.index%pinkEncouragements.length]}</p>
     <button className="btn btn-primary" onClick={advance}>{session!.index===7?'Reveal the grand finale ↗':'Light up the next stage ↗'}</button>
    </div>:<div className="pink-no-pressure"><span>{round.mistakes>0?'💌 '+round.mistakes+' little detour(s) • still plenty of stars':'♡ Every memory counts'}</span><span>No timers • no game overs</span></div>}
  </section>}
  <section className="pink-memory-book"><div><span className="overline">THE BLINK SCRAPBOOK</span><h2>Every era, a little memory.</h2>
   <p>Debut excitement, iconic comeback years, four different solo journeys and the newest chapter. This is for a BLINK who remembers how it all felt.</p></div>
   <div className="pink-era-stickers">{['2016 • SQUARE ONE','2018 • SQUARE UP','2020 • THE ALBUM','2022 • BORN PINK','2025 • JUMP','2026 • DEADLINE'].map(x=><span key={x}>{x}</span>)}</div>
  </section>
  <p className="privacy-note">♡ Unofficial BLACKPINK fan tribute. Original stage art and optional synthesized tones only; no copyrighted recordings, videos or promotional photos. Release references checked against <a href="https://ygfamily.com/en/artists/blackpink/discography" target="_blank" rel="noreferrer">YG's official discography</a>. Scores stay in this browser.</p>
 </main>;
}
