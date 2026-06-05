# finalize-layout-task

Single mandatory final gate before reporting a layout task complete. Run **all three sections in order** (A → B → C). Do not mark the task done until `overall_status: pass`.

Supersedes the former separate flows `pre-final-self-check` (§A) and `validate-all-directives` (§C).

## Purpose

- Prevent premature completion.
- Ensure all mandatory checks are explicitly passed.
- Reject completion when any applicable gate is missing or failed.

---

## Section A — Self-check (blocking)

Answer each item; any blocking trigger → `overall_status: fail`, do not complete.

1. Unresolved visual TODOs in a mockup-driven task? (`yes` blocks)
2. All applicable blocking gates run and explicitly reported? (`no` blocks)
3. Avoided "later/next step" for blocking work? (`no` blocks)
4. Figma-driven: `validate-figma-assets` run with evidence? (`no` blocks when applicable)
5. Mockup-driven: `validate-pixel-perfect` has `pass|fail|not_applicable` with evidence? (`no` blocks when applicable)
6. Command/check evidence for each applicable gate? (`no` blocks)
7. HTML-delivering: `validate-html` / `npm run qa` explicitly `pass`? (`no` blocks)

**Section A output:** checklist (item / yes-no / blocker) + `section_a: ready | blocked`.

---

## Section B — Gate matrix (blocking)

Reference: [`WORKFLOW.md`](../WORKFLOW.md) §3. Record **`pass | fail | not_applicable`** only — never `not_run`; missing applicable status = `fail`.

1. `performance-checklist`
2. `a11y-checklist`
3. `validate-figma-assets` (per §1.2 design-source table)
4. `validate-pixel-perfect` (per §1.2 design-source table)
5. `register-new-page-in-index` (when a new page was added)
6. `validate-html` (`npm run validate:html` or full `npm run qa`)
7. Build output check
8. Lint/format check
9. Manual mockup inputs (`breakpoints`, `typography`) when mockup-driven
10. `sync-cursor-bilingual-structure` + `npm run check:cursor-mirror` (when `.cursor/` changed)

**Completion rule:** all applicable items `pass`. Any applicable `fail` or missing evidence → `overall_status: fail`.

---

## Section C — Directive sweep (blocking)

Scope for the current task:

- [`WORKFLOW.md`](../WORKFLOW.md) (procedure, §1.1–1.2, §3)
- orchestration core rules (`alwaysApply: true`)
- subject rules linked from applicable commands or touched file globs
- command-level mandatory checks for the task type

Validate categories (mark `not_applicable` with reason when out of scope):

- architecture/performance — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md), [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md)
- accessibility/W3C — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md)
- Tailwind/styling — [`rules/tailwind-usage-policy.RULE.md`](../rules/tailwind-usage-policy.RULE.md)
- JavaScript — [`rules/javascript-minimalism.RULE.md`](../rules/javascript-minimalism.RULE.md), [`rules/javascript-architecture-patterns.RULE.md`](../rules/javascript-architecture-patterns.RULE.md)
- Nunjucks/layout-shell — [`rules/html-nunjucks-conventions.RULE.md`](../rules/html-nunjucks-conventions.RULE.md)
- Figma assets / pixel-perfect / registry-sync — when applicable per §1.2 and §3

Artifacts already required in §B (build, lint, html, mockup inputs) do not need duplicate runs — reference §B evidence.

---

## Final output format

- `overall_status: pass|fail`
- `section_a: ready|blocked`
- per-gate list (§B): name, status, evidence
- per-directive list (§C): category, status, evidence
- blocking items with exact file paths
- remediation TODOs
