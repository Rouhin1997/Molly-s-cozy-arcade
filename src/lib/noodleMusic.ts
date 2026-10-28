/** Original, procedural pacy kitchen groove. This is NOT Kung Fu Panda film music.
 * Percussion, bamboo-like plucks, low strings and pentatonic hooks are all
 * synthesized in-browser; audio starts only from a user gesture.
 */
export type NoodleMusic={stop:()=>void;setPaused:(value:boolean)=>void;celebrate:()=>void};
export function startNoodleMusic(level=1):NoodleMusic{
 let ctx:AudioContext;
 try{ctx=new AudioContext()}catch{return {stop(){},setPaused(){},celebrate(){}}}
 if(ctx.state==='suspended')void ctx.resume().catch(()=>{});
 const bus=ctx.createGain(),compress=ctx.createDynamicsCompressor();
 bus.gain.value=.15;compress.threshold.value=-17;compress.ratio.value=3;
 bus.connect(compress);compress.connect(ctx.destination);
 const noise=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.2),ctx.sampleRate);
 const nd=noise.getChannelData(0);
 for(let i=0;i<nd.length;i++)nd[i]=(Math.random()*2-1)*Math.pow(1-i/nd.length,1.3);
 let stopped=false,paused=false,index=0;
 const bpm=level<=2?118:level<=5?128:136,beat=60/bpm,step=beat/2;
 const bass=[40,40,43,38,40,47,43,38];
 const hook=[[64,67,69,72,69,67,64,-1],[64,67,72,74,72,69,67,-1],
  [67,69,72,76,74,72,69,67],[64,69,67,64,62,64,67,-1]][(level-1)%4];
 function tone(midi:number,t:number,d:number,kind:'pluck'|'bass'|'bell',gain:number){
  if(midi<0||stopped)return;
  const osc=ctx.createOscillator(),env=ctx.createGain(),filter=ctx.createBiquadFilter();
  const freq=440*Math.pow(2,(midi-69)/12);
  osc.type=kind==='bass'?'triangle':kind==='bell'?'sine':'triangle';
  osc.frequency.setValueAtTime(freq,t);
  if(kind==='pluck')osc.frequency.exponentialRampToValueAtTime(freq*.997,t+.14);
  filter.type='lowpass';filter.frequency.value=kind==='bass'?620:kind==='bell'?2800:1900;
  env.gain.setValueAtTime(.0001,t);
  env.gain.exponentialRampToValueAtTime(gain,t+.008);
  env.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.06,d));
  osc.connect(filter);filter.connect(env);env.connect(bus);
  osc.start(t);osc.stop(t+Math.max(.07,d)+.04);
 }
 function drum(t:number,k:'kick'|'snare'|'hat'){
  if(stopped)return;
  const g=ctx.createGain();
  if(k==='kick'){
   const o=ctx.createOscillator();o.type='sine';o.frequency.setValueAtTime(145,t);
   o.frequency.exponentialRampToValueAtTime(54,t+.12);
   g.gain.setValueAtTime(.28,t);g.gain.exponentialRampToValueAtTime(.0001,t+.16);
   o.connect(g);g.connect(bus);o.start(t);o.stop(t+.17);return;
  }
  const src=ctx.createBufferSource(),f=ctx.createBiquadFilter();src.buffer=noise;
  f.type=k==='hat'?'highpass':'bandpass';f.frequency.value=k==='hat'?6200:900;
  g.gain.setValueAtTime(k==='hat'?.085:.17,t);
  g.gain.exponentialRampToValueAtTime(.0001,t+(k==='hat'?.05:.14));
  src.connect(f);f.connect(g);g.connect(bus);src.start(t);src.stop(t+(k==='hat'?.055:.16));
 }
 let next=ctx.currentTime+.09;
 function schedule(){
  if(stopped||paused)return;
  const now=ctx.currentTime;
  while(next<now+.22){
   const n=index%16,bar=Math.floor(index/16)%4;
   if(n%4===0)drum(next,'kick');
   if(n===4||n===12)drum(next,'snare');
   if(n%2===0||level>=5)drum(next,'hat');
   if(n%4===0)tone(bass[(index>>2)%bass.length],next,.28,'bass',.22);
   if(n%2===0&&bar!==3)tone(hook[(n>>1)%hook.length]+(bar===2?0:0),next,.18,'pluck',.14);
   if(n===15)tone(79+(bar%2)*2,next,.57,'bell',.085);
   next+=step;index++;
  }
 }
 const timer=window.setInterval(schedule,60);schedule();
 function setPaused(value:boolean){
  paused=value;
  if(value){void ctx.suspend().catch(()=>{})}
  else{void ctx.resume().catch(()=>{});next=ctx.currentTime+.08}
 }
 function celebrate(){
  if(stopped)return;const t=ctx.currentTime+.04;
  [72,76,79,84].forEach((n,i)=>tone(n,t+i*.095,.4,'bell',.16));
 }
 function stop(){if(stopped)return;stopped=true;window.clearInterval(timer);void ctx.close().catch(()=>{})}
 return {stop,setPaused,celebrate};
}
