# Карта workflow (русское зеркало для чтения)

> **Не для агента Cursor.** Каноника (enforce): [`.cursor/WORKFLOW.md`](../../.cursor/WORKFLOW.md). Этот файл — перевод для человека; держи синхронно с английским оригиналом.

Русский пересказ маршрута по `.cursor/`: **порядок, гейты и команды репозитория**.

## 1) Жизненный цикл одним проходом

| Фаза | Что читать | Заметки |
|------|------------|---------|
| **Governance** | [`commands/add-rule.md`](../../.cursor/commands/add-rule.md), [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §1.1–1.2 | Baseline стека и mockup fidelity — в §1.1–1.2; `add-rule` — для фиксации и слияния новых регламентов. |
| **Оркестрация** | [`commands/run-layout-task.md`](../../.cursor/commands/run-layout-task.md) | **Главный** драйвер ежедневной работы (hard-mode гейты); рецепты по типу задачи (`new-page`, `build-section`, `refactor-to-framework-component`, …) — в Orchestration flow этого файла. |
| **Маршрутизация** | [`rules/workflow-orchestrator.RULE.md`](../../.cursor/rules/workflow-orchestrator.RULE.md), [`rules/directive-compliance.RULE.md`](../../.cursor/rules/directive-compliance.RULE.md) | alwaysApply в Cursor. |

### 1.1 Стек и умолчания реализации (код)

Единственный источник для выбора стека; не дублируй этот список в [`README.md`](README.md).

- **Tailwind CSS + Flowbite (MIT)** — modal, collapse, accordion, offcanvas, dropdown, tabs, tooltip.
- Сначала **data-attribute API Flowbite**; кастомный JS — минимально.
- **Scrollspy:** проектный хелпер `data-scrollspy-nav` для навигации по секциям.
- **Поисковый / кастомный select** — только на страницах, где это явно требуется.
- **Изображения:** доставка, intrinsic sizing и PageSpeed — [`rules/image-delivery-and-optimization.RULE.md`](../../.cursor/rules/image-delivery-and-optimization.RULE.md).

### 1.2 Точность дизайна (mockup-driven, blocking)

Для задач из Figma или другого **утверждённого статического макета** (не «в духе макета»).

- **Предусловие:** до вёрстки зафиксированы baseline брейкпоинтов и контракт типографики (как в [`commands/validate-pixel-perfect.md`](../../.cursor/commands/validate-pixel-perfect.md)); иначе стоп и запрос уточнений.
- **Критические зоны** (не исчерпывающе): глобальный хром (шапка, сайдбар, подвал), hero и основные CTA, ключевые карточки/плитки, при необходимости — шаги «оформления». В этих зонах **визуальный дрейф недопустим**, если в брифе задачи нет явного waiver от дизайна/продукта (достаточно одной строки в отчёте).
- **Токены и геометрия:** цвета, радиусы, тени, обводки — из экспорта/спеки или карты токенов проекта. **Не подменять** произвольными утилитами Tailwind, меняющими оттенок, начертание или форму относительно макета.
- **Без «сырой» графики и плейсхолдеров** для критичных ассетов, бейджей и состояний — см. [`rules/mockup-driven-no-placeholder-completion.RULE.md`](../../.cursor/rules/mockup-driven-no-placeholder-completion.RULE.md).
- **Гейты:** при источнике Figma — `validate-figma-assets`; при mockup-driven сдаче — `validate-pixel-perfect`; где применимо — статус **`pass`** и evidence.

## 2) Автоматизация в репо (обязательно при HTML-выходе)

В корне проекта после правок шаблонов или ассетов:

```bash
npm run qa
```

Выполняются `gulp build`, линт JS/SCSS + Prettier и **`npm run validate:html`** (`html-validate`, только npm, офлайн). Подробности: [`commands/validate-html.md`](../../.cursor/commands/validate-html.md).

Дополнительно:

- `npm run normalize:svg-layout` — после массового импорта Figma-SVG в `app/img/layout-shell/` (см. [`commands/validate-figma-assets.md`](../../.cursor/commands/validate-figma-assets.md)).

**Только текст из `.cursor` проверки не запускает** — агент должен выполнить `npm run qa` (или эквивалент) и зафиксировать evidence.

## 3) Матрица гейтов (до статуса «готово»)

По порядку; **не пропускать** формулировкой «потом», кроме явного `not_applicable` с причиной.

1. Работа по типу задачи: `new-page` | `build-section` | `refactor-to-framework-component` | `fill-design-system-documentation` (цепочки в [`run-layout-task.md`](../../.cursor/commands/run-layout-task.md)).
2. `performance-checklist` — при новых страницах, секциях, тяжёлом медиа.
3. `a11y-checklist` — при интерактиве или лендмарках.
4. `validate-figma-assets` — если задача из Figma.
5. `validate-pixel-perfect` — если mockup-driven (сначала зафиксированы breakpoints + typography).
6. `register-new-page-in-index` — если добавлена страница.
7. `validate-html` — покрывается **`npm run qa`** после сборки.
8. [`pre-final-self-check.md`](../../.cursor/commands/pre-final-self-check.md) → [`finalize-layout-task.md`](../../.cursor/commands/finalize-layout-task.md) → [`validate-all-directives.md`](../../.cursor/commands/validate-all-directives.md).
9. Если менялся `.cursor/`: [`sync-cursor-bilingual-structure.md`](../../.cursor/commands/sync-cursor-bilingual-structure.md) и обновление зеркала в [`docs/cursor-ru/`](.).

Результат: явные **`pass|fail|not_applicable`** по каждому применимому гейту + evidence (команда/файлы).

## 4) Rules vs skills vs hooks

- **Rules (enforce):** только [`.cursor/rules/*.RULE.md`](../../.cursor/rules/) с `alwaysApply`. Здесь в `rules/*.md` — **справочные переводы**, без `alwaysApply`.
- **Commands (enforce):** [`.cursor/commands/`](../../.cursor/commands/). Переводы процедур — в [`commands/`](commands/) этого зеркала (только для чтения).
- **Skills:** [`.cursor/skills/`](../../.cursor/skills/) и зеркало в [`skills/`](skills/).
- **Hooks:** [`.cursor/hooks.json`](../../.cursor/hooks.json) (сейчас пусто).

## 5) Дополнительно / историческое

- [`README.md`](README.md) — вход и ход сессии (стек и fidelity — только §1.1–1.2 здесь).
- [`agent-topology.md`](agent-topology.md) — опциональная модель ролей; enforce — rules + commands выше.

## 6) Английский оригинал

Держи синхронно с **[`../WORKFLOW.md`](../../.cursor/WORKFLOW.md)** при любых правках.
