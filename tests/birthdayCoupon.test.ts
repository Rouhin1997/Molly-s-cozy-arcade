import {describe,it,expect} from 'vitest';
import {
 BIRTHDAY_GIFT_YEAR,birthdayGiftOptions,birthdayCouponKey,isBirthdayGiftId,
 normalizeBirthdayCoupon,issueBirthdayCoupon,redeemBirthdayCoupon,type BirthdayCoupon
} from '../src/lib/birthdayCoupon';

describe('Official birthday gift Wallet rules',()=>{
 const time=new Date('2026-11-13T12:00:00Z');
 it('has exactly the three user-selected rewards',()=>{
  expect(BIRTHDAY_GIFT_YEAR).toBe(2026);
  expect(birthdayGiftOptions.map(g=>g.id)).toEqual(['snackbox','movie','makeover']);
  expect(new Set(birthdayGiftOptions.map(g=>g.id)).size).toBe(3);
  expect(birthdayGiftOptions[0].title).toMatch(/Snackbox/);
  expect(birthdayGiftOptions[1].title).toMatch(/Movie/);
  expect(birthdayGiftOptions[2].description).toMatch(/laser/i);
  expect(isBirthdayGiftId('another-gift')).toBe(false);
 });
 it('separates beta and live gifts, and separates years',()=>{
  expect(birthdayCouponKey(true,2026)).not.toBe(birthdayCouponKey(false,2026));
  expect(birthdayCouponKey(false,2026)).not.toBe(birthdayCouponKey(false,2027));
 });
 it('only issues one coupon and never replaces it, even after redemption',()=>{
  const issued=issueBirthdayCoupon(null,'snackbox',time);
  expect(issued.giftId).toBe('snackbox');
  expect(issued.issuedAt).toBe('2026-11-13T12:00:00.000Z');
  expect(issued.redeemedAt).toBeNull();
  expect(issueBirthdayCoupon(issued,'movie',time)).toEqual(issued);
  const redeemed=redeemBirthdayCoupon(issued,new Date('2026-11-14T12:00:00Z'));
  expect(redeemed.redeemedAt).toBe('2026-11-14T12:00:00.000Z');
  expect(redeemBirthdayCoupon(redeemed,new Date('2026-11-15T12:00:00Z'))).toEqual(redeemed);
  expect(issueBirthdayCoupon(redeemed,'makeover',time)).toEqual(redeemed);
 });
 it('refuses a redemption timestamp before the gift was awarded',()=>{
  const issued=issueBirthdayCoupon(null,'movie',time);
  expect(redeemBirthdayCoupon(issued,new Date('2026-11-12T12:00:00Z'))).toEqual(issued);
 });
 it('accepts only valid saved coupon records for that event year',()=>{
  const issued=issueBirthdayCoupon(null,'makeover',time);
  expect(normalizeBirthdayCoupon(issued)).toEqual(issued);
  expect(normalizeBirthdayCoupon({...issued,giftId:'mystery'})).toBeNull();
  expect(normalizeBirthdayCoupon({...issued,version:0})).toBeNull();
  expect(normalizeBirthdayCoupon({...issued,eventYear:2027})).toBeNull();
  expect(normalizeBirthdayCoupon({...issued,issuedAt:'not-a-date'})).toBeNull();
  expect(normalizeBirthdayCoupon({...issued,redeemedAt:'2026-11-11T10:00:00Z'})).toBeNull();
  expect(normalizeBirthdayCoupon({...issued,redeemedAt:42} as unknown as BirthdayCoupon)).toBeNull();
 });
});
