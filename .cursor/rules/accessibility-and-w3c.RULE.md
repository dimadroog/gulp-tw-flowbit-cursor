---
description: Accessibility, W3C, and interaction safety baseline.
alwaysApply: true
---

# Accessibility And W3C Policy

- Enforce semantic landmarks and heading hierarchy.
- Use semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`) as a required page baseline.
- Use `section` and `article` carefully: each instance must contain a meaningful heading (typically `h2` or `h3`).
- Every page must contain one `h1`. If the layout omits a visible title, add an accessible visually-hidden `h1`.
- Every `img` must include an `alt` attribute: descriptive text for informative images, empty `alt=""` for decorative images.
- Interactive controls must be keyboard reachable and operable.
- Use `:focus-visible` styles with clear visible contrast.
- Ensure `aria-*` wiring is complete for dynamic controls (`aria-expanded`, `aria-controls`, labels, states).
- Validate color contrast and avoid text rendered only through background images.

## Interaction Checklist

- Tab order follows visual and logical order.
- Modal/offcanvas interactions preserve focus management and close behavior.
- Decorative elements are hidden from assistive technologies when appropriate.
