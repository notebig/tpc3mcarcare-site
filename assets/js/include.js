/* =====================================================
   TPC INCLUDE SYSTEM – FINAL PRODUCTION SAFE
   - Works on localhost
   - Works on GitHub Pages
   - Works with future custom domain
   - Works on nested pages
   - Auto-fixes links/src inside injected partials
===================================================== */

(function () {
  "use strict";

  const SCRIPT_MARKER = "/assets/js/include.js";

  function getCurrentScript() {
    return document.currentScript || document.querySelector('script[src*="include.js"]');
  }

  function getSiteRootPath() {
    const script = getCurrentScript();

    if (!script || !script.src) {
      return "/";
    }

    const scriptUrl = new URL(script.src, window.location.href);
    const markerIndex = scriptUrl.pathname.lastIndexOf(SCRIPT_MARKER);

    if (markerIndex === -1) {
      const fallbackPath = scriptUrl.pathname.replace(/\/assets\/js\/[^/]+$/, "/");
      return fallbackPath.endsWith("/") ? fallbackPath : fallbackPath + "/";
    }

    return scriptUrl.pathname.slice(0, markerIndex + 1);
  }

  const SITE_ROOT_PATH = getSiteRootPath();

  function buildRootRelativeUrl(path) {
    const clean = String(path || "").replace(/^\.?\//, "");
    return new URL(SITE_ROOT_PATH + clean, window.location.origin).toString();
  }

  function isSkippableUrl(value) {
    if (!value) return true;

    const v = value.trim();

    return (
      v === "" ||
      v.startsWith("#") ||
      v.startsWith("mailto:") ||
      v.startsWith("tel:") ||
      v.startsWith("javascript:") ||
      v.startsWith("data:") ||
      v.startsWith("blob:") ||
      /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(v) ||
      v.startsWith("//")
    );
  }

  function normalizeUrlValue(value) {
    if (isSkippableUrl(value)) return value;

    // Already root-relative on the current origin
    if (value.startsWith("/")) {
      return new URL(value, window.location.origin).toString();
    }

    // Convert "index.html", "services/...", "./..." into site-root-based absolute URL
    return buildRootRelativeUrl(value);
  }

  function normalizeInjectedUrls(scope) {
    if (!scope) return;

    scope.querySelectorAll("[href]").forEach((el) => {
      const href = el.getAttribute("href");
      const normalized = normalizeUrlValue(href);
      if (normalized && normalized !== href) {
        el.setAttribute("href", normalized);
      }
    });

    scope.querySelectorAll("[src]").forEach((el) => {
      const src = el.getAttribute("src");
      const normalized = normalizeUrlValue(src);
      if (normalized && normalized !== src) {
        el.setAttribute("src", normalized);
      }
    });

    scope.querySelectorAll("[srcset]").forEach((el) => {
      const srcset = el.getAttribute("srcset");
      if (!srcset) return;

      const normalizedSrcset = srcset
        .split(",")
        .map((part) => {
          const trimmed = part.trim();
          if (!trimmed) return trimmed;

          const pieces = trimmed.split(/\s+/);
          const url = pieces.shift();
          const normalizedUrl = normalizeUrlValue(url);

          return [normalizedUrl, ...pieces].join(" ").trim();
        })
        .join(", ");

      if (normalizedSrcset && normalizedSrcset !== srcset) {
        el.setAttribute("srcset", normalizedSrcset);
      }
    });
  }

  async function includeHTML(targetId, fileName) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const url = buildRootRelativeUrl("partials/" + fileName);

    try {
      const res = await fetch(url, { cache: "no-cache" });

      if (!res.ok) {
        throw new Error("Include failed: " + fileName + " (" + res.status + ")");
      }

      target.innerHTML = await res.text();
      normalizeInjectedUrls(target);
    } catch (err) {
      console.error("[include.js]", err);
    }
  }

  function initHeaderSystem() {
    const header = document.querySelector(".hdr");
    const burger = document.querySelector("[data-menu-open]");
    const overlay = document.querySelector("[data-overlay]");
    const closeBtn = document.querySelector("[data-menu-close]");
    const mobileNav = document.querySelector("[data-mnav]");

    if (!header) return;

    if (header.dataset.includeInitialized === "true") return;
    header.dataset.includeInitialized = "true";

    let lastScroll = window.scrollY || 0;

    function syncMenuA11y(isOpen) {
      if (burger) burger.setAttribute("aria-expanded", String(isOpen));

      if (overlay) {
        if (isOpen) {
          overlay.hidden = false;
        } else {
          overlay.hidden = true;
        }
      }

      if (mobileNav) {
        if (isOpen) {
          mobileNav.hidden = false;
        } else {
          mobileNav.hidden = true;
        }
      }
    }

    function updateHeader() {
      const currentScroll = window.scrollY || 0;
      const menuOpen = document.documentElement.getAttribute("data-menu") === "open";

      if (menuOpen) {
        header.setAttribute("data-theme", "solid");
        header.removeAttribute("data-visibility");
        lastScroll = currentScroll;
        return;
      }

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
      syncMenuA11y(true);
    }

    function closeMenu() {
      document.documentElement.removeAttribute("data-menu");
      syncMenuA11y(false);
      updateHeader();
    }

    if (burger) {
      burger.addEventListener("click", openMenu);
    }

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    if (mobileNav) {
      mobileNav.querySelectorAll("a[href]").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener(
      "scroll",
      () => {
        updateHeader();
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        closeMenu();
      } else {
        updateHeader();
      }
    });

    syncMenuA11y(false);
    updateHeader();
  }

  function initFooterSystem() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  async function initIncludes() {
    await Promise.all([
      includeHTML("header", "header.html"),
      includeHTML("footer", "footer.html"),
    ]);

    initHeaderSystem();
    initFooterSystem();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIncludes);
  } else {
    initIncludes();
  }

  // Optional debug access
  window.TPCInclude = {
    siteRootPath: SITE_ROOT_PATH,
    buildRootRelativeUrl,
    reload: initIncludes,
  };
})();