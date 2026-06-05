---
description: Accessibility, W3C, and interaction safety baseline.
alwaysApply: false
globs:
  - app/**/*.njk
  - app/**/*.html
  - app/js/**
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

## Document outline and `headingoffset`

- Treat **one** `h1` as the document’s top-level heading (page title or equivalent). Assistive tools and outline algorithms treat **every** bare `h1` as top-level unless offset.
- When a block **demonstrates** or **embeds** article/WYSIWYG markup that includes its own `h1`–`h6` (design-system typography samples, `.typography` previews, fixture bodies), **do not** add a second document-level `h1` without correction.
- **Required fix:** on the wrapper that contains the inner heading ladder (e.g. `.typography`, demo panel, quoted article body), set `headingoffset="1"` so inner `h1` is treated one level deeper (`h2` in the outline). Increase the value if the demo sits under deeper section headings.
- **Alternatives** (only when `headingoffset` is unsuitable): show demo headings as `h2`–`h6` only, or use non-heading elements styled to match — but preserve real `h1` in the demo only with `headingoffset`.
- **Verification:** W3C Nu Checker (or equivalent) reports no warning that multiple `h1` elements are all treated as top-level; `npm run validate:html` after `npm run build` remains **pass**.

## Modal and dialog markup (`div` + `aria-labelledby`)

- A `div` has implicit role **`generic`**. **`aria-labelledby`** (and **`aria-label`**) on a `div` are **invalid** unless the element has an explicit role **other than** `caption`, `code`, `deletion`, `emphasis`, `generic`, `insertion`, `paragraph`, `presentation`, `strong`, `subscript`, or `superscript`.
- **Flowbite / custom modal roots:** on the **outer** modal container (the node targeted by `data-modal-target` / `id` used for show/hide), set **`role="dialog"`**, **`aria-modal="true"`**, and **`aria-labelledby`** (or **`aria-label`**) together. Do **not** put `role="dialog"` only on an inner content box while `aria-labelledby` stays on an outer unroled `div` — that duplicates or breaks the dialog contract.
- **`aria-labelledby`** must reference an **`id` present in the DOM** for the open state (visible heading or `.sr-only` label). Avoid duplicate `id` values across form vs success views.
- Do **not** nest `role="dialog"` elements.
- **Verification:** W3C Nu Checker shows no error that `aria-labelledby` is disallowed on `div`; modal partials in shared layout includes pass `npm run validate:html`.

## Interaction Checklist

- Tab order follows visual and logical order.
- Modal/offcanvas interactions preserve focus management and close behavior; modal roots follow **Modal and dialog markup** above.
- Decorative elements are hidden from assistive technologies when appropriate.
