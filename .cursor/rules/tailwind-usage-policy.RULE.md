---
description: Tailwind-first styling policy with controlled exceptions.
alwaysApply: true
---

# Tailwind Usage Policy

- Use utility-first Tailwind classes as the default styling approach.
- Prefer tokenized spacing, typography, radius, and color utilities over ad-hoc values.
- Compose sections with reusable utility patterns before introducing custom CSS.

## BEM Exception Policy

- BEM/custom classes are allowed only when utility composition cannot satisfy the requirement.
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
