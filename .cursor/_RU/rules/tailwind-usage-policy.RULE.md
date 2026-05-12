---
description: Tailwind-first styling policy with controlled exceptions.
alwaysApply: true
---

# Политика использования Tailwind

- Использовать utility-first Tailwind classes как основной подход к стилизации.
- Предпочитать tokenized utilities для spacing, typography, radius и color вместо ad-hoc значений.
- Собирать секции из переиспользуемых utility-паттернов до добавления custom CSS.

## Политика BEM-исключений

- **Обязательные семантические классы** — в **`app/scss/_components.scss`**: **кнопки** (**`.btn` + `.btn-*`**), **`.form-label`** / **`.form-check-label`**, текстовые **`.form-control`**, **`.form-check-input`** (**checkbox/radio**), пояс **`.container`** задаются через **`@apply`**; см. [`semantic-component-apply.RULE.md`](semantic-component-apply.RULE.md). Это **не** случайное «BEM-исключение».
- Другие BEM/custom классы допустимы только когда utility-композиция не закрывает требование.
- При использовании BEM/custom CSS добавлять краткое обоснование в комментарии к коду или PR notes.
- Ограничивать область исключения конкретным компонентом.

## Порядок CSS-свойств для custom стилей

- В custom CSS/SCSS-блоках сортируй свойства от более влияющих на документ к более локальным.
- Рекомендуемый порядок:
  1. Позиционирование и поток: `position`, `top/right/bottom/left`, `float`, `clear`, `z-index`.
  2. Размеры и отступы: `width/height`, `margin`, `padding`.
  3. Рамки и связанные с краями свойства (`border` и т.п.).
  4. Свойства содержимого и поведения: `list-style`, `overflow` и похожие.
  5. Цветовое и типографическое оформление: `background`, `color`, `font` и декоративные свойства.
- Используй принцип сортировки: от общего/высокого влияния к локальному/менее критичному.

## Порядок atomic-классов в разметке

- Упорядочивай utility-классы по канонической логике сортировки `prettier-plugin-tailwindcss`.
- Считай порядок плагина единственным источником истины и не поддерживай параллельные кастомные схемы сортировки.
- Даже если плагин пока не установлен, придерживайся того же канонического порядка для консистентности.
- `js-*` классы остаются behavioral hooks; размещай их после utility-классов, если это не конфликтует с автоформатированием.
- **Длительности hover/focus и анимаций раскрытия** для своей разметки — [`interactive-transition-timing.RULE.md`](interactive-transition-timing.RULE.md).

## Элементы ввода (набранный текст)

- **Семейство input:** `input` (в т.ч. **`checkbox`** и **`radio`**), `select` и `textarea` — все **нативные элементы ввода формы**; у всех — связь с **`label`**, при необходимости **`fieldset`/`legend`**, единообразно **`aria-invalid` / `aria-describedby`**. Оформление: **`.form-control`** только у текстоподобных `input` / `select` / `textarea` — см. [`semantic-component-apply.RULE.md`](semantic-component-apply.RULE.md), раздел про элементы ввода.
- По умолчанию для text-like `input` / `select` / `textarea` — класс **`.form-control`** (`@apply` в **`_components.scss`**), а не длинная строка утилит; в нём **1rem** (`text-base`) для **набранного/выбранного текста или placeholder**.
- Иначе, где речь о **видимом пользователю значении или placeholder** (текстоподобные `input`*, `select`, `textarea`), **`font-size: 1rem`**, если в брифе нет исключения.
- Без `.form-control` — **`text-base`**, пока `base === 1rem`; не подгонять только через другие `text-*`.
- Если в `tailwind.config.js` изменят `fontSize.base` относительно `1rem`, восстановить **`text-[1rem]`** на соответствующих полях или выровнять `base`.

*`type`, где правило про **размер набранных глифов**, а не «хром» контроля: например **`range`**, **`file`**, **`checkbox`**, **`radio`**, **`button`**, **`submit`** — те же группировки/доступность, но **без `.form-control`**; размер зоны нажатия и подписей — по правилам компонентов, не по требованию **1rem набранного текста**.
