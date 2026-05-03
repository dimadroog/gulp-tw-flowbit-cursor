# develop-layout-task

Используй эту команду для ежедневной реализации после завершения инициации проекта.

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
3. Для mockup-driven задач до начала кодинга вручную уточни обязательные visual baseline:
   - breakpoint baseline (явные целевые ширины/состояния)
   - typography contract (метрики шрифта и правила регистра текста)
4. Примени interaction policy:
   - сначала Flowbite для стандартных интерактивных паттернов
   - для `scrollspy` сначала внутренний helper
   - plugin для searchable/custom select только при явной необходимости
5. Для custom JS соблюдай модульную дисциплину:
   - pure-логику выноси в helper-функции
   - DOM-запросы, listeners и side effects держи в тонком init-shell
   - инициализацию делай idempotent
6. Запусти нужную цепочку команд реализации.
7. Для интерактивных изменений запусти `a11y-checklist`.
8. Для новых страниц, сборки секций и media-heavy изменений запусти `performance-checklist`.
9. Для mockup-driven страниц/секций запусти `validate-pixel-perfect`.
10. При создании новой страницы запусти `register-new-page-in-index`.
11. При изменениях `.cursor/` запусти `sync-cursor-bilingual-structure`.
12. Перед завершением обязательно запусти `validate-all-directives` как финальный gate.

## Результат

- Компактный delivery-отчет:
  - что выполнено
  - что пропущено и почему
  - TODO и блокеры
