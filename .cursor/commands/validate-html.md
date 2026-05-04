# validate-html

Formal HTML validation on **built** `dist/**/*.html` before closing layout tasks. This project runs **two** mandatory gates (both are part of `npm run qa` after build).

## When to run

- After `npm run build`, always run **`npm run qa`** (includes both validators + lint), or run the two validators directly:
  - `npm run validate:html`
  - `npm run validate:w3c`

## Commands

Fast/offline checker (supplementary):

```bash
npm run validate:html
```

**W3C Nu HTML Checker** (authoritative for Nu parity: full document + embedded SVG rules):

```bash
npm run validate:w3c
```

Full QA (build + lint + both HTML gates):

```bash
npm run qa
```

## Tooling

1. **`html-validate`** (`.htmlvalidate.json`) — локально, без сети; часть правил HTML/a11y, но **не заменяет Nu** по SVG/`id`/ряду предупреждений.
2. **`validate:w3c`** — движок **Nu**: если в `PATH` есть `java`, используется `vnu.jar` из пакета `vnu-jar`; если Java нет, те же проверки выполняются через **POST на `https://validator.w3.org/nu/`** (содержимое HTML уходит на сервис W3C — не для строго конфиденциальных страниц без отдельного Nu-сервера).

После массового импорта Figma-SVG в `app/img/layout-shell/` перед проверкой выполняй **`npm run normalize:svg-layout`**, затем сборку.

## Blocking rule

- Любая ошибка или предупреждение уровня Nu (error / warning в JSON ответа), которую ловит `validate:w3c`, блокирует сдачу.
- Любая ошибка `html-validate` — блокирует сдачу.

## Reporting

- Фиксируй `pass|fail`, команды (`validate:html`, `validate:w3c` или `qa`), пути файлов и текст сообщений Nu при провале.
