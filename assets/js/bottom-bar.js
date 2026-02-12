(() => {
  const bar = document.querySelector('[data-bottom-bar]');
  if (!bar) return;

  const html = document.documentElement;

  let lastY = window.scrollY;
  const threshold = 10;
  let ticking = false;

  function onScroll(){
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (Math.abs(delta) > threshold){
        if (delta > 0){
          html.dataset.bottom = "hidden";
        } else {
          html.dataset.bottom = "visible";
        }
      }

      lastY = y;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  html.dataset.bottom = "visible";
})();
