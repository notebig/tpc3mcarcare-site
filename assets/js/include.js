/* =====================================================
   TPC INCLUDE SYSTEM – STABLE CLEAN VERSION
   ===================================================== */

function includeHTML(selector, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;

      // หลัง inject header → init system
      if (selector === '#header') {
        initHeaderSystem();
      }
    });
}

function initHeaderSystem() {

  const header = document.querySelector('.hdr');
  const burger = document.querySelector('.hdr__burger');
  const overlay = document.querySelector('.overlay');
  const mnav = document.querySelector('.mnav');
  const closeBtn = document.querySelector('.mnav__close');

  /* ===== Scroll Header ===== */
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);

  /* ===== Menu Toggle ===== */
  if (burger) {
    burger.addEventListener('click', () => {
      document.documentElement.classList.add('menu-open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      document.documentElement.classList.remove('menu-open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.documentElement.classList.remove('menu-open');
    });
  }
}

/* ===== On Load ===== */
document.addEventListener("DOMContentLoaded", function () {
  includeHTML('#header', './partials/header-root.html');
  includeHTML('#footer', './partials/footer-root.html');
});
