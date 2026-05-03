---
description: Framework-first JavaScript policy and custom JS minimization.
alwaysApply: true
---

# JavaScript Minimalism Policy

- Default interaction library for this project: `Flowbite` (MIT, open-source).
- Before writing custom JS, check whether the required pattern exists in the chosen framework/library API.
- For accordion, modal, offcanvas, tabs, dropdown, and similar patterns, use framework-native components first.
- Add custom JS only when framework capabilities are clearly insufficient.

## Flowbite-First Coverage

- Use Flowbite data attributes/API as the default for: modal, collapse, accordion, drawer/offcanvas, dropdown, tabs, tooltip.
- Keep custom wrappers/helpers small and reusable instead of page-local one-off scripts.

## Gaps Policy

- `scrollspy`: use the internal IntersectionObserver helper with `data-scrollspy-nav` before considering third-party add-ons.
- Searchable/custom select: do not add a global select library by default.
- Add a lightweight select plugin only for pages/features where searchable select is a hard requirement.
- When introducing such plugin, scope initialization by selector and document the reason.

## JS Hook Class Convention

- Classes used as JavaScript selectors must use the `js-` prefix.
- Treat `js-*` classes as behavior hooks only, not visual styling hooks.
- Do not define CSS selectors for `js-*` classes in stylesheet files.

## Decision Gate

1. Identify required interaction.
2. Confirm matching framework component or plugin.
3. Implement with framework API by default.
4. If custom JS is necessary, record why framework behavior is insufficient.
