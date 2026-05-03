---
name: a11y-interactive-audit
description: Audits interactive UI blocks for accessibility and keyboard behavior against W3C/ARIA expectations. Use when finishing interactive sections or preparing review-ready output.
disable-model-invocation: true
---

# A11y Interactive Audit

## Goal

Validate interaction quality before final delivery.

## Audit Checklist

1. Verify keyboard access and logical tab sequence.
2. Validate ARIA wiring for toggles, expanded states, labels, and controls.
3. Check visible `:focus-visible` states across interactive elements.
4. Confirm semantic landmarks and heading hierarchy.
5. Ensure contrast and non-text alternatives are sufficient.
6. Confirm framework-first usage (Flowbite or approved component API) before custom JS.
7. If custom JS exists, verify idempotent init and no duplicate event listeners after re-initialization.

## Output Format

- List blocking accessibility issues first.
- Provide direct fix guidance for each issue.
- Explicitly state if no critical a11y gaps remain.
