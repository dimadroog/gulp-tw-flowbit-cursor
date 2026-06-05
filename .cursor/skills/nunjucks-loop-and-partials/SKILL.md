---
name: nunjucks-loop-and-partials
description: Subagent playbook for deduplicating Nunjucks markup via loops, includes, and macros. Use when delegating template refactor work.
disable-model-invocation: true
---

# Nunjucks Loop And Partials (subagent playbook)

## When to delegate

Open when a **subagent** should refactor repeated markup into data-driven structures without changing visual output.

## Playbook

- Map repeated UI blocks (cards, nav items, feature lists) before extracting.
- Prefer include → loop → macro escalation per complexity.
- Keep fixture data in JSON for page-level lists; use `{% set %}` only in partials per [`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md).
- After refactor, verify semantics unchanged (landmarks, heading levels).

## Pitfalls

- Parallel near-duplicate snippets — one source template per block.
- Macros with hidden side effects.
- Breaking `headingoffset` or dialog `aria-labelledby` wiring during extraction.

## Canonical reference

- Policy: [`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md)
