---
name: nunjucks-loop-and-partials
description: Optimizes Nunjucks templates with loops, includes, and macros to remove duplication and improve maintainability. Use when repeated markup patterns or large monolithic templates appear.
disable-model-invocation: true
---

# Nunjucks loops и partials

## Цель

Преобразовать повторяющиеся HTML-паттерны в data-driven Nunjucks-структуры.

## Workflow

1. Найди повторяющиеся блоки (cards, nav items, feature lists, links).
2. Вынеси общую структуру в include или macro.
3. Перенеси вариативный контент в массивы/объекты и рендерь через loops.
4. Сохраняй единые naming conventions и форму данных.
5. Проверь, что итоговая HTML-семантика не изменилась.

## Правила

- Для каждого повторяющегося UI-блока должен быть один источник шаблона.
- Избегай параллельных копий почти идентичных snippets.
- Держи macros узкими и предсказуемыми (явные параметры, без скрытых side effects).
