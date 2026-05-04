# pre-final-self-check

Use this quick self-check immediately before final response in implementation tasks.

## Mandatory yes/no checks

1. Are there any unresolved visual TODOs in a mockup-driven task? (`yes` blocks completion)
2. Are all applicable blocking gates run and explicitly reported? (`no` blocks completion)
3. Did you avoid "later/next step" wording for any blocking work? (`no` blocks completion)
4. For Figma-driven work, is asset integrity validated (`validate-figma-assets`)? (`no` blocks completion)
5. Is there a clear `pass|fail` status for pixel-perfect where applicable? (`no` blocks completion)
6. Is there command/check evidence attached for each applicable gate? (`no` blocks completion)
7. For HTML-delivering tasks, are **both** `validate-html` and `validate:w3c` explicitly `pass` (or does full `npm run qa` after build show `pass` for HTML gates)? (`no` blocks completion)

## Decision rule

- If any blocking answer is triggered, do not mark task complete.
- Continue implementation until blockers are resolved, then rerun this check.

## Output

- Compact checklist summary:
  - item
  - yes/no
  - blocker flag
- final decision: `ready_for_finalize | blocked`
