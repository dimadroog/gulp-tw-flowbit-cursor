---
name: scaffold-page-from-layout
description: Creates a new page scaffold from a layout brief using project template and styling conventions. Use when creating a new page shell, page-level template, head/meta structure, and initial section includes.
disable-model-invocation: true
---

# Scaffold Page From Layout

## Goal

Create a clean, reusable page baseline with SEO, semantic structure, and include-ready sections.

Gate procedure: [`commands/new-page.md`](../../commands/new-page.md).

## Workflow

1. Confirm target route/page purpose and key content zones.
2. Landmarks, headings, and Nunjucks structure — [`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md); accessibility — [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md).
3. Document shell: `<html lang="ru">` (unless another locale is required), viewport meta, SEO placeholders (`description`, `keywords`).
4. Set `<title>` aligned with the page name used in `app/index.html`.
5. Split large page chunks into section partials early.
6. Image slots — [`rules/image-delivery-and-optimization.RULE.md`](../../rules/image-delivery-and-optimization.RULE.md).
7. Valid `alt` on each `img` — [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md).
8. Content resilience (longer text, varied image aspect ratios) — [`rules/image-delivery-and-optimization.RULE.md`](../../rules/image-delivery-and-optimization.RULE.md).

## Interaction Baseline (when page has interactive blocks)

Framework-first and JS hooks — [`rules/javascript-minimalism.RULE.md`](../../rules/javascript-minimalism.RULE.md); stack defaults — [`WORKFLOW.md`](../../WORKFLOW.md) §1.1.

## Output Requirements

- Page scaffold is ready for section-level iteration.
- Repeated blocks are prepared for loops/macros instead of copy-paste.
- Focus and accessibility assumptions are noted for future interactive blocks.
- Landmarks, headings, images, and document shell verified per linked rules and `new-page` command.
