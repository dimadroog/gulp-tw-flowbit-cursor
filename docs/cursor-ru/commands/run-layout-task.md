# run-layout-task

> Перевод для человека. **Enforce:** [`.cursor/commands/run-layout-task.md`](../../../.cursor/commands/run-layout-task.md).

Ключевые изменения (синхронно с EN):

- Статусы гейтов: только `pass|fail|not_applicable`; `not_run` запрещён.
- **Light path** — тривиальная правка одного файла без интерактива/медиа/mockup: `npm run qa` → `finalize-layout-task`.
- Классификация источника дизайна — таблица §1.2 в WORKFLOW (Figma ⊂ mockup-driven).
- Финал: один `finalize-layout-task` (§A–§C), не тройка отдельных команд.
- PageSpeed/Lighthouse — recommended; blocking только при регрессии на deploy URL.

Полные цепочки и критерии light path — в английском каноне.
