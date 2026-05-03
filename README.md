# A Starter Gulp Template

## How to use

- clone this repo
- type `$ npm install ` for install plugins
- type `$ npm run gulp ` for run

## UI interaction stack

- Tailwind CSS is the styling baseline.
- Flowbite is the default interactive UI library (modal, accordion, collapse, offcanvas, dropdown, tabs, tooltip).
- Flowbite JS is shipped from `dist/lib/node_modules/flowbite/dist/flowbite.min.js` and loaded in the main Nunjucks layout.

## Interaction policy

- Use Flowbite data attributes/API first.
- Use the project scrollspy helper (`data-scrollspy-nav`) for in-page active section tracking.
- Add searchable/custom select plugin only for pages where searchable select is required.
