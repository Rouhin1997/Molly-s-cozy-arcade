import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {braveChapters,readBraveSave,writeBraveSave,type BraveChapter,type BraveIntroChoice,type BravePreviewSave} from '../data/braveWorld';

/** Original illustrated Highland panorama. All paths are handmade vector art. */
function HighlandMap({active,onSelect}:{active:string;onSelect:(id:string)=>void}){
 const firs=Array.from({length:39},(_,i)=>{
  const x=32+(i*109+53)%1036,layer=i%3;
  const y=237+((i*67+19)%260),size=layer===0?24:layer===1?35:46;
  return {x,y,size,id:i};
 });
 const hillFlowers=Array.from({length:28},(_,i)=>({x:((i*127+45)%1060)+20,y:((i*79+16)%128)+435,id:i}));
 return <div className="brave-map-view">
  <svg viewBox="0 0 1100 600" className="brave-map-art" role="img" aria-label="Original painted-style Scottish Highland fantasy map with castle, forest, Witch’s cottage, ancient stones, moonlit ruins and tapestry clearing">
   <defs>
    <linearGradient id="brave-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#355b67"/><stop offset=".62" stopColor="#78948e"/><stop offset="1" stopColor="#d5cc9d"/></linearGradient>
    <linearGradient id="brave-mountains" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#58716e"/><stop offset="1" stopColor="#244d4a"/></linearGradient>
    <linearGradient id="brave-hills" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#46745e"/><stop offset="1" stopColor="#193e39"/></linearGradient>
    <radialGradient id="brave-wisp"><stop offset="0" stopColor="#f5ffff"/><stop offset=".24" stopColor="#a5fcf9"/><stop offset=".53" stopColor="#75d5db" stopOpacity=".56"/><stop offset="1" stopColor="#77dceb" stopOpacity="0"/></radialGradient>
    <linearGradient id="brave-water" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9cd3ca"/><stop offset=".7" stopColor="#4c8991"/><stop offset="1" stopColor="#315965"/></linearGradient>
    <filter id="brave-blur"><feGaussianBlur stdDeviation="13"/></filter>
    <filter id="brave-soft"><feGaussianBlur stdDeviation="4"/></filter>
    <pattern id="brave-parchment" width="32" height="27" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r="1.2" fill="#fff4c6" opacity=".17"/><path d="M15 20 l3 -2" stroke="#e5d7aa" opacity=".15"/></pattern>
   </defs>
   <rect width="1100" height="600" fill="url(#brave-sky)"/>
   <path d="M0 257 L52 184 L104 234 L173 124 L223 211 L305 133 L389 247 L484 101 L560 231 L650 148 L747 259 L832 109 L936 221 L1024 156 L1100 235 L1100 600 L0 600Z" fill="#76918c" opacity=".8"/>
   <path d="M0 310 L69 218 L148 274 L224 148 L294 264 L379 189 L447 284 L544 156 L634 260 L727 180 L815 281 L908 175 L998 270 L1100 182 L1100 600 L0 600Z" fill="url(#brave-mountains)"/>
   <path d="M0 338 Q200 284 400 346 T800 314 T1100 348 L1100 600 L0 600Z" fill="#a2b09b" opacity=".35" filter="url(#brave-blur)"/>
   <path d="M0 347 Q120 302 257 348 Q390 295 524 356 Q683 305 814 357 Q968 299 1100 354 L1100 600 L0 600Z" fill="#456c5a"/>
   <path d="M0 422 Q145 367 290 419 Q440 359 569 415 Q744 366 898 430 Q1032 393 1100 417 L1100 600 L0 600Z" fill="url(#brave-hills)"/>
   <path d="M0 514 Q126 461 242 500 Q450 468 592 523 Q770 457 927 516 Q1037 470 1100 500 L1100 600 L0 600Z" fill="#214741"/>
   <path d="M0 585 Q124 534 259 574 Q411 535 544 585 Q707 543 811 574 Q974 535 1100 562 L1100 600 L0 600Z" fill="#193e3a"/>
   <path d="M454 350 C390 430 540 444 492 511 C470 540 561 557 529 600" fill="none" stroke="url(#brave-water)" strokeWidth="42" opacity=".78"/>
   <path d="M454 350 C392 430 546 444 496 513 C478 540 561 556 532 600" fill="none" stroke="#c0e6cb" strokeWidth="4" opacity=".48"/>
   <path d="M170 230 C235 308 272 367 380 371 C453 376 483 325 563 307 C662 292 736 378 704 437 C682 482 735 505 833 466" fill="none" stroke="#e3cb97" strokeWidth="25" strokeLinecap="round" strokeDasharray="2 4" opacity=".66"/>
   <path d="M170 230 C235 308 272 367 380 371 C453 376 483 325 563 307 C662 292 736 378 704 437 C682 482 735 505 833 466" fill="none" stroke="#f3e2b7" strokeWidth="3.2" strokeDasharray="2 10" opacity=".75"/>
   {/* Landforms and tiny pines are rendered BEFORE points of interest. */}
   {firs.map(t=><g key={t.id} transform={'translate('+t.x+' '+t.y+')'} opacity={t.y<290?.72:.86}>
     <path d={'M0 0 l0 '+t.size} stroke="#264d44" strokeWidth="3"/>
     <path d={'M0 '+(t.size*.08)+' l'+(-t.size*.53)+' '+(t.size*.70)+' h'+t.size*.98+' Z'} fill={t.id%4===0?'#173e3d':'#28564a'}/>
     <path d={'M0 '+(-t.size*.27)+' l'+(-t.size*.4)+' '+(t.size*.70)+' h'+(t.size*.78)+' Z'} fill={t.id%3===0?'#37765e':'#1e4e46'}/>
    </g>)}
   {hillFlowers.map(t=><g key={t.id} opacity=".8"><circle cx={t.x} cy={t.y} r="2.3" fill={t.id%2===0?'#e5b4b7':'#e8d68f'}/><path d={'M'+t.x+' '+(t.y+2)+' v8'} stroke="#92b47b" strokeWidth=".8"/></g>)}
   {/* Left: DunBroch and archery flags. */}
   <g transform="translate(95 166)">
     <path d="M-27 113 L-16 71 L24 71 L24 38 L49 38 L49 62 L81 62 L91 114Z" fill="#7e8178" stroke="#354a47" strokeWidth="3"/>
     <path d="M-27 113 L91 114" stroke="#303d3e" strokeWidth="8"/>
     <rect x="-20" y="49" width="19" height="46" fill="#919688" stroke="#344a48" strokeWidth="3"/><rect x="69" y="39" width="22" height="57" fill="#95998e" stroke="#344a48" strokeWidth="3"/>
     <path d="M-23 48 l3 -13 l17 0 l3 13 M67 39 l4 -12 h16 l4 12" fill="#586861" stroke="#344a48" strokeWidth="2"/>
     <path d="M24 67 l0 -43 l30 0 l0 43" fill="#a09d91" stroke="#334741" strokeWidth="3"/>
     <path d="M19 25 l21 -18 l20 18" fill="#556660"/>
     <path d="M26 113 v-29 q13 -16 26 0 v29" fill="#364d49"/>
     <g fill="#f1d5a2"><rect x="-14" y="70" width="8" height="16" rx="4"/><rect x="75" y="65" width="8" height="16" rx="4"/><rect x="36" y="42" width="7" height="12" rx="3"/></g>
     <path d="M2 28 v-47 M94 34 v-42" stroke="#3b494b" strokeWidth="3"/>
     <path d="M3 -18 l23 7 l-23 8 M94 -6 l23 7 l-23 8" fill="#a45f54"/>
   </g>
   {/* Forest standing stones */}
   <g transform="translate(459 290)" fill="#91a59a" stroke="#445e59" strokeWidth="3">
    <path d="M-42 36 L-41 -11 L-22 -23 L-15 37Z"/><path d="M-7 36 L-13 -36 L7 -46 L15 37Z"/><path d="M20 37 L26 -24 L43 -14 L46 38Z"/>
    <path d="M-47 37 q44 14 101 0" fill="none" stroke="#cfddbb" strokeDasharray="3 8"/>
   </g>
   {/* Witch cottage on the rise */}
   <g transform="translate(735 164)">
    <path d="M-38 85 V35 L14 32 L43 84Z" fill="#685a49" stroke="#3c493f" strokeWidth="3"/>
    <path d="M-51 39 L2 -6 L57 33 L48 42 L2 5 L-43 48Z" fill="#4c433a" stroke="#2c3936" strokeWidth="3"/>
    <path d="M-22 46 v19 h18 v-19 Z" fill="#edbd79" stroke="#403c35" strokeWidth="3"/>
    <path d="M10 85 V44 Q26 32 37 44 V85Z" fill="#353d34"/>
    <path d="M23 85 v-53" stroke="#a78c6e" strokeWidth="1.5"/>
    <path d="M34 18 v-43 h11 v32" fill="#65615a"/>
    <path d="M37 -25 q-11 -16 1 -28 M44 -30 q14 -20 -4 -32" fill="none" stroke="#d7dbb8" strokeWidth="6" opacity=".42" filter="url(#brave-soft)"/>
   </g>
   {/* Lower left: candle-lit secret castle route */}
   <g transform="translate(166 446)">
    <path d="M-68 54 v-69 q43 -45 86 0 v69Z" fill="#687468" stroke="#354c47" strokeWidth="4"/>
    <path d="M-51 54 v-58 q24 -29 51 0 v58Z" fill="#2a4140"/>
    <path d="M-45 52 v-39 q21 -22 40 0 v39Z" fill="#9e8666" opacity=".72"/>
    <rect x="-60" y="3" width="13" height="13" fill="#f1c783"/><rect x="2" y="5" width="13" height="13" fill="#f1c783"/>
    <path d="M-74 55 h97" stroke="#9e9680" strokeWidth="8"/>
   </g>
   {/* Mor'du's stone shadow circle */}
   <g transform="translate(650 466)">
    <ellipse rx="81" ry="35" fill="#172d31" opacity=".5"/>
    {[-70,-40,-8,23,57].map((x,i)=><path key={i} d={'M'+x+' '+(10+Math.abs(x)/8)+' l-6 -'+(47+i%3*8)+' l20 -9 l10 '+(62-i%2*5)+' Z'} fill="#5c7370" stroke="#274742" strokeWidth="3"/>)}
    <path d="M-59 30 q57 11 120 -1" fill="none" stroke="#a2b3a2" strokeWidth="3" opacity=".6"/>
    <path d="M-9 -19 l19 12 l-2 -10 l19 -5" stroke="#29363a" strokeWidth="6" fill="none"/>
   </g>
   {/* Right-hand peaceful dawn clearing and woven arch */}
   <g transform="translate(956 409)">
    <ellipse rx="96" ry="48" fill="#b8bf88" opacity=".45"/>
    <path d="M-44 55 v-96 q46 -61 92 0 v96" fill="none" stroke="#4f5c4b" strokeWidth="12"/>
    <path d="M-42 -25 q39 -38 88 0" fill="none" stroke="#9eae85" strokeWidth="7"/>
    <rect x="-26" y="-23" width="57" height="53" rx="5" fill="#e0c89c" stroke="#886f58" strokeWidth="6"/>
    <path d="M-24 -22 L30 29 M30 -22 L-24 29 M2 -21 V28 M-22 3 H29" stroke="#a17d78" strokeWidth="3"/>
    <circle cx="2" cy="3" r="9" fill="none" stroke="#577d74" strokeWidth="3"/>
   </g>
   {[[325,282,22],[452,267,28],[762,379,25],[905,381,23],[648,402,17],[312,440,15]].map(([x,y,r],i)=>
    <g key={i} className="brave-wisp-orb" style={{'--wisp-delay':i*.47+'s'} as CSSProperties}>
      <circle cx={x} cy={y} r={r*2} fill="url(#brave-wisp)" opacity=".75"/>
      <circle cx={x} cy={y} r={r*.2} fill="#e9ffff" opacity=".96"/>
      <path d={'M'+(x-r/3)+' '+(y+5)+' q'+r+' '+r*.6+' '+r*.6+' '+r*1.4} stroke="#bff8ec" strokeWidth="1.8" fill="none" opacity=".75"/>
    </g>)}
   <rect width="1100" height="600" fill="url(#brave-parchment)" opacity=".55" pointerEvents="none"/>
   <path d="M14 15 H1086 V585 H14Z" fill="none" stroke="#f2dab1" strokeWidth="3" opacity=".65"/>
   <path d="M25 26 H1075 V574 H25Z" fill="none" stroke="#f7e4b9" strokeDasharray="1 8" strokeWidth="1.5" opacity=".5"/>
   <g transform="translate(1033 74)" fill="none" stroke="#efdfb7" opacity=".88">
    <circle r="23" strokeWidth="2"/><path d="M0 -34 V34 M-34 0 H34 M-13 -13 L13 13 M13 -13 L-13 13" strokeWidth="1.8"/>
    <path d="M0 -29 l-4 8 h8Z" fill="#efdfb7"/>
    <text x="0" y="-40" stroke="none" textAnchor="middle" fontSize="13" fill="#f8e8c4" fontWeight="bold">N</text>
   </g>
  </svg>
  {braveChapters.map(ch=><button key={ch.id}
    className={'brave-map-pin '+(active===ch.id?'is-selected':'')}
    style={{left:ch.mapX+'%',top:ch.mapY+'%','--pin-color':ch.palette} as CSSProperties}
    aria-label={'Read chapter '+ch.roman+': '+ch.name}
    aria-pressed={active===ch.id}
    onClick={()=>onSelect(ch.id)}>
    <span className="brave-map-pin-icon" aria-hidden="true">{ch.icon}</span>
    <span className="brave-map-pin-text">{ch.name}</span>
    <span className="brave-map-pin-number">CHAPTER {ch.roman}</span>
   </button>)}
  <div className="brave-map-corner" aria-hidden="true">✧ A MAP OF THE WHISPERING HIGHLANDS ✧</div>
 </div>;
}

function startBraveAmbience():()=>void{
 // No samples, MIDI, copyrighted tune or continuous timers without cleanup.
 let ctx:AudioContext;
 try{ctx=new window.AudioContext()}catch{return ()=>{}}
 if(ctx.state==='suspended')void ctx.resume();
 const master=ctx.createGain();master.gain.value=.075;master.connect(ctx.destination);
 const wind=ctx.createOscillator();wind.type='sine';wind.frequency.value=96;
 const windGain=ctx.createGain();windGain.gain.value=.012;wind.connect(windGain);windGain.connect(master);wind.start();
 const windLfo=ctx.createOscillator(),lfoGain=ctx.createGain();
 windLfo.frequency.value=.17;lfoGain.gain.value=9;windLfo.connect(lfoGain);lfoGain.connect(wind.frequency);windLfo.start();
 const notes=[293.66,392,440,523.25,587.33,440,392,349.23];
 let step=0;
 function pluck(){
  if(ctx.state==='closed')return;
  const t=ctx.currentTime,osc=ctx.createOscillator(),env=ctx.createGain(),filter=ctx.createBiquadFilter();
  osc.type='triangle';osc.frequency.value=notes[step++%notes.length];
  filter.type='lowpass';filter.frequency.value=1500;
  env.gain.setValueAtTime(.0001,t);
  env.gain.exponentialRampToValueAtTime(.36,t+.035);
  env.gain.exponentialRampToValueAtTime(.0001,t+1.9);
  osc.connect(filter);filter.connect(env);env.connect(master);
  osc.start(t);osc.stop(t+2);
 }
 pluck();const timer=window.setInterval(pluck,2100);
 return ()=>{window.clearInterval(timer);void ctx.close()};
}
export default function BraveTrail({onHome}:{onHome:()=>void}){
 const [save,setSave]=useState<BravePreviewSave>(readBraveSave);
 const [active,setActive]=useState(braveChapters[0].id);
 const [introOpen,setIntroOpen]=useState(()=>!readBraveSave().prologueSeen);
 const [dialogueOpen,setDialogueOpen]=useState(false);
 const stopAudio=useRef<(()=>void)|null>(null);
 const chapter=braveChapters.find(c=>c.id===active)??braveChapters[0];
 function update(next:BravePreviewSave){setSave(next);writeBraveSave(next)}
 function selectChapter(id:string){
  setActive(id);setDialogueOpen(false);
  if(!save.inspected.includes(id))update({...save,inspected:[...save.inspected,id]});
 }
 function chooseVow(vow:BraveIntroChoice){
  update({...save,prologueSeen:true,vow});
  setIntroOpen(false);setDialogueOpen(true);
 }
 function toggleSound(){
  if(stopAudio.current){stopAudio.current();stopAudio.current=null;update({...save,soundEnabled:false});return}
  stopAudio.current=startBraveAmbience();update({...save,soundEnabled:true});
 }
 useEffect(()=>()=>{stopAudio.current?.();stopAudio.current=null},[]);
 const vowNote=save.vow==='listen'
  ?'You chose to listen for the smallest things. The wisps seem to trust you already.'
  :save.vow==='follow'
  ?'You chose to follow the strange light. A blue wisp dances just ahead of you.'
  :'The wisps are waiting for their Keeper to make a first promise.';
 return <main className="brave-game">
   <div className="brave-topline"><button className="brave-back" onClick={onHome}>← Molly’s arcade</button>
    <span>THE WISPS’ TRAIL · STORYBOOK WORLD PREVIEW</span>
    <button className="brave-audio-button" onClick={toggleSound} aria-label={save.soundEnabled?'Mute Highland ambience':'Play Highland ambience'} aria-pressed={save.soundEnabled} title={save.soundEnabled?'Mute ambience':'Play gentle ambience'}>{save.soundEnabled?'♫':'♪'}</button>
   </div>
   <header className="brave-banner">
    <span className="brave-crest" aria-hidden="true">❦</span>
    <div><span className="brave-kicker">A HIGHLAND STORY FOR MOLLY</span><h1>Brave <i>—</i> <em>The Wisps’ Trail</em></h1>
    <p>Beyond the castle walls, the hills remember old magic. One little wisp has chosen a Keeper. The adventure begins with a promise.</p>
    <button className="brave-banner-cta" onClick={()=>setIntroOpen(true)}>✧ {save.prologueSeen?'Read the prologue again':'Open the storybook'} ↗</button></div>
    <div className="brave-wisp-sigil" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
   </header>
   <section className="brave-illustrated-world" aria-labelledby="brave-map-title">
    <div className="brave-world-heading"><div><span className="brave-kicker">THE CHAPTER MAP</span>
     <h2 id="brave-map-title">Where shall the wisps lead?</h2>
     <p>Explore six illustrated locations and their stories. The movement puzzles and chapters will arrive as we build the adventure together.</p></div>
     <span className="brave-world-stamp">6 PLACES TO DISCOVER<br/>18 ADVENTURES PLANNED</span>
    </div>
    <div className="brave-world-layout">
     <HighlandMap active={active} onSelect={selectChapter}/>
     <article className="brave-chapter-scroll" aria-live="polite" key={chapter.id}>
      <div className="brave-scroll-ornament">❧ ─── ✦ ─── ❧</div>
      <span className="brave-scroll-chapter">CHAPTER {chapter.roman} · {chapter.location}</span>
      <h3>{chapter.name}</h3>
      <p className="brave-scroll-mood">{chapter.mood}</p>
      <div className="brave-chapter-paint" aria-hidden="true"><span>{chapter.icon}</span><span className="brave-chapter-leaf">❦</span></div>
      <p className="brave-scene-text">{chapter.scene}</p>
      <div className="brave-quote"><span>MERIDA</span><p>{chapter.merida}</p></div>
      <button className="brave-dialogue-trigger" onClick={()=>setDialogueOpen(v=>!v)} aria-expanded={dialogueOpen}>
       ✧ {dialogueOpen?'Close the wisp’s message':'Listen to the wisp'} <span>→</span></button>
      {dialogueOpen&&<div className="brave-wisp-message" role="status"><span>✦ THE WISP ✦</span><p>{chapter.wisp}</p></div>}
      <div className="brave-scroll-levels"><span>THE THREE ADVENTURES</span>
       {chapter.levelTitles.map((title,i)=><div key={title}><span>0{i+1}</span><strong>{title}</strong><small>In development</small></div>)}
      </div>
      <div className="brave-snapshot-tags">{chapter.environment.map(x=><span key={x}>{x}</span>)}</div>
      <div className="brave-scroll-footer">This is a world preview. Levels are not yet playable. ♡</div>
     </article>
    </div>
   </section>
   <section className="brave-keeper-panel">
    <div className="brave-keeper-symbol" aria-hidden="true">✧</div>
    <div><span className="brave-kicker">THE KEEPER’S JOURNAL</span><h2>A promise made in the moonlight</h2>
     <p>{vowNote}</p><small>{save.inspected.length} of 6 places explored on this illustrated map · your promise is saved in this browser</small></div>
    <button className="brave-dialogue-trigger" onClick={()=>setIntroOpen(true)}>Read the opening ↗</button>
   </section>
   <p className="brave-credits">An original fan-made storybook adventure inspired by <i>Brave</i>. Locations and characters are referenced with affection; the artwork, story and music are newly created for Molly.</p>
   {introOpen&&<div className="brave-overlay" role="presentation"><section className="brave-prologue" role="dialog" aria-modal="true" aria-labelledby="brave-prologue-title">
    <div className="brave-prologue-stars" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</div>
    <span className="brave-kicker">PROLOGUE · THE KEEPER OF THE WISPS</span>
    <h2 id="brave-prologue-title">Once, beyond the misty hills…</h2>
    <p>A little blue light wandered farther than any wisp before it. It passed the ancient stones, the sleeping woods, and the lonely castle on the cliff.</p>
    <p>Then it found Molly.</p>
    <p>Somewhere in the Highlands, Merida watched the strange lights gather. The trails had begun to shift, and the old paths no longer led where they should.</p>
    <p>“Whoever you are,” she whispered into the wind, “if you can see these wisps, perhaps you can help me.”</p>
    <div className="brave-vow-callout">A single wisp settles beside your hand. What will you do?</div>
    <div className="brave-vow-choices">
      <button onClick={()=>chooseVow('listen')}><strong>✧ Listen carefully</strong><span>Wait for the wisp to show its intentions.</span></button>
      <button onClick={()=>chooseVow('follow')}><strong>❧ Follow the light</strong><span>Step toward the forest and trust its glow.</span></button>
    </div>
    {save.prologueSeen&&<button className="brave-close-prologue" onClick={()=>setIntroOpen(false)}>Return to the map</button>}
   </section></div>}
  </main>;
}
