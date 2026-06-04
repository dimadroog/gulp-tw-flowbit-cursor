# Топология агентов (ментальная модель)

> **Cursor это не enforce’ит.** Обязательное поведение — в [`WORKFLOW.md`](../../.cursor/WORKFLOW.md), [`commands/run-layout-task.md`](../../.cursor/commands/run-layout-task.md) и `rules/*.RULE.md`. Этот файл — только имена ролей при планировании.

## Роли (кратко)

| Роль | Фокус |
|------|--------|
| `MainAgentOrchestrator` | scope, тип задачи, матрица гейтов, итоговый отчёт |
| `LayoutImplementationAgent` | разметка/секции/страницы по макету |
| `NunjucksTemplateSubagent` | loops/includes/macros, без дублирования |
| `TailwindPolicySubagent` | utility-first, BEM-исключения, style/performance |
| `A11yReviewSubagent` | W3C/ARIA/keyboard/focus |

## Куда смотреть (не дублировать здесь)

| Тема | Канон |
|------|--------|
| Оркестрация и гейты | [`run-layout-task`](../../.cursor/commands/run-layout-task.md), [`WORKFLOW`](../../.cursor/WORKFLOW.md) §3 |
| Рецепты секции/страницы | `build-section`, `new-page`, `refactor-to-framework-component` |
| Приоритет конфликтов (`a11y` vs `performance` vs layout) | [`run-layout-task`](../../.cursor/commands/run-layout-task.md) — протокол эскалации |
| Политики | [`.cursor/rules/`](../../.cursor/rules/) (EN, `alwaysApply`) |
