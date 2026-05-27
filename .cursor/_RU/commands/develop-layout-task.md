# develop-layout-task

Используй эту команду для ежедневной реализации после завершения инициации проекта.

Предпочитай запуск через [`run-layout-task`](run-layout-task.md). Каноника, стек и mockup-политика: [`WORKFLOW.md`](../WORKFLOW.md) (**§1–3**).

## Scope

- Создание новых страниц
- Сборка секций
- Рефакторинг интерактивов
- Обновление документации по факту реализации UI

## Execution flow

1. Определи тип задачи (`new-page`, `build-section`, `refactor`, `documentation`).
2. Перед реализацией проверь layout-стратегию:
   - по умолчанию все страницы расширяют `njk-layouts/_main.njk`
   - глобальный shell (`header`/`sidebar`) держится в layout-level partials
   - дополнительный layout создается только при подтвержденном структурном расхождении
3. Для mockup-driven задач до кодинга выполни предусловия **точности дизайна** из [`WORKFLOW.md`](../WORKFLOW.md) §1.2 (breakpoint baseline + typography contract).
4. Примени **умолчания реализации** из [`WORKFLOW.md`](../WORKFLOW.md) §1.1 (сначала Flowbite, helper scrollspy, searchable/custom select только при явной необходимости).
5. Для custom JS соблюдай модульную дисциплину:
   - pure-логику выноси в helper-функции
   - DOM-запросы, listeners и side effects держи в тонком init-shell
   - инициализацию делай idempotent
6. Запусти нужную цепочку из `run-layout-task`.
7. Для интерактивных изменений запусти `a11y-checklist`.
8. Для новых страниц, сборки секций и media-heavy изменений запусти `performance-checklist`.
9. Для mockup-driven страниц/секций запусти `validate-pixel-perfect`.
10. При создании новой страницы запусти `register-new-page-in-index`.
11. При изменениях `.cursor/` запусти `sync-cursor-bilingual-structure`.
12. После успешной сборки при HTML-выводе запусти **`npm run validate:html`** (или `npm run qa`, что включает его, линт и a11y).
13. Перед завершением обязательно запусти `pre-final-self-check` как блокирующий gate.
14. Перед завершением обязательно запусти `finalize-layout-task` как блокирующий gate.
15. Перед завершением обязательно запусти `validate-all-directives` как финальный gate.

## Hard-stop правила

- Нельзя закрывать задачу с незакрытыми блокирующими TODO.
- Нельзя завершать формулировками "позже/следующим шагом", если любой применимый gate не в статусе `pass`.
- Если обязательные входы отсутствуют (особенно breakpoints/typography для mockup-driven задач), нужно остановиться и запросить уточнение.
- Для Figma-driven задач нельзя поставлять шаблоны с временными удаленными URL ассетов.

## Результат

- Компактный delivery-отчет:
  - что выполнено
  - что пропущено и почему
  - TODO и блокеры
  - явная матрица gate-статусов (`pass|fail|not_applicable`)
