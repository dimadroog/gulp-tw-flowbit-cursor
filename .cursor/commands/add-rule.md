# add-rule

Use this slash command **when requesting a new or updated governed convention** for **layout markup projects in general** — the portable policy layer under `.cursor/` (`rules/*.RULE.md`) or coordinated edits to orchestration docs (`commands/*.md`, `WORKFLOW.md`).

This is **not** for one-off notes about the current repository instance (client brief, page content, sprint waivers). The working repo is a copy of the shared `.cursor` pack; rules you add here should remain valid when that pack is copied into another layout project.

Canonical map: [`WORKFLOW.md`](../WORKFLOW.md) (**§4** rules vs commands vs skills). Per-project decisions belong in project docs or the task brief, not in durable rules unless generalized.

---

## Obligations (fail-fast)

1. **Understand the scaffold** — read [`WORKFLOW.md`](../WORKFLOW.md) once per invocation (lifecycle table, §4 taxonomy, bilingual rule for `.cursor/`).
2. **Scan existing policy** — list `rules/*.RULE.md` and skim [`rules/workflow-orchestrator.RULE.md`](../rules/workflow-orchestrator.RULE.md) / [`commands/run-layout-task.md`](run-layout-task.md) **before** proposing placement so additions stay navigable (one topic per rule; avoid duplicated stack or gate lists unless `WORKFLOW` is explicitly being updated).
3. **Normalize the user’s ask** — restate their requirement as a **single actionable policy**:
   - who it applies to (agent vs tooling),
   - when it triggers (always, task type, file scope),
   - what is forbidden/required + **verification** (“how to tell it’s done”).
   - phrase it so it reads sensibly for **another** layout repo using the same `.cursor` pack (no “this site/project/client”).
4. **Portable governance scope** — before writing, confirm the policy belongs in `rules/*.RULE.md`:
   - **In scope:** recurring layout-dev practices (HTML/Nunjucks, Tailwind, Flowbite, gulp/`npm run qa` per `WORKFLOW` §1.1–2), durable paths as **class conventions** (`app/`, `dist/`, `njk-layouts`, layout-shell partials), abstract UI zones (header, hero, flagship card).
   - **Out of scope for rules:** client/brand names, domains, page-specific URLs, one Figma file or one page filename as the norm, sprint/ticket IDs, iteration waivers (“for now on this repo…”).
   - **If the ask is instance-specific:** document in project files (`PROJECT_PROGRESS.md`, design-system, task brief); **do not** add a `.RULE.md`. If the user insists on a rule, generalize the wording and note `redirected` / `generalized` in the report.
5. **Ambiguity barrier** — if scope, applicability, severity (blocking vs recommended), target files, or **portable vs repo-only** intent are unclear, ask **minimal** clarifying questions (e.g. “portable policy for all layout projects, or a one-off note for this repo only?”) and **pause writes** until resolved.
6. **Placement**
   - **Prefer merge** — if an existing `.RULE.md` already owns the topic, add a concise bullet or subsection there; shorten duplicates elsewhere if this clarifies hierarchy.
   - **Prefer new rule** — if the topic is new, conflicts with another policy’s framing, or would push an existing rule over **~500 lines**, create `rules/<kebab-topic>.RULE.md` with YAML frontmatter matching siblings (`description`, `alwaysApply`, optional `globs` if Cursor supports it — follow patterns in neighboring rules).
   - **Commands vs rules** — when editing **commands**, if a bullet already exists in a rule, use **link + short anchor** per [`WORKFLOW.md`](../WORKFLOW.md) §4 (Commands vs rules linking); extend the rule if policy is incomplete. When editing **rules**, do not duplicate gate chains from `WORKFLOW` or `run-layout-task`.
   - **Skills vs rules** — when editing **skills**, same **link + anchor** pattern per §4 (Skills vs rules linking); prefer linking to the relevant command when the skill covers a gated task type.
7. **Orchestration deltas** — if the requirement changes **gate chains**, task taxonomy, or `npm`/QA steps, edit the **canonical** location first ([`WORKFLOW.md`](../WORKFLOW.md)), then propagate to [`commands/run-layout-task.md`](run-layout-task.md) or other referenced commands instead of burying lone bullets in unrelated rules.
8. **Naming & discoverability**
   - Rule files stay `*.RULE.md` in `rules/`.
   - File name = durable topic slug (kebab-case), not a sprint or ticket ID.
   - One-line `description:` in frontmatter must read like search hits for future sessions.
9. **Bilingual lockstep** — any change under `.cursor/` requires **`sync-cursor-bilingual-structure`**: update [`docs/cursor-ru/`](../../docs/cursor-ru/) immediately (English source in `.cursor/`, Russian human mirror; §6 of `WORKFLOW`).

**Anti-pattern (rewrite before merge):**

- Bad: “On `index.njk` the CTA must use `bg-blue-600`.”
- Good: “Primary CTAs in critical zones use the project primary token, not an arbitrary Tailwind hue.”

---

## Deliverable format (report)

Return a compact report:

| Item | Notes |
|------|--------|
| Requirement (final) | The agreed policy wording in one paragraph |
| Portability | `pass` — generalized; `redirected` — moved out of rules; `fail` — instance-specific wording remains |
| Placement | Merge target(s) vs new rule filename(s); if `WORKFLOW` / orchestration touched, say so |
| Files changed | List with one-line rationale each |
| Open questions | None, or residual items for the user |

Do not declare completion until mirror sync status is explicitly stated (**done / N/A**) and file list is complete.
