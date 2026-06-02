# performance-checklist

Run this checklist to keep page delivery focused on loading speed and runtime performance.

## Scope

- New page creation
- Section implementation
- Refactors touching JS/CSS/media

## Checklist

1. Validate changes against relevant Lighthouse and PageSpeed recommendations (images, render-blocking resources, DOM size, unused code).
2. Verify image delivery per [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md): explicit `loading`, intrinsic ≤ rendered × 2.0, WebP/compression where applicable.
3. Verify responsive `picture`/`srcset` where size depends on viewport; each candidate within the 2× rule for its rendered slot.
4. Run PageSpeed Insights (or Lighthouse) and confirm audit **“Properly size images”** is green with no warnings for touched pages.
5. Verify all `img` elements have valid `alt` per [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
6. Avoid unnecessary JS for simple UI patterns; prefer native HTML/CSS or framework-native behavior.
7. Remove duplicated or dead CSS/JS introduced during implementation.
8. Confirm DOM structure stays lean and avoids unnecessary wrapper nodes.
9. Verify webfont strategy: `WOFF/WOFF2`, self-hosted delivery (unless system-font-only), and only used families/weights loaded.
10. Verify custom `@font-face` blocks include `font-display: swap`.
11. Stress-test content: verify that longer text and alternative image aspect ratios do not break layout or create major CLS shifts (per image-delivery rule resilience).
12. Flag any expected performance trade-offs in the delivery report.

## Output

- Brief performance note with:
  - key optimizations applied
  - Lighthouse/PageSpeed recommendations applied or intentionally deferred
  - font delivery decisions (formats, hosting, loaded variants, `font-display`)
  - unresolved hotspots
  - follow-up TODO items
