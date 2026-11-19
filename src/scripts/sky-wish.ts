// A click in the sky sends one wish across it. Tapping to scroll does not fire.
export const initSkyWishes = () => {
  const wish = document.querySelector<HTMLElement>('[data-wish]');
  if (!wish) return;
  const cats = Array.from(document.querySelectorAll<HTMLElement>('.cat-float-wrap'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let wishTimer = 0;
  let catTimer = 0;

  const send = (x: number, y: number) => {
    wish.classList.remove('is-flying');
    wish.style.left = `${x}px`;
    wish.style.top = `${y}px`;
    void wish.offsetWidth;
    wish.classList.add('is-flying');

    window.clearTimeout(wishTimer);
    wishTimer = window.setTimeout(() => wish.classList.remove('is-flying'), 1200);

    cats.forEach((cat) => cat.classList.add('is-struck'));
    window.clearTimeout(catTimer);
    catTimer = window.setTimeout(() => {
      cats.forEach((cat) => cat.classList.remove('is-struck'));
    }, 700);
  };

  document.addEventListener('click', (event) => {
    if (reduced.matches || event.defaultPrevented) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('a, button, input, textarea, select, dialog, header, nav, footer')) return;
    send(event.clientX, event.clientY);
  });
};
