# Политика JavaScript minimalism

> **Enforce:** [`.cursor/rules/javascript-minimalism.RULE.md`](../../../.cursor/rules/javascript-minimalism.RULE.md).

- Библиотека интерактивов по умолчанию: **Preline** (`@preline/*`, MIT, модульно).
- Перед custom JS проверь API нужного модуля Preline.
- Для accordion, modal, offcanvas, tabs, dropdown и похожих паттернов — сначала Preline; если модуль не подключён — [`add-preline-module`](../commands/add-preline-module.md).
- Custom JS только при явной недостаточности Preline.

## Preline-First покрытие

- По умолчанию: `data-hs-*` и разметка `hs-*` для overlay, dropdown, tabs, carousel, select, file-upload, accordion, collapse, tooltip (каждый через свой `@preline/*` по необходимости).
- Модули auto-init на `window.load`; избегай лишнего `new HS*()` без расширения поведения.
- Custom wrappers — небольшие и переиспользуемые.

## Политика для gap-зон

- `scrollspy`: внутренний helper с `data-scrollspy-nav` до third-party.
- Searchable select: не подключать `@preline/select` глобально — только через `add-preline-module` для нужных страниц.

## Именование JS-хуков

- **`js-*` классы** в приоритете для своего JS в `app/js/**`.
- **`id` без `js-`** допустим для контракта Preline (`data-hs-overlay="#site-search-modal"`) — свой JS **не** выбирает этот id.
- **Preline overlay:** стабильный `id` на корне `hs-overlay`; своё поведение — через `js-*`, не `getElementById` по overlay id.

## Проверка

- Grep `app/js/**`: нет выборки id без `js-` (кроме исключений в отчёте).
- Grep `app/css/**`: нет селекторов `.js-` / `#js-`.
