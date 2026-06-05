---
name: tailwind-tokenized-components
description: Subagent playbook for utility-first section implementation with token discipline. Use when delegating section build or refactor from a layout brief.
disable-model-invocation: true
---

# Tailwind Tokenized Components (subagent playbook)

## When to delegate

Open when a **subagent** implements or refactors a **section** from a design brief. Parent task must still run [`commands/build-section.md`](../../commands/build-section.md) and applicable gates.

## Playbook

- Decompose into primitives: container, grid, card, media, CTA.
- Reuse utility patterns across sections before inventing one-off arbitrary values.
- Custom/BEM only when utilities cannot express the requirement — document briefly.
- Run Prettier (tailwind plugin) on touched files before handoff.

## Pitfalls

- Arbitrary Tailwind hues in **critical zones** on mockup-driven tasks — use tokens/spec.
- Shipping extra CSS/JS when Flowbite data-API suffices.
- Deep wrapper nesting for layout that `@apply` or grid could flatten.

## Canonical references

- Gate: [`commands/build-section.md`](../../commands/build-section.md)
- Policies: [`rules/tailwind-usage-policy.RULE.md`](../../rules/tailwind-usage-policy.RULE.md), [`rules/architecture-and-delivery-policy.RULE.md`](../../rules/architecture-and-delivery-policy.RULE.md)
