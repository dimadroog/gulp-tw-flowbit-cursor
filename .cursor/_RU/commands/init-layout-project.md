# init-layout-project

Используй эту команду для инициации проекта и настройки governance до старта активной верстки.

Каноника стека и макета: [`WORKFLOW.md`](../WORKFLOW.md) §1.1–1.2.

## Назначение

- Зафиксировать проектные конвенции, ограничения и quality gates.
- Подготовить структуру документации и правила регистрации страниц.
- Настроить единое поведение агентов для повторяемой работы.

## Чеклист инициации

1. Подтверди архитектурные ограничения и delivery-политику текущего инструментария.
2. Подтверди baseline доступности (`a11y-checklist`) и **умолчания реализации** ([`WORKFLOW.md`](../WORKFLOW.md) §1.1 — сначала Flowbite, helper `scrollspy`, searchable/custom select только при явной необходимости).
3. Подтверди baseline JavaScript-архитектуры для custom логики:
   - progressive enhancement и unobtrusive JS
   - functional core (pure helpers) + imperative shell (DOM/events)
   - idempotent lifecycle инициализации (`init` можно безопасно вызывать повторно)
4. Подтверди политику регистрации страниц (`register-new-page-in-index`).
5. Подтверди политику двуязычной поддержки `.cursor/` (`sync-cursor-bilingual-structure`).
6. Подтверди обязательный объем документации (UI-kit и design tokens, если есть).
7. Подтверди performance-baseline и применение `performance-checklist` в задачах реализации.
8. Подтверди baseline неукоснительного соблюдения директив:
   - все директивы `.cursor` обязательны к исполнению
   - исключения недопустимы без явной эскалации blocker
   - завершение задачи запрещено при невыполнении обязательных директив
9. Подтверди baseline **точности дизайна** для mockup-driven задач по [`WORKFLOW.md`](../WORKFLOW.md) §1.2; где применимо — `validate-pixel-perfect` перед `validate-all-directives`.
10. Подтверди hard-mode baseline завершения:
   - перед финальным ответом обязателен `pre-final-self-check`
   - перед завершением обязателен `finalize-layout-task`
   - завершение с отложенными блокирующими работами ("потом/следующим шагом") запрещено
11. Подтверди baseline HTML-валидации:
   - после любых изменений, влияющих на сборку, гоняются `npm run validate:html` (html-validate) и `npm run validate:w3c` (W3C Nu) на `dist/**/*.html`
   - `npm run qa` включает сборку, линт и **оба** HTML-валидатора (Nu + html-validate)

## Результат

- Единый initialization-отчет:
   - подтвержденные политики
   - неразрешенные решения
   - статус готовности к фазе разработки
