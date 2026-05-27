# Карта workflow (единая точка входа)

Используй этот файл как **канонический маршрут** по `.cursor/`. Остальные документы детализируют; здесь — **порядок, гейты и команды репозитория**.

## 1) Жизненный цикл одним проходом

| Фаза | Что читать | Заметки |
|------|------------|---------|
| **Governance** | [`commands/init-layout-project.md`](../commands/init-layout-project.md), [`commands/add-rule.md`](../commands/add-rule.md) | Init при старте или смене baseline; `add-rule` — для фиксации и слияния новых регламентов без полного re-init. |
| **Оркестрация** | [`commands/run-layout-task.md`](../commands/run-layout-task.md) | **Главный** драйвер ежедневной работы (hard-mode гейты). |
| **Детали исполнения** | [`commands/develop-layout-task.md`](../commands/develop-layout-task.md) | Чеклист под `run-layout-task`; не заменяет orchestrator. |
| **Маршрутизация** | [`rules/workflow-orchestrator.RULE.md`](../rules/workflow-orchestrator.RULE.md), [`rules/project-lifecycle-split.RULE.md`](../rules/project-lifecycle-split.RULE.md) | alwaysApply в Cursor. |

### 1.1 Стек и умолчания реализации (код)

Единственный источник для выбора стека; не дублируй этот список в `quick-start` или README.

- **Tailwind CSS + Flowbite (MIT)** — modal, collapse, accordion, offcanvas, dropdown, tabs, tooltip.
- Сначала **data-attribute API Flowbite**; кастомный JS — минимально.
- **Scrollspy:** проектный хелпер `data-scrollspy-nav` для навигации по секциям.
- **Поисковый / кастомный select** — только на страницах, где это явно требуется.

### 1.2 Точность дизайна (mockup-driven, blocking)

Для задач из Figma или другого **утверждённого статического макета** (не «в духе макета»).

- **Предусловие:** до вёрстки зафиксированы baseline брейкпоинтов и контракт типографики (как в [`commands/validate-pixel-perfect.md`](../commands/validate-pixel-perfect.md)); иначе стоп и запрос уточнений.
- **Критические зоны** (не исчерпывающе): глобальный хром (шапка, сайдбар, подвал), hero и основные CTA, ключевые карточки/плитки, при необходимости — шаги «оформления». В этих зонах **визуальный дрейф недопустим**, если в брифе задачи нет явного waiver от дизайна/продукта (достаточно одной строки в отчёте).
- **Токены и геометрия:** цвета, радиусы, тени, обводки — из экспорта/спеки или карты токенов проекта. **Не подменять** произвольными утилитами Tailwind, меняющими оттенок, начертание или форму относительно макета.
- **Без «сырой» графики и плейсхолдеров** для критичных ассетов, бейджей и состояний — см. [`rules/mockup-driven-no-placeholder-completion.RULE.md`](../rules/mockup-driven-no-placeholder-completion.RULE.md).
- **Гейты:** при источнике Figma — `validate-figma-assets`; при mockup-driven сдаче — `validate-pixel-perfect`; где применимо — статус **`pass`** и evidence.

## 2) Автоматизация в репо (обязательно при HTML-выходе)

В корне проекта после правок шаблонов или ассетов:

```bash
npm run qa
```

Выполняются `gulp build`, линт JS/SCSS + Prettier и **`npm run validate:html`** (`html-validate`, только npm, офлайн). Подробности: [`commands/validate-html.md`](../commands/validate-html.md).

Дополнительно:

- `npm run normalize:svg-layout` — после массового импорта Figma-SVG в `app/img/layout-shell/` (см. [`commands/validate-figma-assets.md`](../commands/validate-figma-assets.md)).

**Только текст из `.cursor` проверки не запускает** — агент должен выполнить `npm run qa` (или эквивалент) и зафиксировать evidence.

## 3) Матрица гейтов (до статуса «готово»)

По порядку; **не пропускать** формулировкой «потом», кроме явного `not_applicable` с причиной.

1. Работа по типу задачи: `new-page` | `build-section` | `refactor-to-framework-component` | `fill-design-system-documentation` (цепочки в [`run-layout-task.md`](../commands/run-layout-task.md)).
2. `performance-checklist` — при новых страницах, секциях, тяжёлом медиа.
3. `a11y-checklist` — при интерактиве или лендмарках.
4. `validate-figma-assets` — если задача из Figma.
5. `validate-pixel-perfect` — если mockup-driven (сначала зафиксированы breakpoints + typography).
6. `register-new-page-in-index` — если добавлена страница.
7. `validate-html` — покрывается **`npm run qa`** после сборки.
8. [`pre-final-self-check.md`](../commands/pre-final-self-check.md) → [`finalize-layout-task.md`](../commands/finalize-layout-task.md) → [`validate-all-directives.md`](../commands/validate-all-directives.md).
9. Если менялся `.cursor/`: [`sync-cursor-bilingual-structure.md`](../commands/sync-cursor-bilingual-structure.md) и зеркало здесь, в `_RU/`.

Результат: явные **`pass|fail|not_applicable`** по каждому применимому гейту + evidence (команда/файлы).

## 4) Rules vs skills vs hooks

- **Rules** (`rules/*.RULE.md`, часто `alwaysApply`): обязательные политики. Чтобы добавить или расширить правила с правильным размещением, следуй [`commands/add-rule.md`](../commands/add-rule.md).
- **Commands** (`commands/*.md`): процедуры и slash-команды.
- **Skills** (`skills/**/SKILL.md`): углубление по необходимости — **открывать явно**; сами не подтягиваются.
- **Hooks** ([`hooks.json`](../hooks.json)): сейчас пусто; автопри редактировании не срабатывает.

## 5) Дополнительно / историческое

- [`quick-start.md`](quick-start.md) — короткий список шагов (стек и fidelity — только §1.1–1.2 здесь).
- [`agent-topology.md`](../agent-topology.md) — модель ролей; enforce — rules + commands выше.
- [`done-criteria-first-iteration.md`](done-criteria-first-iteration.md) — legacy smoke-test первой волны `.cursor`; **не** полный QA проекта.

## 6) Английский оригинал

Держи синхронно с **[`../WORKFLOW.md`](../WORKFLOW.md)** при любых правках.
