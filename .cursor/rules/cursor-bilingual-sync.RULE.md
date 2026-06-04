---
description: English source in .cursor; Russian human mirror in docs/cursor-ru (not agent rules).
alwaysApply: true
---

# Cursor Bilingual Sync Policy

- Keep all source guidance for agents in `.cursor/` in English only.
- Maintain a Russian **human-readable** mirror in `docs/cursor-ru/` with the same relative paths where applicable.
- When adding or changing files under `.cursor/`, update the translated counterpart under `docs/cursor-ru/` (manual sync).
- Mirror files must **not** use `*.RULE.md` or `alwaysApply` — they are not Cursor project rules.
- Do not place Russian mirrors inside `.cursor/` (no `.cursor/_RU/`).
- Preserve metadata keys and widely accepted technical terms in English in `.cursor/` rule frontmatter.

## Agent scope

- Apply orchestration and policies from `.cursor/` only.
- Treat `docs/cursor-ru/` as human documentation unless the user explicitly `@`-mentions a file there.

## Required action on `.cursor/` changes

- After editing `.cursor/`, update the matching path under `docs/cursor-ru/` with Russian content.
- On rename/delete in `.cursor/`, mirror the same under `docs/cursor-ru/`.
- Run `commands/sync-cursor-bilingual-structure.md` when `.cursor/` structure changes.
