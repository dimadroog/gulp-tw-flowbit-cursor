# sync-cursor-bilingual-structure

Keep `.cursor/` English-only for agents and maintain a Russian **human** mirror in `docs/cursor-ru/`.

## Scope

- Applies when files or folders are added, removed, renamed, or updated inside `.cursor/`.
- Mirror target is `docs/cursor-ru/` (not inside `.cursor/`).

## Mandatory actions on each `.cursor/` structure change

1. Update the source file in `.cursor/` using English content.
2. Create or update the mirrored file in `docs/cursor-ru/` with Russian content (same relative path; `rules/*.RULE.md` → `rules/*.md` without rule frontmatter).
3. Keep directory structure aligned between `.cursor/` and `docs/cursor-ru/` where a mirror exists.
4. Preserve metadata keys in **English** `.cursor/rules` only; mirror rule files are plain `.md` without `alwaysApply`.
5. If a source file is removed from `.cursor/`, remove its mirror under `docs/cursor-ru/`.

## Manual workflow

1. Add or update content in `.cursor/` first.
2. Add or update the translated counterpart in `docs/cursor-ru/` using the same relative path.
3. On rename/move in `.cursor/`, repeat under `docs/cursor-ru/`.
4. On delete in `.cursor/`, delete the mirror file.
5. Never add Russian content or human mirrors under `.cursor/`.

## Translation guidance

- Translate instructional body text in the mirror.
- Do not copy `alwaysApply` or `.RULE.md` naming into `docs/cursor-ru/rules/`.
- Keep acronyms and standard technical terms in English when clearer (`ARIA`, `W3C`, `Tailwind`, `Nunjucks`, `TODO`).
- **Rule links in mirrored commands:** rewrite `../rules/<name>.RULE.md` → `../rules/<name>.md` (same relative depth from `docs/cursor-ru/commands/`).
- **Rule links in mirrored skills:** rewrite `../../rules/<name>.RULE.md` → `../../rules/<name>.md` from `docs/cursor-ru/skills/<name>/`.
- **RU commands and skills for human reading** must not link into `.cursor/` for policy (use `../rules/*.md` or `../../rules/*.md`). Exception: short “agent enforce” pointers in reference-only files such as this command’s RU counterpart.

## Verification checklist

- `.cursor/` contains only English agent guidance.
- `docs/cursor-ru/` has no `*.RULE.md` and no `alwaysApply` in mirror files.
- No Russian mirror files under `.cursor/`.
- Structure drift between `.cursor/` and `docs/cursor-ru/` is resolved.
- Mirrored command links resolve to `docs/cursor-ru/rules/*.md` or sibling commands — not broken `../../.cursor/` paths from `docs/cursor-ru/commands/`.
- Mirrored skill links resolve to `docs/cursor-ru/rules/*.md` from `docs/cursor-ru/skills/<name>/` — not broken `../../../../.cursor/` paths.
