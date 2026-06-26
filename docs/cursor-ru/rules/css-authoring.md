# Политика авторинга CSS

> Перевод для человека. **Enforce:** [`.cursor/rules/css-authoring.RULE.md`](../../../.cursor/rules/css-authoring.RULE.md).

- Стили проекта — в **`app/css/`** как plain CSS. **Не** добавлять Sass/SCSS в этот репозиторий.
- Единая точка входа PostCSS: **`app/css/style.css`** (`@import "tailwindcss"`, `@source`, `@config`, секционные `@import`).
- Секционные файлы (`components.css`, `header.css`, `motion.css`, …) используют **`@layer base`** / **`@layer components`** и **`@apply`** где уместно.
- **Варианты Preline:** при подключении модуля импортировать только `variants.css` из `@preline/*` в `style.css` — **не** `theme.css`.
- **CSS custom properties:** не оставлять неиспользуемые `--tokens`; если `var(--foo)` без setter на `:root`, родителе или inline в шаблонах — используйте значение напрямую или определите `--foo`.
- **Проверка:** `npm run build` без ошибок PostCSS/Tailwind; grep `app/css` на мёртвые `var(--` без определений.
