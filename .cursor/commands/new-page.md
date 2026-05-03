# new-page

Create a new page scaffold using current project conventions.

## Inputs

- Page goal and route
- Key sections from layout
- SEO/meta requirements

## Steps

1. Create page template with required semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`) and a single page-level `h1`.
2. Set document shell defaults: `<html lang="ru">` (unless another locale is explicitly required) and `<meta name="viewport" content="width=device-width, initial-scale=1">`.
3. Add minimal head/meta structure aligned with page purpose, including placeholders when SEO content is unknown:
   - `<meta name="description" content="description">`
   - `<meta name="keywords" content="keywords">`
4. Set `<title>` to match the page name used in `app/index.html` page registry.
5. If visual `h1` is missing in the layout, add a visually-hidden but accessible `h1`.
6. Use `section`/`article` only with meaningful internal headings (`h2`/`h3` where appropriate).
7. Split sections into includes/partials instead of large inline markup.
8. For image slots, plan responsive delivery (`picture`/`srcset`) and set intentional `loading` attributes.
9. Ensure every planned `img` has a valid `alt` strategy (descriptive text or empty `alt=""` for decorative use).
10. Plan webfont strategy: self-hosted delivery (unless system-font-only), `WOFF/WOFF2` formats, and only required families/weights.
11. Ensure custom font declarations use `font-display: swap`.
12. Perform a content resilience check using longer text and images with different aspect ratios.
13. Document assumptions for later a11y and interaction checks.

## Done

- New page is scaffolded and ready for section implementation.
- Repeated blocks are prepared for loop/macro extraction.
- Semantic landmarks and heading hierarchy are explicitly valid.
- Document shell defaults are valid (`lang`, `viewport`, placeholder meta tags).
- Baseline layout resilience is confirmed for variable text length and image proportions.
- Image strategy is documented for responsive sources and valid `alt` usage.
- Font strategy is documented (formats, hosting, used variants, `font-display`).
- `<title>` matches the registered page name in `app/index.html`.
