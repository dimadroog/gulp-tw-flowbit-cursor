---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Workflow Orchestrator Policy

- Use **only** English files under `.cursor/` for orchestration and rules. Treat `docs/cursor-ru/` as human documentation unless the user explicitly `@`-mentions a path there.

## Routing by intent

- **Governance** (new or evolving conventions, `.cursor/` structure): [`commands/add-rule.md`](../commands/add-rule.md) and [`WORKFLOW.md`](../WORKFLOW.md) §1.1–1.2. Do not duplicate baseline lists outside canonical WORKFLOW.
- **Implementation** (pages, sections, refactors, docs): [`commands/run-layout-task.md`](../commands/run-layout-task.md) as the **primary orchestrator**; task-type recipes (`new-page`, `build-section`, etc.) from its Orchestration flow. Canonical stack, mockup fidelity, gates, and repo commands: [`WORKFLOW.md`](../WORKFLOW.md) §1–3.
- Do not mix unresolved project baseline gaps into development execution.

## Auto-orchestration

- Do not expect the user to explicitly name all supporting commands.
- Automatically choose and chain sub-commands based on intent (page creation, section implementation, framework refactor, design-system documentation).
- Apply applicable gates, checklists, and subject rules per [`WORKFLOW.md`](../WORKFLOW.md) §3 and the Pre/In/Post matrix in `run-layout-task` — do not re-list them here.
- Treat unresolved blocking TODOs or deferred fidelity notes as completion blockers.
