import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { passportSummary } from '../lib/passport';
import type { Progress } from '../lib/game';
import type { ConnectionProgress } from '../lib/connections';
import type { ToonProgress } from '../lib/toon';
import type { BazingaProgress } from '../lib/bazinga';
import { normalizeNineProgress, type NineProgress } from '../lib/nineNine';
import {couponGifts,reconcilePinkImport,type PinkProgress} from '../lib/pinkRush';

type Props = {
  guess: Progress;
  connections: ConnectionProgress;
  toon: ToonProgress;
  bazinga: BazingaProgress;
  nine: NineProgress;
  pink: PinkProgress;
  setGuess: Dispatch<SetStateAction<Progress>>;
  setConnections: Dispatch<SetStateAction<ConnectionProgress>>;
  setToon: Dispatch<SetStateAction<ToonProgress>>;
  setBazinga: Dispatch<SetStateAction<BazingaProgress>>;
  setNine: Dispatch<SetStateAction<NineProgress>>;
  setPink: Dispatch<SetStateAction<PinkProgress>>;
  onHome: () => void;
  onWallet: () => void;
};

export default function Passport({ guess, connections, toon, bazinga, nine, pink, setGuess, setConnections, setToon, setBazinga, setNine, setPink, onHome, onWallet }: Props) {
  const passport = passportSummary({ guess, connections, toon, bazinga, nine, pink });
  const inputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState('');

  function exportBackup() {
    const backup = {
      format: 'mollys-cozy-arcade',
      version: 4,
      exportedAt: new Date().toISOString(),
      guess, connections, toon, bazinga, nine, pink,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `mollys-arcade-passport-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setFeedback('Backup downloaded! Keep the file somewhere safe.');
  }

  async function importBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    try {
      if (file.size > 1_000_000) throw new Error('The backup file is unexpectedly large.');
      const parsed: unknown = JSON.parse(await file.text());
      if (!parsed || typeof parsed !== 'object') throw new Error('Invalid backup.');
      const data = parsed as Record<string, unknown>;
      if (data.format !== 'mollys-cozy-arcade' || (data.version !== 1 && data.version !== 2 && data.version !== 3 && data.version !== 4)) throw new Error('This is not a compatible Molly’s Arcade backup.');
      const g = data.guess as Progress, c = data.connections as ConnectionProgress, t = data.toon as ToonProgress;
      const b = data.bazinga as BazingaProgress | undefined;
      const n = data.nine as NineProgress | undefined;
      const pr = data.pink as PinkProgress | undefined;
      if (g?.version !== 1 || c?.version !== 1 || t?.version !== 1 ||
        typeof g?.stats?.points !== 'number' || typeof c?.stats?.stars !== 'number' ||
        typeof t?.stats?.stars !== 'number' || !g.daily || !c.daily || !t.daily ||
        (data.version !== 1 && (b?.version !== 1 || typeof b.stats?.stars !== 'number' || !b.daily)) ||
        ((data.version === 3 || data.version === 4) && (n?.version !== 1 || typeof n.stats?.stars !== 'number' || !n.daily || !n.heist)) ||
        (data.version === 4 && (pr?.version !== 1 || typeof pr.stats?.stars !== 'number' || !pr.daily))) throw new Error('Some saved game data is missing.');
      if (!window.confirm('Replace this browser’s current arcade progress with the imported backup? This cannot be undone.')) {
        setFeedback('Import cancelled. Your current progress was kept.');
        return;
      }
      setGuess(g);
      setConnections(c);
      setToon(t);
      if (b) setBazinga(b);
      if (n) setNine(normalizeNineProgress(n));
      if (pr) setPink(previous=>reconcilePinkImport(pr,previous));
      setFeedback(pr ? 'All six arcade games restored! Stars and stamps are back.' : 'Older Passport restored! Games not included in that backup were left unchanged.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to read that backup file.');
    }
  }

  return <main className="game-page passport-page">
    <button className="back-link" onClick={onHome}>← Back to the game shelf</button>
    <div className="passport-heading"><span className="overline">THE LITTLE PUZZLE CLUB / YOUR ADVENTURES</span><h1>📖 Molly's Arcade Passport</h1><p>A scrapbook of every little victory, collected one puzzle at a time. ♡</p></div>
    <section className="passport-cover">
      <div className="passport-cover-head"><div><span className="overline">OFFICIAL COZY ARCADE PASSPORT</span><h2>Player One: Molly ✿</h2><p>Certified curious mind & champion of tiny triumphs.</p></div><div className="passport-flower" aria-hidden="true">🌷</div></div>
      <div className="passport-big-stats">
        <div><span>✨</span><strong>{passport.stars.toLocaleString()}</strong><small>Total stars</small></div>
        <div><span>🏆</span><strong>{passport.solved}</strong><small>Puzzles solved</small></div>
        <div><span>🎟️</span><strong>{passport.completion} / {passport.stamps.length}</strong><small>Stamps earned</small></div>
        <div><span>🔥</span><strong>{guess.stats.bestStreak}</strong><small>Best daily streak</small></div>
      </div>
    </section>
    <section className={'passport-coupon-keepsake '+(pink.coupon?.status==='redeemed'?'is-forever':'')}>
      <div><span className="overline">MOLLY’S BACKSTAGE WALLET</span><h2>🎟️ A promise from Rouhin</h2>
      {pink.coupon?.status==='redeemed'&&pink.coupon.chosen?<>
        <div className="passport-forever-badge">💗 REDEEMED • FOREVER YOURS</div>
        <h3>{couponGifts[pink.coupon.chosen].icon} {couponGifts[pink.coupon.chosen].title}</h3>
        <p>{couponGifts[pink.coupon.chosen].description}</p>
        <small>Redeemed {pink.coupon.redeemedAt?new Date(pink.coupon.redeemedAt).toLocaleDateString():''} • a permanent Pink Rush memory in this Passport.</small>
      </>:<p>{pink.coupon?.status==='active'?'Your chosen backstage coupon is waiting in Molly’s wallet.':
        pink.coupon?.status==='ready'?'You’ve earned a mystery prize! Three secret cards are waiting for your choice.':
        'Clear a Pink Rush show to open three secret gift cards, chosen especially for Molly.'}</p>}</div>
      <button className="btn btn-primary" onClick={onWallet}>{pink.coupon?.status==='redeemed'?'View your keepsake':'Open your coupon wallet'} ↗</button>
    </section>
    <section className="passport-section">
      <div className="passport-section-heading"><div><span className="overline">COLLECT THE MEMORIES</span><h2>Stamp collection</h2></div><span className="passport-count">{passport.completion} earned</span></div>
      <div className="passport-stamps">
        {passport.stamps.map(stamp => <div className={`passport-stamp ${stamp.earned ? 'is-earned' : 'is-locked'}`} key={stamp.id} title={stamp.description}>
          <div className="passport-stamp-icon" aria-hidden="true">{stamp.earned ? stamp.icon : '🔒'}</div>
          <strong>{stamp.name}</strong>
          <span>{stamp.description}</span>
          <small>{stamp.earned ? 'STAMPED ✦' : 'NOT YET EARNED'}</small>
        </div>)}
      </div>
    </section>
    <section className="passport-section">
      <div className="passport-section-heading"><div><span className="overline">A LITTLE ABOUT EACH ADVENTURE</span><h2>Your game records</h2></div></div>
      <div className="passport-game-records">
        {passport.games.map(game => <div className="passport-game-record" key={game.id}>
          <div className="passport-game-icon" aria-hidden="true">{game.icon}</div>
          <div className="passport-game-title"><strong>{game.name}</strong><small>{game.solved} solved · {game.played} attempts</small></div>
          <div><strong>{game.stars.toLocaleString()} ✨</strong><small>Stars collected</small></div>
          <div><strong>{game.best}</strong><small>{game.bestLabel}</small></div>
        </div>)}
      </div>
    </section>
    <section className="passport-backup">
      <div><span className="overline">KEEP YOUR MEMORIES SAFE</span><h2>Passport backup</h2><p>Your scores live in this browser, not on a server yet. Download a backup of all six games, or restore one from another device (older three-, four- and five-game backups still work). We'll support optional cloud sync later.</p></div>
      <div className="passport-backup-actions">
        <button className="btn btn-primary" onClick={exportBackup}>↓ Export passport</button>
        <button className="btn btn-outline" onClick={()=>inputRef.current?.click()}>↑ Restore backup</button>
        <input type="file" hidden ref={inputRef} accept=".json,application/json" onChange={importBackup} aria-label="Choose a Molly's Cozy Arcade backup file" />
      </div>
      {feedback && <p role="status" className="passport-backup-feedback">{feedback}</p>}
    </section>
    <p className="privacy-note">✧ Stars and coupons are stored locally in this browser. A backup protects keepsakes; cloud-enforced redemption will need a future private account.</p>
  </main>;
}
