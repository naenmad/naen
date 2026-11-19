// Section-local celestial bodies. They drift against the section they sit in,
// so the moon and planets do not travel at exactly the same speed as the page.
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

export const initCelestialDrift = () => {
  const bodies = Array.from(document.querySelectorAll<HTMLElement>('[data-drift]'));
  if (bodies.length === 0) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const reset = () => {
    bodies.forEach((body) => {
      body.style.setProperty('--dx', '0px');
      body.style.setProperty('--dy', '0px');
      body.style.setProperty('--ds', '1');
      body.style.setProperty('--dr', '0deg');
    });
  };

  const paint = () => {
    frame = 0;
    if (REDUCED.matches) return;
    const viewport = window.innerHeight;

    bodies.forEach((body) => {
      const rect = body.getBoundingClientRect();
      const currentDy = Number.parseFloat(body.style.getPropertyValue('--dy')) || 0;
      const baseCenter = rect.top + rect.height / 2 - currentDy;
      const raw = (viewport / 2 - baseCenter) / viewport;
      const progress = Math.max(-0.6, Math.min(0.6, raw));

      const drift = Number(body.dataset.drift ?? 40);
      const scaleAmp = Number(body.dataset.scale ?? 0.06);
      const rotateAmp = Number(body.dataset.rotate ?? 0);
      const pointerAmp = Number(body.dataset.pointer ?? 10);

      body.style.setProperty('--dx', `${(pointerX * pointerAmp).toFixed(2)}px`);
      body.style.setProperty('--dy', `${(progress * drift + pointerY * pointerAmp * 0.4).toFixed(2)}px`);
      body.style.setProperty('--ds', (1 + progress * scaleAmp).toFixed(3));
      body.style.setProperty('--dr', `${(progress * rotateAmp).toFixed(2)}deg`);
    });
  };

  const request = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    request();
  }, { passive: true });
  window.addEventListener('blur', () => {
    pointerX = 0;
    pointerY = 0;
    request();
  });

  REDUCED.addEventListener('change', () => {
    if (REDUCED.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      reset();
    } else {
      request();
    }
  });

  if (REDUCED.matches) reset();
  else request();
};
