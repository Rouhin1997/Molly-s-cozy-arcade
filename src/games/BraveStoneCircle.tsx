import {useState} from 'react';
import {braveCircleStart,braveCircleTurn,braveCircleStones,braveCircleCount,braveCircleComplete} from '../lib/braveCircle';
const arrows=['↑','→','↓','←'];
export default function BraveStoneCircle({onComplete}:{onComplete:()=>void}){
 const [turns,setTurns]=useState<number[]>([...braveCircleStart]);
 const [tries,setTries]=useState(0);
 const [message,setMessage]=useState('The old carvings have turned away from their bearings. Read their inscriptions and turn them home.');
 const [solved,setSolved]=useState(false);
 function check(){
  const number=braveCircleCount(turns);setTries(t=>t+1);
  if(braveCircleComplete(turns)){
   setSolved(true);setMessage('Every stone answers! The central basin fills with blue light.');onComplete();
  }else setMessage(number+' of five stones face their true bearings. The others still whisper of a lost direction.');
 }
 return <section className="brave-circle-game" aria-label="Restore the five standing stone compass bearings">
  <div className="brave-circle-legend">
   <h3>Where the stones once pointed</h3>
   <p>In the weathered ring, every carving has a direction. Read the old verses, rotate each marker clockwise, and reunite their bearings.</p>
   <span>✧ Turning a stone changes only that stone. There is no timer.</span>
  </div>
  <div className="brave-circle-grid">
   {braveCircleStones.map((stone,i)=><button key={stone.id} type="button"
    disabled={solved} onClick={()=>setTurns(t=>braveCircleTurn(t,i))}
    className={'brave-circle-stone is-'+stone.id+(turns[i]===stone.correct?' is-aligned':'')}
    aria-label={'Rotate '+stone.name+' clockwise. Now points '+['north','east','south','west'][turns[i]]}>
    <span className="brave-circle-stone-top">✧ {stone.name} ✧</span>
    <span className="brave-circle-stone-arrow">{arrows[turns[i]]}</span>
    <span className="brave-circle-stone-caption">{stone.clue}</span>
   </button>)}
   <div className="brave-circle-altar" aria-hidden="true">✦ <span>THE MEMORY OF THE STONES</span></div>
  </div>
  <div className="brave-circle-foot">
   <button className="brave-journey-main-action" onClick={check} disabled={solved}>{solved?'✦ The circle restored':'Awaken the circle ✧'}</button>
   <button className="brave-stealth-reset" onClick={()=>{setTurns([...braveCircleStart]);setMessage('The stones return to their old bearings.');setSolved(false)}}>↶ Reset bearings</button>
   <p aria-live="polite" role="status">{message}{tries>0&&!solved?' · Attempts: '+tries:''}</p>
  </div>
 </section>;
}
