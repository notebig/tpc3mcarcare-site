function initMobileMenu() {
  const burger = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const mnav = document.querySelector('[data-mnav]');
  const overlay = document.querySelector('[data-overlay]');

  if (!burger || !mnav) return;

  function openMenu() {
    mnav.classList.add('is-open');
    overlay.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    mnav.classList.remove('is-open');
    overlay.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  burger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}
