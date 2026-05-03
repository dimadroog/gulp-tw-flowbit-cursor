---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Политика workflow-оркестрации

- Для setup и governance задач по умолчанию использовать `commands/init-layout-project.md`.
- Для ежедневных задач реализации по умолчанию использовать `commands/develop-layout-task.md`.
- Не ожидать, что пользователь явно перечислит все вспомогательные команды.
- Автоматически выбирать и связывать подкоманды по смыслу задачи:
  - создание страницы
  - сборка секции
  - рефакторинг к framework component
  - обновление UI-kit документации
- Для интерактивных изменений по умолчанию включать `a11y-checklist`.
- Для новых страниц, сборки секций и media-heavy изменений по умолчанию включать `performance-checklist`.
- При создании новой страницы обязательно включать `register-new-page-in-index`.
- При изменениях структуры/контента `.cursor/` обязательно включать `sync-cursor-bilingual-structure`.
