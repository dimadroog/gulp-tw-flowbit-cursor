# Инфраструктура Cursor IDE (русское зеркало)

> **Только для чтения человеком.** Агент использует **только** [`.cursor/`](../../.cursor/). Здесь — переводы; в `rules/` нет `*.RULE.md` и `alwaysApply`.

**Каноника (EN):** [`.cursor/WORKFLOW.md`](../../.cursor/WORKFLOW.md) — жизненный цикл, гейты, `npm run qa`, §1.1–1.2.

## Структура зеркала

- `rules/` — справочные переводы политик (`*.md`, не Cursor rules).
- `commands/` — переводы процедур (enforce — [`.cursor/commands/`](../../.cursor/commands/)).
- `skills/` — переводы skills.

## Ход сессии

Стек и правила дизайна не дублировать — только [`WORKFLOW.md`](../../.cursor/WORKFLOW.md).

1. **Регламент агентов / оркестрация** → [`commands/add-rule.md`](../../.cursor/commands/add-rule.md); **baseline проекта** → [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §1.1–1.2.
2. **Реализация** → [`commands/run-layout-task.md`](../../.cursor/commands/run-layout-task.md) (гейты и цепочки по типу — [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §3).
3. **После правок, влияющих на HTML в репо** → **`npm run qa`** (агент запускает; evidence в отчёте).
4. **Любая правка `.cursor/`** → зеркало `docs/cursor-ru/` по [`commands/sync-cursor-bilingual-structure.md`](../../.cursor/commands/sync-cursor-bilingual-structure.md).

## См. также

- [`commands/add-rule.md`](../../.cursor/commands/add-rule.md) — развитие регламентов.
- [`agent-topology.md`](agent-topology.md) — опциональная модель ролей (enforce — rules + commands).
