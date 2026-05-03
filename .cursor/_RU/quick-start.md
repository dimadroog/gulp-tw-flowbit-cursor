# Быстрый старт

Используй этот минимальный сценарий в начале сессии.

## 1) Инициализация один раз

Запусти: `init-layout-project`

Используй при старте нового проекта или когда изменились governance-решения.

## 2) Ежедневные задачи реализации

Запусти: `develop-layout-task: <описание задачи>`

Примеры:
- `develop-layout-task: create a new catalog page`
- `develop-layout-task: build product hero section`
- `develop-layout-task: refactor tabs to framework component`

## 3) Поддержка индекса и двуязычной структуры

В рамках workflow выполняется автоматически:
- новая страница -> `register-new-page-in-index`
- изменения в `.cursor/` -> `sync-cursor-bilingual-structure`
