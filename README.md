# Hyunsoo Lee Portfolio

Personal GitHub Pages portfolio for `ahyunsoo3.github.io`.

The site is intentionally static: plain HTML, CSS, and vanilla JS served from the repo root with `.nojekyll` (no Jekyll, no bundler, no build step). It presents EduEng / Missroot TOEFL as the flagship portfolio project for recruiters and hiring managers.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Pages that load content via `fetch` (blog essays, `blog/posts.json`) require the local server — opening HTML files directly (`file://`) will fail those requests.

## Site architecture

### Page inventory

| File | Tab (`data-page`) | Purpose |
| --- | --- | --- |
| `index.html` | `index` | Portfolio home |
| `project.html` | — (legacy inline header) | Technical deep-dive |
| `ai.html` | `ai` | AI engine showcase |
| `growth.html` | `growth` | Marketing |
| `blog.html` | `blog` | Essay index |
| `blog-post.html` | `blog` | Single essay viewer (`?slug=…`) |
| `spec.html` + `spec-*.html` | `spec` (or sub-page key) | Blueprint technical specification |
| `resume-en.html`, `resume-ko.html` | — | Printable resumes |

### Shared front-end modules

Most pages use the same shell:

1. **`data-page="…"`** on `<body>` — tells `components.js` which nav tab is active.
2. **`<script src="components.js"></script>`** as the first script inside `<body>` — synchronously injects the site header before page content renders (avoids layout flash).
3. **`main.css`** — site-wide styles, including blog prose and Blueprint spec sidebar layout (formerly split across `spec.css`).
4. **`i18n.js`** — EN/KR language toggle. Walks text nodes, swaps `nodeValue` against the `KO` dictionary, and persists choice in `localStorage` (`portfolio-lang` / `hl_lang`).

**Blueprint spec pages** add a second body script immediately after `components.js`:

- **`spec-nav.js`** — injects the collapsible spec sidebar and wires section navigation.

**Blog pages** load at the end of `<body>`:

- **`marked`** (CDN) — GFM Markdown → HTML on `blog-post.html`
- **`blog.js`** — fetches `blog/posts.json`, renders the index or a single post

#### Legacy exception: `project.html`

`project.html` predates the shared shell. It still uses:

- An **inline** `<header>` (not `components.js`)
- **`styles.css`** + **`project.css`** instead of `main.css`
- **`project-lang.js`** instead of `i18n.js`

When editing nav labels or adding a new top-level tab, update both `components.js` and the inline header in `project.html` until that page is migrated.

### Adding a new standard page

1. Create `your-page.html` with `data-page="your-key"` on `<body>`.
2. Link `main.css`; inject header via `components.js` as the first body script.
3. Add a tab in `components.js` (`tab(…)` call in the nav block).
4. Add English source strings to the page body; mirror translations in the `KO` object in `i18n.js`.
5. If the page injects HTML after load, call `window.portfolioRefreshI18n()` so dynamically inserted text is collected for translation (see `blog.js`).

Valid `data-page` keys today: `index`, `project`, `ai`, `growth`, `blog`, `spec`, plus spec sub-keys consumed by `spec-nav.js` (`spec-arch`, `spec-modules`, etc.).

## Internationalization (i18n)

`i18n.js` replaces the older `language.js` and `project-lang.js` split on migrated pages.

- **Source of truth:** English text in HTML.
- **Translations:** keys in the `KO` object must match the normalized English string exactly (whitespace collapsed).
- **Header tabs** are intentionally left in English even in KR mode.
- **Dynamic content:** after injecting new DOM, call `portfolioRefreshI18n()` to re-scan text nodes.

`project.html` still uses `project-lang.js` with its own `KO` dictionary — keep both in sync when changing shared nav or footer copy.

## Blog — publishing an essay

Essays are static Markdown files managed in the repo (no CMS).

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

`blog.js` loads the manifest, sorts published posts by `date` descending, fetches `blog/posts/{slug}.md`, strips duplicate H1s (title comes from `posts.json`), parses with `marked` (GFM), and runs `enhanceProseHtml()` for verdict badges and table wrappers.

### Essay formatting

Essays render inside `.blog-prose`. Conventions for readable, consistent posts:

- **No `#` H1 in the markdown file** — the title comes from `posts.json` and renders as the page heading. A leading `# Title` matching the manifest title is stripped automatically.
- **Verdict lines** — end a section with `→ Label.` (e.g. `→ Functional.`) for auto-styled conclusion badges.
- **Result lines** — `**Result: …**` paragraphs get `.blog-result` styling.
- **Code examples** — combine command and output in one fenced block; prefix shell commands with `$`.
- **Paper claims** — use `>` blockquotes for quoted claims from the paper.
- **Comparisons** — use GFM tables; they pick up bordered styling automatically (wrapped in `.blog-table-wrap`).
- **Section breaks** — use `---` for horizontal rules between major subsections.

## Blueprint specification (`spec-*.html`)

The Blueprint section is reference documentation for the Missroot TOEFL product stack. Entry point: `spec.html`.

| File | Topic |
| --- | --- |
| `spec-arch.html` | Full-stack topology and layer spec |
| `spec-modules.html` | Flutter feature modules |
| `spec-backend.html` | Supabase edge functions |
| `spec-ai.html` | AI pipeline (Gemini, Deepgram, TTS) |
| `spec-billing.html` | Payments and subscriptions |
| `spec-db.html` | Database schema |
| `spec-packages.html` | Shared monorepo packages |

Each page sets `data-page` to its section key, loads `components.js` → `spec-nav.js`, and uses the shared sidebar injected by `spec-nav.js`. Add new spec pages to the sidebar HTML in `spec-nav.js` and link them from `spec.html` overview.

## Scripts

### `scripts/supabase-public-schema-stats.sh`

Prints table and column counts for the `public` schema of a linked Supabase project. Useful when updating `spec-db.html` stats against the live EduEng backend.

```bash
# Linked remote project (requires `supabase link` in the repo)
EDU_ENG=/path/to/edu-eng ./scripts/supabase-public-schema-stats.sh

# Local Supabase (`supabase start`)
./scripts/supabase-public-schema-stats.sh /path/to/edu-eng --local
```

Requires the Supabase CLI and either a linked project or a running local stack.

## Deployment

Push to `main` on `ahyunsoo3/ahyunsoo3.github.io`. GitHub Pages serves the repo root as the site. No CI or build artifacts — what is in the repo is what ships.
