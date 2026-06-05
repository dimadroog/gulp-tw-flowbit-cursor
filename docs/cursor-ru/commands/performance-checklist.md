# performance-checklist

Чеклист скорости загрузки и runtime performance.

## Область

- Создание страницы
- Реализация секции
- Рефакторы с затронутыми JS/CSS/media

## Чеклист

Канон performance policy: [`rules/architecture-and-delivery-policy.md`](../rules/architecture-and-delivery-policy.md).

1. Сверь изменения с релевантными рекомендациями Lighthouse и PageSpeed (изображения, render-blocking, размер DOM, неиспользуемый код).
2. Доставка изображений (`loading`, intrinsic ≤ rendered × 2.0, WebP/сжатие) — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
3. `picture`/`srcset` там, где размер зависит от viewport; каждый кандидат в пределах правила 2× для своего слота.
4. PageSpeed Insights (или Lighthouse): аудит **«Properly size images»** без fail/warning для затронутых страниц.
5. Корректный `alt` у всех `img` — [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).
6. Минимум лишнего JS; нативный HTML/CSS или framework-native — [`rules/javascript-minimalism.md`](../rules/javascript-minimalism.md).
7. Убери дублирующийся или мёртвый CSS/JS после реализации.
8. DOM без лишних обёрток.
9. Webfont (`WOFF`/`WOFF2`, self-hosted, загруженные варианты, `font-display: swap`) — [`rules/architecture-and-delivery-policy.md`](../rules/architecture-and-delivery-policy.md).
10. Стресс-контент: длинный текст и другие пропорции изображений не ломают layout и не дают сильный CLS — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
11. Зафиксируй ожидаемые performance trade-offs в отчёте.

## Вывод

- Краткая performance-заметка:
  - ключевые оптимизации
  - применённые или отложенные рекомендации Lighthouse/PageSpeed
  - решения по шрифтам (форматы, хостинг, загруженные варианты, `font-display`)
  - нерешённые hotspots
  - follow-up TODO
