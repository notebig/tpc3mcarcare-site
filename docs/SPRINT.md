# Sprint Board

Actionable backlog, ordered by priority. Move items to "Done" (with date) as they land — don't delete history, this doubles as a changelog.

Source: Homepage 10-category audit (structure/duplicates/weak-missing sections/hierarchy/UX/conversion/performance/SEO/accessibility) plus open items from `PROJECT_STATUS.md`.

## P1 — Highest impact (conversion, trust, or spreading technical debt)

- [ ] Add a `robots.txt`
- [ ] Give PPF a real starting price on the homepage (currently the only service with no baht figure, next to 4 others that have one)
- [ ] Add a favicon (none exists anywhere in the project)

## P2 — Page quality / technical debt

- [ ] Decide: build out the Featured Carousel (CSS/JS/images already exist, unused) or delete it
- [ ] Consolidate the duplicate menu-control logic between `include.js` and `header.js`
- [ ] Fix header/footer FOUC (currently injected async after `DOMContentLoaded` via `fetch`)
- [ ] Add a fallback so `.reveal` sections aren't stuck at `opacity:0` if JS fails/is disabled
- [ ] Add a location cue (e.g. "ราชพฤกษ์" / "ตลิ่งชัน") into the visible H1 or a subheading, not just meta description

## P3 — Longer-term / growth

- [ ] Add a Testimonials/reviews section to the homepage — currently zero social proof beyond "since 2013"
- [ ] Add a credibility number (cars served, repeat-customer rate, etc.)
- [ ] Add a small embedded map to the homepage (currently only on the Contact page)
- [ ] Add a skip-to-content link
- [ ] Merge/minify the 5 separately-loaded CSS files
- [ ] Make the 3 repeated CTA labels consistent across Hero / mid-page / final CTA

## Sitewide (not homepage-specific)

- [ ] Audit and fix the placeholder-image problem beyond the homepage — 81 of 105 files under `assets/images/` are the same duplicate stock photo (ceramic, PPF, crystalline, defender, correction, film, wrap all affected)
- [ ] Source pricing for Ceramic Coating tiers C1 (Boost), C2 (Boost Plus), C3 (Basic), CS (Deluxe Starter) — named in existing copy, no price sheet yet
- [ ] Audit `services/wrap-film/index.html` (not yet reviewed this session)

## Done

- [x] 2026-07-06 — Added the 5 missing pages to `sitemap.xml`: services hub, paint-protection-film, paint-correction, car-wash, wrap-film
- [x] 2026-07-06 — Investigated Hero absolute-path compatibility (`url('/assets/...')`, used in 18 hero sections sitewide). Confirmed it breaks under local XAMPP subfolder hosting, but could not verify true production behavior — `tpc3mcarcare.com` is live but currently serves a different, older site build, meaning this codebase hasn't been deployed anywhere yet. Decision: left unchanged, no files modified. Revisit once the real deployment target (root domain vs. subfolder) is known.
- [x] 2026-07-06 — Replaced the 13 duplicate placeholder images on the homepage (hero + 4 Car Care cards + 4 Protection cards + Car Wash/Paint Care/Interior/Surface Prep service cards) with real shop photos; preserved filenames and 2000×857 dimensions; `work-01/02/03.webp` left unchanged. 16/16 homepage images now unique.
- [x] 2026-07-06 — Rebuilt `contact/index.html`: real phone/LINE/Facebook links, Google Maps embed, nearby-amenities section, added missing page CSS
- [x] 2026-07-06 — Car Wash page: added Wash (B1–BX), Paint Care/Wax (W1–W3), Add-on (E1–E8) pricing tables; fixed mobile horizontal-overflow bug from the new tables
- [x] 2026-07-06 — Paint Correction page: added P1–P5 pricing table
- [x] 2026-07-06 — Ceramic Coating page: added CL/C4/C5/C6/C7 pricing table
- [x] 2026-07-06 — Homepage price-orientation section: added Car Wash and Paint Correction ranges, updated Ceramic Coating range to match real pricing
- [x] 2026-07-05 — Replaced 3 duplicate-placeholder homepage portfolio images and 3 car-wash images with real shop photos
- [x] 2026-07-05 — Set up working local preview via XAMPP (symlink + permission fix)
