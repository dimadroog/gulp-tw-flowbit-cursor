# Workflow map (single entry)

Use this file as the **canonical route** through `.cursor/`. Other docs add detail; this file defines **order, gates, and repo commands**.

## 1) Lifecycle in one pass

| Phase | What to follow | Notes |
|--------|----------------|--------|
| **Governance** | [`commands/add-rule.md`](commands/add-rule.md), [`WORKFLOW.md`](WORKFLOW.md) §1.1–1.2 | Baseline stack and mockup fidelity live in §1.1–1.2; use `add-rule` to capture or merge new governed conventions. |
| **Orchestration** | [`commands/run-layout-task.md`](commands/run-layout-task.md) | **Primary** driver for day-to-day work (hard-mode gates); task-type recipes (`new-page`, `build-section`, `refactor-to-framework-component`, …) per Orchestration flow in that file. |
| **Policy routing** | [`rules/workflow-orchestrator.RULE.md`](rules/workflow-orchestrator.RULE.md), [`rules/directive-compliance.RULE.md`](rules/directive-compliance.RULE.md) | Orchestration core (`alwaysApply`). |

### 1.1 Implementation defaults (code stack)

Single source for stack choices; do not duplicate this list in [`README.md`](README.md).

- **Tailwind CSS + Flowbite (MIT)** for modal, collapse, accordion, offcanvas, dropdown, tabs, tooltip.
- Prefer **Flowbite data-attribute API** before custom JS; keep bespoke behavior minimal.
- **Scrollspy:** use project helper `data-scrollspy-nav` for in-page section tracking.
- **Searchable / custom select** plugins only on pages that explicitly require them.
- **Images:** delivery, intrinsic sizing, and PageSpeed — [`rules/image-delivery-and-optimization.RULE.md`](rules/image-delivery-and-optimization.RULE.md).

### 1.2 Design fidelity (mockup-driven, blocking)

Applies when the task is driven by an **approved static mockup** (not “inspired by”). **Figma is a mockup source:** Figma-driven tasks are mockup-driven and must satisfy both asset-integrity and pixel-perfect gates where applicable.

| Design source | Mockup-driven? | `validate-figma-assets` | `validate-pixel-perfect` |
|---------------|----------------|-------------------------|--------------------------|
| Approved Figma file / export | yes | **required** | **required** |
| Approved PNG/PDF/static mockup (no Figma) | yes | `not_applicable` | **required** |
| Link or screenshot without explicit approval | no — stop and clarify | `not_applicable` | `not_applicable` |
| No design reference (content/tooling only) | no | `not_applicable` | `not_applicable` |

- **Precondition:** breakpoint baseline and typography contract are fixed **before** implementation (same bar as [`commands/validate-pixel-perfect.md`](commands/validate-pixel-perfect.md)); otherwise stop and clarify.
- **Critical zones** (non-exhaustive): global chrome (header, sidebar, footer), hero and primary CTAs, flagship cards/tiles, checkout-like flows when in scope. In these zones, **visual drift is not acceptable** unless the task brief records an explicit designer/product waiver (one line in the report is enough).
- **Tokens and geometry:** use colors, radii, shadows, and borders from the design export/spec or project token map. Do **not** swap in arbitrary Tailwind utilities that change hue, weight, or shape versus the mockup.
- **No placeholder completion** for fidelity-critical graphics, badges, or states; see [`rules/mockup-driven-no-placeholder-completion.RULE.md`](rules/mockup-driven-no-placeholder-completion.RULE.md).
- **SEO/meta placeholders** (`description`, `keywords`) and visually-hidden `h1` when the layout omits a visible heading are **not** fidelity placeholders — allowed per [`commands/new-page.md`](commands/new-page.md).

## 2) Repo automation (mandatory for HTML output)

Run in the project root after changes that affect templates or assets:

```bash
npm run qa
```

This runs `gulp build`, JS/SCSS lint + Prettier check, and **`npm run validate:html`** (`html-validate`, npm-only, offline). Details: [`commands/validate-html.md`](commands/validate-html.md).

Other tooling:

- `npm run normalize:svg-layout` — after bulk Figma SVG imports under `app/img/layout-shell/` (see [`commands/validate-figma-assets.md`](commands/validate-figma-assets.md)).
- `npm run check:cursor-mirror` — structural parity between `.cursor/` and `docs/cursor-ru/` after governance edits.

**`.cursor` instructions alone do not run checks** — the agent must execute `npm run qa` (or equivalent steps) and record evidence.

## 3) Gate matrix (before “done”)

### Gate status vocabulary

Use **only** `pass | fail | not_applicable` (with reason) for every gate. **`not_run` is forbidden** — treat a missing status for an applicable gate as `fail`.

### Decision table (which gates apply)

Determine path from task shape, then run gates in order below. See [`run-layout-task.md`](commands/run-layout-task.md) for full chains and **light path**.

| Task shape | Task-type command | `performance` | `a11y` | `figma-assets` | `pixel-perfect` | `register-page` | `validate-html` |
|------------|-------------------|-----------------|--------|----------------|-----------------|-----------------|-------------------|
| New page | `new-page` | if page/media | if interactive/landmarks | per §1.2 table | per §1.2 table | **yes** | **yes** |
| Section / block | `build-section` | if section/media | if interactive/landmarks | per §1.2 table | per §1.2 table | no | **yes** |
| Framework refactor | `refactor-to-framework-component` | if JS/CSS/media | if interactive | per §1.2 table | per §1.2 table | no | **yes** |
| Design-system docs | `fill-design-system-documentation` | no | no | no | no | no | if HTML output |
| **Light path** (trivial fix — see `run-layout-task`) | none | no | no | no | no | no | **yes** |

**Final gate (all implementation paths):** [`finalize-layout-task.md`](commands/finalize-layout-task.md) — sections A (self-check), B (gate matrix), C (directive sweep). Legacy names `pre-final-self-check` and `validate-all-directives` redirect to those sections.

**After `.cursor/` edits:** [`sync-cursor-bilingual-structure.md`](commands/sync-cursor-bilingual-structure.md) + `npm run check:cursor-mirror`.

### Ordered checklist

1. Task-type work per table above (or light path).
2. `performance-checklist` — when table marks it applicable.
3. `a11y-checklist` — when table marks it applicable.
4. `validate-figma-assets` — per §1.2 design-source table.
5. `validate-pixel-perfect` — per §1.2 design-source table.
6. `register-new-page-in-index` — when a new page was added.
7. `validate-html` — **`npm run qa`** after build when HTML output changed.
8. **`finalize-layout-task`** (§A → §B → §C).
9. `sync-cursor-bilingual-structure` — when `.cursor/` changed.

Output: explicit **`pass|fail|not_applicable`** for each applicable gate, with command/file evidence.

## 4) Rules vs skills vs hooks

### Rule tiers

- **Orchestration core** (`alwaysApply: true`): `workflow-orchestrator`, `directive-compliance`, `cursor-bilingual-sync`, `task-scope-and-approval`.
- **Subject rules** (`alwaysApply: false` + `globs` or on-demand via commands): load when editing matching paths or when a command links the policy.

To add or extend rules: [`commands/add-rule.md`](commands/add-rule.md).

### Commands, skills, hooks

- **Commands** (`commands/*.md`): procedural gates and task sequencing — **not** long policy copies.
- **Skills** (`skills/**/SKILL.md`): optional **subagent playbooks** — open explicitly for Task/delegation; **do not** duplicate command step lists (link to the owning command).
- **Hooks** ([`hooks.json`](hooks.json)): `afterFileEdit` reminders for `npm run qa` and cursor-mirror sync.

### Commands vs rules linking

- **Rules own policy** — full requirements and how to verify them.
- **Commands own procedure** — step order, decision gates, calls to other commands; link to rules instead of duplicating policy bullets.
- **Command step format:** one **anchor line** + markdown link to the rule (`../rules/<topic>.RULE.md` from `commands/`).
- **Russian mirror:** same steps; link to `docs/cursor-ru/rules/<topic>.md` (no `.RULE` suffix).

### Skills vs commands linking

- **Commands** = mandatory gates and reportable checklists.
- **Skills** = deeper playbooks for delegation (patterns, pitfalls, sub-steps) — **link** to the command, never replace it.
- **Skill body format:** goal + when to delegate + playbook bullets + links to rules/commands.
- **Russian mirror:** same structure under `docs/cursor-ru/skills/<name>/`.

## 5) Supplementary / historical

- [`README.md`](README.md) — entry point and session flow (stack + fidelity: §1.1–1.2 here only).
- [`agent-topology.md`](agent-topology.md) — optional role mental model; enforcement is rules + commands above.

## 6) Russian mirror (human only)

Keep in lockstep: **[`docs/cursor-ru/WORKFLOW.md`](../docs/cursor-ru/WORKFLOW.md)** whenever this file changes. Not loaded as Cursor rules; no `alwaysApply` in `docs/cursor-ru/`.
