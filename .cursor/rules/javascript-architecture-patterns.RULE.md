---
description: JavaScript architecture baseline for Tailwind + Preline projects.
alwaysApply: true
globs:
  - app/js/**
---

# JavaScript Architecture Patterns

- Use progressive enhancement by default: baseline content/controls should remain usable without custom JS when possible.
- Use unobtrusive JavaScript: behavior is wired through `data-*` attributes and `js-*` hooks (classes preferred; `js-` ids when needed) — see [`javascript-minimalism.RULE.md`](javascript-minimalism.RULE.md) § JS Hook Naming.
- Prefer Preline-first implementation for standard interactions before writing custom logic.

## Functional Core / Imperative Shell

- Keep data transformations and decision logic in pure helper functions.
- Keep DOM reads/writes, event subscriptions, and side effects in a thin imperative shell.
- Avoid mixing heavy business logic directly inside event handlers.

## Initialization Lifecycle

- Every custom interaction must expose an idempotent init path (safe to call repeatedly).
- Prevent duplicate bindings/listeners on re-init.
- Keep initialization scoped to the relevant root container when possible.

## Simplicity Constraints

- Keep modules feature-oriented and focused on one interaction concern.
- Favor clarity over compact syntax in build/config scripts and orchestration code.
- Use ternary operators only for short one-line expressions.
