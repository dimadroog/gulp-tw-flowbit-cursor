# Agent Topology (mental model)

> **Not enforced by Cursor.** Binding behavior lives in [`WORKFLOW.md`](WORKFLOW.md), [`commands/run-layout-task.md`](commands/run-layout-task.md), and `rules/*.RULE.md`. Use this file only to name responsibilities when planning work.

## Roles (one line each)

| Role | Focus |
|------|--------|
| `MainAgentOrchestrator` | Scope, task type, gate matrix, merged report |
| `LayoutImplementationAgent` | Markup/sections/pages from layout reference |
| `NunjucksTemplateSubagent` | loops/includes/macros, anti-duplication |
| `TailwindPolicySubagent` | utility-first, BEM exceptions, performance/style |
| `A11yReviewSubagent` | W3C/ARIA/keyboard/focus |

## Where to look (not duplicate here)

| Concern | Canonical doc |
|---------|----------------|
| Orchestration & gates | [`run-layout-task`](commands/run-layout-task.md), [`WORKFLOW`](WORKFLOW.md) §3 |
| Section/page recipes | `build-section`, `new-page`, `refactor-to-framework-component` |
| Conflict priority (`a11y` vs `performance` vs layout) | [`run-layout-task`](commands/run-layout-task.md) — Conflict Escalation Protocol |
| Policies | `workflow-orchestrator.RULE.md`, subject rules under `rules/` |
