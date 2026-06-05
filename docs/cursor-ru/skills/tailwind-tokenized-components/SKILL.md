---
name: tailwind-tokenized-components
description: Собирает секции с Tailwind utility-композицией и токенизированными styling-решениями. Используй при реализации или рефакторинге секций из макетов с utility-first политикой.
disable-model-invocation: true
---

# Tailwind tokenized components

## Цель

Реализовывать секции в utility-first подходе с контролем дизайн-консистентности и производительности загрузки.

Канон policy: [`rules/tailwind-usage-policy.md`](../../rules/tailwind-usage-policy.md); delivery и шрифты — [`rules/architecture-and-delivery-policy.md`](../../rules/architecture-and-delivery-policy.md).

## Workflow

1. Разбей макет на переиспользуемые примитивы (container, grid, card, media, CTA).
2. Tailwind utilities для spacing, typography, color и responsive — по tailwind-usage policy.
3. Переиспользуй сформированные utility-паттерны между секциями.
4. Custom/BEM class только если utilities не покрывают требование; кратко документируй исключения.
5. Сортировка классов (`prettier-plugin-tailwindcss`), порядок CSS-свойств, шрифты (`WOFF`/`WOFF2`, `font-display: swap`) — по связанным rules выше.
6. Интерактив: сначала framework component APIs — [`rules/javascript-minimalism.md`](../../rules/javascript-minimalism.md).

## Decision guardrails

- Избегай разовых arbitrary values без необходимости.
- Предпочитай решения, которые уменьшают render-cost, раздувание CSS и размер media payload.
