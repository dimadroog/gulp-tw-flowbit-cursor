# develop-layout-task

Используй эту команду для ежедневной реализации после завершения инициации проекта.

## Scope

- Создание новых страниц
- Сборка секций
- Рефакторинг интерактивов
- Обновление документации по факту реализации UI

## Execution flow

1. Определи тип задачи (`new-page`, `build-section`, `refactor`, `documentation`).
2. Примени interaction policy:
   - сначала Flowbite для стандартных интерактивных паттернов
   - для `scrollspy` сначала внутренний helper
   - plugin для searchable/custom select только при явной необходимости
3. Для custom JS соблюдай модульную дисциплину:
   - pure-логику выноси в helper-функции
   - DOM-запросы, listeners и side effects держи в тонком init-shell
   - инициализацию делай idempotent
4. Запусти нужную цепочку команд реализации.
5. Для интерактивных изменений запусти `a11y-checklist`.
6. Для новых страниц, сборки секций и media-heavy изменений запусти `performance-checklist`.
7. При создании новой страницы запусти `register-new-page-in-index`.
8. При изменениях `.cursor/` запусти `sync-cursor-bilingual-structure`.

## Результат

- Компактный delivery-отчет:
  - что выполнено
  - что пропущено и почему
  - TODO и блокеры
