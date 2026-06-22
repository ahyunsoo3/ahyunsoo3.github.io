/* blog.js — static essay listing and Markdown post viewer */
(function () {
  var MANIFEST_URL = "blog/posts.json";
  var POSTS_DIR = "blog/posts/";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(iso + "T12:00:00"));
    } catch (_) {
      return iso;
    }
  }

  function fetchManifest() {
    return fetch(MANIFEST_URL).then(function (res) {
      if (!res.ok) throw new Error("manifest");
      return res.json();
    });
  }

  function publishedPosts(posts) {
    return posts
      .filter(function (p) { return p.published !== false; })
      .sort(function (a, b) {
        return (b.date || "").localeCompare(a.date || "");
      });
  }

  function findPost(posts, slug) {
    return posts.find(function (p) { return p.slug === slug; }) || null;
  }

  function refreshI18n() {
    if (typeof window.portfolioRefreshI18n === "function") {
      window.portfolioRefreshI18n();
    }
  }

  function renderList(container, posts) {
    if (!posts.length) {
      container.innerHTML =
        '<p class="blog-empty">No essays yet. Check back soon.</p>';
      refreshI18n();
      return;
    }

    container.innerHTML = posts.map(function (post) {
      var href = "blog-post.html?slug=" + encodeURIComponent(post.slug);
      return (
        '<a class="blog-card" href="' + href + '">' +
          '<time class="blog-card-date" datetime="' + escapeHtml(post.date || "") + '">' +
            escapeHtml(formatDate(post.date)) +
          "</time>" +
          '<h2 class="blog-card-title">' + escapeHtml(post.title) + "</h2>" +
          '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt || "") + "</p>" +
          '<span class="blog-card-read">Read essay →</span>' +
        "</a>"
      );
    }).join("");
    refreshI18n();
  }

  function renderError(container, message, showBack) {
    container.innerHTML =
      '<p class="blog-error">' + escapeHtml(message) + "</p>" +
      (showBack
        ? '<p class="blog-error-actions"><a class="blog-back-inline" href="blog.html">Back to blog</a></p>'
        : "");
    refreshI18n();
  }

  function loadPost(container, slug) {
    if (!slug) {
      renderError(container, "Essay not found.", true);
      return;
    }

    fetchManifest()
      .then(function (posts) {
        var post = findPost(posts, slug);
        if (!post || post.published === false) {
          renderError(container, "Essay not found.", true);
          return;
        }

        return fetch(POSTS_DIR + encodeURIComponent(slug) + ".md")
          .then(function (res) {
            if (!res.ok) throw new Error("post");
            return res.text();
          })
          .then(function (md) {
            if (typeof marked === "undefined") {
              renderError(container, "Could not load essay renderer.", true);
              return;
            }

            var html = marked.parse(md, { gfm: true, breaks: false });
            document.title = post.title + " · Hyunsoo Lee";
            document.querySelector('meta[name="description"]')
              ?.setAttribute("content", post.excerpt || post.title);

            container.innerHTML =
              '<header class="blog-post-header">' +
                '<time class="blog-post-date" datetime="' + escapeHtml(post.date || "") + '">' +
                  escapeHtml(formatDate(post.date)) +
                "</time>" +
                '<h1 class="blog-post-title">' + escapeHtml(post.title) + "</h1>" +
              "</header>" +
              '<div class="blog-prose">' + html + "</div>";
            refreshI18n();
          });
      })
      .catch(function () {
        renderError(container, "Could not load this essay.", true);
      });
  }

  function initList() {
    var container = document.getElementById("blog-list");
    if (!container) return;

    fetchManifest()
      .then(function (posts) {
        renderList(container, publishedPosts(Array.isArray(posts) ? posts : []));
      })
      .catch(function () {
        renderError(container, "Could not load essays.", false);
      });
  }

  function initPost() {
    var container = document.getElementById("blog-post");
    if (!container) return;

    var slug = new URLSearchParams(location.search).get("slug");
    loadPost(container, slug);
  }

  if (document.getElementById("blog-list")) initList();
  if (document.getElementById("blog-post")) initPost();
})();
