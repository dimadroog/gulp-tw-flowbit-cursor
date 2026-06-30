# finalize-layout-task

> Перевод для человека. **Enforce:** [`.cursor/commands/finalize-layout-task.md`](../../../.cursor/commands/finalize-layout-task.md).

Единый финальный гейт (§A → §B → §C → §C.1). Заменяет бывшие `pre-final-self-check` и `validate-all-directives`.

- **§A** — self-check (да/нет, блокеры), включая пункт 8: при изменениях в `app/` — §C.1 с evidence по строкам.
- **§B** — матрица гейтов (`pass|fail|not_applicable`, без `not_run`).
- **§C** — directive sweep по применимым rules/commands.
- **§C.1** — **блокирующие spot-checks** alwaysApply-правил, если задача трогала `app/`:
  - `&nbsp;` в русских строках JSON/Nunjucks ([`html-nunjucks-conventions`](../rules/html-nunjucks-conventions.md) § Non-breaking spaces);
  - flex вместо grid, без лишних `w-*`/`h-*` на тексте и контролах ([`layout-sizing-and-flex`](../rules/layout-sizing-and-flex.md));
  - единицы в `px`, CSS placement, Tailwind/CSS authoring, изображения, Figma assets, JS scope — см. таблицу в EN-версии.

`overall_status: pass` только когда все применимые пункты §A–§C.1 пройдены. В отчёте — таблица §C.1 (check / status / file evidence), если менялся `app/`.
