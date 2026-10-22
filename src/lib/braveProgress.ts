/** Isolated, versioned story journey progress. No Passport or coupon side effects. */
import {braveCampaignStages} from '../data/braveCampaign';

export const BRAVE_JOURNEY_KEY='mollys-brave-journey-v1';
export type BraveJourneySave={version:1;completed:string[];current:string};
export function freshBraveJourney():BraveJourneySave{
 return {version:1,completed:[],current:braveCampaignStages[0].id};
}
export function normalizeBraveJourney(raw:unknown):BraveJourneySave{
 const fresh=freshBraveJourney();
 if(!raw||typeof raw!=='object')return fresh;
 const data=raw as Partial<BraveJourneySave>;
 if(data.version!==1||!Array.isArray(data.completed))return fresh;
 const done:string[]=[];
 for(const stage of braveCampaignStages){
  if(data.completed.includes(stage.id))done.push(stage.id);
  else break;
 }
 const requested=braveCampaignStages.findIndex(s=>s.id===data.current);
 const current=braveCampaignStages[Math.min(
  requested<0?done.length:requested,done.length,braveCampaignStages.length-1
 )].id;
 return {version:1,completed:done,current};
}
export function readBraveJourney():BraveJourneySave{
 try{return normalizeBraveJourney(JSON.parse(localStorage.getItem(BRAVE_JOURNEY_KEY)??'null'))}
 catch{return freshBraveJourney()}
}
export function writeBraveJourney(save:BraveJourneySave):void{
 try{localStorage.setItem(BRAVE_JOURNEY_KEY,JSON.stringify(save))}catch{/* no storage needed to play */}
}
export function completeBraveStage(save:BraveJourneySave,id:string):BraveJourneySave{
 const stage=braveCampaignStages[save.completed.length];
 if(!stage||stage.id!==id)return save;
 return {...save,completed:[...save.completed,id]};
}
export function chooseBraveStage(save:BraveJourneySave,id:string):BraveJourneySave{
 const index=braveCampaignStages.findIndex(s=>s.id===id);
 return index<0||index>save.completed.length?save:{...save,current:id};
}
