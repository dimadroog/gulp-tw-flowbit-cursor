# run-layout-task

Use this command as the single orchestrator for layout tasks. Treat it as a hard-mode flow with fail-fast completion control.

Canonical procedure, stack defaults, mockup fidelity, and gate decision table: [`WORKFLOW.md`](../WORKFLOW.md) (**§1.1–1.2, §3**).

## Trigger examples

- "Create a new page"
- "Build a new section"
- "Refactor interaction to a framework component"
- "Update design-system documentation"
- "Fix a typo in the footer" (may qualify for light path)

## Hard-mode defaults (always on)

- Do not close implementation tasks without explicit blocking-gate evidence.
- Do not defer blocking work to "next step/later".
- Do not silently assume missing required inputs.
- Do not report done while any applicable gate is `fail`.
- Gate statuses: **`pass | fail | not_applicable` only** — never `not_run`; missing applicable status = `fail`.

## Light path (trivial fix)

Use when **all** are true:

- One source file (or one partial + its include) under `app/`.
- No new pages, no new interactive controls, no new/changed raster or SVG assets.
- No mockup-fidelity scope (not driven by approved design in this task).
- Change is copy, class tweak, or minor markup fix.

**Light chain:** implement → `npm run qa` → [`finalize-layout-task.md`](finalize-layout-task.md) (§A–C; many §B/§C items will be `not_applicable`).

Do **not** use light path for new sections, Figma/mockup-driven work, or multi-file refactors.

## Pre / In / Post Matrix

- **Pre-process (blocking):**
  - Confirm project baseline: repo builds with `npm run qa` (or equivalent), layout-shell strategy is clear, and open project-specific decisions are in project docs or the task brief—not assumed silently.
  - Identify task type (`new-page`, `build-section`, `refactor-to-framework-component`, `documentation`) or **light path**.
  - Classify design source per [`WORKFLOW.md`](../WORKFLOW.md) §1.2 table (Figma / static mockup / unapproved / none).
  - Confirm required inputs (content, interactions, SEO/meta, media/font constraints).
  - For mockup-driven tasks, manually confirm breakpoint baseline and typography contract before coding.
  - Confirm layout-shell strategy: pages extend root layout; global `header`/`sidebar` stay in layout-level partials.
- **In-process (delegatable):**
  - Implement markup/layout.
  - Enforce template reuse (Nunjucks loops/includes/macros) instead of duplicated blocks.
  - Validate styling/performance direction (Tailwind-first, media/font delivery, content resilience).
  - Enforce Figma asset integrity when Figma-driven (inline SVG for vectors when applicable; structured local paths for raster; no emoji/text substitution of graphics).
- **Post-process (blocking before done):** per [`WORKFLOW.md`](../WORKFLOW.md) §3 decision table and chains below.

## Orchestration Flow

1. Identify path:
   - `new-page`
   - `build-section`
   - `refactor-to-framework-component`
   - `documentation`
   - `light` (trivial fix — criteria above)
2. Run required command chains:
   - `new-page` → `new-page` → `performance-checklist` → `a11y-checklist` → `validate-figma-assets` (if applicable) → `validate-pixel-perfect` (if applicable) → `register-new-page-in-index` → `validate-html` → `finalize-layout-task`
   - `build-section` → `build-section` → `performance-checklist` → `a11y-checklist` → `validate-figma-assets` (if applicable) → `validate-pixel-perfect` (if applicable) → `validate-html` → `finalize-layout-task`
   - `refactor-to-framework-component` → `refactor-to-framework-component` → `performance-checklist` → `a11y-checklist` → `validate-figma-assets` (if applicable) → `validate-pixel-perfect` (if applicable) → `validate-html` → `finalize-layout-task`
   - `documentation` → `fill-design-system-documentation` → `validate-html` (if HTML) → `finalize-layout-task`
   - `light` → `npm run qa` → `finalize-layout-task`
3. If `.cursor/` files changed during execution, run `sync-cursor-bilingual-structure` and `npm run check:cursor-mirror`.
4. Return one compact report:
   - completed work
   - path used (`new-page` | `build-section` | `refactor-to-framework-component` | `documentation` | `light`)
   - design-source classification (§1.2)
   - skipped items with reasons (`not_applicable`)
   - TODO items
   - explicit gate matrix (`pass|fail|not_applicable`)

## Blocking Gates

- HTML validation failures from `validate-html`.
- Accessibility failures from `a11y-checklist`.
- Performance items **flagged as blocking** in `performance-checklist` (see that command — PageSpeed/Lighthouse is recommended, not blocking without deploy URL).
- Missing page registration for newly created pages.
- Layout-shell violations (global `header`/`sidebar` in page template instead of root layout/partials).
- Asset integrity violations when Figma-driven.
- Pixel-perfect failures or missing breakpoint/typography clarification when mockup-driven.
- Unresolved visual placeholders or deferred fidelity TODOs in mockup-driven tasks.
- `finalize-layout-task` `overall_status: fail`.
- Missing bilingual sync or mirror parity after `.cursor/` changes.

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
- When `.cursor/` changes, update the human mirror under `docs/cursor-ru/` per `sync-cursor-bilingual-structure` (no Russian files under `.cursor/`).
- Treat all established directives as mandatory constraints; do not mark tasks complete when any required directive is violated.
- Do not declare completion with "next step/later" wording for unresolved blocking work.
