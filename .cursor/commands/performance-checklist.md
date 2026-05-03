# performance-checklist

Run this checklist to keep page delivery focused on loading speed and runtime performance.

## Scope

- New page creation
- Section implementation
- Refactors touching JS/CSS/media

## Checklist

1. Validate changes against relevant Lighthouse and PageSpeed recommendations (images, render-blocking resources, DOM size, unused code).
2. Verify image strategy: optimized assets, source dimensions close to rendered dimensions, and explicit `loading` behavior.
3. Verify responsive image delivery with `picture`/`srcset` where image size depends on viewport.
4. Verify all `img` elements have valid `alt` usage (descriptive `alt` or empty `alt=""` for decorative images).
5. Avoid unnecessary JS for simple UI patterns; prefer native HTML/CSS or framework-native behavior.
6. Remove duplicated or dead CSS/JS introduced during implementation.
7. Confirm DOM structure stays lean and avoids unnecessary wrapper nodes.
8. Verify webfont strategy: `WOFF/WOFF2`, self-hosted delivery (unless system-font-only), and only used families/weights loaded.
9. Verify custom `@font-face` blocks include `font-display: swap`.
10. Stress-test content: verify that longer text and alternative image aspect ratios do not break layout or create major CLS shifts.
11. Flag any expected performance trade-offs in the delivery report.

## Output

- Brief performance note with:
  - key optimizations applied
  - Lighthouse/PageSpeed recommendations applied or intentionally deferred
  - font delivery decisions (formats, hosting, loaded variants, `font-display`)
  - unresolved hotspots
  - follow-up TODO items
