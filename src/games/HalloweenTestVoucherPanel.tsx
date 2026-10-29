import {useEffect,useState} from 'react';
import {halloweenWindow} from '../lib/seasonalEvents';
import {halloweenVoucherState,readHalloweenVoucher,redeemHalloweenVoucher,
 writeHalloweenVoucher,type HalloweenTestVoucher} from '../lib/halloweenVoucher';

/** Visible in the 99 Files event and the shared coupon wallet.
 * This is a genuine UI/e2e rehearsal, not a claim for a real-world gift.
 */
export default function HalloweenTestVoucherPanel(){
 const [voucher,setVoucher]=useState<HalloweenTestVoucher|null>(readHalloweenVoucher);
 const [now,setNow]=useState(()=>new Date());
 const [message,setMessage]=useState('');
 useEffect(()=>{
  const refresh=()=>{setNow(new Date());setVoucher(readHalloweenVoucher())};
  const timer=window.setInterval(refresh,15_000);
  window.addEventListener('focus',refresh);
  document.addEventListener('visibilitychange',refresh);
  return ()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh);
   document.removeEventListener('visibilitychange',refresh)};
 },[]);
 const state=halloweenVoucherState(voucher,now);
 function redeem(){
  const current=readHalloweenVoucher();
  if(halloweenVoucherState(current,new Date())!=='available'){
   setVoucher(current);setMessage('This test voucher is no longer available.');return;
  }
  if(!window.confirm('Redeem this HALLOWEEN TEST VOUCHER? This is only a simulation; no real gift, food or service is provided.'))return;
  const next=redeemHalloweenVoucher(current,new Date());
  if(!next){setVoucher(readHalloweenVoucher());setMessage('The event has closed. No redemption was recorded.');return}
  writeHalloweenVoucher(next);setVoucher(next);setNow(new Date());
  setMessage('Test redemption recorded! This is a dummy voucher—not a real-world gift.');
 }
 const ends=voucher?halloweenWindow(now,voucher.eventYear).end:null;
 return <section className={'halloween-beta-voucher halloween-beta-'+state} aria-label="Halloween Heist dummy voucher">
   <div className="halloween-beta-icon" aria-hidden="true">🎃🎟️</div>
   <div className="halloween-beta-copy">
     <span className="overline">SPECIAL EVENTS BETA · SIMULATION ONLY</span>
     <h3>Halloween Heist — Dummy Voucher</h3>
     {state==='not-earned'?<p>Complete all three Halloween Heist stages on 31 October to receive a practice voucher. No real gift is associated with this test.</p>:
      state==='available'?<p>Congratulations, detective! Your dummy ticket is ready. Test its one-time redemption before midnight, Europe/Rome time. It does not provide a real reward.</p>:
      state==='redeemed'?<p>✓ Test redemption recorded. The coupon system worked, and no real gift was issued.</p>:
      <p>🔒 The Halloween event has ended. This unused test voucher is expired and cannot be redeemed.</p>}
     {voucher&&<div className="halloween-beta-meta">
       <span>Issued {new Date(voucher.awardedAt).toLocaleString('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} (Rome)</span>
       <span>Expires {ends?.toLocaleString('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} (Rome)</span>
       <span>{state==='redeemed'&&voucher.redeemedAt? 'Redeemed '+new Date(voucher.redeemedAt).toLocaleString('en-GB',{timeZone:'Europe/Rome',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'One test use'}</span>
     </div>}
     {state==='available'&&<button type="button" className="btn btn-primary" onClick={redeem}>🎟️ Simulate redeeming the voucher</button>}
     {message&&<p role="status">{message}</p>}
     <small>Not valid for purchases, real gifts or services. This is a time-limited birthday/Christmas event-system rehearsal.</small>
   </div>
 </section>;
}
