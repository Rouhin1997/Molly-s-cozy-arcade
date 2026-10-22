/** Six original, chapter-sensitive instrumental sketches for the Brave storybook.
 * Synthesized locally, never sampled from the film or a third-party score. */
export type BraveMusicTheme={
 title:string;beatMs:number;melody:readonly number[];bass:readonly number[];
};
export const braveMusicThemes:Record<string,BraveMusicTheme>={
 highland:{title:'Morning over DunBroch',beatMs:610,
  melody:[62,66,69,74,72,69,66,64,62,66,69,71,69,66,64,62],
  bass:[50,50,47,45]},
 forest:{title:'Lanterns in the Mist',beatMs:710,
  melody:[64,67,71,74,71,67,69,67,64,-1,67,71,76,74,71,67],
  bass:[40,47,43,45]},
 witch:{title:'The Carver’s Curiosity',beatMs:560,
  melody:[67,71,74,73,76,74,71,69,67,69,73,76,74,71,69,67],
  bass:[43,47,45,50]},
 castle:{title:'Whispers Behind the Tapestry',beatMs:600,
  melody:[60,64,67,72,71,67,64,67,60,65,69,72,69,67,64,60],
  bass:[48,45,53,43]},
 shadow:{title:'The Broken Circle',beatMs:745,
  melody:[62,65,69,67,65,-1,62,60,62,65,70,69,65,62,60,-1],
  bass:[38,41,46,45]},
 bond:{title:'The First Light of Dawn',beatMs:590,
  melody:[67,71,74,79,76,74,71,69,67,71,74,76,79,76,74,79],
  bass:[43,47,48,50]}
};
export type BraveMusicPlayer={stop:()=>void;setChapter:(id:string)=>void};

/** Four evolving phrases per chapter (approximately 35–47 seconds before repeat).
 * Sustained fiddle/whistle lines and harp arpeggios replace naked high-pitched ticks.
 * Every sound is synthesized from scratch, with no copyrighted samples. */
const pitch=(midi:number)=>440*Math.pow(2,(midi-69)/12);
function texture(ctx:AudioContext):AudioBuffer{
 const b=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),p=b.getChannelData(0);
 let seed=917314;
 for(let i=0;i<p.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;p[i]=seed/2147483648-1}
 return b;
}
export function startBraveMusic(chapterId:string):BraveMusicPlayer{
 let ctx:AudioContext;
 try{ctx=new window.AudioContext()}catch{return {stop:()=>{},setChapter:()=>{}}}
 if(ctx.state==='suspended')void ctx.resume().catch(()=>{});
 const master=ctx.createGain();master.gain.value=.12;
 const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-22;limiter.ratio.value=2.6;
 master.connect(limiter);limiter.connect(ctx.destination);
 const noise=texture(ctx),wind=ctx.createBufferSource();wind.buffer=noise;wind.loop=true;
 const windFilter=ctx.createBiquadFilter();windFilter.type='lowpass';windFilter.frequency.value=215;
 const windGain=ctx.createGain();windGain.gain.value=.009;
 wind.connect(windFilter);windFilter.connect(windGain);windGain.connect(master);wind.start();
 const echo=ctx.createDelay(.6);echo.delayTime.value=.29;
 const send=ctx.createGain();send.gain.value=.12;echo.connect(send);send.connect(master);
 let current=braveMusicThemes[chapterId]??braveMusicThemes.highland;
 let count=0,closed=false,timer:number|undefined,transition:number|undefined;
 function note(midi:number,t:number,duration:number,instrument:'fiddle'|'flute'|'harp'|'strings'|'bass',vol:number){
  if(midi<0||closed)return;
  const o=ctx.createOscillator(),filter=ctx.createBiquadFilter(),env=ctx.createGain();
  const long=instrument==='fiddle'||instrument==='flute'||instrument==='strings';
  o.type=instrument==='fiddle'||instrument==='strings'?'sawtooth':
   instrument==='flute'||instrument==='bass'?'sine':'triangle';
  filter.type='lowpass';
  filter.frequency.value=instrument==='fiddle'?1300:instrument==='strings'?600:instrument==='harp'?2300:2000;
  const attack=instrument==='strings'?.5:instrument==='fiddle'?.13:instrument==='flute'?.09:.012;
  const hold=long?Math.max(attack+.07,duration*.72):.17;
  const decay=instrument==='strings'?.95:long?.38:.64;
  o.frequency.setValueAtTime(pitch(midi),t);
  if(instrument==='fiddle'){
   const vibrato=ctx.createOscillator(),depth=ctx.createGain();
   vibrato.frequency.value=5.1;depth.gain.setValueAtTime(0,t);depth.gain.linearRampToValueAtTime(3.2,t+.3);
   vibrato.connect(depth);depth.connect(o.frequency);
   vibrato.start(t);vibrato.stop(t+hold+decay+.02);
  }
  o.connect(filter);filter.connect(env);env.connect(master);
  if(instrument==='flute'||instrument==='harp')env.connect(echo);
  env.gain.setValueAtTime(.0001,t);
  env.gain.linearRampToValueAtTime(vol,t+attack);
  env.gain.setValueAtTime(vol*.69,t+hold);
  env.gain.exponentialRampToValueAtTime(.0001,t+hold+decay);
  o.start(t);o.stop(t+hold+decay+.03);
 }
 function drum(t:number,strong:boolean){
  const o=ctx.createBufferSource();o.buffer=noise;
  const f=ctx.createBiquadFilter(),g=ctx.createGain();
  f.type='lowpass';f.frequency.value=160;
  g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(strong?.037:.017,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+.14);
  o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.15);
 }
 function play(){
  if(closed||ctx.state==='closed')return;
  const t=ctx.currentTime+.02,beat=current.beatMs/1000,index=count%16,phrase=Math.floor(count/16)%4;
  const chapter=Object.keys(braveMusicThemes).find(k=>braveMusicThemes[k]===current)??'highland';
  const lead=chapter==='forest'||chapter==='castle'?'flute':
    chapter==='witch'?'harp':'fiddle';
  const motive=current.melody[(index+(phrase===1?4:0))%16];
  const reply=phrase>=2
   ?current.melody[(index+8)%16]+(phrase===3&&index%4===0?2:0)
   :motive;
  const melody=index%16===7&&phrase===1?-1:reply;
  if(melody>=0){
   note(melody,t,beat*(index%4===3?1.5:.92),lead,
    lead==='fiddle'?.036:lead==='flute'?.063:.095);
   if(phrase>=2&&index%4===2)note(melody-12,t+.14,beat*1.1,'flute',.024);
  }
  if(index%4===0){
   const root=current.bass[index/4];
   note(root,t,beat*4.1,'strings',chapter==='shadow'?.023:.018);
   note(root+7,t+.12,beat*3.8,'strings',.009);
   note(root+12,t,beat*3.4,'strings',.006);
   note(root,t,beat*2.4,'bass',.06);
  }
  // A 4-bar arpeggio provides a real harmonic bed underneath the quest theme.
  if(index%2===0||phrase>=2&&index%4===3){
   const root=current.bass[Math.floor(index/4)];
   const offsets=[12,19,24,16,19,24,28,19];
   note(root+offsets[(index+phrase*3)%8],t+beat*.13,beat*.65,'harp',.043);
  }
  if((chapter==='highland'||chapter==='witch'||chapter==='bond')&&index%4===0)drum(t,index===0);
  if(chapter==='highland'&&index%4===2)drum(t,false);
  count++;
  timer=window.setTimeout(play,current.beatMs);
 }
 play();
 return {
  setChapter(id:string){
   if(closed||!braveMusicThemes[id]||braveMusicThemes[id]===current)return;
   current=braveMusicThemes[id];count=0;
   if(timer!==undefined)window.clearTimeout(timer);
   if(transition!==undefined)window.clearTimeout(transition);
   const t=ctx.currentTime;
   master.gain.cancelScheduledValues(t);
   master.gain.setValueAtTime(master.gain.value,t);
   master.gain.linearRampToValueAtTime(.015,t+.3);
   transition=window.setTimeout(()=>{
    if(closed)return;
    const now=ctx.currentTime;
    master.gain.setValueAtTime(.015,now);
    master.gain.linearRampToValueAtTime(.12,now+1.4);
    play();
   },320);
  },
  stop(){
   if(closed)return;closed=true;
   if(timer!==undefined)window.clearTimeout(timer);
   if(transition!==undefined)window.clearTimeout(transition);
   wind.stop();
   const now=ctx.currentTime;master.gain.cancelScheduledValues(now);
   master.gain.setValueAtTime(master.gain.value,now);
   master.gain.linearRampToValueAtTime(.0001,now+.13);
   window.setTimeout(()=>{void ctx.close().catch(()=>{})},170);
  }
 };
}
