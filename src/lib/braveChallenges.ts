/** Deterministic, untimed challenge rules shared by the story view and tests. */
import type {braveArcheryTargets} from '../data/braveCampaign';

export type BraveAim='left'|'centre'|'right';
export type BraveDraw='gentle'|'strong';
export type BraveTarget=(typeof braveArcheryTargets)[number];
export function braveShotIsCorrect(target:BraveTarget,aim:BraveAim,draw:BraveDraw):boolean{
 const correctAim=target.wind===1?'left':target.wind===-1?'right':'centre';
 return aim===correctAim&&draw===(target.range==='near'?'gentle':'strong');
}
export function braveRuneStep(current:number,pick:string,order:readonly string[]):number{
 return current>=order.length?current:pick===order[current]?current+1:current;
}

/** Four carved marks must form the full journey; duplicates cannot be placed. */
export function braveRuneScore(sequence:readonly string[],answer:readonly string[]):number{
 return answer.reduce((score,rune,index)=>score+(sequence[index]===rune?1:0),0);
}
export function braveRuneSolved(sequence:readonly string[],answer:readonly string[]):boolean{
 return sequence.length===answer.length&&braveRuneScore(sequence,answer)===answer.length;
}
