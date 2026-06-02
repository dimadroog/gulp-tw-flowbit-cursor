# a11y-checklist

Run a focused accessibility pass for interactive UI before task completion.

## Checklist

1. Keyboard navigation works for all controls.
2. Tab order is logical and predictable.
3. `aria-expanded`, `aria-controls`, and labels are wired correctly.
4. `:focus-visible` styles are clearly visible.
5. Semantic landmarks and heading levels are coherent; typography/article demos use `headingoffset` when they include inner `h1` (see [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md)).
6. Modal roots: `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`/`aria-label` on the same outer container — not on an unroled `div` (same rule).
7. `img` elements use correct `alt` values (descriptive or empty for decorative images).
8. Color contrast is acceptable.

## Reporting Format

- Critical issues (must fix)
- Non-critical improvements
- Explicit pass statement if no blocking issues were found
