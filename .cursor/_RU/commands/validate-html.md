# validate-html

Формальная HTML-валидация **собранных** `dist/**/*.html` перед закрытием layout-задач. В проекте один обязательный гейт через npm-пакет **`html-validate`** (входит в `npm run qa` после сборки).

## Когда запускать

- После `npm run build` всегда запускай **`npm run qa`** (HTML-валидация + линт + a11y) или валидатор напрямую:
  - `npm run validate:html`

## Команды

HTML-валидация (локально, офлайн, только npm):

```bash
npm run validate:html
```

Полный QA (сборка + линт + HTML-валидация + a11y):

```bash
npm run qa
```

## Инструменты

- **`html-validate`** ([`.htmlvalidate.json`](../../.htmlvalidate.json)) — локальная проверка по WHATWG HTML Living Standard; без Java, без сети, без внешних сервисов.
- Это не побайтовый Nu Html Checker — часть Nu-специфичных кейсов (некоторые вложенные SVG / дубли `id`) может отличаться.

После массового импорта Figma-SVG в `app/img/layout-shell/` перед проверкой выполняй **`npm run normalize:svg-layout`**, затем сборку.

## Блокирующее правило

- Любая **error** от `html-validate` блокирует сдачу.

## Отчётность

- Фиксируй `pass|fail`, команду (`validate:html` или `qa`), пути файлов и текст ошибок при провале.
