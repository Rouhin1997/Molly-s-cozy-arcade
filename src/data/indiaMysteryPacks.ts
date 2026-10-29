import type {IndiaMystery,MysteryKind,MysteryBeat} from './indiaMysteries';
/** Compact, reviewed editorial records. Each pipe-delimited row is a single
 * independently authored mystery (title, tags, opening, clues, bonus).
 * Region is a common association rather than an exclusive claim of origin.
 * Third note and last-resort hint use accurate metadata, never guessed facts.
 */
export type PackDifficulty='easy'|'medium'|'hard';
type RawEntry={kind:MysteryKind;difficulty:PackDifficulty;rows:string};
const symbols:Record<string,string>={
 film:'🎬',cinema:'🎥',music:'🎵',cricket:'🏏',sport:'🏅',politics:'🏛️',
 history:'📜',science:'🔬',space:'🚀',business:'🏢',literature:'📚',art:'🎨',
 food:'🍽️',fruit:'🥭',animal:'🐾',bird:'🪶',nature:'🌿',festival:'🪔',
 monument:'🏯',city:'🏙️',river:'🌊',geography:'🧭',transport:'🚆',
 technology:'💡','film-title':'🎞️',book:'📖',award:'🏆',craft:'🧵',
 naval:'⚓',rocket:'🚀',event:'🗓️',independence:'🇮🇳',
};
export const iconForTopic=(topic:string)=>symbols[topic]??'✦';
export function assembleIndiaPack(pack:RawEntry):IndiaMystery[]{
 const raw=pack.rows.split('\n').map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));
 return raw.map((line,i)=>{
  const fields=line.split('|').map(x=>x.trim());
  if(fields.length!==9)throw new Error('Mystery data field count: '+pack.kind+'/'+i+' '+fields[0]);
  const [answer,topic,region,era,intro,first,second,bonus,aliases]=fields;
  const id='atlas-'+pack.kind+'-'+answer.toLowerCase().normalize('NFKD')
   .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const third:MysteryBeat=pack.kind==='when'
   ?{type:'year',text:'The event belongs to the '+era+' period.'}
   :pack.kind==='where'
    ?{type:'map',text:'Look in or near '+region+'.'}
    :pack.kind==='who'
     ?{type:'detail',text:'This person is closely associated with '+region+'.'}
     :{type:'detail',text:'It has a strong connection with '+region+'.'};
  const clues:[MysteryBeat,MysteryBeat,MysteryBeat]=[
   {type:i%4===0?'story':'detail',text:first},
   {type:i%5===0?'visual':'story',text:second},
   third,
  ];
  const hintTwo='A final nudge: the answer begins with '+answer[0]+' and has '+answer.split(/\s+/).length+' word'+(answer.includes(' ')?'s.':'.');
  return {id,kind:pack.kind,answer,topic,region,era,intro,
   aliases:aliases?aliases.split(';').map(x=>x.trim()).filter(Boolean):[],
   beats:clues,assists:[bonus,hintTwo],fact:first+' '+second,
   difficulty:pack.difficulty,visualSymbol:iconForTopic(topic)};
 });
}
