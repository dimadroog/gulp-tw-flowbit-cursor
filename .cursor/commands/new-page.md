# new-page

Create a new page scaffold using current project conventions.

## Inputs

- Page goal and route
- Key sections from layout
- SEO/meta requirements

## Steps

1. Semantic landmarks, single page-level `h1`, and section structure — [`rules/html-nunjucks-conventions.RULE.md`](../rules/html-nunjucks-conventions.RULE.md); landmarks and heading hierarchy — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
2. Document shell: `<html lang="ru">` (unless another locale is required) and `<meta name="viewport" content="width=device-width, initial-scale=1">`.
3. Head/meta placeholders when SEO content is unknown:
   - `<meta name="description" content="description">`
   - `<meta name="keywords" content="keywords">`
4. Set `<title>` to match the page name used in `app/index.html` page registry.
5. If visual `h1` is missing in the layout, add a visually-hidden but accessible `h1`.
6. Split sections into includes/partials instead of large inline markup.
7. Plan image slots — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
8. Plan valid `alt` for every `img` — [`rules/accessibility-and-w3c.RULE.md`](../rules/accessibility-and-w3c.RULE.md).
9. Webfont strategy (self-hosted, `WOFF`/`WOFF2`, used families/weights, `font-display: swap`) — [`rules/architecture-and-delivery-policy.RULE.md`](../rules/architecture-and-delivery-policy.RULE.md).
10. Content resilience check (longer text, varied image aspect ratios) — [`rules/image-delivery-and-optimization.RULE.md`](../rules/image-delivery-and-optimization.RULE.md).
11. Note assumptions for later interactive work; plan [`a11y-checklist.md`](a11y-checklist.md) when controls are added.

## Done

- New page is scaffolded and ready for section implementation.
- Repeated blocks are prepared for loop/macro extraction.
- Semantic landmarks and heading hierarchy are explicitly valid.
- Document shell defaults are valid (`lang`, `viewport`, placeholder meta tags).
- Baseline layout resilience is confirmed for variable text length and image proportions.
- Image, font, and accessibility strategy documented per linked rules above.
- `<title>` matches the registered page name in `app/index.html`.
