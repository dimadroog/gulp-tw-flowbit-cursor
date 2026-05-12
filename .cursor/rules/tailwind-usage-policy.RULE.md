---
description: Tailwind-first styling policy with controlled exceptions.
alwaysApply: true
---

# Tailwind Usage Policy

- Use utility-first Tailwind classes as the default styling approach.
- Prefer tokenized spacing, typography, radius, and color utilities over ad-hoc values.
- Compose sections with reusable utility patterns before introducing custom CSS.

## BEM Exception Policy

- **Required semantic wrappers** — **`app/scss/_components.scss`**: project-authored **buttons** (**`.btn` + `.btn-*`**), **`.form-label`** / **`.form-check-label`**, textual **`.form-control`**, **`checkbox`/`radio`** **`.form-check-input`**, and page **`.container`** belt are composed with **`@apply`**; see [`rules/semantic-component-apply.RULE.md`](semantic-component-apply.RULE.md). Those are **not** ad-hoc BEM escapes.
- Other BEM/custom classes are allowed only when utility composition cannot satisfy the requirement.
- When using BEM/custom CSS, add a short reason in code comments or PR notes.
- Keep exception scope minimal and local to the problematic component.

## Custom CSS Property Order

- In custom CSS/SCSS blocks, sort properties from global layout impact to local styling details.
- Recommended order:
  1. Positioning and flow: `position`, `top/right/bottom/left`, `float`, `clear`, `z-index`.
  2. Box size and spacing: `width/height`, `margin`, `padding`.
  3. Border and related edge properties.
  4. Content and behavior: `list-style`, `overflow`, and similar properties.
  5. Visual and typography styling: `background`, `color`, `font`, and decorative properties.
- Use the guiding principle: from general/high-impact to local/less critical details.

## Atomic Class Order In Markup

- Keep utility classes ordered according to the canonical `prettier-plugin-tailwindcss` sorting logic.
- Treat plugin order as the source of truth; avoid maintaining parallel custom sort rules.
- Even when the plugin is not installed, write class lists in the same canonical order for consistency.
- Keep `js-*` classes as behavior hooks and place them after utility classes when this does not conflict with automatic formatting.
- **Hover/focus and expand motion durations** for project-authored surfaces follow [`rules/interactive-transition-timing.RULE.md`](interactive-transition-timing.RULE.md).

## Form controls (entered text)

- **Form input family:** `input` (including **`checkbox`** and **`radio`**), `select`, and `textarea` are all **native form inputs**; pair them with **`label`**, use **`fieldset`/`legend`** when grouping related choices, and wire **`aria-invalid` / `aria-describedby`** consistently. Styling split: **`.form-control`** applies only to textual `input` / `select` / **`textarea`** — see [`semantic-component-apply.RULE.md`](semantic-component-apply.RULE.md) § Form controls.
- Prefer the **`.form-control`** class (**`@apply`** stack in **`_components.scss`**) on text-like `input` / `select` / `textarea` rather than repeating the full utility string in templates; it already enforces **`text-base` (~1rem)** for the **typed/selected text or placeholder**.
- Otherwise, for native controls where **the user-visible value or placeholder typography** applies (text-like `input` types*, `select`, `textarea`), set **`font-size: 1rem`** (blocking for layout work unless the brief documents an intentional exception).
- If not using `.form-control`, use **`text-base`** while this repo keeps the default `theme.fontSize` scale where `base === 1rem`; do **not** use smaller/larger typography utilities (`text-sm`, `text-lg`, etc.) solely to resize typed text in those controls.
- If `tailwind.config.js` ever changes `fontSize.base` away from `1rem`, reconcile by restoring `base` to `1rem` for typed controls or applying an explicit **`text-[1rem]`** on those controls so this policy stays satisfied.

*`type` values where the policy targets **glyph-sized** user text, not the intrinsic control chrome: e.g. **`range`**, **`file`**, **`checkbox`**, **`radio`**, **`button`**, **`submit`** follow layout/a11y grouping above but do **not** use `.form-control`; size their hit targets and labels per component rules, not the **1rem typed-text** requirement.
