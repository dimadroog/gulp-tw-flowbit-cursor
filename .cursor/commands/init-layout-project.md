# init-layout-project

Use this command for project initialization and governance setup before active layout implementation starts.

## Purpose

- Define project conventions, boundaries, and quality gates.
- Prepare documentation structure and indexing rules.
- Set shared agent behavior for repeatable execution.

## Initialization checklist

1. Confirm architecture and delivery constraints for current tooling.
2. Confirm accessibility baseline (`a11y-checklist`) and framework-first interaction policy.
3. Confirm Flowbite as default interaction layer for Tailwind-based components.
4. Confirm gaps policy:
   - internal helper for `scrollspy`
   - scoped lightweight plugin for searchable/custom select only when required
5. Confirm JavaScript architecture baseline for custom logic:
   - Progressive enhancement and unobtrusive JS
   - Functional core (pure helpers) + imperative shell (DOM/events)
   - idempotent initialization lifecycle (`init` can be safely called multiple times)
6. Confirm page registry policy (`register-new-page-in-index`).
7. Confirm bilingual `.cursor/` maintenance policy (`sync-cursor-bilingual-structure`).
8. Confirm required documentation scope (UI-kit and design tokens if present).
9. Confirm performance baseline and usage of `performance-checklist` for delivery tasks.
10. Confirm strict directive compliance baseline:
   - all `.cursor` directives are mandatory
   - no exceptions without explicit blocker escalation
   - completion is forbidden if required directives are not met
11. Confirm pixel-perfect baseline policy for mockup-driven work:
   - manual clarification of breakpoint baseline is mandatory
   - manual clarification of typography contract is mandatory
   - final delivery requires `validate-pixel-perfect` before `validate-all-directives`

## Output

- One initialization report with:
  - confirmed policies
  - unresolved decisions
  - readiness status for development phase
