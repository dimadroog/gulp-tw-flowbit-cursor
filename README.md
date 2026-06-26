# A Starter Gulp Template

## How to use

- clone this repo
- type `$ npm install ` for install plugins
- type `$ npm run gulp ` for run

## UI interaction stack

- Tailwind CSS 4 is the styling baseline (`app/css/style.css`, `@tailwindcss/postcss`).
- Preline (`@preline/*`, MIT) is the default interactive UI library — modal/drawer (`overlay`), dropdown, tabs, carousel, select, file-upload, and others as needed.
- Preline modules are **not** bundled by default. Add them incrementally via [`.cursor/commands/add-preline-module.md`](.cursor/commands/add-preline-module.md).
- Synced vendor JS lives under `app/lib/preline/` (gitignored) and is copied to `dist/lib/preline/` on build.

## Interaction policy

- Use Preline `data-hs-*` / `hs-*` markup and auto-init before custom JS.
- Keep bespoke behavior minimal.
