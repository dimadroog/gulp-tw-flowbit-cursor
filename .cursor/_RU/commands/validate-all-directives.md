# validate-all-directives

Запусти обязательный финальный compliance-gate по всем релевантным директивам перед закрытием задачи.

## Назначение

- Исключить частичное соблюдение требований.
- Блокировать завершение при нарушении любой обязательной директивы.
- Обеспечить стабильное качество по performance, accessibility, семантике, стилям, JS-архитектуре, ассетам, pixel-perfect соответствию и workflow-политикам (включая порядок гейтов в [`WORKFLOW.md`](../WORKFLOW.md)).

## Обязательные проверки

1. Определи релевантный scope директив для текущей задачи:
   - [`WORKFLOW.md`](../WORKFLOW.md) (**каноника**: процедура, стек §1.1, fidelity §1.2, матрица гейтов §3)
   - все rules с `alwaysApply: true`
   - все command-level обязательные проверки по типу задачи
2. Проверь реализацию по каждой категории директив:
   - архитектура и performance delivery
   - accessibility/W3C семантика
   - Tailwind/styling конвенции
   - JavaScript minimalism/architecture
   - Nunjucks/layout-shell конвенции
   - Figma asset integrity (когда применимо)
   - pixel-perfect delivery (для mockup-driven задач)
   - registry/sync workflow требования
3. Запусти проверочные артефакты:
   - проверка build output
   - проверка lint/diagnostics
   - проверка HTML (`npm run validate:html` для собранного `dist/**/*.html`; см. `commands/validate-html.md`)
   - проверка целостности разметки и путей к ресурсам
   - проверка ручного уточнения обязательных visual-входов (`breakpoints`, `typography`) для mockup-driven задач
   - результат `pre-final-self-check`
   - результат `finalize-layout-task`
4. Зафиксируй статус по каждой директиве:
   - `pass`
   - `fail`
   - `not_applicable` (с причиной)

## Формат результата

- Компактный directive compliance-отчет с:
  - `overall_status: pass|fail`
  - списком/таблицей статусов по директивам
  - блокирующими нарушениями и точными путями файлов
  - ссылками на evidence (какая команда/проверка дала статус)
  - remediation TODO-пунктами

## Blocking rule

- При `overall_status = fail` задача не может считаться завершенной.
- Отсутствие evidence для применимой директивы считается `fail`.
