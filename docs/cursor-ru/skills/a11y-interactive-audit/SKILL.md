---
name: a11y-interactive-audit
description: Audits interactive UI blocks for accessibility and keyboard behavior against W3C/ARIA expectations. Use when finishing interactive sections or preparing review-ready output.
disable-model-invocation: true
---

# A11y аудит интерактива

## Цель

Проверить качество взаимодействия перед финальной сдачей.

## Audit checklist

1. Проверь keyboard access и логичную tab-sequence.
2. Проверь ARIA-связки для toggles, expanded states, labels и controls.
3. Проверь видимые `:focus-visible` состояния для интерактивных элементов.
4. Подтверди корректные semantic landmarks и heading hierarchy.
5. Проверь контраст и наличие достаточных non-text alternatives.
6. Подтверди framework-first подход (Flowbite или согласованный component API) до custom JS.
7. Если есть custom JS, проверь idempotent init и отсутствие дублирующихся listeners после повторной инициализации.

## Формат результата

- Сначала перечисляй блокирующие accessibility-проблемы.
- Для каждой проблемы давай прямое руководство по исправлению.
- Явно указывай, если критичных a11y-пробелов не осталось.
