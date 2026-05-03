# Agent Topology And Orchestration

## Roles

- `MainAgentOrchestrator` - plans work, assigns subtasks, and merges output into one implementation/report.
- `LayoutImplementationAgent` - implements sections/pages from layout references.
- `NunjucksTemplateSubagent` - enforces include/loop/macro reuse and anti-duplication.
- `TailwindPolicySubagent` - validates utility-first execution and BEM exception discipline.
- `A11yReviewSubagent` - validates W3C/ARIA/keyboard/focus behavior.

## Role Inputs And Outputs

- **MainAgentOrchestrator**
  - inputs: user goal, lifecycle status, project rules/commands, scope boundaries
  - outputs: selected execution path, delegated tasks, merged final report with gate status
- **LayoutImplementationAgent**
  - inputs: layout reference, content requirements, page/section constraints
  - outputs: implemented markup/sections/pages and unresolved implementation notes
- **NunjucksTemplateSubagent**
  - inputs: implemented markup, repeated block candidates
  - outputs: include/loop/macro refactors, duplication findings, template consistency notes
- **TailwindPolicySubagent**
  - inputs: class lists, custom CSS snippets, performance/style constraints
  - outputs: utility ordering validation, BEM exception checks, styling/performance findings
- **A11yReviewSubagent**
  - inputs: interactive UI markup/behavior, keyboard/focus/ARIA context
  - outputs: pass/fail accessibility report, blocking issues, non-critical improvements

## Role To Commands / Skills Map

- `MainAgentOrchestrator`
  - commands: `run-layout-task`, `develop-layout-task`, `init-layout-project`
  - rules: `workflow-orchestrator.RULE.md`, `project-lifecycle-split.RULE.md`
- `LayoutImplementationAgent`
  - commands: `new-page`, `build-section`, `refactor-to-framework-component`
  - skills: `scaffold-page-from-layout`
- `NunjucksTemplateSubagent`
  - rules: `html-nunjucks-conventions.RULE.md`
  - skills: `nunjucks-loop-and-partials`
- `TailwindPolicySubagent`
  - commands: `performance-checklist`
  - rules: `tailwind-usage-policy.RULE.md`, `architecture-and-delivery-policy.RULE.md`
  - skills: `tailwind-tokenized-components`
- `A11yReviewSubagent`
  - commands: `a11y-checklist`
  - rules: `accessibility-and-w3c.RULE.md`
  - skills: `a11y-interactive-audit`

## Orchestration Rules

1. Orchestrator defines task scope and acceptance criteria first.
2. Layout implementation runs in parallel with template and styling validation where possible.
3. Accessibility review runs after structural implementation and before final sign-off.
4. Subagent findings are merged into one unified output with explicit fix status.
5. If subagent results conflict, use the conflict protocol below before sign-off.

## Conflict Escalation Protocol

1. Classify conflict type: `a11y`, `performance`, `content/layout`, or mixed.
2. Apply priority order:
   - accessibility and semantic validity
   - functional correctness and framework-first behavior
   - performance optimization
   - visual/documentation polish
3. If lower-priority work is deferred, add explicit reason and follow-up TODO in the merged report.
