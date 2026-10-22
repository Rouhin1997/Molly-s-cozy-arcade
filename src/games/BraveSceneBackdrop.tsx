/** Three entirely different painted SVG stage environments.
 * Keeping all compositions original, with distinct weather, light and props. */
export default function BraveSceneBackdrop({chapter,scene}:{chapter:string;scene:number}){
 const isHighland=chapter==='highland',isForest=chapter==='forest',isWitch=chapter==='witch';
 return <svg className={'brave-scene-backdrop brave-scene-'+chapter}
  viewBox="0 0 1100 375" preserveAspectRatio="xMidYMid slice"
  role="img" aria-label={isHighland?'Painted golden Highland courtyard with banners and Angus':
    isForest?'Misty woodland of standing stones and luminous blue wisps':
    'Candlelit Witch’s cottage crowded with carved bears, potions and golden thread'}>
  <defs>
   <linearGradient id="highland-dawn" x1="0" y1="0" x2=".3" y2="1"><stop stopColor={scene===2?'#90acb0':'#80adad'}/><stop offset=".6" stopColor="#edd19e"/><stop offset="1" stopColor="#e5c48a"/></linearGradient>
   <linearGradient id="forest-night" x1="0" y1="0" x2=".3" y2="1"><stop stopColor={scene===2?'#1c3d4b':'#345563'}/><stop offset=".6" stopColor="#34615f"/><stop offset="1" stopColor="#49765f"/></linearGradient>
   <linearGradient id="witch-amber" x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#3c4043"/><stop offset=".65" stopColor="#655247"/><stop offset="1" stopColor="#b48b5a"/></linearGradient>
   <radialGradient id="witch-fire"><stop stopColor="#f7dc9c" stopOpacity=".8"/><stop offset=".43" stopColor="#e3ad6c" stopOpacity=".4"/><stop offset="1" stopColor="#c48257" stopOpacity="0"/></radialGradient>
   <radialGradient id="storybook-wisp"><stop stopColor="#ffffff"/><stop offset=".16" stopColor="#b4ffff"/><stop offset=".49" stopColor="#7bf7ef" stopOpacity=".65"/><stop offset="1" stopColor="#74d6c6" stopOpacity="0"/></radialGradient>
   <filter id="storybook-mist"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  {isHighland&&<>
   <rect width="1100" height="375" fill="url(#highland-dawn)"/>
   <circle cx={scene===0?920:810} cy="89" r="55" fill="#fff0cb" opacity=".72"/>
   <path d="M0 217L89 115L165 210L276 89L366 206L484 100L584 211L690 92L788 203L891 114L1100 220V375H0Z" fill="#8da298"/>
   <path d="M0 245Q129 190 276 231T559 210T817 236T1100 216V375H0Z" fill="#648b75"/>
   <path d="M0 292Q192 220 390 280T775 261T1100 270V375H0Z" fill="#426e58"/>
   <g transform="translate(130 99)" fill="#888f82" stroke="#425c53" strokeWidth="4">
    <path d="M0 160V62H30V28H51V65H102V10H132V72H178V160Z"/>
    <path d="M-9 160H187" strokeWidth="10"/>
    <path d="M77 160V108Q95 86 115 108V160" fill="#3e6157"/>
    <rect x="17" y="95" width="14" height="26" rx="7" fill="#f7d89e"/>
    <rect x="141" y="101" width="14" height="26" rx="7" fill="#f7d89e"/>
    <path d="M103 9L116 -15 131 9 M30 28l10 -15 11 15" fill="#5d7369"/>
   </g>
   <path d="M152 159V72M312 147V55" stroke="#725c50" strokeWidth="4"/>
   <path d="M155 76l57 17 -57 16 M315 58l52 17 -52 15" fill="#ad6250" stroke="#ebc6a6" strokeWidth="2"/>
   <path d="M0 365Q220 330 465 367T1100 360" stroke="#d1bf8d" strokeWidth="25" fill="none" opacity=".6"/>
   {Array.from({length:26},(_,i)=><g key={i} transform={'translate('+(i*97+21)%1110+' '+(251+(i*19)%95)+')'}>
     <path d="M0 -20L-15 12H15Z" fill={i%2?'#2f684e':'#477d59'}/>
     <path d="M0 -10L-10 10H10Z" fill="#59916a"/>
    </g>)}
   <g transform="translate(832 260)" fill="#4e5145">
    <path d="M-51 21Q-67 -29 -23 -38L24 -36Q49 -15 31 21L21 44H11L16 18H-19L-22 44H-32L-34 14Z"/>
    <path d="M26 -35Q37 -72 52 -52L61 -22L41 -17Z"/>
    <path d="M-45 -24Q-84 -22 -77 17" fill="none" stroke="#4e5145" strokeWidth="5"/>
   </g>
   <path d="M540 300q102 -65 181 -9" stroke="#e8d0a5" strokeWidth="10" strokeDasharray="8 12" fill="none"/>
  </>}
  {isForest&&<>
   <rect width="1100" height="375" fill="url(#forest-night)"/>
   <circle cx={scene===2?795:905} cy="73" r="41" fill="#b9d8ce" opacity=".43"/>
   <path d="M0 259Q150 181 319 219T704 198T1100 205V375H0Z" fill="#335e58"/>
   <path d="M0 291Q185 216 350 272T743 251T1100 270V375H0Z" fill="#244f4e"/>
   {Array.from({length:39},(_,i)=>{const x=(i*139+37)%1150,y=130+(i*47)%149,h=67+(i*17)%108;
    return <g key={i} transform={'translate('+x+' '+y+')'} opacity={i%3===0?.6:.9}>
     <path d={'M0 '+h*.52+'V-'+h*.8} stroke="#263f3d" strokeWidth="7"/>
     <path d={'M0 -'+h+'L-'+h*.35+' '+h*.3+'H'+h*.34+'Z'} fill={i%2?'#1e5049':'#2b6256'}/>
     <path d={'M0 -'+h*.63+'L-'+h*.45+' '+h*.4+'H'+h*.43+'Z'} fill="#204b48"/>
    </g>})}
   <ellipse cx="509" cy="255" rx="342" ry="36" fill="#a6c5b1" opacity=".18" filter="url(#storybook-mist)"/>
   <g transform="translate(467 219)" stroke="#45645c" strokeWidth="5" fill="#8baca0">
    <path d="M-92 72l4 -89 30 -18 12 107Z"/>
    <path d="M-29 73l-6 -113 35 -20 20 133Z"/>
    <path d="M40 73l14 -101 34 -9 7 110Z"/>
    <path d="M-103 75q105 20 204 -2" fill="none" stroke="#bdcfb1" strokeDasharray="3 8"/>
   </g>
   <path d="M10 351Q262 297 487 350T1100 342" stroke="#88a08d" strokeWidth="12" fill="none" opacity=".42"/>
   {Array.from({length:15},(_,i)=><circle key={i} cx={(i*173+83)%1100} cy={(i*71+56)%360} r={2+(i%3)} fill="#c9f3ce" opacity={.21+(i%4)*.12}/>)}
  </>}
  {isWitch&&<>
   <rect width="1100" height="375" fill="url(#witch-amber)"/>
   <path d="M0 0L1100 0L1070 345L50 345Z" fill="#564a41" stroke="#ac8a60" strokeWidth="20"/>
   {Array.from({length:7},(_,i)=><path key={i} d={'M'+(i*170-50)+' 0V375'} stroke="#332f2d" strokeWidth="11" opacity=".56"/>)}
   <path d="M0 313H1100V375H0Z" fill="#80654c"/>
   <path d="M0 329H1100" stroke="#b29570" strokeWidth="8"/>
   <ellipse cx="755" cy="196" rx="252" ry="165" fill="url(#witch-fire)"/>
   <path d="M80 64H474V292H80Z" fill="#3d3d37" stroke="#a4815d" strokeWidth="15"/>
   <path d="M70 135H484M70 213H484" stroke="#ad8961" strokeWidth="15"/>
   {Array.from({length:14},(_,i)=>{
    const x=112+(i%7)*51,y=103+Math.floor(i/7)*82;
    return <g key={i} transform={'translate('+x+' '+y+')'}>
     <rect x="-13" y="-31" width="28" height="34" rx="6" fill={['#729486','#9e7365','#9c8c70'][i%3]} stroke="#d0b896" strokeWidth="2"/>
     <path d="M-10 -32V-44H10V-32" stroke="#aa8f6c" strokeWidth="4"/>
     <path d="M-8 -7l8 -7 8 7" fill="none" stroke="#ead2ae" strokeWidth="2"/>
    </g>;
   })}
   <g transform="translate(645 219)" fill="#967c62" stroke="#443d37" strokeWidth="4">
    <path d="M-42 40l-13 -32 15 -30 20 2 15 -22 17 22 17 -4 16 32 -9 30Z"/>
    <circle cx="-20" cy="-7" r="7" fill="#bda18a"/><circle cx="19" cy="-7" r="7" fill="#bda18a"/>
    <path d="M-11 14q12 12 23 0" fill="none"/>
    <circle cx="-20" cy="-8" r="3" fill="#383b35" stroke="none"/>
    <circle cx="19" cy="-8" r="3" fill="#383b35" stroke="none"/>
   </g>
   <g transform="translate(853 263)">
    <ellipse rx="92" ry="23" fill="#2b3432"/>
    <path d="M-77 -6q6 84 78 81Q75 75 78 -6Z" fill="#6b786d" stroke="#b2a78a" strokeWidth="6"/>
    <path d="M-82 -7q84 22 163 0" stroke="#c5b28a" strokeWidth="12" fill="none"/>
    <path d="M-65 -22q57 -44 131 0" stroke="#d4e8ab" strokeWidth="7" fill="none" opacity=".7"/>
    <path d="M-37 -52q-26 -21 0 -42M17 -51q29 -24 7 -54" stroke="#e7e6bf" strokeWidth="8" opacity=".28" fill="none" filter="url(#storybook-mist)"/>
   </g>
   <path d="M494 350q84 -98 170 -27t115 -57" stroke="#eac48c" strokeWidth="5" strokeDasharray="6 10" fill="none"/>
   {Array.from({length:5},(_,i)=><g key={i} transform={'translate('+(540+i*109)+' '+(100+(i%2)*37)+')'}>
    <rect x="-5" y="-18" width="10" height="33" rx="3" fill="#e9d3ad"/>
    <path d="M0 -37q-17 20 0 27q17 -7 0 -27" fill="#ffd692" opacity=".85"/>
    <circle cy="-22" r="24" fill="url(#witch-fire)"/>
   </g>)}
  </>}
  {Array.from({length:isWitch?3:5},(_,i)=>{
   const cx=203+((i*197+scene*59)%730),cy=80+((i*41)%180);
   return <g className="brave-backdrop-wisp" key={i} style={{animationDelay:i*.7+'s'}}>
    <circle cx={cx} cy={cy} r={isWitch?22:36} fill="url(#storybook-wisp)"/>
    <circle cx={cx} cy={cy} r="3.5" fill="#ecffff"/>
   </g>;
  })}
  <path d="M13 15H1087V361H13Z" fill="none" stroke={isForest?'#b4d7c6':'#d7b98c'} strokeWidth="3" opacity=".65"/>
 </svg>;
}
