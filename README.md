# Hyunsoo Lee Portfolio

Personal GitHub Pages portfolio for `ahyunsoo3.github.io`.

The site is intentionally static: `index.html`, `styles.css`, and `.nojekyll`.
It presents EduEng / Missroot TOEFL as the flagship portfolio project for
recruiters and hiring managers.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Blog pages load essays via `fetch`, so use the local server rather than opening HTML files directly (`file://`).

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
