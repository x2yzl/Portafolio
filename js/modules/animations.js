;(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCE) return;

  function heroAnimation() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero__greeting', { y: 30, opacity: 0, duration: 0.6 })
      .from('.hero__name--line', { y: 40, opacity: 0, duration: 0.7, stagger: 0.15 }, '-=0.3')
      .from('.hero__roles', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero__description', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero__actions', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');

    window.__typewriterRoles = window.__typewriterRoles || [
      'Full Stack Senior',
      'Software Engineer',
      'DevOps Advocate',
      'System Architect',
    ];
    var roles = window.__typewriterRoles;
    var roleIndex = 0;

    function typewriter() {
      var el = document.getElementById('typewriter-role');
      if (!el) return;

      var role = roles[roleIndex];
      gsap.to(el, {
        duration: role.length * 0.05,
        text: role,
        ease: 'none',
        onComplete: function() {
          gsap.delayedCall(2, function() {
            gsap.to(el, {
              duration: 0.3,
              opacity: 0,
              onComplete: function() {
                el.textContent = '';
                gsap.set(el, { opacity: 1 });
                roleIndex = (roleIndex + 1) % roles.length;
                typewriter();
              }
            });
          });
        }
      });
    }

    typewriter();
  }

  heroAnimation();

  function setupScrollReveal() {
    document.querySelectorAll('[data-anim="fade-up"]').forEach(function(el) {
      var tl = gsap.timeline({ paused: true });
      tl.from(el, { y: 50, opacity: 0, scale: 0.97, duration: 0.7, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%',
        animation: tl,
        toggleActions: 'play none none reverse',
      });
    });

    document.querySelectorAll('[data-anim="fade-left"]').forEach(function(el) {
      var tl = gsap.timeline({ paused: true });
      tl.from(el, { x: -80, opacity: 0, rotationY: 8, duration: 0.8, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: el, start: 'top 82%',
        animation: tl,
        toggleActions: 'play none none reverse',
      });
    });

    document.querySelectorAll('[data-anim="fade-right"]').forEach(function(el) {
      var tl = gsap.timeline({ paused: true });
      tl.from(el, { x: 80, opacity: 0, rotationY: -8, duration: 0.8, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: el, start: 'top 82%',
        animation: tl,
        toggleActions: 'play none none reverse',
      });
    });
  }

  setupScrollReveal();

  // Section titles with zoom effect
  document.querySelectorAll('.section__title').forEach(function(el) {
    var tl = gsap.timeline({ paused: true });
    tl.from(el, { y: 30, opacity: 0, scale: 0.92, duration: 0.6, ease: 'back.out(1.4)' });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });
  });

  function animateSkills() {
    var grid = document.getElementById('skills-grid');
    if (!grid) return;

    var items = grid.querySelectorAll('.skills__item');
    var tl = gsap.timeline({ paused: true });
    tl.from(items, { y: 40, opacity: 0, scale: 0.85, rotation: -3, duration: 0.5, stagger: 0.03, ease: 'back.out(1.7)' });

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });

    // Stats counter trigger
    var countEl = document.getElementById('skills-count');
    if (countEl) {
      var ct = gsap.timeline({ paused: true });
      ct.from(countEl, { textContent: 0, duration: 1.2, ease: 'power2.out', snap: { textContent: 1 } });
      ScrollTrigger.create({
        trigger: countEl,
        start: 'top 90%',
        animation: ct,
        toggleActions: 'play none none reverse',
      });
    }
  }

  animateSkills();

  function setupTilt() {
    document.querySelectorAll('.project-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotateX = (y - rect.height / 2) / (rect.height / 2) * -8;
        var rotateY = (x - rect.width / 2) / (rect.width / 2) * 8;
        gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });

      card.addEventListener('mouseleave', function() {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  setupTilt();

  window.addEventListener('load', function() { ScrollTrigger.refresh(); });
})();
