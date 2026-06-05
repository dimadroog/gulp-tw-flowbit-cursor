---
name: scaffold-page-from-layout
description: Creates a new page scaffold from a layout brief using project template and styling conventions. Use when creating a new page shell, page-level template, head/meta structure, and initial section includes.
disable-model-invocation: true
---

# Scaffold page from layout

## Цель

Чистый переиспользуемый каркас страницы: SEO, семантика, секции через includes.

Процедура гейта: [`commands/new-page.md`](../../commands/new-page.md).

## Workflow

1. Уточни маршрут, цель страницы и ключевые зоны контента.
2. Landmarks, заголовки, структура Nunjucks — [`rules/html-nunjucks-conventions.md`](../../rules/html-nunjucks-conventions.md); accessibility — [`rules/accessibility-and-w3c.md`](../../rules/accessibility-and-w3c.md).
3. Document shell: `<html lang="ru">` (если не задана другая локаль), viewport meta, SEO-заглушки (`description`, `keywords`).
4. `<title>` совпадает с именем страницы в `app/index.html`.
5. Крупные блоки вынеси в section partials заранее.
6. Слоты изображений — [`rules/image-delivery-and-optimization.md`](../../rules/image-delivery-and-optimization.md).
7. Корректный `alt` у каждого `img` — [`rules/accessibility-and-w3c.md`](../../rules/accessibility-and-w3c.md).
8. Устойчивость контента (длинный текст, разные пропорции изображений) — [`rules/image-delivery-and-optimization.md`](../../rules/image-delivery-and-optimization.md).

## Interaction baseline (если на странице есть интерактив)

Framework-first и JS hooks — [`rules/javascript-minimalism.md`](../../rules/javascript-minimalism.md); baseline стека — [`WORKFLOW.md`](../../WORKFLOW.md) §1.1.

## Output requirements

- Каркас готов к итерации по секциям.
- Повторяющиеся блоки подготовлены к loops/macros.
- Допущения по focus/a11y зафиксированы для будущих интерактивов.
- Landmarks, заголовки, изображения и document shell проверены по связанным rules и команде `new-page`.
