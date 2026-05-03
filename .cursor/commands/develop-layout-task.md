# develop-layout-task

Use this command for day-to-day implementation after project initialization is complete.

## Scope

- New page creation
- Section implementation
- Interaction refactoring
- Documentation updates tied to delivered UI

## Execution flow

1. Identify task type (`new-page`, `build-section`, `refactor`, `documentation`).
2. Apply interaction policy:
   - Flowbite-first for standard interactive patterns.
   - Use internal `scrollspy` helper before custom scrollspy logic.
   - Add searchable/custom select plugin only when explicitly required by the task.
3. For custom JS, use module discipline:
   - keep pure logic in helper functions where possible
   - keep DOM queries, listeners, and side effects in a thin init shell
   - make initialization idempotent
4. Run the required implementation command chain.
5. Run `a11y-checklist` for interactive changes.
6. Run `performance-checklist` for new pages, section delivery, and media-heavy updates.
7. Run `register-new-page-in-index` when a new page is created.
8. Run `sync-cursor-bilingual-structure` when `.cursor/` files are changed.

## Output

- Compact delivery report with:
  - completed work
  - skipped items with reason
  - TODO items and blockers
