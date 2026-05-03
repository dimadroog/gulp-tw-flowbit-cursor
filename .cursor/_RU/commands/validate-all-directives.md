# validate-all-directives

Запусти обязательный финальный compliance-gate по всем релевантным директивам перед закрытием задачи.

## Назначение

- Исключить частичное соблюдение требований.
- Блокировать завершение при нарушении любой обязательной директивы.
- Обеспечить стабильное качество по performance, accessibility, семантике, стилям, JS-архитектуре, ассетам, pixel-perfect соответствию и workflow-политикам.

## Обязательные проверки

1. Определи релевантный scope директив для текущей задачи:
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
   - проверка целостности разметки и путей к ресурсам
   - проверка ручного уточнения обязательных visual-входов (`breakpoints`, `typography`) для mockup-driven задач
4. Зафиксируй статус по каждой директиве:
   - `pass`
   - `fail`
   - `not_applicable` (с причиной)

## Формат результата

- Компактный directive compliance-отчет с:
  - `overall_status: pass|fail`
  - списком/таблицей статусов по директивам
  - блокирующими нарушениями и точными путями файлов
  - remediation TODO-пунктами

## Blocking rule

- При `overall_status = fail` задача не может считаться завершенной.
