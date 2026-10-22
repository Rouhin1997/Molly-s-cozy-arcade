import {useRef,useState,type KeyboardEvent} from 'react';
import {braveCampaignStages,braveChapterBridges,braveArcheryTargets,braveRuneOptions,braveRuneOrder,type BraveStage} from '../data/braveCampaign';
import {braveInitialState,braveMove,braveCompleted,braveWidth,bravePosition,braveTile,type BravePuzzleState,type BraveDirection} from '../lib/bravePuzzle';
import {readBraveJourney,writeBraveJourney,completeBraveStage,chooseBraveStage,type BraveJourneySave} from '../lib/braveProgress';

const roman:Record<string,string>={highland:'I',forest:'II',witch:'III'};
const directions:Record<string,BraveDirection>={
 ArrowUp:'up',ArrowRight:'right',ArrowDown:'down',ArrowLeft:'left',
 w:'up',a:'left',s:'down',d:'right'
};
const chapterName:Record<string,string>={highland:'The Highland Games',forest:'Follow the Wisps',witch:"The Witch’s Workshop"};
function openingHistory(stage:BraveStage):BravePuzzleState[]{
 return stage.route?[braveInitialState(stage.route)]:[];
}
function JourneyLandscape({chapter}:{chapter:string}){
 return <svg className="brave-journey-landscape" viewBox="0 0 980 280" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
  <defs>
   <linearGradient id="journeySky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={chapter==='highland'?'#b8bc94':chapter==='forest'?'#315961':'#6f6766'}/>
    <stop offset="1" stopColor={chapter==='highland'?'#dfc99b':chapter==='forest'?'#7fa69a':'#d1a98b'}/>
   </linearGradient>
   <radialGradient id="journeyWisp"><stop stopColor="#ecffff"/><stop offset=".24" stopColor="#b0fff6"/><stop offset="1" stopColor="#6adbd0" stopOpacity="0"/></radialGradient>
  </defs>
  <rect width="980" height="280" fill="url(#journeySky)"/>
  <circle cx={chapter==='forest'?695:790} cy="69" r="43" fill="#f5e6ba" opacity=".75"/>
  <path d="M0 170L92 72L169 154L278 67L377 163L484 75L584 160L674 89L760 153L850 66L980 170V280H0Z" fill="#506c68" opacity=".67"/>
  <path d="M0 207Q156 122 309 185T643 179T980 179V280H0Z" fill="#3a685b"/>
  <path d="M0 238Q170 174 330 222T650 207T980 219V280H0Z" fill="#244f4b"/>
  {Array.from({length:23},(_,i)=>{const x=(i*89+27)%980,y=178+(i*17)%73,h=19+(i*11)%48;
   return <g key={i} transform={'translate('+x+' '+y+')'} opacity={chapter==='highland'?.55:.92}>
    <path d={'M0 0L-'+h*.4+' '+h+'H'+h*.4+'Z'} fill={i%2?'#1d4b44':'#326957'}/>
    <path d={'M0 '+h*.25+'L-'+h*.32+' '+h*.77+'H'+h*.32+'Z'} fill="#356e5a"/>
   </g>})}
  {chapter==='highland'&&<g transform="translate(145 92)">
    <path d="M-52 118V47H-23V25H-5V47H32V13H53V48H83V118Z" fill="#747d72" stroke="#364d49" strokeWidth="5"/>
    <path d="M-59 118H88" stroke="#3a4a48" strokeWidth="10"/>
    <path d="M3 118V85Q16 72 32 85V118" fill="#374e47"/>
    <path d="M-23 24l9 -15 9 15 M31 12l11 -18 11 18" fill="#8d8a79"/>
    <path d="M-49 47V-3" stroke="#d3bf9a" strokeWidth="3"/><path d="M-49 -4l34 11 -34 10" fill="#ad7560"/>
   </g>}
  {chapter==='forest'&&<g transform="translate(340 155)" fill="#859d8f" stroke="#4b6862" strokeWidth="4">
   <path d="M-48 64l4 -63 26 -19 7 82Z"/><path d="M-4 63l-8 -92 24 -12 16 104Z"/><path d="M35 64l5 -70 24 -13 8 83Z"/>
   <path d="M-44 64q54 18 120 -3" stroke="#c8deba" strokeDasharray="3 9" fill="none"/>
  </g>}
  {chapter==='witch'&&<g transform="translate(705 96)">
   <path d="M-62 126V50L30 42L76 126Z" fill="#675747" stroke="#393e38" strokeWidth="5"/>
   <path d="M-79 56L8 -18 94 46 79 60 8 7 -65 70Z" fill="#453d38" stroke="#293f38" strokeWidth="5"/>
   <rect x="-39" y="69" width="27" height="28" fill="#f5c17c" stroke="#3e4036" strokeWidth="4"/>
   <path d="M31 125V80Q50 66 65 80V125" fill="#293f39"/>
   <path d="M51 0v-55h20v38" fill="#5e625b"/>
   <path d="M61 -58q-30 -28 1 -47" fill="none" stroke="#d4d9c7" strokeWidth="8" opacity=".45"/>
  </g>}
  {[0,1,2,3].map((i)=><g key={i}>
   <circle cx={240+i*148} cy={124+((i*31)%62)} r="29" fill="url(#journeyWisp)"/>
   <circle cx={240+i*148} cy={124+((i*31)%62)} r="3" fill="#f1ffff"/>
  </g>)}
  <path d="M0 278Q205 250 400 271T800 267T980 272" stroke="#d7cba4" strokeWidth="10" fill="none" opacity=".6"/>
 </svg>;
}
function JourneyRoute({stage,history,onMove,notice,onUndo,onRestart}:{
 stage:BraveStage;history:BravePuzzleState[];onMove:(dir:BraveDirection)=>void;
 notice:string;onUndo:()=>void;onRestart:()=>void;
}){
 const level=stage.route!;
 const state=history[history.length-1],done=braveCompleted(level,state);
 const position=bravePosition(level,state.position);
 return <div className="brave-crossing-content brave-journey-playfield">
  <div className="brave-crossing-grid-frame">
   <div className="brave-crossing-grid" style={{gridTemplateColumns:'repeat('+braveWidth(level)+',minmax(0,1fr))'}} aria-hidden="true">
    {level.rows.join('').split('').map((glyph,i)=>{
     const tile=braveTile(level,i),at=i===state.position;
     const found=tile==='W'&&state.wisps.includes(i);
     const awake=tile==='A'&&state.stones.includes(i);
     const gateOpen=tile==='G'&&state.stones.length>0;
     const kind=tile==='#'?'wall':tile==='G'?(gateOpen?'gate-open':'gate-closed'):
       tile==='E'?'exit':tile==='A'?'stone':tile==='W'?'wisp':'path';
     return <div key={i} className={'brave-crossing-tile is-'+kind+(at?' has-traveller':'')}>
      {tile==='W'&&!found&&<span className="brave-crossing-light">✧</span>}
      {tile==='A'&&<span className={'brave-crossing-rune'+(awake?' is-lit':'')}>ᚱ</span>}
      {tile==='G'&&<span className="brave-crossing-gate">{gateOpen?'✧':'▥'}</span>}
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
     {level.rows.join('').includes('W')&&<span>✧ {state.wisps.length?'Light carried':'Find the light'}</span>}
     {level.rows.join('').includes('A')&&<span>ᚱ {state.stones.length?'Stone awake':'Stone sleeping'}</span>}
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
 const [aim,setAim]=useState<'left'|'centre'|'right'>('centre');
 const [draw,setDraw]=useState<'gentle'|'strong'>('gentle');
 const [shots,setShots]=useState(0);
 const [runeSteps,setRuneSteps]=useState(0);
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
  setAim('centre');setDraw('gentle');setShots(0);setRuneSteps(0);setFinished(false);
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
  else if(result.event==='gate')setNotice('The gate recognizes the light and opens.');
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
 function shoot(){
  if(finished)return;
  const target=braveArcheryTargets[shots];
  if(!target)return;
  const correctAim=target.wind===1?'left':target.wind===-1?'right':'centre';
  const correctDraw=target.range==='near'?'gentle':'strong';
  if(aim!==correctAim||draw!==correctDraw){
   setNotice(aim!==correctAim
    ?'The crosswind carries your arrow aside. Aim into the wind to correct it.'
    :'The arrow falls short or flies too hard. Match the draw to the distance.');
   return;
  }
  setShots(shots+1);
  if(shots+1===braveArcheryTargets.length){setNotice('Three clean shots. Merida grins beneath the banners.');markFinished()}
  else setNotice('A perfect shot! The wind turns as the next ribbon lifts.');
 }
 function rune(id:string){
  if(finished)return;
  if(id!==braveRuneOrder[runeSteps]){setNotice('The little bear shakes its head. Remember the order of your journey.');return}
  setRuneSteps(runeSteps+1);
  if(runeSteps+1===braveRuneOrder.length){setNotice('The three carvings nod. The spindle begins to glow.');markFinished()}
  else setNotice('A rune glimmers. The next carving waits.');
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
  <div className="brave-journey-chapters" role="navigation" aria-label="Adventure chapters">
   {(['highland','forest','witch'] as const).map((id,i)=>{
    const first=i*3,unlocked=first<=progress.completed.length;
    return <button key={id} onClick={()=>go(first)} disabled={!unlocked}
     className={stage.chapterId===id?'is-active':''} aria-current={stage.chapterId===id?'step':undefined}>
      <span>{i===0?'🏹':i===1?'✧':'❦'}</span> Chapter {roman[id]} <small>{unlocked?(stage.chapterId===id?'Reading':'Open'):'✧'}</small>
     </button>;
   })}
  </div>
  <JourneyLandscape chapter={stage.chapterId}/>
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
   {stage.kind==='archery'&&<div className="brave-journey-special">
    <div className="brave-journey-target-art" aria-hidden="true"><span>🏹</span><span>◎</span><span>➶</span></div>
    <div className="brave-journey-special-controls">
     <span className="brave-kicker">TARGET {shots+1} OF 3</span>
     <h4>{braveArcheryTargets[shots].name}</h4>
     <p>{braveArcheryTargets[shots].description} The target is {braveArcheryTargets[shots].range==='near'?'nearby':'far across the glen'}.</p>
     <p className="brave-journey-weather">Wind: {braveArcheryTargets[shots].wind===1?'→ EAST':braveArcheryTargets[shots].wind===-1?'← WEST':'· STILL'}</p>
     <div className="brave-journey-control-label">Where will you aim?</div>
     <div className="brave-journey-choice-row">
      {(['left','centre','right'] as const).map(value=><button key={value} aria-pressed={aim===value} onClick={()=>setAim(value)}>{value==='centre'?'Straight':value==='left'?'← Left':'Right →'}</button>)}
     </div>
     <div className="brave-journey-control-label">How strong is your draw?</div>
     <div className="brave-journey-choice-row">
      {(['gentle','strong'] as const).map(value=><button key={value} aria-pressed={draw===value} onClick={()=>setDraw(value)}>{value==='gentle'?'Gentle draw':'Strong draw'}</button>)}
     </div>
     <button className="brave-journey-main-action" onClick={shoot}>Loose the arrow ↗</button>
     <p role="status" aria-live="polite">{notice}</p>
    </div>
   </div>}
   {stage.kind==='runes'&&<div className="brave-journey-special brave-journey-runes">
    <div className="brave-journey-target-art" aria-hidden="true"><span>❧</span><span>✧</span><span>♨</span></div>
    <div className="brave-journey-special-controls">
     <span className="brave-kicker">THE THREE MEMORY MARKS</span>
     <h4>Follow the story back to its heart</h4>
     <p>Choose the signs in the order Molly encountered them: beneath the castle oak, by the guiding light, and at the hearth she hopes to protect.</p>
     <div className="brave-journey-rune-dots">{braveRuneOrder.map((r,i)=><span key={r} className={i<runeSteps?'is-complete':''}>{i<runeSteps?'✦':'◇'}</span>)}</div>
     <div className="brave-journey-choice-row">
      {braveRuneOptions.map(r=><button key={r.id} onClick={()=>rune(r.id)}><span aria-hidden="true">{r.symbol}</span>{r.label}</button>)}
     </div>
     <p role="status" aria-live="polite">{notice}</p>
    </div>
   </div>}
   <p className="brave-journey-hint"><span>✧ The wisp suggests:</span> {stage.hint}</p>
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
