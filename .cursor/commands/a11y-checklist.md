# a11y-checklist

Run a focused accessibility pass for interactive UI before task completion.

## Checklist

1. Keyboard navigation works for all controls.
2. Tab order is logical and predictable.
3. `aria-expanded`, `aria-controls`, and labels are wired correctly.
4. `:focus-visible` styles are clearly visible.
5. Semantic landmarks and heading levels are coherent.
6. `img` elements use correct `alt` values (descriptive or empty for decorative images).
7. Color contrast is acceptable.

## Reporting Format

- Critical issues (must fix)
- Non-critical improvements
- Explicit pass statement if no blocking issues were found
