import '../birthday.css';
import {useEffect,useState,type FormEvent} from 'react';
import {birthdayGiftOptions,BIRTHDAY_GIFT_YEAR,clearPreviewBirthdayCoupon,issueBirthdayCoupon,readBirthdayCoupon,writeBirthdayCoupon,type BirthdayGiftId,type BirthdayCoupon} from '../lib/birthdayCoupon';
import {
 birthdayWindow,birthdayBetaFromSearch,BIRTHDAY_EVENT_PUBLISHED,initialBirthdaySave,readBirthdaySave,writeBirthdaySave,
 birthdayEvidence,BIRTHDAY_PAIRS,cakeLocations,seatRules,birthdayQuestions,birthdayWhereHints,birthdayGuests,chairs,
 submitEvidencePair,submitCakeLocation,submitBirthdaySeating,answerBirthdayQuestion,unlockBirthdayVault,
 type BirthdaySave,type QuestionId
} from '../lib/birthdayQuest';

type Props={onHome:()=>void;onWallet:()=>void};
type SceneTransition={icon:string;eyebrow:string;title:string;message:string;next:string};
const intro=[
 {number:'01',icon:'🎂',name:'The cake caper',caption:'The 99 Files'},
 {number:'02',icon:'🛋️',name:'A very particular party',caption:'Bazinga! Lab'},
 {number:'03',icon:'🔐',name:'The hometown cipher',caption:'Who? What? Where? When?'},
];
const fireworks=['✦','✧','★','✦','✧','★','✦','✧','★','✦','★','✧'];

export default function BirthdayQuest({onHome,onWallet}:Props){
 const beta=birthdayBetaFromSearch(window.location.search);
 const [clock,setClock]=useState(()=>new Date());
 const year=birthdayWindow(clock).year;
 const [save,setSave]=useState<BirthdaySave>(()=>readBirthdaySave(beta,birthdayWindow(new Date()).year));
 const [selected,setSelected]=useState<string[]>([]);
 const [picked,setPicked]=useState<string>('Sheldon');
 const [feedback,setFeedback]=useState('');
 const [transition,setTransition]=useState<SceneTransition|null>(null);
 const [password,setPassword]=useState('');
 const [revealedPlaceHints,setRevealedPlaceHints]=useState(0);
 const [coupon,setCoupon]=useState<BirthdayCoupon|null>(()=>readBirthdayCoupon(beta,BIRTHDAY_GIFT_YEAR));
 const [pendingGift,setPendingGift]=useState<BirthdayGiftId|null>(null);
 const [giftError,setGiftError]=useState('');
 const gate=birthdayWindow(clock);
 const available=beta||(BIRTHDAY_EVENT_PUBLISHED&&gate.year===BIRTHDAY_GIFT_YEAR&&(gate.active||save.step>0));
 const allLinked=save.connected.length===BIRTHDAY_PAIRS.length;
 const questionsDone=save.answers.length===birthdayQuestions.length;
 const activeQuestion=birthdayQuestions.find(q=>!save.answers.includes(q.id));
 useEffect(()=>{
  const refresh=()=>setClock(new Date());
  const timer=window.setInterval(refresh,15000);
  window.addEventListener('focus',refresh);
  document.addEventListener('visibilitychange',refresh);
  return()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh)};
 },[]);
 function update(next:BirthdaySave){
  setSave(next);
  writeBirthdaySave(next,beta,year);
 }
 function connect(){
  if(selected.length!==2)return;
  const result=submitEvidencePair(save,selected[0],selected[1]);
  update(result.save);setFeedback(result.message);setSelected([]);
 }
 function locate(id:string){
  const result=submitCakeLocation(save,id);
  update(result.save);setFeedback(result.message);
  if(result.correct)setTransition({
   icon:'🎂',eyebrow:'CASE 99-B · CLOSED',title:'The cake is saved!',
   message:'Jake had filed the birthday cake as evidence. Amy secures it, Boyle wants a photo, and Holt has several administrative concerns.',
   next:'Take the cake to the party'
  });
 }
 function place(index:number){
  if(index===2)return;
  const next=[...save.seating];
  const previous=next.indexOf(picked);
  if(previous>=0)next[previous]='';
  next[index]=picked;
  update({...save,seating:next});setFeedback('');
 }
 function checkSeats(){
  const result=submitBirthdaySeating(save);
  update(result.save);setFeedback(result.message);
  if(result.correct)setTransition({
   icon:'🍰',eyebrow:'SEATING AGREEMENT · APPROVED',title:'Sheldon will eat cake!',
   message:'The birthday table has passed his six-point inspection. Penny rolls her eyes, Leonard exhales, and everyone gets a slice.',
   next:'Open the mysterious present'
  });
 }
 function answer(id:QuestionId,choice:string){
  const result=answerBirthdayQuestion(save,id,choice);
  update(result.save);setFeedback(result.message);
 }
 function unlock(e:FormEvent){
  e.preventDefault();
  const result=unlockBirthdayVault(save,password);
  update(result.save);setFeedback(result.message);
  if(result.correct)setPassword('');
 }
 function confirmGift(){
  if(save.step!==3||!pendingGift||coupon)return;
  const existing=readBirthdayCoupon(beta,BIRTHDAY_GIFT_YEAR);
  const next=issueBirthdayCoupon(existing,pendingGift,new Date(),BIRTHDAY_GIFT_YEAR);
  if(!writeBirthdayCoupon(next,beta)){
   setGiftError('Your coupon could not be saved in this browser. Please enable site storage and try again.');
   return;
  }
  setCoupon(next);setPendingGift(null);setGiftError('');
 }
 function resetBeta(){
  if(!beta||!window.confirm('Restart the creator preview, including its test coupon? The real birthday wallet will not change.'))return;
  const fresh=initialBirthdaySave();
  clearPreviewBirthdayCoupon();
  update(fresh);setCoupon(null);setPendingGift(null);setGiftError('');
  setSelected([]);setPicked('Sheldon');setFeedback('Preview restarted.');setTransition(null);setPassword('');setRevealedPlaceHints(0);
 }
 return <main className="birthday-quest">
  <button className="back-link birthday-back" onClick={onHome}>← Return to Molly's Arcade</button>
  <header className="birthday-quest-hero">
   <div className="birthday-hero-sparkles" aria-hidden="true">{fireworks.map((s,i)=><span key={i}>{s}</span>)}</div>
   <span className="birthday-hero-overline">MOLLY'S COZY ARCADE PRESENTS</span>
   <div className="birthday-hero-emblem" aria-hidden="true">🎂</div>
   <h1>The Great <em>Birthday Caper</em></h1>
   <p>One missing cake. One very particular physicist. One present with an unreasonable security system.</p>
   <div className="birthday-hero-subline"><span>13 NOVEMBER</span><span>✦</span><span>THREE LITTLE ADVENTURES</span><span>✦</span><span>MADE FOR MOLLY</span></div>
  </header>
  {beta&&<aside className="birthday-beta-band" role="note">
   <div><strong>🧪 Creator's beta rehearsal</strong><span>Preview access is enabled. This run has its own save and cannot open a real birthday gift.</span></div>
   <button className="btn btn-outline" onClick={resetBeta}>Restart beta ↺</button>
  </aside>}
  {!available?<section className="birthday-gate">
   <div className="birthday-gate-art" aria-hidden="true">🎀　🔒　🎁</div>
   <span className="overline">THE PARTY INVITATION</span>
   <h2>Shhh… the guests are almost here.</h2>
   <p>The birthday caper is having its final rehearsal. The adventure is planned for <strong>13 November</strong>, using the arcade's Rome-time calendar. The gift vault will open only when the surprise is ready.</p>
   <div className="birthday-gate-date"><strong>13 NOV</strong><span>Opening day ✦</span></div>
   <button className="btn btn-primary" onClick={onHome}>Back to the arcade</button>
  </section>:<>
   <nav className="birthday-steps" aria-label="Birthday quest chapters">
    {intro.map((item,i)=><div key={item.number} className={'birthday-step '+(save.step===i?'is-active ':save.step>i?'is-cleared ':'')+(save.step<i?'is-locked':'')}>
     <span className="birthday-step-number">{save.step>i?'✓':item.number}</span>
     <span className="birthday-step-icon" aria-hidden="true">{item.icon}</span>
     <div><small>{item.caption}</small><strong>{item.name}</strong></div>
     <span className="birthday-step-state">{save.step>i?'DONE':save.step===i?'NOW PLAYING':'LOCKED'}</span>
    </div>)}
   </nav>
   {save.step===0&&<section className="birthday-stage birthday-cake-stage" aria-labelledby="birthday-stage-title">
    <div className="birthday-chapter-heading"><span>ACT ONE · THE 99 FILES</span><h2 id="birthday-stage-title">Jake lost the birthday cake.</h2><p>“Okay, slight situation. I definitely picked it up. I may have subsequently hidden it too well.” — Jake, probably</p></div>
    <div className="birthday-story-scenery" aria-hidden="true"><span>🚔</span><div><strong>99</strong><small>PRECINCT</small></div><span>🕵️</span><span>🎈</span><span>📦</span></div>
    <div className="birthday-case-intro"><strong>CAPTAIN HOLT'S BRIEFING</strong><p>Four exhibits survived Jake's “flawless plan.” Pair related evidence to establish <strong>two deductions</strong>, then decide where the squad should look.</p></div>
    <h3 className="birthday-subheading">Evidence board <small>{save.connected.length}/2 connections</small></h3>
    <div className="birthday-evidence-grid">
     {birthdayEvidence.map(item=><button key={item.id} type="button" aria-pressed={selected.includes(item.id)} className={'birthday-evidence '+(selected.includes(item.id)?'is-selected ':'')+(save.connected.some(id=>BIRTHDAY_PAIRS.find(p=>p.id===id)?.items.some(x=>x===item.id))?'is-linked':'')} onClick={()=>{
      setFeedback('');
      setSelected(prev=>prev.includes(item.id)?prev.filter(x=>x!==item.id):[...prev.slice(-1),item.id]);
     }}>
      <span className="birthday-evidence-top"><small>{item.type}</small><b>{selected.includes(item.id)?'✓ SELECTED':'EXHIBIT'}</b></span>
      <span className="birthday-evidence-emoji" aria-hidden="true">{item.icon}</span>
      <strong>{item.label}</strong><p>{item.body}</p>
     </button>)}
    </div>
    <div className="birthday-evidence-controls">
     <span>Select two exhibits which confirm the same detail.</span>
     <button className="btn btn-primary" disabled={selected.length!==2} onClick={connect}>Connect the evidence ↗</button>
    </div>
    {save.connected.length>0&&<div className="birthday-deductions">{save.connected.map(id=><p key={id}>✦ {BIRTHDAY_PAIRS.find(pair=>pair.id===id)?.label}</p>)}</div>}
    {allLinked&&<div className="birthday-location-board">
     <h3>Where is the cake?</h3><p>You've followed the trail. Pick the most defensible location.</p>
     <div className="birthday-locations">{cakeLocations.map(place=><button key={place.id} onClick={()=>locate(place.id)}>
      <span aria-hidden="true">{place.icon}</span><strong>{place.label}</strong><small>{place.detail}</small>
     </button>)}</div>
    </div>}
    {feedback&&<p className="birthday-feedback" role="status">{feedback}</p>}
    {save.evidenceTries+save.cakeTries>=3&&<p className="birthday-gentle-hint">💡 Terry's tip: compare the shop receipt with the camera, and Jake's code with the storage register.</p>}
   </section>}
   {save.step===1&&<section className="birthday-stage birthday-seating-stage" aria-labelledby="birthday-stage-title">
    <div className="birthday-chapter-heading"><span>ACT TWO · BAZINGA! LAB</span><h2 id="birthday-stage-title">Six chairs. One very stubborn Sheldon.</h2><p>The cake has arrived, but Sheldon refuses a bite until the seating arrangement satisfies his personal protocol.</p></div>
    <div className="birthday-sheldon-callout"><span aria-hidden="true">⚛️</span><div><strong>Sheldon's Party Seating Protocol</strong><p>Six conditions. Six guests. No exceptions, especially not on cake day.</p></div></div>
    <h3 className="birthday-subheading">The rules <small>Read carefully</small></h3>
    <ol className="birthday-rules">{seatRules.map(rule=><li key={rule}>{rule}</li>)}</ol>
    <div className="birthday-table-caption"><span>🚪 ENTRANCE · CHAIR B</span><span>🎂 BIRTHDAY TABLE</span><span>🪟 WINDOW END · CHAIR F</span></div>
    <div className="birthday-seating-scene">
     <div className="birthday-place-settings">{chairs.map((chair,i)=><button type="button" key={chair} disabled={i===2} className={'birthday-chair '+(i===2?'is-molly ':'')+(save.seating[i]?'is-filled':'')} onClick={()=>place(i)} aria-label={'Chair '+chair+', '+(save.seating[i]||'empty')+(i===2?', reserved for Molly':', assign selected guest')}>
      <small>CHAIR {chair}</small><span>{i===2?'👑':save.seating[i]?'🪑':'＋'}</span><strong>{save.seating[i]||'Tap to seat'}</strong>
     </button>)}</div>
     <div className="birthday-table-surface"><span aria-hidden="true">🍽️</span><span>HAPPY BIRTHDAY, MOLLY</span><span aria-hidden="true">🍰</span></div>
    </div>
    <div className="birthday-guest-selector"><strong>Choose a guest, then tap their chair</strong><div>
     {birthdayGuests.filter(name=>name!=='Molly').map(name=><button key={name} className={picked===name?'is-picked':''} aria-pressed={picked===name} onClick={()=>setPicked(name)}>{name}{save.seating.includes(name)?' ✓':''}</button>)}
    </div></div>
    <div className="birthday-seating-actions"><button className="btn btn-outline" onClick={()=>{update({...save,seating:['','','Molly','','','']});setFeedback('All chairs reset. Molly keeps the birthday seat.')}}>Clear chairs ↺</button>
     <button className="btn btn-primary" onClick={checkSeats}>Ask Sheldon to inspect ↗</button></div>
    {feedback&&<p className="birthday-feedback" role="status">{feedback}</p>}
    {save.seatingTries>=2&&<p className="birthday-gentle-hint">💡 Amy can only sit in one remaining chair beside Molly if she avoids B. Start there, then work through the neighbours.</p>}
   </section>}
   {save.step===2&&<section className="birthday-stage birthday-cipher-stage" aria-labelledby="birthday-stage-title">
    <div className="birthday-chapter-heading"><span>ACT THREE · WHO? WHAT? WHERE? WHEN?</span><h2 id="birthday-stage-title">The birthday vault has a password.</h2><p>Sheldon has gift-wrapped a security problem. Crack three field notes and discover the place that makes this gift Molly's.</p></div>
    <div className="birthday-vault-visual" aria-hidden="true"><span>🎁</span><span className="birthday-vault-lock">🔒</span></div>
    <h3 className="birthday-subheading">The four W's <small>{save.answers.length}/3 notes decoded</small></h3>
    <div className="birthday-fieldnotes">{birthdayQuestions.map(q=>{
     const done=save.answers.includes(q.id);
     const active=activeQuestion?.id===q.id;
     return <article key={q.id} className={'birthday-fieldnote '+(done?'is-done ':active?'is-open ':'is-closed')}>
      <header><span aria-hidden="true">{q.icon}</span><strong>{q.category}</strong><small>{done?'✓ SOLVED':active?'OPEN NOTE':'SEALED NOTE'}</small></header>
      {done?<p>{q.note}</p>:active?<><p>{q.question}</p><div className="birthday-choices">
       {q.choices.map(choice=><button key={choice} onClick={()=>answer(q.id,choice)}>{choice}</button>)}
      </div></>:<p>Unlock the previous note to read this one.</p>}
     </article>;
    })}</div>
    {questionsDone&&<div className="birthday-where-dossier">
     <div className="birthday-where-title"><span aria-hidden="true">📍</span><div><span className="overline">FINAL FIELD NOTE · WHERE?</span><h3>Where did Molly's story begin?</h3></div></div>
     <blockquote className="birthday-where-riddle">“The password is geographically specific, historically significant to the recipient, and emotionally meaningful. I find the third criterion scientifically questionable, but Amy insisted.” <span>— Sheldon</span></blockquote>
     <p>One location. Four optional clues. You can try the password now, or reveal the hints one at a time.</p>
     <div className="birthday-hint-trail" aria-live="polite">
      {birthdayWhereHints.slice(0,revealedPlaceHints).map(hint=><div className="birthday-where-hint" key={hint.id}>
       <span aria-hidden="true">{hint.icon}</span><div><strong>{hint.label}</strong><p>{hint.text}</p></div>
      </div>)}
     </div>
     <form onSubmit={unlock} className="birthday-code-form">
      <label htmlFor="birthday-code-input">Enter the hometown password</label>
      <div><input id="birthday-code-input" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="off" placeholder="The town where it all began…" maxLength={42} required/>
      <button className="btn btn-primary" type="submit">Unlock the gift ↗</button></div>
     </form>
     {revealedPlaceHints<birthdayWhereHints.length&&<button className="birthday-hint-action" type="button" onClick={()=>setRevealedPlaceHints(n=>Math.min(n+1,birthdayWhereHints.length))}>💡 Reveal hint {revealedPlaceHints+1} of {birthdayWhereHints.length}</button>}
    </div>}
    {feedback&&<p className="birthday-feedback" role="status">{feedback}</p>}
   </section>}
   {save.step===3&&<section className="birthday-finale" aria-labelledby="birthday-finale-title">
    <div className="birthday-finale-stars" aria-hidden="true">✦　☆　✧　★　✦</div>
    <span className="overline">ALL THREE CHAPTERS COMPLETE</span>
    <div className="birthday-finale-gift" aria-hidden="true"><span>🎁</span><b>✧</b></div>
    <h2 id="birthday-finale-title">Happy Birthday, Molly! ♡</h2>
    <p className="birthday-finale-lead">The 99 rescued your cake. Sheldon approved the seats. And you remembered exactly where your story began.</p>
    <div className="birthday-finale-ceremony">
     <span aria-hidden="true">🎂</span><div><strong>YOUR BIRTHDAY VAULT</strong><small>🔓 UNLOCKED</small><p>The surprise gift has not been placed inside yet. This is the beta's celebratory placeholder—not a coupon or redeemable reward.</p></div><span aria-hidden="true">🎀</span>
    </div>
    <p className="birthday-finale-note">From a little place called home to every lovely adventure still ahead. May there always be cake, laughter and people who are delighted you exist.</p>
    <button className="btn btn-primary" onClick={onHome}>Back to your cozy arcade ♡</button>
   </section>}
  </>}
  {transition&&<div className="birthday-overlay" role="presentation"><section className="birthday-transition" role="dialog" aria-modal="true" aria-labelledby="birthday-transition-title">
   <div className="birthday-transition-stars" aria-hidden="true">✦ ✧ ✦ ✧ ✦</div><span className="birthday-transition-icon" aria-hidden="true">{transition.icon}</span>
   <span className="overline">{transition.eyebrow}</span><h2 id="birthday-transition-title">{transition.title}</h2><p>{transition.message}</p>
   <button autoFocus className="btn btn-primary" onClick={()=>{setTransition(null);setFeedback('');window.scrollTo({top:0,behavior:'smooth'})}}>{transition.next} ↗</button>
  </section></div>}
  <p className="birthday-unofficial">♡ A lovingly made, unofficial fan celebration inspired by familiar TV characters. Not affiliated with any series or studio.</p>
 </main>;
}
