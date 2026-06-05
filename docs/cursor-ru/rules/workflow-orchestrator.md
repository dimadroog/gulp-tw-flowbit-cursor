# Политика workflow-оркестрации (справка)

> Перевод для человека. **Enforce:** [`.cursor/rules/workflow-orchestrator.RULE.md`](../../../.cursor/rules/workflow-orchestrator.RULE.md).

- Для оркестрации и rules — **только** английские файлы в `.cursor/`; `docs/cursor-ru/` — для чтения человеком, если пользователь явно не `@`-упомянул путь.

## Маршрутизация по намерению

- **Governance** (новые или развивающиеся регламенты, структура `.cursor/`): [`commands/add-rule.md`](../../../.cursor/commands/add-rule.md) и [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §1.1–1.2. Не дублировать baseline-списки вне канонического WORKFLOW.
- **Реализация** (страницы, секции, рефакторинг, документация): [`commands/run-layout-task.md`](../../../.cursor/commands/run-layout-task.md) как **основной orchestrator**; рецепты по типу (`new-page`, `build-section` и т.д.) — из его Orchestration flow. Канонический стек, mockup fidelity, гейты и команды репо: [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §1–3.
- Не смешивать незакрытые пробелы project baseline с исполнением задачи по вёрстке.

## Авто-оркестрация

- Не ожидать, что пользователь перечислит все вспомогательные команды.
- Автоматически выбирать и связывать подкоманды по смыслу: страница, секция, framework refactor, design-system documentation.
- Применять гейты, чеклисты и subject rules по [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §3 и матрице Pre/In/Post в `run-layout-task` — не перечислять их здесь.
- Незакрытые блокирующие TODO и отложенная fidelity — блокеры завершения.
