/* =====================================================
   TPC INCLUDE SYSTEM – FINAL STABLE
   ===================================================== */

function includeHTML(selector, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
      if (callback) callback();
    });
}

/* ================= HEADER SYSTEM ================= */

function initHeaderSystem(){

  const header = document.querySelector('[data-header]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const overlay = document.querySelector('[data-overlay]');

  if(!header) return;

  /* ===== Scroll Theme Switch ===== */

  let lastScroll = 0;

  function updateHeader(){

    const currentScroll = window.scrollY;

    // Theme switch
    if(currentScroll > 40){
      header.setAttribute('data-theme', 'solid');
    } else {
      header.setAttribute('data-theme', 'transparent');
    }

    // Hide on scroll down
    if(currentScroll > lastScroll && currentScroll > 120){
      header.setAttribute('data-visibility', 'hidden');
    } else {
      header.setAttribute('data-visibility', 'top');
    }

    lastScroll = currentScroll;
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);


  /* ===== Menu Toggle ===== */

  function openMenu(){
    document.documentElement.setAttribute('data-menu','open');
    header.setAttribute('data-theme','solid');
  }

  function closeMenu(){
    document.documentElement.removeAttribute('data-menu');
  }

  if(openBtn) openBtn.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  if(overlay) overlay.addEventListener('click', closeMenu);
}


/* ================= LOAD ================= */

window.addEventListener("load", function(){

  includeHTML('#header', './partials/header-root.html', function(){
    initHeaderSystem();
  });

  includeHTML('#footer', './partials/footer-root.html');

});
