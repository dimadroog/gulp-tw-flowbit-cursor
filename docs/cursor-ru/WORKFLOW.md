# Карта workflow (русское зеркало для чтения)

> **Не для агента Cursor.** Каноника (enforce): [`.cursor/WORKFLOW.md`](../../.cursor/WORKFLOW.md). Держи синхронно с английским оригиналом.

## 1) Жизненный цикл

| Фаза | Что читать | Заметки |
|------|------------|---------|
| **Governance** | [`commands/add-rule.md`](commands/add-rule.md), [`WORKFLOW.md`](../../.cursor/WORKFLOW.md) §1.1–1.2 | Baseline стека и mockup fidelity — в §1.1–1.2. |
| **Оркестрация** | [`commands/run-layout-task.md`](commands/run-layout-task.md) | Главный драйвер; рецепты и light path — в orchestration flow. |
| **Маршрутизация** | [`rules/workflow-orchestrator.md`](rules/workflow-orchestrator.md), [`rules/directive-compliance.md`](rules/directive-compliance.md) | Orchestration core (`alwaysApply`). |

### 1.2 Точность дизайна и Figma ⊂ mockup-driven

**Figma — источник mockup.** Задачи из Figma — mockup-driven; нужны оба гейта, где применимо.

| Источник дизайна | Mockup-driven? | `validate-figma-assets` | `validate-pixel-perfect` |
|------------------|----------------|-------------------------|--------------------------|
| Утверждённый Figma / экспорт | да | **обязателен** | **обязателен** |
| PNG/PDF/статический макет (без Figma) | да | `not_applicable` | **обязателен** |
| Ссылка/скрин без явного approval | нет — уточнить | `not_applicable` | `not_applicable` |
| Нет макета (только контент/тулинг) | нет | `not_applicable` | `not_applicable` |

SEO-плейсхолдеры и скрытый `h1` — **не** fidelity-плейсхолдеры (см. `new-page`).

## 2) Автоматизация в репо

```bash
npm run qa
npm run check:cursor-mirror   # после правок .cursor/
```

## 3) Матрица гейтов

### Статусы

Только **`pass | fail | not_applicable`**. **`not_run` запрещён** — отсутствие статуса = `fail`.

### Decision table

См. полную таблицу в [`.cursor/WORKFLOW.md`](../../.cursor/WORKFLOW.md) §3. Кратко:

- Новая страница / секция / refactor — цепочки в [`run-layout-task.md`](commands/run-layout-task.md).
- **Light path** — один файл, без интерактива/медиа/mockup: `npm run qa` → `finalize-layout-task`.
- **Финальный гейт:** [`finalize-layout-task.md`](commands/finalize-layout-task.md) (§A self-check → §B матрица → §C directive sweep). `pre-final-self-check` и `validate-all-directives` — редиректы на §A и §C.

## 4) Rules / skills / hooks

- **Orchestration core** (`alwaysApply`): 4 rules — orchestrator, directive-compliance, bilingual-sync, task-scope.
- **Subject rules** — `globs` или on-demand через commands.
- **Skills** — playbook для subagent; **commands** — обязательные гейты.
- **Hooks** — напоминания после правок `app/` и `.cursor/` ([`hooks.json`](../../.cursor/hooks.json)).

## 6) Английский оригинал

[`../../.cursor/WORKFLOW.md`](../../.cursor/WORKFLOW.md)
