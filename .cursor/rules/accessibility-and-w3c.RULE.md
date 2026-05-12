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

## Color contrast without an approved mockup

- When the brief is **conceptual only** (no Figma/mockup fidelity gate), treat **WCAG 2.1 Level AA** as the default minimum for authored UI: roughly **≥4.5:1** contrast for normal text and **≥3:1** for large text (approx. ≥18 pt / ≥14 pt bold) and for **meaningful borders/icons** paired with neighboring colors.
- Prefer **palette tokens already in [`tailwind.config.js`](../../tailwind.config.js)** (**`brand.*`**, **`primary.*`**, semantic **`success|warning|danger`**) layered on **`bg-white`** / surfaces instead of improvising pastel-on-pastel or gray-on-gray pairs likely to fall below thresholds.
- If a pairing is ambiguous, **verify** with a contrast checker (browser DevTools “Contrast”, WebAIM checker, APCA where appropriate); **adjust** lightness or hue before shipping.
- Reserve **exceptions** weak on contrast only for designer/product-documented waiver in the task (same posture as §1.2 mockup waivers).

## Interaction Checklist

- Tab order follows visual and logical order.
- Modal/offcanvas interactions preserve focus management and close behavior.
- Decorative elements are hidden from assistive technologies when appropriate.
