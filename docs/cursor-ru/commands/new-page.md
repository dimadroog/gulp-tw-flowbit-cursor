# new-page

Создай каркас новой страницы по конвенциям проекта.

## Входные данные

- Цель страницы и маршрут
- Ключевые секции из макета
- Требования SEO/meta

## Шаги

1. Семантические landmarks, один page-level `h1`, структура секций — [`rules/html-nunjucks-conventions.md`](../rules/html-nunjucks-conventions.md); landmarks и иерархия заголовков — [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).
2. Document shell: `<html lang="ru">` (если не задана другая локаль) и `<meta name="viewport" content="width=device-width, initial-scale=1">`.
3. Head/meta-заглушки при неизвестном SEO-контенте:
   - `<meta name="description" content="description">`
   - `<meta name="keywords" content="keywords">`
4. `<title>` совпадает с именем страницы в реестре `app/index.html`.
5. Если визуального `h1` нет в макете — добавь visually-hidden, но доступный `h1`.
6. Секции вынеси в includes/partials, не держи большую разметку inline.
7. Запланируй слоты изображений — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
8. Запланируй корректный `alt` для каждого `img` — [`rules/accessibility-and-w3c.md`](../rules/accessibility-and-w3c.md).
9. Стратегия webfont (self-hosted, `WOFF`/`WOFF2`, используемые семейства/начертания, `font-display: swap`) — [`rules/architecture-and-delivery-policy.md`](../rules/architecture-and-delivery-policy.md).
10. Проверка устойчивости контента (длинный текст, разные пропорции изображений) — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).
11. Зафиксируй допущения для будущих интерактивов; запланируй [`a11y-checklist.md`](a11y-checklist.md), когда появятся контролы.

## Done

- Каркас страницы готов к реализации секций.
- Повторяющиеся блоки подготовлены к loop/macro.
- Landmarks и иерархия заголовков явно валидны.
- Document shell валиден (`lang`, `viewport`, meta-заглушки).
- Базовая устойчивость к длинному тексту и смене пропорций изображений подтверждена.
- Стратегия изображений, шрифтов и a11y задокументирована по связанным rules выше.
- `<title>` совпадает с именем в `app/index.html`.
