import {useState} from 'react';
import {awardNoodleCoupon,couponRemaining,readNoodleCoupon,redeemNoodleCoupon,
 threeMonthsLater,writeNoodleCoupon,type NoodleDishChoice,type NoodleCoupon} from '../lib/noodleCoupon';

/** Independent wallet keepsake. The voucher is awarded only in the Level 8 win
 * handler, not by simply opening the wallet or replaying a tutorial.
 */
export default function NoodleCouponPanel(){
 const [coupon,setCoupon]=useState<NoodleCoupon|null>(readNoodleCoupon);
 const [message,setMessage]=useState('');
 const remaining=couponRemaining(coupon);
 function redeem(dish:NoodleDishChoice){
  if(!coupon||remaining<=0)return;
  const title=dish==='ramen'?'Homemade Ramen':'Homemade Soup Dumplings';
  if(!window.confirm('Redeem one of your '+remaining+' remaining kitchen promises for '+title+'? Rouhin will cook it for Molly. This cannot be undone.'))return;
  const updated=redeemNoodleCoupon(coupon,dish);
  if(!updated){setMessage('This coupon has expired or has been fully used.');return}
  writeNoodleCoupon(updated);setCoupon(updated);
  setMessage('A promise redeemed! '+title+' is now recorded as one of your special homemade meals. ♡');
 }
 return <section className={'noodle-voucher '+(coupon?'is-earned':'is-locked')} aria-labelledby="noodle-voucher-title">
  <div className="noodle-voucher-art" aria-hidden="true"><span>🐼</span><span>🥟</span><span>🍜</span></div>
  <div className="noodle-voucher-body">
   <span className="noodle-voucher-kicker">MR. PING'S SPECIAL KITCHEN PASS · FOR MOLLY</span>
   <h2 id="noodle-voucher-title">{coupon?'A home-cooked promise from Rouhin':'The Dragon Chef’s Secret Reward'}</h2>
   <p>{coupon?'Congratulations, Chef Molly! Choose a homemade meal, lovingly prepared by Rouhin, for each of your two redemptions.':
    'Complete Level 8, The Dragon Chef, to unlock two homemade meal treats: Soup Dumplings or Ramen, cooked by Rouhin.'}</p>
   {coupon?<div className="noodle-voucher-details">
    <div><strong>{remaining} / 2</strong><small>redemptions remaining</small></div>
    <div><strong>{threeMonthsLater(coupon.awardedAt).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}</strong><small>use by (three months after unlock)</small></div>
   </div>:<span className="noodle-voucher-locked">🔒 Win the final shift to unlock</span>}
   {coupon&&remaining>0&&<div className="noodle-voucher-actions">
    <button type="button" onClick={()=>redeem('soup-dumplings')}>🥟 Redeem Soup Dumplings</button>
    <button type="button" onClick={()=>redeem('ramen')}>🍜 Redeem Ramen</button>
   </div>}
   {coupon&&remaining===0&&<strong className="noodle-voucher-finished">{coupon.claims.length>=2?'Both delicious promises have been redeemed. ♡':'The three-month redemption window has ended.'}</strong>}
   {coupon&&coupon.claims.length>0&&<div className="noodle-voucher-history">
    <strong>Our little kitchen memories</strong>
    {coupon.claims.map((claim,i)=><span key={i}>✓ {claim.dish==='ramen'?'Homemade Ramen':'Homemade Soup Dumplings'} · {new Date(claim.at).toLocaleDateString()}</span>)}
   </div>}
   {message&&<p className="noodle-voucher-message" role="status">{message}</p>}
   <small>Two uses total within three calendar months from first unlock. Redeeming records the promise in this browser; it does not automatically arrange a cooking date. Keep your Passport backup to preserve the memory.</small>
  </div>
 </section>;
}
