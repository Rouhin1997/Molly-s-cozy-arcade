import { useState, type Dispatch, type SetStateAction } from 'react';
import BazingaClassic from './BazingaClassic';
import BazingaRoomGame from './BazingaRoomGame';
import type { BazingaProgress } from '../lib/bazinga';

/** New adventures lead, but the original Classic Lab is still playable.
 * Preserves in-progress legacy experiments and the same local save key. */
export default function BazingaLab({today,progress,setProgress,onHome}:{
  today:string;
  progress:BazingaProgress;
  setProgress:Dispatch<SetStateAction<BazingaProgress>>;
  onHome:()=>void;
}){
  const [edition,setEdition]=useState<'rooms'|'classic'>('rooms');
  if(edition==='classic')return <>
    <div className="bazinga-classic-return"><button className="btn btn-soft" onClick={()=>setEdition('rooms')}>← Back to room adventures</button>
      <span>Original line-up puzzles, with all your previous progress preserved. ✧</span></div>
    <BazingaClassic today={today} progress={progress} setProgress={setProgress} onHome={onHome}/>
  </>;
  return <BazingaRoomGame today={today} progress={progress} setProgress={setProgress} onHome={onHome} onClassic={()=>setEdition('classic')}/>;
}
