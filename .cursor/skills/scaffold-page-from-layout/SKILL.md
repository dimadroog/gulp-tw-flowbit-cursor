---
name: scaffold-page-from-layout
description: Creates a new page scaffold from a layout brief using project template and styling conventions. Use when creating a new page shell, page-level template, head/meta structure, and initial section includes.
disable-model-invocation: true
---

# Scaffold Page From Layout

## Goal

Create a clean, reusable page baseline with SEO, semantic structure, and include-ready sections.

## Workflow

1. Confirm target route/page purpose and key content zones.
2. Create Nunjucks page shell with required semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`) and default `<html lang="ru">` unless another locale is required.
3. Add required metadata with fixed viewport declaration and SEO placeholders when content is pending:
   - `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - `<meta name="description" content="description">`
   - `<meta name="keywords" content="keywords">`
4. Set `<title>` aligned with the page name used in `app/index.html`.
5. Add one `h1` aligned with page intent; if needed, make it visually hidden but accessible.
6. Use `section` and `article` only when each block has a meaningful heading (`h2`/`h3` as appropriate).
7. Split large page chunks into section partials early.
8. Plan image slots per [`rules/image-delivery-and-optimization.RULE.md`](../../rules/image-delivery-and-optimization.RULE.md) (`loading`, `picture`/`srcset`, intrinsic ≤ 2× rendered, formats).
9. Ensure each `img` has valid `alt` per [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md).
10. Run a quick resilience pass (longer text, varied image aspect ratios) per the image-delivery rule.

## Interaction Baseline (when page has interactive blocks)

1. Use Flowbite/data-attribute patterns first for modal, accordion, collapse, drawer/offcanvas, tabs, dropdown, tooltip.
2. If custom JS is required, isolate pure logic from DOM side effects.
3. Keep initialization idempotent and safe on repeated runs.
4. Use `js-*` classes and/or `data-*` attributes as behavior hooks, never as styling hooks.

## Output Requirements

- Page scaffold is ready for section-level iteration.
- Repeated blocks are prepared for loops/macros instead of copy-paste.
- Focus and accessibility assumptions are noted for future interactive blocks.
- Landmark usage and heading hierarchy are explicitly valid.
- Baseline layout is resilient to content length and image ratio changes per image-delivery rule.
- Document shell defaults and page title mapping are explicitly valid.
