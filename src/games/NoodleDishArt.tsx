/** Fully original layered SVG food art for all eight kitchen recipes.
 * Ingredients visually appear as they're added; no floating food emoji.
 */
import type {Dish} from '../lib/noodleShopV2';
export default function NoodleDishArt({dish}:{dish:Dish}){
 const ingredients=new Set(dish.items);
 const noodle=ingredients.has('cooked-noodles'),dumpling=ingredients.has('steamed-dumplings');
 const colors=['#ffdb94','#f4e0ac','#faf0c7'];
 return <svg viewBox="0 0 260 220" className="noodle-painted-meal" role="img"
  aria-label={(dish.vessel??'empty')+' with '+(dish.items.join(', ')||'no ingredients')}>
  <defs>
   <radialGradient id="dish-glaze"><stop stopColor="#fffbed"/><stop offset=".72" stopColor="#f6e2b6"/><stop offset="1" stopColor="#dc9e66"/></radialGradient>
   <linearGradient id="dish-broth" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a95338"/><stop offset=".6" stopColor="#d5a052"/><stop offset="1" stopColor="#9e5e38"/></linearGradient>
  </defs>
  <ellipse cx="130" cy="194" rx="102" ry="16" fill="#302a20" opacity=".17"/>
  <ellipse cx="130" cy="111" rx="107" ry="78" fill="#e9bd83" stroke="#8a4832" strokeWidth="7"/>
  <ellipse cx="130" cy="107" rx="96" ry="69" fill="url(#dish-glaze)" stroke="#bf794a" strokeWidth="5"/>
  <ellipse cx="130" cy="107" rx="84" ry="59" fill={ingredients.has('broth')?'url(#dish-broth)':'#f7efdc'} stroke="#e0b588" strokeWidth="2"/>
  {noodle&&Array.from({length:13},(_,i)=>(
   <path key={'noodle-'+i} d={'M'+(57+i*10)+' '+(80+(i%4)*7)+' Q'+(65+i*9)+' '+(123+(i%3)*15)+' '+(179-i*4)+' '+(100+(i%5)*7)}
    fill="none" stroke={colors[i%3]} strokeWidth="5" strokeLinecap="round" opacity=".97"/>
  ))}
  {dumpling&&[[-42,-15],[-2,-30],[38,-20],[-25,23],[21,24]].map(([x,y],i)=>
   <g key={'dumpling-'+i} transform={'translate('+(130+x)+' '+(112+y)+')'}>
    <ellipse cx="0" cy="0" rx="29" ry="20" fill="#edb57e" stroke="#a36748" strokeWidth="2"/>
    <path d="M-26 0 Q-19 -35 0 -26 Q19 -35 26 0 Q7 14 -26 0" fill="#fff0cb" stroke="#be8b62" strokeWidth="2"/>
    {[-12,-5,3,11].map(k=><path key={k} d={'M'+k+' -15 L'+(k*.65)+' -25'} stroke="#c9a279" strokeWidth="2"/>)}
   </g>
  )}
  {ingredients.has('greens')&&[[-45,-5],[30,12],[-8,30]].map(([x,y],i)=>
   <g key={'greens-'+i} transform={'translate('+(130+x)+' '+(107+y)+') rotate('+(i*35)+')'}>
    <path d="M0 23 Q-20 2 -14 -15 Q5 -12 0 23 M0 23 Q18 0 16 -16 Q-6 -9 0 23" fill="#558a45" stroke="#386f43" strokeWidth="3"/>
    <path d="M0 21 V-10" stroke="#b8ce6d" strokeWidth="3"/>
   </g>
  )}
  {ingredients.has('mushrooms')&&[[-44,-19],[32,9],[4,-35]].map(([x,y],i)=>
   <g key={'mushroom-'+i} transform={'translate('+(130+x)+' '+(110+y)+') rotate('+(i*34)+')'}>
    <path d="M-4 0V16Q0 20 5 16V0Z" fill="#e7d0a5" stroke="#885b41" strokeWidth="2"/>
    <path d="M-20 1Q-17 -18 1 -20 Q20 -17 22 1Z" fill="#98633e" stroke="#69422f" strokeWidth="2"/>
    <path d="M-10 -4Q0 -12 9 -5" fill="none" stroke="#ca9a6e" strokeWidth="3"/>
   </g>
  )}
  {ingredients.has('tofu')&&[[-36,18],[15,-11],[45,25]].map(([x,y],i)=>
   <g key={'tofu-'+i} transform={'translate('+(130+x)+' '+(100+y)+')'}>
    <rect x="-14" y="-13" width="28" height="26" rx="4" fill="#f9e4b3" stroke="#c99f65" strokeWidth="2"/>
    <path d="M-12 -5L0 -11L12 -6" stroke="#fff5d8" strokeWidth="3" fill="none"/>
   </g>
  )}
  {ingredients.has('chili')&&[[-34,17],[26,-24]].map(([x,y],i)=>
   <g key={'chili-'+i} transform={'translate('+(130+x)+' '+(110+y)+') rotate('+(i*53)+')'}>
    <path d="M-23 1 Q-3 -16 25 -6 Q15 12 -23 1" fill="#d34832" stroke="#992d27" strokeWidth="2"/>
    <path d="M-23 1 l-8 -5" stroke="#488d4f" strokeWidth="4" strokeLinecap="round"/>
   </g>
  )}
  {ingredients.has('scallions')&&Array.from({length:9},(_,i)=>{
   const x=75+(i*31)%110,y=78+(i*19)%58;
   return <g key={'scallion-'+i} transform={'translate('+x+' '+y+') rotate('+(i*24)+')'}>
    <path d="M-10 0L10 0 M-5 -7L8 6" stroke="#397b4b" strokeWidth="4" strokeLinecap="round"/>
    <path d="M-8 3L8 3" stroke="#94bb67" strokeWidth="2"/>
   </g>
  })}
  {ingredients.has('sesame')&&Array.from({length:23},(_,i)=>{
   const x=74+(i*37)%113,y=73+(i*23)%65;
   return <ellipse key={'sesame-'+i} cx={x} cy={y} rx="2.7" ry="4.5" fill="#ffeeb2" stroke="#b98e4d" strokeWidth=".5" transform={'rotate('+(i*38)+' '+x+' '+y+')'}/>;
  })}
  {ingredients.has('sauce')&&<g>
   <path d="M72 111Q115 78 163 120 M92 133Q128 94 184 118" fill="none" stroke="#773827" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 6"/>
  </g>}
  <path d="M44 155 Q130 231 217 154" stroke="#ac623f" strokeWidth="9" fill="none" opacity=".8"/>
  <path d="M69 179 Q129 203 191 178" stroke="#e7b77b" strokeWidth="5" fill="none"/>
  <path d="M97 27 Q80 5 97 -13 M127 21 Q113 -5 135 -23 M158 30 Q175 5 163 -9" stroke="#f7e2b2" strokeWidth="6" fill="none" strokeLinecap="round" className="noodle-food-steam" opacity={noodle||dumpling?0.7:0}/>
 </svg>;
}
