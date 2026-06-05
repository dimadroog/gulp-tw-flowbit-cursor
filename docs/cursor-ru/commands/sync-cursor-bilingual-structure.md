# sync-cursor-bilingual-structure (справка)

> Перевод для человека. **Процедура для агента:** [`.cursor/commands/sync-cursor-bilingual-structure.md`](../../../.cursor/commands/sync-cursor-bilingual-structure.md).

- `.cursor/` — английский источник (enforce).
- `docs/cursor-ru/` — русское зеркало для чтения (не Cursor rules).
- При изменении структуры в `.cursor/` — синхронно править `docs/cursor-ru/` (те же относительные пути; `rules/*.RULE.md` → `rules/*.md` без frontmatter `alwaysApply`).
- **Ссылки на rules в зеркале commands:** `../rules/<имя>.RULE.md` → `../rules/<имя>.md`.
- **RU commands для чтения** не ссылаются на `.cursor/` для policy (используй `../rules/*.md`). Исключение: краткие пометки «enforce для агента» в справочных файлах вроде этого.
- Проверяй глубину путей: из `docs/cursor-ru/commands/` достаточно `../rules/`, не `../../../.cursor/`.
- Не класть русские переводы и зеркало в `.cursor/`.
