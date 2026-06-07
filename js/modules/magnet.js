;(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCE) return;

  var STRENGTH = 0.3;
  var selector = '.navbar__links a, .contact__card, .experience__card, .skills__filter';

  function initMagnet() {
    document.querySelectorAll(selector).forEach(function(el) {
      if (el._magnet) return;
      el._magnet = true;
      el.classList.add('magnet-btn');

      var rect = el.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var xTween = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
      var yTween = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

      function onMove(e) {
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        xTween(dx * STRENGTH);
        yTween(dy * STRENGTH);
      }

      function onLeave() {
        xTween(0);
        yTween(0);
      }

      function updateCenter() {
        rect = el.getBoundingClientRect();
        cx = rect.left + rect.width / 2;
        cy = rect.top + rect.height / 2;
      }

      el.addEventListener('mouseenter', updateCenter);
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  initMagnet();

  document.addEventListener('contentRendered', function() {
    initMagnet();
  });
})();
