# develop-layout-task

Use this command for day-to-day implementation after project initialization is complete.

## Scope

- New page creation
- Section implementation
- Interaction refactoring
- Documentation updates tied to delivered UI

## Execution flow

1. Identify task type (`new-page`, `build-section`, `refactor`, `documentation`).
2. Validate layout strategy before implementation:
   - default all pages to extend `njk-layouts/_main.njk`
   - keep global shell (`header`/`sidebar`) in layout-level partials
   - create an additional layout only when structural divergence is confirmed
3. For mockup-driven tasks, manually clarify required visual baselines before coding:
   - breakpoint baseline (explicit target widths/states)
   - typography contract (font metrics and text case rules)
4. Apply interaction policy:
   - Flowbite-first for standard interactive patterns.
   - Use internal `scrollspy` helper before custom scrollspy logic.
   - Add searchable/custom select plugin only when explicitly required by the task.
5. For custom JS, use module discipline:
   - keep pure logic in helper functions where possible
   - keep DOM queries, listeners, and side effects in a thin init shell
   - make initialization idempotent
6. Run the required implementation command chain.
7. Run `a11y-checklist` for interactive changes.
8. Run `performance-checklist` for new pages, section delivery, and media-heavy updates.
9. Run `validate-pixel-perfect` for mockup-driven pages/sections.
10. Run `register-new-page-in-index` when a new page is created.
11. Run `sync-cursor-bilingual-structure` when `.cursor/` files are changed.
12. Run `validate-all-directives` as mandatory final gate before completion.

## Output

- Compact delivery report with:
  - completed work
  - skipped items with reason
  - TODO items and blockers
