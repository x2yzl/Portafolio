;(function() {
  'use strict';

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var mouseX = 0, mouseY = 0;
  var ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skills__item, .contact__card, .skills__filter, .btn').forEach(function(el) {
    el.addEventListener('mouseenter', function() { ring.classList.add('cursor-ring--hover'); });
    el.addEventListener('mouseleave', function() { ring.classList.remove('cursor-ring--hover'); });
  });
})();
