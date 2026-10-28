/** Original ink-and-paper martial-arts fantasy artwork (no borrowed frames).
 * Sharp timber silhouettes, layered mountain washes, hanging lanterns, and
 * a circular dragon seal make the noodle shop visually separate from Brave.
 */
export function TempleNoodleBackdrop(){
 return <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid slice"
  className="noodle-temple-art" aria-label="Hand-painted Valley of Peace temple noodle shop at sunset"
  role="img">
  <defs>
   <linearGradient id="ink-sunset" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f6d18a"/><stop offset=".62" stopColor="#f0ac65"/><stop offset="1" stopColor="#ba6650"/></linearGradient>
   <linearGradient id="temple-roof" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#762e24"/><stop offset="1" stopColor="#421f25"/></linearGradient>
   <radialGradient id="sunhalo"><stop stopColor="#fff3c4"/><stop offset="1" stopColor="#ffe1a0" stopOpacity="0"/></radialGradient>
   <pattern id="scroll-dots" width="43" height="43" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1" fill="#f8d7a1" opacity=".3"/></pattern>
  </defs>
  <rect width="1200" height="360" fill="url(#ink-sunset)"/>
  <circle cx="840" cy="85" r="160" fill="url(#sunhalo)"/><circle cx="840" cy="84" r="67" fill="#fff1be" opacity=".86"/>
  <path d="M0 215L85 120 155 180 275 80 396 207 478 104 578 201 702 65 855 208 940 127 1015 213 1129 96 1200 186V360H0Z" fill="#a76e60" opacity=".58"/>
  <path d="M0 262L98 190 180 255 312 149 409 260 533 152 658 249 807 163 939 261 1047 163 1200 255V360H0Z" fill="#4e6159" opacity=".8"/>
  <path d="M0 283Q180 244 374 285Q545 233 716 281Q950 236 1200 286V360H0" fill="#244a43" opacity=".94"/>
  {Array.from({length:10},(_,i)=>{const x=25+i*132,y=120+i%3*24;return <g key={i} opacity=".56"><path d={'M'+x+' '+y+'v210'} stroke="#264b3b" strokeWidth="9"/><path d={'M'+(x-8)+' '+(y+75)+'q-38 -25 -46 -47 M'+(x+6)+' '+(y+100)+'q37 -29 43 -58 M'+(x-7)+' '+(y+149)+'q-34 -26 -45 -42'} fill="none" stroke="#214a37" strokeWidth="7" strokeLinecap="round"/></g>})}
  <rect x="260" y="187" width="686" height="174" rx="6" fill="#623b30" stroke="#3d312a" strokeWidth="9"/>
  <rect x="300" y="215" width="600" height="145" fill="#b98b60" stroke="#512f25" strokeWidth="10"/>
  <path d="M241 184Q600 84 973 184L1017 198Q611 160 204 202Z" fill="url(#temple-roof)" stroke="#3b2928" strokeWidth="12"/>
  <path d="M260 184Q607 106 956 184" fill="none" stroke="#e8bb70" strokeWidth="6"/>
  <path d="M197 200Q224 186 241 161 M965 160q24 34 60 38" fill="none" stroke="#481e23" strokeWidth="14" strokeLinecap="round"/>
  <path d="M270 237H936M270 304H936" stroke="#d2aa71" strokeWidth="6"/>
  <path d="M360 222V354 M470 222V354 M757 222V354 M865 222V354" stroke="#754935" strokeWidth="12"/>
  <rect x="484" y="208" width="267" height="140" fill="#b27749" stroke="#64392c" strokeWidth="10"/>
  <path d="M501 241H730M501 271H730" stroke="#e2b57d" strokeWidth="7"/>
  <path d="M490 91H720L700 147H508Z" fill="#ead49b" stroke="#714538" strokeWidth="8"/>
  <text x="604" y="119" textAnchor="middle" fontSize="25" fill="#6b372e" fontFamily="Georgia,serif" fontWeight="bold">MR PING</text>
  <text x="604" y="139" textAnchor="middle" fontSize="15" fill="#9b5738" fontFamily="Georgia,serif" fontWeight="bold" letterSpacing="4">NOODLE HOUSE</text>
  {[314,894].map(x=><g key={x}>
   <path d={'M'+x+' 176v16'} stroke="#dcb473" strokeWidth="3"/>
   <path d={'M'+(x-20)+' 190h40l-6 58h-28Z'} fill="#bc493a" stroke="#612e29" strokeWidth="4"/>
   <path d={'M'+(x-17)+' 206h34M'+(x-16)+' 233h32'} stroke="#efc486" strokeWidth="4"/>
   <ellipse cx={x} cy="216" rx="8" ry="14" fill="#ffe19b" opacity=".8"/>
  </g>)}
  <circle cx="1101" cy="88" r="55" fill="#862e2c" stroke="#f5c077" strokeWidth="6" opacity=".92"/>
  <circle cx="1101" cy="88" r="42" fill="none" stroke="#f1bb69" strokeWidth="2" strokeDasharray="3 7"/>
  <path d="M1075 89q32 -41 53 2q-12 38 -39 19q-15 -13 0 -30q19 -10 21 9" fill="none" stroke="#f7c979" strokeWidth="9" strokeLinecap="round"/>
  <path d="M1100 115q-5 8 -15 8m30 -17q8 10 17 8" stroke="#f7c979" strokeWidth="5" strokeLinecap="round"/>
  <rect width="1200" height="360" fill="url(#scroll-dots)"/>
  <path d="M0 349 Q600 323 1200 350" stroke="#e2ba7f" strokeWidth="12" opacity=".4" fill="none"/>
 </svg>;
}
export function KitchenPotArt({type,active}:{type:'pot'|'steamer';active:boolean}){
 return <svg className={'noodle-machine-art '+(active?'is-on':'')} viewBox="0 0 190 140" role="img"
  aria-label={type==='pot'?'Illustrated boiling iron pot':'Illustrated tiered bamboo steamer'}>
  {type==='pot'?<>
   <ellipse cx="96" cy="123" rx="71" ry="13" fill="#292b25" opacity=".25"/>
   <path d="M38 53L27 88 Q39 117 96 117 Q158 118 163 88L151 53Z" fill="#314443" stroke="#182c2d" strokeWidth="5"/>
   <ellipse cx="94" cy="54" rx="58" ry="18" fill="#b68b55" stroke="#2c3231" strokeWidth="6"/>
   <ellipse cx="94" cy="52" rx="48" ry="11" fill="#e7bd7b" stroke="#af7545" strokeWidth="3"/>
   <path d="M35 77L19 75Q12 86 27 91M160 77l12 -3q14 12 -4 18" fill="none" stroke="#3c4440" strokeWidth="9"/>
   <path d="M62 100q32 9 61 -1" fill="none" stroke="#9da29b" strokeWidth="4" opacity=".35"/>
   {active&&<g className="noodle-steam-lines"><path d="M66 36q-15 -14 0 -27 M95 36q-16 -17 0 -31 M125 35q-14 -16 1 -29" stroke="#ffedbb" strokeWidth="5" fill="none" strokeLinecap="round"/></g>}
  </>:<>
   <ellipse cx="97" cy="128" rx="70" ry="11" fill="#292b25" opacity=".23"/>
   <rect x="34" y="64" width="124" height="49" rx="11" fill="#d6a35a" stroke="#825a36" strokeWidth="5"/>
   <path d="M34 76h124M34 101h124" stroke="#a57340" strokeWidth="5"/>
   {Array.from({length:8},(_,i)=><path key={i} d={'M'+(47+i*13)+' 70v37'} stroke="#eec780" strokeWidth="3" opacity=".77"/>)}
   <ellipse cx="96" cy="63" rx="62" ry="17" fill="#e6b96b" stroke="#885d37" strokeWidth="5"/>
   <path d="M51 57q42 -27 90 0" fill="none" stroke="#fff0bd" strokeWidth="4" opacity=".7"/>
   <path d="M87 44v-7q10 -8 20 0v7" fill="none" stroke="#8c603a" strokeWidth="5"/>
   {active&&<g className="noodle-steam-lines"><path d="M69 34q-13 -13 0 -26M97 27q-13 -14 0 -25M120 34q-11 -16 1 -28" stroke="#fff3c2" strokeWidth="5" fill="none" strokeLinecap="round"/></g>}
  </>}
 </svg>;
}
