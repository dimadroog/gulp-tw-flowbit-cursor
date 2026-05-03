# refactor-to-framework-component

Замени custom interaction-код на framework-native поведение там, где это возможно.

## Входные данные

- Текущий интерактивный блок
- Актуальная логика custom JS
- Целевой framework component

## Шаги

1. Сопоставь текущее поведение с возможностями framework component.
2. Удали лишний custom JS, если framework покрывает поведение.
3. Перенастрой разметку и ARIA-атрибуты под требования framework.
4. Оставь только минимальный glue-code, если это неизбежно.
5. Повторно проверь keyboard и focus-сценарии.

## Done

- Объем custom JS уменьшен.
- Поведенческий паритет сохранен или улучшен.
- Accessibility-семантика валидна после рефактора.
