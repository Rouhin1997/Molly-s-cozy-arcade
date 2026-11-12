import {useEffect} from 'react';
import '../birthdayWelcome.css';

type Props={onClose:()=>void;onPlay:()=>void};

/** Opening-day invitation; no spoilers about which reward awaits in the vault. */
export default function BirthdayWelcomeModal({onClose,onPlay}:Props){
 useEffect(()=>{
  const oldOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return ()=>{document.body.style.overflow=oldOverflow};
 },[]);
 return <div className="birthday-welcome-backdrop" role="presentation" onMouseDown={onClose}>
  <section className="birthday-welcome-card" role="dialog" aria-modal="true"
   aria-labelledby="birthday-welcome-title" aria-describedby="birthday-welcome-description"
   onMouseDown={e=>e.stopPropagation()}
   onKeyDown={event=>{
    if(event.key==='Escape'){event.preventDefault();onClose();return}
    if(event.key!=='Tab')return;
    const controls=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));
    if(!controls.length)return;
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }}>
   <div className="birthday-welcome-confetti" aria-hidden="true">{['✦','✧','★','✦','✿','✧','✦','★','✧','✿','✦','★'].map((mark,i)=><span key={i}>{mark}</span>)}</div>
   <div className="birthday-welcome-bunting" aria-hidden="true">{Array.from({length:13},(_,i)=><span key={i}/>)}</div>
   <button className="birthday-welcome-close" aria-label="Dismiss birthday invitation" onClick={onClose}>×</button>
   <div className="birthday-welcome-illustration" aria-hidden="true">
    <span className="birthday-welcome-balloon birthday-welcome-balloon-left">🎈</span>
    <span className="birthday-welcome-cake">🎂</span>
    <span className="birthday-welcome-balloon birthday-welcome-balloon-right">🎈</span>
   </div>
   <span className="birthday-welcome-overline">13 NOVEMBER · A SPECIAL DAY AT THE ARCADE</span>
   <h2 id="birthday-welcome-title">Happy Birthday,<br/><em>Molly!</em> ♡</h2>
   <p id="birthday-welcome-description">The party is ready. Well… almost! Jake lost the cake, Sheldon has a seating crisis, and a mysterious present is waiting for you.</p>
   <div className="birthday-welcome-signet" aria-hidden="true">✧　🎀　✧</div>
   <button className="birthday-welcome-play" autoFocus onClick={onPlay}>Enter the Birthday Caper <span aria-hidden="true">↗</span></button>
   <button className="birthday-welcome-later" onClick={onClose}>I'll explore the arcade first</button>
  </section>
 </div>;
}
