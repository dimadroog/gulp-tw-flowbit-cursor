---
description: Mandatory strict compliance with established project directives.
alwaysApply: true
---

# Directive Compliance Policy

- Follow all established directives in `.cursor/` and `.cursor/_RU/` strictly, attentively, and without exceptions.
- Treat project rules and command checklists as binding implementation constraints, not optional guidance.
- Do not bypass directives for speed or convenience.
- If directives conflict, explicitly report the conflict and resolve by defined priority order in orchestration commands.
- If any required directive cannot be satisfied, stop completion and return a blocker with concrete remediation steps.
- Before declaring a task complete, verify adherence to all relevant directives for the current task type.
- Treat `commands/validate-all-directives.md` as required blocking gate for task completion.
- Treat `commands/pre-final-self-check.md` and `commands/finalize-layout-task.md` as mandatory pre-completion blockers.
- Treat `commands/validate-html.md` as mandatory for any task that outputs HTML (`npm run validate:html` **and** `npm run validate:w3c` after build, or `npm run qa`).
- Missing evidence for applicable directive checks must be treated as non-compliance.
