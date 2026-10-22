import {useEffect,useRef,useState,type KeyboardEvent} from 'react';
import {braveCampaignStages,braveChapterBridges,braveArcheryTargets,type BraveStage} from '../data/braveCampaign';
import {braveInitialState,braveMove,braveCompleted,braveWidth,bravePosition,braveTile,nextBraveHint,type BravePuzzleState,type BraveDirection} from '../lib/bravePuzzle';
import {readBraveJourney,writeBraveJourney,completeBraveStage,chooseBraveStage,type BraveJourneySave} from '../lib/braveProgress';
import BraveRuneWorkshop from './BraveRuneWorkshop';
import BraveArcheryRange from './BraveArcheryRange';
import BraveSceneBackdrop from './BraveSceneBackdrop';

const roman:Record<string,string>={highland:'I',forest:'II',witch:'III'};
const directions:Record<string,BraveDirection>={
 ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',
 w:'up',a:'left',s:'down',d:'right'
};
const chapterName:Record<string,string>={highland:'The Highland Games',forest:'Follow the Wisps',witch:"The Witch’s Workshop"};
function openingHistory(stage:BraveStage):BravePuzzleState[]{
 return stage.route?[braveInitialState(stage.route)]:[];
}
function JourneyRoute({stage,history,onMove,notice,onUndo,onRestart}:{
 stage:BraveStage;history:BravePuzzleState[];onMove:(dir:BraveDirection)=>void;
 notice:string;onUndo:()=>void;onRestart:()=>void;
}){
 const level=stage.route!;
 const state=history[history.length-1],done=braveCompleted(level,state);
 const position=bravePosition(level,state.position);
 const mazeRef=useRef<HTMLDivElement|null>(null);
 useEffect(()=>{
  const frame=mazeRef.current,token=frame?.querySelector('.has-traveller');
  if(!frame||!token)return;
  const area=frame.getBoundingClientRect(),current=token.getBoundingClientRect();
  if(current.left<area.left+26||current.right>area.right-26){
   frame.scrollTo({left:frame.scrollLeft+current.left-area.left-area.width/2+current.width/2,behavior:'smooth'});
  }
 },[state.position]);
 return <div className="brave-crossing-content brave-journey-playfield">
  <div ref={mazeRef} className="brave-crossing-grid-frame brave-journey-maze-scroll" role="region" aria-label="Scrollable illustrated puzzle labyrinth" tabIndex={0}>
   <div className="brave-crossing-grid" style={{gridTemplateColumns:'repeat('+braveWidth(level)+',minmax(0,1fr))',minWidth:braveWidth(level)*30+'px'}} aria-hidden="true">
    {level.rows.join('').split('').map((_,i)=>{
     const tile=braveTile(level,i),at=i===state.position;
     const found=tile==='W'&&state.wisps.includes(i);
     const awake=tile==='A'&&state.stones.includes(i);
     const gateOpen=(tile==='G'&&state.stones.length>0)||(tile==='H'&&state.stones.length>=2)||(tile==='D'&&state.keys.length>0);
     const kind=tile==='#'?'wall':['G','H','D'].includes(tile)?(gateOpen?'gate-open':'gate-closed'):
       tile==='E'?'exit':tile==='A'?'stone':tile==='W'?'wisp':tile==='K'?'key':'path';
     return <div key={i} className={'brave-crossing-tile is-'+kind+(at?' has-traveller':'')}>
      {tile==='W'&&!found&&<span className="brave-crossing-light">✧</span>}
      {tile==='A'&&<span className={'brave-crossing-rune'+(awake?' is-lit':'')}>ᚱ</span>}
      {(tile==='G'||tile==='H'||tile==='D')&&<span className="brave-crossing-gate">{gateOpen?'✧':tile==='H'?'❖':tile==='D'?'▣':'▥'}</span>}
      {tile==='K'&&!state.keys.includes(i)&&<span className="brave-crossing-key-icon">⚿</span>}
      {tile==='E'&&<span className="brave-crossing-exit">✦</span>}
      {at&&<span className="brave-crossing-traveller">🏹</span>}
     </div>;
    })}
   </div>
  </div>
  <div className="brave-crossing-side">
   <div className="brave-crossing-status">
    <span>THE PATH WHISPERS</span>
    <p aria-live="polite" aria-atomic="true">{notice}</p>
    <div className="brave-crossing-tally">
     {level.rows.join('').includes('W')&&<span>✧ Wisps {state.wisps.length}/{level.rows.join('').split('W').length-1}</span>}
     {level.rows.join('').includes('A')&&<span>ᚱ Stones {state.stones.length}/{level.rows.join('').split('A').length-1}</span>}
     {level.rows.join('').includes('K')&&<span>⚿ Key {state.keys.length?'found':'hidden'}</span>}
     <span>↝ {state.moves} steps</span>
     <span className="brave-crossing-coordinate">Row {position.row+1} · Column {position.col+1}</span>
    </div>
   </div>
   <div className="brave-crossing-dpad" aria-label="Walk the path">
    <button className="brave-crossing-up" aria-label="Walk north" onClick={()=>onMove('up')} disabled={done}>↑</button>
    <button className="brave-crossing-left" aria-label="Walk west" onClick={()=>onMove('left')} disabled={done}>←</button>
    <button className="brave-crossing-down" aria-label="Walk south" onClick={()=>onMove('down')} disabled={done}>↓</button>
    <button className="brave-crossing-right" aria-label="Walk east" onClick={()=>onMove('right')} disabled={done}>→</button>
   </div>
   <div className="brave-crossing-actions">
    <button onClick={onUndo} disabled={history.length===1}>↶ Undo</button>
    <button onClick={onRestart}>⟲ Restart</button>
   </div>
  </div>
 </div>;
}
export default function BraveJourney({onChapterChange}:{
 onChapterChange:(id:string)=>void;
}){
 const [progress,setProgress]=useState<BraveJourneySave>(readBraveJourney);
 const initial=braveCampaignStages.findIndex(s=>s.id===progress.current);
 const [currentIndex,setCurrentIndex]=useState(initial<0?0:initial);
 const [history,setHistory]=useState<BravePuzzleState[]>(()=>openingHistory(braveCampaignStages[initial<0?0:initial]));
 const [notice,setNotice]=useState('A path opens in the heather. Listen for the little light.');
 const [finished,setFinished]=useState(()=>progress.completed.includes(progress.current));
 const [shots,setShots]=useState(0);
 const [hintLevel,setHintLevel]=useState(0);
 const sectionRef=useRef<HTMLElement|null>(null);
 const stage=braveCampaignStages[currentIndex],chapter=braveChapterBridges[stage.chapterId];
 const isLast=currentIndex===braveCampaignStages.length-1;
 function persist(next:BraveJourneySave){setProgress(next);writeBraveJourney(next)}
 function markFinished(){
  persist(completeBraveStage(progress,stage.id));
  setFinished(true);
 }
 function go(index:number){
  const next=braveCampaignStages[index];
  if(!next||index>progress.completed.length)return;
  const selected=chooseBraveStage(progress,next.id);
  persist(selected);
  setCurrentIndex(index);
  setHistory(openingHistory(next));
  setNotice('Take the path at your own pace. The wisps will wait.');
  setShots(0);setHintLevel(0);setFinished(false);
  onChapterChange(next.chapterId);
  sectionRef.current?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 function move(dir:BraveDirection){
  if(finished||stage.kind!=='route'||!stage.route)return;
  const current=history[history.length-1];
  const result=braveMove(stage.route,current,dir);
  if(!result.moved){setNotice(result.reason??'The trail is quiet.');return}
  setHistory([...history,result.state]);
  if(result.event==='wisp')setNotice('The little light settles beside you. Carry it onward.');
  else if(result.event==='stone')setNotice('The rune wakes beneath your feet. A distant gate shimmers.');
  else if(result.event==='gate')setNotice('The old lock recognizes the awakened runes and opens.');
  else if(result.event==='key')setNotice('A golden key gleams in your hand. Somewhere a carved door waits.');
  else if(result.event==='door')setNotice('The wooden door yields to the key.');
  else if(result.event==='finish'){
   setNotice('The way ahead is clear.');markFinished();
  }else setNotice('The trail winds onward through the Highlands.');
 }
 function keyDown(event:KeyboardEvent<HTMLElement>){
  if(stage.kind==='route'&&!finished){
   const dir=directions[event.key]??directions[event.key.toLowerCase()];
   if(dir){event.preventDefault();move(dir)}
  }
 }
 return <section id="brave-journey" className={'brave-crossing brave-journey brave-journey-'+stage.chapterId}
  ref={sectionRef} aria-label="The Wisps’ Trail playable story" onKeyDown={keyDown} tabIndex={0}
  onPointerDown={e=>{if(e.target instanceof HTMLElement&&!e.target.closest('button'))e.currentTarget.focus()}}>
  <div className="brave-journey-heading">
   <div><span className="brave-kicker">THE KEEPER’S JOURNEY · CHAPTER {roman[stage.chapterId]}</span>
    <h2>{chapterName[stage.chapterId]}</h2>
    <p>{currentIndex%3===0?chapter.opening:stage.scene}</p>
   </div>
   <span className="brave-journey-counter">{currentIndex+1} <small>/ 09</small></span>
  </div>
  {progress.completed.length>0&&<div className="brave-journey-review"><button className="brave-journey-replay-start" onClick={()=>go(0)}>↶ Begin again at Chapter I</button><span>The wisps remember every page you have unlocked.</span></div>}
  <div className="brave-journey-chapters" role="navigation" aria-label="Adventure chapters">
   {(['highland','forest','witch'] as const).map((id,i)=>{
    const first=i*3,unlocked=first<=progress.completed.length;
    return <button key={id} onClick={()=>go(first)} disabled={!unlocked}
     className={stage.chapterId===id?'is-active':''} aria-current={stage.chapterId===id?'step':undefined}>
      <span>{i===0?'🏹':i===1?'✧':'❦'}</span> Chapter {roman[id]} <small>{unlocked?(stage.chapterId===id?'Reading':'Open'):'✧'}</small>
     </button>;
   })}
  </div>
  <BraveSceneBackdrop key={stage.id} chapter={stage.chapterId} scene={currentIndex%3}/>
  <div className="brave-journey-story">
   <span className="brave-kicker">PAGE {String(currentIndex+1).padStart(2,'0')} · {stage.kind==='route'?'THE WINDING PATH':stage.kind==='archery'?'THE ARCHER’S TEST':'THE CARVED RUNES'}</span>
   <h3>{stage.title}</h3>
   <p>{stage.scene}</p>
   <div className="brave-journey-voices">
    <blockquote><strong>MERIDA</strong><span>{stage.merida}</span></blockquote>
    <blockquote><strong>MOLLY, KEEPER OF THE WISPS</strong><span>{stage.molly}</span></blockquote>
   </div>
  </div>
  <div className="brave-journey-pages" aria-label="Choose a discovered story page">
   {braveCampaignStages.map((item,i)=><button key={item.id}
     className={currentIndex===i?'is-current':''} onClick={()=>go(i)}
     disabled={i>progress.completed.length}
     aria-label={(i>progress.completed.length?'Not yet discovered: ':'Go to ')+item.title}
     aria-current={currentIndex===i?'step':undefined}>
     {i<progress.completed.length?'✦':i===currentIndex?'✧':'·'} <span>{i+1}</span>
    </button>)}
  </div>
  {!finished&&<div className="brave-journey-challenge">
   {stage.kind==='route'&&<JourneyRoute stage={stage} history={history} onMove={move} notice={notice}
    onUndo={()=>{if(history.length>1){setHistory(history.slice(0,-1));setNotice('You retrace your last step.')} }}
    onRestart={()=>{setHistory(openingHistory(stage));setNotice('The journey begins anew.')}}/>}
   {stage.kind==='archery'&&<div className="brave-archery-series">
    <div className="brave-archery-progress" aria-label="Archery targets">
      {braveArcheryTargets.map((t,i)=><span key={t.name} className={i<shots?'is-complete':i===shots?'is-current':''}>{i<shots?'✦':i+1}</span>)}
    </div>
    <BraveArcheryRange key={shots} target={braveArcheryTargets[shots]} onHit={()=>{
      const next=shots+1;setShots(next);
      if(next===braveArcheryTargets.length){setNotice('Three arrows find their mark.');markFinished()}
      else setNotice('The next pennant rises in the changing wind.');
    }}/>
   </div>}
   {stage.kind==='runes'&&<BraveRuneWorkshop onSolve={()=>{setNotice('The spindle begins to spin a golden thread.');markFinished()}}/>}
   {stage.kind==='route'&&<div className="brave-journey-hint-panel">
    <button className="brave-journey-hint-toggle" onClick={()=>setHintLevel(v=>Math.min(v+1,3))}>
     {hintLevel===0?'✧ Ask the wisp for a hint':hintLevel===3?'✧ The wisp knows the way':'✧ Ask for a clearer clue'}
    </button>
    {hintLevel>0&&<p className="brave-journey-hint" role="status"><span>✧ The wisp suggests:</span> {
     hintLevel===1?stage.hint:hintLevel===2?(
      history[history.length-1].wisps.length<(stage.route?.rows.join('').split('W').length??1)-1
       ?'The missing wisp can still be found among the branching paths. Search routes you have not explored.'
       :history[history.length-1].stones.length<(stage.route?.rows.join('').split('A').length??1)-1
       ?'A rune stone is still sleeping. Some turns are worth revisiting.'
       :history[history.length-1].keys.length<(stage.route?.rows.join('').split('K').length??1)-1
       ?'The golden key lies somewhere along the side paths.'
       :'The way ahead is open now. Think about which path leads towards the exit.'
     ):(
      'From where you stand, the next useful step is '+
      ({up:'north ↑',right:'east →',down:'south ↓',left:'west ←'}[nextBraveHint(stage.route!,history[history.length-1])??'up'])+'.'
     )
    }</p>}
   </div>}
  </div>}
  {finished&&<div className="brave-journey-end" role="status">
   <div className="brave-journey-end-sigil">✦</div>
   <span className="brave-kicker">ANOTHER PAGE TURNED</span>
   <h3>{stage.title}</h3>
   <p>{stage.ending}</p>
   {currentIndex%3===2&&<div className="brave-journey-bridge">
    <span>✧ · ✧ · ✧</span>
    <p>{chapter.closing}</p>
    <p><em>{chapter.next}</em></p>
   </div>}
   {isLast
    ? <p className="brave-journey-to-be-continued">The wisps have one more story to tell. Beyond this page, DunBroch waits under the moon.</p>
    : <button className="brave-journey-main-action" onClick={()=>go(currentIndex+1)}>
       {currentIndex%3===2?'Turn to the next chapter →':'Turn the page →'}
      </button>}
   <button className="brave-journey-replay" onClick={()=>go(currentIndex)}>↶ Walk this page again</button>
  </div>}
  <p className="brave-journey-bottom-note">A gentle journey, at your pace. The story remembers which pages you have discovered.</p>
 </section>;
}
