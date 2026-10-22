/** Deterministic hand-seeded Highland labyrinth layouts for Chapters IV–VI.
 * DFS makes winding, branching corridors; carefully placed end-gates and
 * objectives make the path earned without random softlocks.
 * Layouts are generated ONCE from fixed seeds, not randomized during play.
 */
import type {BraveLevel} from './bravePuzzle';
type Options={
 id:string;title:string;width:number;height:number;seed:number;
 wisps:1|2;stones:1|2;key:boolean;gate:'G'|'H'|null;
};
type Cell={r:number;c:number};
export function makeBraveFinaleRoute(o:Options):BraveLevel{
 if(o.width<9||o.width>29||o.height<9||o.height>29||o.width%2===0||o.height%2===0)throw Error('Use an odd 9–29 grid');
 if(o.gate==='H'&&o.stones!==2)throw Error('Moon gates need two stones');
 let seed=o.seed>>>0;
 const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const cells=Array.from({length:o.height},()=>Array.from({length:o.width},()=> '#'));
 const same=(a:Cell,b:Cell)=>a.r===b.r&&a.c===b.c;
 const dirs:[[number,number],[number,number],[number,number],[number,number]]=[
  [0,2],[2,0],[0,-2],[-2,0]
 ];
 const start={r:1,c:1},stack=[start];cells[1][1]='.';
 while(stack.length){
  const curr=stack[stack.length-1];
  const order=[...dirs].sort(()=>rand()-.5);
  const open=order.filter(([dr,dc])=>{
   const r=curr.r+dr,c=curr.c+dc;
   return r>0&&c>0&&r<o.height-1&&c<o.width-1&&cells[r][c]==='#';
  });
  if(!open.length){stack.pop();continue}
  const [dr,dc]=open[Math.floor(rand()*open.length)];
  cells[curr.r+dr/2][curr.c+dc/2]='.';
  const next={r:curr.r+dr,c:curr.c+dc};
  cells[next.r][next.c]='.';stack.push(next);
 }
 const steps:[[number,number],[number,number],[number,number],[number,number]]=[
  [-1,0],[0,1],[1,0],[0,-1]
 ];
 const key=(a:Cell)=>a.r*o.width+a.c;
 const around=(a:Cell)=>steps
  .map(([dr,dc])=>({r:a.r+dr,c:a.c+dc}))
  .filter(b=>b.r>=0&&b.c>=0&&b.r<o.height&&b.c<o.width&&cells[b.r][b.c]!== '#');
 const bfs=(from:Cell,blocked:Set<number>=new Set())=>{
  const queue=[from],dist=new Map([[key(from),0]]),parent=new Map<number,Cell>();
  for(let i=0;i<queue.length;i++){
   const node=queue[i];
   for(const next of around(node)){
    if(blocked.has(key(next))||dist.has(key(next)))continue;
    parent.set(key(next),node);dist.set(key(next),dist.get(key(node))!+1);queue.push(next);
   }
  }
  return {queue,dist,parent};
 };
 const all=bfs(start);
 const leaves=all.queue.filter(p=>around(p).length===1&&all.dist.get(key(p))!>10);
 // Choose a deep dead end, giving its lock a clear purpose.
 const end=(leaves.sort((a,b)=>all.dist.get(key(b))!-all.dist.get(key(a))!)[0])??all.queue[all.queue.length-1];
 const last=all.parent.get(key(end));
 if(!last)throw Error('Maze has no meaningful exit');
 const gate=last;
 if(o.gate)cells[gate.r][gate.c]=o.gate;
 cells[end.r][end.c]='E';cells[start.r][start.c]='S';
 const doorCell=o.key&&o.gate?all.parent.get(key(gate)):undefined;
 const useDoor=Boolean(doorCell&&!same(doorCell,start));
 const blocked=new Set([...(o.gate?[key(gate)]:[]),...(useDoor&&doorCell?[key(doorCell)]:[])]);
 const accessible=bfs(start,blocked);
 if(!accessible.queue.length)throw Error('No upstream cells');
 const candidates=accessible.queue.filter(p=>!same(p,start)&&!same(p,end)&&!same(p,gate)&&around(p).length>=1);
 const chosen:Cell[]=[];
 // Prefer geographically separated items in branches over a straight corridor.
 const rank=(p:Cell)=>accessible.dist.get(key(p))!+
   chosen.reduce((score,x)=>score+Math.abs(p.r-x.r)+Math.abs(p.c-x.c),0)*2;
 function place(glyph:'W'|'A'|'K'){
  const available=candidates.filter(p=>!chosen.some(x=>same(x,p)));
  const best=available.sort((a,b)=>rank(b)-rank(a)||key(a)-key(b))[0];
  if(!best)throw Error('Not enough traversable cells');
  chosen.push(best);cells[best.r][best.c]=glyph;
 }
 for(let i=0;i<o.wisps;i++)place('W');
 for(let i=0;i<o.stones;i++)place('A');
 if(o.key)place('K');
 // A locked door is adjacent to the exit if requested and not a gate.
 if(o.key){
  if(useDoor&&doorCell)cells[doorCell.r][doorCell.c]='D';
  else if(!o.gate)cells[gate.r][gate.c]='D';
 }
 return {id:o.id,title:o.title,rows:cells.map(row=>row.join(''))};
}
export const braveFinaleRoutes={
 midnight:makeBraveFinaleRoute({id:'midnight',title:'The Midnight Escape',width:15,height:13,seed:14502,wisps:1,stones:1,key:false,gate:'G'}),
 passage:makeBraveFinaleRoute({id:'passage',title:'The Secret Passage',width:19,height:13,seed:31545,wisps:2,stones:2,key:true,gate:'H'}),
 tracks:makeBraveFinaleRoute({id:'tracks',title:'Tracks in the Mist',width:21,height:15,seed:98721,wisps:2,stones:2,key:false,gate:'H'}),
 shadow:makeBraveFinaleRoute({id:'shadow-bear',title:'Shadow of the Bear',width:23,height:15,seed:18018,wisps:2,stones:2,key:true,gate:'H'}),
 last:makeBraveFinaleRoute({id:'last-wisp',title:'The Last Wisp',width:23,height:17,seed:63083,wisps:2,stones:2,key:true,gate:'H'})
} as const;
