/** Act II — three new painterly chapter scenes. Entirely original vector
 * artwork, designed for warm castle moonlight, ominous ruined moor, and
 * triumphant dawn around the living loom. */
export default function BraveFinaleBackdrop({chapter,scene}:{chapter:'castle'|'shadow'|'bond';scene:number}){
 const castle=chapter==='castle',shadow=chapter==='shadow',dawn=chapter==='bond';
 return <svg className={'brave-scene-backdrop brave-scene-'+chapter}
   viewBox="0 0 1100 375" role="img" preserveAspectRatio="xMidYMid slice"
   aria-label={castle?'Moonlit castle gallery with a distant guard, tapestry and candlelight':
   shadow?'Storm-swept ancient standing stones beneath the shadow of a legendary bear':
   'Sunrise in a Highland clearing with an ancient living loom and magical embroidery'}>
  <defs>
   <linearGradient id="finale-castle-wall" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#263e55"/><stop offset=".75" stopColor="#46556e"/><stop offset="1" stopColor="#7d7382"/></linearGradient>
   <linearGradient id="finale-moor" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#182b3c"/><stop offset=".62" stopColor="#3e515c"/><stop offset="1" stopColor="#5a675e"/></linearGradient>
   <linearGradient id="finale-dawn" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#699c99"/><stop offset=".57" stopColor="#ebd6a3"/><stop offset="1" stopColor="#dba96a"/></linearGradient>
   <radialGradient id="finale-magic"><stop stopColor="#ffffff"/><stop offset=".2" stopColor="#c0fff5"/><stop offset=".65" stopColor="#71e0d2" stopOpacity=".35"/><stop offset="1" stopColor="#67e5d3" stopOpacity="0"/></radialGradient>
   <radialGradient id="finale-sun"><stop stopColor="#fff6c8"/><stop offset="1" stopColor="#fff6c8" stopOpacity="0"/></radialGradient>
  </defs>
  {castle&&<>
   <rect width="1100" height="375" fill="url(#finale-castle-wall)"/>
   <path d="M0 0Q115 185 0 375M1100 0Q960 184 1100 375" fill="#192f42" opacity=".3"/>
   {Array.from({length:9},(_,i)=><g key={i}>
    <path d={'M'+i*136+' 0V375'} stroke="#8290a0" strokeWidth="9" opacity=".27"/>
    <path d={'M'+i*136+' 0v120h136'} stroke="#b8ad9d" strokeWidth="3" opacity=".13" fill="none"/>
   </g>)}
   <path d="M0 280Q450 245 1100 283V375H0Z" fill="#253b4a"/>
   {Array.from({length:15},(_,i)=><path key={i} d={'M'+i*80+' 279L'+(i*93+45)+' 375'} stroke="#6e7278" strokeWidth="2" opacity=".4"/>)}
   <g transform="translate(166 58)">
    <path d="M-67 216V47Q-62 -7 0 -13Q63 -7 68 47V216Z" fill="#182f40" stroke="#85909e" strokeWidth="15"/>
    <path d="M-49 216V55Q-42 16 0 16Q44 16 48 55V216Z" fill="#7c9aad"/>
    <circle cx="-3" cy="87" r="35" fill="#ebf2dc" opacity=".5"/>
    <path d="M-48 129L49 129M0 20V216" stroke="#657483" strokeWidth="8"/>
   </g>
   <g transform="translate(639 64)">
    <path d="M-87 0H99V204H-87Z" fill="#baa08c" stroke="#56495a" strokeWidth="13"/>
    <path d="M-65 17H77V180H-65Z" fill="#50697a" stroke="#d4c29c" strokeWidth="4"/>
    <path d="M-38 152Q-17 72 3 115T49 54" fill="none" stroke="#e5ca7b" strokeWidth="12"/>
    <path d="M-28 169Q24 119 61 152" fill="none" stroke="#9da985" strokeWidth="10"/>
    <circle cx="4" cy="90" r="11" fill="#e5dac0"/>
   </g>
   {Array.from({length:5},(_,i)=><g key={i} transform={'translate('+(330+i*160)+' '+(105+(i%2)*25)+')'}>
    <path d="M0 0V143" stroke="#886d62" strokeWidth="8"/>
    <path d="M-19 16Q0 -24 19 16Z" fill="#d3a56d"/>
    <path d="M0 4Q-15 22 0 39Q15 22 0 4" fill="#ffde99"/>
    <circle cy="25" r="30" fill="url(#finale-sun)" opacity=".2"/>
   </g>)}
   <g transform="translate(900 230)" fill="#1a2834">
    <circle cx="0" cy="-25" r="15"/><path d="M-18 57L-12 -9Q0 -15 15 -10L26 57Z"/>
    <path d="M-10 17L-36 38M10 17L33 37" stroke="#1a2834" strokeWidth="9"/>
   </g>
   {scene===1&&<g transform="translate(420 283)" fontSize="25"><text x="0" y="0">✦</text><text x="35" y="-13">✦</text><text x="60" y="-2">✦</text></g>}
  </>}
  {shadow&&<>
   <rect width="1100" height="375" fill="url(#finale-moor)"/>
   <path d="M0 158L107 59L211 161L324 70L434 166L529 96L673 152L799 76L906 173L1009 103L1100 161V375H0Z" fill="#62717c" opacity=".48"/>
   <path d="M0 238Q218 171 430 211T1100 204V375H0Z" fill="#2c484d"/>
   <path d="M0 287Q180 229 371 282T738 261T1100 273V375H0Z" fill="#233f42"/>
   <path d="M35 58Q234 87 388 52T692 60T1054 53" fill="none" stroke="#d1dee3" strokeWidth="13" opacity=".12"/>
   <path d="M507 20L471 85 503 83 456 150" fill="none" stroke="#dbeaec" strokeWidth="4" opacity={scene===2?.8:.4}/>
   {Array.from({length:9},(_,i)=><g key={i} transform={'translate('+(135+i*103)+' '+(232+(i%3)*23)+')'} opacity=".8">
    <path d={'M-20 80L-12 -'+(43+i%3*15)+'L15 -'+(40+i%3*14)+'L28 80Z'} fill={i%2?'#607978':'#7e8782'} stroke="#344949" strokeWidth="5"/>
    <path d="M-10 3l20 20" stroke="#a3ada0" strokeWidth="3"/>
   </g>)}
   <path d="M-30 349Q240 289 515 343T1100 324" stroke="#aeb5a2" strokeWidth="11" fill="none" opacity=".23"/>
   <g transform="translate(786 199)" opacity={scene===2?.35:.14} fill="#111f2b">
    <path d="M-110 90Q-156 20 -94 -26L-47 -37L-12 -86L20 -51L55 -72L92 -38Q136 12 115 90Z"/>
    <path d="M-60 37Q-8 80 67 34" fill="none" stroke="#111f2b" strokeWidth="21"/>
   </g>
   {Array.from({length:10},(_,i)=><circle key={i} cx={(83+i*119)%1100} cy={(97+i*23)%260} r="30" fill="url(#finale-magic)" opacity=".5"/>)}
  </>}
  {dawn&&<>
   <rect width="1100" height="375" fill="url(#finale-dawn)"/>
   <circle cx="818" cy="74" r="120" fill="url(#finale-sun)"/>
   <path d="M0 209L109 117L219 218L340 100L468 212L569 128L694 206L816 118L950 198L1054 137L1100 174V375H0Z" fill="#91a894" opacity=".63"/>
   <path d="M0 246Q195 193 377 241T811 229T1100 231V375H0Z" fill="#658f7b"/>
   <path d="M0 294Q168 230 333 292T743 270T1100 287V375H0Z" fill="#3c755b"/>
   <g transform="translate(480 244)" strokeLinecap="round">
    <path d="M4 110Q-10 -2 -40 -92M4 110Q22 -7 86 -87M4 110Q70 -19 123 -20M4 110Q-69 -29 -122 -24" stroke="#5d6850" strokeWidth="33" fill="none"/>
    <path d="M-42 -55Q-124 -190 -47 -191Q48 -205 0 -101M-2 -79Q27 -204 98 -169Q168 -133 69 -81" fill="#59816b" stroke="#54775f" strokeWidth="5"/>
    <path d="M4 110Q-41 79 -86 116M4 110Q53 88 96 109" stroke="#706e50" strokeWidth="18" fill="none"/>
   </g>
   <g transform="translate(503 176)">
    <path d="M-71 134V-13L0 -47L75 -11V134" fill="none" stroke="#d1c59a" strokeWidth="10"/>
    <rect x="-52" y="-10" width="105" height="118" fill="#a9b39b" stroke="#dbcaa0" strokeWidth="5"/>
    <path d="M-43 5Q10 37 47 23T-14 72T40 104" fill="none" stroke="#fff1b9" strokeWidth="5"/>
    <path d="M-40 16l78 78M44 13l-77 91" fill="none" stroke="#e0ba78" strokeWidth="2" strokeDasharray="4 7"/>
   </g>
   {Array.from({length:25},(_,i)=>{const x=(i*79+100)%1100,y=(i*43+48)%300;
    return <g key={i}><circle cx={x} cy={y} r="22" fill="url(#finale-magic)" opacity=".7"/>
     <circle cx={x} cy={y} r="2" fill="#f1ffed"/></g>})}
   {scene===2&&<path d="M0 360Q220 305 480 365T1100 351" fill="none" stroke="#f9e5a7" strokeWidth="12" opacity=".5"/>}
  </>}
  <rect x="12" y="14" width="1076" height="345" rx="10" fill="none" stroke={castle?'#b4b1c8':shadow?'#8aabb0':'#f1d8a9'} strokeWidth="3" opacity=".53"/>
 </svg>;
}
