# Learning, by making. — Naresuan portfolio

A personal learning portfolio by **onlie-decoder**, prepared to support an application to Naresuan University. It presents the development of an HTML-to-PDF study workflow, the author's reusable `SKILL.md`, and the archived PDF outputs.

**[Open the portfolio](https://onlie-decoder.github.io/robbins-pathology-naresuan-portfolio/)**

## Explore

- Selected Neoplasia and Genetic & Pediatric Diseases editions, followed by earlier work and every additional archived PDF.
- A keyboard-accessible first-page comparison, source skill viewer with two versions, and all existing links to annotated notes.
- An elephant constellation inspired by the supplied university seal, with static fallback and reduced-motion support.

The site is an independent portfolio, not an official university website. Existing PDF contents and original Drive note destinations are preserved. No medical content was changed in the interface redesign.

## Run locally

This is a static site with no build step or frontend runtime dependencies:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`. `index.html`, `assets/portfolio.css` and `assets/portfolio.js` are the active presentation files. Fonts are served locally; their Open Font Licenses are under `assets/fonts/`. Source skills are loaded only when requested; PDFs are opened through links.

## Verify preservation

The optional developer verifier uses Python and Beautiful Soup:

```powershell
python tools/verify_portfolio.py
node --check assets/portfolio.js
git diff --check
```

It checks PDF hashes against the pre-redesign revision, every PDF destination, all original note URLs, principle IDs, source skill preservation, and local assets. See [review and measurements](docs/portfolio-review.md) for scope, fixes, measurements, and limits.

## Complete PDF archive

| Original file | Pages | File size |
| --- | ---: | ---: |
| [chapter11_pathology_deep_th.pdf](pdf/chapter11_pathology_deep_th.pdf) | 7 | 0.3 MB |
| [chapter1_pathology_deep_th.pdf](pdf/chapter1_pathology_deep_th.pdf) | 13 | 14.1 MB |
| [chapter3_pathology_deep_th.pdf](pdf/chapter3_pathology_deep_th.pdf) | 13 | 8.0 MB |
| [chapter4_pathology_deep_th.pdf](pdf/chapter4_pathology_deep_th.pdf) | 8 | 6.7 MB |
| [chapter5_pathology_deep_th.pdf](pdf/chapter5_pathology_deep_th.pdf) | 11 | 6.3 MB |
| [chapter6_pathology_deep_th.pdf](pdf/chapter6_pathology_deep_th.pdf) | 8 | 2.5 MB |
| [chapter7_pathology_deep_th.pdf](pdf/chapter7_pathology_deep_th.pdf) | 17 | 6.4 MB |
| [chapter8_infectious_diseases_summary.pdf](pdf/chapter8_infectious_diseases_summary.pdf) | 6 | 0.5 MB |
| [neoplasia_complete_illustrated.pdf](pdf/neoplasia_complete_illustrated.pdf) | 47 | 8.1 MB |
| [robbins_chapter6_neoplasia_complete_17p.pdf](pdf/robbins_chapter6_neoplasia_complete_17p.pdf) | 17 | 6.4 MB |

Sizes use decimal MB. Original filenames and file bytes have been kept, including alternate archived copies.

## Source material

Pathology source material and illustrations in the existing study documents belong to their original authors and publishers, including Elsevier and the Robbins textbook authors. The portfolio is for education and presentation of a personal learning process. The original source skills are maintained under `skill/`; the site explains that declaring an instruction “Always-Load” does not itself guarantee automatic loading by every harness.
