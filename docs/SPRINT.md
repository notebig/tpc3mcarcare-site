# Sprint Board

Actionable backlog, ordered by priority. Move items to "Done" (with date) as they land — don't delete history, this doubles as a changelog.

Source: Homepage 10-category audit (structure/duplicates/weak-missing sections/hierarchy/UX/conversion/performance/SEO/accessibility) plus open items from `PROJECT_STATUS.md`.

## P1 — Highest impact (conversion, trust, or spreading technical debt)

_(none remaining)_

## P2 — Page quality / technical debt

- [ ] Add a fallback so `.reveal` sections aren't stuck at `opacity:0` if JS fails/is disabled

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

- [x] 2026-07-06 — (Correcting stale entries found during roadmap review) Confirmed already done earlier this session: Featured Carousel is built out with real content (4 slides, real photos, working nav) — not deleted; duplicate menu-control logic consolidated (`header.js` deleted, `include.js` is the sole implementation); header/footer FOUC fixed (preload hints added, unnecessary `DOMContentLoaded` gate removed); location cue ("ราชพฤกษ์") added as a visible eyebrow/kicker above the H1.
- [x] 2026-07-06 — Added a favicon, sourced from the shop's real logo (car-outline icon, isolated from `theprochoice-logo3.png`, text removed, recoloured black + thickened for 16x16/32x32 legibility). Added to all 17 live pages; draft/template/knowledge/orphan pages intentionally excluded.
- [x] 2026-07-06 — Gave homepage PPF a real starting price (฿8,900, entry-tier partial protection). Sourced from real 3M pricing reference material (`3mtheproschoice-framework/referent/`), not the full ฿8,900–139,900 range and not the Facebook promotional graphic (which showed different/discounted figures). Full tiering, sizing, MSRP, and current promotions intentionally stay off the homepage per business decision — see chat log for full marketing-strategy rationale.
- [x] 2026-07-06 — Added a minimal `robots.txt` (allow all, sitemap reference)
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
