import {useEffect,useRef,useState} from 'react';
import {chroniclePages,CHRONICLE_CHAPTER_TITLES} from '../data/braveChronicle';
import BraveSceneBackdrop from './BraveSceneBackdrop';
import BraveFinaleBackdrop from './BraveFinaleBackdrop';

/** The Chronicle is a read-only reward. All original story text and artwork
 * live in the game bundle, so reopening works without accounts or network. */
export default function BraveChronicle({onClose}:{onClose:()=>void}){
 const [page,setPage]=useState(0);
 const closeRef=useRef<HTMLButtonElement>(null);
 const current=chroniclePages[page];
 useEffect(()=>{closeRef.current?.focus()},[]);
 useEffect(()=>{
  function keys(e:KeyboardEvent){
   if(e.key==='Escape')onClose();
   if(e.key==='ArrowRight')setPage(n=>Math.min(chroniclePages.length-1,n+1));
   if(e.key==='ArrowLeft')setPage(n=>Math.max(0,n-1));
  }
  document.addEventListener('keydown',keys);
  return ()=>document.removeEventListener('keydown',keys);
 },[onClose]);
 const isEarly=current.chapterNumber<=3;
 return <div className="chronicle-overlay" role="presentation" onMouseDown={onClose}>
  <section className="chronicle-dialog" role="dialog" aria-modal="true" aria-labelledby="chronicle-title"
    onMouseDown={e=>e.stopPropagation()}>
   <div className="chronicle-toolbar">
    <div><span className="chronicle-rune">❧</span><span className="chronicle-brand">THE KEEPER’S CHRONICLE</span></div>
    <button ref={closeRef} type="button" onClick={onClose} className="chronicle-close" aria-label="Close the storybook">✕ Close book</button>
   </div>
   <div className="chronicle-book" key={page}>
    <div className="chronicle-illustration">
     {isEarly
      ?<BraveSceneBackdrop chapter={current.chapter} scene={current.illustration}/>
      :<BraveFinaleBackdrop chapter={current.chapter as 'castle'|'shadow'|'bond'} scene={current.illustration}/>}
     <div className="chronicle-art-caption">✧ {CHRONICLE_CHAPTER_TITLES[current.chapterNumber-1]} ✧</div>
     <div className="chronicle-vine" aria-hidden="true">❧ ❦ ✧ ❦ ❧</div>
     <div className="chronicle-pages-seal" aria-hidden="true">✦</div>
    </div>
    <article className="chronicle-leaf" aria-live="polite">
     <span className="chronicle-eyebrow">{current.eyebrow}</span>
     <h2 id="chronicle-title">{current.heading}</h2>
     <div className="chronicle-flourish" aria-hidden="true">✧ ───── ❦ ───── ✧</div>
     {current.paragraphs.map((paragraph,i)=><p key={i} className={i===0?'chronicle-first-paragraph':''}>{paragraph}</p>)}
     {page===chroniclePages.length-1&&<div className="chronicle-last-word">
      <span>❧ THE END ❧</span>
      <p>Some stories live in books. The best ones live in the heart.</p>
     </div>}
     <span className="chronicle-page-number">{String(page+1).padStart(2,'0')} / {chroniclePages.length}</span>
    </article>
   </div>
   <div className="chronicle-footer">
    <button type="button" disabled={page===0} onClick={()=>setPage(n=>Math.max(0,n-1))}>← Previous page</button>
    <div className="chronicle-progress" role="group" aria-label="Read a story chapter">
     {CHRONICLE_CHAPTER_TITLES.map((name,i)=>{
      const first=chroniclePages.findIndex(p=>p.chapterNumber===i+1);
      return <button type="button" key={name} className={current.chapterNumber===i+1?'is-reading':''}
       onClick={()=>setPage(first)} aria-label={'Read chapter '+(i+1)+': '+name} aria-current={current.chapterNumber===i+1?'step':undefined}>{i+1}</button>;
     })}
    </div>
    <button type="button" disabled={page===chroniclePages.length-1} onClick={()=>setPage(n=>Math.min(chroniclePages.length-1,n+1))}>
     Turn the page →
    </button>
   </div>
   <p className="chronicle-help">The book is yours forever in this browser. Read it at your own pace. Use ← and → to turn pages.</p>
  </section>
 </div>;
}
