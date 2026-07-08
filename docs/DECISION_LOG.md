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

---

### 2026-07-09 — Crystalline / Crystalline Black repositioned away from tint darkness, per owner's content audit

**Context:** Owner supplied `3m_carcare_basic_product_service_audit.xlsx`, a sitewide audit of what each product page's copy actually communicates vs. what it should, grounded in the owner's real product/positioning knowledge (768 mentions scanned, 13 flagged P0/miscommunication-risk, 52 P1). 12 of the 13 P0 items concentrated on `3m-crystalline.html` and `3m-crystalline-black.html`: both pages led with "ความเข้ม/ความเป็นส่วนตัว" (tint darkness/privacy) as the primary sell, when the real differentiator is the Multi-layer Optical Film heat-reduction technology — the image stays bright/clear without needing a darker tint, and darkness/privacy is a secondary, optional trait, not the headline.

**Decision:** Rewrote all 12 flagged points (meta title/description/og/twitter tags, H2, lead, and body paragraphs on both pages) to lead with the heat-reduction/technology story instead of tint darkness, without deleting the legitimate shade-comparison content (CR20/CR40/CR70, CR BLK 15–60 still describe real darkness options — those weren't touched, since offering shade choice is factually correct, only the *primary positioning* was wrong). Also added one new detail supplied directly by the owner as an in-person "expert aside" they use with customers — the outer glass surface reflects a faint red tone when wet, a genuine Multi-layer Optical Film trait — as a `.micro-note` (the site's existing quiet-aside style) rather than a promotional feature card, to match the low-key, non-hype tone the owner described using face-to-face, not a headline claim.

**Why:** The owner's own audit file is first-party source material for what the product actually is — same evidentiary weight as the P0#1 domain decision. The 13th flagged P0 item (a Ceramic Coating micro-note distinguishing it from PPF) needed no change — it was already correctly worded, so it was left untouched rather than edited for the sake of editing.

**Status:** All 12 P0 points implemented and verified live (DOM text extraction + overflow check on both pages, screenshot tooling was intermittently unavailable this session so visual confirmation relied on computed-layout checks instead). P1 items (52, spanning Ceramic Ultra Clear / Wrap Film / PPF) are queued next; PPF specifically is blocked pending owner confirmation of Self-healing/Top coat claims — see `docs/SPRINT.md`.

---

### 2026-07-09 — Crystalline Black was an orphaned page; rebuilt its positioning from 3M's own launch material

**Context:** While reviewing the Crystalline shade lineup, the owner asked where the Crystalline Black page had gone. Investigation found the page (`3m-crystalline-black.html`) was fully unreachable from the live site: no card/link on `window-film/index.html`, no cross-link from `3m-crystalline.html` (despite Black linking back to it), missing from `sitemap.xml`, and still carrying a stale `<!-- TODO: canonical tag blocked pending P0#1 -->` comment left over from before that domain decision was resolved on 2026-07-08 — this one page was missed in that batch. The owner also flagged that Crystalline Black is 3M's new flagship automotive film, not a minor variant, so it needed prominent placement, not just a link fix.

**Decision:** Fixed the orphaning (canonical tag, sitemap entry, hub-page card, reciprocal cross-link) and gave it top billing on `window-film/index.html`'s FILM ARCHITECTURE section (first card, ahead of standard Crystalline, plus a COMPARISON table row and a SELECTION GUIDE entry). Also rewrote its positioning copy: research on 3M's official Crystalline Black launch page (`engage.3m.com/crystallineblk`) showed the previous copy's differentiator ("darker tone, better filtering, longer warranty") missed the real story — 3M's own material says the update replaces the standard series' "earthy/tea tone" with a neutral black/grey profile that matches OEM glass more closely, and calls it "the next generation" / "our most advanced automotive window film." Rewrote the hero, POSITIONING, and CRYSTALLINE FAMILY sections around that, and added an EV/AC-load-reduction angle (also from the same 3M source) as a new CORE TECHNOLOGY card. This also required narrowing a claim added earlier the same day on `3m-crystalline.html` ("every shade in the Crystalline family has a tea tone") to explicitly scope it to the standard series (CR20–CR70) — Crystalline Black's whole point is moving away from that tone, so the unscoped claim would have contradicted its own positioning.

**Why:** First-party 3M launch material is the strongest available source for what's actually new about this product — stronger than guessing at a differentiator. The prominent placement follows directly from the owner's flagship framing, not a redesign call made unilaterally.

**Status:** Implemented and verified live (links resolve, cross-link both directions, no layout overflow). Hero/card images are still placeholders (reused Crystalline photo) — owner said real Crystalline Black photos exist and will be swapped in separately.
