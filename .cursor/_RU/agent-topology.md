# Топология агентов и оркестрация

## Роли

- `MainAgentOrchestrator` - планирует работу, назначает подзадачи и собирает единый результат.
- `LayoutImplementationAgent` - реализует секции и страницы по макету.
- `NunjucksTemplateSubagent` - следит за include/loop/macro и отсутствием дублирования.
- `TailwindPolicySubagent` - валидирует utility-first подход и дисциплину BEM-исключений.
- `A11yReviewSubagent` - проверяет W3C/ARIA/keyboard/focus поведение.

## Входы и выходы ролей

- **MainAgentOrchestrator**
  - входы: цель пользователя, статус lifecycle-фазы, правила/команды проекта, ограничения scope
  - выходы: выбранный execution path, делегированные подзадачи, итоговый merged-отчет со статусами gate-проверок
- **LayoutImplementationAgent**
  - входы: референс макета, контентные требования, ограничения страницы/секции
  - выходы: реализованная разметка/секции/страницы и список неразрешенных implementation-вопросов
- **NunjucksTemplateSubagent**
  - входы: реализованная разметка, кандидаты на переиспользование повторяющихся блоков
  - выходы: include/loop/macro-рефакторинг, найденные дубли, заметки по консистентности шаблонов
- **TailwindPolicySubagent**
  - входы: class-списки, custom CSS-фрагменты, style/performance ограничения
  - выходы: проверка порядка utility-классов, проверка BEM-исключений, style/performance замечания
- **A11yReviewSubagent**
  - входы: разметка и поведение интерактивного UI, контекст keyboard/focus/ARIA
  - выходы: accessibility pass/fail-отчет, блокирующие проблемы, non-critical улучшения

## Карта ролей к командам и skills

- `MainAgentOrchestrator`
  - commands: `run-layout-task`, `develop-layout-task`, `init-layout-project`
  - rules: `workflow-orchestrator.RULE.md`, `project-lifecycle-split.RULE.md`
- `LayoutImplementationAgent`
  - commands: `new-page`, `build-section`, `refactor-to-framework-component`
  - skills: `scaffold-page-from-layout`
- `NunjucksTemplateSubagent`
  - rules: `html-nunjucks-conventions.RULE.md`
  - skills: `nunjucks-loop-and-partials`
- `TailwindPolicySubagent`
  - commands: `performance-checklist`
  - rules: `tailwind-usage-policy.RULE.md`, `architecture-and-delivery-policy.RULE.md`
  - skills: `tailwind-tokenized-components`
- `A11yReviewSubagent`
  - commands: `a11y-checklist`
  - rules: `accessibility-and-w3c.RULE.md`
  - skills: `a11y-interactive-audit`

## Правила оркестрации

1. Оркестратор сначала задает scope и acceptance criteria.
2. Реализация макета, шаблонная валидация и стилизация выполняются параллельно, когда это возможно.
3. A11y-проверка выполняется после структурной реализации и до финального sign-off.
4. Результаты субагентов объединяются в единый отчет с явным статусом фиксов.
5. При конфликте выводов используй протокол эскалации ниже до финального sign-off.

## Протокол эскалации конфликтов

1. Классифицируй тип конфликта: `a11y`, `performance`, `content/layout` или смешанный.
2. Примени порядок приоритетов:
   - доступность и семантическая валидность
   - функциональная корректность и framework-first поведение
   - оптимизация производительности
   - визуальная/документационная полировка
3. Если откладывается задача более низкого приоритета, зафиксируй явную причину и follow-up TODO в merged-отчете.
