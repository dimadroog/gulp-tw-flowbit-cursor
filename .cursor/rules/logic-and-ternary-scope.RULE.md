---
description: Use explicit logical blocks for multi-line branching and reserve ternary operators for one-line expressions.
alwaysApply: true
---

# Logic And Ternary Scope

- Prefer explicit `if/else` blocks for branching that spans multiple lines.
- Use ternary operators only for short single-line expressions.
- Do not use nested ternary operators.
- Do not use ternary operators to define multi-line function blocks or task pipelines.
- For build scripts and config files, prioritize readability over compact syntax.

## Quick examples

- Good: `const state = isReady ? "ready" : "idle";`
- Good: `if (items.length > 0) { run(); } else { done(); }`
- Avoid: `const x = condition ? longMultilineBlock() : otherMultilineBlock();`
