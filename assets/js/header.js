(() => {
  const cfg = {
    solidAt: 8,    // px จาก top ให้สลับเป็น solid
    jitter: 10,    // กันสั่นเวลาขยับนิดๆ
    waitMs: 4000   // รอ include inject header ได้สูงสุด (ms)
  };

  const html = document.documentElement;

  function initWhenReady() {
    const header = document.querySelector('[data-header]');
    const btnOpen = document.querySelector('[data-menu-open]');
    const btnClose = document.querySelector('[data-menu-close]');
    const overlay = document.querySelector('[data-overlay]');
    const mnav = document.querySelector('[data-mnav]');

    if (!header || !btnOpen || !overlay || !mnav) return false;

    const st = {
      lastY: window.scrollY || 0,
      menu: 'closed',
      ticking: false
    };

    function setMenu(next) {
      st.menu = next;
      html.dataset.menu = next;

      const open = next === 'open';
      btnOpen.setAttribute('aria-expanded', String(open));

      overlay.hidden = !open;
      mnav.hidden = !open;

      if (open) {
        header.dataset.theme = 'solid';
        header.dataset.visibility = 'shown';
      } else {
        syncTheme();
        syncVisibility(true);
      }
    }

    function syncTheme() {
      const y = window.scrollY || 0;
      header.dataset.theme = (y <= cfg.solidAt) ? 'transparent' : 'solid';
    }

    function syncVisibility(force = false) {
      const y = window.scrollY || 0;

      // menu เปิด = ห้าม hide
      if (st.menu === 'open') {
        st.lastY = y;
        header.dataset.visibility = 'shown';
        return;
      }

      // บนสุด = top
      if (y <= cfg.solidAt) {
        st.lastY = y;
        header.dataset.visibility = 'top';
        return;
      }

      const delta = y - st.lastY;
      if (!force && Math.abs(delta) < cfg.jitter) return;

      header.dataset.visibility = (delta > 0) ? 'hidden' : 'shown';
      st.lastY = y;
    }

    function onScroll() {
      if (st.ticking) return;
      st.ticking = true;

      requestAnimationFrame(() => {
        syncTheme();
        syncVisibility();
        st.ticking = false;
      });
    }

    // open/close handlers
    btnOpen.addEventListener('click', () => setMenu(st.menu === 'open' ? 'closed' : 'open'));
    if (btnClose) btnClose.addEventListener('click', () => setMenu('closed'));
    overlay.addEventListener('click', () => setMenu('closed'));

    // close when click a link in menu
    mnav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setMenu('closed');
    });

    // ESC close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && st.menu === 'open') setMenu('closed');
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    // init
    setMenu('closed');
    syncTheme();
    header.dataset.visibility = (window.scrollY <= cfg.solidAt) ? 'top' : 'shown';

    return true;
  }

  // รองรับ include.js: รอจน DOM มี header แล้วค่อย init
  const start = Date.now();
  const timer = setInterval(() => {
    if (initWhenReady()) {
      clearInterval(timer);
      return;
    }
    if (Date.now() - start > cfg.waitMs) {
      clearInterval(timer);
    }
  }, 50);
})();
