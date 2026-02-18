function includeHTML(selector, file, callback) {
  fetch('./partials/' + file)
    .then(res => res.text())
    .then(data => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.innerHTML = data;
      if (callback) callback();
    });
}

function initHeaderSystem(){
  const header  = document.querySelector('.hdr');
  const burger  = document.querySelector('.hdr__burger');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.mnav__close');

  if(!header || !burger) return;

  function updateTheme(){
    if(window.scrollY > 60){
      header.setAttribute('data-theme','solid');
    }else{
      header.setAttribute('data-theme','transparent');
    }
  }

  function openMenu(){
    document.documentElement.setAttribute('data-menu','open');
    burger.setAttribute('aria-expanded','true');
    header.setAttribute('data-theme','solid');
  }

  function closeMenu(){
    document.documentElement.removeAttribute('data-menu');
    burger.setAttribute('aria-expanded','false');
    updateTheme();
  }

  burger.addEventListener('click', openMenu);
  overlay?.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);

  updateTheme();
  window.addEventListener('scroll', updateTheme);
}

document.addEventListener("DOMContentLoaded", function () {

  includeHTML('#header', 'header-root.html', function () {
    setTimeout(initHeaderSystem, 50);
  });

  includeHTML('#footer', 'footer-root.html');

});
