/**
 * Original, synthesized concert reactions. No real music, copyrighted sample
 * or externally hosted audio is involved. Audio plays ONLY after a click.
 */
export function concertReaction(ctx:AudioContext,positive:boolean,energy:number){
 const t=ctx.currentTime+.015;
 if(ctx.state==='suspended')void ctx.resume();
 const master=ctx.createGain();
 master.gain.setValueAtTime(.0001,t);
 master.gain.exponentialRampToValueAtTime(positive?Math.min(.16,.055+energy*.008):.037,t+.05);
 master.gain.exponentialRampToValueAtTime(.0001,t+(positive?1.55:.46));
 master.connect(ctx.destination);
 // A crowd-like cheering wash: multiple filtered voices made from white noise.
 const duration=positive?1.7:.55,samples=Math.floor(ctx.sampleRate*duration);
 const buffer=ctx.createBuffer(1,samples,ctx.sampleRate),data=buffer.getChannelData(0);
 for(let i=0;i<samples;i++){
  const tt=i/ctx.sampleRate;
  const voices=Math.sin(2*Math.PI*(220+43*Math.sin(tt*5.3))*tt)+
    .55*Math.sin(2*Math.PI*(311+64*Math.sin(tt*7.1))*tt)+
    .35*Math.sin(2*Math.PI*(455+55*Math.sin(tt*4.7))*tt);
  data[i]=Math.max(-1,Math.min(1,.48*(Math.random()*2-1)+.25*voices));
 }
 const src=ctx.createBufferSource();src.buffer=buffer;
 const filter=ctx.createBiquadFilter();filter.type='bandpass';
 filter.frequency.setValueAtTime(positive?1250:330,t);filter.Q.value=.65;
 src.connect(filter);filter.connect(master);src.start(t);src.stop(t+duration);
 // One stomp of the stage kick and handclaps on positive hits.
 function hit(at:number,freq:number,amp:number){
  const osc=ctx.createOscillator(),env=ctx.createGain();
  osc.type=positive?'triangle':'sine';
  osc.frequency.setValueAtTime(freq,at);
  osc.frequency.exponentialRampToValueAtTime(Math.max(55,freq*.65),at+.17);
  env.gain.setValueAtTime(.0001,at);
  env.gain.exponentialRampToValueAtTime(amp,at+.025);
  env.gain.exponentialRampToValueAtTime(.0001,at+.23);
  osc.connect(env);env.connect(ctx.destination);
  osc.start(at);osc.stop(at+.26);
 }
 if(positive){
  hit(t,261.63,.065);hit(t+.19,392,.05);hit(t+.39,523.25,.05);
 }else hit(t,145,.048);
}
export function finaleFanfare(ctx:AudioContext){
 if(ctx.state==='suspended')void ctx.resume();
 const notes=[392,523.25,659.25,784,1046.5,784,1046.5];
 const t=ctx.currentTime+.04;
 notes.forEach((freq,i)=>{
  const osc=ctx.createOscillator(),gain=ctx.createGain(),start=t+i*.19;
  osc.type='triangle';osc.frequency.value=freq;
  gain.gain.setValueAtTime(.0001,start);
  gain.gain.exponentialRampToValueAtTime(.12,start+.035);
  gain.gain.exponentialRampToValueAtTime(.0001,start+.38);
  osc.connect(gain);gain.connect(ctx.destination);
  osc.start(start);osc.stop(start+.4);
 });
 concertReaction(ctx,true,12);
}
