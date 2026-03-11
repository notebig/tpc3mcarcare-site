document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = document.querySelector("[data-carousel-dots]");

  if (!viewport || !track || !slides.length || !dotsWrap) return;

  let current = 0;
  let dots = [];
  let scrollTimer = null;

  function getGap() {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.gap || styles.columnGap || 0);
  }

  function getStep() {
    if (!slides.length) return 0;
    return slides[0].getBoundingClientRect().width + getGap();
  }

  function getMaxIndex() {
    return Math.max(0, slides.length - 1);
  }

  function clampIndex(index) {
    return Math.max(0, Math.min(index, getMaxIndex()));
  }

  function buildDots() {
    dotsWrap.innerHTML = "";

    dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "featured-carousel__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `ไปการ์ดที่ ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(dot);
      return dot;
    });
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === current);
    });
  }

  function updateNav() {
    if (prevBtn) prevBtn.disabled = current <= 0;
    if (nextBtn) nextBtn.disabled = current >= getMaxIndex();
  }

  function updateUI() {
    updateDots();
    updateNav();
  }

  function goTo(index, behavior = "smooth") {
    current = clampIndex(index);
    const left = current * getStep();

    viewport.scrollTo({
      left,
      behavior
    });

    updateUI();
  }

  function syncFromScroll() {
    const step = getStep();
    if (!step) return;

    current = clampIndex(Math.round(viewport.scrollLeft / step));
    updateUI();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goTo(current - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goTo(current + 1));
  }

  viewport.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(syncFromScroll, 60);
  }, { passive: true });

  window.addEventListener("resize", () => {
    goTo(current, "auto");
  });

  buildDots();
  goTo(0, "auto");
});