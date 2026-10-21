import type { Difficulty } from '../lib/passport';
import { DIFFICULTIES } from '../lib/passport';

type Props = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
  lockedMessage?: string;
};

export default function DifficultyPicker({ value, onChange, disabled = false, lockedMessage }: Props) {
  return <section className="difficulty-picker" aria-label="Choose game difficulty">
    <div className="difficulty-picker-title"><strong>Choose your challenge</strong><span>✦ {DIFFICULTIES[value].multiplier}× stars</span></div>
    <div className="difficulty-picker-buttons" role="group" aria-label="Game difficulty">
      {(['easy', 'medium', 'hard'] as const).map(d => <button key={d} type="button" className={value === d ? 'is-selected' : ''} disabled={disabled} aria-pressed={value===d} onClick={() => onChange(d)}>{d === 'easy' ? '🌱' : d === 'medium' ? '🌟' : '🔥'} {DIFFICULTIES[d].label}</button>)}
    </div>
    <p>{disabled && lockedMessage ? lockedMessage : DIFFICULTIES[value].description}</p>
  </section>;
}
