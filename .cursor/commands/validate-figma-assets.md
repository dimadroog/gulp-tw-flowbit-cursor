# validate-figma-assets

Run a focused post-check for asset integrity after Figma-driven implementation.

## When to run

- After implementing a page/section from Figma.
- After changing icons, logos, avatars, or illustration assets.
- Before final delivery when asset source/type consistency is critical.

## Checks

Policy baseline: [`rules/figma-asset-integrity.RULE.md`](../rules/figma-asset-integrity.RULE.md) (inline SVG, local raster paths, no remote URLs, no graphic substitution, vector geometry).

1. Verify checks 1–6 and 9 against the figma-asset-integrity rule above.
2. UI SVGs: run `rg 'preserveAspectRatio="none"' app/img` — **zero matches** unless the task documents an allowed exception per file.
3. After adding or replacing multiple Figma SVGs in `app/img/layout-shell/`, run `npm run normalize:svg-layout` so inlined icons do not share duplicate `id` values in one HTML document.
4. Raster intrinsic sizing (≤ rendered × 2.0 per axis) — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).

## Output

- Compact validation note:
  - pass/fail status
  - violated checks (if any)
  - exact paths needing fixes

## Blocking status

- If any check fails, task is not ready for completion.
