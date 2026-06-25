# Hyunsoo Lee Portfolio

Personal GitHub Pages site for `ahyunsoo3.github.io`.

The site is intentionally static: plain HTML, CSS, and vanilla JavaScript — no build step, no framework. GitHub Pages serves files directly (`.nojekyll` disables Jekyll processing).

## Site map

| Page | Purpose | Shell |
|------|---------|-------|
| `index.html` | About / portfolio landing | Shared |
| `project.html` | Technical deep-dive (Build tab) | **Legacy** — see below |
| `ai.html` | AI integration showcase | Shared |
| `growth.html` | Growth & marketing metrics | Shared |
| `blog.html` | Essay index | Shared |
| `blog-post.html?slug=…` | Single essay viewer | Shared |
| `spec.html` + `spec-*.html` | Blueprint technical specification | Shared + sidebar |
| `resume-en.html`, `resume-ko.html` | Printable resumes | Standalone |

**Shared shell** (most pages): `components.js` injects the header, `i18n.js` handles EN/KR, `main.css` styles everything.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Blog pages load essays via `fetch`, so use the local server rather than opening HTML files directly (`file://`).

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  HTML page (data-page="<key>" on <body>)                │
├─────────────────────────────────────────────────────────┤
│  components.js  →  site header + nav tabs (sync inject) │
│  spec-nav.js    →  Blueprint sidebar (spec pages only)  │
│  i18n.js        →  EN/KR text swap + page meta          │
│  blog.js        →  essay list / Markdown viewer          │
│  main.css       →  all shared styles (incl. spec layout)│
└─────────────────────────────────────────────────────────┘
```

### Shared header (`components.js`)

Runs synchronously as the first `<script>` inside `<body>` so the header appears before page content (no layout flash).

Each page sets `data-page` on `<body>` to control the active nav tab:

| `data-page` value | Active tab |
|-------------------|------------|
| `index` | About |
| `project` | Build |
| `ai` | AI Engine |
| `growth` | Marketing |
| `blog` | Blog |
| `spec` | Blueprint (also matches `spec-arch`, `spec-modules`, etc.) |

Valid keys are documented in the file header comment.

### Internationalization (`i18n.js`)

Replaces the older `language.js` and `project-lang.js` pattern on modern pages.

**How it works:**

1. On load, a `TreeWalker` collects text nodes whose normalized content matches a key in the `KO` dictionary.
2. Clicking EN/KR buttons swaps `nodeValue` in place — no DOM re-render.
3. `META` provides per-page `<title>` and `<meta name="description">` for each language.
4. Preference persists in `localStorage` (`portfolio-lang`, legacy alias `hl_lang`).
5. Default language: Korean if browser locale or timezone is `Asia/Seoul`, otherwise English.

**Adding translations for new copy:**

1. Write English text in the HTML (exact string, including whitespace normalization).
2. Add a matching key → Korean value in the `KO` object in `i18n.js`.
3. If the page is new, add a `META` entry keyed by filename (without `.html`).
4. For dynamically injected content (blog cards, error messages), call `window.portfolioRefreshI18n()` after DOM updates — `blog.js` already does this.

Nav tab labels (`About`, `Build`, etc.) intentionally stay in English in KR mode.

### Legacy `project.html`

`project.html` predates the shared shell. It still uses:

- Inline `<header>` (duplicated nav markup)
- `styles.css` + `project.css` instead of `main.css`
- `project-lang.js` instead of `i18n.js`

The Blog tab appears in the nav but `project-lang.js` has no Blog-related keys (tabs remain English). Migrating `project.html` to the shared shell is the recommended long-term fix.

### Blueprint specification (`spec-*.html`)

Technical reference docs for the Missroot TOEFL product. Entry point: `spec.html`.

| File | Topic |
|------|-------|
| `spec-arch.html` | System architecture & layer topology |
| `spec-modules.html` | 14 Flutter feature modules |
| `spec-backend.html` | 9 Supabase Edge Functions |
| `spec-ai.html` | AI pipeline, providers, credit/retry logic |
| `spec-billing.html` | Billing flow, tiers, store packs |
| `spec-db.html` | Database schema & key tables |
| `spec-packages.html` | Shared packages (`core_ui`, `core_network`, `core_billing`) |

Each spec page loads `components.js` then `spec-nav.js` (sidebar injection, collapse, mobile drawer, active-state highlighting). Styles live in `main.css` (the standalone `spec.css` file is retained for reference but not linked).

## Blog

Essays are static Markdown files managed in the repo (no CMS or build step).

### Publishing an essay

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

### Renderer pipeline (`blog.js`)

| Step | What happens |
|------|--------------|
| Manifest fetch | `blog/posts.json` loaded; posts with `published !== false` sorted by date descending |
| Post fetch | `blog/posts/{slug}.md` fetched by slug from query string |
| Normalize | Strips leading `# Title` if it duplicates `posts.json` title; removes BOM |
| Parse | [marked](https://marked.js.org/) with GFM enabled (`blog-post.html` loads marked from CDN) |
| Enhance | `enhanceProseHtml()` wraps tables, styles verdict lines and result blocks |
| i18n refresh | `portfolioRefreshI18n()` re-scans for translatable strings in injected HTML |

### Essay formatting

Essays render as Markdown (GFM) inside `.blog-prose`. Conventions for readable, consistent posts:

- **No `#` H1 in the markdown file** — the title comes from `posts.json` and renders as the page heading.
- **Verdict lines** — end a section with `→ Label.` (e.g. `→ Functional.`) for auto-styled conclusion badges (`.blog-verdict`).
- **Result blocks** — `**Result: …**` paragraphs become `.blog-result` styled blocks.
- **Code examples** — combine command and output in one fenced block; prefix shell commands with `$`.
- **Paper claims** — use `>` blockquotes for quoted claims from the paper.
- **Comparisons** — use GFM tables; they are wrapped in `.blog-table-wrap` for horizontal scroll.
- **Section breaks** — use `---` for horizontal rules between major subsections.

## Scripts

### `scripts/supabase-public-schema-stats.sh`

Prints table and column counts for the `public` schema. Requires a linked Supabase project or local DB.

```bash
EDU_ENG=/path/to/edu-eng ./scripts/supabase-public-schema-stats.sh
./scripts/supabase-public-schema-stats.sh /path/to/edu-eng --local
```

Use this when updating Blueprint database stats on spec pages.

## Adding a new page

1. Create `newpage.html` with standard head links (`main.css`, Inter font).
2. Set `<body data-page="newpage">` (add the key to `components.js` if it needs a nav tab).
3. Add `<script src="components.js"></script>` as the first body script.
4. Add `<script src="i18n.js"></script>` before `</body>`.
5. Add all visible English strings to `KO` in `i18n.js`.
6. Add a `META` entry in `i18n.js` for title/description.
7. If the page has a nav tab, add a `tab()` call in `components.js`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Blog shows "Could not load essays" | Opened via `file://` or `posts.json` missing | Use `python3 -m http.server`; verify manifest path |
| Essay body blank, renderer error | marked CDN blocked or failed | Check network; `blog-post.html` requires marked |
| Korean text missing on new copy | String not in `KO` dictionary | Add exact normalized English key to `i18n.js` |
| Korean missing after blog loads | Dynamic HTML inserted after i18n init | Ensure `portfolioRefreshI18n()` runs post-render |
| Spec sidebar not visible | `spec-nav.js` not loaded or no `.site-header` | Load `components.js` before `spec-nav.js` |
| `project.html` styles differ | Legacy CSS stack | Expected; migrate to `main.css` + shared shell |
| Language resets unexpectedly | Both `portfolio-lang` and `hl_lang` checked | Either key works; `portfolio-lang` is canonical |

## Deployment

Push to `main`. GitHub Pages serves the repo root directly. No CI or build artifacts required.
