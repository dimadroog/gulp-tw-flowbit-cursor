---
name: a11y-interactive-audit
description: Subagent playbook for deep interactive accessibility review. Use when delegating a11y pass before final gates. Mandatory checklist remains commands/a11y-checklist.md.
disable-model-invocation: true
---

# A11y Interactive Audit (subagent playbook)

## When to delegate

Open when a **subagent** should perform a focused interactive a11y review (keyboard, ARIA, focus). Parent must still run [`commands/a11y-checklist.md`](../../commands/a11y-checklist.md) and record gate status.

## Playbook

- Tab through all controls in DOM order; note traps and missing focus targets.
- Verify `aria-expanded` / `aria-controls` pairs on toggles.
- Check `:focus-visible` on custom-styled controls.
- For Flowbite widgets, confirm data-attribute init matches docs before adding custom JS.

## Pitfalls

- Duplicate event listeners after re-init — idempotent hooks per [`rules/javascript-minimalism.RULE.md`](../../rules/javascript-minimalism.RULE.md).
- Icon-only buttons without accessible names.
- Dialogs without `aria-modal` and labelled title.

## Canonical references

- Gate: [`commands/a11y-checklist.md`](../../commands/a11y-checklist.md)
- Policy: [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md)
