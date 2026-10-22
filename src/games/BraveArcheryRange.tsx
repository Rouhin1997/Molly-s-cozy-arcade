import {useState} from 'react';
import {BRAVE_AIM_ANGLES,BRAVE_ELEVATIONS,BRAVE_DRAW_SPEEDS,braveShot,braveShotArc,
 type BraveBallisticTarget,type BraveShotSettings,type BraveImpact} from '../lib/braveBallistics';

/** Illustrated, measured archery: all shots have deterministic trajectories. */
export default function BraveArcheryRange({target,onHit}:{
 target:BraveBallisticTarget;onHit:()=>void;
}){
 const [shot,setShot]=useState<BraveShotSettings>({aim:0,elevation:20,speed:40});
 const [last,setLast]=useState<{impact:BraveImpact;settings:BraveShotSettings;serial:number}|null>(null);
 const [attempts,setAttempts]=useState(0);
 const [complete,setComplete]=useState(false);
 function fire(){
  if(complete)return;
  const impact=braveShot(target,shot),serial=attempts+1;
  setAttempts(serial);setLast({impact,settings:{...shot},serial});
  if(impact.hit)setComplete(true);
 }
 const feedback=last?.impact;
 const hint=feedback?.hit?'The arrow lands true! The ribbon falls and the trail opens.':
  !feedback?'The wind moves the ribbons. Choose a heading, a bow angle and a draw. Watch where the arrow lands.':
  'The arrow passed '+Math.abs(feedback.horizontal).toFixed(1)+' m '+(feedback.horizontal<0?'left':'right')+
  ' and '+Math.abs(feedback.vertical).toFixed(1)+' m '+(feedback.vertical<0?'below':'above')+
  ' the bullseye. Adjust your shot and try again.';
 return <div className="brave-archery">
   <div className="brave-archery-stage">
    <svg viewBox="0 0 800 330" role="img" aria-label={'Illustrated Highland archery range with '+target.distance+' metre target, raised '+target.height+' metres, and crosswind '+target.crosswind+' metres per second'}>
     <defs>
      <linearGradient id="brave-archery-sky" x1="0" y1="0" x2="0" y2="1">
       <stop stopColor="#aecbc1"/><stop offset=".6" stopColor="#e5d2a7"/><stop offset="1" stopColor="#a4bfa0"/>
      </linearGradient>
      <linearGradient id="brave-archery-hills" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5f8578"/><stop offset="1" stopColor="#335f51"/></linearGradient>
     </defs>
     <rect width="800" height="330" fill="url(#brave-archery-sky)"/>
     <circle cx="625" cy="54" r="37" fill="#fff0c5" opacity=".65"/>
     <path d="M0 179L96 78L180 165L286 90L396 171L480 94L561 163L660 84L800 165V330H0Z" fill="#738e83" opacity=".75"/>
     <path d="M0 213Q180 154 365 205T800 185V330H0Z" fill="url(#brave-archery-hills)"/>
     <path d="M0 278Q174 235 336 282T800 262V330H0Z" fill="#2d644e"/>
     <path d="M90 269L690 269" stroke="#e0c69a" strokeWidth="4" strokeDasharray="11 9"/>
     {Array.from({length:13},(_,i)=><g key={i} transform={'translate('+(30+i*61)+' '+(210+(i*19)%47)+')'} opacity=".7">
      <path d="M0 0L-12 29H12Z" fill="#2a594b"/><path d="M0 -8L-9 14H9Z" fill="#41785f"/>
     </g>)}
     <g transform="translate(90 257)">
      <path d="M-22 18L-19 -36Q-12 -65 9 -58L21 -27L17 18Z" fill="#486b58" stroke="#2f4c43" strokeWidth="3"/>
      <path d="M-20 -34Q-28 -64 -7 -73Q14 -86 27 -60Q42 -38 18 -35Q5 -49 -11 -35Z" fill="#ae593a"/>
      <circle cx="-3" cy="-44" r="13" fill="#ddaa81"/>
      <path d="M12 -33L39 -50M10 -31L39 -50" stroke="#d2a87c" strokeWidth="5" strokeLinecap="round"/>
      <path d="M39 -77Q71 -40 39 -3" fill="none" stroke="#e8c589" strokeWidth="5"/>
      <path d="M39 -77V-3" stroke="#f0e5c2" strokeWidth="1.4"/>
      <path d="M19 -30L44 -35" stroke="#e9dcc0" strokeWidth="2"/>
     </g>
     <g transform={'translate(690 '+(269-target.height*5)+')'}>
      <rect x="-3" y="-8" width="7" height={target.height*5+16} fill="#685645"/>
      <circle r="32" fill="#e7c899" stroke="#5a4e39" strokeWidth="5"/>
      <circle r="24" fill="#855848"/><circle r="16" fill="#ebdfba"/><circle r="8" fill="#5f806c"/>
      <path d="M-2 -34v-25" stroke="#695c4d" strokeWidth="3"/>
      <path d={target.crosswind>0?'M-2 -58l39 9 -39 11Z':'M-2 -58l-39 9 39 11Z'} fill={target.crosswind>0?'#b9634e':'#5b789a'}/>
     </g>
     {Array.from({length:4},(_,i)=><path key={i} className="brave-archery-wind" d={'M'+(200+i*122)+' '+(78+i*23)+'q35 -9 85 0'} fill="none" stroke="#ecf7e1" strokeWidth="2" opacity=".35" strokeLinecap="round"/>)}
     {last&&<g key={last.serial} className="brave-archery-flight">
      <polyline points={braveShotArc(target,last.settings)} fill="none" stroke="#fff3ce" strokeWidth="3" strokeDasharray="7 7" strokeLinecap="round"/>
      <circle cx="688" cy={269-(target.height+last.impact.vertical)*5} r="6" fill={last.impact.hit?'#b5faf2':'#f2af91'} stroke="#fff9e8" strokeWidth="2"/>
     </g>}
     <rect x="10" y="12" width="202" height="44" rx="10" fill="#244b49" opacity=".85"/>
     <text x="24" y="31" fill="#f3e7bd" fontSize="14" fontWeight="bold">{target.distance} m · Elevation {target.height.toFixed(1)} m</text>
     <text x="24" y="46" fill="#a8ece0" fontSize="12">{target.crosswind>0?'Easterly crosswind →':'← Westerly crosswind'} {Math.abs(target.crosswind)} m/s</text>
     <g transform="translate(739 40)">
      <circle r="35" fill="#f2e7c6" stroke="#b48b62" strokeWidth="3"/>
      <circle r="25" fill="none" stroke="#986c55" strokeWidth="4"/>
      <circle r="12" fill="none" stroke="#587f72" strokeWidth="4"/>
      {feedback&&<circle cx={Math.max(-31,Math.min(31,feedback.horizontal*7))} cy={Math.max(-31,Math.min(31,-feedback.vertical*7))} r="5" fill={feedback.hit?'#2f907f':'#bd6348'} stroke="#fff" strokeWidth="2"/>}
     </g>
    </svg>
    <p className="brave-archery-scene-caption">{target.description}</p>
   </div>
   <div className="brave-archery-dashboard">
    <div className="brave-archery-controls">
     <div><h4>Compass aim</h4><div className="brave-archery-select">
      {BRAVE_AIM_ANGLES.map(a=><button key={a} aria-pressed={shot.aim===a} disabled={complete}
       onClick={()=>setShot({...shot,aim:a})}>{a===0?'Centre':(a<0?'← ':'→ ')+Math.abs(a)+'°'}</button>)}
     </div></div>
     <div><h4>Bow elevation</h4><div className="brave-archery-select">
      {BRAVE_ELEVATIONS.map(a=><button key={a} aria-pressed={shot.elevation===a} disabled={complete}
       onClick={()=>setShot({...shot,elevation:a})}>{a}°</button>)}
     </div></div>
     <div><h4>Draw strength</h4><div className="brave-archery-select">
      {BRAVE_DRAW_SPEEDS.map((v,i)=><button key={v} aria-pressed={shot.speed===v} disabled={complete}
       onClick={()=>setShot({...shot,speed:v})}>{['Gentle','Firm','Full'][i]}</button>)}
     </div></div>
    </div>
    <div className="brave-archery-result">
     <div className="brave-archery-scoreline"><span>✧ SHOT {attempts+1}</span><span>{feedback?'Flight '+feedback.flightTime.toFixed(2)+' s':'Watch the wind'}</span></div>
     <p role="status" aria-live="polite">{hint}</p>
     <button className="brave-journey-main-action" onClick={complete?onHit:fire}>{complete?'✦ Continue to the next target →':'Loose the arrow ↗'}</button>
     <span className="brave-archery-fair">No timer. Every arrow obeys the same wind and gravity.</span>
    </div>
   </div>
  </div>;
}
