---
name: html-to-pdf-textbook
description: ALWAYS-LOAD CRITICAL SKILL: Automatically loaded and enforced for ALL tasks involving reading, summarizing, designing, structuring, or printing medical and technical study materials, chapter summaries, textbook layouts, or educational HTML-to-PDF documents. Enforces non-negotiable pedagogical image sourcing, local Base64 micrograph embedding, mood-palette CSS, zero-slop typography, and Playwright print compilation.
---

# HTML to PDF Textbook Generator Skill

> **CRITICAL AGENT LOADING DIRECTIVE (ALWAYS LOADED)**:
> This skill is **permanently active and automatically loaded** whenever summarizing textbooks, reading educational chapters, creating study modules, or compiling learning materials. It is not an optional post-processing tool; it governs the entire pedagogical architecture from primary image extraction and cellular morphology validation to HTML layout structure and Playwright PDF printing. Follow all 27 principles strictly without exception.

## 🎯 1. Educational Picture Sourcing & Intent Alignment Logic

- **Direct Pedagogical Intent**: Every image selected MUST directly demonstrate and explain the key morphological, cellular, or pathological concept being taught in the text.
  - *Example (Epithelium)*: Must clearly show distinct columnar cells, apical microvilli brush border, and basal oval nuclei under microscope.
  - *Example (Muscle)*: Must clearly show high-magnification 400x transverse cross-striations and peripheral multinucleation.
  - *Example (Granulation Tissue)*: Must show active CD31+ capillary neovascularization, proliferating myofibroblasts, and edematous ECM (*Robbins Ch 3*).
- **Strict Ban on Informal Sketches & Notebook Drawings**: NEVER use hand-drawn student notebook pages, unverified sketches, or low-resolution 19th-century historical scans.
- **Gold-Standard Medical Textbook Sourcing**: Source exclusively from peer-reviewed repositories such as **OpenStax Anatomy & Physiology (CC-BY 4.0)** or **Wikimedia Medical Commons** using explicit, verified file titles.

---

## 📸 2. High-Resolution Base64 Embedding Strategy

- **NEVER rely on live network HTTP requests or low-resolution thumbnail caps (e.g. 800px or 512px) during PDF export.**
- **Always fetch Full HD / Maximum Resolution (1920px+ or Original)** peer-reviewed medical histology micrographs or anatomical figures.
- **Local Base64 Data URI Embedding:** Convert all downloaded image assets directly into Base64 Data URIs (`data:image/jpeg;base64,...`) before injecting into the HTML template.
- **Why:** Base64 embedding eliminates Chromium CORS sandboxing errors, network latency timeouts, and missing image artifacts during headless PDF rendering while guaranteeing maximum HD print clarity.

---

## 🎨 3. Chapter Mood Color Palette Architecture

The cover page and primary accent highlights of each chapter PDF **MUST** adapt dynamically to the clinical, pathological, or physiological "feeling" / subject matter of the chapter:

| Chapter Subject Domain | Mood Color Palette | Accent Hex Codes | Clinical Feeling & Theme |
| :--- | :--- | :--- | :--- |
| **Vascular / Hemodynamic / Hematology** | Deep Crimson & Solar Gold | `#991B1B`, `#EF4444`, `#F59E0B` | Blood flow, hyperemia, thrombosis, hemorrhage, shock |
| **Inflammation & Tissue Repair** | Digital Emerald & Bio-Cyan | `#059669`, `#10B981`, `#00F2FE` | Leukocyte recruitment, exudate, granulation, scarring |
| **Neoplasia & Oncology** | Electric Violet & Rose Magenta | `#7C3AED`, `#8B5CF6`, `#F43F5E` | Tumor genetics, dysplasia, metastasis, malignancy |
| **Genetic & Metabolic Disorders** | Solar Amber & Cobalt Blue | `#D97706`, `#F59E0B`, `#0284C7` | Inborn errors, DNA repair, storage diseases |
| **Infectious & Immunologic Diseases** | Deep Navy & Bio-Green | `#1D4ED8`, `#3B82F6`, `#10B981` | Pathogen defense, hypersensitivity, autoimmunity |

```css
/* Dynamic Chapter Mood Color Tokens (e.g. Hemodynamic / Blood Domain) */
:root {
    --cover-theme-primary: #991B1B;
    --cover-theme-accent: #EF4444;
    --cover-theme-secondary: #F59E0B;
    --cover-theme-bg-light: #FEF2F2;
    --cover-theme-border: #FCA5A5;
}
```

---

## 📕 4. Executive Cover Page Architecture (`.cover-page`)

The first page of every textbook PDF **MUST** feature a dedicated Executive Cover Page layout:

```html
<section class="cover-page">
    <div class="cover-header">
        <span class="cover-badge"><i class="fa-solid fa-book-bookmark"></i> ROBBINS & COTRAN PATHOLOGY 10TH ED</span>
        <span class="cover-chap-num">CHAPTER 04</span>
    </div>
    
    <div class="cover-title-group">
        <h1 class="cover-title">Hemodynamic Disorders, Thromboembolic Disease, and Shock</h1>
        <p class="cover-subtitle">ภาวะผิดปกติของระบบไหลเวียนโลหิต ลิ่มเลือดอุดตัน และภาวะช็อกทางพยาธิวิทยา</p>
    </div>

    <div class="cover-meta-grid">
        <div class="meta-card">
            <span class="meta-label">SUBJECT</span>
            <span class="meta-val">General Pathology</span>
        </div>
        <div class="meta-card">
            <span class="meta-label">TARGET</span>
            <span class="meta-val">USMLE Step 1 / Medical Student</span>
        </div>
        <div class="meta-card">
            <span class="meta-label">CORE THEMES</span>
            <span class="meta-val">8 Deep Sections • 21 Figures</span>
        </div>
    </div>
</section>
```

```css
.cover-page {
    width: 100%;
    min-height: 270mm;
    padding: 30px;
    background: var(--bg-card);
    border: 2px solid var(--cover-theme-border);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
}

@media print {
    .cover-page {
        background: var(--cover-theme-bg-light) !important;
        border: 2px solid var(--cover-theme-border) !important;
        page-break-after: always !important;
    }
}
```

---

## 📐 5. Clean Page Margins & Bullet Alignment Safety

### Page Margins
1. **Zero Outer PDF Margins:** Set PDF print margins to `0mm` (or use `--no-pdf-header-footer` flag in Edge CLI) to suppress browser header/footer timestamps and file paths.
2. **Defined Page Dimensions & Controlled Padding:** Control page geometry using explicit `@page` CSS and a `.page` wrapper container with generous inner padding (`padding: 12mm 14mm`).

### Bullet Marker Alignment ("Dot Fell Out of Box" Fix)
To prevent bullet dots (`•`) from hanging outside card borders or falling off the left margin:
```css
ul, ol {
    padding-left: 24px !important;
    margin-left: 0 !important;
    margin-top: 6px;
    margin-bottom: 6px;
}

.analysis-box ul, .bento-card ul, .fig-card ul {
    padding-left: 22px !important;
}

li {
    margin-bottom: 6px;
    line-height: 1.6;
}
```

---

## 🎨 6. Rounded-Corner Tables, KaTeX Math & High-Contrast CSS

### KaTeX Math Printing ("LaTeX Coloring" Fix)
KaTeX generates internal HTML elements (`.katex`, `.mord`, `.mbin`, `.mrel`). In `@media print`, KaTeX elements MUST be explicitly overridden with high-contrast colors so formulas do NOT render as invisible white/gray text on light pages:

```css
/* Screen Mode Math Block */
.math-block {
    padding: 12px 16px;
    background: rgba(15, 23, 42, 0.6);
    border-radius: 10px;
    border: 1px dashed rgba(0, 242, 254, 0.4);
    margin: 12px 0;
    text-align: center;
}
.math-block .katex, .math-block .katex * {
    color: #00F2FE !important;
}

/* Print Mode KaTeX Overrides */
@media print {
    .katex, .katex-display, .katex *, .katex .mathnormal, .katex .mord, .katex .mbin, .katex .mrel, .katex .mopen, .katex .mclose, .katex .mpunct {
        color: #0F172A !important;
        text-shadow: none !important;
    }
    .math-block {
        background: #F8FAFC !important;
        border: 1px dashed #3B82F6 !important;
        color: #0F172A !important;
    }
}
```

### Rounded-Corner Tables (`border-radius: 10px`)
```css
.custom-table {
    width: 100%;
    border-collapse: separate; /* Mandatory for rounded table corners! */
    border-spacing: 0;
    margin: 8px 0;
    font-size: 10.5px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    break-inside: avoid;
    page-break-inside: avoid;
}

.custom-table th {
    background: #1E2436;
    color: #38BDF8;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    text-align: left;
    padding: 7px 10px;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
}
.custom-table th:last-child { border-right: none; }
.custom-table td {
    padding: 7px 10px;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    color: #94A3B8;
    background: #141824;
}
.custom-table td:last-child { border-right: none; }
.custom-table tr:last-child td { border-bottom: none; }
```

### `@media print` Complete High-Contrast Overrides
```css
@media print {
    body {
        background: white !important;
        color: #0F172A !important;
    }
    strong, b {
        color: #0F172A !important;
        font-weight: 700 !important;
    }
    li, p {
        color: #1E293B !important;
    }
    .analysis-box {
        background: #F8FAFC !important;
        border: 1px solid #CBD5E1 !important;
        color: #1E293B !important;
    }
    .analysis-title-text {
        color: #1E3A8A !important;
        font-weight: 800 !important;
    }
    .page {
        background: white !important;
        color: #0F172A !important;
        height: 297mm !important;
        padding: 10mm 12mm !important;
        border: none !important;
    }
    * {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        box-shadow: none !important;
        transition: none !important;
        animation: none !important;
        filter: none !important;
    }
    .custom-table {
        border-color: #CBD5E1 !important;
        border-radius: 10px !important;
        overflow: hidden !important;
    }
    .custom-table th {
        background: #0F172A !important;
        color: #FFFFFF !important;
        border-color: #0F172A !important;
    }
    .custom-table td {
        background: #FFFFFF !important;
        color: #1E293B !important;
        border-color: #E2E8F0 !important;
    }
    .custom-table tr:nth-child(even) td {
        background: #F8FAFC !important;
    }
    .custom-table td strong {
        color: #0F172A !important;
    }
    .bento-card, tr, .stat-card, .callout-box, .custom-table, .fig-card {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
    }
}
```

---

## 🖼️ 7. Dedicated Image Placeholder Frames & Page Breakdown

When creating figure study guides or textbook manuals intended for image pasting/annotation:
- Include a dedicated dashed container (`.image-placeholder`) with a generous height (`~185px–200px`) right below each figure title/subtitle:
```css
.image-placeholder {
    width: 100%;
    height: 185px;
    border: 2px dashed #94A3B8;
    background: #F8FAFC;
    margin: 12px 0 16px;
    page-break-inside: avoid;
}
```
- Always apply `page-break-inside: avoid;` to `.fig-card` containers to ensure each figure card renders cleanly on a dedicated page without awkward page splits.

---

## 🐍 8. Python String Template Safety (Raw Strings)

When compiling HTML templates using Python string interpolation (`f"""..."""`), always use **raw string interpolation** (`r"""..."""`) or explicit `.replace()` placeholder blocks.

- **Why:** In standard Python strings, escape sequences like `\text` translate to `\t` (a TAB character), `\right` translates to `\r` (carriage return), and `\begin` translates to `\b` (backspace), ruining KaTeX math equations and LaTeX tags.

---

## ⚙️ 9. Playwright Headless PDF Rendering Script Pattern

```python
import asyncio
from playwright.async_api import async_playwright
import fitz # PyMuPDF

async def render_pdf(html_path, pdf_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Load local HTML file
        await page.goto(f"file:///{html_path.replace('\\', '/')}", wait_until="networkidle")
        
        # Ensure fonts and KaTeX render fully
        await page.evaluate("document.fonts.ready")
        await page.wait_for_timeout(2500)
        
        # Export PDF with zero outer margin (clean page margin)
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0mm", "bottom": "0mm", "left": "0mm", "right": "0mm"}
        )
        await browser.close()

    # Visual Inspection Pipeline via PyMuPDF
    doc = fitz.open(pdf_path)
    for i, page_obj in enumerate(doc):
        pix = page_obj.get_pixmap(dpi=150)
        pix.save(f"pdf_pages_inspection/page_{i+1}.png")
```

---

## 🔍 10. Verification Checklist

- [ ] Executive Cover Page (`.cover-page`) included as Page 1 with `page-break-after: always;`.
- [ ] Chapter Mood Color Palette matched to clinical domain (Crimson for Blood/Hemodynamic, Emerald for Inflammation, Violet for Neoplasia).
- [ ] Educational intent verified: Every image directly demonstrates targeted cellular structures (no notebook sketches).
- [ ] High-resolution (1920px+ HD) medical micrographs converted to Base64 and embedded locally.
- [ ] Clean page margins enforced: `0mm` PDF margin with `--no-pdf-header-footer` and `12mm 14mm` `.page` container padding.
- [ ] Bullet markers (`•`) contained safely inside cards (`ul, ol { padding-left: 24px !important; }`).
- [ ] KaTeX math elements (`.katex *`) overridden in `@media print` with explicit dark `#0F172A` color.
- [ ] Table headers use solid dark navy (`#0F172A`) with white text and `10px` rounded corners (`border-collapse: separate`).
- [ ] Image placeholders (`.image-placeholder`, `~185px–200px`) provided with `page-break-inside: avoid;` for diagram study guides.
- [ ] No Python string escape mangling (`\text` $\rightarrow$ `\t`, `\right` $\rightarrow$ `\r`) using raw string literals `r"""..."""`.
- [ ] Visual inspection executed via PyMuPDF (`fitz`) to confirm zero image clipping or text overflow across pages.
- [ ] `html { font-size }` set in `@media print` alongside `body` to fix `rem`-based sizing (§11).
- [ ] No inline `style="color:#FFF"` on elements visible in print — use CSS class with print override (§12).
- [ ] Sections use `page-break-before: auto` for continuous flow, not `always` (§14).
- [ ] Large tables split into self-contained category groups to avoid cross-page breaks (§15).

---

## 🔤 11. Print Font Sizing — The `rem` Root Trap

**Problem**: Setting `body { font-size: 7.5pt }` in `@media print` does **NOT** cascade to elements using `rem`-based sizes (e.g., `font-size: 0.92rem` on `.pathogenesis-box`), because `rem` is relative to `<html>` root (default 16px ≈ 12pt), **not** `<body>`.

**Fix**: Always set `html { font-size }` in `@media print` alongside `body`. Also explicitly override any component class that has a hardcoded `rem` or `px` font-size in the main (screen) CSS.

```css
@media print {
    html {
        font-size: 7.5pt !important; /* THIS is what rem units resolve against */
    }
    body {
        font-size: 7.5pt !important;
        line-height: 1.4 !important;
    }
    /* Explicit overrides for elements with hardcoded rem/px sizes in screen CSS */
    .pathogenesis-box, .morphology-box, .clinical-pearl {
        font-size: 7.5pt !important;
    }
    ul, ol {
        padding-left: 16px !important;
        margin-top: 3px !important;
        margin-bottom: 3px !important;
    }
    li {
        margin-bottom: 3px !important;
        font-size: 7.5pt !important;
    }
}
```

**Key Insight**: If you change `body { font-size }` in print and text doesn't shrink, check whether those elements use `rem` units — if so, override `html { font-size }` to fix the root.

---

## 🎭 12. White-on-White Text — CSS Class Pattern

> See also **§6** for full `@media print` high-contrast color override patterns.

**Problem**: Inline `style="color:#FFF"` on headings (e.g., sub-card titles inside dark-background cards) renders as **invisible white text on white print backgrounds**.

**Fix**: Never use inline white color on elements meant for print. Use a dedicated CSS class with screen-mode white and print-mode dark overrides:

```css
/* Screen: white text on dark card backgrounds */
.sub-card-title {
    color: #FFF;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    margin: 8px 0;
}

/* Print: dark text on white backgrounds */
@media print {
    .sub-card-title {
        color: #0F172A !important;
    }
}
```

**Rule**: Any element that uses `color: #FFF` or light colors in screen mode **must** have a corresponding `@media print` override to a dark color.

---

## 🌈 13. Gradient Text in Print PDF

Chromium's print engine supports `-webkit-background-clip: text` gradients. Use `!important` on all three gradient-text properties. Always include overflow prevention for large titles:

```css
@media print {
    .hero-title {
        background: linear-gradient(135deg, #0F172A 25%, #B91C1C 55%, #EA580C 85%, #F59E0B 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        font-size: 18pt !important;
        line-height: 1.25 !important;
        /* Prevent title overflow beyond page width */
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        max-width: 100% !important;
    }
}
```

**Note**: The gradient direction and color stops should match the Chapter Mood Color Palette (§3). For Blood/Vascular chapters: black → crimson → orange → amber.

---

## 📄 14. Continuous Flow Page Breaks

**Problem**: Using `page-break-before: always` on `<section>` tags forces each section to start on a new page, creating large empty whitespace at the bottom of pages.

**Fix**: Use `page-break-before: auto` for continuous, high-density flow. Apply `page-break-inside: avoid` on individual cards to prevent mid-card splits, and `page-break-after: avoid` on headings to keep them attached to their content:

```css
@media print {
    /* Continuous flow — no forced section breaks */
    section {
        page-break-before: auto !important;
        break-before: auto !important;
        margin-bottom: 16px !important;
    }
    /* Prevent mid-card splits */
    .bento-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-bottom: 14px !important; /* breathing room between cards */
    }
    /* Keep headings attached to content */
    .card-title, .section-header {
        page-break-after: avoid !important;
        break-after: avoid !important;
    }
}
```

---

## 📊 15. Smart Table Splitting by Category

**Problem**: Large tables (e.g., 10+ rows spanning multiple disease categories) break unpredictably across pages, splitting mid-row or separating headers from data.

**Fix**: Split monolithic tables into self-contained card groups by logical category (e.g., "Large Vessel Vasculitis", "Medium Vessel Vasculitis", "Small Vessel Vasculitis"). Each group is a standalone `.bento-card` with its own mini-table or list, so `page-break-inside: avoid` keeps each group intact on one page.

```html
<!-- Instead of one giant 10-row table, split by category -->
<div class="bento-card">
    <h3 class="card-title">Large Vessel Vasculitis</h3>
    <table class="custom-table"><!-- 2-3 rows --></table>
</div>
<div class="bento-card">
    <h3 class="card-title">Medium Vessel Vasculitis</h3>
    <table class="custom-table"><!-- 2-3 rows --></table>
</div>
<div class="bento-card">
    <h3 class="card-title">Small Vessel Vasculitis</h3>
    <table class="custom-table"><!-- 3-4 rows --></table>
</div>
```

---

## 📏 16. Print Font Size Hierarchy (Recommended Ratios)

Use these as a **starting point** and tune per project. Expressed as ratios relative to body text (1x):

| Element | Ratio | Example at 7.5pt body |
| :--- | :--- | :--- |
| Hero Title | ~2.4x | 18pt |
| Section Title | ~1.13x | 8.5pt |
| Card Title | ~1.07x | 8pt |
| Body / Paragraphs / Lists | 1x (base) | 7.5pt |
| Hero Subtitle | ~0.93x | 7pt |
| SEC Badges / Labels | ~0.87x | 6.5pt |
| Stat Labels / Fine Print | ~0.8x | 6pt |

**Note**: These ratios were calibrated for A4 medical textbooks with dense Thai+English bilingual content. For English-only or less dense layouts, a larger base (8–9pt) with the same ratios may be more appropriate.

---

## 📖 17. Fluid Editorial Textbook Layout (Unboxed Editorial Typography)

**Anti-Pattern (Card Fatigue / Box Overuse)**: Wrapping every single paragraph, bullet point list, and subsection in rounded, bordered boxes (`.bento-card`, `.pathogenesis-box`). This creates excessive visual clutter, breaks reading flow, and wastes precious vertical space in print.

**Best Practice (Fluid Editorial Layout)**: Treat the textbook like an authentic publication (e.g. *Nature Reviews*, *Robbins & Cotran*):
1. **Unboxed Body Flow**: Let paragraphs, lists, and general text flow naturally without border containers.
2. **Minimalist Section Dividers**: Use clean editorial rule lines under section headers (`.section-header`) instead of enclosing sections in massive cards.
3. **Selective Left-Border Callouts**: Reserve boxes only for high-yield callouts (e.g. `border-left: 3px solid #D97706; background: rgba(245, 158, 11, 0.04);` for USMLE Traps/Pearls or Pathology mechanisms).
4. **Open Clean Tables (`.clean-table`)**: Use top/bottom borders and row dividers with no heavy surrounding box.

```css
/* Editorial Fluid Body */
.editorial-body {
    font-size: 0.95rem;
    color: #CBD5E1;
    line-height: 1.8;
}

.editorial-section {
    margin-bottom: 36px;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 8px;
}

/* Minimalist Left-Border Callouts */
.callout-pearl {
    border-left: 3px solid #F59E0B;
    background: rgba(245, 158, 11, 0.04);
    padding: 12px 16px;
    margin: 16px 0;
    border-radius: 0 8px 8px 0;
}

@media print {
    .editorial-section {
        margin-bottom: 16px !important;
        page-break-inside: auto !important;
    }
    .section-header {
        border-bottom: 1.5px solid #0F172A !important;
        page-break-after: avoid !important;
    }
    .callout-pearl {
        border-left: 3px solid #D97706 !important;
        background: #FFFBEB !important;
        color: #1E293B !important;
        page-break-inside: avoid !important;
    }
}
```

---

## 🔬 18. Extracting Authentic Figures from Official Textbook PDFs via PyMuPDF

When authentic illustrations, micrographs, or diagrams are available directly in an official textbook PDF (e.g. *Robbins & Cotran 10th Ed*):
1. **Never use AI image generation for clinical pathology micrographs or actual diagnostic criteria.**
2. **Precision High-DPI Cropping**: Use PyMuPDF (`fitz`) to crop the figure rect at `250–300 DPI` for crystal-clear HD print quality:
```python
import fitz
from PIL import Image

doc = fitz.open("textbook.pdf")
page = doc[page_num - 1]
rect = fitz.Rect(x0, y0, x1, y1) # exact figure coordinates
pix = page.get_pixmap(clip=rect, dpi=250)
pix.save("assets/figure_name.jpg", "jpeg", jpg_quality=95)
```
3. **Clean Residual Text Margins**: If the cropped rect captures residual body text from above/below, crop the extra margin via PIL or adjust bounding box coordinates.
4. **Base64 Embedding**: Convert all extracted images into Base64 Data URIs (`data:image/jpeg;base64,...`) for instant offline, sandboxed Playwright PDF rendering.

---

## 🖼️ 19. Side-by-Side Morphological Comparison Grids (`.figure-grid-2col`)

To compare benign vs. malignant lesions or normal vs. anaplastic cytology:
```html
<div class="figure-grid-2col">
    <div class="editorial-figure">
        <img src="__IMG_BENIGN__" alt="Benign Adenoma">
        <div class="figure-caption-box">
            <div class="figure-title"><i class="fa-solid fa-microscope"></i> Figure A: Benign Adenoma</div>
            <div class="figure-desc">Well-differentiated thyroid follicles with intact capsule.</div>
        </div>
    </div>
    <div class="figure-grid-2col .editorial-figure">
        <img src="__IMG_MALIGNANT__" alt="Invasive Adenocarcinoma">
        <div class="figure-caption-box">
            <div class="figure-title"><i class="fa-solid fa-microscope"></i> Figure B: Invasive Adenocarcinoma</div>
            <div class="figure-desc">Distorted glands infiltrating smooth muscle with desmoplasia.</div>
        </div>
    </div>
</div>
```

```css
.figure-grid-2col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin: 18px 0;
    break-inside: avoid;
    page-break-inside: avoid;
}

@media print {
    .figure-grid-2col {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
        break-inside: avoid !important;
        page-break-inside: avoid !important;
    }
    .figure-grid-2col .editorial-figure img {
        max-height: 150pt !important;
    }
}
```

---

## 🔒 20. Safe Template Placeholder Replacement vs. Python f-String LaTeX Collisions

**Problem**: Using Python f-strings (`f"""..."""`) on large HTML documents containing LaTeX formulas (e.g. `$\text{Ca}^{2+}$`, `$\beta_{2}$`, `\text{PIP}_3$`) or CSS rules with curly braces `{}` causes severe `SyntaxError: f-string: expecting '=' or '!'...` because Python treats `{...}` as expressions.

**Solution**: Use a raw template string literal (`r"""..."""`) and substitute image Base64 variables with explicit string replacement:
```python
html_template = r"""<!DOCTYPE html>
<html>
...
<img src="__IMG_FIG_1__">
...
</html>
"""

html_content = html_template.replace("__IMG_FIG_1__", img_fig_1_b64)
```
This guarantees 100% safety with zero escaping overhead for KaTeX, JavaScript, and CSS.

---

## 🖼️ 21. Dynamic Image Aspect-Ratio Containers vs. Rigid Dimensions

**Problem (Image Squeezing & Dimension Clashing)**: Forcing authentic micrographs or medical diagrams into rigid, fixed-height boxes (e.g. `height: 250px !important`) causes portrait diagrams (such as karyotypes or vertical metabolic cascades) to squeeze or leave awkward empty side gaps, while wide landscape pathways get excessively shrunk.

**Philosophy & Best Practice**:
1. **Dynamic Responsive Frames**: Never assign a hardcoded fixed height to general figures. Use `width: 100%; height: auto; max-height: 220pt !important; object-fit: contain; background: #FFFFFF;`.
2. **Clean Container Isolation**: Wrap in `.editorial-figure` with `background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 10px; overflow: hidden; break-inside: avoid;` so images sit on an authentic white matte regardless of dark or light theme.
3. **Harmonized Comparison Grids**: In `.figure-grid-2col`, assign uniform flex/grid heights (`height: 130pt !important; object-fit: contain;`) so side-by-side comparative micrographs (e.g. Niemann-Pick liver vs. Gaucher bone marrow) maintain optical balance.

```css
.editorial-figure {
    background: #FFFFFF;
    border: 1.5px solid #CBD5E1;
    border-radius: 10px;
    overflow: hidden;
    margin: 14px 0 20px;
    break-inside: avoid;
    page-break-inside: avoid;
}

.editorial-figure img {
    width: 100%;
    height: auto;
    max-height: 220pt !important;
    display: block;
    object-fit: contain;
    background: #FFFFFF;
}
```

---

## 📑 22. Table & Heading Orphan Prevention (`.table-section-block`)

**Problem (The Stranded Header Trap)**: When a large summary table doesn't fit on the current page, Chromium's print engine pushes the `<table>` or `.clean-table-wrap` to the next page, but leaves the preceding heading (`<h3 class="topic-header">`) stranded alone at the very bottom of the previous page. Even `page-break-after: avoid;` often fails when applied between sibling headers and large table wrapper `div`s.

**Philosophy & Solution**:
Wrap both the heading and the table wrapper inside a dedicated `.table-section-block` container styled with `break-inside: avoid !important; page-break-inside: avoid !important;`. This forces the browser to evaluate them as a single unbreakable layout unit:

```html
<div class="table-section-block">
    <h3 class="topic-header"><i class="fa-solid fa-table-list"></i> Table Title</h3>
    <div class="clean-table-wrap">
        <table class="clean-table">
            <thead>...</thead>
            <tbody>...</tbody>
        </table>
    </div>
</div>
```

```css
.table-section-block {
    margin: 12px 0 16px !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
}

.table-section-block .topic-header {
    margin-top: 0 !important;
    margin-bottom: 8px !important;
}

.table-section-block .clean-table-wrap {
    margin: 0 !important;
}
```
If the combined block exceeds the remaining page height, the entire block (heading + table) moves cleanly to the top of the next page together.

---

## 📄 23. Top Page Breathing Margin via `@page` & Full-Bleed `@page :first`

**Problem (Top Edge Cramming in Multi-Page Print)**:
Applying padding to a block container (e.g. `.container { padding: 10mm 14mm }`) only applies to the top of the *first* page and bottom of the *last* page. As the document flows into pages 2, 3, 4, etc., content at the top of subsequent pages gets sliced directly against the very top physical edge of the paper (`y = 0`), looking cramped and unprofessional.

**Philosophy & Solution**:
Use CSS Paged Media `@page` margins with the pseudo-selector `@page :first`:
1. **Inner Page Breathing Margins**: Set `@page { size: A4 portrait; margin: 10mm 12mm 12mm 12mm; }`. This automatically injects a guaranteed 10mm top margin and 12mm bottom margin on **every subsequent page fragment** (pages 2, 3, 4, 5...).
2. **Full-Bleed Executive Cover**: Override page 1 with `@page :first { margin: 0mm !important; }` so the cover page maintains edge-to-edge full-bleed background artwork.
3. **Reset In-Page Container Padding in Print**: In `@media print`, set `.container { padding: 0 !important; max-width: 100% !important; }` so margins are handled purely by the printer engine.

```css
@media print {
    @page {
        size: A4 portrait;
        margin: 10mm 12mm 12mm 12mm; /* Top margin guarantees breathing room on pages 2+ */
    }

    @page :first {
        margin: 0mm !important; /* Full-bleed executive cover on page 1 */
    }

    .container {
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
    }
}
```

---

## 🪶 24. Widow & Orphan Line Prevention (`orphans: 3; widows: 3;`)

**Problem**: A multi-line bullet point or clinical paragraph at the bottom of a page might break leaving a single stranded word or short line (e.g. "เดือนแรก") at the top of the next page.

**Solution**:
1. Apply `orphans: 3 !important; widows: 3 !important;` to all paragraphs and list items in `@media print`.
2. Apply `break-inside: avoid !important; page-break-inside: avoid !important;` directly to `li` elements so individual bullet items never split awkwardly across page breaks.

```css
@media print {
    p, li {
        orphans: 3 !important;
        widows: 3 !important;
    }
    li {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
    }
}
```

---

## 🪜 25. Vertical Diagram Side-by-Side Flow (Figure-Left, Content-Right Architecture)

**Problem (The Tall Aspect-Ratio Trap)**:
Pathology textbooks feature many tall, narrow diagrams depicting multi-step vertical cascades (e.g. 4-step ECM invasion cascade, receptor kinase phosphorylation cascades, signal transduction cascades, vertical metabolic ladders) with aspect ratios between 1:1.8 and 1:2.5.
When rendered in a standard horizontal block container (`.editorial-figure`), three catastrophic layout flaws occur:
1. **Letterboxing Waste**: Constraining height (`max-height: 200pt`) causes the narrow image to sit in the middle with 60% blank white space on the left and right.
2. **Vertical Page Exhaustion**: Unconstrained, it consumes nearly the entire vertical height of the page while pushing accompanying text onto subsequent pages.
3. **Heading Orphaning**: The section heading and intro paragraph get stranded at the bottom of the previous page while the tall diagram jumps to the next page.

**Philosophy & Solution**:
Treat vertical diagrams not as horizontal banners, but as **Left-Flank Anchors** in a dedicated two-column split layout (`.vertical-figure-split`):
1. **Left Column (`.vsplit-fig-col`)**: 36%–40% width. Houses the vertical diagram at full natural resolution (`object-fit: contain; width: 100%; max-height: 380pt–420pt;`) with its caption box neatly docked at the bottom.
2. **Right Column (`.vsplit-content-col`)**: 58%–62% width. Houses the granular step-by-step molecular explanation card (`.cascade-steps-card`) and associated USMLE high-yield / clinical pearl callouts.
3. **Unified Block Avoid-Break**: Wrap the heading, intro sentence, and `.vertical-figure-split` together in `<div class="vertical-split-block">` with `break-inside: avoid !important; page-break-inside: avoid !important;`. This guarantees the heading, image, and text move together cleanly.

```html
<div class="vertical-split-block">
    <h3 class="topic-header"><i class="fa-solid fa-network-wired"></i> กระบวนการรุกรานเนื้อเยื่อเกี่ยวพัน 4 ขั้นตอน (The 4-Step ECM Invasion Cascade)</h3>
    <p>การรุกรานผ่าน Extracellular Matrix (ECM) และ Basement Membrane เป็นขั้นตอนสำคัญก่อนการแพร่กระจาย:</p>
    
    <div class="vertical-figure-split">
        <!-- Left: Vertical Diagram Anchor -->
        <div class="vsplit-fig-col">
            <div class="editorial-figure">
                <img src="path_to_tall_diagram.jpg" alt="Robbins Figure 7.35">
                <div class="figure-caption-box">
                    <div class="figure-title"><i class="fa-solid fa-diagram-project"></i> Figure 7.35: ECM Invasion Cascade</div>
                    <div class="figure-desc">ขั้นตอนการรุกราน 4 สเต็ป: Loosening &rarr; Degradation &rarr; Attachment &rarr; Migration</div>
                </div>
            </div>
        </div>

        <!-- Right: Parallel Step Cards & Clinical Pearls -->
        <div class="vsplit-content-col">
            <div class="cascade-steps-card">
                <strong>ลำดับกลไกระดับโมเลกุล 4 ขั้นตอน:</strong>
                <ul>
                    <li><strong>1. Loosening of Intercellular Junctions:</strong> Loss of E-cadherin (*CDH1* mutation / SNAIL, TWIST)...</li>
                    <li><strong>2. Degradation of ECM & BM:</strong> Proteolytic enzymes (MMP-2, MMP-9, Type IV Collagenase)...</li>
                    <li><strong>3. Attachment to Novel ECM:</strong> Integrin receptor remodeling...</li>
                    <li><strong>4. Migration & Locomotion:</strong> Autocrine Motility Factors (AMF)...</li>
                </ul>
            </div>
            <div class="callout-pathology">
                <strong>Organ Tropism ("Seed and Soil" Hypothesis):</strong>
                <ul>
                    <li>Intravasation & Tumor-Platelet Emboli...</li>
                    <li>Batson plexus to Bone (Prostate Ca)...</li>
                </ul>
            </div>
        </div>
    </div>
</div>
```

```css
/* Screen & Print Styles for Vertical Split */
.vertical-split-block {
    margin: 16px 0 20px;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
}

.vertical-figure-split {
    display: flex;
    flex-direction: row;
    gap: 14px;
    align-items: stretch;
    margin-top: 8px;
}

.vsplit-fig-col {
    flex: 0 0 38%;
    max-width: 38%;
    display: flex;
    flex-direction: column;
}

.vsplit-fig-col .editorial-figure {
    margin: 0 !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.vsplit-fig-col .editorial-figure img {
    width: 100% !important;
    height: auto !important;
    max-height: 400pt !important;
    object-fit: contain !important;
    display: block;
}

.vsplit-content-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
}

@media print {
    .vsplit-fig-col {
        flex: 0 0 38% !important;
        max-width: 38% !important;
    }
    .vsplit-fig-col .editorial-figure img {
        max-height: 380pt !important;
    }
    .cascade-steps-card {
        background: #F8FAFC !important;
        border: 1px solid #E2E8F0 !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
        color: #0F172A !important;
        font-size: 7.5pt !important;
        line-height: 1.42 !important;
    }
}
```

---

## ⚡ 26. Rapid Inspection Protocol & Performance Optimization (Eliminating Checking Bottlenecks)

**Analysis of Checking Bottlenecks (Why Verification Took So Long)**:
In multi-page textbook compilations (e.g. 15–20 pages), checking frequently stalls the agent loop due to four distinct bottlenecks:
1. **Full-Document Rasterization Waste**: Converting all 17 pages to high-DPI PNGs in Python via `fitz.open().get_pixmap()` on every single test run takes 15–25 seconds of disk writing and encoding overhead.
2. **Exhaustive Sequential `view_file` Calls**: The agent sequentially inspecting 10+ images (`page_14.png`, `page_13.png`, `page_15.png`...) burns multiple tool turns and minutes of round-trip network/token latency.
3. **PowerShell / CLI String Escaping Hazards**: Running ad-hoc multi-line Python scripts inside `py -c "..."` with triple quotes causes shell parsing and syntax crashes, forcing repeated retries.
4. **Lack of Programmatic Structural Validation**: Relying solely on human/visual inspection to catch orphaned headings instead of running automated coordinate checks.

**Speed & Quality Directives for Rapid Inspection**:
1. **Selective / Dirty Page Inspection**:
   - When a change targets a specific section (e.g. Section 07 on pages 12–13), only inspect the dirty pages (`page_12.png` and `page_13.png`). Do NOT view unchanged pages.
2. **Programmatic Heading & Orphan Assertions (0.1s Fast-Check)**:
   - Run the bundled script: `python scripts/audit_layout.py <pdf_path>` (see [scripts/audit_layout.py](file:///C:/Users/Asrock/.gemini/config/plugins/9arm-skills/skills/html-to-pdf-textbook/scripts/audit_layout.py)).
   - **Checks performed automatically in 0.1s (0 tokens)**:
     - Total page count vs expected baseline.
     - **Bottom-edge collision**: Checks if any text span matching headings or topic blocks has vertical coordinate $y_1 > (\text{page\_height} - 60\text{pt})$. Flags immediate stranded heading errors without rasterizing images or calling vision APIs!
   - **Mandatory for ChatGPT/Codex**: Do NOT call `view_image` or load PNGs into context. Depend exclusively on this script.
3. **Direct File Tool Edits**:
   - Use `write_to_file` and `replace_file_content` directly rather than piped PowerShell one-liners to eliminate syntax errors.
4. **Targeted PyMuPDF Export**:
   - In development/testing, pass an optional page range (e.g. `render_inspection_pages(pdf_path, pages=[12, 13])`) so disk I/O finishes in under 2 seconds.

---

## 📑 27. Section Page Management & Typographic Proportions (Eliminating Mid-Page Slicing & Awkward Gaps)

### 1. Section Page Management Philosophy
* **Avoid Cascading Mid-Page Section Slicing**:
  In a multi-section medical textbook, never allow top-level sections (`<section class="editorial-section">`) to initiate near the bottom third of a page ($y > 450\text{pt}$) just to print the section header and 2 introductory sentences before page-breaking to the figure on the next page. This causes a domino effect where every subsequent section is sliced in half across page boundaries.
* **Dedicated Section Page Breaks**:
  Major comprehensive sections (e.g. Angiogenesis/Invasion, Warburg/Metabolism, Tumor Immunology, Clinical Paraneoplastic Syndromes) should begin cleanly on their own dedicated page using:
  ```css
  #sec-07, #sec-08, #sec-09, #sec-10 {
      break-before: page !important;
      page-break-before: always !important;
  }
  ```
* **Self-Contained Topic Spreads**:
  Each page should form an aesthetically complete, self-contained educational spread. If a table overflows onto a subsequent page (e.g. Tumor Markers), ensure the continuation page begins with its own dedicated topic header (`<h3>`) and intro rather than a bare, unidentified grid.

### 2. Multi-Column Split Spacing & Font Proportions
* **Prevent "Center Hole" Flex Gaps**:
  In a vertical side-by-side split (Figure left, content right), NEVER use `justify-content: space-between` on the content column if the figure is tall. This forcibly pushes the top card to the ceiling and the bottom callout to the floor, leaving an unsightly 50–80px blank hole in the middle.
  * **Correct Pattern**:
    ```css
    .vsplit-content-col {
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        gap: 8px 10px !important;
    }
    ```
* **Eliminate Double-Bullet Clutter**:
  Never combine HTML unordered list bullets (`•`) with explicit numerical text (`1.`, `2.`). Instead, use sleek numbered badges:
  ```html
  <div class="cascade-step-item">
      <span class="step-badge">1</span>
      <div class="step-text"><strong>Step Title:</strong> Step details...</div>
  </div>
  ```
  ```css
  .cascade-step-item {
      display: flex !important;
      align-items: flex-start !important;
      gap: 6px !important;
      margin-bottom: 5px !important;
  }
  .step-badge {
      background: #6366F1 !important;
      color: #FFFFFF !important;
      font-size: 6.5pt !important;
      font-weight: 700 !important;
      padding: 1px 5px !important;
      border-radius: 3px !important;
      flex-shrink: 0 !important;
  }
  .step-text {
      font-size: 7.2pt !important;
      line-height: 1.36 !important;
      color: #0F172A !important;
  }
  ```



