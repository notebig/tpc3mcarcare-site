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
