# Hyunsoo Lee Portfolio

Personal GitHub Pages portfolio for `ahyunsoo3.github.io`.

The site is **fully static** — plain HTML, CSS, and vanilla JS. There is no build step,
bundler, or CMS. GitHub Pages serves files as-is (`.nojekyll` disables Jekyll processing).

Missroot TOEFL is the flagship project showcased for recruiters and hiring managers.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Pages that `fetch` remote content (blog manifest and essays) require HTTP — do not open
them via `file://`.

## Site architecture

```
index.html          About / portfolio landing
project.html        Build — technical deep-dive (legacy shell)
ai.html             AI Engine — production AI integration
growth.html         Marketing — growth & distribution
blog.html           Blog index (manifest-driven)
blog-post.html      Essay viewer (?slug=…)
spec.html           Blueprint overview
spec-*.html         Blueprint section pages (7 sections)
resume-en.html      Printable English resume (standalone)
resume-ko.html      Printable Korean resume (standalone)
```

### Shared shell (most pages)

Modern pages follow the same pattern:

1. `<body data-page="<key>">` — drives active nav tab in `components.js`
2. `<script src="components.js"></script>` as the **first** body child — injects the site header synchronously (no layout flash)
3. Page content in `<main>`
4. `<script src="i18n.js"></script>` before closing `</body>` — EN/KR translation

Stylesheet: `main.css` (includes blog and Blueprint sidebar styles).

Valid `data-page` keys: `index` | `project` | `ai` | `growth` | `blog` | `spec`

### Legacy exception: `project.html`

`project.html` predates the shared shell. It still uses:

- An **inline** `<header>` (duplicated nav markup)
- `styles.css` + `project.css` instead of `main.css`
- `project-lang.js` instead of `i18n.js`

When editing nav tabs or translations, update **both** the shared files and the legacy
`project.html` / `project-lang.js` pair until `project.html` is migrated.

### Blueprint spec pages

All `spec*.html` pages add a second synchronous script after `components.js`:

```html
<script src="spec-nav.js"></script>
```

`spec-nav.js` injects the collapsible sidebar, marks the active section, and handles
mobile open/close. Spec styles live in `main.css` (the standalone `spec.css` file is unused).

| File | Section |
| --- | --- |
| `spec.html` | Overview & index |
| `spec-arch.html` | 01 — System architecture |
| `spec-modules.html` | 02 — Flutter modules |
| `spec-backend.html` | 03 — Edge functions |
| `spec-ai.html` | 04 — AI pipeline |
| `spec-billing.html` | 05 — Billing architecture |
| `spec-db.html` | 06 — Database schema |
| `spec-packages.html` | 07 — Shared packages |

Resume pages (`resume-*.html`) are self-contained print layouts with inline CSS — no
shared header, i18n, or `components.js`.

## Internationalization (i18n)

`i18n.js` replaces the older `language.js` and `project-lang.js` split.

**How it works**

1. On load, a `TreeWalker` scans text nodes in `<body>`.
2. Normalized text that exactly matches a key in the `KO` dictionary is collected.
3. Clicking EN/KR swaps `nodeValue` in place — no DOM re-render.
4. `META` provides per-page `<title>` and `<meta name="description">` for EN and KO.
5. Preference persists in `localStorage` (`portfolio-lang`, legacy alias `hl_lang`).
6. Default language: KO if browser locale or timezone is Korean; otherwise EN.

**Adding translatable copy**

1. Write visible English text in HTML (or JS template strings).
2. Add an exact-match entry to the `KO` object in `i18n.js`.
3. Header tab labels (`About`, `Build`, etc.) intentionally stay English in KR mode.

**Dynamic content**

Scripts that inject HTML after load must call `window.portfolioRefreshI18n()` so newly
added text nodes are collected and translated. `blog.js` does this after rendering the
essay list and post body.

**Spec / blog-post meta**

`blog-post.html` sets `<title>` and description from `posts.json` at runtime. Only the
list page (`blog.html`) has static meta in `META.blog`.

## Blog — publishing an essay

Essays are static Markdown files managed in the repo (no CMS or build step).

1. Create `blog/posts/{slug}.md` with your essay body (Markdown).
2. Add an entry to `blog/posts.json`:

```json
{
  "slug": "my-essay-slug",
  "title": "Essay Title",
  "date": "2026-06-22",
  "excerpt": "Short summary shown on the blog index.",
  "published": true
}
```

3. Set `"published": false` to hide a draft from the public list.
4. Commit and push to deploy on GitHub Pages.

The blog index is at `blog.html`; each essay opens at `blog-post.html?slug={slug}`.

**Renderer pipeline** (`blog.js`)

- Manifest: `blog/posts.json` — sorted by `date` descending; drafts filtered by `published !== false`.
- Markdown: loaded from `blog/posts/{slug}.md`, parsed with [marked](https://marked.js.org/) (CDN on `blog-post.html` only).
- `normalizeMarkdown()` strips a leading `# Title` if it duplicates `posts.json` title.
- `enhanceProseHtml()` post-processes parsed HTML for blog-specific styling (see below).
- Errors surface as inline messages; missing slug or draft shows "Essay not found."

### Essay formatting

Essays render as Markdown (GFM) inside `.blog-prose`. Conventions for readable, consistent posts:

- **No `#` H1 in the markdown file** — the title comes from `posts.json` and renders as the page heading.
- **Verdict lines** — end a section with `→ Label.` (e.g. `→ Functional.`) for auto-styled conclusion badges.
- **Result lines** — `**Result: summary text.**` renders as a highlighted result block.
- **Code examples** — combine command and output in one fenced block; prefix shell commands with `$`.
- **Paper claims** — use `>` blockquotes for quoted claims from the paper.
- **Comparisons** — use GFM tables; `enhanceProseHtml()` wraps them for horizontal scroll on small screens.
- **Section breaks** — use `---` for horizontal rules between major subsections.

## Scripts

### `scripts/supabase-public-schema-stats.sh`

Prints table and column counts for the `public` schema of a linked Supabase project.
Useful when updating Blueprint database docs (`spec-db.html`).

```bash
EDU_ENG=/path/to/edu-eng ./scripts/supabase-public-schema-stats.sh
./scripts/supabase-public-schema-stats.sh /path/to/edu-eng --local
```

Requires the Supabase CLI with a linked project (`supabase link`) or local DB (`supabase start`).

## Adding a new page — checklist

1. Create `{page}.html` with standard `<head>` meta, `main.css`, and fonts.
2. Set `<body data-page="{key}">` and add `components.js` as the first body script.
3. Add a nav tab in `components.js` (`tab()` call) if the page should appear in the header.
4. Add KO strings to `i18n.js` for all visible copy.
5. Add a `META.{key}` entry in `i18n.js` for title and description (EN + KO).
6. If the page is a Blueprint section, also wire the sidebar in `spec-nav.js`.
7. If content is injected by JS, call `portfolioRefreshI18n()` after DOM updates.
8. Preview over HTTP (`python3 -m http.server`), test EN/KR toggle and mobile layout.
9. If adding a legacy-style page, document why it diverges from the shared shell.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Blog list empty / "Could not load essays" | Opened via `file://` or manifest missing | Serve over HTTP; verify `blog/posts.json` is committed |
| Essay body blank, "Could not load essay renderer" | `marked` CDN blocked or offline | Check network; `marked` loads only on `blog-post.html` |
| Korean text missing on blog cards | i18n ran before `blog.js` rendered | Ensure `blog.js` calls `portfolioRefreshI18n()` (already built in) |
| Nav tab not highlighted | Wrong `data-page` value | Match a key in `components.js` (`spec` covers all `spec-*.html`) |
| Translation not applied | Text doesn't exactly match `KO` key | Whitespace is normalized; key must match visible English string |
| Spec sidebar missing | `spec-nav.js` not loaded or no `.site-header` | Load `components.js` before `spec-nav.js` |
| `project.html` nav out of sync | Legacy inline header | Update header HTML in `project.html` manually |
| Styles look wrong on `project.html` | Uses `styles.css` + `project.css` | Edit those files, not `main.css`, for project-only rules |
