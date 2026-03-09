/* =====================================================
   TPC INCLUDE SYSTEM – PRODUCTION SAFE UNIVERSAL
   - Works on localhost
   - Works on GitHub Pages
   - Works in nested folders
   - No hardcoded repo name
===================================================== */

function getSiteRoot() {
  const currentScript = document.currentScript || [...document.scripts].pop();
  if (!currentScript) return "./";

  const scriptUrl = new URL(currentScript.src, window.location.href);

  // include.js expected at: /assets/js/include.js
  // site root = everything before /assets/js/include.js
  const marker = "/assets/js/include.js";
  const idx = scriptUrl.pathname.lastIndexOf(marker);

  if (idx === -1) {
    return "./";
  }

  return scriptUrl.pathname.slice(0, idx + 1);
}

const SITE_ROOT = getSiteRoot();

function buildPath(path) {
  return SITE_ROOT + path.replace(/^\.?\//, "");
}


/* =====================================================
   PARTIAL LOADER
===================================================== */

async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const path = buildPath("partials/" + file);

  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error("Include failed: " + path);
    }

    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}


/* =====================================================
   HEADER SYSTEM
===================================================== */

function initHeaderSystem() {
  const header   = document.querySelector(".hdr");
  const burger   = document.querySelector("[data-menu-open]");
  const overlay  = document.querySelector("[data-overlay]");
  const closeBtn = document.querySelector("[data-menu-close]");

  if (!header) return;

  let lastScroll = 0;

  function updateHeader() {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      header.setAttribute("data-theme", "solid");
    } else {
      header.setAttribute("data-theme", "transparent");
    }

    if (currentScroll > lastScroll && currentScroll > 120) {
      header.setAttribute("data-visibility", "hidden");
    } else {
      header.removeAttribute("data-visibility");
    }

    lastScroll = currentScroll;
  }

  function openMenu() {
    document.documentElement.setAttribute("data-menu", "open");
    header.setAttribute("data-theme", "solid");
    header.removeAttribute("data-visibility");
  }

  function closeMenu() {
    document.documentElement.removeAttribute("data-menu");
  }

  if (burger) burger.addEventListener("click", openMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", async function () {
  await loadPartial("header", "header.html");
  await loadPartial("footer", "footer.html");

  initHeaderSystem();
});