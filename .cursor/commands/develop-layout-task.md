# develop-layout-task

Use this command for day-to-day implementation after project initialization is complete.

Prefer driving work through [`run-layout-task`](run-layout-task.md). Canonical gate order, stack, and mockup policy: [`WORKFLOW.md`](../WORKFLOW.md) (**§1–3**).

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
3. For mockup-driven tasks, satisfy **Design fidelity** preconditions in [`WORKFLOW.md`](../WORKFLOW.md) §1.2 (breakpoint baseline + typography contract) before coding.
4. Apply **Implementation defaults** from [`WORKFLOW.md`](../WORKFLOW.md) §1.1 (Flowbite-first, scrollspy helper, select plugin only when explicitly required).
5. For custom JS, use module discipline:
   - keep pure logic in helper functions where possible
   - keep DOM queries, listeners, and side effects in a thin init shell
   - make initialization idempotent
6. Run the required implementation chain from `run-layout-task`.
7. Run `a11y-checklist` for interactive changes.
8. Run `performance-checklist` for new pages, section delivery, and media-heavy updates.
9. Run `validate-pixel-perfect` for mockup-driven pages/sections.
10. Run `register-new-page-in-index` when a new page is created.
11. Run `sync-cursor-bilingual-structure` when `.cursor/` files are changed.
12. After a successful build for any HTML output, run **`npm run validate:html`** (or `npm run qa`, which includes it plus lint and a11y).
13. Run `pre-final-self-check` as mandatory blocker before finalization.
14. Run `finalize-layout-task` as mandatory blocker before completion.
15. Run `validate-all-directives` as mandatory final gate before completion.

## Hard-stop rules

- Do not close with unresolved blocking TODOs.
- Do not close with "next step/later" wording when any applicable gate is not `pass`.
- If required inputs are missing (especially breakpoints/typography for mockup-driven tasks), stop and request clarification.
- If Figma-driven, do not ship with temporary remote asset URLs in templates.

## Output

- Compact delivery report with:
  - completed work
  - skipped items with reason
  - TODO items and blockers
  - explicit gate matrix (`pass|fail|not_applicable`)
