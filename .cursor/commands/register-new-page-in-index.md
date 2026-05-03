# register-new-page-in-index

After creating any new layout page, add a link to it in `app/index.html`.

## Source of truth

- Page registry file: `app/index.html`
- Link block: list inside `<ul class="fs-18">`

## Task

1. Locate the page list in `app/index.html`.
2. Add a new `<li>` with a link to the created page.
3. Keep the link format consistent:
   - text: readable page name
   - filename in parentheses, for example `(new-page.html)`
4. Ensure `href` matches the actual HTML filename.
5. Ensure the target page `<title>` matches the page name used in this index entry.
6. Do not remove or rename existing list items without an explicit request.

## Item format

```html
<li>
    <a href="new-page.html">Page Name (new-page.html)</a>
</li>
```

## Pre-completion checks

- `app/index.html` contains the new page link.
- Filename in `href` matches filename in link text.
- Page `<title>` matches the registered page name in `app/index.html`.
- List markup syntax remains valid (`<ul>/<li>/<a>`).

## Acceptance criterion

- Every new project page is registered in `app/index.html` within the same task.
