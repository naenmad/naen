import { illuminatedFraction, moonAge, moonLitPath, phaseName } from './lunar';

// A small live readout: the local hour in Bogor and the current moon phase.
export const initObservatory = () => {
  const timeEl = document.querySelector<HTMLElement>('[data-observatory-time]');
  const moonEl = document.querySelector<HTMLElement>('[data-observatory-moon]');
  if (!timeEl && !moonEl) return;

  let clock: Intl.DateTimeFormat | null = null;
  try {
    clock = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
  } catch {
    clock = null;
  }

  const update = () => {
    const now = new Date();
    if (timeEl && clock) timeEl.textContent = `${clock.format(now)} WIB`;
    if (moonEl) moonEl.textContent = phaseName(moonAge(now));
  };

  update();
  window.setInterval(update, 30_000);
};

// The large about moon follows the same age, so the drawing and the readout agree.
export const initMoonPhase = () => {
  const path = document.querySelector<SVGPathElement>('[data-moon-lit]');
  const moon = document.querySelector<SVGElement>('[data-moon-phase]');
  if (!path || !moon) return;

  const render = () => {
    const age = moonAge(new Date());
    path.setAttribute('d', moonLitPath(age));
    // At new moon the lit region collapses; hide it instead of stroking a stray arc.
    path.style.opacity = illuminatedFraction(age) < 0.01 ? '0' : '1';
  };

  render();
  window.setInterval(render, 30 * 60 * 1000);
};
