---
description: Framework-first JS; js-* hooks для классов и id в custom JS; исключения id для data-API Flowbite.
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

## Именование JS-хуков (классы и id)

Для **своего JavaScript** в `app/js/**` и inline-init. Визуал — semantic/BEM/Tailwind классы.

### Селекторы в custom JS

- **В приоритете `js-*` классы** — `querySelector('.js-…')`, делегирование с корня `js-*`, `closest('.js-…')`, если это не усложняет код.
- **`id` с префиксом `js-`** — `getElementById('js-…')` / `#js-…` только когда без id неудобно (нет стабильной обёртки, жёсткая связка с `for`/`aria-*` на том же узле).
- Не дублировать один и тот же hook классом и id без причины.
- **`js-*` только для поведения** — не стилизовать `js-*` и `#js-*` в SCSS/CSS.

### Когда `id` без `js-` допустим

| Случай | Пример | Условие |
|--------|--------|---------|
| Контракт библиотеки / data-API | `id="site-search-modal"`, `data-modal-target="site-search-modal"` | Строка id в **`data-*` атрибутах** framework; **свой JS не** выбирает узел через `#site-search-modal` / `getElementById('site-search-modal')` |
| Доступность / подписи | `id="site-search-modal-title"`, `for="…"` | Не JS-hook |
| Якоря / контент | `id="…"` в `href` на той же странице | Не используется в `app/js`; заглушки перехода — `href="#"` по [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Link href |
| `<a>` только для JS | `href="javascript:;"` | Не `href="#"`; см. html-nunjucks § Link href |

**Паттерн Flowbite в репозитории:** стабильный **`id` без `js-`** для `data-modal-*` / `data-drawer-*`; своё поведение — через классы **`js-*`** и/или триггеры `data-modal-hide` / `data-modal-toggle`, **не** `getElementById` по library-id.

### Проверка

- Grep `app/js/**`: нет `getElementById`, `querySelector('#…')` на id **без** `js-`, кроме исключения в отчёте задачи.
- Grep `app/scss/**`: нет селекторов `.js-` / `#js-`.
- Разметка: hooks для своего JS — `js-*`; id без `js-` не используются как селекторы в своих скриптах.

## Decision gate

1. Определи нужное взаимодействие.
2. Проверь наличие эквивалентного framework component или plugin.
3. По умолчанию реализуй через framework API.
4. Если требуется custom JS, зафиксируй причину, почему framework-поведения недостаточно.
