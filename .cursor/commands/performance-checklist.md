# performance-checklist

Run this checklist to keep page delivery focused on loading speed and runtime performance.

## Scope

- New page creation
- Section implementation
- Refactors touching JS/CSS/media

## Checklist

Canonical performance policy: [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).

1. Validate changes against relevant Lighthouse and PageSpeed recommendations (images, render-blocking resources, DOM size, unused code).
2. Image delivery (explicit `loading`, intrinsic ≤ rendered × 2.0, WebP/compression) — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
3. Verify responsive `picture`/`srcset` where size depends on viewport; each candidate within the 2× rule for its rendered slot.
4. Run PageSpeed Insights (or Lighthouse) and confirm audit **“Properly size images”** is green with no warnings for touched pages.
5. Valid `alt` on all `img` elements — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
6. Avoid unnecessary JS; prefer native HTML/CSS or framework-native behavior — [`rules/javascript-minimalism.RULE.md`](../rules/javascript-minimalism.RULE.md).
7. Remove duplicated or dead CSS/JS introduced during implementation.
8. Confirm DOM structure stays lean and avoids unnecessary wrapper nodes.
9. Webfont delivery (`WOFF`/`WOFF2`, self-hosted, used variants, `font-display: swap`) — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).
10. Content stress-test: longer text and alternative image aspect ratios do not break layout or cause major CLS — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
11. Flag any expected performance trade-offs in the delivery report.

## Output

- Brief performance note with:
  - key optimizations applied
  - Lighthouse/PageSpeed recommendations applied or intentionally deferred
  - font delivery decisions (formats, hosting, loaded variants, `font-display`)
  - unresolved hotspots
  - follow-up TODO items
