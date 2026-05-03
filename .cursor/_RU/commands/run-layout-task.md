# run-layout-task

Используй эту команду как основной orchestrator для задач по верстке, чтобы пользователю не приходилось вручную вызывать каждую команду.

## Примеры триггеров

- "Создай новую страницу"
- "Собери новую секцию"
- "Переведи интерактив на framework component"
- "Обнови документацию UI-kit"

## Матрица Pre / In / Post

- **Pre-process (блокирует старт реализации):**
  - Подтверди состояние lifecycle (инициация завершена или явно доопределяется).
  - Определи тип задачи (`new-page`, `build-section`, `refactor`, `documentation`).
  - Подтверди обязательные входы (контент, интерактивы, SEO/meta, media/font ограничения).
  - Для mockup-driven задач до старта реализации вручную уточни breakpoint baseline и typography contract.
  - Подтверди layout-shell стратегию: по умолчанию страница расширяет корневой layout, а глобальные `header`/`sidebar` остаются в layout-level partials.
- **In-process (можно делегировать):**
  - Реализация layout/markup.
  - Валидация шаблонного переиспользования (Nunjucks loops/includes/macros).
  - Валидация стилей/производительности (Tailwind policy, media/font delivery, content resilience).
  - Валидация целостности Figma-ассетов (inline SVG для вектора, локальные структурированные пути для растра, запрет подмены графики эмоджи/текстом).
- **Post-process (блокирует завершение):**
  - `a11y-checklist` для интерактивных изменений.
  - `performance-checklist` для изменений страниц/секций/медиа.
  - `validate-all-directives` для любой задачи реализации.
  - `validate-figma-assets` для Figma-driven страниц/секций.
  - `validate-pixel-perfect` для mockup-driven страниц/секций.
  - `register-new-page-in-index` для новых страниц.
  - `sync-cursor-bilingual-structure` при изменениях контента/структуры `.cursor/`.
- **Background (не блокирует):**
  - Расширенные заметки, опциональные документационные хвосты, не-критичные TODO-пояснения.

## Orchestration flow

1. Определи тип задачи:
   - `new-page`
   - `build-section`
   - `refactor`
   - `documentation`
2. Запусти нужные цепочки команд:
   - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (если Figma-driven) -> `validate-pixel-perfect` (если mockup-driven) -> `register-new-page-in-index` -> `validate-all-directives`
   - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (если Figma-driven) -> `validate-pixel-perfect` (если mockup-driven) -> `validate-all-directives`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist` -> `validate-all-directives`
   - `documentation` -> `fill-ui-kit-documentation` -> `validate-all-directives`
3. Если во время выполнения менялись файлы в `.cursor/`, запусти `sync-cursor-bilingual-structure`.
4. Верни один компактный отчет:
   - что сделано
   - что пропущено и почему
   - TODO-пункты

## Blocking gates

- Блокирующие проблемы доступности из `a11y-checklist`.
- Блокирующие performance-регрессии из `performance-checklist`.
- Отсутствие регистрации новой страницы в индексе.
- Нарушение layout-shell архитектуры (глобальные `header`/`sidebar` реализованы в шаблоне страницы вместо корневого layout/partials).
- Нарушение целостности ассетов (искажение/подмена вектора, сохраненные во шаблонах временные удаленные URL ассетов, пустые/битые image-ссылки).
- Провал pixel-perfect проверки (ориентация, отступы, типографика, регистр текста) или отсутствие ручного уточнения baseline по breakpoint/typography.
- Любой провал проверки из `validate-all-directives`.
- Отсутствие двуязычной синхронизации после изменений `.cursor/`.

## Протокол эскалации конфликтов

1. Зафиксируй тип конфликта (`a11y` vs `performance` vs `content/layout`) в отчете.
2. Примени порядок приоритетов:
   - базовая доступность и семантическая корректность
   - функциональная корректность и framework-first поведение интерактива
   - оптимизация производительности
   - визуальная полировка и документационные улучшения
3. Если элемент с меньшим приоритетом откладывается, явно укажи причину и follow-up TODO.

## Safety rules

- Спрашивай только действительно недостающие обязательные входные данные.
- Для интерактивов предпочитай framework-native поведение вместо custom JS.
- Не пропускай accessibility-проверку для интерактивных изменений.
- Держи согласованность имен и структуры между `.cursor/` и `.cursor/_RU/`.
- Рассматривай все установленные директивы как обязательные ограничения; не завершай задачу при нарушении любой релевантной обязательной директивы.
