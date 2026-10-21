import type { CSSProperties } from 'react';

/** Original hand-drawn vector character-inspired chibi stickers.
 * NOT official actor likenesses, TV stills or traced copyrighted graphics. */
type Name='Sheldon'|'Leonard'|'Penny'|'Amy'|'Howard'|'Bernadette'|'Raj'|'Stuart';
const palette:Record<Name,{skin:string;hair:string;shirt:string;background:string;accent:string}> = {
  Sheldon:{skin:'#f4c5a3',hair:'#322638',shirt:'#dd444e',background:'#dcd4f9',accent:'#fff7b5'},
  Leonard:{skin:'#eec19e',hair:'#5c413a',shirt:'#617b8a',background:'#d6ebfc',accent:'#e9f1f4'},
  Penny:{skin:'#f7c9ac',hair:'#f0bf54',shirt:'#e98b9a',background:'#ffe5e7',accent:'#fff8d9'},
  Amy:{skin:'#f1bfa0',hair:'#634332',shirt:'#b69db7',background:'#e7e0f3',accent:'#fce5a4'},
  Howard:{skin:'#edb99a',hair:'#49332e',shirt:'#7d6298',background:'#ffe4c5',accent:'#ecd1fa'},
  Bernadette:{skin:'#f8caaa',hair:'#dcad63',shirt:'#66a8aa',background:'#d9f3ef',accent:'#fff4db'},
  Raj:{skin:'#b77954',hair:'#282333',shirt:'#64a1aa',background:'#e0eaff',accent:'#dff0c5'},
  Stuart:{skin:'#e7b593',hair:'#655145',shirt:'#99a3b5',background:'#e8e9ee',accent:'#edc4a9'},
};
const symbols:Record<Name,string> = {
  Sheldon:'⚛',Leonard:'✦',Penny:'★',Amy:'✿',
  Howard:'✧',Bernadette:'✦',Raj:'☾',Stuart:'★',
};
export function BazingaSticker({name,size=70,expression='normal',className=''}:{
  name:string;size?:number;expression?:'normal'|'happy'|'bazinga';className?:string;
}){
  const p=palette[name as Name]??palette.Stuart;
  const glasses=name==='Leonard'||name==='Amy'||name==='Bernadette';
  const isSheldon=name==='Sheldon';
  const isPenny=name==='Penny'||name==='Bernadette';
  const style={width:size,height:size,flex:'none'} as CSSProperties;
  return <svg className={`bazinga-sticker ${className}`} width={size} height={size} viewBox="0 0 100 104" style={style} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Original cartoon sticker representing ${name}`}>
    <title>{name} — original cartoon token</title>
    <path d="M49 4 C71 1 97 18 97 47 L94 78 Q86 99 52 100 Q15 100 6 77 L4 42 Q8 6 49 4Z" fill="#fff" stroke="#fff" strokeWidth="7"/>
    <path d="M49 7 C72 5 93 21 93 47 L90 76 Q83 96 52 96 Q18 96 10 74 L8 43 Q12 10 49 7Z" fill={p.background} stroke="#b8a9c5" strokeWidth="1.5"/>
    <circle cx="79" cy="23" r="9" fill="#ffffffa9"/>
    <text x="79" y="27" fontSize="13" textAnchor="middle" fill={p.shirt}>{symbols[name as Name]??'✧'}</text>
    <path d="M16 97 Q16 75 37 73 L64 73 Q86 75 86 97" fill={p.shirt} stroke="#62455a" strokeWidth="2"/>
    <path d="M39 75 L49 84 L61 75" fill="none" stroke={p.accent} strokeWidth="4" strokeLinecap="round"/>
    {name==='Howard'&&<path d="M35 77 L62 77 L51 88" fill={p.accent} stroke="#5c4565" strokeWidth="1.5"/>}
    {name==='Leonard'&&<path d="M19 93 L38 76 L48 88 L63 76 L84 95" fill="none" stroke="#b9c3cb" strokeWidth="5"/>}
    {name==='Raj'&&<path d="M26 90 L65 90 M28 82 L71 82" stroke={p.accent} strokeWidth="2" opacity=".75"/>}
    {name==='Stuart'&&<path d="M43 79 L57 88" stroke="#ebdfb9" strokeWidth="2"/>}
    {name==='Amy'&&<path d="M28 79 L21 96 M72 79 L79 96" stroke="#6c8f65" strokeWidth="3"/>}
    {name==='Bernadette'&&<>
      <circle cx="20" cy="29" r="14" fill={p.hair}/><circle cx="78" cy="29" r="14" fill={p.hair}/>
      <path d="M20 53 Q13 40 19 28 Q35 9 50 13 Q77 10 83 35 L82 67 Q72 81 67 79 L67 44Z" fill={p.hair}/>
    </>}
    {name==='Penny'&&<path d="M18 58 Q8 22 34 12 Q70 0 82 29 L83 80 L69 81 L68 43 L29 39 L30 78 L20 76Z" fill={p.hair} stroke="#c9924d" strokeWidth="1.5"/>}
    {name==='Amy'&&<path d="M18 79 L19 35 Q19 13 49 12 Q79 13 80 42 L81 80 L69 77 L68 42 L30 40 L30 79Z" fill={p.hair}/>}
    <ellipse cx="49" cy="49" rx="25" ry="31" fill={p.skin} stroke="#ba877c" strokeWidth="1.5"/>
    {isPenny&&<path d="M25 35 Q27 15 43 16 Q62 17 69 29 L75 36 Q58 31 50 21 Q43 35 25 35Z" fill={p.hair}/>}
    {name==='Amy'&&<path d="M25 35 Q23 13 46 14 Q67 12 74 36 Q53 32 48 26 Q43 34 25 35Z" fill={p.hair}/>}
    {!isPenny&&name!=='Amy'&&<path d={name==='Howard'?'M23 41 Q15 22 30 18 Q44 8 66 18 Q78 24 76 43 L70 35 Q53 27 35 34 Q30 38 23 41Z':name==='Sheldon'?'M24 33 Q24 12 43 14 L66 14 Q77 16 76 34 L70 30 L63 26 L50 28 L37 24 L28 34Z':'M23 37 Q20 21 38 15 Q58 8 71 21 L76 39 Q67 29 60 31 L50 27 L38 31 L27 37Z'} fill={p.hair} stroke="#3f3340" strokeWidth="1"/>}
    {isSheldon&&<path d="M33 30 L40 28 L44 27 M56 26 L67 28" stroke="#241e27" strokeWidth="2"/>}
    <path d={expression==='bazinga'?'M31 40 L41 38 M57 38 L67 40':'M31 41 Q37 38 42 41 M56 41 Q62 38 67 41'} stroke="#654950" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="38" cy="46" rx="2.5" ry="3.5" fill="#2d2d3c"/><ellipse cx="61" cy="46" rx="2.5" ry="3.5" fill="#2d2d3c"/>
    {glasses&&<g fill="none" stroke={name==='Bernadette'?'#a86a75':'#594a52'} strokeWidth="2.4">
      <rect x="27" y="39" width="21" height="17" rx="6"/><rect x="52" y="39" width="21" height="17" rx="6"/>
      <path d="M48 44 Q50 41 52 44"/>
    </g>}
    <path d="M49 47 L47 58 Q49 60 52 58" fill="none" stroke="#b47c74" strokeWidth="1.3" strokeLinecap="round"/>
    <path d={expression==='bazinga'?'M40 65 Q50 72 62 62':expression==='happy'?'M38 63 Q50 76 63 63':'M40 65 Q50 69 60 65'} fill="none" stroke="#8f4e51" strokeWidth="2.4" strokeLinecap="round"/>
    <ellipse cx="29" cy="58" rx="5" ry="2.5" fill="#e48f8f" opacity=".25"/>
    <ellipse cx="71" cy="58" rx="5" ry="2.5" fill="#e48f8f" opacity=".25"/>
    {isSheldon&&<g><circle cx="50" cy="88" r="8" fill={p.accent}/><text x="50" y="92" textAnchor="middle" fontSize="11" fill="#a14445">⚡</text></g>}
  </svg>;
}
