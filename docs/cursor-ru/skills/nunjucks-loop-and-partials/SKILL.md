---
name: nunjucks-loop-and-partials
description: Optimizes Nunjucks templates with loops, includes, and macros to remove duplication and improve maintainability. Use when repeated markup patterns or large monolithic templates appear.
disable-model-invocation: true
---

# Nunjucks loops и partials

## Цель

Преобразовать повторяющиеся HTML-паттерны в data-driven Nunjucks-структуры.

Канон policy: [`rules/html-nunjucks-conventions.md`](../../rules/html-nunjucks-conventions.md) (partials, loops, fixture `{% set %}`, include modifiers).

## Workflow

1. Найди повторяющиеся блоки (cards, nav items, feature lists, links).
2. Вынеси общую структуру в include или macro.
3. Перенеси вариативный контент в массивы/объекты и рендерь через loops.
4. Сохраняй единые naming conventions и форму данных.
5. Проверь, что итоговая HTML-семантика не изменилась.

## Guardrails

- Один источник шаблона на повторяющийся UI-блок; без параллельных почти идентичных snippets.
- Macros: явные параметры, без скрытых side effects — по html-nunjucks rule выше.
