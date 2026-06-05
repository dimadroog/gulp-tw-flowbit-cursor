---
name: nunjucks-loop-and-partials
description: Optimizes Nunjucks templates with loops, includes, and macros to remove duplication and improve maintainability. Use when repeated markup patterns or large monolithic templates appear.
disable-model-invocation: true
---

# Nunjucks Loop And Partials

## Goal

Turn repeated HTML patterns into data-driven Nunjucks structures.

Canonical policy: [`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md) (partials, loops, fixture `{% set %}`, include modifiers).

## Workflow

1. Locate repeated block patterns (cards, nav items, feature lists, links).
2. Extract shared structure into include or macro.
3. Move variable content into arrays/objects and render through loops.
4. Keep naming conventions and data shape consistent.
5. Verify resulting HTML semantics remain unchanged.

## Guardrails

- One source template per repeated UI block; no parallel near-duplicate snippets.
- Macros: clear parameters, no hidden side effects — per html-nunjucks rule above.
