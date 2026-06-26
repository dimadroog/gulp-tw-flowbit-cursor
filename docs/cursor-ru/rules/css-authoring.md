# Политика авторинга CSS

> Перевод для человека. **Enforce:** [`.cursor/rules/css-authoring.RULE.md`](../../../.cursor/rules/css-authoring.RULE.md).

- Стили проекта — в **`app/css/`** как plain CSS. **Не** добавлять Sass/SCSS в этот репозиторий.
- Единая точка входа PostCSS: **`app/css/style.css`** (`@import "tailwindcss"`, `@source`, `@config`, секционные `@import`).
- Секционные файлы (`components.css`, `header.css`, `motion.css`, …) используют **`@layer base`** / **`@layer components`** и **`@apply`** где уместно.
- **Варианты Preline:** при подключении модуля импортировать только `variants.css` из `@preline/*` в `style.css` — **не** `theme.css`.
- **CSS custom properties:** не оставлять неиспользуемые `--tokens`; если `var(--foo)` без setter на `:root`, родителе или inline в шаблонах — используйте значение напрямую или определите `--foo`.

## Простые SVG-иконки в CSS

Когда глиф рисуется **только через CSS** (`background-image`, `mask-image`, `::before`/`::after`, кастомная галочка checkbox/radio). Inline в разметке для структурных иконок: [`figma-asset-integrity.md`](./figma-asset-integrity.md) § Простые векторные иконки (разметка).

- Формат: `url("data:image/svg+xml,<encoded-svg>")`.
- **Кодируй всю SVG-разметку** — не вставляй сырой XML в `url(...)`.
  - Минимум: `%3C` / `%3E` для `<` / `>`; `%23` для `#` в hex-цветах (например `fill='%23FFF9F5'`).
  - Внутри SVG-фрагмента предпочитай **одинарные кавычки** у атрибутов.
  - Лишние пробелы убирай; завершающий `%0A` после `%3E%3C/svg%3E` допустим.
- **Запрещено:** незакодированный `<svg`, незакодированные `"` вокруг SVG-тегов, сырой `#` в цветах, внешний `url("…/icon.svg")` для простых глифов, которые должны быть data URI.
- Геометрия path — как в экспорте макета; меняются только кодирование и стиль кавычек.

## Проверка

- `npm run build` без ошибок PostCSS/Tailwind; grep `app/css` на мёртвые `var(--` без определений.
- После добавления CSS icon data URI: `rg 'data:image/svg\+xml,[^%]*<' app/css` — **ноль совпадений**; `rg 'data:image/svg\+xml,.*#' app/css` — **ноль совпадений** с незакодированным `#` в hex fill/stroke.
