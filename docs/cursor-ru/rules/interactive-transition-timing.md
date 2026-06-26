# Тайминги интерактивных переходов

> **Enforce:** [`.cursor/rules/interactive-transition-timing.RULE.md`](../../../.cursor/rules/interactive-transition-timing.RULE.md).

- **Hover / focus-visible:** смена color/background/border/opacity/shadow — **~0.2s** (`duration-200`, `ease-in-out`), если бриф не требует мгновенной реакции.
- Реализация через Tailwind или **`app/css/components.css`** (`.btn`, `.form-control`, …) и типографику в **`components.css`**. Учитывать **`prefers-reduced-motion`** (`motion.css`).

## Раскрытие / overlay

- Анимации панелей, drawer, dropdown, modal — **≤300ms**, по умолчанию **200–300ms**.
- Состояния Preline: варианты **`hs-*-open:`** из `variants.css` + authored `duration-*`.

## Исключения

- Переходы Preline по умолчанию — как у библиотеки, если задача их не переопределяет; расхождение — одна строка в отчёте.
