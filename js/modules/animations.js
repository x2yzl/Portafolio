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

  /* ===== CINEMATIC SCROLL REVEALS ===== */

  function cinematicFrom(el, vars) {
    var tl = gsap.timeline({ paused: true });
    tl.from(el, vars);
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });
  }

  document.querySelectorAll('[data-anim="fade-up"]').forEach(function(el) {
    cinematicFrom(el, {
      y: 60, opacity: 0, scale: 0.88,
      filter: 'blur(6px)',
      duration: 0.85, ease: 'power3.out',
    });
  });

  document.querySelectorAll('[data-anim="fade-left"]').forEach(function(el) {
    cinematicFrom(el, {
      x: -100, opacity: 0, rotationY: 12,
      filter: 'blur(4px)',
      duration: 0.9, ease: 'power3.out',
    });
  });

  document.querySelectorAll('[data-anim="fade-right"]').forEach(function(el) {
    cinematicFrom(el, {
      x: 100, opacity: 0, rotationY: -12,
      filter: 'blur(4px)',
      duration: 0.9, ease: 'power3.out',
    });
  });

  document.querySelectorAll('.section__title').forEach(function(el) {
    var tl = gsap.timeline({ paused: true });
    tl.from(el, {
      y: 40, opacity: 0, scale: 0.85,
      filter: 'blur(8px)',
      duration: 0.8, ease: 'back.out(1.7)',
    });
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });
  });

  function animateSkills() {
    var grid = document.getElementById('skills-grid');
    if (!grid) return;

    var items = grid.querySelectorAll('.skills__item');
    var tl = gsap.timeline({ paused: true });
    tl.from(items, {
      y: 40, opacity: 0, scale: 0.8, rotation: gsap.utils.random(-4, 4, 1, true),
      filter: 'blur(4px)',
      duration: 0.55, stagger: 0.035, ease: 'back.out(1.7)',
    });

    ScrollTrigger.create({
      trigger: grid, start: 'top 80%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });

    var countEl = document.getElementById('skills-count');
    if (countEl) {
      var ct = gsap.timeline({ paused: true });
      ct.from(countEl, { textContent: 0, duration: 1.2, ease: 'power2.out', snap: { textContent: 1 } });
      ScrollTrigger.create({
        trigger: countEl, start: 'top 90%',
        animation: ct,
        toggleActions: 'play none none reverse',
      });
    }
  }

  animateSkills();

  function animateProjectGrid() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    var tl = gsap.timeline({ paused: true });
    tl.from(cards, {
      y: 50, opacity: 0, scale: 0.92,
      filter: 'blur(6px)',
      duration: 0.6, stagger: 0.08, ease: 'power3.out',
    });

    ScrollTrigger.create({
      trigger: grid, start: 'top 82%',
      animation: tl,
      toggleActions: 'play none none reverse',
    });
  }

  animateProjectGrid();

  /* ===== GLOW PULSE HOVER EFFECTS ===== */

  function glowOnEnter(el) {
    gsap.to(el, {
      scale: 1.06,
      borderColor: 'rgba(90,18,18,0.6)',
      boxShadow: '0 0 25px rgba(61,12,12,0.35), 0 0 50px rgba(61,12,12,0.12)',
      duration: 0.3, ease: 'power2.out', overwrite: 'auto',
    });
  }

  function glowOnLeave(el) {
    gsap.to(el, {
      scale: 1,
      borderColor: '',
      boxShadow: '',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    });
  }

  document.querySelectorAll('.skills__item').forEach(function(item) {
    item.addEventListener('mouseenter', function() { glowOnEnter(item); });
    item.addEventListener('mouseleave', function() { glowOnLeave(item); });
  });

  document.querySelectorAll('.contact__card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { glowOnEnter(card); });
    card.addEventListener('mouseleave', function() { glowOnLeave(card); });
  });

  function projectCardEnter(card) {
    gsap.to(card.querySelector('.project-card__image'), {
      scale: 1.05, filter: 'grayscale(0.2)',
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(card, {
      boxShadow: '0 0 35px rgba(61,12,12,0.4), 0 0 60px rgba(61,12,12,0.15)',
      duration: 0.3, ease: 'power2.out', overwrite: 'auto',
    });
  }

  function projectCardLeave(card) {
    gsap.to(card.querySelector('.project-card__image'), {
      scale: 1, filter: 'grayscale(0.9)',
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(card, {
      boxShadow: '',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    });
  }

  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { projectCardEnter(card); });
    card.addEventListener('mouseleave', function() { projectCardLeave(card); });

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

  window.addEventListener('load', function() { ScrollTrigger.refresh(); });
})();
