---
name: tailwind-tokenized-components
description: Builds layout sections with Tailwind utility composition and tokenized styling decisions. Use when implementing or refactoring sections from design layouts with utility-first policy.
disable-model-invocation: true
---

# Tailwind Tokenized Components

## Goal

Implement sections with utility-first patterns while controlling design consistency and loading performance.

## Workflow

1. Decompose layout into reusable section primitives (container, grid, card, media, CTA).
2. Use Tailwind utilities first for spacing, typography, color, and responsive behavior.
3. Reuse established utility patterns between sections for consistency.
4. Introduce custom/BEM class only if utility composition cannot represent the requirement.
5. Document any exception briefly.
6. Prefer lighter utility combinations and avoid style patterns that increase CSS/DOM cost without clear UX value.
7. If custom CSS is required, order properties from high layout impact to local styling details for readability.
8. Keep atomic utility classes in markup aligned with canonical `prettier-plugin-tailwindcss` sorting.
9. If custom fonts are touched, keep declarations lean: only required variants, `WOFF/WOFF2`, and `font-display: swap`.

## Decision Guardrails

- Prefer framework component APIs for interactive behavior.
- Keep classes readable and avoid one-off arbitrary values unless unavoidable.
- Prefer choices that reduce render cost, CSS bloat, and media payload size.
- Prefer local font/script delivery from the project server when external CDN usage is avoidable.
