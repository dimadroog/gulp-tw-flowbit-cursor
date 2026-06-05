# Workflow map (single entry)

Use this file as the **canonical route** through `.cursor/`. Other docs add detail; this file defines **order, gates, and repo commands**.

## 1) Lifecycle in one pass

| Phase | What to follow | Notes |
|--------|----------------|--------|
| **Governance** | [`commands/add-rule.md`](commands/add-rule.md), [`WORKFLOW.md`](WORKFLOW.md) §1.1–1.2 | Baseline stack and mockup fidelity live in §1.1–1.2; use `add-rule` to capture or merge new governed conventions. |
| **Orchestration** | [`commands/run-layout-task.md`](commands/run-layout-task.md) | **Primary** driver for day-to-day work (hard-mode gates); task-type recipes (`new-page`, `build-section`, `refactor-to-framework-component`, …) per Orchestration flow in that file. |
| **Policy routing** | [`rules/workflow-orchestrator.RULE.md`](rules/workflow-orchestrator.RULE.md), [`rules/directive-compliance.RULE.md`](rules/directive-compliance.RULE.md) | Cursor alwaysApply. |

### 1.1 Implementation defaults (code stack)

Single source for stack choices; do not duplicate this list in [`README.md`](README.md).

- **Tailwind CSS + Flowbite (MIT)** for modal, collapse, accordion, offcanvas, dropdown, tabs, tooltip.
- Prefer **Flowbite data-attribute API** before custom JS; keep bespoke behavior minimal.
- **Scrollspy:** use project helper `data-scrollspy-nav` for in-page section tracking.
- **Searchable / custom select** plugins only on pages that explicitly require them.
- **Images:** delivery, intrinsic sizing, and PageSpeed — [`rules/image-delivery-and-optimization.RULE.md`](rules/image-delivery-and-optimization.RULE.md).

### 1.2 Design fidelity (mockup-driven, blocking)

Applies when the task is driven by Figma or another **approved static mockup** (not “inspired by”).

- **Precondition:** breakpoint baseline and typography contract are fixed **before** implementation (same bar as [`commands/validate-pixel-perfect.md`](commands/validate-pixel-perfect.md)); otherwise stop and clarify.
- **Critical zones** (non-exhaustive): global chrome (header, sidebar, footer), hero and primary CTAs, flagship cards/tiles, checkout-like flows when in scope. In these zones, **visual drift is not acceptable** unless the task brief records an explicit designer/product waiver (one line in the report is enough).
- **Tokens and geometry:** use colors, radii, shadows, and borders from the design export/spec or project token map. Do **not** swap in arbitrary Tailwind utilities that change hue, weight, or shape versus the mockup.
- **No placeholder completion** for fidelity-critical graphics, badges, or states; see [`rules/mockup-driven-no-placeholder-completion.RULE.md`](rules/mockup-driven-no-placeholder-completion.RULE.md).
- **Gates:** `validate-figma-assets` when the source is Figma; `validate-pixel-perfect` when delivery is mockup-driven — must be **`pass`** where applicable, with evidence.

## 2) Repo automation (mandatory for HTML output)

Run in the project root after changes that affect templates or assets:

```bash
npm run qa
```

This runs `gulp build`, JS/SCSS lint + Prettier check, and **`npm run validate:html`** (`html-validate`, npm-only, offline). Details: [`commands/validate-html.md`](commands/validate-html.md).

Other tooling:

- `npm run normalize:svg-layout` — after bulk Figma SVG imports under `app/img/layout-shell/` (see [`commands/validate-figma-assets.md`](commands/validate-figma-assets.md)).

**`.cursor` instructions alone do not run checks** — the agent must execute `npm run qa` (or equivalent steps) and record evidence.

## 3) Gate matrix (before “done”)

Apply in order; **do not skip** with “later” unless marked N/A with reason.

1. Task-type work: `new-page` | `build-section` | `refactor-to-framework-component` | `fill-design-system-documentation` (see chains in [`run-layout-task.md`](commands/run-layout-task.md)).
2. `performance-checklist` — when pages, sections, or heavy media change.
3. `a11y-checklist` — when interactivity or landmarks change.
4. `validate-figma-assets` — if Figma-driven.
5. `validate-pixel-perfect` — if mockup-driven (requires clarified breakpoints + typography first).
6. `register-new-page-in-index` — if a new page was added.
7. `validate-html` — covered by **`npm run qa`** after build.
8. [`pre-final-self-check.md`](commands/pre-final-self-check.md) → [`finalize-layout-task.md`](commands/finalize-layout-task.md) → [`validate-all-directives.md`](commands/validate-all-directives.md).
9. If any file under `.cursor/` changed: [`sync-cursor-bilingual-structure.md`](commands/sync-cursor-bilingual-structure.md) and mirror updates in [`docs/cursor-ru/`](../docs/cursor-ru/).

Output: explicit **`pass|fail|not_applicable`** for each applicable gate, with command/file evidence.

## 4) Rules vs skills vs hooks

- **Rules** (`rules/*.RULE.md`, many `alwaysApply`): binding policies — canonical depth and verification. To add or extend them with correct placement, follow [`commands/add-rule.md`](commands/add-rule.md).
- **Commands** (`commands/*.md`): procedural gates, task sequencing, and slash-command text — **not** long policy copies.
- **Skills** (`skills/**/SKILL.md`): optional depth — **open explicitly** when relevant; not loaded by default.
- **Hooks** ([`hooks.json`](hooks.json)): currently empty; no automatic enforcement at edit time.

### Commands vs rules linking

- **Rules own policy** — full requirements and how to verify them.
- **Commands own procedure** — step order, decision gates, calls to other commands; link to rules instead of duplicating policy bullets.
- **Command step format:** one **anchor line** (what to check at this step) + markdown link to the rule (`../rules/<topic>.RULE.md` from `commands/`).
- **Keep inline** only what is **task-specific** (framework decision gate, class-order memo, report/output format, repo commands such as `npm run normalize:svg-layout`).
- **Russian mirror:** same steps; link to `docs/cursor-ru/rules/<topic>.md` (no `.RULE` suffix, no `.cursor/` paths for human reading).

### Skills vs rules linking

- **Skills** (`skills/**/SKILL.md`) are optional depth — opened explicitly; they **supplement** commands and rules, not replace them.
- **Skill body format:** workflow steps + **link + anchor** to the owning rule (`../../rules/<topic>.RULE.md` from `skills/<name>/`); link to a **command** when the skill mirrors a gated procedure (e.g. page scaffold → `commands/new-page.md`).
- **Do not** duplicate full policy lists in skills; `alwaysApply` rules remain canonical even when a skill is open.
- **Russian mirror:** same structure; links to `../../rules/<topic>.md` from `docs/cursor-ru/skills/<name>/`.

## 5) Supplementary / historical

- [`README.md`](README.md) — entry point and session flow (stack + fidelity: §1.1–1.2 here only).
- [`agent-topology.md`](agent-topology.md) — optional role mental model; enforcement is rules + commands above.

## 6) Russian mirror (human only)

Keep in lockstep: **[`docs/cursor-ru/WORKFLOW.md`](../docs/cursor-ru/WORKFLOW.md)** whenever this file changes. Not loaded as Cursor rules; no `alwaysApply` in `docs/cursor-ru/`.
