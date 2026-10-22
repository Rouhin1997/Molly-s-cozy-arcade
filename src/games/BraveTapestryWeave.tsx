import {useState} from 'react';
import {
 braveTapestryScrambled,braveTapestryTurn,braveTapestryCheck,
 braveTapestryRestorable,braveRotateMask,type BraveTapestrySize,type BraveTapestry
} from '../lib/braveTapestry';
const paths=[
 {bit:1,d:'M50 50 V3'},{bit:2,d:'M50 50 H97'},
 {bit:4,d:'M50 50 V97'},{bit:8,d:'M50 50 H3'}
];
export default function BraveTapestryWeave({size,onComplete}:{
 size:BraveTapestrySize;onComplete:()=>void
}){
 const [history,setHistory]=useState<BraveTapestry[]>(()=>[braveTapestryScrambled(size)]);
 const [message,setMessage]=useState('The threads are tangled. Rotate embroidered patches so that every gold line can meet its neighbour.');
 const [hinted,setHinted]=useState(false);
 const [solved,setSolved]=useState(false);
 const current=history[history.length-1];
 const info=braveTapestryCheck(current);
 function turn(i:number){
  if(solved)return;
  const next=braveTapestryTurn(current,i);
  setHistory(h=>[...h,next]);
  const result=braveTapestryCheck(next);
  if(result.solved){
   setSolved(true);
   setMessage('Every stitch has joined the next! The entire golden road shines.');onComplete();
  }else setMessage(result.correctLinks+' golden joins woven; '+result.connected+' of '+(size*size)+' patches connected to the beginning.');
 }
 function hint(){
  setHinted(true);
  const i=current.rotations.findIndex(n=>n!==0);
  if(i>=0)setMessage('The wisps hover over patch '+(i+1)+'. Its embroidered thread needs '+((4-current.rotations[i])%4)+' more clockwise turn(s).');
  else setMessage('All patches face their original bearings. Check the borders for a loose stitch.');
 }
 return <section className="brave-tapestry-game" aria-label={size===3?'Mend the little tapestry':'Mend the great final tapestry'}>
  <div className="brave-tapestry-header">
   <span className="brave-kicker">THE GOLDEN THREAD</span>
   <h3>{size===3?'The first stitches':'The tapestry of the Highlands'}</h3>
   <p>Turn each cloth patch so the gold embroidery joins its neighbours, beginning at the <strong>left edge of the top-left patch</strong> and weaving through every tile. Only the first and last borders may remain open.</p>
  </div>
  <div className={'brave-tapestry-frame tapestry-'+size}>
   <div className="brave-tapestry-grid" style={{gridTemplateColumns:'repeat('+size+',1fr)'}}>
    {current.pieces.map((piece,i)=>{
     const mask=braveRotateMask(piece,current.rotations[i]);
     return <button type="button" key={i} className="brave-tapestry-patch"
      onClick={()=>turn(i)} disabled={solved}
      aria-label={'Rotate embroidered patch '+(i+1)+' clockwise; currently rotated '+current.rotations[i]+' quarter turns'}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
       <defs><radialGradient id="tapestry-gold-thread"><stop stopColor="#fff9cf"/><stop offset="1" stopColor="#d3ac54"/></radialGradient></defs>
       <path d="M5 5L95 5 95 95 5 95Z" fill="none" stroke="#e5cd91" strokeWidth="3" strokeDasharray="3 4"/>
       {paths.map(({bit,d})=>(mask&bit)?<g key={bit}>
        <path d={d} stroke="#4d4b3b" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <path d={d} stroke="#dfbd67" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <path d={d} stroke="#fff3ac" strokeWidth="3" strokeLinecap="round" fill="none"/>
       </g>:null)}
       <circle cx="50" cy="50" r="9" fill="url(#tapestry-gold-thread)" stroke="#896738" strokeWidth="3"/>
       <circle cx="15" cy="15" r="5" fill="#b8d4aa"/><circle cx="85" cy="85" r="5" fill="#b8d4aa"/>
      </svg>
      <span className="brave-tapestry-patch-label">{i+1}</span>
     </button>
    })}
   </div>
   <div className="brave-tapestry-border-labels">
    <span>✧ THE FIRST THREAD →</span>
    <span>✦ {size===3?'TO THE FAR BORDER':'THE LAST BORDER'} ↗</span>
   </div>
  </div>
  <div className="brave-tapestry-controls">
   <button onClick={()=>{if(history.length>1){setHistory(x=>x.slice(0,-1));setSolved(false);setMessage('One stitch is carefully unwoven.')}}}
    disabled={history.length===1||solved}>↶ Undo stitch</button>
   <button onClick={()=>{setHistory([braveTapestryScrambled(size)]);setSolved(false);setHinted(false);setMessage('The loom waits for a fresh weaving.')}}>⟲ Reweave</button>
   <button onClick={hint} disabled={solved}>{hinted?'✧ Another wisp clue':'✧ Ask the wisp'}</button>
  </div>
  <p className="brave-tapestry-feedback" aria-live="polite" role="status">{message}</p>
  <div className="brave-tapestry-tally"><span>✧ {info.correctLinks} joined seams</span><span>❧ {info.connected}/{size*size} linked patches</span><span>{braveTapestryRestorable(current)?'The old design can be mended':'The thread is restless'}</span></div>
 </section>;
}
