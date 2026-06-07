;(function() {
  'use strict';

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (REDUCE || isTouch) { dot.style.display = 'none'; ring.style.display = 'none'; return; }

  var mouseX = 0, mouseY = 0;
  var ringX = 0, ringY = 0;
  var hidden = false;

  function setPos(el, x, y) {
    el.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
  }

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setPos(dot, mouseX, mouseY);
    if (hidden) {
      hidden = false;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', function() {
    hidden = true;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(function() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setPos(ring, ringX, ringY);
    });
  } else {
    (function raf() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setPos(ring, ringX, ringY);
      requestAnimationFrame(raf);
    })();
  }

  var HOVER_SELECTOR = 'a, button, .project-card, .skills__item, .contact__card, .skills__filter, .btn, .experience__card, .experience__dot, .navbar__logo, .modal__close, .back-to-top, .experience__tag, .project-card__tag';

  function bindHover() {
    document.querySelectorAll(HOVER_SELECTOR).forEach(function(el) {
      if (el._cursorHover) return;
      el._cursorHover = true;
      el.addEventListener('mouseenter', function() { ring.classList.add('cursor-ring--hover'); });
      el.addEventListener('mouseleave', function() { ring.classList.remove('cursor-ring--hover'); });
    });
  }

  bindHover();
  document.addEventListener('contentRendered', bindHover);

  document.addEventListener('mousedown', function() { ring.classList.add('cursor-ring--active'); });
  document.addEventListener('mouseup', function() { ring.classList.remove('cursor-ring--active'); });
})();
