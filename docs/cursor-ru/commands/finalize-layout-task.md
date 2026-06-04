# finalize-layout-task

Используй эту команду как обязательный финальный блокирующий gate перед статусом "задача завершена".

## Назначение

- Исключить преждевременное завершение.
- Гарантировать явный `pass` по всем обязательным проверкам.
- Блокировать завершение, если любой применимый gate пропущен или провален.
- Выполняется после всех task-gates и `validate-html`; `validate-all-directives` — следующий обязательный шаг и **не входит** в эту матрицу (см. [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §3).

## Обязательная матрица статусов (должна быть явной)

Полный список гейтов: [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §3. Для каждого пункта фиксируй один из статусов: `pass | fail | not_applicable`.

1. `performance-checklist`
2. `a11y-checklist`
3. `validate-figma-assets` (для Figma-driven задач)
4. `validate-pixel-perfect` (для mockup-driven задач)
5. `register-new-page-in-index` (если добавлена новая страница)
6. `validate-html` (`dist/**/*.html` через `npm run validate:html` или полный `npm run qa`)
7. `pre-final-self-check` (`ready_for_finalize`)
8. Проверка build output
9. Проверка lint/format
10. Проверка ручного подтверждения входов для mockup-driven задач (`breakpoints`, `typography`)
11. `sync-cursor-bilingual-structure` (если менялся `.cursor/`)

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
