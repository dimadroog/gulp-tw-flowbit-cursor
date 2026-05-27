# finalize-layout-task

Use this command as the mandatory final blocker gate before reporting a layout task as complete.

## Purpose

- Prevent premature completion.
- Ensure all mandatory checks are explicitly passed.
- Reject completion when any applicable gate is missing or failed.

## Required status matrix (must be explicit)

Record one of: `pass | fail | not_applicable` for each item:

1. `a11y-checklist`
2. `performance-checklist`
3. `validate-pixel-perfect` (for mockup-driven tasks)
4. `validate-figma-assets` (for Figma-driven tasks)
5. `validate-all-directives`
6. Build output check
7. Lint/format check
8. `validate-html` (on `dist/**/*.html` via `npm run validate:html`)
9. Manual input confirmation check for mockup-driven tasks (`breakpoints`, `typography`)

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
