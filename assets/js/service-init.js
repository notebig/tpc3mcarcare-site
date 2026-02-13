document.addEventListener("DOMContentLoaded", function () {
includeHTML('#header', '../../partials/header-services.html');
includeHTML('#footer', '../../partials/footer-services.html');

  const reveals = document.querySelectorAll(".reveal");

  if(reveals.length){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, { threshold: 0.2 });

    reveals.forEach(r => observer.observe(r));
  }

});
