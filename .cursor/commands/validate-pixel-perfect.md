# validate-pixel-perfect

Run a focused post-check for pixel-perfect fidelity after mockup-driven layout implementation.

## When to run

- After implementing a page/section from Figma or other approved design mockups.
- After changing structure, spacing, typography, color, radii, shadows, borders, or label/badge rendering.
- Before final delivery when visual fidelity is a release criterion.

## Precondition (blocking)

Before running visual checks, confirm that these inputs were manually clarified for the current task:

1. Breakpoint baseline (explicit target widths/states; compare implementation **at those widths only** unless additional breakpoints are explicitly in scope).
2. Typography contract (font family, size, weight, line-height, letter-spacing, text case rules).

If either input is missing, return `fail` and request clarification.

## Checks

1. Orientation and alignment:
   - major horizontal/vertical grouping directions match the mockup.
2. Spacing fidelity:
   - inner paddings and outer margins for critical blocks match **design-specified** values (or token-derived equivalents), not approximate neighbors on the spacing scale.
3. Typography fidelity:
   - font sizes, weights, line-heights, letter-spacing, and text casing match approved design states.
4. Color, radius, shadow, border:
   - surfaces use **mockup/token** colors; corner radii, elevation/shadows, and stroke weights match the spec — no “similar” Tailwind substitutes in **critical zones** (see `WORKFLOW.md` §1.2).
5. State fidelity:
   - badges/chips/buttons preserve intended case, spacing, and geometry.
6. Regression sweep:
   - no newly introduced visual drift in previously aligned areas.

## Output

- Compact validation note:
  - `pass|fail`
  - clarified inputs status (`breakpoints`, `typography`)
  - violated checks (if any)
  - exact template/style paths needing fixes

## Blocking status

- If any check fails, or required manual clarification inputs are missing, task is not ready for completion.
