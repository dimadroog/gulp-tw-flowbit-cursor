# run-layout-task

Используй эту команду как единый orchestrator для задач по верстке. Это hard-mode flow с fail-fast контролем завершения.

Каноника, стек и точность макета: [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) (**§1.1–1.2**).

## Примеры триггеров

- "Создай новую страницу"
- "Собери новую секцию"
- "Переведи интерактив на framework component"
- "Обнови документацию design-system"

## Hard-mode baseline (всегда включен)

- Нельзя закрывать задачу без явного evidence по блокирующим gate-проверкам.
- Нельзя откладывать блокирующие работы формулировками "потом/следующим шагом".
- Нельзя молча предполагать отсутствующие обязательные входы.
- Нельзя завершать задачу, если любой применимый gate в статусе `fail` или `not_run`.

## Матрица Pre / In / Post

- **Pre-process (блокирует старт реализации):**
  - Подтверди baseline проекта: репозиторий собирается (`npm run qa` или эквивалент), layout-shell стратегия ясна, открытые project-specific решения — в документации проекта или брифе задачи, без молчаливых допущений.
  - Определи тип задачи (`new-page`, `build-section`, `refactor`, `documentation`).
  - Подтверди обязательные входы (контент, интерактивы, SEO/meta, media/font ограничения).
  - Для mockup-driven задач до начала кодинга вручную уточни breakpoint baseline и typography contract.
  - Подтверди layout-shell стратегию: страницы расширяют root layout, глобальные `header`/`sidebar` остаются в layout-level partials.
- **In-process (можно делегировать):**
  - Реализация markup/layout.
  - Принудительная валидация переиспользования шаблонов (Nunjucks loops/includes/macros) вместо дублирования.
  - Валидация направления по стилям/производительности (Tailwind-first, media/font delivery, content resilience).
  - Валидация целостности Figma-ассетов (для вектора — inline SVG где применимо, для растра — локальные структурированные пути, запрет подмены графики текстом/emoji).
- **Post-process (блокирует завершение):** порядок как в [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §3 и в Orchestration flow ниже.
  - `performance-checklist` для изменений страниц/секций/медиа.
  - `a11y-checklist` для интерактивных изменений.
  - `validate-figma-assets` для Figma-driven страниц/секций.
  - `validate-pixel-perfect` для mockup-driven страниц/секций.
  - `register-new-page-in-index` для новых страниц.
  - `validate-html` (`npm run validate:html` после сборки, либо `npm run qa`) для любой задачи с HTML-выводом.
  - `pre-final-self-check` для любой задачи реализации.
  - `finalize-layout-task` для любой задачи реализации.
  - `validate-all-directives` для любой задачи реализации.
  - `sync-cursor-bilingual-structure` при изменениях контента/структуры `.cursor/`.

## Orchestration flow

1. Определи тип задачи:
   - `new-page`
   - `build-section`
   - `refactor`
   - `documentation`
2. Запусти нужные цепочки команд:
   - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (если Figma-driven) -> `validate-pixel-perfect` (если mockup-driven) -> `register-new-page-in-index` -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (если Figma-driven) -> `validate-pixel-perfect` (если mockup-driven) -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (если Figma-driven) -> `validate-pixel-perfect` (если mockup-driven) -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `documentation` -> `fill-design-system-documentation` -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
3. Если во время выполнения менялись файлы в `.cursor/`, запусти `sync-cursor-bilingual-structure`.
4. Верни один компактный отчет:
   - что сделано
   - что пропущено и почему
   - TODO-пункты
   - явная матрица gate-статусов (`pass|fail|not_applicable`)

## Blocking gates

- Провал HTML-валидации из `validate-html`.
- Блокирующие проблемы доступности из `a11y-checklist`.
- Блокирующие performance-регрессии из `performance-checklist`.
- Отсутствие регистрации новой страницы в индексе.
- Нарушение layout-shell архитектуры (глобальные `header`/`sidebar` реализованы в шаблоне страницы вместо root layout/partials).
- Нарушение целостности ассетов (искажение/подмена вектора, временные удаленные URL в шаблонах, пустые/битые image-ссылки).
- Провал pixel-perfect проверки (ориентация, отступы, типографика, регистр) или отсутствие ручного уточнения baseline по breakpoint/typography.
- Попытка завершения при незакрытых визуальных заглушках или отложенных fidelity TODO в mockup-driven задачах.
- Любой провал из `finalize-layout-task` или `validate-all-directives`.
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
- После правок `.cursor/` — обновляй зеркало в `docs/cursor-ru/` (`sync-cursor-bilingual-structure`); агент не читает зеркало как enforce.
- Рассматривай все установленные директивы как обязательные ограничения; не завершай задачу при нарушении любой релевантной обязательной директивы.
- Не объявляй завершение формулировками "потом/следующим шагом" при незакрытых блокирующих работах.
