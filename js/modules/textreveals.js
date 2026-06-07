;(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCE) return;

  function revealText(selector, fromVars, toVars, triggerStart) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;

    gsap.set(els, fromVars);

    els.forEach(function(el) {
      ScrollTrigger.create({
        trigger: el,
        start: triggerStart || 'top 85%',
        onEnter: function() {
          if (el._revealed) return;
          el._revealed = true;
          gsap.to(el, toVars);
        },
        onEnterBack: function() {
          if (el._revealed) return;
          el._revealed = true;
          gsap.to(el, toVars);
        },
      });
    });
  }

  function initTextReveals() {
    revealText('[data-reveal="clip"]',
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out', immediateRender: false }
    );

    revealText('.hero__description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', immediateRender: false }
    );

    revealText('.about__bio p',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', immediateRender: false },
      'top 80%'
    );

    revealText('.contact__lead',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', immediateRender: false },
      'top 85%'
    );
  }

  document.addEventListener('DOMContentLoaded', function() {
    initTextReveals();
  });

  document.addEventListener('contentRendered', function() {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
})();
