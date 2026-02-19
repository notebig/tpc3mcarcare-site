/* =====================================================
   TPC INCLUDE SYSTEM – FINAL STABLE 2026
===================================================== */

function includeHTML(selector, file) {
  return fetch(file)
    .then(res => {
      if (!res.ok) throw new Error('Include failed: ' + file);
      return res.text();
    })
    .then(data => {
      const target = document.querySelector(selector);
      if (!target) return;
      target.innerHTML = data;
    })
    .catch(err => console.error(err));
}


/* =====================================================
   HEADER SYSTEM – SAFE INIT
===================================================== */

function initHeaderSystem(){

  const header  = document.querySelector('.hdr');
  const burger  = document.querySelector('[data-menu-open]');
  const overlay = document.querySelector('[data-overlay]');
  const closeBtn = document.querySelector('[data-menu-close]');

  if(!header) return;

  let lastScroll = 0;

  function updateHeader(){
    const currentScroll = window.scrollY;

    if(currentScroll > 60){
      header.setAttribute('data-theme','solid');
    } else {
      header.setAttribute('data-theme','transparent');
    }

    if(currentScroll > lastScroll && currentScroll > 120){
      header.setAttribute('data-visibility','hidden');
    } else {
      header.removeAttribute('data-visibility');
    }

    lastScroll = currentScroll;
  }

  function openMenu(){
    document.documentElement.setAttribute('data-menu','open');
    header.setAttribute('data-theme','solid');
    header.removeAttribute('data-visibility');
  }

  function closeMenu(){
    document.documentElement.removeAttribute('data-menu');
  }

  if(burger)  burger.addEventListener('click', openMenu);
  if(overlay) overlay.addEventListener('click', closeMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);

  updateHeader();
  window.addEventListener('scroll', updateHeader);
}


/* =====================================================
   INITIAL LOAD – PROPER SEQUENCE
===================================================== */
document.addEventListener("DOMContentLoaded", async function(){

  const isGithub = window.location.hostname.includes('github.io');
  const repoName = 'tpc3mcarcare-site';

  const base = isGithub ? '/' + repoName : '';

  async function loadPartial(id, file){
    const el = document.getElementById(id);
    if(!el) return;

    const res = await fetch(base + '/partials/' + file);
    if(!res.ok){
      console.error('Failed to load:', file);
      return;
    }

    el.innerHTML = await res.text();
  }

  await loadPartial('header', 'header.html');
  await loadPartial('footer', 'footer.html');

  if(typeof initHeaderSystem === 'function'){
    initHeaderSystem();
  }

});
