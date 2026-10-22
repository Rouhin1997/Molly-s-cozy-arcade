import {useState,type KeyboardEvent} from 'react';
import {braveStealthInitial,braveStealthMap,braveStealthMove,braveStealthComplete,braveGuardColumn,
 type BraveStealthAction} from '../lib/braveStealth';
const buttons:[BraveStealthAction,string][]=[
 ['up','↑ North'],['left','← West'],['down','↓ South'],['right','East →'],['wait','Wait one step'],['distract','Send the triplets']
];
export default function BraveCastleSneak({onComplete}:{onComplete:()=>void}){
 const [state,setState]=useState(braveStealthInitial);
 const [notice,setNotice]=useState('The guard watches the next tile beside him, too. Each step advances his patrol. Hide in alcoves or use the triplets’ distraction.');
 const [celebrated,setCelebrated]=useState(false);
 function act(a:BraveStealthAction){
  if(celebrated)return;
  const x=braveStealthMove(state,a);
  setState(x.state);
  if(x.event==='caught')setNotice('A guard spots you! You duck behind the stair and try again. Nothing is lost.');
  else if(x.event==='distract')setNotice('CLANG! A pie tin rings through the hall. The triplets have four turns of the guard’s attention.');
  else if(x.event==='blocked')setNotice('The stone wall blocks that direction. Choose another route.');
  else if(x.event==='wait')setNotice('You hold still and watch the next patrol step.');
  else if(x.event==='win'){setNotice('You slip through the gallery unnoticed. The triplets give a silent cheer.');setCelebrated(true);onComplete()}
  else setNotice('Quiet footsteps carry you along the gallery.');
 }
 function onKey(event:KeyboardEvent<HTMLElement>){
  if(event.target instanceof HTMLElement && event.target.closest('button'))return;
  const keymap:Record<string,BraveStealthAction>={
   ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',
   w:'up',a:'left',s:'down',d:'right',' ':'wait'
  };
  const actId=keymap[event.key]??keymap[event.key.toLowerCase()];
  if(actId){event.preventDefault();act(actId)}
 }
 const guard=braveGuardColumn(state.tick),next=braveGuardColumn(state.tick+1);
 return <section className="brave-stealth-game" aria-label="Sneak past the predictable castle guard" onKeyDown={onKey} tabIndex={0}>
  <div className="brave-stealth-scene">
   <div className="brave-stealth-caption"><span>THE WEST GALLERY</span><strong>The guard sees his own tile and its neighbours</strong></div>
   <div className="brave-stealth-board" style={{gridTemplateColumns:'repeat(13,1fr)'}} aria-hidden="true">
    {braveStealthMap.join('').split('').map((tile,i)=><div key={i}
     className={'brave-stealth-cell '+(tile==='#'?'is-stone':'is-floor')+
      ((Math.floor(i/13)===2||Math.floor(i/13)===3)&&[4,7,10].includes(i%13)?' is-alcove':'')}>
     {Math.floor(i/13)===1&&i%13===guard&&state.distraction===0&&<span className="brave-stealth-guard">🛡️</span>}
     {tile==='E'&&<span className="brave-stealth-door">✦</span>}
     {state.position===i&&<span className="brave-stealth-player">🏹</span>}
    </div>)}
   </div>
   <div className="brave-stealth-legend">🏹 Molly & Merida · 🛡️ Guard · ✦ Secret passage · Alcoves hide you</div>
  </div>
  <div className="brave-stealth-panel">
   <div className="brave-stealth-indicators">
    <span>Guard now: column {guard}</span><span>Next: column {next}</span>
    <span>Distraction: {state.distraction} turns</span>
    <span>Spotted: {state.caught} {state.caught===1?'time':'times'}</span>
   </div>
   <p role="status" aria-live="polite">{notice}</p>
   <div className="brave-stealth-buttons">
    {buttons.map(([id,label])=><button key={id} onClick={()=>act(id)}
     disabled={celebrated||(id==='distract'&&state.usedDistraction)}>{label}</button>)}
   </div>
   <button className="brave-stealth-reset" onClick={()=>{setState(braveStealthInitial());setNotice('The gallery falls quiet once more.');setCelebrated(false)}}>↶ Try from the gallery door</button>
   {braveStealthComplete(state)&&<p className="brave-stealth-victory">✦ A clever, quiet crossing!</p>}
  </div>
 </section>;
}
