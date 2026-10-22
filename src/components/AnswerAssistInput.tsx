import {useId,useMemo,useState,type KeyboardEvent} from 'react';
import {matchingAnswerSuggestions,type AnswerCandidate} from '../lib/answerAssist';

type Props={
 id:string;value:string;onChange:(value:string)=>void;options:readonly AnswerCandidate[];
 placeholder:string;minChars?:number;maxLength?:number;
};
/** Accessible suggestion list for typed answers. Choosing fills the input,
 * never submits or marks an answer correct. Only the existing game rules score.
 */
export default function AnswerAssistInput({id,value,onChange,options,placeholder,
 minChars=3,maxLength=80}:Props){
 const menuId=useId(),helpId=useId();
 const [open,setOpen]=useState(false);
 const [active,setActive]=useState(-1);
 const results=useMemo(()=>matchingAnswerSuggestions(options,value,minChars,7),
  [options,value,minChars]);
 const visible=open&&results.length>0;
 function choose(option:AnswerCandidate){
  onChange(option.value);setOpen(false);setActive(-1);
 }
 function keyDown(e:KeyboardEvent<HTMLInputElement>){
  if(e.key==='Escape'&&visible){e.preventDefault();setOpen(false);setActive(-1);return}
  if((e.key==='ArrowDown'||e.key==='ArrowUp')&&results.length){
   e.preventDefault();setOpen(true);
   setActive(i=>e.key==='ArrowDown'?(i+1)%results.length:(i<=0?results.length-1:i-1));
   return;
  }
  if(e.key==='Enter'&&visible&&active>=0){
   e.preventDefault();choose(results[active]);
  }
 }
 return <div className="answer-assist">
  <input id={id} role="combobox" aria-autocomplete="list" aria-haspopup="listbox"
   aria-expanded={visible} aria-controls={menuId}
   aria-activedescendant={visible&&active>=0?menuId+'-option-'+active:undefined}
   aria-describedby={helpId}
   value={value} placeholder={placeholder} maxLength={maxLength} spellCheck={false}
   autoComplete="off"
   onFocus={()=>setOpen(true)} onBlur={()=>{setOpen(false);setActive(-1)}}
   onKeyDown={keyDown}
   onChange={e=>{onChange(e.target.value);setOpen(true);setActive(-1)}}/>
  <span className="answer-assist-help" id={helpId}>
   Type {minChars}+ letters for name suggestions. Select one or enter your own answer.
  </span>
  {visible&&<div className="answer-assist-popover" id={menuId} role="listbox"
   aria-label="Matching answers from the game catalogue">
   <span className="answer-assist-heading">✧ Names in the catalogue <small>{results.length} suggestion{results.length===1?'':'s'}</small></span>
   {results.map((result,i)=><button id={menuId+'-option-'+i} role="option"
    aria-selected={i===active} type="button" key={result.value}
    className={'answer-assist-option '+(i===active?'is-active':'')}
    onMouseDown={e=>e.preventDefault()}
    onClick={()=>choose(result)}>
     <strong>{result.label}</strong>
     {result.matchedBy&&<small>also called {result.matchedBy}</small>}
    </button>)}
   <p>Choosing fills the box; press the game’s answer button to guess.</p>
  </div>}
 </div>;
}
