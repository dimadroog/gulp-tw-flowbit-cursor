# build-section

Build one section from a layout with framework-first interaction policy.

## Inputs

- Section design reference
- Content/data requirements
- Interaction expectations (if any)

## Steps

1. Implement semantic HTML + Tailwind utilities for baseline layout.
2. Check whether the interaction maps to an existing framework component.
3. If yes, implement framework API behavior.
4. If no, add minimal custom JS and document why framework support is insufficient.
5. Refactor repeated elements into Nunjucks loops/partials.
6. Use `js-*` classes for JS selectors only, keep them after visual classes in `class` attributes, and do not style them in CSS.
7. Optimize media and section structure for loading speed (right formats, source sizes close to rendered sizes, no redundant wrappers).
8. Use `picture`/`srcset` for responsive images and set meaningful `alt` text (or `alt=""` for decorative images).
9. Enforce Figma asset integrity when design assets are used:
   - vectors are inserted as inline SVG (do not replace with emoji/text placeholders)
   - raster assets are stored in structured local paths under `app/img/`
   - no temporary remote asset URLs remain in final templates
   - no empty/broken `img src` references in built output
10. Keep atomic classes in markup aligned with canonical `prettier-plugin-tailwindcss` sorting.
11. If custom CSS is added, keep property order from layout-critical to local decorative properties.
12. For section-level font usage, ensure only required families/weights are referenced and `font-display: swap` is preserved in custom font declarations.
13. Run a content stress-check: add longer text variants and swap images with different dimensions/aspect ratios.
14. Verify focus states and keyboard behavior for interactive controls.
15. Run `performance-checklist` before marking the section done.

## Class Ordering Memo (short)

- Before: `<button class="js-open text-white hover:bg-blue-700 px-4 bg-blue-600 py-2 rounded">`
- After: `<button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 js-open">`

## Done

- Section is implemented with utility-first styling.
- Decision gate result is explicit: framework component or justified custom JS.
- Performance constraints are explicitly checked and reflected in delivery notes.
- Layout remains stable with content replacements (longer text and image aspect-ratio changes).
- Image delivery is responsive (`picture`/`srcset`) and all `img` elements have valid `alt` usage.
- Font delivery follows policy (`WOFF/WOFF2`, self-hosted when applicable, only used variants, `font-display: swap`).
