---
description: Enforce English source in .cursor and synchronized Russian mirror in .cursor/_RU for every structure change.
alwaysApply: true
---

# Cursor Bilingual Sync Policy

- Keep all source guidance files in `.cursor/` in English.
- Maintain a Russian mirror for the same files in `.cursor/_RU/`.
- When adding new files/folders/content under `.cursor/`, always add translated counterparts under `.cursor/_RU/`.
- Keep updates and removals mirrored manually between `.cursor/` and `.cursor/_RU/`.
- Do not recursively mirror `.cursor/_RU/` into `.cursor/_RU/_RU/`.
- Preserve metadata keys and commonly accepted technical terms in English when translation is not appropriate.

## Required action

- Always duplicate new `.cursor/` data into `.cursor/_RU/` with Russian translation.
- Never create or update nested `_RU` mirrors inside `.cursor/_RU/`.
