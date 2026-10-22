/** Visual archery simulator. Flight paths use one documented deterministic
 * ballistic model, not a hidden answer lookup or random-hit rule. */
export const BRAVE_AIM_ANGLES=[-6,-3,0,3,6] as const;
export const BRAVE_ELEVATIONS=[12,20,28] as const;
export const BRAVE_DRAW_SPEEDS=[32,40,48] as const;
export type BraveBallisticTarget={
 name:string;distance:number;height:number;crosswind:number;
 description:string;range:'near'|'far';wind:number;
};
export type BraveShotSettings={aim:number;elevation:number;speed:number};
export type BraveImpact={
 horizontal:number;vertical:number;flightTime:number;
 hit:boolean;quality:'bullseye'|'hit'|'miss';
};
export function braveShot(target:BraveBallisticTarget,shot:BraveShotSettings):BraveImpact{
 const elev=shot.elevation*Math.PI/180,azimuth=shot.aim*Math.PI/180;
 if(!BRAVE_AIM_ANGLES.includes(shot.aim as typeof BRAVE_AIM_ANGLES[number])
 ||!BRAVE_ELEVATIONS.includes(shot.elevation as typeof BRAVE_ELEVATIONS[number])
 ||!BRAVE_DRAW_SPEEDS.includes(shot.speed as typeof BRAVE_DRAW_SPEEDS[number])){
  throw new Error('Invalid shot parameters');
 }
 const t=target.distance/(shot.speed*Math.cos(elev));
 const y=target.distance*Math.tan(elev)-(9.81*target.distance**2)/(2*shot.speed**2*Math.cos(elev)**2);
 const lateral=target.distance*Math.tan(azimuth)+target.crosswind*t*.45;
 const vertical=y-target.height;
 const error=Math.hypot(lateral,vertical);
 const hit=Math.abs(lateral)<=1.7&&Math.abs(vertical)<=1.7;
 return {
  horizontal:lateral,vertical,flightTime:t,hit,
  quality:hit?(error<.65?'bullseye':'hit'):'miss'
 };
}
/** Plot the vertical flight in a side-view scene; wind compensation is shown
 * separately on the target-face inset for clarity. */
export function braveShotArc(target:BraveBallisticTarget,shot:BraveShotSettings):string{
 const rad=shot.elevation*Math.PI/180;
 const pts:string[]=[];
 for(let i=0;i<=40;i++){
  const fraction=i/40;
  const dist=target.distance*fraction;
  const height=dist*Math.tan(rad)-(9.81*dist*dist)/(2*shot.speed**2*Math.cos(rad)**2);
  const x=103+dist/target.distance*585;
  const y=269-height*5;
  pts.push(x.toFixed(1)+','+y.toFixed(1));
 }
 return pts.join(' ');
}
