# init-layout-project

Use this command for project initialization and governance setup before active layout implementation starts.

Authoritative stack and mockup rules: [`WORKFLOW.md`](../WORKFLOW.md) §1.1–1.2.

## Purpose

- Define project conventions, boundaries, and quality gates.
- Prepare documentation structure and indexing rules.
- Set shared agent behavior for repeatable execution.

## Initialization checklist

1. Confirm architecture and delivery constraints for current tooling.
2. Confirm accessibility baseline (`a11y-checklist`) and **implementation defaults** ([`WORKFLOW.md`](../WORKFLOW.md) §1.1 — Flowbite-first, scrollspy helper, searchable/custom select only when explicitly required).
3. Confirm JavaScript architecture baseline for custom logic:
   - Progressive enhancement and unobtrusive JS
   - Functional core (pure helpers) + imperative shell (DOM/events)
   - Idempotent initialization lifecycle (`init` can be safely called multiple times)
4. Confirm page registry policy (`register-new-page-in-index`).
5. Confirm bilingual `.cursor/` maintenance policy (`sync-cursor-bilingual-structure`).
6. Confirm required documentation scope (UI-kit and design tokens if present).
7. Confirm performance baseline and usage of `performance-checklist` for delivery tasks.
8. Confirm strict directive compliance baseline:
   - all `.cursor` directives are mandatory
   - no exceptions without explicit blocker escalation
   - completion is forbidden if required directives are not met
9. Confirm **design fidelity** baseline for mockup-driven work per [`WORKFLOW.md`](../WORKFLOW.md) §1.2; where applicable, `validate-pixel-perfect` before `validate-all-directives`.
10. Confirm hard-mode completion baseline:
   - `pre-final-self-check` is mandatory before final response
   - `finalize-layout-task` is mandatory before completion
   - completion with deferred blocking work ("next step/later") is forbidden
11. Confirm HTML validation baseline:
   - `npm run validate:html` (html-validate) and `npm run validate:w3c` (W3C Nu) run on `dist/**/*.html` after every build-affecting change
   - `npm run qa` includes build, lint, both HTML validators (Nu + html-validate)

## Output

- One initialization report with:
  - confirmed policies
  - unresolved decisions
  - readiness status for development phase
