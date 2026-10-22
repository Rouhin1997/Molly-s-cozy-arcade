import {useState,type KeyboardEvent} from 'react';
import {
 bravePrototypeLevel,braveWidth,braveTile,braveMove,bravePosition,
 braveInitialState,braveCompleted,type BraveDirection,type BravePuzzleState
} from '../lib/bravePuzzle';

const level=bravePrototypeLevel;
type CrossingSession={history:BravePuzzleState[];notice:string};
function newSession():CrossingSession{
 return {history:[braveInitialState(level)],notice:'The way opens at the edge of the glen.'};
}
const messages={
 wisp:'A little blue wisp settles beside you. Its light is yours to carry.',
 stone:'The ancient stone wakes. Far away, a mossy gate begins to glow.',
 gate:'The gate remembers the light and quietly swings open.',
 key:'A golden key rests in your hand.',
 door:'The carved wooden door swings inward.',
 finish:'The far glen opens before you. The first crossing is complete!'
};
export default function BraveCrossing(){
 const [session,setSession]=useState<CrossingSession>(newSession);
 const state=session.history[session.history.length-1];
 const position=bravePosition(level,state.position);
 const done=braveCompleted(level,state);
 function move(direction:BraveDirection){
  setSession(previous=>{
   const current=previous.history[previous.history.length-1];
   const result=braveMove(level,current,direction);
   if(!result.moved)return {...previous,notice:result.reason??'The path is quiet.'};
   const notice=result.event?messages[result.event]:
    'Step '+result.state.moves+'. The trail winds on.';
   return {history:[...previous.history,result.state],notice};
  });
 }
 function undo(){
  setSession(previous=>previous.history.length===1?{...previous,notice:'You are already at the beginning.'}
   :{history:previous.history.slice(0,-1),notice:'You retrace your last step.'});
 }
 function keyDown(event:KeyboardEvent<HTMLElement>){
  const directions:Record<string,BraveDirection>={ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',
   w:'up',d:'right',s:'down',a:'left'};
  if(directions[event.key]){event.preventDefault();move(directions[event.key])}
 }
 return <section className="brave-crossing" aria-labelledby="brave-crossing-title"
  aria-describedby="brave-crossing-help" onKeyDown={keyDown} tabIndex={0}
  onPointerDown={event=>{if(event.target instanceof HTMLElement && !event.target.closest("button"))event.currentTarget.focus()}}>
  <div className="brave-crossing-heading">
    <span className="brave-kicker">THE KEEPER'S FIRST JOURNEY</span>
    <h2 id="brave-crossing-title">{level.title}</h2>
    <p id="brave-crossing-help">A stray wisp waits beside an old path. Carry its light to the standing stone, awaken the gate, and find the far glen. Select the path, then use arrow keys or WASD; touch players can use the direction buttons. There is no timer.</p>
  </div>
  <div className="brave-crossing-content">
   <div className="brave-crossing-grid-frame">
    <div className="brave-crossing-grid" style={{gridTemplateColumns:'repeat('+braveWidth(level)+', minmax(0,1fr))'}} aria-hidden="true">
     {level.rows.join('').split('').map((glyph,i)=>{
      const here=i===state.position;
      const wisp=braveTile(level,i)==='W'&&!state.wisps.includes(i);
      const stone=braveTile(level,i)==='A';
      const gate=braveTile(level,i)==='G';
      const cleared=gate&&state.stones.length>0;
      const tileClass=glyph==='#'?'wall':glyph==='G'?(cleared?'gate-open':'gate-closed'):
       glyph==='E'?'exit':glyph==='A'?'stone':glyph==='W'?'wisp':'path';
      return <div key={i} className={'brave-crossing-tile is-'+tileClass+(here?' has-traveller':'')}>
       {stone&&<span className={'brave-crossing-rune'+(state.stones.includes(i)?' is-lit':'')}>ᚱ</span>}
       {wisp&&<span className="brave-crossing-light">✧</span>}
       {gate&&<span className="brave-crossing-gate">{cleared?'✧':'▥'}</span>}
       {glyph==='E'&&<span className="brave-crossing-exit">✦</span>}
       {here&&<span className="brave-crossing-traveller">🏹</span>}
      </div>;
     })}
    </div>
   </div>
   <div className="brave-crossing-side">
    <div className="brave-crossing-status">
     <span>THE TRAIL WHISPERS</span>
     <p aria-live="polite" aria-atomic="true">{session.notice}</p>
     <div className="brave-crossing-tally">
      <span>✧ Wisp {state.wisps.length? 'found':'waiting'}</span>
      <span>ᚱ Stone {state.stones.length? 'awake':'sleeping'}</span>
      <span>↝ {state.moves} steps</span>
      <span className="brave-crossing-coordinate">Row {position.row+1}, path {position.col+1}</span>
     </div>
    </div>
    <div className="brave-crossing-dpad" aria-label="Walk the path">
      <button className="brave-crossing-up" aria-label="Walk north" onClick={()=>move('up')} disabled={done}>↑</button>
      <button className="brave-crossing-left" aria-label="Walk west" onClick={()=>move('left')} disabled={done}>←</button>
      <button className="brave-crossing-down" aria-label="Walk south" onClick={()=>move('down')} disabled={done}>↓</button>
      <button className="brave-crossing-right" aria-label="Walk east" onClick={()=>move('right')} disabled={done}>→</button>
    </div>
    <div className="brave-crossing-actions">
      <button onClick={undo} disabled={session.history.length===1}>↶ Undo</button>
      <button onClick={()=>setSession(newSession())}>⟲ Begin again</button>
    </div>
    {done&&<p className="brave-crossing-finale" role="status">✦ The Keeper has found her way. ✦</p>}
   </div>
  </div>
  <p className="brave-crossing-key">✧ Wisp &nbsp; ᚱ Standing stone &nbsp; ▥ Sleeping gate &nbsp; ✦ Destination</p>
 </section>;
}
