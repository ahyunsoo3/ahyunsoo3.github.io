# Hyunsoo Lee Portfolio

Static GitHub Pages site for `ahyunsoo3.github.io`. No build step — HTML, CSS, and vanilla JS deploy directly from the repo root.

The site presents **Missroot TOEFL** (EduEng) as the flagship portfolio project for recruiters and hiring managers. Content spans product narrative (`index.html`), technical deep-dives (`project.html`, `ai.html`, `growth.html`), a static blog, and Blueprint reference docs (`spec-*.html`).

## Local preview

Pages that use `fetch` (blog manifest, Markdown essays) require an HTTP server — do not open them via `file://`.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

**Troubleshooting**

| Symptom | Likely cause |
| --- | --- |
| Blog shows "Could not load essays" | Opened via `file://` instead of a local server |
| Essay shows "Could not load essay renderer" | `marked` CDN blocked; check network on `blog-post.html` |
| Korean toggle has no effect on `project.html` | That page still uses legacy `project-lang.js` (see below) |
| Spec sidebar missing | `spec-nav.js` must load immediately after `components.js` in `<body>` |

## Site map

| Page | Role | Shared shell |
| --- | --- | --- |
| `index.html` | About / hero / stack overview | Yes |
| `project.html` | Build tab — monorepo & module deep-dive | **Legacy** (inline header) |
| `ai.html` | AI Engine — providers, scoring, cost control | Yes |
| `growth.html` | Marketing — distribution & campaign data | Yes |
| `blog.html` / `blog-post.html` | Static essay index & viewer | Yes |
| `spec.html` + `spec-*.html` | Blueprint technical reference (7 sections) | Yes + sidebar |
| `resume-en.html` / `resume-ko.html` | Printable resumes (self-contained) | No |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  HTML page                                                  │
│  ├─ <head>  main.css                                        │
│  ├─ <body data-page="…">                                    │
│  │    components.js  → injects site header + nav tabs       │
│  │    spec-nav.js    → (spec pages only) sidebar nav        │
│  │    <main> … page content …                               │
│  │    i18n.js        → EN/KR text swap + meta tags          │
│  │    blog.js        → (blog pages only) manifest + MD      │
└─────────────────────────────────────────────────────────────┘
```

### Stylesheets

`main.css` is the consolidated stylesheet (formerly split across `styles.css`, `project.css`, `ai.css`, and `spec.css`). Most pages link only `main.css`.

**Exception:** `project.html` still loads `styles.css` + `project.css` and has not been migrated to the shared shell.

Legacy files (`styles.css`, `project.css`, `ai.css`, `spec.css`) remain in the repo but are not used by current pages except `project.html`.

### Shared header (`components.js`)

Runs synchronously as the first `<script>` inside `<body>` so the header renders before page content (no layout flash).

Each page sets `data-page` on `<body>` to mark the active nav tab:

| `data-page` value | Tab highlighted |
| --- | --- |
| `index` | About |
| `project` | Build |
| `ai` | AI Engine |
| `growth` | Marketing |
| `blog` | Blog |
| `spec` | Blueprint (also used by all `spec-*.html` pages) |

Contact (`index.html#contact`) is a hash link and never receives an active class.

### Internationalization (`i18n.js`)

Unified EN/KR translation for all pages that load it. Replaces the older `language.js` (removed) and partially overlaps with `project-lang.js` (still used only on `project.html`).

**How it works**

1. On load, a `TreeWalker` collects text nodes whose normalized content matches a key in the `KO` dictionary.
2. Clicking EN/KR buttons swaps `nodeValue` in place — no DOM restructuring.
3. Language preference persists in `localStorage` (`portfolio-lang` / `hl_lang`).
4. Default language: Korean if browser locale or timezone is `Asia/Seoul`, otherwise English.
5. Nav tab labels (`About`, `Build`, …) intentionally stay English in KR mode.

**Adding a translation**

1. Add an entry to the `KO` object in `i18n.js`: `"English source text": "한국어 번역"`.
2. The English string must match the visible text node exactly (whitespace is normalized).
3. For page `<title>` and `<meta description>`, add entries under `META` for the page key (`index`, `project`, `ai`, `growth`, `blog`, `spec`).

**Dynamic content**

`blog.js` calls `window.portfolioRefreshI18n()` after injecting HTML so newly added text nodes are picked up by the walker.

### Blueprint spec docs

`spec.html` is the overview; seven section pages cover Missroot TOEFL architecture:

| File | Topic |
| --- | --- |
| `spec-arch.html` | System architecture & layer topology |
| `spec-modules.html` | 14 Flutter feature modules |
| `spec-backend.html` | 9 Supabase Edge Functions |
| `spec-ai.html` | AI pipeline, providers, credits |
| `spec-billing.html` | Billing flow, tiers, store packs |
| `spec-db.html` | Database schema & RLS |
| `spec-packages.html` | Shared packages (`core_ui`, `core_network`, `core_billing`) |

`spec-nav.js` injects the collapsible sidebar and marks the active section. Load order on spec pages:

```html
<body data-page="spec">
  <script src="components.js"></script>
  <script src="spec-nav.js"></script>
  …
  <script src="i18n.js"></script>
</body>
```

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

**URLs:** index at `blog.html`; each essay at `blog-post.html?slug={slug}`.

`blog.js` loads the manifest from `blog/posts.json`, fetches `blog/posts/{slug}.md`, and renders with [marked](https://marked.js.org/) (loaded from CDN on `blog-post.html` only). Posts sort by `date` descending; entries with `published: false` are excluded.

### Essay formatting

Essays render as Markdown (GFM) inside `.blog-prose`. Conventions for readable, consistent posts:

- **No `#` H1 in the markdown file** — the title comes from `posts.json` and renders as the page heading. A leading H1 matching the title is stripped automatically.
- **Verdict lines** — end a section with `→ Label.` (e.g. `→ Functional.`) for auto-styled conclusion badges.
- **Result lines** — `**Result: …**` paragraphs get highlighted styling.
- **Code examples** — combine command and output in one fenced block; prefix shell commands with `$`.
- **Paper claims** — use `>` blockquotes for quoted claims from the paper.
- **Comparisons** — use GFM tables; they pick up bordered styling automatically (wrapped in `.blog-table-wrap`).
- **Section breaks** — use `---` for horizontal rules between major subsections.

## Operational scripts

### `scripts/supabase-public-schema-stats.sh`

Prints table and column counts for the `public` schema in the EduEng Supabase project. Requires the Supabase CLI with a linked or local project.

```bash
EDU_ENG=/path/to/edu-eng ./scripts/supabase-public-schema-stats.sh
./scripts/supabase-public-schema-stats.sh /path/to/edu-eng --local
```

Use this when updating Blueprint DB stats on `spec-db.html` or `spec.html`.

## Deployment

GitHub Pages serves the repo root. `.nojekyll` disables Jekyll processing so files and folders prefixed with `_` are not ignored.

Push to `main` to publish. No CI or build artifacts.

## Adding a new portfolio page

1. Create `{page}.html` following an existing page (e.g. `ai.html`) as a template.
2. Link `main.css`; set `data-page="{key}"` on `<body>`.
3. Add `<script src="components.js"></script>` as the first element inside `<body>`.
4. Add `<script src="i18n.js"></script>` before `</body>`.
5. Register the tab in `components.js` (`tab()` call + valid key in the comment block).
6. Add `KO` entries and a `META` block in `i18n.js` for any new copy.
