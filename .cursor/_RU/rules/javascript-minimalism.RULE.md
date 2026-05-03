---
description: Framework-first JavaScript policy and custom JS minimization.
alwaysApply: true
---

# Политика JavaScript minimalism

- Библиотека интерактивов по умолчанию для проекта: `Flowbite` (MIT, open-source).
- Перед написанием custom JS сначала проверять, есть ли нужный паттерн в API выбранного framework/library.
- Для accordion, modal, offcanvas, tabs, dropdown и похожих паттернов сначала использовать framework-native components.
- Добавлять custom JS только при явной недостаточности возможностей framework.

## Flowbite-First покрытие

- По умолчанию используй data attributes/API Flowbite для: modal, collapse, accordion, drawer/offcanvas, dropdown, tabs, tooltip.
- Делай custom wrappers/helpers небольшими и переиспользуемыми, вместо page-local одноразовых скриптов.

## Политика для gap-зон

- `scrollspy`: сначала используй внутренний IntersectionObserver helper с `data-scrollspy-nav`, и только потом рассматривай third-party add-ons.
- Searchable/custom select: не подключай глобальную select-библиотеку по умолчанию.
- Добавляй lightweight select plugin только для страниц/фич, где searchable select является жестким требованием.
- При подключении plugin ограничивай инициализацию селектором и фиксируй причину.

## Конвенция JS hook-классов

- Классы, используемые как JS-селекторы, должны иметь префикс `js-`.
- `js-*` классы использовать только как behavioral hooks, а не как styling hooks.
- Не объявлять CSS-селекторы для `js-*` классов в файлах стилей.

## Decision gate

1. Определи нужное взаимодействие.
2. Проверь наличие эквивалентного framework component или plugin.
3. По умолчанию реализуй через framework API.
4. Если требуется custom JS, зафиксируй причину, почему framework-поведения недостаточно.
