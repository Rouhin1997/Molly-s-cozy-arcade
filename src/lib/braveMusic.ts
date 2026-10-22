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
function pitch(midi:number):number{return 440*Math.pow(2,(midi-69)/12)}
export function startBraveMusic(chapterId:string):BraveMusicPlayer{
 let ctx:AudioContext;
 try{ctx=new window.AudioContext()}catch{return {stop:()=>{},setChapter:()=>{}}}
 if(ctx.state==='suspended')void ctx.resume().catch(()=>{});
 const master=ctx.createGain();master.gain.value=.115;master.connect(ctx.destination);
 const wind=ctx.createOscillator(),windGain=ctx.createGain();
 wind.type='sine';wind.frequency.value=86;
 windGain.gain.value=.009;wind.connect(windGain);windGain.connect(master);wind.start();
 const breath=ctx.createOscillator(),breathDepth=ctx.createGain();
 breath.frequency.value=.12;breathDepth.gain.value=8;
 breath.connect(breathDepth);breathDepth.connect(wind.frequency);breath.start();
 let current=braveMusicThemes[chapterId]??braveMusicThemes.highland;
 let step=0,closed=false;
 let timer:number|undefined;
 const strike=(midi:number,at:number,low=false)=>{
  if(midi<0||closed)return;
  const tone=ctx.createOscillator(),env=ctx.createGain(),filter=ctx.createBiquadFilter();
  tone.type=low?'sine':'triangle';tone.frequency.value=pitch(midi);
  filter.type='lowpass';filter.frequency.value=low?540:1850;
  env.gain.setValueAtTime(.0001,at);
  env.gain.exponentialRampToValueAtTime(low?.11:.27,at+.026);
  env.gain.exponentialRampToValueAtTime(.0001,at+(low?1.7:1.15));
  tone.connect(filter);filter.connect(env);env.connect(master);
  tone.start(at);tone.stop(at+(low?1.75:1.2));
 };
 function play(){
  if(closed||ctx.state==='closed')return;
  const now=ctx.currentTime,beat=step%16;
  strike(current.melody[beat],now);
  if(beat%4===0)strike(current.bass[Math.floor(beat/4)],now,true);
  step++;
  timer=window.setTimeout(play,current.beatMs);
 }
 play();
 return {
  setChapter(id:string){
   if(!braveMusicThemes[id]||closed||current===braveMusicThemes[id])return;
   current=braveMusicThemes[id];step=0;
   if(timer!==undefined)window.clearTimeout(timer);
   play();
  },
  stop(){
   if(closed)return;
   closed=true;
   if(timer!==undefined)window.clearTimeout(timer);
   wind.stop();breath.stop();
   void ctx.close().catch(()=>{});
  }
 };
}
