// Small space gimmicks for every control on the page:
// a star follows the cursor over links and buttons, and a click throws stardust.
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
const INTERACTIVE = 'a, button, [role="button"]';

export const initInteractionFX = () => {
  let star: SVGSVGElement | null = null;
  let starFrame = 0;
  let starVisible = false;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const ensureStar = (host: HTMLElement) => {
    if (!star) {
      star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('viewBox', '0 0 16 16');
      star.setAttribute('class', 'cursor-star');
      star.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M8 1 L9.4 6.6 L15 8 L9.4 9.4 L8 15 L6.6 9.4 L1 8 L6.6 6.6 Z');
      star.append(path);
    }
    if (star.parentElement !== host) host.append(star);
    return star;
  };

  const paintStar = () => {
    starFrame = 0;
    if (!star) return;
    currentX += (targetX - currentX) * 0.35;
    currentY += (targetY - currentY) * 0.35;
    star.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
    const settled = Math.abs(targetX - currentX) < 0.4 && Math.abs(targetY - currentY) < 0.4;
    if (!settled) starFrame = requestAnimationFrame(paintStar);
  };

  const showStar = (x: number, y: number, host: HTMLElement) => {
    if (REDUCED.matches) return;
    const element = ensureStar(host);
    targetX = x;
    targetY = y;
    if (!starVisible) {
      currentX = x;
      currentY = y;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.classList.add('is-visible');
      starVisible = true;
    }
    if (!starFrame) starFrame = requestAnimationFrame(paintStar);
  };

  const hideStar = () => {
    if (!starVisible) return;
    starVisible = false;
    star?.classList.remove('is-visible');
    if (!starFrame) starFrame = requestAnimationFrame(paintStar);
  };

  const burst = (x: number, y: number, host: HTMLElement) => {
    if (REDUCED.matches) return;
    const container = document.createElement('span');
    container.className = 'stardust';
    container.setAttribute('aria-hidden', 'true');
    container.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    const count = 10;
    const ring = document.createElement('span');
    ring.className = 'stardust__ring';
    container.append(ring);

    for (let index = 0; index < count; index += 1) {
      const mote = document.createElement('span');
      mote.className = 'stardust__mote';
      const angle = (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.6;
      const distance = 26 + Math.random() * 26;
      mote.style.setProperty('--dx', `${(Math.cos(angle) * distance).toFixed(1)}px`);
      mote.style.setProperty('--dy', `${(Math.sin(angle) * distance).toFixed(1)}px`);
      mote.style.setProperty('--delay', `${(Math.random() * 70).toFixed(0)}ms`);
      container.append(mote);
    }

    host.append(container);
    window.setTimeout(() => container.remove(), 1200);
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const target = event.target instanceof Element ? event.target : null;
    const interactive = target?.closest(INTERACTIVE);
    if (!interactive) {
      hideStar();
      return;
    }
    const host = interactive.closest('dialog') ?? document.body;
    showStar(event.clientX, event.clientY, host);
  }, { passive: true });

  document.addEventListener('pointerleave', hideStar);
  window.addEventListener('blur', hideStar);

  document.addEventListener('click', (event) => {
    if (REDUCED.matches) return;
    const target = event.target instanceof Element ? event.target : null;
    const interactive = target?.closest(INTERACTIVE);
    if (!interactive) return;

    const host = interactive.closest('dialog') ?? document.body;
    if (event.detail === 0) {
      const rect = interactive.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, host);
    } else {
      burst(event.clientX, event.clientY, host);
    }
  });

  REDUCED.addEventListener('change', () => {
    if (REDUCED.matches) hideStar();
  });
};
