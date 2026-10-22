import type { CSSProperties } from 'react';

/** Unofficial, original illustrated detective badge tokens.
 * These are not actor portraits or traced broadcast assets. */
const persons:Record<string,{hair:string;skin:string;shirt:string;bg:string;prop:string;tag:string}> = {
 Jake:{hair:'#50302a',skin:'#e4b38c',shirt:'#a97369',bg:'#f8dccb',prop:'✦',tag:'THE INSTINCT'},
 Amy:{hair:'#40302b',skin:'#f3c29d',shirt:'#8b8dba',bg:'#dddff7',prop:'📋',tag:'THE BINDER'},
 Holt:{hair:'#333039',skin:'#a66c4f',shirt:'#434e63',bg:'#d8e9ee',prop:'◆',tag:'THE CAPTAIN'},
 Rosa:{hair:'#28222e',skin:'#be826d',shirt:'#353644',bg:'#e6dbeb',prop:'⚡',tag:'THE ENIGMA'},
 Terry:{hair:'#241e27',skin:'#9c5d42',shirt:'#6e8ca7',bg:'#e4ecf3',prop:'💪',tag:'THE SERGEANT'},
 Charles:{hair:'#82604a',skin:'#ecc09c',shirt:'#a6aa7a',bg:'#f0edce',prop:'🍲',tag:'THE FOODIE'},
 Gina:{hair:'#855948',skin:'#f5c9a7',shirt:'#c57e9a',bg:'#f9dce9',prop:'★',tag:'THE ICON'},
 Cheddar:{hair:'#b57a4e',skin:'#fff2d0',shirt:'#b87953',bg:'#e1eecb',prop:'🐾',tag:'THE GOOD BOY'},
 Scully:{hair:'#d0c6b7',skin:'#f1bc98',shirt:'#8aaba2',bg:'#e7ede5',prop:'🥪',tag:'THE VETERAN'},
 Hitchcock:{hair:'#b5a295',skin:'#ecc09c',shirt:'#9e9aaf',bg:'#e6deef',prop:'🍩',tag:'THE OTHER ONE'},
};
const generic={hair:'#5a4654',skin:'#e9b895',shirt:'#a789a7',bg:'#e9e0ef',prop:'?',tag:'WITNESS'};
export function NineNinePortrait({name,size=70}:{name:string;size?:number}){
 const p=persons[name]??generic,style={width:size,height:size,flex:'none'} as CSSProperties;
 if(name==='Cheddar')return <svg style={style} className="nn-portrait" width={size} height={size} viewBox="0 0 110 110" role="img" aria-label="Original cartoon sticker of Cheddar the corgi">
   <circle cx="55" cy="54" r="50" fill={p.bg} stroke="#fff" strokeWidth="7"/>
   <path d="M21 54 L23 15 Q34 12 43 39 Q56 34 69 39 Q82 14 92 15 L91 59" fill="#b77b4e" stroke="#785034" strokeWidth="3"/>
   <path d="M28 54 Q29 35 54 37 Q84 35 84 56 L78 85 L55 96 L30 82Z" fill="#d69b60"/>
   <path d="M35 57 Q54 45 76 57 L70 87 L55 94 L39 87Z" fill="#fff5db"/>
   <ellipse cx="39" cy="60" rx="4" ry="5" fill="#302b37"/><ellipse cx="70" cy="60" rx="4" ry="5" fill="#302b37"/>
   <ellipse cx="55" cy="76" rx="8" ry="6" fill="#3d3333"/><path d="M55 82 Q46 89 42 84 M55 82 Q64 89 67 84" stroke="#5c4543" fill="none" strokeWidth="2"/>
   <circle cx="85" cy="27" r="14" fill="#fff"/><text x="85" y="32" fontSize="17" textAnchor="middle">🐾</text>
  </svg>;
 return <svg style={style} className="nn-portrait" width={size} height={size} viewBox="0 0 110 110" role="img" aria-label={`Original chibi detective sticker inspired by ${name}`}>
  <title>{name} — original stylized precinct token</title>
  <circle cx="55" cy="55" r="50" fill={p.bg} stroke="#fff" strokeWidth="7"/>
  <path d="M14 106 Q14 78 34 77 L77 77 Q98 81 97 105Z" fill={p.shirt} stroke="#776279" strokeWidth="2"/>
  {name==='Holt'&&<path d="M50 78 L55 103 L61 78" fill="#d2a2a6" stroke="#fff" strokeWidth="2"/>}
  {name==='Jake'&&<path d="M28 81 L46 89 L55 82 L63 90 L80 83" stroke="#d9b49f" strokeWidth="3" fill="none"/>}
  {name==='Amy'&&<path d="M30 86 L47 80 L56 91 L68 80 L81 86" fill="none" stroke="#f5eaed" strokeWidth="3"/>}
  {name==='Rosa'&&<path d="M23 80 L43 95 L57 80 L68 95 L89 82" fill="none" stroke="#5d5c71" strokeWidth="4"/>}
  <path d="M21 56 Q16 22 39 18 Q55 8 72 20 Q91 28 87 56 L86 81 L76 82 L74 44 L35 44 L34 82 L22 81Z" fill={p.hair}/>
  <ellipse cx="55" cy="54" rx="25" ry="31" fill={p.skin} stroke="#a67e76" strokeWidth="1.5"/>
  <path d={name==='Terry'||name==='Holt'?'M28 32 Q45 22 76 31':'M29 36 Q26 16 48 17 Q75 13 79 37 Q62 31 56 25 Q44 36 29 36'} fill={p.hair} stroke="#6c5162" strokeWidth="1"/>
  {name==='Gina'&&<path d="M29 34 Q16 48 23 82 M78 34 Q93 55 85 83" stroke={p.hair} strokeWidth="13" strokeLinecap="round"/>}
  {name==='Amy'&&<path d="M27 38 L24 82 M80 37 L86 81" stroke={p.hair} strokeWidth="11" strokeLinecap="round"/>}
  <path d="M36 46 Q42 43 48 46 M62 46 Q68 43 74 46" fill="none" stroke="#604b51" strokeWidth="2"/>
  <ellipse cx="42" cy="53" rx="3" ry="4" fill="#302b38"/><ellipse cx="68" cy="53" rx="3" ry="4" fill="#302b38"/>
  {name==='Amy'&&<g fill="none" stroke="#564355" strokeWidth="2.5"><rect x="31" y="45" width="20" height="15" rx="4"/><rect x="59" y="45" width="20" height="15" rx="4"/><path d="M51 51 L59 51"/></g>}
  <path d="M54 55 L52 65 Q57 68 60 65" fill="none" stroke="#b07b70" strokeWidth="1.5"/>
  <path d={name==='Holt'||name==='Rosa'?'M46 76 Q55 74 64 75':'M44 73 Q55 82 66 72'} stroke="#9b5a5c" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
  <circle cx="89" cy="23" r="14" fill="#fff" stroke="#ceb9d5" strokeWidth="2"/>
  <text x="89" y="28" fontSize={p.prop.length>1?16:20} textAnchor="middle" fill="#9b728e">{p.prop}</text>
 </svg>;
}
