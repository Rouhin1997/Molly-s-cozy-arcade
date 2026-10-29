import {describe,it,expect} from 'vitest';
import {romeDateKey,romeMidnightUtc,halloweenWindow,isHalloweenLive,
 nextAnnualRomeDate,christmasWeekStart,ARCADE_TIME_ZONE} from '../src/lib/seasonalEvents';
import {awardHalloweenVoucher,redeemHalloweenVoucher,halloweenVoucherState,
 normalizeHalloweenVoucher} from '../src/lib/halloweenVoucher';
import {upcomingArcadeEvents} from '../src/data/arcadeHub';

describe('Halloween one-day beta — Italy time, including daylight savings',()=>{
 it('opens on 31 Oct 2026 at exactly 00:00 Europe/Rome and shuts at 1 Nov 00:00',()=>{
  const start=new Date('2026-10-30T23:00:00.000Z');
  const end=new Date('2026-10-31T23:00:00.000Z');
  const w=halloweenWindow(new Date('2026-10-29T12:00:00Z'));
  expect(ARCADE_TIME_ZONE).toBe('Europe/Rome');
  expect(w.start.toISOString()).toBe(start.toISOString());
  expect(w.end.toISOString()).toBe(end.toISOString());
  expect(isHalloweenLive(new Date(start.getTime()-1))).toBe(false);
  expect(isHalloweenLive(start)).toBe(true);
  expect(isHalloweenLive(new Date(end.getTime()-1))).toBe(true);
  expect(isHalloweenLive(end)).toBe(false);
  expect(romeDateKey(start)).toBe('2026-10-31');
  expect(romeDateKey(end)).toBe('2026-11-01');
 });
 it('resolves Halloween midnight correctly even in a year when clocks change ON Halloween',()=>{
  expect(romeMidnightUtc(2027,10,31).toISOString()).toBe('2027-10-30T22:00:00.000Z');
  expect(romeMidnightUtc(2027,11,1).toISOString()).toBe('2027-10-31T23:00:00.000Z');
  expect(halloweenWindow(new Date('2027-10-31T00:30:00Z')).active).toBe(true);
  expect(halloweenWindow(new Date('2027-10-31T23:00:00Z')).active).toBe(false);
 });
 it('rolls annual dates over after each local event day, and lists Christmas as planned',()=>{
  const october=upcomingArcadeEvents(new Date('2026-10-29T10:00:00Z'));
  expect(october.map(x=>x.id)).toEqual(['halloween','birthday','christmas']);
  expect(october[0].status).toBe('scheduled');
  expect(october[2].status).toBe('planned');
  expect(romeDateKey(october[2].date)).toBe('2026-12-24');
  expect(christmasWeekStart(new Date('2026-10-29T10:00:00Z')).toISOString()).toBe('2026-12-23T23:00:00.000Z');
  const live=upcomingArcadeEvents(new Date('2026-10-31T14:00:00Z'));
  expect(live[0].status).toBe('live');
  expect(live[0].summary).toMatch(/midnight/);
  const nov=upcomingArcadeEvents(new Date('2026-10-31T23:00:00Z'));
  expect(nov.map(x=>x.id)).toEqual(['birthday','christmas','halloween']);
  expect(romeDateKey(nextAnnualRomeDate(10,31,new Date('2026-11-01T12:00:00Z')))).toBe('2027-10-31');
  const late=upcomingArcadeEvents(new Date('2026-12-31T12:00:00Z'));
  expect(late.map(x=>x.id)).toEqual(['halloween','birthday','christmas']);
  expect(late.every(x=>romeDateKey(x.date).startsWith('2027-'))).toBe(true);
 });
});
describe('Dummy Halloween voucher — one simulated redemption only',()=>{
 const live=new Date('2026-10-31T12:00:00.000Z');
 it('cannot be awarded before or after Halloween; final win award retains date',()=>{
  expect(awardHalloweenVoucher(null,new Date('2026-10-30T22:59:59Z'))).toBeNull();
  expect(awardHalloweenVoucher(null,new Date('2026-10-31T23:00:00Z'))).toBeNull();
  const awarded=awardHalloweenVoucher(null,live)!;
  expect(awarded.version).toBe(1);
  expect(awarded.eventYear).toBe(2026);
  expect(halloweenVoucherState(awarded,live)).toBe('available');
  expect(awardHalloweenVoucher(awarded,new Date('2026-10-31T14:00:00Z'))).toBe(awarded);
  expect(awardHalloweenVoucher(awarded,new Date('2027-10-31T11:00:00Z'))?.eventYear).toBe(2027);
 });
 it('enables one test redemption before close, no second use or real value',()=>{
  const voucher=awardHalloweenVoucher(null,live)!;
  expect(redeemHalloweenVoucher(voucher,new Date('2026-10-31T11:59:59Z'))).toBeNull();
  const redeemAt=new Date('2026-10-31T12:30:00Z');
  const redeemed=redeemHalloweenVoucher(voucher,redeemAt)!;
  expect(redeemed.redeemedAt).toBe(redeemAt.toISOString());
  expect(halloweenVoucherState(redeemed,new Date('2026-11-02T10:00:00Z'))).toBe('redeemed');
  expect(redeemHalloweenVoucher(redeemed,redeemAt)).toBeNull();
  expect(redeemHalloweenVoucher(voucher,new Date('2026-10-31T23:00:00Z'))).toBeNull();
  expect(halloweenVoucherState(voucher,new Date('2026-10-31T23:00:00Z'))).toBe('expired');
 });
 it('rejects impossible redemption history and preserves valid expired record',()=>{
  const original=awardHalloweenVoucher(null,live)!;
  expect(normalizeHalloweenVoucher(original)).toEqual(original);
  expect(normalizeHalloweenVoucher({...original,awardedAt:'2026-11-01T05:00:00Z'})).toBeNull();
  expect(normalizeHalloweenVoucher({...original,redeemedAt:'2026-11-01T00:00:00Z'})).toBeNull();
  expect(normalizeHalloweenVoucher({...original,redeemedAt:'2026-10-31T10:00:00Z'})).toBeNull();
  expect(halloweenVoucherState(null,live)).toBe('not-earned');
 });
});
