# validate-pixel-perfect

Run a focused post-check for pixel-perfect fidelity after mockup-driven layout implementation.

## When to run

- After implementing a page/section from Figma or other approved design mockups.
- After changing structure, spacing, typography, or label/badge rendering.
- Before final delivery when visual fidelity is a release criterion.

## Precondition (blocking)

Before running visual checks, confirm that these inputs were manually clarified for the current task:

1. Breakpoint baseline (explicit target widths/states).
2. Typography contract (font family, size, weight, line-height, letter-spacing, text case rules).

If either input is missing, return `fail` and request clarification.

## Checks

1. Orientation and alignment:
   - major horizontal/vertical grouping directions match the mockup.
2. Spacing fidelity:
   - inner paddings and outer margins for critical blocks match expected values.
3. Typography fidelity:
   - font sizes, weights, line-heights, letter-spacing, and text casing match approved design states.
4. State fidelity:
   - badges/chips/buttons preserve intended case, spacing, and geometry.
5. Regression sweep:
   - no newly introduced visual drift in previously aligned areas.

## Output

- Compact validation note:
  - `pass|fail`
  - clarified inputs status (`breakpoints`, `typography`)
  - violated checks (if any)
  - exact template/style paths needing fixes

## Blocking status

- If any check fails, or required manual clarification inputs are missing, task is not ready for completion.
