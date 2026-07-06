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
