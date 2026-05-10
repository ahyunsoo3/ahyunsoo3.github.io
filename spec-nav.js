/* spec-nav.js — spec sidebar injection + shared behavior
 * Placed as the second <script> inside <body> (after components.js) on every
 * spec page.  Runs synchronously so the sidebar is in the DOM before the
 * rest of the page body is rendered.
 */
(function () {

  /* ── 1. Inject sidebar HTML after the site-header ──────────────────── */
  var SIDEBAR_HTML =
    '<button class="ssb-open-btn" id="ssb-open-btn" aria-label="Open contents sidebar" aria-expanded="false">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      'Contents' +
    '</button>' +
    '<div class="ssb-overlay" id="ssb-overlay"></div>' +
    '<aside class="spec-sidebar" id="spec-sidebar" aria-label="Spec navigation">' +
      '<div class="ssb-header">' +
        '<a class="ssb-brand" href="spec.html">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
          'Spec Docs' +
        '</a>' +
        '<button class="ssb-collapse-btn" id="ssb-collapse-btn" aria-label="Collapse sidebar">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>' +
        '</button>' +
      '</div>' +
      '<nav class="ssb-nav" aria-label="Spec pages">' +
        '<a class="ssb-overview-link" href="spec.html">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
          'Overview' +
        '</a>' +
        '<div class="ssb-group" data-group="arch">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-arch">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">01</span>' +
            '<span class="ssb-group-label">System Architecture</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-arch">' +
            '<li><a class="ssb-link" href="spec-arch.html" data-page="system-arch">Full-stack topology</a></li>' +
            '<li><a class="ssb-link" href="spec-arch.html" data-page="system-arch">Layer specification</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="modules">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-modules">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">02</span>' +
            '<span class="ssb-group-label">Flutter Modules</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-modules">' +
            '<li><a class="ssb-link" href="spec-modules.html" data-page="module-map">14 feature modules</a></li>' +
            '<li><a class="ssb-link" href="spec-modules.html" data-page="module-map">Module specification</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="backend">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-backend">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">03</span>' +
            '<span class="ssb-group-label">Edge Functions</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-backend">' +
            '<li><a class="ssb-link" href="spec-backend.html" data-page="backend-fns">9 Deno functions</a></li>' +
            '<li><a class="ssb-link" href="spec-backend.html" data-page="backend-fns">Function specification</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="ai">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-ai">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">04</span>' +
            '<span class="ssb-group-label">AI Pipeline</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-ai">' +
            '<li><a class="ssb-link" href="spec-ai.html" data-page="ai-pipeline">Call flow</a></li>' +
            '<li><a class="ssb-link" href="spec-ai.html" data-page="ai-pipeline">Provider specification</a></li>' +
            '<li><a class="ssb-link" href="spec-ai.html" data-page="ai-pipeline">Credit &amp; retry logic</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="billing">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-billing">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">05</span>' +
            '<span class="ssb-group-label">Billing Architecture</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-billing">' +
            '<li><a class="ssb-link" href="spec-billing.html" data-page="billing">Billing flow</a></li>' +
            '<li><a class="ssb-link" href="spec-billing.html" data-page="billing">Plan tiers</a></li>' +
            '<li><a class="ssb-link" href="spec-billing.html" data-page="billing">Store packs</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="database">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-database">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">06</span>' +
            '<span class="ssb-group-label">Database Schema</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-database">' +
            '<li><a class="ssb-link" href="spec-db.html" data-page="database">Table groups</a></li>' +
            '<li><a class="ssb-link" href="spec-db.html" data-page="database">Key table spec</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="ssb-group" data-group="packages">' +
          '<button class="ssb-group-btn" aria-expanded="true" aria-controls="ssb-packages">' +
            '<svg class="ssb-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '<span class="ssb-group-num">07</span>' +
            '<span class="ssb-group-label">Shared Packages</span>' +
          '</button>' +
          '<ul class="ssb-items" id="ssb-packages">' +
            '<li><a class="ssb-link" href="spec-packages.html" data-page="packages">core_ui</a></li>' +
            '<li><a class="ssb-link" href="spec-packages.html" data-page="packages">core_network</a></li>' +
            '<li><a class="ssb-link" href="spec-packages.html" data-page="packages">core_billing</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>' +
    '</aside>';

  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    siteHeader.insertAdjacentHTML('afterend', SIDEBAR_HTML);
  } else {
    document.body.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
  }

  /* ── 2. Mark body so CSS can push main content safely ──────────────── */
  document.body.classList.add('has-spec-sidebar');

  /* ── 3. Detect current page and apply active states ────────────────── */
  var filename = window.location.pathname.split('/').pop() || 'spec.html';
  var fileToKey = {
    'spec.html':          'overview',
    'spec-arch.html':     'system-arch',
    'spec-modules.html':  'module-map',
    'spec-backend.html':  'backend-fns',
    'spec-ai.html':       'ai-pipeline',
    'spec-billing.html':  'billing',
    'spec-db.html':       'database',
    'spec-packages.html': 'packages',
  };
  var keyToGroup = {
    'system-arch':  'arch',
    'module-map':   'modules',
    'backend-fns':  'backend',
    'ai-pipeline':  'ai',
    'billing':      'billing',
    'database':     'database',
    'packages':     'packages',
  };
  var currentKey   = fileToKey[filename] || 'overview';
  var currentGroup = keyToGroup[currentKey] || null;

  document.querySelectorAll('.ssb-group').forEach(function (g) {
    if (g.dataset.group === currentGroup) g.classList.add('ssb-group-active');
  });
  document.querySelectorAll('.ssb-link[data-page]').forEach(function (a) {
    if (a.dataset.page === currentKey) a.classList.add('ssb-link-active');
  });

  /* ── 4. Sidebar collapse (desktop) ─────────────────────────────────── */
  var sidebar     = document.getElementById('spec-sidebar');
  var collapseBtn = document.getElementById('ssb-collapse-btn');
  var openBtn     = document.getElementById('ssb-open-btn');
  var overlay     = document.getElementById('ssb-overlay');

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = sidebar.classList.toggle('ssb-collapsed');
      document.body.classList.toggle('ssb-collapsed-body', collapsed);
      collapseBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
      collapseBtn.querySelector('polyline').setAttribute('points',
        collapsed ? '9 18 15 12 9 6' : '15 18 9 12 15 6');
    });
  }

  /* ── 5. Mobile open / close ─────────────────────────────────────────── */
  function closeMobile() {
    sidebar.classList.remove('ssb-open');
    overlay.classList.remove('ssb-overlay-visible');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }
  if (openBtn) openBtn.addEventListener('click', function () {
    sidebar.classList.add('ssb-open');
    overlay.classList.add('ssb-overlay-visible');
    openBtn.setAttribute('aria-expanded', 'true');
  });
  if (overlay) overlay.addEventListener('click', closeMobile);

  /* ── 6. Group fold / unfold ─────────────────────────────────────────── */
  document.querySelectorAll('.ssb-group-btn').forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    if (!target) return;
    target.style.maxHeight = 'none';

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (open) {
        target.style.maxHeight = target.scrollHeight + 'px';
        requestAnimationFrame(function () { target.style.maxHeight = '0'; });
      } else {
        target.style.maxHeight = target.scrollHeight + 'px';
        target.addEventListener('transitionend', function once() {
          target.style.maxHeight = 'none';
          target.removeEventListener('transitionend', once);
        });
      }
    });
  });

})();
