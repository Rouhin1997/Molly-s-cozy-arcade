import type {IndiaMystery,MysteryKind,MysteryBeat,IndiaSpot} from './indiaMysteries';
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
/** Rough illustrative pin positions only, never cartographic boundaries. */
const anchors:Record<string,[number,number]>={
 Delhi:[47,23],Mumbai:[42,57],Maharashtra:[42,57],Kolkata:[66,52],
 'West Bengal':[66,52],Telangana:[50,65],Hyderabad:[51,64],
 Rajasthan:[35,32],Jaipur:[36,32],Gujarat:[24,50],Punjab:[39,16],
 Haryana:[44,22],Karnataka:[44,74],Kerala:[42,90],Tamil Nadu:[53,88],
 Odisha:[64,55],Assam:[80,40],Manipur:[93,51],
 Bihar:[62,43],Jharkhand:[61,49],Uttarakhand:[52,20],
 'Uttar Pradesh':[52,34],Himachal:[45,13],Kashmir:[40,10],
 Ladakh:[50,8],Goa:[38,68],'Madhya Pradesh':[49,48],
 'Western Ghats':[40,75],Sriharikota:[58,75],
 Agra:[48,30],Varanasi:[57,42],Amritsar:[39,16],
 Srinagar:[40,10],Kochi:[42,85],Shimla:[45,15],
 Darjeeling:[72,37],Hampi:[45,73],Udaipur:[33,42],
 Leh:[51,8],Rameswaram:[53,93],Munnar:[45,84],
 Kanyakumari:[51,101],'Indian Himalayas':[53,12],
 'Bay of Bengal':[84,70],'Arabian Sea':[26,77],
 'Northern India':[48,29],'North India':[48,29],
 'South India':[48,83],'Northeast India':[83,44],
 'Eastern India':[66,51],'Western India':[34,51],
 'Coastal India':[42,75],'Pan-Indian':[55,57],
};
function regionPin(region:string):IndiaSpot|undefined{
 const match=Object.entries(anchors).find(([key])=>region.toLowerCase().includes(key.toLowerCase()));
 if(!match)return undefined;
 return {x:match[1][0],y:match[1][1],label:region};
}

export function assembleIndiaPack(pack:RawEntry):IndiaMystery[]{
 const raw=pack.rows.split('\n').map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));
 return raw.map((line,i)=>{
  const fields=line.split('|').map(x=>x.trim());
  if(fields.length===8)fields.push(''); // trailing empty optional aliases
  if(fields.length!==9)throw new Error('Mystery data field count: '+pack.kind+'/'+i+' '+fields[0]);
  const [answer,topic,region,era,intro,first,second,bonus,aliases]=fields;
  const id='atlas-'+pack.kind+'-'+answer.toLowerCase().normalize('NFKD')
   .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const pin=regionPin(region);
  const third:MysteryBeat=pack.kind==='when'
   ?{type:'year',text:'The event belongs to the '+era+' period.'}
   :pack.kind==='where'
    ?{type:'map',text:'Look in or near '+region+'.'}
    :pack.kind==='who'
     ?{type:pin?'map':'detail',text:'This person is closely associated with '+region+'.'}
     :{type:pin?'map':'detail',text:'It has a strong connection with '+region+'.'};
  const clues:[MysteryBeat,MysteryBeat,MysteryBeat]=[
   {type:i%4===0?'story':'detail',text:first},
   {type:i%5===0?'visual':'story',text:second},
   third,
  ];
  const hintTwo='A final nudge: the answer begins with '+answer[0]+' and has '+answer.split(/\s+/).length+' word'+(answer.includes(' ')?'s.':'.');
  return {id,kind:pack.kind,answer,topic,region,era,intro,
   aliases:aliases?aliases.split(';').map(x=>x.trim()).filter(Boolean):[],
   beats:clues,assists:[bonus,hintTwo],fact:first+' '+second,
   difficulty:pack.difficulty,visualSymbol:iconForTopic(topic),...(pin?{spot:pin}:{})};
 });
}
