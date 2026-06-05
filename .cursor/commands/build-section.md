# build-section

Build one section from a layout with framework-first interaction policy.

## Inputs

- Section design reference
- Content/data requirements
- Interaction expectations (if any)

## Steps

1. Implement semantic HTML + Tailwind utilities for baseline layout.
2. Check whether the interaction maps to an existing framework component.
3. If yes, implement framework API behavior.
4. If no, add minimal custom JS and document why framework support is insufficient.
5. Refactor repeated elements into Nunjucks loops/partials.
6. Use `js-*` classes for JS selectors only, keep them after visual classes in `class` attributes, and do not style them in CSS.
7. Optimize media and keep structure lean — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
8. Set `alt` on images — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
9. Figma-driven assets — [`rules/figma-asset-integrity.RULE.md`](../rules/figma-asset-integrity.RULE.md).
10. Sort atomic classes per Prettier/Tailwind — [`rules/tailwind-usage-policy.RULE.md`](../rules/tailwind-usage-policy.RULE.md).
11. Custom CSS property order — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).
12. Section fonts (`WOFF`/`WOFF2`, used variants, `font-display: swap`) — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).
13. Content stress-check (longer text, varied image aspect ratios) — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
14. Focus and keyboard behavior for interactive controls — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
15. Run [`performance-checklist.md`](performance-checklist.md) before marking the section done.

## Class Ordering Memo (short)

- Before: `<button class="js-open text-white hover:bg-blue-700 px-4 bg-blue-600 py-2 rounded">`
- After: `<button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 js-open">`

## Done

- Section is implemented with utility-first styling.
- Decision gate result is explicit: framework component or justified custom JS.
- Performance constraints are explicitly checked and reflected in delivery notes.
- Layout remains stable with content replacements (longer text and image aspect-ratio changes).
- Image delivery, `alt`, Figma assets, and fonts verified per linked rules above.
- [`performance-checklist.md`](performance-checklist.md) completed where applicable.
