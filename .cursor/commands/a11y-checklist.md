# a11y-checklist

Run a focused accessibility pass for interactive UI before task completion.

Canonical policy: [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).

## Checklist

1. Keyboard navigation works for all controls.
2. Tab order is logical and predictable.
3. `aria-expanded`, `aria-controls`, and labels are wired correctly.
4. `:focus-visible` styles are clearly visible.
5. Semantic landmarks, heading levels, and `headingoffset` for inner `h1` in demos — see accessibility rule above.
6. Modal/dialog roles and labelling (`role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-label`) — see accessibility rule above.
7. `img` `alt` values (descriptive or empty for decorative) — see accessibility rule above.
8. Color contrast is acceptable.

## Reporting Format

- Critical issues (must fix)
- Non-critical improvements
- Explicit pass statement if no blocking issues were found
