import '../birthday.css';
import {useEffect,useState} from 'react';
import {birthdayBetaFromSearch} from '../lib/birthdayQuest';
import {
 birthdayGiftOptions,readBirthdayCoupon,redeemBirthdayCoupon,writeBirthdayCoupon,
 type BirthdayCoupon
} from '../lib/birthdayCoupon';

/** The birthday voucher lives beside Pink Rush and Dragon Chef rewards.
 * Local browser persistence, with a separate creator rehearsal wallet. */
export default function BirthdayCouponPanel(){
 const beta=birthdayBetaFromSearch(window.location.search);
 const [live,setLive]=useState<BirthdayCoupon|null>(()=>readBirthdayCoupon(false));
 const [preview,setPreview]=useState<BirthdayCoupon|null>(()=>beta?readBirthdayCoupon(true):null);
 const [error,setError]=useState('');
 useEffect(()=>{
  const refresh=()=>{setLive(readBirthdayCoupon(false));if(beta)setPreview(readBirthdayCoupon(true));};
  window.addEventListener('focus',refresh);
  window.addEventListener('storage',refresh);
  return()=>{window.removeEventListener('focus',refresh);window.removeEventListener('storage',refresh)};
 },[beta]);
 function markRedeemed(){
  const current=readBirthdayCoupon(false);
  if(!current||current.redeemedAt)return;
  if(!window.confirm('Mark your birthday coupon as redeemed? Do this only after receiving your gift. This cannot be undone in the arcade.'))return;
  const next=redeemBirthdayCoupon(current);
  if(!writeBirthdayCoupon(next,false)){setError('Unable to save the redemption in this browser.');return}
  setLive(next);setError('');
 }
 const entries=[...(live?[{coupon:live,beta:false}]:[]),...(beta&&preview?[{coupon:preview,beta:true}]:[])];
 if(!entries.length)return null;
 return <section className="birthday-wallet" aria-label="Molly's birthday gift coupon">
  <header className="birthday-wallet-head"><span aria-hidden="true">🎀</span><div>
   <small>13 NOVEMBER · BIRTHDAY REWARDS</small>
   <h2>A birthday promise, just for Molly</h2>
  </div></header>
  {entries.map(({coupon,beta:isPreview})=>{
   const gift=birthdayGiftOptions.find(g=>g.id===coupon.giftId);
   if(!gift)return null;
   return <article key={isPreview?'preview':'live'} className="birthday-wallet-ticket">
    <div className="birthday-wallet-stamp">{isPreview?'CREATOR PREVIEW · NOT REDEEMABLE':coupon.redeemedAt?'REDEEMED · KEPT FOREVER':'READY WHEN YOU ARE'}</div>
    <span className="birthday-wallet-icon" aria-hidden="true">{gift.icon}</span>
    <small>🎟️ ONE VERY SPECIAL BIRTHDAY COUPON</small>
    <h3>{gift.title}</h3><p>{gift.description}</p>
    <div className="birthday-wallet-bottom">
     <span>{isPreview?'Practice coupon':coupon.redeemedAt?'Gift received ♡':'From Rouhin, for Molly ♡'}</span>
     {!isPreview&&!coupon.redeemedAt&&<button type="button" className="btn btn-primary" onClick={markRedeemed}>Mark as received ✓</button>}
    </div>
   </article>;
  })}
  {error&&<p className="birthday-wallet-error" role="alert">{error}</p>}
 </section>;
}
