// Remembers the reader's language in a cookie shared by every *.fabiopereira.name
// site, so the blogs can read it. Cookie: lang=en|es|pt
(function () {
  var LANGS = ['en', 'es', 'pt'];
  var ROOT = 'fabiopereira.name';

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    var host = location.hostname;
    var onSite = host === ROOT || host.slice(-(ROOT.length + 1)) === '.' + ROOT;
    // Drop any stale host-only copy so it can't shadow the shared one.
    if (onSite) document.cookie = 'lang=; Path=/; Max-Age=0';
    document.cookie = 'lang=' + lang + '; Path=/; Max-Age=31536000; SameSite=Lax' +
      (onSite ? '; Domain=' + ROOT + '; Secure' : '');
  }

  function onClick(e) {
    if (e.type === 'auxclick' && e.button !== 1) return; // middle-click only, not right-click
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.closest('.lang')) setLang(a.getAttribute('hreflang'));
    else if (a.classList.contains('blog')) setLang(document.documentElement.lang);
  }
  // auxclick covers middle-click / open-in-new-tab
  document.addEventListener('click', onClick);
  document.addEventListener('auxclick', onClick);
})();
