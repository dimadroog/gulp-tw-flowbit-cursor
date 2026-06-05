# build-section

Собери одну секцию по макету с framework-first политикой для интерактивов.

## Входные данные

- Референс секции из дизайна
- Контентные/данные требования
- Ожидаемое поведение интерактивов (если есть)

## Шаги

1. Реализуй семантический HTML и Tailwind utilities для базовой структуры.
2. Проверь, соответствует ли интерактив существующему framework component.
3. Если да, используй framework API.
4. Если нет, добавь минимальный custom JS и зафиксируй причину.
5. Повторяющиеся элементы вынеси в Nunjucks loops/partials.
6. Для JS-селекторов используй только классы с `js-*`, размещай их после визуальных классов в `class`-атрибуте и не стилизуй в CSS.
7. Оптимизируй медиа и держи структуру компактной — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
8. Задавай `alt` у изображений — [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).
9. Ассеты из Figma — [`rules/figma-asset-integrity.md`](../rules/figma-asset-integrity.md).
10. Сортировка atomic-классов (Prettier/Tailwind) — [`rules/tailwind-usage-policy.md`](../rules/tailwind-usage-policy.md).
11. Порядок CSS-свойств при кастомном CSS — [`rules/architecture-and-delivery-policy.md`](../rules/architecture-and-delivery-policy.md).
12. Шрифты секции (`WOFF`/`WOFF2`, используемые начертания, `font-display: swap`) — [`rules/architecture-and-delivery-policy.md`](../rules/architecture-and-delivery-policy.md).
13. Контент-стресс-проверка (длинный текст, разные пропорции изображений) — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
14. Focus и keyboard для интерактивных контролов — [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).
15. Перед завершением секции выполни [`performance-checklist.md`](performance-checklist.md).

## Памятка по порядку классов (кратко)

- До: `<button class="js-open text-white hover:bg-blue-700 px-4 bg-blue-600 py-2 rounded">`
- После: `<button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 js-open">`

## Done

- Секция собрана в utility-first стиле.
- Decision gate зафиксирован явно: framework component или обоснованный custom JS.
- Performance-ограничения явно проверены и отражены в delivery-заметках.
- Верстка остается стабильной при замене контента (длинный текст и изменения пропорций изображений).
- Доставка изображений, `alt`, Figma-ассеты и шрифты проверены по связанным rules выше.
- [`performance-checklist.md`](performance-checklist.md) выполнен, где применимо.
