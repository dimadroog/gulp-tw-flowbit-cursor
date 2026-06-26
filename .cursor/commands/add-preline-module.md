# add-preline-module

Wire an incremental `@preline/*` module into this starter. Do **not** add modules preemptively — only when the layout task requires the interaction.

## Inputs

- Target module name (e.g. `dropdown`, `overlay`, `tabs`)
- Markup/features that need the module

## Steps

1. **npm** — install the package (+ peer deps when required):

   ```bash
   npm i @preline/dropdown
   # select: npm i @preline/select lodash
   # file-upload: npm i @preline/file-upload dropzone
   ```

2. **CSS** — in [`app/css/style.css`](../../app/css/style.css), add **before** section imports:

   ```css
   @source "../../node_modules/@preline/dropdown/*.js";
   @import "../../node_modules/@preline/dropdown/variants.css";
   ```

   Import **`variants.css` only** — never `theme.css` (conflicts with project tokens in `tailwind.config.js`).

3. **Gulp vendor sync** — add an entry to `vendorLibs` in [`gulpfile.js`](../../gulpfile.js):

   ```javascript
   {
     src: "./node_modules/@preline/dropdown/index.js",
     dest: "app/lib/preline/",
     rename: "dropdown.js",
   },
   ```

   Optional `patch` for `@preline/carousel` touch passive fix (see studiobit-layout reference).

4. **Layout scripts** — in [`app/njk-layouts/_main.njk`](../../app/njk-layouts/_main.njk), inside `{% block scripts %}` or before page JS:

   ```html
   <script src="lib/preline/dropdown.js"></script>
   ```

   **Script order (when multiple modules):**

   | Load before | Depends on |
   |-------------|------------|
   | `select.js` | `lodash.js` |
   | `file-upload.js` | `dropzone.js` |
   | Page glue JS | All required `lib/preline/*.js` |

5. **Markup + styles** — use Preline `hs-*` classes and `data-hs-*` attributes; style open/active states with imported variants (`hs-dropdown-open:`, `hs-overlay-open:`, `hs-select-opened:`, etc.) in section CSS or `components.css`.

6. Run `npm run build` and confirm `dist/lib/preline/<module>.js` exists.

## Done

- Module appears in `package.json`, `style.css` (`@source` + `variants.css`), `vendorLibs`, layout scripts, and task markup.
- `npm run qa` passes.
