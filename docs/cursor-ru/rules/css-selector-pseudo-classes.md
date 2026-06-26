# Псевдоклассы и селекторы CSS

> **Enforce:** [`.cursor/rules/css-selector-pseudo-classes.RULE.md`](../../../.cursor/rules/css-selector-pseudo-classes.RULE.md).

- **Семантические классы** (`.btn`, `.article-prose`, BEM-блоки) — основной способ ограничить стили; «голые» элементы — в **`app/css/components.css`** (`@layer base`) — см. [`tailwind-usage-policy.md`](./tailwind-usage-policy.md).

## `:where()` / `:is()`

- **`:where()` обнуляет специфичность** — может проигрывать Preflight; не использовать для глобальной типографики без проверки в DevTools.

Если цель — «глобальный `button` не ломает кнопки», используйте **`.btn`** / form-классы из `components.css`, а не `:where(button)`.

## Проверка

- [ ] `rg ':where\\(|:is\\(' app/css` — нет совпадений или у каждого комментарий с исключением.

## См. также

- [`css-authoring.md`](./css-authoring.md) — plain CSS в `app/css/`, Tailwind 4 через `style.css`.
