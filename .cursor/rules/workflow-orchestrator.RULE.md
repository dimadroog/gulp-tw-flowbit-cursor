---
description: Route setup and implementation requests through lifecycle-aware command orchestration.
alwaysApply: true
---

# Workflow Orchestrator Policy

- For project setup and governance requests, default to `commands/init-layout-project.md`.
- When the user adds or evolves governed conventions under `.cursor/` (new rules, policy text, or orchestration alignment), follow `commands/add-rule.md` instead of scattering ad-hoc bullets across unrelated files.
- For day-to-day layout implementation requests, default to `commands/run-layout-task.md` as the primary orchestrator.
- Use `commands/develop-layout-task.md` as supporting execution guidance under `run-layout-task`.
- Enforce `rules/directive-compliance.RULE.md` as mandatory baseline for all task flows.
- Do not expect the user to explicitly name all supporting commands.
- Automatically choose and chain sub-commands based on intent:
  - page creation
  - section implementation
  - framework refactor
  - UI-kit documentation update
- Include `a11y-checklist` for interactive changes by default.
- Include `performance-checklist` for new pages, section delivery, and media-heavy updates.
- Include `commands/validate-html.md`: after build, run **`npm run validate:html`** and **`npm run validate:w3c`** (or `npm run qa`) for every task that outputs HTML.
- Include `validate-all-directives` as mandatory final post-check for every implementation task before completion.
- Include `pre-final-self-check` and `finalize-layout-task` as mandatory blockers before `validate-all-directives`.
- For mockup-driven implementation, require manual clarification of breakpoint baseline and typography contract before coding.
- Include `register-new-page-in-index` whenever a new page is created.
- For new-page/build-section flows, validate that global shell (`header`/`sidebar`) remains in root layout/shared partials and page templates keep only page content.
- For Figma-driven implementation, enforce `rules/figma-asset-integrity.RULE.md` checks (inline SVG for vectors, local `app/img/` paths for raster, no broken/empty image sources).
- For Figma-driven page/section work, run `commands/validate-figma-assets.md` as explicit post-check before completion.
- For mockup-driven page/section work, run `commands/validate-pixel-perfect.md` as explicit post-check before completion.
- Treat unresolved blocking TODOs or deferred fidelity notes as completion blockers.
- Include `sync-cursor-bilingual-structure` whenever `.cursor/` structure/content changes.
