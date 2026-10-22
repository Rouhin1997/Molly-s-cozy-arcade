/** The five standing stones have fixed, readable compass bearings.
 * The answer is derived from the inscription, never a random sequence. */
export const braveCircleStones=[
 {id:'north',name:'Northern Stone',clue:'At the northern cairn, greet the rising sun.',correct:1},
 {id:'east',name:'Eastern Stone',clue:'At the eastern cairn, face the last light of the setting sun.',correct:3},
 {id:'south',name:'Southern Stone',clue:'At the southern cairn, seek the north star.',correct:0},
 {id:'west',name:'Western Stone',clue:'At the western cairn, bow toward the southern vale.',correct:2},
 {id:'heart',name:'Heart Stone',clue:'At the centre, trust the first light of dawn.',correct:1}
] as const;
export const braveCircleStart=[3,0,2,1,3] as const;
export function braveCircleTurn(current:readonly number[],i:number):number[]{
 if(i<0||i>=current.length)return [...current];
 return current.map((a,j)=>i===j?(a+1)%4:a);
}
export function braveCircleCount(current:readonly number[]):number{
 return braveCircleStones.reduce((n,stone,i)=>n+(current[i]===stone.correct?1:0),0);
}
export function braveCircleComplete(current:readonly number[]):boolean{
 return current.length===5&&braveCircleCount(current)===5;
}
