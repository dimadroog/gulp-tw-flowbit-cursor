---
description: Split project lifecycle into initialization and development phases for layout workflows.
alwaysApply: true
---

# Project Lifecycle Split Policy

- Use `commands/init-layout-project.md` for setup and governance decisions.
- For daily implementation, follow `commands/run-layout-task.md` as the **primary orchestrator**, with `commands/develop-layout-task.md` as the supporting execution checklist.
- Do not mix unresolved initialization decisions into development execution.
- If initialization is incomplete, complete or clarify it before implementation.
