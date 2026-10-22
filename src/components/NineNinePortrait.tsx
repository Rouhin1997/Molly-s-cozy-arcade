import type { CSSProperties, ReactNode } from 'react';

/**
 * ORIGINAL 2-D STORYBOOK STICKERS for the unofficial arcade.
 * Distinctive silhouettes/outfits evoke the Nine-Nine characters without using
 * screenshots or traced actor headshots. Molly's illustration was designed from
 * the photo privately supplied in chat; her original photo is NOT stored here.
 */
type Persona={skin:string;hair:string;outfit:string;background:string;outline:string;badge:string;face:'soft'|'angular'|'long'|'round';hairdo:'swept'|'cropped'|'bob'|'waves'|'bun'|'short'|'bald'|'parted';smile:'big'|'warm'|'wry'|'stoic';};
const profiles:Record<string,Persona>={
 Molly:{skin:'#bc7d5c',hair:'#29252e',outfit:'#846654',background:'#f2dacf',outline:'#6b4951',badge:'🔎',face:'soft',hairdo:'parted',smile:'warm'},
 Jake:{skin:'#e8b28e',hair:'#4c302e',outfit:'#576c8b',background:'#f5ddcb',outline:'#655260',badge:'✦',face:'angular',hairdo:'swept',smile:'big'},
 Holt:{skin:'#926448',hair:'#55535b',outfit:'#293c57',background:'#d8e9ec',outline:'#485063',badge:'◆',face:'angular',hairdo:'bald',smile:'stoic'},
 Amy:{skin:'#d6a17d',hair:'#352a2e',outfit:'#9f718c',background:'#e9e1f3',outline:'#655266',badge:'📋',face:'soft',hairdo:'bun',smile:'warm'},
 Rosa:{skin:'#b98169',hair:'#241d29',outfit:'#2c303a',background:'#e5d8e5',outline:'#51435c',badge:'⚡',face:'angular',hairdo:'waves',smile:'stoic'},
 Terry:{skin:'#935d48',hair:'#22212a',outfit:'#607f9d',background:'#dfedf0',outline:'#52556b',badge:'🥛',face:'angular',hairdo:'bald',smile:'big'},
 Charles:{skin:'#e7b690',hair:'#75604f',outfit:'#b9a187',background:'#ede8ce',outline:'#7e6870',badge:'🍜',face:'round',hairdo:'parted',smile:'warm'},
 Gina:{skin:'#e8b18d',hair:'#69443b',outfit:'#b86f92',background:'#f6dbeb',outline:'#8a5879',badge:'✿',face:'soft',hairdo:'waves',smile:'wry'},
 Scully:{skin:'#ecc19d',hair:'#aba294',outfit:'#829e92',background:'#e1eee3',outline:'#756475',badge:'🥪',face:'round',hairdo:'cropped',smile:'big'},
 Hitchcock:{skin:'#dcb08e',hair:'#aea092',outfit:'#90849f',background:'#ede1f0',outline:'#745e72',badge:'🍩',face:'round',hairdo:'short',smile:'wry'},
};
const witness:Persona={skin:'#d7ab8d',hair:'#59465b',outfit:'#93819b',background:'#e9deed',outline:'#715c70',badge:'?',face:'soft',hairdo:'short',smile:'warm'};

function HairBack({name,p}: {name:string;p:Persona}):ReactNode{
 if(p.hairdo==='bald')return null; // open scalp; avoid a dark cap painted behind the forehead
 if(p.hairdo==='waves')return <>
  <path d="M26 46 Q18 25 35 18 Q62 3 82 20 Q96 40 88 62 L94 93 Q75 91 77 66 L31 64 Q39 86 21 95 Q16 82 24 66Z" fill={p.hair} stroke={p.outline} strokeWidth="2"/>
  <path d="M21 59 Q16 71 24 87 M87 53 Q96 76 87 93" fill="none" stroke="#42303c" strokeWidth="5" strokeLinecap="round"/>
 </>;
 if(p.hairdo==='bun')return <>
  <circle cx="81" cy="31" r="17" fill={p.hair} stroke={p.outline} strokeWidth="2"/>
  <path d="M27 47 Q25 15 53 16 Q85 15 84 53 L78 80 Q68 71 72 46 L34 48 L35 78 Q26 74 27 47Z" fill={p.hair} stroke={p.outline} strokeWidth="2"/>
 </>;
 if(p.hairdo==='parted')return <>
  <path d="M26 53 Q20 19 46 16 Q75 12 85 41 Q89 58 81 84 L73 86 L73 47 L34 48 L34 91 L24 85Z" fill={p.hair} stroke={p.outline} strokeWidth="1.8"/>
  {name==='Molly'&&<path d="M74 28 Q92 43 89 64 Q87 80 95 94" fill="none" stroke={p.hair} strokeWidth="10" strokeLinecap="round"/>}
 </>;
 return <path d="M27 51 Q21 27 37 18 Q56 10 74 20 Q87 27 81 54 L78 75 L71 65 L68 41 L38 43 L36 65 L30 76Z" fill={p.hair}/>;
}
function HairFront({name,p}:{name:string;p:Persona}){
 if(name==='Molly')return <>
  <path d="M29 40 Q39 22 51 20 Q60 17 70 27 Q59 30 52 39 Q44 36 36 43Z" fill={p.hair}/>
  <path d="M68 24 Q86 28 83 51 Q81 59 82 65" fill="none" stroke={p.hair} strokeWidth="9" strokeLinecap="round"/>
  <path d="M28 49 Q26 64 30 72" stroke={p.hair} strokeWidth="5" fill="none" strokeLinecap="round"/>
 </>;
 if(p.hairdo==='bald')return name==='Holt'?<>
  {/* Very short grey stubble at the temples; no dark cap across the scalp. */}
  <path d="M34 30 Q39 22 46 21 M71 22 Q77 25 80 31" fill="none" stroke="#595058" strokeWidth="1.4" strokeLinecap="round" opacity=".38"/>
  <path d="M30 43 L31 51 M82 43 L82 51" stroke="#51474f" strokeWidth="2" strokeLinecap="round" opacity=".45"/>
 </>:<path d="M33 31 Q55 26 76 31" fill="none" stroke={p.hair} strokeWidth="1.5" opacity=".35"/>;
 if(name==='Holt')return <path d="M32 37 Q36 22 55 23 Q75 21 79 36 Q69 29 56 30 Q42 29 32 37" fill={p.hair}/>;
 if(name==='Jake')return <path d="M29 42 L28 29 L39 21 L41 28 L53 17 L60 27 L75 20 Q86 28 82 43 Q69 38 63 31 Q52 43 45 34 Q37 43 29 42Z" fill={p.hair} stroke={p.outline} strokeWidth="1.6" strokeLinejoin="round"/>;
 if(name==='Amy')return <path d="M27 44 Q25 25 43 19 Q57 19 74 27 Q70 36 53 35 Q42 45 27 44Z" fill={p.hair}/>;
 if(name==='Rosa')return <>
  <path d="M28 44 Q26 26 42 22 Q54 14 73 25 Q79 36 80 43 Q64 31 59 36 Q40 32 28 44Z" fill={p.hair}/>
  <path d="M29 45 Q17 61 26 75 M80 42 Q92 63 82 79" stroke={p.hair} strokeWidth="9" strokeLinecap="round" fill="none"/>
 </>;
 if(name==='Gina')return <path d="M29 45 Q24 28 43 20 Q55 15 71 20 Q85 31 80 42 Q67 35 60 29 Q42 37 29 45Z" fill={p.hair}/>;
 if(name==='Charles')return <path d="M31 40 Q32 23 48 24 Q64 20 79 33 Q73 32 70 42 Q52 31 46 37 Q37 36 31 40Z" fill={p.hair}/>;
 return <path d="M31 42 Q28 27 44 25 Q70 18 79 40 Q60 30 51 36 Q41 33 31 42Z" fill={p.hair}/>;
}
function OutfitDetails({name}:{name:string}){
 if(name==='Molly')return <>
   <path d="M32 79 L42 89 L51 78 L60 78 L69 89 L81 79 L87 109 L23 109Z" fill="#eee5db" />
   <path d="M28 78 L43 91 L37 108 L17 108 Q20 85 28 78Z M82 78 L68 91 L74 108 L93 108 Q91 85 82 78Z" fill="#85685b"/>
   <path d="M28 82 L38 86 M25 97 L39 101 M72 88 L84 85 M73 100 L90 97" stroke="#c49b86" strokeWidth="1.5"/>
   <path d="M37 82 L45 94 L42 104 M76 81 L65 94 L68 104" stroke="#eee4da" strokeWidth="1.6" fill="none"/>
   <path d="M24 83 L43 83 M20 99 L38 99 M69 83 L86 83 M72 99 L92 99 M34 78 L34 105 M80 78 L80 106" stroke="#383a42" strokeWidth=".9" opacity=".55"/>
   <circle cx="56" cy="88" r="2.5" fill="#d8b86f"/><path d="M48 78 Q55 91 63 78" stroke="#d6ac75" strokeWidth="1.4" fill="none"/>
   <circle cx="64" cy="99" r="1.8" fill="#e3d2ba"/>
 </>;
 if(name==='Jake')return <>
  <path d="M35 78 L42 108 L22 108 L19 91 M76 78 L69 108 L92 108 L87 91" fill="#445c78" stroke="#39445b" strokeWidth="2"/>
  <path d="M40 80 L54 108 L68 80" fill="#f6eee4"/><path d="M48 80 L55 89 L62 80" fill="#8a6262"/><path d="M54 89 L55 105" stroke="#64718a" strokeWidth="3"/>
  <path d="M30 95 L40 95 M70 95 L82 95" stroke="#c1bdbe" strokeWidth="2"/>
 </>;
 if(name==='Holt')return <>
  <path d="M39 79 L54 107 L70 79 L63 78 L55 89 L46 78" fill="#f1f2f1"/>
  <path d="M54 88 L50 97 L56 107 L62 98 L58 88" fill="#283143"/>
  <path d="M26 84 L47 87 L43 106 L17 108 M83 84 L65 87 L67 106 L93 108" fill="#263a53"/>
  <path d="M25 92 L40 92 M70 92 L85 92" stroke="#bdcbd5" strokeWidth="1.3"/><path d="M30 96 L32 96 M35 96 L37 96 M74 96 L77 96" stroke="#d7ba7b" strokeWidth="2.5"/>
 </>;
 if(name==='Amy')return <>
  <path d="M34 80 L48 96 L52 108 L19 108 M78 80 L64 96 L60 108 L93 108" fill="#926b89" />
  <path d="M44 79 L56 86 L67 79 L64 110 L48 110Z" fill="#edece8"/>
  <path d="M47 82 L55 91 L63 82" stroke="#a7a4b1" fill="none" strokeWidth="1.5"/>
  <rect x="65" y="91" width="16" height="17" rx="2" fill="#f8df82" stroke="#9b8491" strokeWidth="1.5"/>
  <path d="M69 95 L78 95 M69 99 L77 99 M69 103 L76 103" stroke="#9885a1"/>
 </>;
 if(name==='Rosa')return <>
  <path d="M35 78 L51 94 L34 110 L17 110 M79 78 L61 94 L77 110 L93 110" fill="#262830" stroke="#1c222a" strokeWidth="2"/>
  <path d="M44 80 L55 99 L65 80" stroke="#9d9298" strokeWidth="3" fill="none"/>
  <path d="M30 87 L47 101 M78 87 L62 101" stroke="#d4d3d7" strokeWidth="2"/>
  <path d="M28 100 L36 100 M76 100 L84 100" stroke="#a9a7af" strokeWidth="3"/>
 </>;
 if(name==='Terry')return <>
  <path d="M16 87 L27 76 L41 79 L56 95 L70 79 L84 77 L96 87" fill="#dbe6e9" stroke="#607588" strokeWidth="2"/>
  <path d="M49 80 L56 93 L63 80" fill="#3f506b"/><path d="M53 91 L56 106 L60 90" fill="#5f627a"/>
  <path d="M21 94 L40 94 M71 94 L91 94" stroke="#aac0c9" strokeWidth="2"/>
 </>;
 if(name==='Charles')return <>
  <path d="M35 81 L56 98 L75 81" fill="none" stroke="#ede8d7" strokeWidth="10"/>
  <path d="M43 87 L55 100 L67 87" fill="none" stroke="#766959" strokeWidth="2"/>
  <circle cx="55" cy="89" r="5" fill="#b8766c"/><path d="M48 87 L55 93 L62 87" fill="#b48b75"/>
  <path d="M27 96 L41 96 M72 96 L86 96" stroke="#dad2bf" strokeWidth="2"/>
 </>;
 if(name==='Gina')return <>
  <path d="M42 78 Q54 95 69 78" stroke="#f5dce6" strokeWidth="8" fill="none"/>
  <path d="M28 87 Q55 107 83 87" stroke="#e7b8ce" strokeWidth="2" fill="none"/>
  <rect x="69" y="89" width="13" height="20" rx="3" fill="#574c75" stroke="#d9c7df" strokeWidth="1.5"/>
  <circle cx="76" cy="105" r="1.3" fill="#e4d0e9"/>
 </>;
 return <path d="M40 80 L55 96 L70 80" stroke="#f5efdd" strokeWidth="8" fill="none"/>;
}
function Cheddar({size}:{size:number}){
 return <svg className="nn-portrait" width={size} height={size} viewBox="0 0 116 116" role="img" aria-label="Original illustrated sticker of Cheddar the corgi">
  <circle cx="58" cy="55" r="52" fill="#e1efd9" stroke="#fff" strokeWidth="7"/>
  <path d="M19 54 L21 10 Q35 7 46 37 Q57 32 72 37 Q83 9 97 11 L96 57" fill="#b77e52" stroke="#805d47" strokeWidth="3"/>
  <path d="M22 60 Q25 37 58 36 Q89 37 93 61 L84 94 Q57 112 31 92Z" fill="#d79c61" stroke="#805d47" strokeWidth="2"/>
  <path d="M34 61 Q57 45 80 62 L73 96 L57 100 L41 95Z" fill="#fff3d9"/>
  <ellipse cx="40" cy="65" rx="4" ry="6" fill="#332c34"/><ellipse cx="73" cy="65" rx="4" ry="6" fill="#332c34"/>
  <ellipse cx="56" cy="79" rx="8" ry="6" fill="#44363b"/><path d="M56 85 Q44 95 40 86 M56 85 Q66 95 72 86" stroke="#6d5046" strokeWidth="2" fill="none"/>
  <path d="M31 93 Q58 112 85 93" stroke="#b55858" strokeWidth="6" fill="none"/><circle cx="58" cy="96" r="5" fill="#f5d58a"/>
 </svg>;
}
export function NineNinePortrait({name,size=70}:{name:string;size?:number}){
 if(name==='Cheddar')return <Cheddar size={size}/>;
 const p=profiles[name]??witness;
 const style={width:size,height:size,flex:'none'} as CSSProperties;
 const faceY=p.face==='long'?55:56;
 return <svg style={style} className="nn-portrait" width={size} height={size} viewBox="0 0 116 116" role="img" aria-label={name==='Molly'?'Original storybook detective portrait of Molly inspired by her reference photo':`Original illustrated ${name} detective sticker`}>
  <title>{name} — original cartoon portrait</title>
  <circle cx="58" cy="55" r="52" fill={p.background} stroke="#fff" strokeWidth="7"/>
  <circle cx="58" cy="56" r="45" fill="none" stroke="#ffffff95" strokeWidth="1.8"/>
  <HairBack name={name} p={p}/>
  <path d="M10 110 Q12 81 29 78 Q39 72 47 74 L70 74 Q82 73 90 80 Q104 92 105 110Z" fill={p.outfit} stroke={p.outline} strokeWidth="2.3"/>
  <path d="M50 73 L50 83 Q58 91 67 82 L67 73Z" fill={p.skin} stroke="#ae8172" strokeWidth="1.2"/>
  <OutfitDetails name={name}/>
  <circle cx="34" cy="58" r="5.1" fill={p.skin}/><circle cx="82" cy="58" r="5.1" fill={p.skin}/>
  <ellipse cx="58" cy={name==='Holt'?53:faceY} rx={p.face==='round'?29:p.face==='long'?23:name==='Holt'?28:26} ry={p.face==='long'?34:name==='Holt'?33:31} fill={p.skin} stroke="#a57866" strokeWidth="1.3"/>
  {name==='Rosa'&&<path d="M25 58 Q20 28 32 26 M84 31 Q94 56 86 78" fill="none" stroke={p.hair} strokeWidth="8" strokeLinecap="round"/>}
  <HairFront name={name} p={p}/>
  <path d={name==='Rosa'?'M36 47 L48 44 M67 44 L79 46':name==='Holt'?'M37 47 L48 47 M67 47 L79 47':'M38 47 Q43 44 48 46 M67 46 Q73 44 78 47'} fill="none" stroke={p.hair} strokeWidth={name==='Rosa'?2.8:2.1} strokeLinecap="round"/>
  <ellipse cx="44" cy="54" rx="3.3" ry={name==='Rosa'||name==='Holt'?3:4.2} fill="#2d2933"/>
  <ellipse cx="71" cy="54" rx="3.3" ry={name==='Rosa'||name==='Holt'?3:4.2} fill="#2d2933"/>
  <circle cx="45" cy="53.1" r=".9" fill="#fff9"/><circle cx="72" cy="53.1" r=".9" fill="#fff9"/>
  <path d="M57 55 L55 65 Q58 67 62 65" stroke="#9f7068" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  {name==='Jake'&&<path d="M37 70 Q58 86 78 68" stroke="#aa776d" strokeWidth="1.5" strokeDasharray="1.5 3" fill="none" opacity=".55"/>}
  {p.smile==='stoic'?<path d="M48 75 Q58 74 68 75" stroke="#744c52" strokeWidth="2.6" fill="none" strokeLinecap="round"/>:
   p.smile==='big'?<><path d="M43 72 Q57 91 73 71 Q61 79 43 72Z" fill="#873e4e" stroke="#a55d62" strokeWidth="1.3"/><path d="M46 73 Q57 79 70 73" stroke="#fff1eb" strokeWidth="3" fill="none"/></>:
   p.smile==='wry'?<path d="M48 76 Q60 80 71 73" stroke="#8b555b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>:
   <path d="M44 73 Q58 84 73 72" stroke="#94545d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
  {name==='Molly'&&<><circle cx="78" cy="59" r="2" fill="#f9ddb0"/><circle cx="34" cy="59" r="2" fill="#f9ddb0"/><path d="M30 68 Q38 74 31 84" stroke={p.hair} strokeWidth="4" fill="none"/></>}
  {name==='Rosa'&&<><path d="M31 60 Q29 64 31 70 M84 60 Q86 66 84 72" stroke={p.hair} strokeWidth="5" fill="none"/></>}
  {name==='Holt'&&<>
   <path d="M35 63 Q33 68 37 71 M79 63 Q82 68 78 71" stroke="#855941" strokeWidth="1.2" fill="none" opacity=".55"/>
   <path d="M37 46 Q43 44 48 46 M66 46 Q73 44 78 46" stroke="#44373c" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </>}
  <circle cx="96" cy="23" r="15" fill="#fff" stroke="#d8c4d8" strokeWidth="2.2"/>
  <text x="96" y="28.7" fontSize={p.badge.length>1?15:19} textAnchor="middle" fill="#856d91">{p.badge}</text>
 </svg>;
}
