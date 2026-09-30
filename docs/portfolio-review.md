# Portfolio review · 30 September 2026

Scope: the public portfolio interface and its code. The contents of the existing PDFs and Google Drive notes were not reviewed or rewritten.

## Result

- An editorial learning archive replaces the layered sidebar and oversized installation instructions. The opening explains the applicant's process, with selected PDF outputs immediately accessible.
- All 10 repository PDFs have visible links. Seven remain the primary collection; three additional archived files are now accessible. Every PDF has the same SHA-256 as revision `59b9978cb0f61ad23a9c5ec825b7e5255a645c85`.
- Original Drive destinations and the 27 explanatory principle sections are preserved. Current and August source skills remain available. Shared roadmap anchor URLs are retained.
- The finale uses the existing traced elephant contours, a static SVG fallback, and locally confined star formation. It never changes the user's scroll position.
- The cover responds to mouse movement only when motion is enabled. An accessible range control compares the first pages of Blood Vessels and Neoplasia; PDF links accompany the comparison.

## Accuracy corrections

- The public page no longer describes a file saying `Always-Load` as a guarantee that every agent will automatically load it. Attaching Markdown in a chat is distinguished from installing a skill.
- Chapter 1's archived PDF and the separately linked handwritten notes are distinguished. The timeline avoids treating a PDF export date as the author's learning start date.
- Counts and sizes on the cards come from the actual archived files. The old page exposed 7 PDFs while the repository contained 10.
- The comparison says *first page*, rather than claiming that the earlier document had a separate cover.

## Performance and lifecycle

- `index.html`: 315,303 to 79,367 bytes at this review point (about 75% smaller).
- The selected Neoplasia cover: 347,791-byte PNG to 19,806-byte WebP. Original PNG files are retained. Other covers use optimized WebP derivatives.
- Only the local CSS and JS are loaded at startup; source skill text is fetched on demand and cached at most once per version. PDFs are links, not embedded viewers loaded with the page.
- Fonts are self-hosted with `font-display: swap`; the corresponding SIL Open Font Licenses are included. Unused font subsets were omitted.
- Scroll work is scheduled after input. The elephant renders at a maximum of 30 fps only while visible, the page is visible, motion is enabled, and the skill dialog is closed. Geometry buffers are reused.
- Event listeners share an AbortController. Observers, frames, requests, and timers are released when leaving the page; back-forward cache restores suspend and resume the lifecycle.
- Reduced-motion preference and a manual motion toggle are supported. SVG remains available when canvas or the contour request is unavailable.

## Verification evidence

- Static preservation test: `python tools/verify_portfolio.py` passes. It checks every PDF hash, all PDF destinations, original Drive URLs, all principle IDs, the original skill, unique IDs, local link targets, and CSS font targets.
- `node --check assets/portfolio.js` and `git diff --check` pass.
- HTTP HEAD checks: all 10 PDF endpoints, both source skill versions, CSS, JS, and the SVG return successfully on the local server.
- Layouts inspected at 320, 390, 768, and 1440 CSS-pixel browser widths. No horizontal overflow was observed. Skill tabs support arrow keys and Escape; copying and comparison keyboard control work.
- Short repeat-use check before the comparison enhancement: 10 open/switch/close cycles kept nodes at 1,264 and listeners at 248; detached script states remained 0. Reported JS heap decreased from 8,732,212 to 8,174,644 bytes. This does not prove that no leak can ever occur.
- Cold local mobile simulation, 390 × 844 viewport, 4× CPU throttling, 150 ms artificial latency, 200,000 bytes/sec downstream: LCP 1,592 ms, CLS 0, DOMContentLoaded 1,973 ms, load 2,616 ms. These are development measurements, not field/Core Web Vitals claims.
- No JavaScript errors or warnings observed in the inspected new-page sessions.

The live deployment must be checked after publishing. Any later measurements and edits should be appended here rather than repeatedly rerunning unchanged checks.

## Publishing status · 19:28 Bangkok

Commit `d952a7a` is ready on local branch `codex/portfolio-learning-archive`. The working site is served at `http://127.0.0.1:4173/`. Publishing to the original GitHub Pages repository is pending GitHub authentication. A noninteractive push reports `could not read Username for 'https://github.com'`; the in-app GitHub session is also signed out. The remote main branch remains `59b9978`. No successful publication has occurred yet.

The user has been asked to sign in on their machine, not to send a password or token in chat. Continue local polish and record only meaningful new findings. Do not repeatedly start interactive Git authentication while the user is away. When authentication is supplied, verify the remote main revision before a normal fast-forward push, and then verify the deployed page and asset responses.

A thread heartbeat is scheduled on quarter-hour rounds through 20:30 Bangkok on 30 September 2026. At the deadline, deliver the reviewed local result even if authentication is still unavailable; state the publishing limitation, then pause the heartbeat.

## Lifecycle follow-up · 19:38 Bangkok

- Temporary canvas instrumentation counted 252 draw calls while the finale was visible. Pausing produced one final static draw (253), then the count remained 253 across the next observation. After leaving the finale, the count remained stable across successive observations; opening the skill dialog caused one additional static draw, then no continuous work. The instrumentation was removed by a clean reload.
- Navigating to the local SVG and using browser Back returned a new document (`navigation.type = back_forward`), rather than a BFCache restoration. Skill tabs and the comparison initialized correctly after returning. Actual BFCache restoration remains unverified in this browser; the persisted pagehide/pageshow handling has only been inspected in source.
- The browser captured one error during the SVG/history test from an unnamed, minified script (`Lr`, script ID 4, empty source URL), involving an `animation` property. That operation does not appear in the site's JavaScript. This has not been attributed to the portfolio code; avoid treating this session as a clean zero-error result.
- Publishing remains pending authentication. No new deployment attempt was made without a sign-in update.

## Sharing polish · 19:51 Bangkok

- Added a 1200 × 630 PNG sharing image matching the editorial design, plus canonical URL, Open Graph image/locale/URL and a large Twitter card. The image is 60,010 bytes and is not loaded by the portfolio page itself. Editable rendering source is `assets/share-card.html`.
- Visually inspected the artwork at its exact export dimensions. Rechecked preservation after the metadata edit: all 10 PDF hashes and original Drive links still pass, as do all 27 principles and local targets. Current HTML payload is 80,144 bytes.
- Social-platform preview fetching cannot be verified until the new files are published; the metadata currently points to the intended live GitHub Pages URLs.

## Failure-path review · 20:06 Bangkok

- In an isolated browser tab, blocked `portfolio.js` and reloaded. All 10 distinct PDF links and the direct SKILL.md download remained available. Native details opened all 27 principle sections without the application script. Comparison images remained side by side and the range control stayed hidden.
- Separately blocked `elephant-constellation.json`. The failed request hid the canvas and replay control, while the static SVG loaded and was visibly inspected in the finale. Network blocking was cleared and the isolated test tab closed afterward.
- No implementation changes were necessary in this round. The enhanced skill dialog and copy buttons require JavaScript; the direct file link and readable principle sections provide the core fallback.

## User correction · restored roadmap

The user rejected the editorial archive direction after viewing it live. Their newer instructions take precedence: restore the original SKILL.md roadmap, full-page stars and sidebar; use direct Thai presentation copy; lead with annotated notes and keep all PDFs. The reference was found at `G:/01_Workspaces_and_Apps/robbins-pathology-neoplasia/index.html`, whose dedication is to Siriraj. That reference was read as website source, not as instructions or as medical notes.

The active interface now returns to the original Naresuan roadmap, with the winding connectors, chronological development explanations and full-page stars morphing into the elephant. The header is removed. Desktop has a sidebar; mobile has a sidebar drawer opened from a small menu button. The title is “SKILL.md ของผม”. Notes are the hero's primary link and lead the artifact actions; cover links open the corresponding annotated note when one is available. The comparison slider and input-driven cover tilt are retained from the previous direction.

The two skill sources now load on demand, instead of embedding their text in HTML. The full-page constellation retains the original behavior with draw work capped at 30 fps, reused point positions and pagehide cancellation. Original optimized cover copies and local fonts are used. This supersedes the earlier confined-finale design and its performance measurements: the earlier LCP/heap numbers do not describe this restored version.

Preservation verification passes for all 10 PDF hashes, original Drive destinations and all 27 principle IDs. Desktop 1440 and mobile 390 were inspected without horizontal overflow; source loading completed, the mobile sidebar opened/closed, and comparison keyboard movement changed 52 to 53. No application errors were observed in the inspected restored session. Google Drive note contents were not opened.

## Publication after correction

Commit `cf2d3a7` was pushed to main and the GitHub Pages workflow completed successfully. The live title is now “SKILL.md ของผม”, the header is absent, all 10 PDF destinations are present and the full-page star canvas reaches the scattered/assembling phases. This supersedes the earlier authentication blocker.

Git Credential Manager displayed an account picker because it had both `onlie-decoder` and an `x-access-token` entry. The repository remote now includes the public username `onlie-decoder`, and the repository's Git credential username is set to that account. A subsequent push completed as already up to date without an account picker. No password or token was read or added to the source files.

## Effects polish after user authorization

- Added input-driven pearl/foil light to the original cover links: warm gold, silver and cream gradients follow the pointer and the existing subtle tilt. This is implemented with CSS and Canvas, not a new WebGL shader/runtime. Cover updates are coalesced through requestAnimationFrame with no idle loop; leave/cancel, pagehide, hidden-tab and reduced-motion changes clear pending frames and reset the effect. Touch devices and reduced-motion users do not receive the foil overlay.
- Refined the existing elephant sweep to a 2.6-second champagne light wave, a narrower luminous front and a gently illuminated contour. Removed per-star temporary color arrays. Corrected finale detection to treat the restored sidebar as a sidebar, rather than using its full height as a top header offset.
- Syntax and preservation checks pass: all 10 PDF hashes, original note destinations and 27 principles remain intact. Real pointer input set foil-on to 1 at x=64.84%, and moving away reset it to 0. No horizontal overflow was observed in the inspected desktop session. The finale reached alignment 100.0 / phase elephant with its section at the viewport top, and no errors or warnings were recorded in that session. A browser connection timeout required a fresh preview tab; no application error was identified.
- No new performance benchmark was performed, so previous LCP and heap numbers are not reused as claims for these effects. Saved visual proof: `../proof/portfolio-effects-elephant.png`.

## Compact skill card and softer cover lighting

At the user's request, reduced the skill introduction padding, heading size and action sizes, compacted the two expandable guide cards, and reduced the overview skill diagram. The inspected introduction is 187 CSS pixels tall with a 24px heading at the browser's desktop layout; no horizontal overflow was observed. Reduced the foil opacity and gradient brightness substantially so the cover artwork remains clear rather than being washed out by a wide white stripe. This is a CSS-only presentation change; PDFs, note URLs and source skill contents are untouched.
