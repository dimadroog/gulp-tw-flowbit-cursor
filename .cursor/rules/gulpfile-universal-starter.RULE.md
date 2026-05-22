---
description: Keep root gulpfile.js a universal layout starter — no per-project mock data or one-off task wiring without explicit brief.
alwaysApply: true
---

# Gulpfile Universal Starter

- Treat [`gulpfile.js`](gulpfile.js) as a **reusable starter** for every new layout project cloned from this scaffold, not as a project-specific build script.
- Change `gulpfile.js` only when the edit benefits **all** starters (bugfix, standard task path, shared vendor sync) or when the task brief **explicitly** requires a gulp change.
- **Do not** add without explicit brief:
  - `require()` of project JSON/JS for domain or mock content;
  - `manageEnv` / `addGlobal` for site fixtures (rubrics, articles, navigation data);
  - one-off gulp tasks tied to a single client site or sprint.
- Put project-specific configuration in `app/`, `tailwind.config.js`, `postcss.config.js`, and `package.json` scripts — not in `gulpfile.js`.
- Nunjucks mock/fixture data belongs in consuming `.njk` files — see [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Fixture and mock data.
- **Verification:** `gulpfile.js` diff for a layout task does not introduce domain `require`/`addGlobal`; `npm run build` still succeeds after reverting project-only gulp edits.
