# init-layout-project

Используй эту команду для инициации проекта и настройки governance до старта активной верстки.

## Назначение

- Зафиксировать проектные конвенции, ограничения и quality gates.
- Подготовить структуру документации и правила регистрации страниц.
- Настроить единое поведение агентов для повторяемой работы.

## Чеклист инициации

1. Подтверди архитектурные ограничения и delivery-политику текущего инструментария.
2. Подтверди baseline доступности (`a11y-checklist`) и framework-first политику интерактива.
3. Подтверди `Flowbite` как основной слой интерактива для Tailwind-компонентов.
4. Подтверди политику для зон gap:
   - внутренний helper для `scrollspy`
   - точечный lightweight plugin для searchable/custom select только при явной необходимости
5. Подтверди baseline JavaScript-архитектуры для custom логики:
   - progressive enhancement и unobtrusive JS
   - functional core (pure helpers) + imperative shell (DOM/events)
   - idempotent lifecycle инициализации (`init` можно безопасно вызывать повторно)
6. Подтверди политику регистрации страниц (`register-new-page-in-index`).
7. Подтверди политику двуязычной поддержки `.cursor/` (`sync-cursor-bilingual-structure`).
8. Подтверди обязательный объем документации (UI-kit и design tokens, если есть).
9. Подтверди performance-baseline и применение `performance-checklist` в задачах реализации.

## Результат

- Единый initialization-отчет:
  - подтвержденные политики
  - неразрешенные решения
  - статус готовности к фазе разработки
