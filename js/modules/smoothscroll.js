;(function() {
  'use strict';

  if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCE) return;

  var lenis = new Lenis({
    duration: 1.15,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    syncTouch: true,
    syncTouchLerp: 0.08,
  });

  lenis.on('scroll', function() {
    ScrollTrigger.update();
  });

  gsap.ticker.add(function(time) {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop: function(value) {
      if (value !== undefined) {
        lenis.scrollTo(value);
      }
      return lenis.scroll || 0;
    },
    getBoundingClientRect: function() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  });

  window.__lenis = lenis;

  setTimeout(function() { ScrollTrigger.refresh(); }, 100);

  document.addEventListener('click', function(e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    }
  });
})();
