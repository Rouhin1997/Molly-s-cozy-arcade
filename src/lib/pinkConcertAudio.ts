/** Short original note flourish for the already-approved grand finale.
 * Real cheering is played separately using Wikimedia Commons' public-domain
 * Clapping hurray.ogg recording. Never call synth tones "crowd audio". */
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
}
