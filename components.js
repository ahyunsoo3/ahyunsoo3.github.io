/* components.js — shared header injection
 * Placed as the first <script> inside <body>, executes synchronously so the
 * header appears before any page content is rendered (no layout flash).
 *
 * Each page sets  data-page="<key>"  on <body> to control the active nav tab.
 * Valid keys: index | project | ai | growth | spec
 */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  var specPages = ['spec', 'spec-arch', 'spec-modules', 'spec-backend',
                   'spec-ai', 'spec-billing', 'spec-db', 'spec-packages'];
  var isSpec = specPages.indexOf(page) !== -1;

  function tab(href, label, key) {
    var active = (key === page) || (key === 'spec' && isSpec);
    return '<a class="page-tab' + (active ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }

  var header =
    '<header class="site-header">' +
      '<a class="brand" href="index.html" aria-label="Hyunsoo Lee home">' +
        '<span class="brand-mark">HL</span>' +
        '<span class="brand-name">Hyunsoo Lee</span>' +
      '</a>' +
      '<nav class="page-tabs" aria-label="Primary navigation">' +
        tab('index.html',          'About',     'index')   +
        tab('project.html',        'Build',     'project') +
        tab('ai.html',             'AI Engine', 'ai')      +
        tab('growth.html',         'Marketing', 'growth')  +
        tab('spec.html',           'Blueprint', 'spec')    +
        tab('index.html#contact',  'Contact',   'contact') +
      '</nav>' +
      '<div class="language-tabs" role="group" aria-label="Language selector">' +
        '<button class="language-tab" type="button" data-lang-button="en">EN</button>' +
        '<button class="language-tab" type="button" data-lang-button="ko">KR</button>' +
      '</div>' +
    '</header>';

  document.body.insertAdjacentHTML('afterbegin', header);
})();
