# add-preline-module

> Перевод для человека. **Enforce:** [`.cursor/commands/add-preline-module.md`](../../../.cursor/commands/add-preline-module.md).

Подключить модуль `@preline/*` в заготовку. **Не** добавлять модули заранее — только когда задача вёрстки требует интерактив.

## Вход

- Имя модуля (`dropdown`, `overlay`, `tabs`, …)
- Разметка/фичи, которым нужен модуль

## Шаги

1. **npm** — установить пакет (+ peer deps при необходимости):

   ```bash
   npm i @preline/dropdown
   # select: npm i @preline/select lodash
   # file-upload: npm i @preline/file-upload dropzone
   ```

2. **CSS** — в `app/css/style.css`, **до** секционных импортов:

   ```css
   @source "../../node_modules/@preline/dropdown/*.js";
   @import "../../node_modules/@preline/dropdown/variants.css";
   ```

   Только **`variants.css`**, не `theme.css`.

3. **Gulp** — запись в `vendorLibs` в `gulpfile.js`.

4. **Скрипты в layout** — `<script src="lib/preline/<module>.js">` в `_main.njk` (`{% block scripts %}`), с учётом порядка зависимостей (`lodash` перед `select`, `dropzone` перед `file-upload`).

5. **Разметка + стили** — `hs-*`, `data-hs-*`, варианты `hs-dropdown-open:`, `hs-overlay-open:` и т.д.

6. `npm run build` — проверить `dist/lib/preline/<module>.js`.

## Готово

- Модуль в `package.json`, `style.css`, `vendorLibs`, layout, разметке задачи.
- `npm run qa` проходит.
