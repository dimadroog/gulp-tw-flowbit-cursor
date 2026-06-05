---
name: scaffold-page-from-layout
description: Создает каркас новой страницы из layout-брифа по шаблону проекта и styling-конвенциям. Используй при создании page shell, page-level шаблона, head/meta структуры и начальных section includes.
disable-model-invocation: true
---

# Scaffold Page From Layout

## Цель

Создать чистую переиспользуемую базу страницы с SEO, семантической структурой и секциями, готовыми к include-композиции.

## Workflow

1. Подтверди целевой маршрут/назначение страницы и ключевые зоны контента.
2. Создай Nunjucks page shell с обязательными семантическими landmarks (`header`, `nav`, `main`, `aside`, `footer`) и дефолтным `<html lang="ru">`, если явно не нужен другой язык.
3. Добавь обязательные metadata с фиксированным viewport и SEO-заглушками, если финальный контент не предоставлен:
   - `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - `<meta name="description" content="description">`
   - `<meta name="keywords" content="keywords">`
4. Установи `<title>`, согласованный с названием страницы в `app/index.html`.
5. Добавь один `h1`, соответствующий цели страницы; при необходимости делай его visually-hidden, но доступным.
6. Используй `section` и `article` только когда каждый блок имеет содержательный заголовок (`h2`/`h3` по контексту).
7. Рано разделяй крупные блоки страницы на section partials.
8. Запланируй слоты изображений по [`rules/image-delivery-and-optimization.md`](../../rules/image-delivery-and-optimization.md) (enforce: [`.cursor/rules/image-delivery-and-optimization.RULE.md`](../../../../.cursor/rules/image-delivery-and-optimization.RULE.md)).
9. Для каждого `img` обеспечь корректный `alt` по [`rules/accessibility-and-w3c.md`](../../rules/accessibility-and-w3c.md).
10. Проведи быструю проверку устойчивости (длинный текст, разные пропорции изображений) по image-delivery rule.

## Interaction Baseline (если на странице есть интерактивные блоки)

1. Для modal, accordion, collapse, drawer/offcanvas, tabs, dropdown, tooltip сначала используй Flowbite/data-attribute паттерны.
2. Если нужен custom JS, изолируй pure-логику от DOM side effects.
3. Делай инициализацию idempotent и безопасной для повторных запусков.
4. Используй `js-*` классы и/или `data-*` атрибуты как behavioral hooks, но не как styling hooks.

## Требования к результату

- Каркас страницы готов к итерациям на уровне секций.
- Повторяющиеся блоки подготовлены для loops/macros вместо copy-paste.
- Допущения по focus и accessibility зафиксированы для будущих интерактивных блоков.
- Использование landmarks и иерархия заголовков явно валидны.
- Базовая верстка устойчива к изменению длины контента и пропорций изображений по image-delivery rule.
- Базовые параметры документа и соответствие заголовка страницы реестру явно валидны.
