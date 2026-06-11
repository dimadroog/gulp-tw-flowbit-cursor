---
description: Web image delivery, intrinsic sizing for PageSpeed, responsive sources, and loading policy.
alwaysApply: true
globs:
  - app/**/*.njk
  - app/**/*.html
  - app/img/**
  - app/scss/**
---

# Image Delivery And Optimization Policy

Canonical policy for raster images and responsive image markup in layout projects. Related policies stay in sibling rules — do not duplicate them here:

- **Figma import integrity** (inline SVG, local paths, no MCP URLs, vector geometry): [`figma-asset-integrity.RULE.md`](figma-asset-integrity.RULE.md).
- **`alt` text and non-text accessibility** (descriptive vs decorative, contrast): [`accessibility-and-w3c.RULE.md`](accessibility-and-w3c.RULE.md).

## Loading

- Every `<img>` must set `loading` explicitly: `loading="lazy"` by default, or `loading="eager"` for above-the-fold / LCP-critical slots.
- Do not omit `loading`; choose intentionally per slot.

## Responsive delivery

- Use `picture` and/or `srcset` when displayed size depends on viewport width or device pixel ratio.
- Each `srcset` candidate (or `<source>` in `<picture>`) must satisfy the intrinsic sizing rule below for **its** rendered size at the breakpoint where it is selected.
- Prefer width descriptors (`w`) and `sizes` that match real layout CSS so the browser picks an appropriately sized file.

## Intrinsic sizing (PageSpeed)

**Core rule:** intrinsic pixel dimensions must not exceed **2×** the rendered display size on the page.

```
Intrinsic width  ≤ Rendered width  × 2.0
Intrinsic height ≤ Rendered height × 2.0
```

**Example:** if an image renders at **600×400** px, export/store it at most **1200×800** px.

### Lighthouse / PageSpeed Insights thresholds

The PSI audit **“Properly size images”** reports wasted bytes when files are larger than needed. Treat these as pass targets:

| Delivery type | Maximum excess vs ideal for displayed size |
|---------------|--------------------------------------------|
| Standard `<img>` (single source) | **&lt; 4 KiB** wasted |
| Responsive (`srcset`, `<picture>`) | **&lt; 12 KiB** wasted per candidate |

### How to comply

1. Measure or estimate **rendered size** in CSS pixels at the target breakpoint (DevTools computed size).
2. Compute target export size: **rendered × 2.0** per axis (round to whole pixels).
3. Resize raster assets to that target (or the next standard step down if the design export is smaller).
4. Prefer **WebP** over JPEG/PNG for photographs and complex illustrations (typical **25–35%** smaller at comparable quality).
5. Apply lossy compression at **quality 80–85** unless the brief requires lossless.
6. Re-check built output paths under structured project folders (for example `app/img/<feature>/...`).

## Formats and weight

- Default to **WebP** for raster photos and illustrations when browser support in the project allows it.
- Avoid shipping oversized raster files when a lighter equivalent (smaller dimensions, better format, or vector SVG per Figma policy) meets the design.
- Do not upscale small exports beyond the 2× cap “for retina” if the rendered slot is smaller — export to the slot’s 2× target instead.

## Layout resilience

- Layouts must remain stable when copy is longer or when replacement images use **different aspect ratios** or dimensions within the 2× sizing policy.
- Verify that swaps do not cause major **CLS** (Cumulative Layout Shift); reserve space with width/height attributes or aspect-ratio CSS where appropriate.

## Verification

- Run **PageSpeed Insights** (or Lighthouse in Chrome DevTools) and confirm audit **“Properly size images”** is in the **green** zone with **no warnings** for pages touched by the task.
- For delivery evidence, reference `commands/performance-checklist.md` results (optimizations applied, PSI/Lighthouse status, deferred items).
- **Figma-driven work:** run `commands/validate-figma-assets.md` for path/integrity checks; raster sizing is validated against this rule.
- Local HTML output: `npm run qa` / `npm run validate:html` after build when templates change.

## Blocking

- Tasks that add or change raster images are **not complete** while any slot violates **Intrinsic ≤ Rendered × 2.0** or while PSI **“Properly size images”** reports failing/warning entries for those URLs — unless the task brief documents an explicit waiver (same posture as mockup fidelity waivers in [`WORKFLOW.md`](../WORKFLOW.md) §1.2).
