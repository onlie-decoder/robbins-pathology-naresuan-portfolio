---
name: html-to-pdf-textbook
description: Creates publication-quality, print-ready medical and technical learning textbook PDFs from HTML/CSS using Playwright / Edge Headless CLI on Windows with Full HD local Base64 embedded micrographs, clean page margins, educational image selection logic, high-contrast print CSS, KaTeX math print color overrides, bullet-alignment safety, dedicated executive cover pages with topic-mood color palettes, image placeholder frames, and rounded-corner tables.
---

# HTML to PDF Textbook Generator Skill

Use this skill whenever the user asks to generate, compile, or print a high-quality PDF textbook, educational module, case study report, or learning media from HTML templates.

---

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
