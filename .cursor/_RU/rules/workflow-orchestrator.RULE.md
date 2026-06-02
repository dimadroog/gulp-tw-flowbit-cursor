---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Политика workflow-оркестрации

- Для setup и governance задач по умолчанию использовать `commands/init-layout-project.md`.
- Если пользователь добавляет или развивает регламенты внутри `.cursor/` (новые правила, формулировки политик или согласование оркестрации), выполнять `commands/add-rule.md` вместо разброса произвольных пунктов по нерелевантным файлам.
- Для ежедневных задач реализации по умолчанию использовать `commands/run-layout-task.md` как основной orchestrator.
- `commands/develop-layout-task.md` использовать как поддерживающее руководство внутри `run-layout-task`.
- Обязательно применять `rules/directive-compliance.RULE.md` как базовое требование для всех task-flow.
- Соблюдай `rules/task-scope-and-approval.RULE.md`: реализация вне scope — только после явного согласования предложения с пользователем.
- Не ожидать, что пользователь явно перечислит все вспомогательные команды.
- Автоматически выбирать и связывать подкоманды по смыслу задачи:
  - создание страницы
  - сборка секции
  - рефакторинг к framework component
  - обновление design-system документации
- Для интерактивных изменений по умолчанию включать `a11y-checklist`.
- Для новых страниц, сборки секций и media-heavy изменений по умолчанию включать `performance-checklist`.
- Включай `commands/validate-html.md`: после сборки **`npm run validate:html`** (или `npm run qa`) для любой задачи с HTML-выводом.
- Для любой задачи реализации обязательно запускать `validate-all-directives` как финальный post-check перед завершением.
- Перед `validate-all-directives` обязательно запускать `pre-final-self-check` и `finalize-layout-task`.
- Для mockup-driven реализации до начала кодинга обязательно вручную уточнять breakpoint baseline и typography contract.
- При создании новой страницы обязательно включать `register-new-page-in-index`.
- Для сценариев new-page/build-section валидировать, что глобальный shell (`header`/`sidebar`) остается в корневом layout/общих partials, а шаблоны страниц содержат только page-content.
- Для Figma-driven реализации обязательно применять проверки из `rules/figma-asset-integrity.RULE.md` (inline SVG для вектора, локальные пути `app/img/` для растра, запрет пустых/битых image-ссылок).
- Для new-page, секций и media-heavy изменений обязательно применять `rules/image-delivery-and-optimization.RULE.md` (`loading`, адаптивные источники, intrinsic ≤ 2× rendered, PageSpeed image audits).
- Для Figma-driven задач по странице/секции обязательно запускать `commands/validate-figma-assets.md` как явный post-check перед завершением.
- Для mockup-driven задач по странице/секции обязательно запускать `commands/validate-pixel-perfect.md` как явный post-check перед завершением.
- Незакрытые блокирующие TODO и отложенные fidelity-работы считать блокерами завершения.
- При изменениях структуры/контента `.cursor/` обязательно включать `sync-cursor-bilingual-structure`.
