import {useEffect,useRef,useState,type PointerEvent as ReactPointerEvent,type KeyboardEvent} from 'react';
import {KitchenCharacter} from './NoodleShopArt';
import {TempleNoodleBackdrop,KitchenPotArt} from './NoodleWorldArt';
import NoodleDishArt from './NoodleDishArt';
import NoodleCouponPanel from './NoodleCouponPanel';
import {KITCHEN_LEVELS,shiftForLevel} from '../lib/noodleShopCampaign';
import {awardNoodleCoupon,readNoodleCoupon,writeNoodleCoupon} from '../lib/noodleCoupon';
import {startNoodleMusic,type NoodleMusic} from '../lib/noodleMusic';
import {
 STOCK,RECIPES,COOK_SECONDS,BURN_SECONDS,
 newKitchen,dropInKitchen,tickKitchen,cookingPhase,cookingFraction,
 activeRecipe,remainingPatience,chooseKitchenOrder,nextKitchenInstruction,shiftDuration,boardDish,levelWon,
 toggleKitchenPause,recordKitchenResult,readNoodleSave,writeNoodleSave,recipeComplete,
 type Source,type Target,type KitchenState,type NoodleSave,type Appliance
} from '../lib/noodleShopV2';

type Drag={source:Source;x:number;y:number;pointerId:number;moving:boolean};
type Ghost={source:Source;x:number;y:number};
const GUEST_NAMES={po:'Po',rabbit:'Bunny',monkey:'Monkey',tigress:'Tigress'};
function iconForIngredient(i:string):string{
 return ({bowl:'🥣',plate:'🍽️',noodles:'🍝',dumplings:'🥟',broth:'🍲',greens:'🥬',
 mushrooms:'🍄',sauce:'🥢',tofu:'🟨',chili:'🌶️',scallions:'🌿',sesame:'✨','cooked-noodles':'🍜','steamed-dumplings':'🥟'} as Record<string,string>)[i]??'🍃';
}
function sourceName(s:Source):string{
 return s.kind==='dish'?'Prepared dish on board '+((s.slot??0)+1):s.kind==='cooker'?(s.appliance==='pot'?'Cooked noodles':'Steamed dumplings'):
 STOCK.find(x=>x.id===s.ingredient)?.name??s.ingredient;
}
function sourceIcon(s:Source):string{
 return s.kind==='dish'?'🍽️':s.kind==='cooker'?(s.appliance==='pot'?'🍜':'🥟'):
 iconForIngredient(s.ingredient);
}
function clock(seconds:number){return Math.ceil(Math.max(0,seconds))+'s'}
function KitchenMeal({state,slot}:{state:KitchenState;slot:0|1}){
 const dish=boardDish(state,slot),{vessel,items}=dish;
 if(!vessel)return <div className="noodle-empty-dish"><span>✧</span><strong>Board {slot+1}</strong><small>Drop a bowl or plate here</small></div>;
 const customer=state.orders.find(o=>o.id===dish.orderId);
 return <div className="noodle-plated-food">
   <NoodleDishArt dish={dish}/>
   <strong>{customer?'For '+GUEST_NAMES[customer.guest]:'New dish'} · {vessel==='bowl'?'Noodle bowl':'Dumpling plate'}</strong>
   <small>{items.length===0?'Empty plate — ready for toppings':
    items.map(x=>x==='cooked-noodles'?'noodles':x==='steamed-dumplings'?'dumplings':x).join(' · ')}</small>
 </div>;
}
export default function NoodleShop({onHome}:{onHome:()=>void}){
 const [saved,setSaved]=useState<NoodleSave>(readNoodleSave);
 const [levelChoice,setLevelChoice]=useState(1);
 const [musicOn,setMusicOn]=useState(()=>localStorage.getItem('molly-noodle-music')!=='off');
 const player=useRef<NoodleMusic|null>(null);
 const [game,setGame]=useState<KitchenState|null>(null);
 const [selected,setSelected]=useState<Source|null>(null);
 const [ghost,setGhost]=useState<Ghost|null>(null);
 const [feedback,setFeedback]=useState('');
 const drag=useRef<Drag|null>(null);
 const recorded=useRef(false);
 useEffect(()=>()=>{player.current?.stop();player.current=null},[]);
 function sound(value:boolean){setMusicOn(value);try{localStorage.setItem('molly-noodle-music',value?'on':'off')}catch{/* optional */}
  if(!value){player.current?.stop();player.current=null}
  else if(game?.status==='playing'){player.current=startNoodleMusic(game.level);player.current.setPaused(game.paused)}
 }
 useEffect(()=>{
  if(!game||game.status!=='playing')return;
  let previous=performance.now();
  const id=window.setInterval(()=>{
   const now=performance.now(),dt=Math.min(.35,(now-previous)/1000);previous=now;
   if(document.hidden)return;
   setGame(p=>p?tickKitchen(p,dt):p);
  },100);
  return ()=>window.clearInterval(id);
 },[game?.status,game?.mode]);
 useEffect(()=>{
  if(!game||game.status!=='finished'||recorded.current)return;
  recorded.current=true;
  if(game.mode==='shift'&&levelWon(game)&&game.level===8){
   const reward=awardNoodleCoupon(readNoodleCoupon());writeNoodleCoupon(reward);
  }
  player.current?.celebrate();player.current?.stop();player.current=null;
  setSaved(prev=>{const next=recordKitchenResult(prev,game);writeNoodleSave(next);return next});
 },[game?.status,game?.mode]);
 function launch(mode:'tutorial'|'shift',level=levelChoice){
  if(mode==='shift'&&(!saved.tutorialDone||level>saved.unlockedLevel))return;
  recorded.current=false;setSelected(null);setGhost(null);setFeedback('');drag.current=null;
  player.current?.stop();player.current=musicOn?startNoodleMusic(mode==='shift'?level:1):null;
  setGame(newKitchen(mode,level));window.scrollTo({top:0,behavior:'smooth'});
 }
 function backToMenu(){player.current?.stop();player.current=null;setSelected(null);setGhost(null);drag.current=null;setGame(null)}
 function pauseGame(){setGame(p=>{if(!p)return p;const next=toggleKitchenPause(p);player.current?.setPaused(next.paused);return next})}
 function dispatch(source:Source,target:Target){
  setGame(p=>p?dropInKitchen(p,source,target):p);
  setSelected(null);setFeedback('');
 }
 function onZone(target:Target){
  if(!selected){setFeedback('Select an ingredient or cooked food first, then tap its destination.');return}
  dispatch(selected,target);
 }
 function onPointerDown(e:ReactPointerEvent<HTMLButtonElement>,source:Source){
  if(game?.paused||game?.status==='finished')return;
  if(e.pointerType==='mouse'&&e.button!==0)return;
  drag.current={source,x:e.clientX,y:e.clientY,pointerId:e.pointerId,moving:false};
  e.currentTarget.setPointerCapture(e.pointerId);
 }
 function onPointerMove(e:ReactPointerEvent<HTMLButtonElement>){
  const d=drag.current;
  if(!d||d.pointerId!==e.pointerId)return;
  if(!d.moving&&Math.hypot(e.clientX-d.x,e.clientY-d.y)>7)d.moving=true;
  if(d.moving)setGhost({source:d.source,x:e.clientX,y:e.clientY});
 }
 function onPointerUp(e:ReactPointerEvent<HTMLButtonElement>){
  const d=drag.current;
  if(!d||d.pointerId!==e.pointerId)return;
  drag.current=null;setGhost(null);
  if(d.moving){
   const el=document.elementFromPoint(e.clientX,e.clientY);
   const zone=el?.closest<HTMLElement>('[data-kitchen-target]');
   const target=zone?.dataset.kitchenTarget as Target|undefined;
   if(target)dispatch(d.source,target);
   else{setSelected(d.source);setFeedback('Drop the item over a highlighted kitchen station, or tap a destination.')}
  }else{setSelected(d.source);setFeedback('');}
 }
 function draggable(source:Source,content:React.ReactNode,extraClass=''){
  const current=selected&&JSON.stringify(selected)===JSON.stringify(source);
  return <button type="button" className={'noodle-draggable '+extraClass+(current?' is-selected':'')}
   aria-pressed={!!current} aria-label={'Pick up '+sourceName(source)}
   onPointerDown={e=>onPointerDown(e,source)}
   onPointerMove={onPointerMove}
   onPointerUp={onPointerUp}
   onPointerCancel={()=>{drag.current=null;setGhost(null)}}
   onClick={e=>{e.stopPropagation();if(e.detail===0){setSelected(source);setFeedback('')}}}
   onKeyDown={(e:KeyboardEvent<HTMLButtonElement>)=>{
    if(e.key==='Enter'||e.key===' ')e.stopPropagation();
    if(e.key==='Escape'){e.stopPropagation();setSelected(null);setFeedback('')}
   }}
   >{content}</button>;
 }
 function zone(target:Target,children:React.ReactNode,className:string){
  return <div data-kitchen-target={target}
   className={'noodle-dropzone '+className+(selected||ghost?' is-targetable':'')}
   onClick={()=>onZone(target)} role="button" tabIndex={0}
   aria-label={'Drop selected item on '+({pot:'boiling pot',steamer:'bamboo steamer',board:'preparation board one',board2:'preparation board two',serve:'serving bell',bin:'discard bin'}[target])}
   onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onZone(target)}}}>
   {children}</div>;
 }
 function applianceView(id:Appliance){
  const cooking=game![id],phase=cookingPhase(game!,id);
  const percent=cookingFraction(game!,id)*100;
  const label=id==='pot'?'Boiling pot':'Bamboo steamer';
  const ready=id==='pot'?'🍜':'🥟';
  const age=cooking?game!.elapsed-cooking.startedAt:0;
  return zone(id,<div className={'noodle-appliance phase-'+phase}>
   <div className="noodle-machine-title"><strong>{label}</strong><span>{id==='pot'?'01 · BOIL':'02 · STEAM'}</span></div>
   <KitchenPotArt type={id} active={!!cooking}/>
   <div className="noodle-appliance-food">
    {cooking?draggable({kind:'cooker',appliance:id},<>
      <span className="noodle-cooked-icon">{phase==='burnt'?'💨':phase==='ready'?ready:iconForIngredient(cooking.item)}</span>
      <strong>{phase==='ready'?'READY! Drag to dish':phase==='burnt'?'BURNT! Discard':clock(COOK_SECONDS[id]-age)+' · cooking'}</strong>
     </>,'noodle-cooked-drag'): <span className="noodle-empty-machine">Drop {id==='pot'?'noodles':'dumplings'} here</span>}
   </div>
   <div className="noodle-cook-meter" aria-label={'Cooking progress '+Math.round(percent)+' percent'}>
    <span style={{width:percent+'%'}}/>
   </div>
   {cooking&&phase==='ready'&&<small className="noodle-burn-watch">Collect before {clock(BURN_SECONDS[id]-age)}!</small>}
  </div>,'noodle-appliance-zone'+(game!.mode==='tutorial'&&tutorialStep===2&&id==='pot'?' noodle-guide-target':''));
 }
 const recipe=game?activeRecipe(game):undefined;
 const hint=game?nextKitchenInstruction(game):'';
 const currentDish=game?(game.dish.orderId===game.activeOrderId?game.dish:game.secondDish.orderId===game.activeOrderId?game.secondDish:null):null;
 const tutorialStep=game?(game.status==='finished'?7:
  !game.dish.vessel?1:
  !game.pot&&!game.dish.items.includes('cooked-noodles')?2:
  game.pot&&cookingPhase(game,'pot')==='cooking'?3:
  game.pot&&cookingPhase(game,'pot')==='ready'?4:
  !game.dish.items.includes('broth')?5:
  !game.dish.items.includes('greens')?6:7):0;
 return <main className="noodle-page">
  <button className="back-link" onClick={onHome}>← Back to the arcade</button>
  <header className="noodle-hero">
   <TempleNoodleBackdrop/>
   <div className="noodle-hero-copy">
    <span>✦ THE VALLEY OF PEACE · A NEW KITCHEN ADVENTURE ✦</span>
    <h1>Noodles of <em>Destiny</em></h1>
    <p>Mr. Ping's kitchen needs a helping paw. Welcome, Chef Molly!</p>
   </div>
   <div className="noodle-hero-ping"><KitchenCharacter who="ping" size={130}/></div>
   <div className="noodle-hero-po"><KitchenCharacter who="po" size={155}/></div>
  </header>
  {!game?<section className="noodle-welcome">
   <div className="noodle-opening-story">
    <div className="noodle-letterhead">A NOTE FROM MR. PING ✧</div>
    <h2>Every legendary chef starts with one bowl.</h2>
    <p>Po has eaten all the test dumplings, the lunch crowd is coming, and Mr. Ping has decided that <strong>Molly</strong> is the perfect person to save his kitchen. Drag ingredients, cook them at the right station, assemble each dish, and ring the bell when it's ready.</p>
    <p>Begin with an untimed lesson, then progress through eight lively martial-arts kitchen shifts. Run the pot and steamer together and dress two plates at once!</p>
    <div className="noodle-welcome-actions">
     <button className="btn btn-primary" onClick={()=>launch('tutorial')}>{saved.tutorialDone?'↶ Replay the tutorial':'🥣 Start the guided tutorial'} ↗</button>
     <button className="btn btn-soft" disabled={!saved.tutorialDone} onClick={()=>launch('shift',levelChoice)}>🎐 Play Level {levelChoice} ↗</button>
    </div>
    {!saved.tutorialDone&&<small>Complete the tutorial once to unlock Level 1. You can always replay it.</small>}
    {saved.tutorialDone&&<div className="noodle-keepsake">✧ Training completed · Best service: {saved.bestServed} guests · High score: {saved.bestScore} · Shifts played: {saved.shifts}</div>}
    <div className="noodle-level-heading"><span>THE EIGHT PATHS TO DRAGON CHEF</span><small>Win each shift to unlock the next</small></div>
    <div className="noodle-level-grid" role="group" aria-label="Choose a kitchen difficulty">
     {KITCHEN_LEVELS.map(l=><button type="button" key={l.id}
       disabled={!saved.tutorialDone||l.id>saved.unlockedLevel}
       className={'noodle-level-tile '+(l.id===levelChoice?'is-picked':'')+(l.id>saved.unlockedLevel?' is-locked':'')}
       onClick={()=>setLevelChoice(l.id)}>
       <span>{l.id>saved.unlockedLevel?'🔒':l.id===8?'🐉':'✦'}</span>
       <strong>{String(l.id).padStart(2,'0')}. {l.name}</strong>
       <small>{l.orders.length} guests · {l.duration}s shift</small>
       <em>{saved.levelStars[String(l.id)]?'★ '+saved.levelStars[String(l.id)]+'/'+l.orders.length+' served':l.id>saved.unlockedLevel?'Locked':'Ready to play'}</em>
      </button>)}
    </div>
    <div className="noodle-chosen-level">{KITCHEN_LEVELS[levelChoice-1].subtitle} · {KITCHEN_LEVELS[levelChoice-1].description}</div>
   </div>
   <div className="noodle-menu-preview">
    <span className="noodle-menu-top">✿ TODAY'S MENU ✿</span>
    {Object.values(RECIPES).map(r=><div key={r.id}><span>{r.emoji}</span><div><strong>{r.name}</strong><small>{r.description}</small></div></div>)}
    <small>Original hand-drawn scenery · Drag, drop, simmer and serve.</small>
   </div>
  </section>:<>
   <section className="noodle-game-toolbar">
    <div><span className="noodle-game-kicker">{game.mode==='tutorial'?'TRAINING DAY · TAKE YOUR TIME' :'LEVEL '+game.level+' · '+shiftForLevel(game.level).name.toUpperCase()}</span>
      <h2>{game.mode==='tutorial'?'A lesson with Mr. Ping' :shiftForLevel(game.level).subtitle}</h2></div>
    <div className="noodle-game-stats">
     {game.mode==='shift'&&<div><small>TIME REMAINING</small><strong>{clock(shiftDuration(game)-game.elapsed)}</strong></div>}
     <div><small>ORDERS SERVED</small><strong>{game.served} / {game.orders.length}</strong></div>
     {game.mode==='shift'&&<div><small>POINTS</small><strong>{game.score}</strong></div>}
    </div>
    <div className="noodle-toolbar-actions">
     {game.mode==='shift'&&game.status==='playing'&&<button type="button" onClick={pauseGame}>{game.paused?'▶ Resume':'Ⅱ Pause'}</button>}
     <button type="button" className="noodle-music-toggle" aria-pressed={musicOn} onClick={()=>sound(!musicOn)}>{musicOn?'♫ Music on':'♪ Music muted'}</button>
     <button type="button" onClick={()=>launch('tutorial')}>↶ Tutorial</button>
     <button type="button" onClick={backToMenu}>⌂ Menu</button>
    </div>
   </section>
   {game.status==='finished'?<section className="noodle-results">
    <span className="noodle-result-medal">{game.mode==='tutorial'?'🏮':levelWon(game)?'🏆':game.served>=2?'🥇':game.served===1?'🥟':'🍵'}</span>
    <span className="noodle-game-kicker">{game.mode==='tutorial'?'TUTORIAL COMPLETE':'SHIFT COMPLETE'}</span>
    <h2>{game.mode==='tutorial'?'A new chef joins the Valley!':levelWon(game)?'The Valley cheers for Chef Molly!':game.served>=2?'A promising kitchen shift!':game.served===1?'Every chef starts somewhere!':'The kitchen will be ready tomorrow.'}</h2>
    <p>{game.mode==='tutorial'?'Po has already requested a second serving. You can replay this lesson whenever you want.':
      'You served '+game.served+' of '+game.orders.length+' guests, scored '+game.score+' points and made '+game.mistakes+' little mistakes. '+(levelWon(game)?'A new chapter awaits!':'Serve at least '+shiftForLevel(game.level).starTarget+' guests to pass this chapter; you can retry freely.')}</p>
    <div className="noodle-result-orders">{game.orders.map(o=><div key={o.id}><KitchenCharacter who={o.guest} size={65}/><strong>{GUEST_NAMES[o.guest]}</strong><small>{o.status==='served'?'✓ Served':'○ Missed'}</small></div>)}</div>
    <div className="noodle-welcome-actions">
     {game.mode==='tutorial'?<button className="btn btn-primary" onClick={()=>launch('shift',1)}>Open the shop — Level 1 ↗</button>:
      <button className="btn btn-primary" onClick={()=>launch('shift',game.level)}>↶ Replay Level {game.level}</button>}
     {game.mode==='shift'&&levelWon(game)&&game.level<8&&<button className="btn btn-primary" onClick={()=>{setLevelChoice(game.level+1);launch('shift',game.level+1)}}>Next chapter: Level {game.level+1} ↗</button>}
     <button className="btn btn-soft" onClick={()=>launch('tutorial')}>Replay tutorial ↗</button>
     <button className="btn btn-soft" onClick={backToMenu}>Return to shop</button>
    </div>
    {game.mode==='shift'&&game.level===8&&levelWon(game)&&<div className="noodle-winner-coupon"><strong>🏮 Dragon Chef reward unlocked!</strong><p>Two home-cooked treats from Rouhin—Soup Dumplings or Ramen—redeemable within three months.</p><NoodleCouponPanel/></div>}
   </section>:<>
    <section className="noodle-order-board" aria-label="Customer orders">
     <div className="noodle-order-head"><strong>📜 Incoming orders</strong><span>{game.mode==='tutorial'?'Po will wait as long as you need.':'Use two boards and two appliances together! Tap a ticket to select an order.'}</span></div>
     <div className="noodle-order-list">
      {game.orders.map(o=>{
       const r=RECIPES[o.recipeId],waiting=o.status==='waiting',active=o.id===game.activeOrderId;
       const remaining=remainingPatience(game,o);
       return <button type="button" disabled={o.status!=='waiting'||game.paused}
        onClick={()=>{setGame(p=>p?chooseKitchenOrder(p,o.id):p);setSelected(null)}}
        key={o.id} className={'noodle-order-ticket ticket-'+o.status+(active?' is-current':'')}>
        <div className="noodle-ticket-guest"><KitchenCharacter who={o.guest} size={65}/>
          <span><strong>{GUEST_NAMES[o.guest]}</strong><small>{o.status==='pending'?'Arrives in '+clock(o.arrivesAt-game.elapsed):o.status==='served'?'✓ Served':o.status==='missed'?'✕ Missed':active?'✓ Preparing now':'Tap to select'}</small></span></div>
        <div className="noodle-ticket-food"><strong>{r.emoji} {r.name}</strong><small>{r.extras.map(i=>STOCK.find(x=>x.id===i)?.name).join(' + ')}</small></div>
        {waiting&&game.mode==='shift'&&<div className="noodle-patience"><span style={{width:Math.max(0,remaining/o.patience*100)+'%'}}/><small>{clock(remaining)} patience</small></div>}
       </button>
      })}
     </div>
    </section>
    <section className="noodle-instruction" role="status">
     <div className="noodle-instructor"><KitchenCharacter who="ping" size={79}/></div>
     <div><span>{game.mode==='tutorial'?'MR. PING · COOKING LESSON '+tutorialStep+' OF 7':'MR. PING · KITCHEN TIP'}</span>
      <strong>{hint}</strong><p>{game.message!==hint?game.message:'Follow the golden glow on your next station.'}</p></div>
     {game.mode==='tutorial'&&<div className="noodle-lesson-dots" aria-label={'Tutorial step '+tutorialStep+' of 7'}>
      {Array.from({length:7},(_,i)=><i className={i<tutorialStep?'done':''} key={i}/>)}</div>}
    </section>
    {game.paused&&<div className="noodle-pause-banner"><strong>⏸ Kitchen paused</strong><p>Time and customer patience are stopped.</p><button onClick={()=>setGame(p=>p?toggleKitchenPause(p):p)}>Resume cooking ↗</button></div>}
    <section className={'noodle-kitchen '+(game.paused?'is-paused':'')} aria-label="Interactive kitchen">
     <div className="noodle-wooden-frame">
      <div className="noodle-section-title"><span>01</span><div><strong>The pantry</strong><small>Pick up an ingredient</small></div><span aria-hidden="true">✿</span></div>
      <div className="noodle-pantry">
       {STOCK.map(i=><div key={i.id} className="noodle-pantry-item">
        {draggable({kind:'stock',ingredient:i.id},<>
         <span className="noodle-item-emoji" aria-hidden="true">{i.emoji}</span><strong>{i.name}</strong>
         <small>{i.hint}</small>
        </>,game.mode==='tutorial'&&(
         (tutorialStep===1&&i.id==='bowl')||(tutorialStep===2&&i.id==='noodles')||
         (tutorialStep===5&&i.id==='broth')||(tutorialStep===6&&i.id==='greens'))
         ?' noodle-guide-glow':'')}
       </div>)}
      </div>
     </div>
     <div className="noodle-wooden-frame">
      <div className="noodle-section-title"><span>02</span><div><strong>The cooking fire</strong><small>Watch, then collect your food</small></div><span aria-hidden="true">♨</span></div>
      <div className="noodle-appliances">
       {applianceView('pot')}
       {applianceView('steamer')}
      </div>
     </div>
     <div className="noodle-wooden-frame noodle-final-stations">
      <div className="noodle-section-title"><span>03</span><div><strong>Finish & serve</strong><small>Assemble the right order</small></div><span aria-hidden="true">✧</span></div>
      <div className="noodle-two-boards">
       {([0,1] as const).map(slot=><div className="noodle-board-frame" key={slot}>
        <div className="noodle-board-label"><strong>BOARD {slot+1}</strong><small>{boardDish(game,slot).orderId?GUEST_NAMES[game.orders.find(o=>o.id===boardDish(game,slot).orderId)?.guest??'po']:'Free for a new order'}</small></div>
        {zone(slot===0?'board':'board2',<div className="noodle-assembly-board">
         {boardDish(game,slot).vessel?
          draggable({kind:'dish',slot},<KitchenMeal state={game} slot={slot}/>,'noodle-dish-drag'):
          <KitchenMeal state={game} slot={slot}/>}
        </div>,'noodle-board-zone'+(game.mode==='tutorial'&&slot===0&&(tutorialStep===1||tutorialStep===4||tutorialStep===5||tutorialStep===6)?' noodle-guide-target':''))}
       </div>)}
      </div>
      <div className="noodle-service-row">
       {zone('serve',<div className={'noodle-bell '+((recipeComplete(game,0)||recipeComplete(game,1))?'is-ready':'')}>
        <span aria-hidden="true">🔔</span><strong>Serve the meal</strong><small>Drop finished dish here</small>
       </div>,'noodle-bell-zone'+(game.mode==='tutorial'&&tutorialStep===7?' noodle-guide-target':''))}
       {zone('bin',<div className="noodle-bin"><span aria-hidden="true">🗑️</span><strong>Discard</strong><small>Clear burnt food / dish</small></div>,'noodle-bin-zone')}
      </div>
     </div>
    </section>
    {recipe&&<section className="noodle-recipe-card">
     <div><span className="noodle-game-kicker">OPEN RECIPE CARD</span><h3>{recipe.emoji} {recipe.name}</h3><p>{recipe.description}</p></div>
     <div className="noodle-recipe-steps">
      {[recipe.vessel,recipe.raw,recipe.cooked,...recipe.extras,'serve'].map((part,i)=>{
       const checked=part===recipe.vessel?!!currentDish?.vessel:part===recipe.raw?
        (!!game[recipe.appliance]&&game[recipe.appliance]?.orderId===game.activeOrderId)||!!currentDish?.items.includes(recipe.cooked):
        part==='serve'?false:!!currentDish?.items.includes(part);
       return <span key={part+'-'+i} className={checked?'is-checked':''}>{checked?'✓':'○'} {part==='serve'?'Ring bell':part===recipe.raw?'Cook '+part:part===recipe.cooked?'Collect cooked food':STOCK.find(x=>x.id===part)?.name??part}</span>;
      })}
     </div>
    </section>}
    {selected&&<div className="noodle-quickdrop" role="group" aria-label="Quick-drop selected food">
      <span>✋ {sourceName(selected)} · place at:</span>
      <div>
       {(['pot','steamer','board','board2','serve','bin'] as Target[]).map(t=>
        <button type="button" key={t} onClick={()=>dispatch(selected,t)}>
          {{pot:'🍲 Pot',steamer:'🥟 Steamer',board:'① Board',board2:'② Board',serve:'🔔 Serve',bin:'🗑️ Discard'}[t]}
        </button>)}
       <button type="button" onClick={()=>setSelected(null)} aria-label="Cancel selected item">✕</button>
      </div>
     </div>}
    <p className="noodle-input-hint">✧ <strong>Drag and drop</strong> ingredients or cooked food to the right station. On touchscreens, or with a keyboard, <strong>select an item and then tap or activate its destination</strong>. Esc clears a selection. {selected?'Selected: '+sourceName(selected):feedback}</p>
   </>}
  </>}
  {ghost&&<div className="noodle-drag-ghost" style={{left:ghost.x,top:ghost.y}} aria-hidden="true"><span>{sourceIcon(ghost.source)}</span><small>{sourceName(ghost.source)}</small></div>}
  <p className="noodle-fan-note">An original, unofficial fan-made cooking mini-adventure for Molly. Illustrated entirely with in-project artwork; no film images or soundtrack assets are used. Eight handcrafted shifts with original fan-art, recipes and music. This is an unofficial personal fan game.</p>
 </main>;
}
