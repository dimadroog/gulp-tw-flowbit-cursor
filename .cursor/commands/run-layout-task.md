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
- **In-process (delegatable):**
  - Layout/markup implementation.
  - Template reuse validation (Nunjucks loops/includes/macros).
  - Styling/performance validation (Tailwind policy, media/font delivery, content resilience).
- **Post-process (blocking before done):**
  - `a11y-checklist` for interactive changes.
  - `performance-checklist` for page/section/media-impacting changes.
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
   - `new-page` -> `new-page` -> `performance-checklist` -> `a11y-checklist` -> `register-new-page-in-index`
   - `build-section` -> `build-section` -> `performance-checklist` -> `a11y-checklist`
   - `refactor` -> `refactor-to-framework-component` -> `performance-checklist` -> `a11y-checklist`
   - `documentation` -> `fill-ui-kit-documentation`
3. If `.cursor/` files were changed during execution, run `sync-cursor-bilingual-structure`.
4. Return one compact report:
   - completed work
   - skipped items with reasons
   - TODO items

## Blocking Gates

- Accessibility failures from `a11y-checklist`.
- Performance regressions flagged as blocking in `performance-checklist`.
- Missing page registration for newly created pages.
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
