# sync-cursor-bilingual-structure

Keep `.cursor/` English-first and maintain a Russian mirror in `.cursor/_RU/`.

## Scope

- Applies whenever files or folders are added, removed, renamed, or updated inside `.cursor/`.
- Mirror target is `.cursor/_RU/` (excluding recursive duplication of `.cursor/_RU/_RU/`).

## Mandatory actions on each structure change

1. Update the source file in `.cursor/` using English content.
2. Create or update the mirrored file in `.cursor/_RU/` with Russian content.
3. Keep directory structure and filenames aligned between source and mirror.
4. Preserve metadata keys, frontmatter fields, and widely accepted technical terms in English where translation is inappropriate.
5. If a source file is removed, remove its mirror file as well.

## Manual workflow (no hooks)

1. Add or update content in `.cursor/` first.
2. Immediately add the translated counterpart in `.cursor/_RU/` using the same relative path.
3. If a file is renamed or moved in `.cursor/`, apply the same rename/move in `.cursor/_RU/`.
4. If a file is deleted in `.cursor/`, delete the corresponding file in `.cursor/_RU/`.
5. Never create nested mirrors inside `.cursor/_RU/` (no `.cursor/_RU/_RU/`).

## Translation guidance

- Translate instructional body text.
- Do not translate metadata field keys (`description`, `alwaysApply`, `name`, etc.).
- Keep acronyms and standard technical terms in English when they are clearer unlocalized (`ARIA`, `W3C`, `Tailwind`, `Nunjucks`, `TODO`).

## Verification checklist

- `.cursor/` contains only English documentation/instructions.
- `.cursor/_RU/` contains a complete Russian mirror of `.cursor/` content (except the `_RU` subtree itself).
- No structure drift between source and mirror.
- No automatic sync hook is expected; synchronization is maintained manually.
