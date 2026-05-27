# finalize-layout-task

Используй эту команду как обязательный финальный блокирующий gate перед статусом "задача завершена".

## Назначение

- Исключить преждевременное завершение.
- Гарантировать явный `pass` по всем обязательным проверкам.
- Блокировать завершение, если любой применимый gate пропущен или провален.

## Обязательная матрица статусов (должна быть явной)

Для каждого пункта фиксируй один из статусов: `pass | fail | not_applicable`.

1. `a11y-checklist`
2. `performance-checklist`
3. `validate-pixel-perfect` (для mockup-driven задач)
4. `validate-figma-assets` (для Figma-driven задач)
5. `validate-all-directives`
6. Проверка build output
7. Проверка lint/format
8. `validate-html` (`dist/**/*.html` через `npm run validate:html`)
9. Проверка ручного подтверждения входов для mockup-driven задач (`breakpoints`, `typography`)

## Правило завершения

- Завершение допустимо только если все применимые пункты имеют статус `pass`.
- Если любой применимый пункт имеет статус `fail` или `not_run`, вернуть `overall_status: fail`.
- Для mockup-driven задач нельзя откладывать блокирующие visual-fidelity работы на "следующий шаг".
- Отсутствие evidence для любого применимого пункта считается `fail`.

## Формат результата

- `overall_status: pass|fail`
- список статусов по gate-пунктам:
  - имя gate
  - статус
  - evidence (какая команда/проверка использована)
- блокирующие пункты с точными путями файлов
- remediation TODO-пункты
