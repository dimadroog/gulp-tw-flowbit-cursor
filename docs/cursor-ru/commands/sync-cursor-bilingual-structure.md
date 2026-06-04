# sync-cursor-bilingual-structure (справка)

> Перевод для человека. **Процедура для агента:** [`.cursor/commands/sync-cursor-bilingual-structure.md`](../../.cursor/commands/sync-cursor-bilingual-structure.md).

- `.cursor/` — английский источник (enforce).
- `docs/cursor-ru/` — русское зеркало для чтения (не Cursor rules).
- При изменении структуры в `.cursor/` — синхронно править `docs/cursor-ru/` (те же относительные пути; `rules/*.RULE.md` → `rules/*.md` без frontmatter `alwaysApply`).
- Не восстанавливать каталог `.cursor/_RU/`.
