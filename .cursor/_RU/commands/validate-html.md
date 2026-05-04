# validate-html

Формальная проверка HTML по собранному `dist/**/*.html` перед закрытием задач по вёрстке. В проекте обязательны **два** gate (оба входят в `npm run qa` после сборки).

## Когда запускать

- После `npm run build` всегда **`npm run qa`** (включает оба валидатора и линт) или по отдельности:
  - `npm run validate:html`
  - `npm run validate:w3c`

## Команды

Быстрый офлайн-чекер (дополнительно):

```bash
npm run validate:html
```

**W3C Nu HTML Checker** (эталон Nu: весь документ + вложенный SVG):

```bash
npm run validate:w3c
```

Полный QA (сборка + линт + оба HTML-gate):

```bash
npm run qa
```

## Инструменты

1. **`html-validate`** (`.htmlvalidate.json`) — локально, без сети; **не заменяет Nu** для части SVG/`id`/предупреждений.
2. **`validate:w3c`** — движок **Nu**: при `java` в `PATH` — `vnu.jar` из `vnu-jar`; без Java — **POST на `https://validator.w3.org/nu/`** (HTML отправляется сервису W3C; для строго конфиденциальных страниц нужен свой Nu/локальная Java).

После массового импорта Figma-SVG в `app/img/layout-shell/` перед проверкой: **`npm run normalize:svg-layout`**, затем сборка.

## Блокирующее правило

- Любая ошибка или предупреждение уровня Nu (error / warning в JSON), которое ловит `validate:w3c`, блокирует сдачу.
- Любая ошибка `html-validate` блокирует сдачу.

## Отчётность

- Фиксируй `pass|fail`, команды (`validate:html`, `validate:w3c` или `qa`), пути и текст сообщений Nu при провале.
