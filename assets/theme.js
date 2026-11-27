(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var key = 'portfolio-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var preference = 'system';

  try {
    preference = localStorage.getItem(key) || 'system';
  } catch (error) {
    /* Storage is optional. */
  }

  if (preference !== 'light' && preference !== 'dark') preference = 'system';

  function resolvedTheme() {
    if (preference === 'system') return media && media.matches ? 'dark' : 'light';
    return preference;
  }

  function applyTheme() {
    if (preference === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', preference);

    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', resolvedTheme() === 'dark' ? '#0d0f13' : '#ffffff');
  }

  applyTheme();

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll('[data-theme-value]')
    );

    function syncButtons() {
      buttons.forEach(function (button) {
        var active = button.getAttribute('data-theme-value') === preference;
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function choose(value) {
      preference = value === 'light' || value === 'dark' ? value : 'system';
      applyTheme();
      syncButtons();
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch (error) {
        /* Theme still works for this page. */
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        choose(button.getAttribute('data-theme-value'));
      });
    });

    syncButtons();

    if (media) {
      var onSchemeChange = function () {
        if (preference === 'system') applyTheme();
      };
      if (media.addEventListener) media.addEventListener('change', onSchemeChange);
      else if (media.addListener) media.addListener(onSchemeChange);
    }

    window.addEventListener('storage', function (event) {
      if (event.key !== key && event.key !== null) return;
      var value = event.newValue;
      preference = value === 'light' || value === 'dark' ? value : 'system';
      syncButtons();
      applyTheme();
    });

    /* Header shadow once the page moves. */
    var header = document.querySelector('[data-header]');
    function onScroll() {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 4);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Reading progress on post pages. */
    var progress = document.querySelector('[data-progress] span');
    if (progress) {
      var tick = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progress.style.width = (ratio * 100).toFixed(2) + '%';
      };
      tick();
      window.addEventListener('scroll', tick, { passive: true });
      window.addEventListener('resize', tick);
    }

    /* Sticky mini bar on post pages. */
    var postBar = document.querySelector('[data-post-bar]');
    var articleHeader = document.querySelector('[data-article-header]');
    if (postBar && articleHeader && 'IntersectionObserver' in window) {
      var barObserver = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        var show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        postBar.classList.toggle('is-visible', show);
        postBar.inert = !show;
      }, { rootMargin: '-48px 0px 0px 0px', threshold: 0 });
      barObserver.observe(articleHeader);
    }

    /* Scroll reveal. */
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (item) {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      } else {
        revealObserver.observe(item);
      }
    });
  });
}());
