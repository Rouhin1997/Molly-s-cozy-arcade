import { useState, type Dispatch, type SetStateAction } from 'react';
import DifficultyPicker from '../components/DifficultyPicker';
import { NineNinePortrait } from '../components/NineNinePortrait';
import { readPreferredDifficulty,savePreferredDifficulty,type Difficulty } from '../lib/passport';
import { nineCases,dailyNineCase,heistCaseIds,caseCandidates,type NineCase } from '../data/nineNine';
import {
 allNineLinksSolved,clearNineSelection,connectNineEvidence,creditNineResult,
 getNineDaily,hintNine,inspectNineEvidence,newNinePractice,newNineRound,
 nineGuessLimit,nineHintLimit,nineWrongPairLimit,pristineNineRound,
 setNineAccusation,submitNineAccusation,unlockedHeistCount,
 type NineProgress,type NineRound,
} from '../lib/nineNine';

type Props={today:string;progress:NineProgress;setProgress:Dispatch<SetStateAction<NineProgress>>;onHome:()=>void};
type Mode='daily'|'cases'|'heist';
const tierNames:Record<Difficulty,string>={easy:'Cozy',medium:'Clever',hard:'Expert'};
const supervisors=['Jake','Holt','Amy','Rosa','Terry','Charles'];
const categories:Record<string,string>={scene:'SCENE',record:'RECORD',forensics:'FORENSICS',interview:'INTERVIEW'};
const coverIcon:Record<string,string>={interrogation:'🗣️',timeline:'⏱️',forensics:'🔬',heist:'🎃'};

export default function NineNine({today,progress,setProgress,onHome}:Props){
 const [mode,setMode]=useState<Mode>('daily');
 const [difficulty,setDifficulty]=useState<Difficulty>(()=>readPreferredDifficulty('99'));
 const [selectedHeist,setSelectedHeist]=useState<string>('heist-one');
 const [activeExhibit,setActiveExhibit]=useState<string|null>(null);
 const [browse,setBrowse]=useState(false);
 const heistUnlocked=unlockedHeistCount(progress);
 const daily=getNineDaily(progress,today,difficulty);
 const round=mode==='daily'?daily:mode==='cases'?progress.practice:progress.heist[selectedHeist]??newNineRound(nineCases.find(c=>c.id===selectedHeist)!);
 const c=round?nineCases.find(x=>x.id===round.caseId):undefined;
 const level=round?.difficulty??difficulty;
 const locked=!!round&&!pristineNineRound(round)&&(mode==='daily'||round.status==='playing');
 const links=c?c.deductions:[];
 const complete=!!round&&!!c&&allNineLinksSolved(round,c);
 const evidenceNow=c?.evidence.find(e=>e.id===activeExhibit)??(c?.evidence.find(e=>round?.inspected.includes(e.id)));
 const connected=c?caseCandidates(c,round?.linked??[]):[];
 const solvedCids=Object.keys(progress.bestAwards??{}).filter(k=>k.startsWith('99:')&&(progress.bestAwards[k]??0)>0);
 const choice=nineCases.filter(x=>x.difficulty===level&&x.track==='detective');
 const heistStages=heistCaseIds.map(id=>nineCases.find(x=>x.id===id)!);

 function chooseDifficulty(next:Difficulty){
  if(mode==='heist'||locked||next===level)return;
  setDifficulty(next);savePreferredDifficulty('99',next);
  setActiveExhibit(null);
  if(mode==='daily')setProgress(prev=>({...prev,daily:{...prev.daily,[today]:newNineRound(dailyNineCase(today,next))}}));
  else if(round)setProgress(prev=>{
   const newCase=newNinePractice(prev,next);
   return {...prev,practice:newCase,recent:[...prev.recent,newCase.caseId].slice(-4)};
  });
 }
 function startCase(next:NineCase){
  if(mode==='cases'&&progress.practice&&progress.practice.status==='playing'&&!pristineNineRound(progress.practice)&&
   !window.confirm('Replace the unfinished case file with a new investigation?'))return;
  setProgress(prev=>({...prev,practice:newNineRound(next),recent:[...prev.recent,next.id].slice(-4)}));
  setDifficulty(next.difficulty);savePreferredDifficulty('99',next.difficulty);
  setActiveExhibit(null);setBrowse(false);setMode('cases');
 }
 function surprise(nextDifficulty:Difficulty=level){
  if(mode==='cases'&&round&&round.status==='playing'&&!pristineNineRound(round)&&
    !window.confirm('Open another case and replace this unfinished investigation?'))return;
  setProgress(prev=>{
   const chosen=newNinePractice(prev,nextDifficulty);
   return {...prev,practice:chosen,recent:[...prev.recent,chosen.caseId].slice(-4)};
  });
  setMode('cases');setBrowse(false);setActiveExhibit(null);
 }
 function selectHeist(id:string){
  const index=heistCaseIds.indexOf(id as typeof heistCaseIds[number]);
  if(index<0||index>heistUnlocked)return;
  // The stage card also reopens a failed investigation without losing awards.
  if(progress.heist[id]?.status==='lost'){
   const story=nineCases.find(c=>c.id===id);
   if(story)setProgress(prev=>({...prev,heist:{...prev.heist,[id]:newNineRound(story)}}));
  }
  setSelectedHeist(id);setActiveExhibit(null);setMode('heist');
 }
 function retryHeist(){
  setProgress(prev=>{
   const caseFile=nineCases.find(x=>x.id===selectedHeist);
   if(!caseFile)return prev;
   return {...prev,heist:{...prev.heist,[selectedHeist]:newNineRound(caseFile)}};
  });
  setActiveExhibit(null);
 }
 function changeRound(transform:(r:NineRound,c:NineCase)=>NineRound){
  setProgress(prev=>{
   const existing=mode==='daily'?getNineDaily(prev,today,difficulty):mode==='cases'?prev.practice:prev.heist[selectedHeist]??newNineRound(nineCases.find(c=>c.id===selectedHeist)!);
   if(!existing)return prev;
   const story=nineCases.find(c=>c.id===existing.caseId);
   if(!story)return prev;
   const revised=transform(existing,story);
   if(revised===existing)return prev;
   const updated=mode==='daily'?{...prev,daily:{...prev.daily,[today]:revised}}:
    mode==='cases'?{...prev,practice:revised}:{...prev,heist:{...prev.heist,[selectedHeist]:revised}};
   return existing.status==='playing'&&revised.status!=='playing'?creditNineResult(updated,revised):updated;
  });
 }
 function inspect(id:string){
  setActiveExhibit(id);
  changeRound((r,c)=>inspectNineEvidence(r,c,id));
 }

 return <main className="game-page nn-game">
   <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
   <div className="nn-masthead">
     <div><span className="overline">THE LITTLE PUZZLE CLUB / GAME 05 · HONORARY DETECTIVE</span>
       <h1><span aria-hidden="true">🕵️</span> The 99 Files</h1>
       <p>Follow the evidence. Connect the clues. Make the accusation that would survive Captain Holt's paperwork.</p></div>
     <div className="nn-badge" aria-label="Unofficial Nine-Nine detective badge"><strong>99</strong><small>HONORARY DETECTIVE</small><span>✦ MOLLY ✦</span></div>
   </div>
   <div className="nn-mode-tabs" role="group" aria-label="Nine Nine game mode">
     <button className={mode==='daily'?'active':''} aria-pressed={mode==='daily'} onClick={()=>{setMode('daily');setBrowse(false);setActiveExhibit(null)}}>☀ Daily case</button>
     <button className={mode==='cases'?'active':''} aria-pressed={mode==='cases'} onClick={()=>{setMode('cases');setBrowse(false);setActiveExhibit(null)}}>📁 Open case files</button>
     <button className={mode==='heist'?'active':''} aria-pressed={mode==='heist'} onClick={()=>{setMode('heist');setActiveExhibit(null)}}>🎃 Halloween Heist</button>
   </div>
   {mode!=='heist'?<DifficultyPicker value={level} onChange={chooseDifficulty} disabled={locked}
     lockedMessage="This case is underway or closed. Select a new difficulty for your next practice investigation."/>:
     <div className="nn-heist-difficulty"><span>🔐</span><p>The heist grows harder as the squad advances: <strong>Cozy → Clever → Expert.</strong> Finish a stage to unlock the next one.</p></div>}
   <div className="mode-intro"><span>🔎</span><p><strong>Detective, you're on the case.</strong> Read exhibits, select two documents that form a logical connection, then accuse a suspect using the correct method and decisive proof. This is an original fan-made investigation—not an episode trivia quiz.</p></div>

   {mode==='cases'&&<section className="nn-files-shelf">
     <div className="nn-shelf-title"><div><span className="overline">DETECTIVE CASE ARCHIVE</span><h2>The open files</h2>
       <p>Three curated {tierNames[level]} investigations. Each ends with a unique, evidence-backed conclusion.</p></div>
       <button className="btn btn-outline" onClick={()=>setBrowse(!browse)}>{browse||!round?'Hide files':'Browse cases'} ▾</button>
     </div>
     {(browse||!round)&&<div className="nn-case-grid">
       {choice.map((caseFile,i)=><button key={caseFile.id} className={`nn-case-card ${round?.caseId===caseFile.id?'is-current':''}`} onClick={()=>startCase(caseFile)}>
         <span className="nn-case-icon">{caseFile.icon}</span><span className="overline">FILE {String(i+1).padStart(2,'0')} · {caseFile.location}</span>
         <strong>{caseFile.title}</strong><small>{caseFile.subtitle}</small>
         <em>{solvedCids.includes('99:'+caseFile.id)?'✓ SOLVED · REPLAY':round?.caseId===caseFile.id?'CURRENT INVESTIGATION':'INSPECT THIS FILE ↗'}</em>
       </button>)}
     </div>}
     {!round&&<button className="btn btn-primary" onClick={()=>surprise()}>Surprise case ↗</button>}
   </section>}

   {mode==='heist'&&<section className="nn-heist-shelf">
     <div><span className="overline">THE SPECIAL THREE-STAGE CAMPAIGN</span><h2>🎃 The Halloween Heist</h2>
       <p>Three interconnected original heist investigations. Every solved stage unlocks a harder one, ending with an ultimate precinct-wide deception.</p></div>
     <div className="nn-heist-stages">
       {heistStages.map((stage,i)=>{
         const unlocked=i<=heistUnlocked,won=progress.heist[stage.id]?.status==='won'||solvedCids.includes('99:'+stage.id);
         return <button key={stage.id} className={`nn-heist-stage ${selectedHeist===stage.id?'is-active':''}`}
           disabled={!unlocked} onClick={()=>selectHeist(stage.id)} aria-label={`Stage ${i+1}: ${stage.title}${unlocked?'':' locked'}`}>
           <span>{!unlocked?'🔒':won?'🏆':stage.icon}</span>
           <strong>Stage {i+1}</strong><small>{tierNames[stage.difficulty]}</small>
           <em>{won?'Solved · Review':unlocked&&progress.heist[stage.id]?.status==='lost'?'Lost · Retry':unlocked?'Investigate':'Locked'}</em>
         </button>;
       })}
     </div>
   </section>}

   {c&&round&&<section className="nn-dossier">
     <div className="nn-case-head">
       <div><span className="overline">FILE {c.id.toUpperCase().replace(/-/g,'-')} · {mode==='daily'?'DAILY BRIEF':mode==='heist'?'HEIST OPERATIONS':'CASE ARCHIVE'}</span>
         <h2>{c.title}</h2><p>{c.brief}</p>
         <span className="nn-supervisor"><span>💬</span> {c.lead}</span></div>
       <div className="nn-case-ticket"><strong>{coverIcon[c.style]}</strong><small>{c.location}</small><span>{tierNames[c.difficulty]} · {c.style}</span></div>
     </div>
     <div className="nn-progress">
       <span>📌 {round.linked.length}/{c.deductions.length} deductions</span>
       <span>📁 {round.inspected.length}/{c.evidence.length} inspected</span>
       <span>💡 {nineHintLimit(level)-round.hints} hints</span>
       <span>⚠ {nineWrongPairLimit(level)-round.wrongPairs} pair attempts left</span>
       <span>✦ {level==='hard'?'2×':level==='medium'?'1.5×':'1×'} stars</span>
     </div>
     <div className="nn-desk">
       <section className="nn-evidence-side">
         <div className="nn-panel-heading"><span>🔬</span><div><h3>Evidence locker</h3><p>Select each exhibit to inspect its full contents and pin it to the board.</p></div></div>
         <div className="nn-evidence-grid">
           {c.evidence.map(exhibit=><button type="button" key={exhibit.id}
             className={`nn-evidence-card ${round.inspected.includes(exhibit.id)?'is-open':''} ${round.selected.includes(exhibit.id)?'is-selected':''}`}
             disabled={round.status!=='playing'}
             aria-pressed={round.selected.includes(exhibit.id)}
             onClick={()=>inspect(exhibit.id)}>
             <span className="nn-evidence-art" aria-hidden="true">{exhibit.icon}</span>
             <span className="nn-evidence-info"><small>{categories[exhibit.kind]} · {exhibit.id.toUpperCase()}</small>
               <strong>{exhibit.title}</strong>
               <em>{round.selected.includes(exhibit.id)?'📌 PINNED':round.inspected.includes(exhibit.id)?'✓ INSPECTED':'OPEN FILE ↗'}</em>
             </span>
           </button>)}
         </div>
         <div className="nn-document" aria-live="polite">
           <div className="nn-document-top"><span>📄 PRECINCT EVIDENCE REPORT</span><small>{evidenceNow?evidenceNow.id.toUpperCase():'UNOPENED'}</small></div>
           {evidenceNow?<><h4>{evidenceNow.title}</h4><p>{evidenceNow.text}</p><small>Category: {categories[evidenceNow.kind]} · Investigation only</small></>:
             <><h4>Choose an evidence card</h4><p>Read witnesses, forensics and records before forming connections. Every document contributes to a solvable case.</p></>}
         </div>
         {round.status==='playing'&&<div className="nn-connection-action">
           <div><strong>Connect two exhibits</strong>
             <p>{round.selected.length?round.selected.map(id=>c.evidence.find(e=>e.id===id)?.title).join(' + '):'Select any two documents that support one deduction.'}</p></div>
           <div>
             <button className="btn btn-outline" disabled={!round.selected.length} onClick={()=>changeRound(clearNineSelection)}>Clear pins</button>
             <button className="btn btn-primary" disabled={round.selected.length!==2} onClick={()=>changeRound(connectNineEvidence)}>Connect evidence ↗</button>
           </div>
         </div>}
       </section>
       <section className="nn-deduction-side">
         <div className="nn-corkboard"><div className="nn-panel-heading"><span>🗺️</span><div><h3>Detective's deduction board</h3><p>Match related evidence to each unresolved question.</p></div></div>
           <ol className="nn-question-list">
             {links.map((d,i)=>{
               const done=round.linked.includes(d.id);
               return <li className={done?'is-solved':''} key={d.id}>
                 <div><span>{done?'✓':String(i+1)}</span><strong>{d.prompt}</strong></div>
                 <p>{done?d.conclusion:'This link is still unresolved. Inspect the reports for a contradiction or matching detail.'}</p>
               </li>;
             })}
           </ol>
           <p className="nn-hypotheses">🧠 {complete?'All contradictions resolved. Ready to make an accusation.':
             `${connected.length} suspect-and-method combinations still possible according to the linked deductions.`}</p>
           {round.status==='playing'&&<button className="btn btn-outline" disabled={round.hints>=nineHintLimit(level)||complete}
             onClick={()=>changeRound(hintNine)}>💡 Holt's hint ({nineHintLimit(level)-round.hints})</button>}
         </div>
         <div className="nn-squad-corner">
           <div className="nn-panel-heading"><span>🚔</span><div><h3>Case team</h3><p>Precinct desk notes · original squad artwork</p></div></div>
           <div className="nn-squad-pictures">{supervisors.slice(0,4).map(name=><div key={name}><NineNinePortrait name={name} size={60}/><small>{name}</small></div>)}</div>
           <p>Jake wants a dramatic reveal. Amy wants a binder. Holt wants a complete chain of evidence.</p>
         </div>
       </section>
     </div>
     <div className="nn-feedback" role="status">{round.feedback}</div>
     {complete&&round.status==='playing'&&<section className="nn-accusation">
       <div className="nn-panel-heading"><span>⚖️</span><div><h3>Submit the final accusation</h3>
         <p>Don't just guess the culprit: identify the method and the single decisive supporting deduction.</p></div></div>
       <div className="nn-accusation-grid">
         <label>Who did it?
           <select value={round.suspect} onChange={e=>changeRound((r,c)=>setNineAccusation(r,c,'suspect',e.target.value))}>
             <option value="">Choose suspect</option>{c.suspects.map(s=><option key={s}>{s}</option>)}
           </select>
         </label>
         <label>How?
           <select value={round.method} onChange={e=>changeRound((r,c)=>setNineAccusation(r,c,'method',e.target.value))}>
             <option value="">Choose method</option>{c.methods.map(m=><option key={m}>{m}</option>)}
           </select>
         </label>
         <label>Decisive proof?
           <select value={round.proof} onChange={e=>changeRound((r,c)=>setNineAccusation(r,c,'proof',e.target.value))}>
             <option value="">Choose linked evidence</option>{c.deductions.map((d,i)=><option key={d.id} value={d.id}>Deduction {i+1}: {d.prompt}</option>)}
           </select>
         </label>
       </div>
       <div className="nn-verdict-action"><span>{nineGuessLimit(level)-round.attempts} accusations remaining</span>
         <button className="btn btn-primary" disabled={!round.suspect||!round.method||!round.proof}
           onClick={()=>changeRound(submitNineAccusation)}>Submit to Captain Holt ↗</button></div>
     </section>}
     {round.status!=='playing'&&<section className={`nn-verdict ${round.status==='won'?'is-won':'is-lost'}`} role="status">
       <div className="nn-verdict-art">
         <NineNinePortrait name={round.status==='won'?'Holt':'Jake'} size={145}/>
         <span>{round.status==='won'?'✨':'📁'}</span>
       </div>
       <div><span className="overline">{round.status==='won'?'CASE SOLVED • NINE-NINE!':'THE FILE IS CLOSED — FOR NOW'}</span>
         <h3>{round.status==='won'?'Case closed, Detective Molly!':'Unsolved, but not forgotten.'}</h3>
         <p>{round.status==='won'?c.finale:'Captain Holt has archived this investigation. You can review the evidence and try a fresh copy.'}</p>
         {round.status==='won'&&<strong>+{round.score} stars · {c.deductions.length} connected deductions</strong>}
         <details><summary>Read the verified case solution</summary><p><strong>{c.culprit}</strong> used <strong>{c.method}</strong>. {c.deductions.find(x=>x.id===c.decisive)?.conclusion}</p></details>
       </div>
       <button className="btn btn-primary" onClick={()=>{
         if(mode==='heist'){
           const i=heistCaseIds.indexOf(selectedHeist as typeof heistCaseIds[number]);
           if(round.status==='won'&&i<2)selectHeist(heistCaseIds[i+1]);
           else if(round.status==='lost')retryHeist();
           else setMode('cases');
         }else surprise(level);
       }}>{mode==='heist'?(round.status==='lost'?'Retry this heist ↗':selectedHeist!=='heist-three'?'Next heist stage ↗':'Browse case files ↗'):'Next investigation ↗'}</button>
     </section>}
   </section>}
   <p className="privacy-note">♡ Unofficial fan-made homage to Brooklyn Nine-Nine. All case scenarios, evidence-board art and illustrated badges are original; no show stills, cast photos or audio. Scores are saved in this browser.</p>
 </main>;
}
