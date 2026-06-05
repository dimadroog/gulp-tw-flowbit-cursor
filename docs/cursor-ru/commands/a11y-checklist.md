# a11y-checklist

Фокусированная accessibility-проверка интерактивного UI перед завершением задачи.

Канон policy: [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).

## Чеклист

1. Клавиатурная навигация работает для всех контролов.
2. Порядок Tab логичен и предсказуем.
3. `aria-expanded`, `aria-controls` и labels подключены корректно.
4. Стили `:focus-visible` хорошо видны.
5. Landmarks, уровни заголовков и `headingoffset` для внутреннего `h1` в демо — см. accessibility rule выше.
6. Роли и подписи modal/dialog (`role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-label`) — см. accessibility rule выше.
7. `alt` у `img` (описательный или пустой для декоративных) — см. accessibility rule выше.
8. Контраст цветов приемлем.

## Формат отчёта

- Критичные проблемы (исправить обязательно)
- Некритичные улучшения
- Явный pass, если блокирующих проблем нет
