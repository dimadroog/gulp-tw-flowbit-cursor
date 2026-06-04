---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Workflow Orchestrator Policy

- Use **only** English files under `.cursor/` for orchestration and rules. Treat `docs/cursor-ru/` as human documentation unless the user explicitly `@`-mentions a path there.

## Lifecycle (governance vs implementation)

- Use [`WORKFLOW.md`](../WORKFLOW.md) §1.1–1.2 for baseline stack and mockup fidelity; use `commands/add-rule.md` for governed convention changes.
- For daily implementation, follow `commands/run-layout-task.md` as the **primary orchestrator** ([`WORKFLOW.md`](../WORKFLOW.md) §1–3); follow task-type commands (`build-section`, `new-page`, etc.) from its Orchestration flow.
- Do not mix unresolved project baseline gaps into development execution.
- Before implementation, confirm the repo builds (`npm run qa` or equivalent), layout-shell conventions are clear, and open project-specific decisions are in project docs or the task brief—not assumed silently.

## Routing and gates

- For project setup and governance requests, default to `commands/add-rule.md` and [`WORKFLOW.md`](../WORKFLOW.md) §1; do not duplicate baseline lists outside canonical WORKFLOW.
- When the user adds or evolves governed conventions under `.cursor/` (new rules, policy text, or orchestration alignment), follow `commands/add-rule.md` instead of scattering ad-hoc bullets across unrelated files.
- Enforce `rules/directive-compliance.RULE.md` as mandatory baseline for all task flows.
- Enforce `rules/task-scope-and-approval.RULE.md`: no out-of-scope implementation without an explicit user-approved proposal.
- Do not expect the user to explicitly name all supporting commands.
- Automatically choose and chain sub-commands based on intent: page creation, section implementation, framework refactor, design-system documentation update.
- Include `a11y-checklist` for interactive changes by default.
- Include `performance-checklist` for new pages, section delivery, and media-heavy updates.
- Include `commands/validate-html.md`: after build, run **`npm run validate:html`** (or `npm run qa`) for every task that outputs HTML.
- Run final gates per [`WORKFLOW.md`](../WORKFLOW.md) §3: `pre-final-self-check` → `finalize-layout-task` → `validate-all-directives`.
- For mockup-driven implementation, require manual clarification of breakpoint baseline and typography contract before coding.
- Include `register-new-page-in-index` whenever a new page is created.
- For new-page/build-section flows, validate that global shell (`header`/`sidebar`) remains in root layout/shared partials and page templates keep only page content.
- For Figma-driven implementation, enforce `rules/figma-asset-integrity.RULE.md` and run `commands/validate-figma-assets.md` when applicable.
- For new pages, section delivery, and media-heavy updates, enforce `rules/image-delivery-and-optimization.RULE.md`.
- For mockup-driven page/section work, run `commands/validate-pixel-perfect.md` as explicit post-check before completion.
- Treat unresolved blocking TODOs or deferred fidelity notes as completion blockers.
- Include `sync-cursor-bilingual-structure` whenever `.cursor/` structure/content changes.
