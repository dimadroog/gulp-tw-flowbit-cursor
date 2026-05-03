---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Workflow Orchestrator Policy

- For project setup and governance requests, default to `commands/init-layout-project.md`.
- For day-to-day layout implementation requests, default to `commands/develop-layout-task.md`.
- Do not expect the user to explicitly name all supporting commands.
- Automatically choose and chain sub-commands based on intent:
  - page creation
  - section implementation
  - framework refactor
  - UI-kit documentation update
- Include `a11y-checklist` for interactive changes by default.
- Include `performance-checklist` for new pages, section delivery, and media-heavy updates.
- Include `register-new-page-in-index` whenever a new page is created.
- Include `sync-cursor-bilingual-structure` whenever `.cursor/` structure/content changes.
