# Project Status

Snapshot of where the site stands. Update this file whenever a meaningful chunk of work lands — treat it as the single source of truth for "what's actually done" vs. "what looks done but isn't."

_Last updated: 2026-07-06_

## Pages

| Page | Content | Pricing | Real images | Notes |
|---|---|---|---|---|
| `index.html` (Home) | Complete | Partial (PPF has no figure) | Mostly placeholder — see Known Issues | Audited in full (see `/docs` history / chat log for the 10-category audit) |
| `contact/index.html` | Complete | n/a | n/a | Real phone, LINE, Facebook, Google Maps embed, nearby amenities all added |
| `services/index.html` | Complete | n/a (hub page) | Uses same placeholder set as home | Not in `sitemap.xml` — needs adding |
| `services/window-film/*` | Complete | Not itemized on-page (only home page range) | Uses placeholder set | Has FAQ subpage |
| `services/paint-protection-film/index.html` | Complete (tiers + coverage levels) | No baht figures anywhere on page | Uses placeholder set | Not in `sitemap.xml` |
| `services/ceramic-coating/index.html` | Complete | **Done** — CL/C4/C5/C6/C7 priced with S/M/L/XL table | Uses placeholder set | Missing prices for C1/C2/C3/CS (mentioned in copy, no price sheet given yet) |
| `services/paint-correction/index.html` | Complete | **Done** — P1–P5 priced with S/M/L/XL table | Real process images already in place | Not in `sitemap.xml` |
| `services/car-wash/index.html` | Complete | **Done** — Wash (B1–BX), Wax (W1–W3), Add-ons (E1–E8) all priced | Fixed — was 100% duplicate placeholder, replaced with real shop photos | Not in `sitemap.xml` |
| `services/wrap-film/index.html` | Not audited yet | Unknown | Unknown | Not in `sitemap.xml` |

## Known Issues (not yet fixed)

- **Image duplication, sitewide** — 81 of 105 `.webp` files under `assets/images/` are byte-for-byte the same placeholder stock photo (car roof reflection). Confirmed present in ceramic, PPF, crystalline, defender, correction, film, wrap, and nearly all homepage service-card images. Homepage's 4+4 service cards and hero are part of this. Only the 3 homepage portfolio images and the 3 car-wash images have been replaced with real photos so far.
- **Homepage** — full 10-category audit completed (structure, duplicates, weak/missing sections, hierarchy, UX, conversion, performance, SEO, accessibility). Priority list (P1/P2/P3) exists but nothing has been implemented from it yet — see `SPRINT.md`.
- **`sitemap.xml` is missing 5 major pages**: `services/index.html`, `paint-protection-film`, `paint-correction`, `car-wash`, `wrap-film`.
- **No `robots.txt`, no favicon** anywhere in the project.
- **Dead code**: a fully-built "Featured Carousel" (CSS in `home.css`, JS in `home-init.js`, 4 dedicated `rail-*.webp` images) exists but is never rendered on any page — no HTML uses it.
- **Duplicate menu-control logic**: `assets/js/include.js` (`initHeaderSystem()`) and `assets/js/header.js` both independently control the same burger menu / overlay / header-theme elements.
- **Ceramic Coating pricing gap**: C1 (Boost), C2 (Boost Plus), C3 (Basic), CS (Deluxe Starter) are named in the program architecture copy but have no price data yet.

## Recently completed

- Contact page fully rebuilt (was missing all CSS, had placeholder phone/LINE, no map, no amenities section).
- Car Wash, Paint Correction, Ceramic Coating pages: real pricing tables added, responsive (horizontal-scroll wrapper) verified on mobile viewport widths.
- Homepage price-orientation section extended with Car Wash and Paint Correction ranges.
- 3 homepage portfolio images and 3 car-wash images replaced with real shop photos (cropped/converted from owner-supplied source photos).
- Local dev preview working via XAMPP (see `AI_TEAM.md` for the permission fix that made this possible).
