# Quick Start

Use this minimal flow at the start of a session.

## 1) Initialize once

Run: `init-layout-project`

Use when starting a new project or when governance decisions changed.

Default interaction stack:
- Tailwind CSS + Flowbite (MIT) for modal, collapse, accordion, offcanvas, dropdown, tabs, tooltip.
- Keep custom JS minimal and framework-first.

## 2) Build daily tasks

Run: `develop-layout-task: <task description>`

Examples:
- `develop-layout-task: create a new catalog page`
- `develop-layout-task: build product hero section`
- `develop-layout-task: refactor tabs to framework component`

Interaction defaults during implementation:
- Prefer Flowbite data-attribute API before writing custom behavior.
- Use project scrollspy helper (`data-scrollspy-nav`) for section tracking.
- Add searchable/custom select plugin only for pages that explicitly need searchable selects.

## 3) Keep index and bilingual sync

Handled automatically by workflow:
- new page -> `register-new-page-in-index`
- `.cursor/` edits -> `sync-cursor-bilingual-structure`
