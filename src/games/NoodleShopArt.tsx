import type {Guest} from '../lib/noodleShop';

/** Original vector fan-art: deliberately stylised shapes, no film frames/assets. */
export function KitchenCharacter({who,size=112}:{who:'ping'|Guest;size?:number}){
 const common={viewBox:'0 0 150 168',width:size,height:size*1.12,role:'img' as const,
  'aria-label':who==='ping'?'Mr. Ping, the noodle-shop owner':who==='po'?'Po, panda apprentice':who==='tigress'?'Tigress, precise customer':who==='monkey'?'Monkey, cheerful customer':'A hungry rabbit customer'};
 if(who==='ping')return <svg {...common}>
  <ellipse cx="78" cy="156" rx="56" ry="8" fill="#302a1b" opacity=".17"/>
  <path d="M50 95 Q20 122 40 157 Q71 168 113 155 Q130 125 105 96Z" fill="#fff9e2" stroke="#735b49" strokeWidth="3"/>
  <path d="M58 110 Q77 115 101 109 L109 155 Q73 166 47 154Z" fill="#b94936" stroke="#7a392c" strokeWidth="3"/>
  <path d="M57 117 L99 120 M72 121 L80 153 M90 120 L80 153" stroke="#e7b97a" strokeWidth="3"/>
  <path d="M50 111 Q25 101 21 124 M108 110 Q127 105 132 121" fill="none" stroke="#fff9e2" strokeWidth="15" strokeLinecap="round"/>
  <path d="M63 104 Q63 74 54 60 Q45 48 48 31 Q80 7 105 41 Q112 60 96 81 L94 105Z" fill="#fffdf1" stroke="#715949" strokeWidth="3"/>
  <path d="M51 29 Q38 18 49 11 Q61 4 69 13 Q74 -3 87 8 Q98 1 101 18 Q114 13 113 28 L110 42 Q79 34 51 41Z" fill="#fffefa" stroke="#9e9185" strokeWidth="3"/>
  <path d="M60 52 Q74 43 94 53" fill="none" stroke="#c9bab2" strokeWidth="3"/>
  <ellipse cx="66" cy="63" rx="5" ry="7" fill="#2a2e26"/><ellipse cx="92" cy="64" rx="5" ry="7" fill="#2a2e26"/>
  <path d="M53 61 Q68 52 77 61 M84 62 Q99 52 105 60" fill="none" stroke="#755f51" strokeWidth="2"/>
  <path d="M69 81 Q88 74 116 84 Q122 94 103 99 Q86 103 64 90Z" fill="#e5b25d" stroke="#8c6337" strokeWidth="2.5"/>
  <path d="M79 86 Q90 92 102 87" fill="none" stroke="#986e43" strokeWidth="2"/>
  <circle cx="37" cy="121" r="6" fill="#fffdf1"/><circle cx="127" cy="119" r="6" fill="#fffdf1"/>
  <text x="79" y="139" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffe6bc">PING</text>
 </svg>;
 if(who==='po')return <svg {...common}>
  <ellipse cx="75" cy="158" rx="56" ry="8" fill="#162b22" opacity=".17"/>
  <ellipse cx="47" cy="34" rx="18" ry="22" fill="#2e302e" transform="rotate(-30 47 34)"/>
  <ellipse cx="108" cy="34" rx="18" ry="22" fill="#2e302e" transform="rotate(30 108 34)"/>
  <ellipse cx="77" cy="112" rx="51" ry="51" fill="#2c3434" stroke="#252929" strokeWidth="3"/>
  <ellipse cx="77" cy="119" rx="35" ry="36" fill="#fff9de"/>
  <path d="M54 105 L99 105 L102 158 Q77 168 52 157Z" fill="#d7a05d" stroke="#8c5c35" strokeWidth="3"/>
  <path d="M59 105 L59 89 M96 105 L96 89" stroke="#e7c795" strokeWidth="8"/>
  <path d="M26 111 Q10 125 26 139 M124 111 Q140 125 126 139" fill="none" stroke="#2c3434" strokeWidth="17" strokeLinecap="round"/>
  <ellipse cx="78" cy="62" rx="55" ry="53" fill="#fff7e2" stroke="#2c3434" strokeWidth="3"/>
  <ellipse cx="55" cy="67" rx="17" ry="23" fill="#323536" transform="rotate(-22 55 67)"/>
  <ellipse cx="100" cy="67" rx="17" ry="23" fill="#323536" transform="rotate(22 100 67)"/>
  <ellipse cx="58" cy="65" rx="6" ry="9" fill="#fffdf4"/><ellipse cx="98" cy="65" rx="6" ry="9" fill="#fffdf4"/>
  <circle cx="59" cy="67" r="3.2" fill="#282c2b"/><circle cx="97" cy="67" r="3.2" fill="#282c2b"/>
  <ellipse cx="78" cy="88" rx="12" ry="8" fill="#2a3031"/>
  <path d="M63 98 Q78 113 93 98" fill="none" stroke="#46302d" strokeWidth="4" strokeLinecap="round"/>
  <path d="M51 26 Q79 14 107 26" stroke="#ba683d" strokeWidth="8" strokeLinecap="round"/>
  <circle cx="126" cy="135" r="7" fill="#2c3434"/>
  <text x="77" y="135" textAnchor="middle" fill="#744b2b" fontSize="11" fontWeight="bold">NOODLES!</text>
 </svg>;
 if(who==='rabbit')return <svg {...common}>
  <ellipse cx="76" cy="158" rx="45" ry="7" fill="#342e23" opacity=".16"/>
  <ellipse cx="51" cy="40" rx="14" ry="39" fill="#f6e8ce" stroke="#b6a18c" strokeWidth="3" transform="rotate(-15 51 40)"/>
  <ellipse cx="98" cy="40" rx="14" ry="39" fill="#f6e8ce" stroke="#b6a18c" strokeWidth="3" transform="rotate(14 98 40)"/>
  <ellipse cx="53" cy="36" rx="6" ry="27" fill="#e9b8b4" transform="rotate(-15 53 36)"/><ellipse cx="98" cy="36" rx="6" ry="27" fill="#e9b8b4" transform="rotate(14 98 36)"/>
  <ellipse cx="75" cy="133" rx="42" ry="34" fill="#85a994" stroke="#4b7663" strokeWidth="3"/>
  <ellipse cx="76" cy="93" rx="43" ry="43" fill="#f4e7d0" stroke="#b5a18b" strokeWidth="3"/>
  <circle cx="59" cy="89" r="5" fill="#403b35"/><circle cx="93" cy="89" r="5" fill="#403b35"/>
  <ellipse cx="75" cy="104" rx="7" ry="5" fill="#d29092"/>
  <path d="M75 110 l-5 6 m5 -6 l5 6" stroke="#a87e7b" strokeWidth="2" fill="none"/>
  <circle cx="44" cy="119" r="7" fill="#f4e7d0"/><circle cx="108" cy="119" r="7" fill="#f4e7d0"/>
  <path d="M62 123 Q76 140 92 123" fill="none" stroke="#eacfa6" strokeWidth="5"/>
 </svg>;
 if(who==='monkey')return <svg {...common}>
  <ellipse cx="74" cy="158" rx="47" ry="7" fill="#30231d" opacity=".16"/>
  <path d="M114 135 Q148 101 126 87 Q109 83 116 99" fill="none" stroke="#855a3d" strokeWidth="11" strokeLinecap="round"/>
  <ellipse cx="74" cy="127" rx="45" ry="35" fill="#a36b42" stroke="#6d4633" strokeWidth="3"/>
  <ellipse cx="38" cy="77" rx="19" ry="22" fill="#9e6946" stroke="#704631" strokeWidth="3"/>
  <ellipse cx="113" cy="77" rx="19" ry="22" fill="#9e6946" stroke="#704631" strokeWidth="3"/>
  <ellipse cx="74" cy="81" rx="47" ry="45" fill="#9e6946" stroke="#704631" strokeWidth="3"/>
  <path d="M45 84 Q37 45 74 51 Q107 44 105 84 Q118 106 90 118 Q75 125 57 115 Q34 105 45 84" fill="#e9c39a"/>
  <ellipse cx="58" cy="78" rx="6" ry="9" fill="#302b29"/><ellipse cx="93" cy="78" rx="6" ry="9" fill="#302b29"/>
  <ellipse cx="76" cy="98" rx="9" ry="6" fill="#9a6b4e"/>
  <path d="M63 107 Q77 118 92 106" stroke="#72472f" strokeWidth="3" fill="none"/>
  <path d="M49 56 Q75 35 99 55" fill="none" stroke="#7b4c35" strokeWidth="9" strokeLinecap="round"/>
  <path d="M54 115 Q76 134 96 115" stroke="#e8c18b" strokeWidth="8" fill="none"/>
 </svg>;
 return <svg {...common}>
  <ellipse cx="78" cy="157" rx="50" ry="7" fill="#34221a" opacity=".17"/>
  <ellipse cx="78" cy="126" rx="43" ry="37" fill="#d27e44" stroke="#814b2d" strokeWidth="3"/>
  <path d="M53 103 L99 103 L99 155 Q79 164 55 156Z" fill="#9d4c35"/>
  <path d="M35 55 L42 21 L69 42 M119 55 L110 21 L89 42" fill="#d27e44" stroke="#814b2d" strokeWidth="3"/>
  <ellipse cx="77" cy="80" rx="47" ry="45" fill="#d2894e" stroke="#814b2d" strokeWidth="3"/>
  <path d="M44 64 l20 -9 m27 0 l19 9 M53 47 l-8 -9 M78 42 l0 -15 M104 47 l10 -9" stroke="#824429" strokeWidth="7" strokeLinecap="round"/>
  <ellipse cx="62" cy="85" rx="13" ry="17" fill="#f6e4be"/><ellipse cx="97" cy="85" rx="13" ry="17" fill="#f6e4be"/>
  <ellipse cx="62" cy="83" rx="4" ry="7" fill="#242b28"/><ellipse cx="97" cy="83" rx="4" ry="7" fill="#242b28"/>
  <path d="M77 93 l-7 8 h14Z" fill="#a4593a"/><path d="M69 109 Q79 113 90 109" fill="none" stroke="#8b4b30" strokeWidth="2.5"/>
  <path d="M44 101 l-10 8 M110 101 l11 8" stroke="#845039" strokeWidth="3"/>
 </svg>;
}

export function NoodleShopScenery(){
 return <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" className="noodle-scenery" role="img" aria-label="Original illustration of a warm noodle shop nestled among misty bamboo hills in the Valley of Peace">
  <defs>
   <linearGradient id="noodle-sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a0d9bf"/><stop offset="1" stopColor="#f7dfaa"/></linearGradient>
   <linearGradient id="noodle-wood" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#995c37"/><stop offset="1" stopColor="#573e31"/></linearGradient>
  </defs>
  <rect width="1200" height="320" fill="url(#noodle-sky)"/>
  <path d="M0 211 Q85 105 175 175 Q263 85 342 176 Q438 56 530 174 Q645 100 708 183 Q797 49 896 175 Q1047 92 1200 177 L1200 320H0Z" fill="#76ab90" opacity=".64"/>
  <path d="M0 237 Q130 155 225 232 Q315 151 456 231 Q570 137 686 227 Q804 142 907 226 Q1065 146 1200 218 V320H0Z" fill="#557d68" opacity=".7"/>
  {Array.from({length:19},(_,i)=>{const x=(i*79+21)%1200,h=45+(i*17)%86;return <g key={i} opacity=".62"><path d={'M'+x+' 270v-'+h} stroke="#386c55" strokeWidth="5"/><path d={'M'+(x-16)+' '+(255-h/2)+'q22 -19 33 0 M'+(x-14)+' '+(265-h/3)+'q20 -20 31 0'} stroke="#386c55" strokeWidth="5" fill="none"/></g>})}
  <rect x="186" y="148" width="840" height="180" rx="11" fill="url(#noodle-wood)" stroke="#523c30" strokeWidth="8"/>
  <path d="M135 147 Q600 52 1070 146 L1110 167 Q602 124 98 171Z" fill="#435e49" stroke="#283e37" strokeWidth="9"/>
  <path d="M175 145 Q602 47 1032 145" fill="none" stroke="#d6a45e" strokeWidth="9"/>
  <path d="M220 175H990 M220 268H990" stroke="#d4a16c" strokeWidth="6" opacity=".7"/>
  <rect x="315" y="165" width="570" height="164" rx="10" fill="#eac798" stroke="#9d653d" strokeWidth="10"/>
  <path d="M335 187H861 M337 253H860" stroke="#bd8a5c" strokeWidth="7"/>
  <rect x="454" y="91" width="300" height="69" rx="11" fill="#f4d8a5" stroke="#6e503d" strokeWidth="7"/>
  <text x="604" y="121" fill="#714b36" textAnchor="middle" fontFamily="Georgia,serif" fontSize="26" fontWeight="bold">MR. PING’S</text>
  <text x="604" y="145" fill="#985d3c" textAnchor="middle" fontFamily="Georgia,serif" fontSize="19" fontWeight="bold">NOODLE SHOP</text>
  {[231,969].map(x=><g key={x}><path d={'M'+x+' 124v38'} stroke="#684733" strokeWidth="4"/><rect x={x-22} y="160" width="44" height="60" rx="14" fill="#e99d5b" stroke="#9a512f" strokeWidth="4"/><path d={'M'+(x-19)+' 177h38M'+(x-19)+' 205h38'} stroke="#f5d2a4" strokeWidth="4"/><circle cx={x} cy="191" r="9" fill="#f7dea8"/></g>)}
  <path d="M0 296Q600 279 1200 297V320H0" fill="#cbb080"/>
  <path d="M36 31Q70 11 115 34 M1020 39q41 -26 90 -4" stroke="#fff4da" strokeWidth="7" opacity=".65" fill="none" strokeLinecap="round"/>
 </svg>;
}
