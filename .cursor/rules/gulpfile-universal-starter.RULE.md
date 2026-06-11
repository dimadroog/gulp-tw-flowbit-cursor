---
description: Keep root gulpfile.js a universal layout starter — no per-project mock data or one-off task wiring without explicit brief.
alwaysApply: true
globs:
  - gulpfile.js
---

# Gulpfile Universal Starter

- Treat [`gulpfile.js`](../../gulpfile.js) as a **reusable starter** for every new layout project cloned from this scaffold, not as a project-specific build script.
- Change `gulpfile.js` only when the edit benefits **all** starters (bugfix, standard task path, shared vendor sync) or when the task brief **explicitly** requires a gulp change.
- **Do not** add without explicit brief:
  - `require()` of **specific** project JSON/JS files for domain or mock content (e.g. `require('./app/shared/rubrics.json')`);
  - `manageEnv` / `addGlobal` for site fixtures (rubrics, articles, navigation data);
  - one-off gulp tasks tied to a single client site or sprint.
- **Allowed in gulpfile** (universal starter infrastructure): `gulp-data` with generic `getTemplateData` that dynamically reads `app/shared/*.json` and co-located `app/<page>.json` — no hardcoded fixture paths or domain keys.
- Put project-specific **content** in `app/*.json`, `app/shared/`, and consuming `.njk` files — not embedded in `gulpfile.js`. Tooling config stays in `tailwind.config.js`, `postcss.config.js`, and `package.json` scripts.
- Nunjucks mock/fixture policy — see [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Fixture and mock data.
- **Verification:** `gulpfile.js` diff does not introduce domain `require` of fixture files or `addGlobal`; `npm run build` still succeeds after reverting project-only gulp edits.
