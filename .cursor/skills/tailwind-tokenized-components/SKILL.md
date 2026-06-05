---
name: tailwind-tokenized-components
description: Builds layout sections with Tailwind utility composition and tokenized styling decisions. Use when implementing or refactoring sections from design layouts with utility-first policy.
disable-model-invocation: true
---

# Tailwind Tokenized Components

## Goal

Implement sections with utility-first patterns while controlling design consistency and loading performance.

Canonical policy: [`rules/tailwind-usage-policy.RULE.md`](../../rules/tailwind-usage-policy.RULE.md); delivery and fonts — [`rules/architecture-and-delivery-policy.RULE.md`](../../rules/architecture-and-delivery-policy.RULE.md).

## Workflow

1. Decompose layout into reusable section primitives (container, grid, card, media, CTA).
2. Apply Tailwind utilities for spacing, typography, color, and responsive behavior — per tailwind-usage policy.
3. Reuse established utility patterns between sections for consistency.
4. Custom/BEM class only when utilities cannot represent the requirement; document exceptions briefly.
5. Class sort (`prettier-plugin-tailwindcss`), custom CSS property order, fonts (`WOFF`/`WOFF2`, `font-display: swap`) — per linked rules above.
6. Interactive behavior: framework component APIs first — [`rules/javascript-minimalism.RULE.md`](../../rules/javascript-minimalism.RULE.md).

## Decision Guardrails

- Avoid one-off arbitrary values unless unavoidable.
- Prefer choices that reduce render cost, CSS bloat, and media payload size.
