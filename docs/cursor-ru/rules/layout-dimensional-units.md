# Единицы layout-размеров (px)

> Перевод для человека. **Enforce:** [`.cursor/rules/layout-dimensional-units.RULE.md`](../../../.cursor/rules/layout-dimensional-units.RULE.md).

Для **кастомных layout-размеров** используйте **пиксели (`px`)**, чтобы значения совпадали с экспортом макета и читались без пересчёта через `16px`. Дополняет [`layout-sizing-and-flex.RULE.md`](./layout-sizing-and-flex.md) (как задавать размеры) и [`tailwind-usage-policy.RULE.md`](./tailwind-usage-policy.md) (семантические компоненты).

## В зоне правила — только `px`

- **Произвольные отступы Tailwind** в `app/css/` или шаблонах: `p-[…]`, `m-[…]`, `gap-[…]`, `pt-[…]`, `pb-[…]`, `mt-[…]` и т.д., если значение не из стандартной шкалы (`py-16`, `gap-10`, …).
- **Произвольные width / height / min-max** на layout-оболочках: `w-[…]`, `h-[…]`, `min-w-[…]`, `max-w-[…]`, `rounded-[…]`, если размер привязан к геометрии макета.
- **Flex-basis в shorthand:** `flex-[0_0_24px]`, не `flex-[0_0_1.5rem]` — см. [`layout-sizing-and-flex.RULE.md`](./layout-sizing-and-flex.md) § Синтаксис flex shorthand.
- **Токены ширины в теме** в `tailwind.config.js` (напр. `maxWidth.content` для `.container` / `max-w-content`) — в **`px`**, не `rem`.
- **Операнды `calc()`** для gutter/rail из макета — напр. `max-w-[calc(100%-87px)]`, не `calc(100% - 5.4375rem)`.

## Вне правила — не трогать

- **Стандартные утилиты шкалы Tailwind** (`py-16`, `gap-8`, `size-6`, `text-xl`, `leading-7`) — не переписывать в arbitrary `px`, если бриф не требует внешкалы.
- **Типографика вводимого текста** — политика `text-base` / `1rem` в [`tailwind-usage-policy.RULE.md`](./tailwind-usage-policy.md) § Поля формы.
- **`em` / `%` / `0%`** для flex-распределения (`flex-[1_1_0%]`) или относительной типографики — не литеральные боксы макета.

## Авторинг

- Берите **px из макета или Figma inspect** напрямую: `pb-[100px]`, `w-[133px]`, `flex-[0_0_24px]`.
- **Не** конвертируйте mockup `px` → `rem` в arbitrary layout-классах.
- Если размер уже на шкале Tailwind и совпадает с макетом — **утилита шкалы** предпочтительнее дубликата (`pt-40` вместо `pt-[160px]`, когда оба дают 160px).

## Проверка

- `rg '\[[^\]]*rem\]' app/css tailwind.config.js` — **ноль совпадений** для новых/изменённых arbitrary layout-значений.
- `maxWidth.content` в `tailwind.config.js` — **`px`**, не `rem`.
- Arbitrary flex-basis в `app/css/` с фиксированным боксом макета — в **`px`**.
