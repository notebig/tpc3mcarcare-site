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

function initHeaderSystem(){

  const header  = document.querySelector('.hdr');
  const burger  = document.querySelector('[data-menu-open]');
  const overlay = document.querySelector('[data-overlay]');
  const closeBtn = document.querySelector('[data-menu-close]');

  if(!header) return;

  let lastScroll = 0;

  function updateHeader(){

    const currentScroll = window.scrollY;

    // Theme
    header.setAttribute(
      'data-theme',
      currentScroll > 60 ? 'solid' : 'transparent'
    );

    // Visibility
    if(currentScroll > lastScroll && currentScroll > 120){
      header.setAttribute('data-visibility','hidden');
    } else {
      header.setAttribute('data-visibility','top');
    }

    lastScroll = currentScroll;
  }

  function openMenu(){
    document.documentElement.setAttribute('data-menu','open');
    header.setAttribute('data-theme','solid');
    header.setAttribute('data-visibility','top');
  }

  function closeMenu(){
    document.documentElement.removeAttribute('data-menu');
  }

  burger?.addEventListener('click', openMenu);
  overlay?.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);

  updateHeader();
  window.addEventListener('scroll', updateHeader);
}

document.addEventListener("DOMContentLoaded", function () {

  includeHTML('#header', './partials/header-root.html', function () {
    initHeaderSystem();
  });

  includeHTML('#footer', './partials/footer-root.html');

});
