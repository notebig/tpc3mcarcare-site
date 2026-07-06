# AI Team — Operating Notes

How AI assistance is used on this project, and the conventions that keep work consistent across sessions.

## Roles used on this project

- **Lead Frontend Engineer** — audits, structure/UX/SEO/performance/accessibility review, prioritization. Review-only unless explicitly asked to implement.
- **Implementer** — makes the actual HTML/CSS edits (pricing tables, contact info, image swaps), verifies in a live preview before handing back.
- **First-time customer (persona review)** — used for quick gut-check reviews of a page from a cold visitor's perspective; review-only, no code.

Default to **review-only** when a prompt frames the request as an audit, persona review, or report. Only touch files when the user explicitly says to implement, fix, or update.

## Local dev environment

- Static site, no build step. Pages are plain HTML including shared `partials/header.html` and `partials/footer.html` via `assets/js/include.js` (fetches them client-side).
- **Preview via `preview_start` (Node-based) does not work on this machine** — Node.js is not installed, and the Python fallback hits a macOS sandbox restriction (`PermissionError` on `os.getcwd()` / module imports) specific to how the preview tool spawns processes.
- **Working alternative: XAMPP.** The project is symlinked into XAMPP's htdocs:
  `/Applications/XAMPP/xamppfiles/htdocs/tpc3mcarcare-site` → this repo.
  Site is reachable at `http://localhost/tpc3mcarcare-site/`.
- That symlink required a one-time fix: `~/` and `~/Documents` had `750`/`700` permissions, so Apache's worker (user `daemon`) couldn't traverse into the repo. Fixed with `chmod o+x ~ ~/Documents` (not a TCC/Full Disk Access issue — plain POSIX permissions).
- For quick one-off checks, `python3 -m http.server` launched via Bash (not via `preview_start`) also works and was used before XAMPP was set up.
- Browser verification is done with the `claude-in-chrome` tool set (navigate, screenshot, console/network inspection, JS eval for layout checks like overflow).

## Git conventions

- **An auto-commit hook is active on this repo** — file edits get committed automatically with short, often single-word messages (matches the pre-existing commit history style: `slide`, `css`, `img`, `set price`, etc.). This is a pre-existing project convention, not something introduced by AI sessions.
- Do not use `--no-verify` or bypass hooks.
- Prefer new commits over amending; only commit when the user asks (the auto-commit hook may already have committed a change before an explicit ask — check `git status` first).

## Content/data handling

- Real business photos live outside the repo (`~/Desktop`, `~/Downloads`, `/Volumes/Work_SSD/export/`). When asked to source real images, check there before reusing placeholder assets.
- Pricing data comes from photographed price sheets the owner provides in chat — transcribe carefully, verify totals/columns before writing into HTML, and flag any service tier mentioned in existing copy that has no price data yet (don't invent numbers).
- Never invent business facts (customer counts, specific shop names for "nearby amenities", review quotes, etc.) that aren't confirmed by the owner.

## Known environment quirks worth remembering

- `sips` (macOS) cannot convert to WebP. Use Python + Pillow (`pip install Pillow`) for image conversion/cropping instead.
- Screenshot tool capture width is not always 1:1 with the actual browser viewport set via resize — verify real layout state with `document.documentElement.scrollWidth/clientWidth` via JS eval, not just visual screenshots, especially for overflow/responsive checks.
- CSS changes can appear not to work immediately due to browser caching of the stylesheet — reload with a cache-busting query string (`?v=2`) before concluding a fix didn't apply.
