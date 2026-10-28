import {useEffect,useRef,useState,type PointerEvent as ReactPointerEvent,type KeyboardEvent} from 'react';
import {KitchenCharacter,NoodleShopScenery} from './NoodleShopArt';
import {
 STOCK,RECIPES,SHIFT_DURATION,COOK_SECONDS,BURN_SECONDS,
 newKitchen,dropInKitchen,tickKitchen,cookingPhase,cookingFraction,
 activeRecipe,remainingPatience,chooseKitchenOrder,nextKitchenInstruction,
 toggleKitchenPause,recordKitchenResult,readNoodleSave,writeNoodleSave,recipeComplete,
 type Source,type Target,type KitchenState,type NoodleSave,type Appliance,type Ingredient
} from '../lib/noodleShop';

type Drag={source:Source;x:number;y:number;pointerId:number;moving:boolean};
type Ghost={source:Source;x:number;y:number};
const GUEST_NAMES={po:'Po',rabbit:'Bunny',monkey:'Monkey',tigress:'Tigress'};
function iconForIngredient(i:string):string{
 return ({bowl:'🥣',plate:'🍽️',noodles:'🍝',dumplings:'🥟',broth:'🍲',greens:'🥬',
 mushrooms:'🍄',sauce:'🥢','cooked-noodles':'🍜','steamed-dumplings':'🥟'} as Record<string,string>)[i]??'🍃';
}
function sourceName(s:Source):string{
 return s.kind==='dish'?'Prepared dish':s.kind==='cooker'?(s.appliance==='pot'?'Cooked noodles':'Steamed dumplings'):
 STOCK.find(x=>x.id===s.ingredient)?.name??s.ingredient;
}
function sourceIcon(s:Source):string{
 return s.kind==='dish'?'🍽️':s.kind==='cooker'?(s.appliance==='pot'?'🍜':'🥟'):
 iconForIngredient(s.ingredient);
}
function clock(seconds:number){return Math.ceil(Math.max(0,seconds))+'s'}
function KitchenMeal({state}:{state:KitchenState}){
 const {vessel,items}=state.dish;
 if(!vessel)return <div className="noodle-empty-dish"><span>✧</span><strong>Your serving board</strong><small>Drop an empty bowl or plate here</small></div>;
 const main=items.includes('cooked-noodles')?'🍜':items.includes('steamed-dumplings')?'🥟':vessel==='bowl'?'🥣':'🍽️';
 return <div className="noodle-plated-food">
   <span className="noodle-dish-shadow"/>
   <span className="noodle-main-food" aria-hidden="true">{main}</span>
   {items.filter(x=>x!=='cooked-noodles'&&x!=='steamed-dumplings').map((item,i)=>
    <span className={'noodle-food-garnish garnish-'+i} key={item} aria-hidden="true">{iconForIngredient(item)}</span>)}
   <strong>{vessel==='bowl'?'Noodle bowl':'Serving plate'}</strong>
   <small>{items.length===0?'Empty — waiting for food':
    items.map(x=>x==='cooked-noodles'?'noodles':x==='steamed-dumplings'?'dumplings':x).join(' · ')}</small>
  </div>;
}
export default function NoodleShop({onHome}:{onHome:()=>void}){
 const [saved,setSaved]=useState<NoodleSave>(readNoodleSave);
 const [game,setGame]=useState<KitchenState|null>(null);
 const [selected,setSelected]=useState<Source|null>(null);
 const [ghost,setGhost]=useState<Ghost|null>(null);
 const [feedback,setFeedback]=useState('');
 const drag=useRef<Drag|null>(null);
 const recorded=useRef(false);
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
  setSaved(prev=>{const next=recordKitchenResult(prev,game);writeNoodleSave(next);return next});
 },[game?.status,game?.mode]);
 function launch(mode:'tutorial'|'shift'){
  if(mode==='shift'&&!saved.tutorialDone)return;
  recorded.current=false;setSelected(null);setGhost(null);setFeedback('');drag.current=null;
  setGame(newKitchen(mode));window.scrollTo({top:0,behavior:'smooth'});
 }
 function backToMenu(){setSelected(null);setGhost(null);drag.current=null;setGame(null)}
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
   onKeyDown={(e:KeyboardEvent<HTMLButtonElement>)=>{if(e.key==='Escape'){setSelected(null);setFeedback('')}}}
   >{content}</button>;
 }
 function zone(target:Target,children:React.ReactNode,className:string){
  return <div data-kitchen-target={target}
   className={'noodle-dropzone '+className+(selected||ghost?' is-targetable':'')}
   onClick={()=>onZone(target)} role="button" tabIndex={0}
   aria-label={'Drop selected item on '+({pot:'boiling pot',steamer:'bamboo steamer',board:'preparation board',serve:'serving bell',bin:'discard bin'}[target])}
   onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onZone(target)}}}>
   {children}</div>;
 }
 function applianceView(id:Appliance){
  const cooking=game![id],phase=cookingPhase(game!,id);
  const percent=cookingFraction(game!,id)*100;
  const label=id==='pot'?'Boiling pot':'Bamboo steamer';
  const ready=id==='pot'?'🍜':'🥟';
  const icon=id==='pot'?'🍲':'🧺';
  const age=cooking?game!.elapsed-cooking.startedAt:0;
  return zone(id,<div className={'noodle-appliance phase-'+phase}>
   <div className="noodle-machine-title"><strong>{label}</strong><span>{id==='pot'?'01 · BOIL':'02 · STEAM'}</span></div>
   <span className="noodle-machine-emoji" aria-hidden="true">{icon}</span>
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
  </div>,'noodle-appliance-zone');
 }
 const recipe=game?activeRecipe(game):undefined;
 const hint=game?nextKitchenInstruction(game):'';
 const tutorialStep=game?(game.status==='finished'?7:
  !game.dish.vessel?1:
  !game.dish.items.includes('cooked-noodles')?
   !game.pot?2:cookingPhase(game,'pot')==='cooking'?3:4:
  !game.dish.items.includes('broth')?5:
  !game.dish.items.includes('greens')?6:7):0;
 return <main className="noodle-page">
  <button className="back-link" onClick={onHome}>← Back to the arcade</button>
  <header className="noodle-hero">
   <NoodleShopScenery/>
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
    <p>We’ll begin with a calm, untimed cooking lesson. Then the doors open for one real, gently challenging shift.</p>
    <div className="noodle-welcome-actions">
     <button className="btn btn-primary" onClick={()=>launch('tutorial')}>{saved.tutorialDone?'↶ Replay the tutorial':'🥣 Start the guided tutorial'} ↗</button>
     <button className="btn btn-soft" disabled={!saved.tutorialDone} onClick={()=>launch('shift')}>🎐 Play Level 1: Lunch Rush ↗</button>
    </div>
    {!saved.tutorialDone&&<small>Complete the tutorial once to unlock Level 1. You can always replay it.</small>}
    {saved.tutorialDone&&<div className="noodle-keepsake">✧ Training completed · Best shift: {saved.bestServed}/3 guests · High score: {saved.bestScore} · Shifts played: {saved.shifts}</div>}
   </div>
   <div className="noodle-menu-preview">
    <span className="noodle-menu-top">✿ TODAY'S MENU ✿</span>
    {Object.values(RECIPES).map(r=><div key={r.id}><span>{r.emoji}</span><div><strong>{r.name}</strong><small>{r.description}</small></div></div>)}
    <small>Original hand-drawn scenery · Drag, drop, simmer and serve.</small>
   </div>
  </section>:<>
   <section className="noodle-game-toolbar">
    <div><span className="noodle-game-kicker">{game.mode==='tutorial'?'TRAINING DAY · TAKE YOUR TIME':'LEVEL 1 · LUNCH RUSH'}</span>
      <h2>{game.mode==='tutorial'?'A lesson with Mr. Ping':'The lunch crowd is here!'}</h2></div>
    <div className="noodle-game-stats">
     {game.mode==='shift'&&<div><small>TIME REMAINING</small><strong>{clock(SHIFT_DURATION-game.elapsed)}</strong></div>}
     <div><small>ORDERS SERVED</small><strong>{game.served} / {game.orders.length}</strong></div>
     {game.mode==='shift'&&<div><small>POINTS</small><strong>{game.score}</strong></div>}
    </div>
    <div className="noodle-toolbar-actions">
     {game.mode==='shift'&&game.status==='playing'&&<button type="button" onClick={()=>setGame(p=>p?toggleKitchenPause(p):p)}>{game.paused?'▶ Resume':'Ⅱ Pause'}</button>}
     <button type="button" onClick={()=>launch('tutorial')}>↶ Tutorial</button>
     <button type="button" onClick={backToMenu}>⌂ Menu</button>
    </div>
   </section>
   {game.status==='finished'?<section className="noodle-results">
    <span className="noodle-result-medal">{game.mode==='tutorial'?'🏮':game.served===3?'🏆':game.served>=2?'🥇':game.served===1?'🥟':'🍵'}</span>
    <span className="noodle-game-kicker">{game.mode==='tutorial'?'TUTORIAL COMPLETE':'SHIFT COMPLETE'}</span>
    <h2>{game.mode==='tutorial'?'A new chef joins the Valley!':game.served===3?'A perfect lunch rush!':game.served>=2?'Mr. Ping is impressed!':game.served===1?'Every chef starts somewhere!':'The kitchen will be ready tomorrow.'}</h2>
    <p>{game.mode==='tutorial'?'Po has already requested a second serving. You can replay this lesson whenever you want.':
      'You served '+game.served+' of 3 hungry customers, scored '+game.score+' points, and made '+game.mistakes+' practice mistakes. The first shift is designed for us to test pacing and feel.'}</p>
    <div className="noodle-result-orders">{game.orders.map(o=><div key={o.id}><KitchenCharacter who={o.guest} size={65}/><strong>{GUEST_NAMES[o.guest]}</strong><small>{o.status==='served'?'✓ Served':'○ Missed'}</small></div>)}</div>
    <div className="noodle-welcome-actions">
     {game.mode==='tutorial'?<button className="btn btn-primary" onClick={()=>launch('shift')}>Open the shop — Level 1 ↗</button>:
      <button className="btn btn-primary" onClick={()=>launch('shift')}>↶ Play Level 1 again</button>}
     <button className="btn btn-soft" onClick={()=>launch('tutorial')}>Replay tutorial ↗</button>
     <button className="btn btn-soft" onClick={backToMenu}>Return to shop</button>
    </div>
   </section>:<>
    <section className="noodle-order-board" aria-label="Customer orders">
     <div className="noodle-order-head"><strong>📜 Incoming orders</strong><span>{game.mode==='tutorial'?'Po will wait as long as you need.':'Choose a waiting order. Guests have limited patience.'}</span></div>
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
        </>)}
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
      {zone('board',<div className="noodle-assembly-board">
       {game.dish.vessel?draggable({kind:'dish'},<KitchenMeal state={game}/>,'noodle-dish-drag'):
        <KitchenMeal state={game}/>}
      </div>,'noodle-board-zone')}
      <div className="noodle-service-row">
       {zone('serve',<div className={'noodle-bell '+(recipeComplete(game)?'is-ready':'')}>
        <span aria-hidden="true">🔔</span><strong>Serve the meal</strong><small>Drop finished dish here</small>
       </div>,'noodle-bell-zone')}
       {zone('bin',<div className="noodle-bin"><span aria-hidden="true">🗑️</span><strong>Discard</strong><small>Clear burnt food / dish</small></div>,'noodle-bin-zone')}
      </div>
     </div>
    </section>
    {recipe&&<section className="noodle-recipe-card">
     <div><span className="noodle-game-kicker">OPEN RECIPE CARD</span><h3>{recipe.emoji} {recipe.name}</h3><p>{recipe.description}</p></div>
     <div className="noodle-recipe-steps">
      {[recipe.vessel,recipe.raw,recipe.cooked,...recipe.extras,'serve'].map((part,i)=>{
       const checked=part===recipe.vessel?!!game.dish.vessel:part===recipe.raw?
        !!game[recipe.appliance]||game.dish.items.includes(recipe.cooked):part==='serve'?false:game.dish.items.includes(part);
       return <span key={part+'-'+i} className={checked?'is-checked':''}>{checked?'✓':'○'} {part==='serve'?'Ring bell':part===recipe.raw?'Cook '+part:part===recipe.cooked?'Collect cooked food':STOCK.find(x=>x.id===part)?.name??part}</span>;
      })}
     </div>
    </section>}
    <p className="noodle-input-hint">✧ <strong>Drag and drop</strong> ingredients or cooked food to the right station. On touchscreens, or with a keyboard, <strong>select an item and then tap or activate its destination</strong>. Esc clears a selection. {selected?'Selected: '+sourceName(selected):feedback}</p>
   </>}
  </>}
  {ghost&&<div className="noodle-drag-ghost" style={{left:ghost.x,top:ghost.y}} aria-hidden="true"><span>{sourceIcon(ghost.source)}</span><small>{sourceName(ghost.source)}</small></div>}
  <p className="noodle-fan-note">An original, unofficial fan-made cooking mini-adventure for Molly. Illustrated entirely with in-project artwork; no film images or soundtrack assets are used. This is the tutorial and Level 1 playtest, not the full game.</p>
 </main>;
}
