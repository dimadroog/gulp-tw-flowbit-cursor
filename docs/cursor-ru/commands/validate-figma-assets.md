# validate-figma-assets

Пост-проверка целостности ассетов после Figma-driven реализации.

## Когда запускать

- После вёрстки страницы/секции из Figma.
- После смены иконок, логотипов, аватаров, иллюстраций.
- Перед финальной сдачей, когда критична согласованность источника и типа ассетов.

## Проверки

Базовая policy: [`rules/figma-asset-integrity.md`](../rules/figma-asset-integrity.md) (inline SVG, локальные raster-пути, без remote URL, без подмены графики текстом, геометрия вектора).

1. Проверки 1–6 и 9 из figma-asset-integrity rule выше.
2. UI SVG: `rg 'preserveAspectRatio="none"' app/img` — **ноль совпадений**, если в задаче нет явного исключения по файлу.
3. После массовой замены Figma SVG в `app/img/layout-shell/` — `npm run normalize:svg-layout`, чтобы inlined-иконки не дублировали `id` в одном HTML-документе.
4. Intrinsic raster (≤ rendered × 2.0 по оси) — [`rules/image-delivery-and-optimization.md`](../rules/image-delivery-and-optimization.md).

## Вывод

- Краткая validation-заметка:
  - pass/fail
  - нарушенные проверки (если есть)
  - точные пути для исправления

## Блокирующий статус

- При любом fail задача не готова к завершению.
