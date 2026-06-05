# finalize-layout-task

> Перевод для человека. **Enforce:** [`.cursor/commands/finalize-layout-task.md`](../../../.cursor/commands/finalize-layout-task.md).

Единый финальный гейт (§A → §B → §C). Заменяет бывшие `pre-final-self-check` и `validate-all-directives`.

- **§A** — self-check (да/нет, блокеры).
- **§B** — матрица гейтов (`pass|fail|not_applicable`, без `not_run`).
- **§C** — directive sweep по применимым rules/commands.

`overall_status: pass` только когда все применимые пункты §A–§C пройдены.
