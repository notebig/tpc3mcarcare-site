/* =====================================================
   TPC INCLUDE SYSTEM – FINAL STABLE (SYNC WITH CSS)
   ===================================================== */

function includeHTML(selector, file, callback) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error('Include failed: ' + file);
      return res.text();
    })
    .then(data => {
      const target = document.querySelector(selector);
      if (!target) return;

      target.innerHTML = data;

      if (callback) callback();
    })
    .catch(err => console.error(err));
}


/* =====================================================
   HEADER SYSTEM
   ===================================================== */

function initHeaderSystem() {

  const header  = document.querySelector('.hdr');
  const burger  = document.querySelector('.hdr__burger');
  const overlay = document.querySelector('.overlay');
  const mnav    = document.querySelector('.mnav');
  const closeBtn = document.querySelector('.mnav__close');

  if (!header) return;

  /* ===== Scroll Theme Control ===== */

  function updateHeaderTheme() {
    if (window.scrollY > 60) {
      header.setAttribute('data-theme', 'solid');
    } else {
      header.setAttribute('data-theme', 'transparent');
    }
  }

  updateHeaderTheme();
  window.addEventListener('scroll', updateHeaderTheme);


  /* ===== Menu Control (SYNC WITH CSS) ===== */

  function openMenu() {
    document.documentElement.setAttribute('data-menu', 'open');
    burger?.setAttribute('aria-expanded', 'true');
    header?.setAttribute('data-theme', 'solid');
  }

  function closeMenu() {
    document.documentElement.removeAttribute('data-menu');
    burger?.setAttribute('aria-expanded', 'false');

    // reset theme based on scroll
    updateHeaderTheme();
  }

  burger?.addEventListener('click', openMenu);
  overlay?.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);


  /* ===== Close on Resize (Desktop Safety) ===== */

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) {
      closeMenu();
    }
  });

}


/* =====================================================
   INITIAL LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  includeHTML('#header', './partials/header-root.html', function () {
    initHeaderSystem();
  });

  includeHTML('#footer', './partials/footer-root.html');

});
