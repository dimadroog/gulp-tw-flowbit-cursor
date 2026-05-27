# run-layout-task

Use this command as the single orchestrator for layout tasks. Treat it as a hard-mode flow with fail-fast completion control.

Canonical procedure, stack defaults, and mockup fidelity: [`WORKFLOW.md`](../WORKFLOW.md) (**§1.1–1.2**).

## Trigger examples

- "Create a new page"
- "Build a new section"
- "Refactor interaction to a framework component"
- "Update design-system documentation"

## Hard-mode defaults (always on)

- Do not close implementation tasks without explicit blocking-gate evidence.
- Do not defer blocking work to "next step/later".
- Do not silently assume missing required inputs.
- Do not report done while any applicable gate is `fail` or `not_run`.

## Pre / In / Post Matrix

- **Pre-process (blocking):**
  - Confirm lifecycle state (`init-layout-project` complete or explicitly being resolved).
  - Identify task type (`new-page`, `build-section`, `refactor`, `documentation`).
  - Confirm required inputs (content, interactions, SEO/meta, media/font constraints).
  - For mockup-driven tasks, manually confirm breakpoint baseline and typography contract before coding.
  - Confirm layout-shell strategy: pages extend root layout; global `header`/`sidebar` stay in layout-level partials.
- **In-process (delegatable):**
  - Implement markup/layout.
  - Enforce template reuse (Nunjucks loops/includes/macros) instead of duplicated blocks.
  - Validate styling/performance direction (Tailwind-first, media/font delivery, content resilience).
  - Enforce Figma asset integrity (inline SVG for vectors when applicable; structured local paths for raster; no emoji/text substitution of graphics).
- **Post-process (blocking before done):**
  - `a11y-checklist` for interactive changes.
  - `performance-checklist` for page/section/media-impacting changes.
  - `validate-figma-assets` for Figma-driven pages/sections.
  - `validate-pixel-perfect` for mockup-driven pages/sections.
  - `register-new-page-in-index` for new pages.
  - `pre-final-self-check` for every implementation task.
  - `finalize-layout-task` for every implementation task.
  - `validate-all-directives` for every implementation task.
  - `validate-html` (`npm run validate:html` after build, or `npm run qa`) for every implementation task that produces HTML.
  - `sync-cursor-bilingual-structure` when `.cursor/` content/structure changes.

## Orchestration Flow

1. Identify task type:
   - `new-page`
   - `build-section`
   - `refactor`
   - `documentation`
2. Run required command chains:
   - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (if Figma-driven) -> `validate-pixel-perfect` (if mockup-driven) -> `register-new-page-in-index` -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (if Figma-driven) -> `validate-pixel-perfect` (if mockup-driven) -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist` -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
   - `documentation` -> `fill-design-system-documentation` -> `validate-html` -> `pre-final-self-check` -> `finalize-layout-task` -> `validate-all-directives`
3. If `.cursor/` files changed during execution, run `sync-cursor-bilingual-structure`.
4. Return one compact report:
   - completed work
   - skipped items with reasons
   - TODO items
   - explicit gate matrix (`pass|fail|not_applicable`)

## Blocking Gates

- HTML validation failures from `validate-html`.
- Accessibility failures from `a11y-checklist`.
- Performance regressions flagged as blocking in `performance-checklist`.
- Missing page registration for newly created pages.
- Layout-shell violations (global `header`/`sidebar` implemented in page template instead of root layout/partials).
- Asset integrity violations (vector distortion/substitution, temporary remote asset URLs left in templates, empty/broken image sources).
- Pixel-perfect failures (orientation, spacing, typography, casing) or missing manual breakpoint/typography clarification.
- Attempted completion with unresolved visual placeholders or deferred fidelity TODOs in mockup-driven tasks.
- Any failed check from `finalize-layout-task` or `validate-all-directives`.
- Missing bilingual sync after `.cursor/` changes.

## Conflict Escalation Protocol

1. Record conflict type (`a11y` vs `performance` vs `content/layout`) in the report.
2. Apply priority order:
   - baseline accessibility and semantic correctness
   - functional correctness and framework-first interaction behavior
   - performance optimization
   - visual polish/documentation niceties
3. If a lower-priority item is deferred, provide explicit reason and follow-up TODO.

## Safety rules

- Ask only for mandatory missing input.
- Prefer framework-native behavior over custom JS for interactions.
- Do not skip accessibility checks for interactive changes.
- Keep names and structure aligned between `.cursor/` and `.cursor/_RU/`.
- Treat all established directives as mandatory constraints; do not mark tasks complete when any required directive is violated.
- Do not declare completion with "next step/later" wording for unresolved blocking work.
