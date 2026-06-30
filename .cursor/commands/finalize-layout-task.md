# finalize-layout-task

Single mandatory final gate before reporting a layout task complete. Run **all sections in order** (A → B → C → C.1). Do not mark the task done until `overall_status: pass`.

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
8. `app/` touched: §C.1 AlwaysApply spot checks run with per-row evidence? (`no` blocks when applicable)

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

## Section C.1 — AlwaysApply spot checks (blocking when `app/` touched)

Run **after** the §C category sweep. **Blocking when** this task added or edited any path under `app/`. Do not mark §C complete until §C.1 is `pass` or every row is `not_applicable` with reason.

For each row: record **`pass | fail | not_applicable`** only — never `not_run`; skipping an applicable row = `fail`.

| Check | Rule | What to verify |
|-------|------|----------------|
| NBSP in Russian copy | [`html-nunjucks-conventions`](../rules/html-nunjucks-conventions.RULE.md) § Non-breaking spaces | New/changed strings in `shared/*.json`, page JSON, or Nunjucks copy: one- and two-letter prepositions/conjunctions use `&nbsp;` (entity, not raw Unicode); align with existing `shared/*.json` fixtures |
| Layout sizing / flex | [`layout-sizing-and-flex`](../rules/layout-sizing-and-flex.RULE.md) | New/changed CSS/markup: flex before grid (grid only with one-line reason); no pasted mockup `w-*` / `h-*` / `max-w-*` / `min-h-*` on text, flex children, or controls without an allowed exception; buttons/inputs via padding / `.btn` / `.form-control`; flex children prefer `flex-[grow_shrink_basis]` before width |
| Dimensional units | [`layout-dimensional-units`](../rules/layout-dimensional-units.RULE.md) | Custom flex-basis and arbitrary spacing in `px` |
| CSS placement | [`css-inheritance-layout`](../rules/css-inheritance-layout.RULE.md) | Non-inherited layout props on the element that needs them — not duplicated fixed boxes on descendants |
| Tailwind / CSS authoring | [`tailwind-usage-policy`](../rules/tailwind-usage-policy.RULE.md), [`css-authoring`](../rules/css-authoring.RULE.md) | Sorted utilities; section styles in `@layer components`; semantic control bases unchanged without reason |
| Images / media | [`image-delivery-and-optimization`](../rules/image-delivery-and-optimization.RULE.md), [`html-nunjucks-conventions`](../rules/html-nunjucks-conventions.RULE.md) | Content images: intrinsic `width`/`height`, `loading`/`decoding`; local paths only in built output |
| Figma asset integrity | [`figma-asset-integrity`](../rules/figma-asset-integrity.RULE.md) | Mockup-driven: no MCP/temp URLs in templates; icons/vectors per policy |
| JS scope | [`javascript-minimalism`](../rules/javascript-minimalism.RULE.md), [`logic-and-ternary-scope`](../rules/logic-and-ternary-scope.RULE.md) | New JS only when framework API is insufficient; no scope creep or trivial abstractions |

**§C.1 output:** table (check / status / file evidence) appended to the §C report.

**Completion rule:** all applicable rows `pass`. Any applicable `fail` or missing row → `overall_status: fail`.

---

## Final output format

- `overall_status: pass|fail`
- `section_a: ready|blocked`
- per-gate list (§B): name, status, evidence
- per-directive list (§C): category, status, evidence
- §C.1 spot-check table (when `app/` touched): check, status, file evidence
- blocking items with exact file paths
- remediation TODOs
