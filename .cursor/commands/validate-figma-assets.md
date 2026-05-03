# validate-figma-assets

Run a focused post-check for asset integrity after Figma-driven implementation.

## When to run

- After implementing a page/section from Figma.
- After changing icons, logos, avatars, or illustration assets.
- Before final delivery when asset source/type consistency is critical.

## Checks

1. Confirm vector assets are inlined as SVG in templates where applicable.
2. Confirm raster assets are stored under structured local paths in `app/img/`.
3. Confirm no temporary remote asset URLs remain in templates (including Figma MCP asset URLs).
4. Confirm no graphic substitution with text/emoji placeholders for non-emoji design assets.
5. Confirm vector integrity is preserved (`viewBox` and path geometry unchanged; no distortion by forced width/height mismatch).
6. Confirm image sources are valid:
   - no empty `src`
   - no unresolved relative paths
   - no broken references in built output

## Output

- Compact validation note:
  - pass/fail status
  - violated checks (if any)
  - exact paths needing fixes

## Blocking status

- If any check fails, task is not ready for completion.
