---
description: Pixel-perfect delivery policy for implementation from design mockups.
alwaysApply: true
---

# Политика pixel-perfect delivery

- Для любой реализации верстки по дизайн-макетам pixel-perfect соответствие является обязательным quality-gate перед завершением задачи.
- До начала реализации всегда получать ручное подтверждение:
  - целевого набора breakpoint-ширин (например `1440`, `1280`, mobile-варианты)
  - typography contract (font family, size, weight, line-height, letter-spacing, правила регистра текста)
- Нельзя молча предполагать baseline по breakpoint и typography; если они явно не подтверждены для задачи, реализацию останавливать и запрашивать уточнение.
- Проверять визуальное соответствие по критичным зонам:
  - ориентация/выравнивание основных layout-групп
  - внутренние/внешние отступы
  - размер и метрики типографики
  - регистр текста и отрисовка badge/chip-лейблов
- Любые неустраненные pixel-perfect расхождения считать блокирующими дефектами, а не "косметическими" TODO.
- Включать статус pixel-perfect в финальный validation-отчет вместе с accessibility, performance и asset integrity.
