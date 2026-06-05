# performance-checklist

Run this checklist to keep page delivery focused on loading speed and runtime performance.

## Scope

- New page creation
- Section implementation
- Refactors touching JS/CSS/media

## Blocking vs recommended

| Check | Severity | Notes |
|-------|----------|--------|
| Image delivery (loading, intrinsic ≤ 2×, WebP) | **blocking** when images changed | [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md) |
| Responsive `picture`/`srcset` | **blocking** when viewport-dependent images | per image-delivery rule |
| Dead/duplicate CSS/JS removed | **blocking** when introduced in task | — |
| DOM lean / no extra wrappers | **blocking** when structure changed | — |
| Webfont delivery policy | **blocking** when fonts changed | [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md) |
| Content stress-test (CLS/layout) | **blocking** when layout/media changed | image-delivery rule |
| Lighthouse / PageSpeed (incl. “Properly size images”) | **recommended** | **blocking** only if a **deployed URL** was tested and a **regression** vs prior baseline is documented; otherwise mark `not_applicable` (reason: no deploy URL / offline session) |

## Checklist

Canonical performance policy: [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).

1. Validate changes against relevant Lighthouse and PageSpeed recommendations (images, render-blocking resources, DOM size, unused code) — **recommended**; record applied or deferred.
2. Image delivery (explicit `loading`, intrinsic ≤ rendered × 2.0, WebP/compression) — **blocking** when images touched — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
3. Verify responsive `picture`/`srcset` where size depends on viewport; each candidate within the 2× rule — **blocking** when applicable.
4. PageSpeed / Lighthouse “Properly size images” — **recommended**; run when a stable preview/deploy URL exists; if not, status `not_applicable` (no deploy URL). **Blocking** only on documented regression vs known baseline on that URL.
5. Valid `alt` on all `img` elements — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
6. Avoid unnecessary JS; prefer native HTML/CSS or framework-native behavior — [`rules/javascript-minimalism.RULE.md`](../rules/javascript-minimalism.RULE.md).
7. Remove duplicated or dead CSS/JS introduced during implementation — **blocking**.
8. Confirm DOM structure stays lean — **blocking** when structure changed.
9. Webfont delivery (`WOFF`/`WOFF2`, self-hosted, used variants, `font-display: swap`) — **blocking** when fonts changed — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).
10. Content stress-test: longer text and alternative image aspect ratios do not break layout or cause major CLS — **blocking** when layout/media changed — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
11. Flag expected performance trade-offs in the delivery report.

## Output

- Brief performance note with:
  - key optimizations applied
  - blocking items: `pass|fail|not_applicable` each
  - Lighthouse/PageSpeed: `pass|fail|not_applicable` + reason if N/A
  - font delivery decisions (formats, hosting, loaded variants, `font-display`)
  - unresolved hotspots
  - follow-up TODO items
