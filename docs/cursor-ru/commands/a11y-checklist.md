# a11y-checklist

Проведи целевую accessibility-проверку интерактивного UI перед завершением задачи.

## Чеклист

1. Keyboard navigation работает для всех контролов.
2. Tab order логичный и предсказуемый.
3. `aria-expanded`, `aria-controls` и labels настроены корректно.
4. `:focus-visible` состояния отчетливо видимы.
5. Semantic landmarks и heading levels согласованы; демо типографики/статьи с внутренним `h1` — с `headingoffset` (см. [`rules/accessibility-and-w3c.RULE.md`](../../.cursor/rules/accessibility-and-w3c.RULE.md)).
6. Корень модалки: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-label` на одном внешнем контейнере, не на `div` без роли (тот же rule).
7. Для `img` корректно задан `alt` (описательный текст или пустой для декоративных изображений).
8. Контраст текста и интерфейсных элементов достаточный.

## Формат отчета

- Critical issues (обязательно исправить)
- Non-critical improvements
- Явный pass-статус, если блокирующие проблемы не найдены
