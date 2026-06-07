;(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCE) return;

  var TECH = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Go', 'Rust', 'Kubernetes', 'AWS', 'Docker',
    'PostgreSQL', 'Redis', 'GraphQL', 'Next.js', 'Vue.js',
  ];

  function initMarquee() {
    var wrap = document.querySelector('.marquee-wrap');
    if (!wrap) return;
    var inner = wrap.querySelector('.marquee-inner');
    if (!inner) return;

    var html = TECH.map(function(t) { return '<span>' + t + '</span>'; }).join('');
    inner.innerHTML = html + html;

    var totalW = inner.scrollWidth / 2;

    var tween = gsap.to(inner, {
      x: -totalW,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    wrap.addEventListener('mouseenter', function() { tween.pause(); });
    wrap.addEventListener('mouseleave', function() { tween.resume(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarquee);
  } else {
    initMarquee();
  }
})();
