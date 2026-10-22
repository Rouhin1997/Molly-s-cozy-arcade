import {useState} from 'react';
import {braveRuneOptions,braveRuneOrder} from '../data/braveCampaign';
import {braveRuneScore,braveRuneSolved} from '../lib/braveChallenges';

/** Untimed tactile rune arrangement; the Witch's logic is an actual deduction. */
export default function BraveRuneWorkshop({onSolve}:{onSolve:()=>void}){
 const [sequence,setSequence]=useState<string[]>([]);
 const [message,setMessage]=useState('Four carvings fit the spindle. One is a decoy. Listen to the riddle.');
 const [attempts,setAttempts]=useState(0);
 function place(id:string){
  if(sequence.includes(id)||sequence.length>=braveRuneOrder.length)return;
  setSequence([...sequence,id]);setMessage('The carved wood hums. Arrange all four marks before testing the spindle.');
 }
 function submit(){
  if(sequence.length!==braveRuneOrder.length)return;
  setAttempts(a=>a+1);
  if(braveRuneSolved(sequence,braveRuneOrder)){
   setMessage('The spindle turns! All four carvings bow in the correct order.');onSolve();
  }else{
   const correct=braveRuneScore(sequence,braveRuneOrder);
   setMessage(correct+' of 4 carvings are in their proper places. The Witch grins. Try a different arrangement.');
  }
 }
 return <section className="brave-rune-workshop" aria-label="Arrange the four Witch's runes">
  <div className="brave-rune-book">
   <span className="brave-kicker">THE WITCH’S RIDDLE</span>
   <p>“Root before current; light before warmth. The stream comes after the tree, and before the guiding star.”</p>
   <small>Four wooden runes tell the story of the road to the cottage. One carving was left here to mislead curious travellers.</small>
  </div>
  <div className="brave-rune-slots" aria-label="Your chosen rune order">
   {Array.from({length:4},(_,i)=>{
    const rune=braveRuneOptions.find(x=>x.id===sequence[i]);
    return <div key={i} className={'brave-rune-slot'+(rune?' is-placed':'')}>
      <small>THREAD {i+1}</small><span>{rune?.symbol??'◇'}</span>
      <strong>{rune?.label??'Awaiting rune'}</strong>
     </div>;
   })}
  </div>
  <div className="brave-rune-piece-tray" aria-label="Select a carved rune">
   {braveRuneOptions.map(r=><button key={r.id} disabled={sequence.includes(r.id)||sequence.length>=4}
    onClick={()=>place(r.id)}><span>{r.symbol}</span><strong>{r.label}</strong></button>)}
  </div>
  <div className="brave-rune-actions">
   <button onClick={()=>setSequence(s=>s.slice(0,-1))} disabled={!sequence.length}>↶ Undo last</button>
   <button onClick={()=>{setSequence([]);setMessage('The spindle waits for a new arrangement.')}}>⟲ Rearrange</button>
   <button className="brave-journey-main-action" onClick={submit} disabled={sequence.length!==4}>Turn the spindle ✦</button>
  </div>
  <p className="brave-rune-feedback" role="status" aria-live="polite">{message}{attempts>0?' · Attempts: '+attempts:''}</p>
 </section>;
}
