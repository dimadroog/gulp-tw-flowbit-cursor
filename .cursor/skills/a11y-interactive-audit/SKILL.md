---
name: a11y-interactive-audit
description: Audits interactive UI blocks for accessibility and keyboard behavior against W3C/ARIA expectations. Use when finishing interactive sections or preparing review-ready output.
disable-model-invocation: true
---

# A11y Interactive Audit

## Goal

Validate interaction quality before final delivery.

Canonical policy: [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md). Gate checklist: [`commands/a11y-checklist.md`](../../commands/a11y-checklist.md).

## Audit Checklist

1. Verify keyboard access and logical tab sequence.
2. Validate ARIA wiring for toggles, expanded states, labels, and controls.
3. Check visible `:focus-visible` states across interactive elements.
4. Semantic landmarks, heading hierarchy, dialog roles, `img` `alt`, contrast — per accessibility rule above.
5. Framework-first usage before custom JS — [`rules/javascript-minimalism.RULE.md`](../../rules/javascript-minimalism.RULE.md).
6. If custom JS exists, verify idempotent init and no duplicate event listeners after re-initialization.

## Output Format

- List blocking accessibility issues first.
- Provide direct fix guidance for each issue.
- Explicitly state if no critical a11y gaps remain.
