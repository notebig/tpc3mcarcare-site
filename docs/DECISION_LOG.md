# Decision Log

Record of non-obvious decisions and why they were made, so future work doesn't re-litigate them or accidentally reverse them without knowing the reason.

---

### 2026-07-05 — Local preview: fix filesystem permissions instead of granting Full Disk Access

**Context:** XAMPP's Apache returned 403 (`Symbolic link not allowed or link target not accessible`) when serving the site via a symlink into the repo under `~/Documents`.

**Decision:** Traced the real cause to plain POSIX permissions (`~` was `750`, `~/Documents` was `700` — Apache's `daemon` user isn't in the owning group). Fixed with `chmod o+x ~ ~/Documents`, not by granting Full Disk Access to httpd in System Settings.

**Why:** Full Disk Access is a macOS privacy/TCC control meant for Documents/Desktop/Downloads protection; it wasn't the actual blocker here (verified via `stat`/`ls -ld` and Apache's own error log). Loosening a filesystem permission bit is smaller-scoped, reversible, and doesn't touch system security settings.

---

### 2026-07-05 — Real work photos sourced from `~/Desktop` and `~/Downloads`, not stock

**Context:** Homepage "portfolio" and Car Wash service images turned out to be the same duplicate placeholder photo repeated across files.

**Decision:** Used the owner's own phone photos and Facebook-downloaded shop photos (found in `~/Desktop`, `~/Downloads`) instead of any new stock imagery, cropped to the site's 16:10 card ratio and converted to WebP via Python/Pillow.

**Why:** Real photos of the actual shop/work build more trust than stock photography, and the owner already had usable material sitting unorganized on their machine. Avoided any photo with a visible license plate for privacy.

---

### 2026-07-06 — Pricing tables use the price-sheet's own program codes (B1–BX, W1–W3, P1–P5, C-series), not renamed to match existing marketing copy

**Context:** The Car Wash page already had a "Wash Program Architecture" section using codes **W1/W2/W3** for wash-intensity tiers (Maintenance/Decontamination/Intensive). The owner's price sheet also uses **W1/W2/W3** for a completely different thing — Paint Care/Wax tiers (Basic/Plus/Premium Wax).

**Decision:** Kept both sets of codes as-is (didn't rename either) and added an explicit note under the Wax pricing table clarifying the two W1–W3 labels refer to different things.

**Why:** The codes come directly from the owner's official price sheet — renaming them would create a mismatch between the website and the printed/physical price list customers may already see in person. A clarifying footnote was judged sufficient and lower-risk than a rename.

---

### 2026-07-06 — Pricing added as new sections, not merged into existing tier copy

**Context:** Paint Correction already described Level 1/2/3 (Light/Moderate/Intensive) qualitatively; the price sheet has 4 tiers (P1–P4) plus a 5th (Spot Polish) with different naming.

**Decision:** Added the price table as its own section with a short note connecting Level 1–3 to Polish LV.1–3, rather than rewriting the existing descriptive copy to match the sheet's naming exactly.

**Why:** Lower risk — avoids reworking prose that was already reviewed/approved, and keeps the pricing data clearly sourced from the price sheet rather than blended into marketing language that could drift from the source numbers over time.

---

### 2026-07-06 — Mobile pricing tables get a horizontal-scroll wrapper, not column dropping

**Context:** New 7-column price tables (code/program/detail/S/M/L/XL) overflowed the page horizontally on mobile viewports (~390–430px).

**Decision:** Wrapped each price table in a `.table-scroll` div (`overflow-x: auto`) instead of hiding columns or restructuring the table for mobile.

**Why:** Keeps all pricing data visible and comparable at every screen size (dropping columns would hide prices, which is the one thing this page exists to show). Verified via direct DOM measurement (`scrollWidth`/`clientWidth`) rather than relying on screenshots alone, since screenshot capture width didn't reliably reflect the real viewport in this environment.

---

### 2026-07-06 — Homepage audit and customer-persona review were review-only, no implementation

**Context:** Asked to act as "Lead Frontend Engineer" for a full homepage audit, then as a first-time customer for a 30-second gut-check review.

**Decision:** Delivered both as reports/analysis only — no file changes — even though several items overlap with fixes already known to be needed (e.g., duplicate images).

**Why:** Explicitly requested as review-only. Findings were captured in `SPRINT.md` so they aren't lost, but implementation waits for an explicit go-ahead per item.

---

### 2026-07-06 — Approved long-term product architecture (V3), analysis only

**Context:** Business plans to keep launching new 3M products (first two: 3M Crystalline Black, 3M Graphene Shine Coating) over the next 3–5 years. Needed a scalable hierarchy that doesn't require redesigning nav or URLs each time.

**Decision:** Approved a 3-level **Family → Line → Variant** product tree. Family (6 services) stays frozen and mapped to the flat nav forever — all growth happens at Line/Variant level via internal links only, never via nav. New pages get full descriptive URL slugs (no abbreviations); existing 17 live URLs are never renamed or moved (no redirect mechanism exists on this static host). Added a **Content Architecture** layer alongside the product tree:
- **Nested in product pages:** Reviews (hand-curated component, no CMS exists so nothing can be user-submitted live)
- **Parallel trees:** `knowledge/{slug}.html` (education + comparison pages, allowed to cross-link between Families) and `case-studies/{slug}.html` (portfolio/proof content, distinct intent from Knowledge)
- **Ephemeral, not tree nodes:** Campaigns (homepage banner slot) and Promotions (one reused `/promotions/index.html`) — deliberately NOT permanent pages, since a static site with no CMS would otherwise accumulate dead seasonal pages indefinitely

Two decisions were deliberately left flexible rather than automatic: sitemap inclusion for Variant pages is judged per-page by real search intent/content uniqueness (not "always include Level 3"), and `Product` schema adoption is a standalone strategic decision revisited periodically, not a mandatory step in every product launch.

**Why:** Keeps the current architecture's real strengths (flat nav, no dropdown infra needed, stable URLs) while fixing gaps found under review: sitemap missing legitimate Level-3 pages (IR05/15/25), no plan for discontinued/renamed products, and campaigns/promotions having nowhere to live without polluting the permanent tree. Deferred: consolidating the two parallel CSS systems (`tokens/core/layout/components` bundle vs `service-premium.css`) into one — real maintenance cost, but not urgent enough to block this architecture approval.

**Status:** Architecture only — no files changed. Implementing Crystalline Black / Graphene Shine Coating pages still blocked on real specs, warranty terms, VLT/IR rejection figures, and pricing from the owner.

---

### 2026-07-07 — Font/logo brand-asset evaluation: use logos selectively, don't adopt 3M's typeface

**Context:** The owner's reference material includes official 3M assets: the `3M CIRCULAR TRUETYPE` font family (8 weights/styles) and several real logo/lockup files, including one (`crystalline-master-logo-.png`) that's a co-branded lockup of the shop's own "3M Car Care The Pro's Choice" mark next to the official "Crystalline" product logo. Evaluated whether to adopt either into the site.

**Decision:** Recommend using the official product logo marks (Crystalline, Ceramic Coating, PPF) as small trust badges on their respective service pages — but do NOT adopt the 3M Circular typeface sitewide. Neither is implemented yet; this is analysis only, pending owner approval.

**Why against the font:**
- 3M Circular is a Latin-only display face — it wouldn't touch any Thai body copy, which is the vast majority of this site's text. The visual impact would be limited to English headings/eyebrows.
- It's 3M's own proprietary corporate typeface. Whether an authorized reseller is licensed to embed it on their own public website (versus using it only in 3M-supplied print/marketing templates) is a brand-usage question the owner would need to confirm with 3M, not something to guess at.
- Real performance cost: 8 raw TTF files (not web-optimized woff2) would need subsetting and a `@font-face` strategy to avoid a page-weight regression, on a site that currently ships zero custom webfonts.
- Highest possible blast radius — touches typography on every one of the 17+ live pages — for a purely cosmetic gain, while known conversion-blocking gaps (real photos, testimonials) remain unaddressed. Not worth prioritizing ahead of that.

**Why for the logos:** Displaying a product's own official 3M logo mark next to that product's page is standard authorized-dealer practice (the shop already does this physically in-store — visible in several reference photos). Low blast radius (a handful of small badge placements, not a redesign) and reinforces authenticity precisely where it's most relevant (Crystalline, Ceramic Coating, PPF pages).

**Status:** Recommendation only — no CSS or HTML changed. Needs owner sign-off before implementing the logo badges; typeface adoption is not recommended for now.

---

### 2026-07-08 — Resolved P0#1: production canonical domain is `tpc3mcarcare.com` (non-www)

**Context:** P0#1 had been explicitly marked BLOCKED (2026-07-07) after DNS/HTTP investigation found both `tpc3mcarcare.com` and `www.tpc3mcarcare.com` resolving identically, with no evidence in the repo or deployment config indicating the intended hostname — the owner was asked to make the call rather than have it guessed.

**Decision:** The owner supplied a local copy of the actual current live production site's source (`/Applications/XAMPP/xamppfiles/htdocs/tpc3mcarcare/`, a completely separate, older codebase from this repo). That real site's own canonical tag, og:url, og:image, twitter:image, hreflang alternate, and JSON-LD (url/image/logo) all consistently use `https://tpc3mcarcare.com` — non-www — with zero www references anywhere in the file. Adopted non-www as the confirmed production domain and updated all 13 files in this repo that still had www-form canonical/OG/JSON-LD references to match (domain form only, no path changes). This also matches `robots.txt`/`sitemap.xml`, which were already non-www.

**Why:** First-party evidence from the actual live site is decisive — stronger than the inconclusive DNS/HTTP behavior that blocked this originally. No guessing was involved; the owner directly pointed to the source of truth.

**Status:** Implemented. `services/ceramic-coating/special-care.html` and `services/window-film/defender-nano-ceramic.html` have since had their canonical tags added too (2026-07-08, same day) — the V1 Launch Readiness P0 list is now fully closed.

---

### 2026-07-08 — Hero background images: moved from CSS custom property to inline `background` (supersedes the 2026-07-06 "left unchanged" entry)

**Context:** User reported every page's hero background photo was missing. Investigation found the real cause: hero sections set an inline custom property with a relative path (`style="--hero-bg:url('../../assets/images/x.webp')"`), consumed via `var(--hero-bg)` inside the `background` shorthand of an *external* stylesheet (`service-detail.css`, `home.css`, `services.css`). Per the CSS spec, a relative `url()` inside a custom property resolves against the stylesheet where `var()` is substituted, not the document that set the property — so every one of these resolved to the nonexistent `assets/assets/images/x.webp` (the stylesheet lives at `assets/css/pages/`, and `../../` from there lands back on `assets/`, doubling the segment). This is a different, more fundamental bug than the one noted on 2026-07-06 (which was about `/assets/...` absolute paths breaking under local XAMPP subfolder hosting) — that decision's "left unchanged, revisit once deployment target is known" no longer applies as-is, since relative paths turned out to be broken everywhere, not just locally.

**Decision:** For the 16 pages where the hero image is a direct `background` on the real element (`service-detail.css`, `home.css`, `services.css` — everything except car-wash/paint-correction/wrap-film), moved the full `background` (gradient + image, same relative path) inline onto each page's own hero section, and removed the now-dead `var(--hero-bg)` reference from the 3 stylesheets. Inline `url()` resolves against the *document*, sidestepping the bug entirely, and works correctly both locally and in production regardless of root-vs-subfolder hosting. For `car-wash`, `paint-correction`, and `wrap-film`, the image lives on a `::before` pseudo-element (for a Ken-Burns zoom animation) — pseudo-elements can't be given inline styles, so these three keep the custom-property pattern but switched to an absolute path (`/assets/images/x.webp`), which resolves correctly from any context. This means those 3 pages' heroes will still show a plain gradient under local XAMPP subfolder testing (`localhost/tpc3mcarcare-site/...`), but will render correctly once deployed at the real production root — same tradeoff the 2026-07-06 entry already accepted for absolute paths generally.

**Why:** Root-cause fix beats a per-path patch — this bug affected literally every hero on the site, and would have resurfaced on every future page built from these templates if left as relative-path custom properties. Inline `background` is the correct, spec-predictable choice for the 16 pages where it's possible at all; absolute paths remain the only option for the pseudo-element-based animated heroes.

**Status:** Implemented and verified live (screenshot + computed `backgroundImage` inspection) for the 16 inline-fixed pages. The 3 pseudo-element pages are correctly using absolute paths but can't be visually confirmed until the site is deployed at its real domain root.

---

### 2026-07-08 — Hero images on car-wash/paint-correction/wrap-film now work locally too, no more absolute-path tradeoff

**Context:** User confirmed the 3 pseudo-element pages (car-wash, paint-correction, wrap-film) still showed no hero photo under local XAMPP testing — the expected, already-documented consequence of the absolute-path fix above.

**Decision:** Replaced the absolute-path `--hero-bg` custom property with per-page CSS rules directly in `service-premium.css`, keyed by a unique `id` added to each page's `<body>` (`page-car-wash`, `page-paint-correction`, `page-wrap-film`), using a path relative to the stylesheet's own location (`../images/x.webp`). A relative path from the CSS file always resolves the same way regardless of whether the site is served from a domain root or a subfolder, since it's anchored to the stylesheet's fixed location, not the page's. This removes the local/production asymmetry entirely — no more caveat needed.

**Why:** The custom-property/pseudo-element constraint (from the earlier entry) still applies — `::before` can't take an inline style — but scoping by body `id` in the external stylesheet gets the same "resolve relative to a fixed, known location" benefit that inline styles gave the other 16 pages, without needing inline styles at all.

**Status:** Implemented and verified live on all 3 pages (computed `backgroundImage` + image HEAD request + screenshot, after confirming a stale cached copy of `service-premium.css` in the test browser — not the fix itself — was the reason for an initial "still blank" false alarm).
