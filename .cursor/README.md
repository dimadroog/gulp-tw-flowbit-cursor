# Cursor IDE-Only Infrastructure

**Canonical procedure:** [`WORKFLOW.md`](WORKFLOW.md) — lifecycle, gate matrix, `npm run qa`, implementation stack (**§1.1**), mockup fidelity (**§1.2**).

## Layout

- `rules/` — binding policies (all rules use `alwaysApply`).
- `commands/` — procedures and slash commands.
- `skills/` — optional depth; open when needed.

## Session flow

Do not restate stack or design rules here — only [`WORKFLOW.md`](WORKFLOW.md).

1. **Agent policy / orchestration change** → [`commands/add-rule.md`](commands/add-rule.md); **project baseline** → [`WORKFLOW.md`](WORKFLOW.md) §1.1–1.2.
2. **Implementation** → [`commands/run-layout-task.md`](commands/run-layout-task.md) (gates and task-type chains in [`WORKFLOW.md`](WORKFLOW.md) §3).
3. **After HTML-related repo edits** → **`npm run qa`** (agent executes; evidence in report).
4. **Any `.cursor/` edit** → update Russian human mirror in [`docs/cursor-ru/`](../docs/cursor-ru/) per [`commands/sync-cursor-bilingual-structure.md`](commands/sync-cursor-bilingual-structure.md).

## See also

- [`commands/add-rule.md`](commands/add-rule.md) — evolving governed conventions.
- [`agent-topology.md`](agent-topology.md) — optional mental model for roles (enforcement is rules + commands).
- [`docs/cursor-ru/`](../docs/cursor-ru/) — Russian translations for reading (not agent rules).
