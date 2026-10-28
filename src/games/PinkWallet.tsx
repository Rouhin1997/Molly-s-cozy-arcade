import NoodleCouponPanel from './NoodleCouponPanel';
import {useState,type Dispatch,type SetStateAction} from 'react';
import {choosePinkCoupon,couponGifts,pinkMysteryCards,pinkNextPractice,pinkReplaceCoupon,redeemPinkCoupon,type PinkProgress} from '../lib/pinkRush';

type Props={progress:PinkProgress;setProgress:Dispatch<SetStateAction<PinkProgress>>;onHome:()=>void;onPlay:()=>void;onPassport:()=>void};
export default function PinkWallet({progress,setProgress,onHome,onPlay,onPassport}:Props){
 const [message,setMessage]=useState('');
 const coupon=progress.coupon??{status:'locked' as const};
 const cards=pinkMysteryCards(progress);
 function choose(card:number){
  if(coupon.status!=='ready')return;
  setProgress(p=>choosePinkCoupon(p,card));
  setMessage('Surprise! Your chosen gift is now saved in Molly’s wallet.');
 }
 function redeem(){
  if(coupon.status!=='active'||!coupon.chosen)return;
  if(!window.confirm('Redeem this gift now? Once redeemed it becomes a permanent Passport keepsake and Pink Rush cannot award another coupon.'))return;
  setProgress(p=>redeemPinkCoupon(p));
  setMessage('Redeemed! This memory now lives in your Passport forever. 💗');
 }
 function replace(){
  if(coupon.status==='active'){
   if(!window.confirm('Give up this unredeemed coupon to earn a NEW mystery draw? You must finish another full Pink Rush concert first.'))return;
   setProgress(p=>pinkNextPractice(pinkReplaceCoupon(p)));
  }else if(coupon.status==='redeemed'){
   setProgress(p=>pinkNextPractice(p));
  }else if(coupon.status==='ready'){
   // Keep unchosen coupon. Starting another show never creates a second voucher.
   setProgress(p=>pinkNextPractice(p));
  }else setProgress(p=>pinkNextPractice(p));
  setMessage('');onPlay();
 }
 const selected=coupon.chosen?couponGifts[coupon.chosen]:null;
 return <main className="game-page pink-wallet-page">
  <button className="back-link" onClick={onHome}>← Return to the arcade</button>
  <div className="pink-wallet-heading"><span className="overline">MOLLY’S BLACKPINK VIP REWARDS</span>
   <h1>🎟️ Molly’s Special Coupon Wallet</h1>
   <p>A little collection of promises made for Molly—concert surprises and now a homemade Dragon Chef treat.</p>
  </div>
  {coupon.status==='ready'&&<section className="pink-wallet-draw">
   <h2>Choose one secret backstage gift</h2>
   <p>All three gifts are different. Pick ONE card to reveal your reward—and peek behind the others afterward!</p>
   <div className="pink-blind-cards">
    {cards.map((_,i)=><button key={i} className="pink-blind-card" onClick={()=>choose(i)} aria-label={'Reveal secret reward card '+(i+1)}>
      <span className="pink-blind-star">✦</span><small>BACKSTAGE PASS</small><strong>?</strong><span>CHOICE {i+1}</span>
    </button>)}
   </div>
  </section>}
  {(coupon.status==='active'||coupon.status==='redeemed')&&selected&&<section className={'pink-wallet-owned '+(coupon.status==='redeemed'?'is-redeemed':'')}>
   <div className="pink-wallet-ribbon">{coupon.status==='redeemed'?'REDEEMED • FOREVER IN THE PASSPORT':'YOUR ONE-OF-A-KIND VIP COUPON'}</div>
   <div className="pink-wallet-ticket">
    <span className="pink-ticket-icon">{selected.icon}</span><span>💌 FROM ROUHIN, FOR MOLLY</span>
    <h2>{selected.title}</h2><p>{selected.description}</p>
    <small>{coupon.status==='redeemed'?'♡ A memory worth keeping forever':'♡ Whenever you like • One real-life redemption'}</small>
   </div>
   {coupon.status==='active'?<div className="pink-wallet-actions">
     <button className="btn btn-primary" onClick={redeem}>♡ Redeem this coupon</button>
     <button className="btn btn-outline" onClick={replace}>↻ Play again for a NEW mystery coupon</button>
   </div>:<div className="pink-wallet-actions">
     <button className="btn btn-primary" onClick={onPassport}>View permanent Passport keepsake ↗</button>
     <button className="btn btn-outline" onClick={replace}>Play Pink Rush for fun ↗</button>
   </div>}
   <div className="pink-reveal-other"><h3>The other backstage gifts were…</h3>
    <div>{cards.map((gift,i)=><div key={i} className={coupon.selectedCard===i?'is-chosen':''}>
      <span>{couponGifts[gift].icon}</span><strong>{couponGifts[gift].title}</strong>
      <small>{coupon.selectedCard===i?'YOUR CHOICE':'THE ONE THAT GOT AWAY'}</small>
    </div>)}</div>
   </div>
  </section>}
  {(coupon.status==='locked'||coupon.status==='seeking')&&<section className="pink-wallet-empty">
   <span>🎟️</span><h2>{coupon.status==='seeking'?'Your next mystery is waiting.':'No backstage coupons yet!'}</h2>
   <p>{coupon.status==='seeking'?'Finish a NEW full Pink Rush concert to earn another blind choice. Your previous coupon has been surrendered.':
     'Finish your first full Pink Rush show to unlock three hidden reward cards and choose one to keep.'}</p>
   <button className="btn btn-primary" onClick={replace}>🎤 Play Pink Rush! ↗</button>
  </section>}
  <NoodleCouponPanel/>
  {message&&<p className="pink-wallet-status" role="status">{message}</p>}
  <p className="pink-wallet-fine">One active Pink Rush coupon at a time. Before redemption, you may surrender it and complete another concert for a fresh choice. After redemption, the gift is permanently marked redeemed in this browser’s Passport and cannot be earned again. Save a Passport backup; fully tamper-proof and cross-device enforcement would require a private account/server.</p>
 </main>;
}
