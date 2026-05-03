# run-layout-task

Use this command as the main orchestrator for layout tasks so users do not have to invoke each command manually.

## Trigger examples

- "Create a new page"
- "Build a new section"
- "Refactor interaction to a framework component"
- "Update UI-kit documentation"

## Pre / In / Post Matrix

- **Pre-process (blocking):**
  - Confirm lifecycle state (`init-layout-project` is complete or explicitly being resolved).
  - Identify task type (`new-page`, `build-section`, `refactor`, `documentation`).
  - Confirm required inputs (content, interactions, SEO/meta, media/font constraints).
  - For mockup-driven tasks, manually confirm breakpoint baseline and typography contract before implementation starts.
  - Confirm layout-shell strategy: page extends root layout by default; global `header`/`sidebar` stay in layout-level partials.
- **In-process (delegatable):**
  - Layout/markup implementation.
  - Template reuse validation (Nunjucks loops/includes/macros).
  - Styling/performance validation (Tailwind policy, media/font delivery, content resilience).
  - Figma asset integrity validation (inline SVG for vectors, local structured paths for raster, no emoji/text substitution of graphics).
- **Post-process (blocking before done):**
  - `a11y-checklist` for interactive changes.
  - `performance-checklist` for page/section/media-impacting changes.
  - `validate-all-directives` for every implementation task.
  - `validate-figma-assets` for Figma-driven pages/sections.
  - `validate-pixel-perfect` for mockup-driven pages/sections.
  - `register-new-page-in-index` for new pages.
  - `sync-cursor-bilingual-structure` when `.cursor/` content/structure changes.
- **Background (non-blocking):**
  - Extended notes, optional documentation tails, and non-critical TODO elaboration.

## Orchestration Flow

1. Identify task type:
   - `new-page`
   - `build-section`
   - `refactor`
   - `documentation`
2. Run required command chains:
  - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (if Figma-driven) -> `validate-pixel-perfect` (if mockup-driven) -> `register-new-page-in-index` -> `validate-all-directives`
  - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist` -> `validate-figma-assets` (if Figma-driven) -> `validate-pixel-perfect` (if mockup-driven) -> `validate-all-directives`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist` -> `validate-all-directives`
   - `documentation` -> `fill-ui-kit-documentation` -> `validate-all-directives`
3. If `.cursor/` files were changed during execution, run `sync-cursor-bilingual-structure`.
4. Return one compact report:
   - completed work
   - skipped items with reasons
   - TODO items

## Blocking Gates

- Accessibility failures from `a11y-checklist`.
- Performance regressions flagged as blocking in `performance-checklist`.
- Missing page registration for newly created pages.
- Layout-shell violations (global `header`/`sidebar` implemented in page template instead of root layout/partials).
- Asset integrity violations (vector distortion/substitution, remote temporary asset URLs left in templates, empty/broken image sources).
- Pixel-perfect failures (orientation, spacing, typography, casing) or missing manual clarification of breakpoint/typography baseline.
- Any failed check from `validate-all-directives`.
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
