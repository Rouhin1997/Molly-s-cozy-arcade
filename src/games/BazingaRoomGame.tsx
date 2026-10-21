import { useState, type Dispatch, type SetStateAction } from 'react';
import DifficultyPicker from '../components/DifficultyPicker';
import { BazingaSticker } from '../components/BazingaSticker';
import { readPreferredDifficulty, savePreferredDifficulty, type Difficulty } from '../lib/passport';
import { type BazingaProgress } from '../lib/bazinga';
import {
  rooms,roomCases,roomRules,roomRuleText,holdsRoomRule,dailyRoomCase,
  type RoomCase,
} from '../data/bazingaWorld';
import {
  newWorldRound,untouchedWorldRound,selectWorldGuest,placeWorldGuest,hintWorld,
  checkWorld,creditWorldRound,worldAttempts,worldHints,worldOrder,
  nextWorldPractice,getWorldDaily,
  type WorldRound,
} from '../lib/bazingaWorld';

type Props={
  today:string;progress:BazingaProgress;setProgress:Dispatch<SetStateAction<BazingaProgress>>;
  onHome:()=>void;onClassic:()=>void;
};
const levelLabel:Record<Difficulty,string>={easy:'Cozy',medium:'Clever',hard:'Expert'};
const roomIcon:Record<string,string>={
  'four-a':'🛋️','four-b':'🌻',wolowitz:'🍽️',raj:'🕵️',
  cafeteria:'🥪',lab:'🔬',comic:'📚',cinema:'🎬',
};
const roomTraits:Record<string,string>={
  sofa:'sofa cushion', 'tv-view':'clear TV view',
  warm:'warm corner',breeze:'gentle cross-breeze',draft:'noticeable draft',
  uncomfortable:'less comfortable chair',kitchen:'near kitchen',snacks:'near snacks',
  window:'window-side',door:'door/exit-side',chair:'separate chair',
  'partial-view':'limited TV sightline',quiet:'quiet area', 'far-corner':'distant corner',
  dining:'dining chair',head:'head of the table',counter:'by the register',
  comic:'near comic shelves',front:'front row',back:'back row',center:'centre seat',
  aisle:'aisle access',screen:'best straight-on screen angle',desk:'workstation',
  experiment:'near equipment','lab-safe':'safety-protected workstation',
};
const zoneNames:Record<string,string>={
  apartment:'Apartment living room',penny:'Penny’s living room',dinner:'Family dining room',
  raj:'Raj’s party apartment',caltech:'University cafeteria',
  lab:'Physics lab',comic:'Comic shop',cinema:'Movie theatre',
};
export default function BazingaRoomGame({today,progress,setProgress,onHome,onClassic}:Props) {
  const [mode,setMode]=useState<'daily'|'practice'>('daily');
  const [difficulty,setDifficulty]=useState<Difficulty>(()=>readPreferredDifficulty('bazinga'));
  const [shelfOpen,setShelfOpen]=useState(false);
  const daily=getWorldDaily(progress,today,difficulty);
  const round=mode==='daily'?daily:progress.worldPractice??null;
  const caseData=round?roomCases.find(c=>c.id===round.caseId):undefined;
  const level=round?.difficulty??difficulty;
  const locked=!!round&&!untouchedWorldRound(round)&&(mode==='daily'||round.status==='playing');
  const room=caseData?rooms[caseData.room]:null;
  const rules=caseData?roomRules(caseData):[];
  const allPlaced=!!caseData&&!!round&&caseData.seatIds.every(id=>!!round.placements[id]);
  const currentOrder=round&&caseData?worldOrder(round,caseData):[];
  const available=roomCases.filter(c=>c.difficulty===level);

  function chooseLevel(next:Difficulty) {
    if(locked||next===level)return;
    setDifficulty(next);
    savePreferredDifficulty('bazinga',next);
    setShelfOpen(false);
    if(mode==='daily'){
      setProgress(prev=>({...prev,worldDaily:{...prev.worldDaily,[today]:newWorldRound(dailyRoomCase(today,next))}}));
    } else if(round){
      // Switching tiers before the first move starts a real case from that tier.
      setProgress(prev=>{
        const candidate=nextWorldPractice(prev,next);
        return {...prev,worldPractice:candidate,worldRecent:[...(prev.worldRecent??[]),candidate.caseId].slice(-5)};
      });
    }
  }
  function startCase(c:RoomCase){
    if(mode==='practice'&&round&&round.status==='playing'&&!untouchedWorldRound(round)&&
      !window.confirm('Start a different episode? Your unfinished arrangement will be replaced.'))return;
    setProgress(prev=>({...prev,worldPractice:newWorldRound(c),
      worldRecent:[...(prev.worldRecent??[]),c.id].slice(-5)}));
    setDifficulty(c.difficulty);
    savePreferredDifficulty('bazinga',c.difficulty);
    setShelfOpen(false);
    setMode('practice');
  }
  function randomCase(levelOverride:Difficulty=level){
    if(mode==='practice'&&round&&round.status==='playing'&&!untouchedWorldRound(round)&&
      !window.confirm('Start a fresh episode and replace this unfinished arrangement?'))return;
    setProgress(prev=>{
      const next=nextWorldPractice(prev,levelOverride);
      return {...prev,worldPractice:next,worldRecent:[...(prev.worldRecent??[]),next.caseId].slice(-5)};
    });
    setShelfOpen(false);setMode('practice');
  }
  function changeRound(transform:(r:WorldRound,c:RoomCase)=>WorldRound){
    setProgress(prev=>{
      const existing=mode==='daily'?getWorldDaily(prev,today,difficulty):prev.worldPractice;
      if(!existing)return prev;
      const c=roomCases.find(item=>item.id===existing.caseId);
      if(!c)return prev;
      const next=transform(existing,c);
      if(next===existing)return prev;
      const revised=mode==='daily'
        ? {...prev,worldDaily:{...prev.worldDaily,[today]:next}}
        : {...prev,worldPractice:next};
      return existing.status==='playing'&&next.status!=='playing'?creditWorldRound(revised,next):revised;
    });
  }

  return <main className="game-page bazinga-world-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="game-head">
      <div><span className="overline">THE LITTLE PUZZLE CLUB / GAME 04 · SPECIAL EDITION</span>
        <h1><span aria-hidden="true">⚛️</span> Bazinga! Lab</h1>
        <p>Guest lists, cursed seats, emergency drafts, and one very specific couch cushion.</p>
      </div><span className="decorative-berry" aria-hidden="true">✳</span>
    </div>
    <div className="bazinga-edition-bar">
      <div><strong>🏠 Room Adventures</strong><small>Eight places · eighteen playable episodes</small></div>
      <button type="button" onClick={onClassic}>↩ Classic seating puzzles</button>
    </div>
    <div className="mode-tabs" role="group" aria-label="Bazinga room adventures mode">
      <button className={mode==='daily'?'selected':''} aria-pressed={mode==='daily'} onClick={()=>{setMode('daily');setShelfOpen(false)}}>☀ Daily episode</button>
      <button className={mode==='practice'?'selected':''} aria-pressed={mode==='practice'} onClick={()=>setMode('practice')}>✿ Episode collection</button>
    </div>
    <DifficultyPicker value={level} onChange={chooseLevel} disabled={locked}
      lockedMessage="This episode has begun or finished. Choose the next level before a new practice episode."/>
    <div className="mode-intro"><span>📐</span>
      <p><strong>A different apartment. A different argument.</strong> Pick a character sticker, then place them into a room-map seat. Every rule must be true. Cozy has four guests and two hints, Clever has five and one hint, Expert has six and no hints. Once you place somebody, the difficulty locks.</p>
    </div>

    {mode==='practice'&&<section className="bazinga-episode-shelf">
      <div className="bazinga-shelf-heading">
        <div><span className="overline">PICK AN EPISODE</span><h2>The little episode guide</h2>
          <p>{available.length} {levelLabel[level]} adventures — each with its own seating puzzle.</p></div>
        <button className="btn btn-outline" onClick={()=>setShelfOpen(v=>!v)}>{shelfOpen?'Hide episodes':'Browse episodes'} ▾</button>
      </div>
      {(shelfOpen||!round)&&<div className="bazinga-episode-grid">
        {available.map((c,index)=><button key={c.id} className={`bazinga-episode-card ${round?.caseId===c.id?'is-playing':''}`} onClick={()=>startCase(c)}>
          <span className="bazinga-episode-icon">{roomIcon[c.room]}</span>
          <span className="overline">EPISODE {String(index+1).padStart(2,'0')} · {rooms[c.room].name}</span>
          <strong>{c.title}</strong><small>{c.episode}</small>
          <em>{round?.caseId===c.id?'CURRENT EPISODE':'PLAY THIS STORY ↗'}</em>
        </button>)}
      </div>}
      {!round&&<div className="bazinga-quick-start">
        <p>Or let the lab choose your next episode.</p>
        <button className="btn btn-primary" onClick={()=>randomCase()}>Surprise me ↗</button>
      </div>}
    </section>}

    {round&&caseData&&room&&<section className="bazinga-world-case">
      <div className="bazinga-world-head">
        <div><span className="overline">{mode==='daily'?'TODAY’S LITTLE SITCOM MYSTERY':'ROOM ADVENTURE'} · {caseData.episode}</span>
          <h2>{caseData.title}</h2><p>{caseData.story}</p></div>
        <div className="bazinga-location-ticket">
          <span>{roomIcon[room.id]}</span><strong>{room.name}</strong>
          <small>{levelLabel[level]} · {caseData.solution.length} guests</small>
        </div>
      </div>
      <div className="bazinga-world-status">
        <span>🧩 {worldAttempts(level)-round.attempts} checks left</span>
        <span>💡 {worldHints(level)-round.hints} hints left</span>
        <span>✨ {level==='hard'?'2×':level==='medium'?'1.5×':'1×'} rewards</span>
      </div>
      <div className="bazinga-world-layout">
        <section className="bazinga-room-card" aria-label={`Interactive seating map: ${room.name}`}>
          <div className="bazinga-room-top"><strong>🏠 {zoneNames[room.theme]}</strong><small>Original schematic · not a studio blueprint</small></div>
          <div className="bazinga-map-scroll"><div className={`bazinga-room-map room-theme-${room.theme}`} role="group" aria-label="Room seats and furniture">
            <div className="room-floor-object" aria-hidden="true"/>
            {room.props.map((item,i)=><div key={i} className={`bazinga-room-prop room-prop-${item.label.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={item.label}>
              <span aria-hidden="true">{item.icon}</span><small>{item.label}</small>
            </div>)}
            {caseData.seatIds.map((id,i)=>{
              const s=room.seats.find(seat=>seat.id===id)!;
              const name=round.placements[id],isFixed=round.fixed.includes(id);
              return <button type="button" key={id} className={`bazinga-map-seat ${name?'is-occupied':''} ${isFixed?'is-fixed':''} ${round.selected?'has-selection':''}`}
                style={{left:`${s.x}%`,top:`${s.y}%`}} disabled={round.status!=='playing'||isFixed}
                title={s.label}
                aria-label={`${s.label}: ${name??'empty'}${isFixed?', fixed by a hint':''}`}
                onClick={()=>changeRound((r,c)=>placeWorldGuest(r,c,id))}>
                <span className="bazinga-chair-number">{i+1}</span>
                {name?<BazingaSticker name={name} size={55}/>:<span className="bazinga-chair-empty" aria-hidden="true">+</span>}
                <strong>{name??s.label}</strong>
                {isFixed&&<span className="bazinga-chair-fixed">✦</span>}
              </button>;
            })}
          </div></div>
          <details className="bazinga-room-guide">
            <summary>🗺️ Inspect the seats: drafts, comfort and sightlines</summary>
            <div className="bazinga-room-guide-grid">
              {caseData.seatIds.map((id,i)=>{
                const chair=room.seats.find(s=>s.id===id)!;
                return <div key={id}>
                  <strong>#{i+1} {chair.label}</strong>
                  <span>{chair.tags.filter(tag=>tag!=='spot').map(tag=>roomTraits[tag]??tag).join(' · ')}</span>
                </div>;
              })}
            </div>
            <p>Distances and neighbours are shown by their positions on the map. Seat properties are fixed; changing characters never changes the room.</p>
          </details>
          <p className="bazinga-room-instruction">{round.selected?<><strong>{round.selected}</strong> is selected. Tap a seat to place or swap them.</>:'Select a sticker below, then tap a chair. You may also tap an occupied chair to clear it.'}</p>
          <div className="bazinga-world-cast" role="group" aria-label="Choose a character to place">
            {caseData.solution.map(name=>{
              const fixed=round.fixed.some(id=>round.placements[id]===name);
              const placed=Object.values(round.placements).includes(name);
              return <button key={name} className={`bazinga-world-guest ${round.selected===name?'is-selected':''} ${placed?'is-placed':''}`}
                disabled={round.status!=='playing'||fixed} aria-pressed={round.selected===name}
                onClick={()=>changeRound((r,c)=>selectWorldGuest(r,c,name))}>
                <BazingaSticker name={name} size={58}/>
                <strong>{name}</strong>
                <small>{fixed?'🔒 Fixed':placed?'Seated':'Ready'}</small>
              </button>;
            })}
          </div>
        </section>
        <section className="bazinga-world-rules" aria-label="Roommate agreement clues">
          <div className="bazinga-rule-paper-head">
            <span>📜</span><div><h3>Roommate Agreement</h3><small>The episode-specific seating clauses</small></div>
          </div>
          <div className="bazinga-rule-paper-intro">To preserve domestic peace, all {rules.length} clauses must hold at the same time.</div>
          <ol className="bazinga-world-clues">
            {rules.map((rule,i)=>{
              const showFeedback=round.attempts>0&&round.status==='playing'&&allPlaced&&level==='easy';
              return <li key={i}>
                <span className="bazinga-clue-index">{i+1}</span>
                <p>{roomRuleText(caseData,rule)}</p>
                {showFeedback&&<span className={holdsRoomRule(caseData,currentOrder,rule)?'rule-pass':'rule-fail'} aria-label={holdsRoomRule(caseData,currentOrder,rule)?'Rule satisfied':'Rule violated'}>{holdsRoomRule(caseData,currentOrder,rule)?'✓':'×'}</span>}
              </li>;
            })}
          </ol>
          <div className="bazinga-paper-footer">⚛️ Spatial clues use actual distances, room objects and chair properties—not a straight-line seating order.</div>
        </section>
      </div>
      {round.status==='playing'?<div className="bazinga-world-controls">
        <p role="status">{round.feedback}</p>
        <div>
          <button className="btn btn-outline" disabled={round.hints>=worldHints(level)} onClick={()=>changeRound(hintWorld)}>💡 Reveal a seat ({worldHints(level)-round.hints})</button>
          <button className="btn btn-primary" disabled={!allPlaced} onClick={()=>changeRound(checkWorld)}>Submit arrangement ↗</button>
        </div>
      </div>:<section className={`bazinga-story-finale ${round.status==='won'?'is-win':'is-loss'}`} role="status">
        <div className="bazinga-finale-illustration">
          {round.status==='won'?<div className="bazinga-finale-group">{['Sheldon','Leonard','Penny','Amy'].map(n=><BazingaSticker key={n} name={n} size={83} expression="happy"/>)}</div>
          :<BazingaSticker name="Sheldon" size={148} expression="bazinga"/>}
          <span className="bazinga-finale-sparkle">✦</span>
        </div>
        <div className="bazinga-finale-copy">
          <span className="overline">{round.status==='won'?'THE ROOMMATE AGREEMENT IS SATISFIED':'A TECHNICAL OBJECTION HAS BEEN RAISED'}</span>
          <h3>{round.status==='won'?'An unusually generous assessment':'Bazinga!'}</h3>
          {round.status==='won'?<>
            <blockquote>“{caseData.winning}”</blockquote>
            <p>All {rules.length} constraints satisfied · {round.score} stars earned.</p>
          </>:<>
            <p className="bazinga-lose-line">You lose!</p>
            <details className="bazinga-solution-reveal">
              <summary>See the correct seating arrangement</summary>
              <p>{caseData.seatIds.map((id,i)=>`${i+1}. ${caseData.solution[i]} (${room.seats.find(seat=>seat.id===id)?.label})`).join(' · ')}</p>
            </details>
          </>}
        </div>
        <button className="btn btn-primary" onClick={()=>{setMode('practice');randomCase(level)}}>Next episode ↗</button>
      </section>}
    </section>}
    <p className="privacy-note">♡ Unofficial fan-made homage. The sticker portraits, episodes and maps are original creations inspired by the series, not official Warner Bros. artwork or exact set plans.</p>
  </main>;
}
