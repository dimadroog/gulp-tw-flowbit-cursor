# Политика workflow-оркестрации (справка)

> Перевод для человека. **Enforce:** [`.cursor/rules/workflow-orchestrator.RULE.md`](../../../.cursor/rules/workflow-orchestrator.RULE.md).

## Жизненный цикл (governance vs реализация)

- Baseline стека и mockup fidelity — [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §1.1–1.2; изменения регламентов — `commands/add-rule.md`.
- Для ежедневной реализации — `commands/run-layout-task.md` как **основной orchestrator** ([`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §1–3); рецепты по типу (`build-section`, `new-page` и т.д.) — из его Orchestration flow.
- Не смешивай незакрытые пробелы project baseline с исполнением задачи по вёрстке.
- Перед реализацией подтверди, что репозиторий собирается (`npm run qa` или эквивалент), layout-shell согласован с правилами, а открытые project-specific решения — в документации проекта или брифе задачи, без молчаливых допущений.

## Маршрутизация и гейты

- Для setup и governance — `commands/add-rule.md` и [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §1; не дублировать baseline-списки вне канонического WORKFLOW.
- При добавлении или развитии регламентов в `.cursor/` — `commands/add-rule.md`, без разброса пунктов по нерелевантным файлам.
- Обязательно применять `rules/directive-compliance.RULE.md` и `rules/task-scope-and-approval.RULE.md` (scope — только после явного согласования с пользователем).
- Не ожидать, что пользователь перечислит все вспомогательные команды; связывай подкоманды по смыслу: страница, секция, framework refactor, design-system documentation.
- По умолчанию: `a11y-checklist` для интерактива; `performance-checklist` для новых страниц, секций и media-heavy изменений.
- После сборки для HTML-выхода — **`npm run validate:html`** или `npm run qa` (`commands/validate-html.md`).
- Финальные гейты по [`WORKFLOW.md`](../../../.cursor/WORKFLOW.md) §3: `pre-final-self-check` → `finalize-layout-task` → `validate-all-directives`.
- Mockup-driven: до кодинга — breakpoint baseline и typography contract.
- Новая страница — `register-new-page-in-index`; shell (`header`/`sidebar`) — в root layout/partials.
- Figma-driven — `rules/figma-asset-integrity.RULE.md` и `validate-figma-assets` где применимо.
- Media-heavy / новые страницы — `rules/image-delivery-and-optimization.RULE.md`.
- Mockup-driven страницы/секции — `validate-pixel-perfect` перед завершением.
- Незакрытые блокирующие TODO и отложенная fidelity — блокеры завершения.
- Изменения `.cursor/` — `sync-cursor-bilingual-structure`.
