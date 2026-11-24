(function () {
  'use strict';
  var key = 'portfolio-theme';
  var root = document.documentElement;
  var preference = 'system';
  try { preference = localStorage.getItem(key) || 'system'; } catch (error) { /* Storage is optional. */ }
  if (preference !== 'light' && preference !== 'dark') preference = 'system';
  function apply(value) {
    if (value === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', value);
  }
  apply(preference);
  document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('theme');
    if (!select) return;
    select.value = preference;
    select.parentNode.removeAttribute('hidden');
    select.addEventListener('change', function () {
      preference = select.value;
      apply(preference);
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch (error) { /* Theme still works for this page. */ }
    });
    window.addEventListener('storage', function (event) {
      if (event.key !== key && event.key !== null) return;
      var value = event.newValue;
      preference = value === 'light' || value === 'dark' ? value : 'system';
      select.value = preference;
      apply(preference);
    });
  });
}());
