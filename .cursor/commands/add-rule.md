# add-rule

Use this slash command **when requesting a new or updated governed convention** for this repository’s agent workflow (`rules/*.RULE.md`) or coordinated edits to orchestration docs (`commands/*.md`, `WORKFLOW.md`).

Canonical map: [`WORKFLOW.md`](../WORKFLOW.md) (**§4** rules vs commands vs skills).

---

## Obligations (fail-fast)

1. **Understand the scaffold** — read [`WORKFLOW.md`](../WORKFLOW.md) once per invocation (lifecycle table, §4 taxonomy, bilingual rule for `.cursor/`).
2. **Scan existing policy** — list `rules/*.RULE.md` and skim [`rules/workflow-orchestrator.RULE.md`](../rules/workflow-orchestrator.RULE.md) / [`commands/run-layout-task.md`](run-layout-task.md) **before** proposing placement so additions stay navigable (one topic per rule; avoid duplicated stack or gate lists unless `WORKFLOW` is explicitly being updated).
3. **Normalize the user’s ask** — restate their requirement as a **single actionable policy**:
   - who it applies to (agent vs tooling),
   - when it triggers (always, task type, file scope),
   - what is forbidden/required + **verification** (“how to tell it’s done”).
4. **Ambiguity barrier** — if scope, applicability, severity (blocking vs recommended), or target files are unclear, ask **minimal** clarifying questions and **pause writes** until resolved.
5. **Placement**
   - **Prefer merge** — if an existing `.RULE.md` already owns the topic, add a concise bullet or subsection there; shorten duplicates elsewhere if this clarifies hierarchy.
   - **Prefer new rule** — if the topic is new, conflicts with another policy’s framing, or would push an existing rule over **~500 lines**, create `rules/<kebab-topic>.RULE.md` with YAML frontmatter matching siblings (`description`, `alwaysApply`, optional `globs` if Cursor supports it — follow patterns in neighboring rules).
6. **Orchestration deltas** — if the requirement changes **gate chains**, task taxonomy, or `npm`/QA steps, edit the **canonical** location first ([`WORKFLOW.md`](../WORKFLOW.md)), then propagate to [`commands/run-layout-task.md`](run-layout-task.md) or other referenced commands instead of burying lone bullets in unrelated rules.
7. **Naming & discoverability**
   - Rule files stay `*.RULE.md` in `rules/`.
   - File name = durable topic slug (kebab-case), not a sprint or ticket ID.
   - One-line `description:` in frontmatter must read like search hits for future sessions.
8. **Bilingual lockstep** — any change under `.cursor/` requires **`sync-cursor-bilingual-structure`**: mirror to [`.cursor/_RU/`](../_RU/) immediately (English source, Russian mirror; §6 of `WORKFLOW`).

---

## Deliverable format (report)

Return a compact report:

| Item | Notes |
|------|--------|
| Requirement (final) | The agreed policy wording in one paragraph |
| Placement | Merge target(s) vs new rule filename(s); if `WORKFLOW` / orchestration touched, say so |
| Files changed | List with one-line rationale each |
| Open questions | None, or residual items for the user |

Do not declare completion until mirror sync status is explicitly stated (**done / N/A**) and file list is complete.
