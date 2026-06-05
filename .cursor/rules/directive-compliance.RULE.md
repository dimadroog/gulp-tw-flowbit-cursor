---
description: Mandatory strict compliance with established project directives.
alwaysApply: true
---

# Directive Compliance Policy

- Follow all established directives in `.cursor/` strictly, without exceptions. Do not apply `docs/cursor-ru/` unless the user explicitly `@`-mentions a file there.
- **Rule tiers:** orchestration core rules (`alwaysApply: true`) plus subject rules linked from applicable commands for the current task (file-scoped rules load via `globs` when editing matching paths).
- Treat project rules and command checklists as binding constraints, not optional guidance.
- Do not bypass directives for speed or convenience.
- If directives conflict, report the conflict and resolve using the priority order in [`commands/run-layout-task.md`](../commands/run-layout-task.md) (Conflict Escalation Protocol).
- If any required directive cannot be satisfied, stop completion and return a blocker with concrete remediation steps.
- Before declaring a task complete, verify all applicable directives for the current task type; gate order and evidence rules are defined in [`WORKFLOW.md`](../WORKFLOW.md) §3 and enforced through `run-layout-task` and [`finalize-layout-task`](../commands/finalize-layout-task.md) (§A–C).
- Missing evidence for any applicable check is non-compliance.
