// One lunar month, anchored to a known new moon. Both the hero readout and the
// moon drawing read from here, so the page never contradicts itself.
const SYNODIC_MONTH = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const DAY = 86_400_000;

export const moonAge = (date: Date) => {
  const days = (date.getTime() - NEW_MOON) / DAY;
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
};

export const phaseName = (age: number) => {
  if (age < 1.85 || age >= 27.68) return 'New moon';
  if (age < 5.54) return 'Waxing crescent';
  if (age < 9.23) return 'First quarter';
  if (age < 12.91) return 'Waxing gibbous';
  if (age < 16.61) return 'Full moon';
  if (age < 20.3) return 'Waning gibbous';
  if (age < 23.99) return 'Last quarter';
  return 'Waning crescent';
};

export const illuminatedFraction = (age: number) => {
  const angle = (age / SYNODIC_MONTH) * Math.PI * 2;
  return (1 - Math.cos(angle)) / 2;
};

// Lit region for a disc centred at (cx, cy). The outer edge follows the limb, the
// inner edge is a half-ellipse whose width is the cosine of the phase angle.
export const moonLitPath = (age: number, cx = 200, cy = 200, radius = 150) => {
  const progress = age / SYNODIC_MONTH;
  const angle = progress * Math.PI * 2;
  const lit = illuminatedFraction(age);
  const waxing = progress < 0.5;
  const inner = Math.abs(Math.cos(angle)) * radius;
  const top = cy - radius;
  const bottom = cy + radius;

  // Waxing is lit on the right in the northern hemisphere. A crescent curves back
  // toward the lit limb, a gibbous bulges past the centre line.
  const limb = waxing ? 1 : 0;
  const terminator = lit < 0.5 ? (waxing ? 0 : 1) : waxing ? 1 : 0;

  const n = (value: number) => Number(value.toFixed(2));
  return `M ${cx} ${n(top)} A ${n(radius)} ${n(radius)} 0 0 ${limb} ${cx} ${n(bottom)} A ${n(inner)} ${n(radius)} 0 0 ${terminator} ${cx} ${n(top)} Z`;
};
