# Политика неукоснительного исполнения директив (справка)

> Перевод для человека. **Enforce:** [`.cursor/rules/directive-compliance.RULE.md`](../../../.cursor/rules/directive-compliance.RULE.md). Агент применяет только `.cursor/`, не это зеркало.

- Неукоснительно соблюдай все директивы в `.cursor/` (английский источник).
- Правила и чеклисты команд — обязательные ограничения, не рекомендации.
- Не обходи директивы ради скорости или удобства.
- При конфликте директив — фиксируй конфликт и разрешай по приоритетам в [`commands/run-layout-task.md`](../../../.cursor/commands/run-layout-task.md) (протокол эскалации).
- Если обязательную директиву невозможно выполнить — не завершай задачу; blocker и шаги устранения.
- Перед «готово» проверь все применимые директивы; порядок гейтов — [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §3, enforce через `run-layout-task` и [`finalize-layout-task`](../../../.cursor/commands/finalize-layout-task.md) (§A–§C).
- **Rule tiers:** orchestration core (`alwaysApply`) + subject rules по commands/globs.
- Отсутствие evidence по применимой проверке — нарушение директив.
