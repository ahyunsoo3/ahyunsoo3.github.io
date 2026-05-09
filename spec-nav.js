/* spec-nav.js — shared sidebar logic for all spec pages */
(function () {

  /* ── Mark body so CSS can push main content safely ─────────────────── */
  document.body.classList.add('has-spec-sidebar');

  /* ── Detect current page from URL ─────────────────────────────────── */
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

  /* ── Apply active states ───────────────────────────────────────────── */
  document.querySelectorAll('.ssb-group').forEach(function (g) {
    if (g.dataset.group === currentGroup) g.classList.add('ssb-group-active');
  });
  document.querySelectorAll('.ssb-link[data-page]').forEach(function (a) {
    if (a.dataset.page === currentKey) a.classList.add('ssb-link-active');
  });

  /* ── Sidebar collapse (desktop) ────────────────────────────────────── */
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

  /* ── Mobile open / close ───────────────────────────────────────────── */
  function closeMobile() {
    sidebar.classList.remove('ssb-open');
    overlay.classList.remove('ssb-overlay-visible');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }
  if (openBtn)  openBtn.addEventListener('click', function () {
    sidebar.classList.add('ssb-open');
    overlay.classList.add('ssb-overlay-visible');
    openBtn.setAttribute('aria-expanded', 'true');
  });
  if (overlay) overlay.addEventListener('click', closeMobile);

  /* ── Group fold / unfold ───────────────────────────────────────────── */
  document.querySelectorAll('.ssb-group-btn').forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    if (!target) return;
    /* start open */
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
