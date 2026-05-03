# validate-all-directives

Run a mandatory, final compliance gate against all relevant project directives before marking a task complete.

## Purpose

- Prevent partial compliance.
- Block completion when any mandatory directive is violated.
- Ensure consistent quality across performance, accessibility, semantics, styling, JS architecture, assets, and workflow policies.
- Ensure consistent quality across performance, accessibility, semantics, styling, JS architecture, assets, pixel-perfect fidelity, and workflow policies.

## Required checks

1. Determine the directive scope for the current task:
   - all `alwaysApply: true` rules
   - all command-level mandatory checks tied to task type
2. Validate implementation against each scoped directive category:
   - architecture/performance delivery
   - accessibility/W3C semantics
   - Tailwind/styling conventions
   - JavaScript minimalism/architecture
   - Nunjucks/layout-shell conventions
   - Figma asset integrity (when applicable)
   - pixel-perfect delivery (when mockup-driven)
   - registry/sync workflow requirements
3. Run concrete verification artifacts:
   - build output check
   - lint/diagnostic check
   - markup/source path integrity checks
   - manual-clarification check for required visual inputs (`breakpoints`, `typography`) on mockup-driven tasks
4. Record each directive as:
   - `pass`
   - `fail`
   - `not_applicable` (with reason)

## Output format

- A compact directive compliance report with:
  - `overall_status: pass|fail`
  - per-directive status table/list
  - blocking failures and exact file paths
  - remediation TODOs

## Blocking rule

- `overall_status = fail` means task cannot be marked complete.
