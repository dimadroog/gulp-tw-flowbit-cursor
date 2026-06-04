# finalize-layout-task

Use this command as the mandatory final blocker gate before reporting a layout task as complete.

## Purpose

- Prevent premature completion.
- Ensure all mandatory checks are explicitly passed.
- Reject completion when any applicable gate is missing or failed.
- Runs after all task gates and `validate-html`; `validate-all-directives` is the next mandatory step and is not part of this matrix (see [`WORKFLOW.md`](../WORKFLOW.md) §3).

## Required status matrix (must be explicit)

Full gate list reference: [`WORKFLOW.md`](../WORKFLOW.md) §3. Record one of: `pass | fail | not_applicable` for each item:

1. `performance-checklist`
2. `a11y-checklist`
3. `validate-figma-assets` (for Figma-driven tasks)
4. `validate-pixel-perfect` (for mockup-driven tasks)
5. `register-new-page-in-index` (when a new page was added)
6. `validate-html` (on `dist/**/*.html` via `npm run validate:html`, or full `npm run qa`)
7. `pre-final-self-check` (`ready_for_finalize`)
8. Build output check
9. Lint/format check
10. Manual input confirmation check for mockup-driven tasks (`breakpoints`, `typography`)
11. `sync-cursor-bilingual-structure` (when `.cursor/` changed)

## Completion rule

- Completion is allowed only when all applicable items are `pass`.
- If any applicable item is `fail` or `not_run`, return `overall_status: fail`.
- Do not defer blocking visual fidelity work to "next step" for mockup-driven tasks.
- Missing evidence for any applicable item is treated as `fail`.

## Output format

- `overall_status: pass|fail`
- per-gate list:
  - gate name
  - status
  - evidence (command/check used)
- blocking items with exact file paths
- remediation TODOs
