async function includeHTML(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();

  // หลัง include เสร็จ → bind menu
  initMenuSystem();
}

function initMenuSystem() {
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const overlay = document.querySelector('[data-overlay]');
  const mnav = document.querySelector('[data-mnav]');
  const html = document.documentElement;

  if (!openBtn || !mnav) return;

  function openMenu() {
    html.setAttribute('data-menu', 'open');
    mnav.hidden = false;
    overlay.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    html.removeAttribute('data-menu');
    mnav.hidden = true;
    overlay.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}
