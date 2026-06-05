---
name: scaffold-page-from-layout
description: Subagent playbook for new page scaffolding. Use with Task tool when delegating page-shell work. Mandatory gate remains commands/new-page.md — do not skip it.
disable-model-invocation: true
---

# Scaffold Page From Layout (subagent playbook)

## When to delegate

Open this skill when spawning a **subagent** to build a page shell in parallel with other work. The parent agent must still run [`commands/new-page.md`](../../commands/new-page.md) as the gated procedure and report its checklist.

## Playbook (delegation hints)

- Confirm route, page purpose, and content zones before writing files.
- Prefer early partial extraction — flag repeated blocks for later loop/macro pass ([`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md)).
- Document assumptions for interactive blocks (framework-first per [`WORKFLOW.md`](../../WORKFLOW.md) §1.1).
- Note image slots and `alt` strategy — link policies, do not restate full lists.

## Pitfalls

- Do not put global `header`/`sidebar` in the page template — layout-shell partials only.
- Do not invent SEO copy; use placeholders from `new-page` command.
- Do not mark parent task complete — return scaffold status to orchestrator for gate chain.

## Canonical references

- Gate: [`commands/new-page.md`](../../commands/new-page.md)
- Policies: [`rules/html-nunjucks-conventions.RULE.md`](../../rules/html-nunjucks-conventions.RULE.md), [`rules/accessibility-and-w3c.RULE.md`](../../rules/accessibility-and-w3c.RULE.md)
