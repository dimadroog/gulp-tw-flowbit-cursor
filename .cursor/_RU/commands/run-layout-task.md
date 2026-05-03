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
- **In-process (можно делегировать):**
  - Реализация layout/markup.
  - Валидация шаблонного переиспользования (Nunjucks loops/includes/macros).
  - Валидация стилей/производительности (Tailwind policy, media/font delivery, content resilience).
- **Post-process (блокирует завершение):**
  - `a11y-checklist` для интерактивных изменений.
  - `performance-checklist` для изменений страниц/секций/медиа.
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
   - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `register-new-page-in-index`
   - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist`
   - `documentation` -> `fill-ui-kit-documentation`
3. Если во время выполнения менялись файлы в `.cursor/`, запусти `sync-cursor-bilingual-structure`.
4. Верни один компактный отчет:
   - что сделано
   - что пропущено и почему
   - TODO-пункты

## Blocking gates

- Блокирующие проблемы доступности из `a11y-checklist`.
- Блокирующие performance-регрессии из `performance-checklist`.
- Отсутствие регистрации новой страницы в индексе.
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
