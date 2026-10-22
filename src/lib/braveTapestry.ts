/** Genuine embroidered path rotation puzzle: every tile is a two-ended
 * thread segment. Only a continuous unbroken thread touching every tile,
 * with no loose ends other than the two fabric borders, can mend the bond.
 */
export type BraveTapestrySize=3|4;
export type BraveTapestry={
 size:BraveTapestrySize;pieces:readonly number[];rotations:readonly number[];
};
const NORTH=1,EAST=2,SOUTH=4,WEST=8;
export const BRAVE_THREAD_DIRS=[NORTH,EAST,SOUTH,WEST] as const;
export function braveRotateMask(mask:number,clockwise:number):number{
 let out=mask;
 for(let t=0;t<((clockwise%4)+4)%4;t++){
  out=((out<<1)&15)|((out&8)>>3);
 }
 return out;
}
export function braveTapestrySolved(size:BraveTapestrySize):BraveTapestry{
 const coords:{r:number;c:number}[]=[];
 for(let row=0;row<size;row++){
  for(let k=0;k<size;k++)coords.push({r:row,c:row%2===0?k:size-1-k});
 }
 const pieces:number[]=[];
 const dirs=(a:{r:number;c:number},b:{r:number;c:number})=>
  b.r<a.r?NORTH:b.c>a.c?EAST:b.r>a.r?SOUTH:WEST;
 for(let i=0;i<coords.length;i++){
  const from=coords[i];
  const prev=i===0?WEST:dirs(from,coords[i-1]);
  const next=i===coords.length-1?(size%2===1?EAST:WEST):dirs(from,coords[i+1]);
  pieces[from.r*size+from.c]=prev|next;
 }
 return {size,pieces,rotations:Array(size*size).fill(0)};
}
export function braveTapestryScrambled(size:BraveTapestrySize):BraveTapestry{
 const base=braveTapestrySolved(size);
 const rotations=base.pieces.map((_,i)=>(i*7+Math.floor(i/size)*3+1)%4);
 return {...base,rotations};
}
export function braveTapestryTurn(p:BraveTapestry,index:number):BraveTapestry{
 if(index<0||index>=p.pieces.length)return p;
 const rotations=[...p.rotations];
 rotations[index]=(rotations[index]+1)%4;
 return {...p,rotations};
}
export function braveTapestryCheck(p:BraveTapestry):{
 solved:boolean;connected:number;openEnds:number;correctLinks:number;
}{
 const size=p.size,n=size*size;
 if(p.pieces.length!==n||p.rotations.length!==n)return {solved:false,connected:0,openEnds:n,correctLinks:0};
 const masks=p.pieces.map((m,i)=>braveRotateMask(m,p.rotations[i]));
 const opposite:Record<number,number>={[NORTH]:SOUTH,[EAST]:WEST,[SOUTH]:NORTH,[WEST]:EAST};
 const offsets:[number,number,number][]=[[-1,0,NORTH],[0,1,EAST],[1,0,SOUTH],[0,-1,WEST]];
 let openEnds=0,correctLinks=0;
 const edges=new Map<number,number[]>();
 for(let i=0;i<n;i++){
  const row=Math.floor(i/size),col=i%size;
  const neighbors:number[]=[];
  for(const [dr,dc,dir] of offsets){
   if(!(masks[i]&dir))continue;
   const rr=row+dr,cc=col+dc;
   if(rr<0||cc<0||rr>=size||cc>=size){
    const borderFromStart=i===0&&dir===WEST;
    const borderToFinish=i===n-1&&size%2===1&&dir===EAST||
      i===(size-1)*size&&size%2===0&&dir===WEST;
    if(!borderFromStart&&!borderToFinish)openEnds++;
   }else{
    const other=rr*size+cc;
    if(masks[other]&opposite[dir]){
     neighbors.push(other);if(i<other)correctLinks++;
    }else openEnds++;
   }
  }
  edges.set(i,neighbors);
 }
 const visited=new Set([0]),queue=[0];
 for(let i=0;i<queue.length;i++){
  for(const next of edges.get(queue[i])??[]){
   if(!visited.has(next)){visited.add(next);queue.push(next)}
  }
 }
 // Endpoints must face the correct fabric border, and all other thread ends
 // must meet. Mere graph connectivity is NOT enough.
 const startOK=Boolean(masks[0]&WEST);
 const finish=size%2===1?Boolean(masks[n-1]&EAST):Boolean(masks[(size-1)*size]&WEST);
 const solved=startOK&&finish&&openEnds===0&&visited.size===n&&correctLinks===n-1;
 return {solved,connected:visited.size,openEnds,correctLinks};
}
/** A known exact solution is retained in the generated base design, so the
 * game never needs a guess about whether a scramble is completable. */
export function braveTapestryRestorable(p:BraveTapestry):boolean{
 return braveTapestryCheck({...p,rotations:Array(p.pieces.length).fill(0)}).solved;
}
