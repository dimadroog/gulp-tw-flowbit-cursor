# hooks.json (справка)

Канонический файл: [`.cursor/hooks.json`](../../.cursor/hooks.json).

Подключены `afterFileEdit` хуки:

- `remind-qa-after-layout-edit.mjs` — напоминание про `npm run qa` после правок `app/**/*.{njk,css,js,html}`.
- `remind-cursor-mirror.mjs` — напоминание про sync `docs/cursor-ru/` и `npm run check:cursor-mirror` после правок `.cursor/`.

Зеркало не используется агентом.
