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

  /* ===== STATIC ELEMENT REVEALS ===== */
  /* Elements animate in every time they enter viewport (both directions) */

  gsap.set('[data-anim="fade-up"]', {
    y: 60, opacity: 0, scale: 0.88,
  });
  gsap.set('[data-anim="fade-left"]', {
    x: -100, opacity: 0, rotationY: 12,
  });
  gsap.set('[data-anim="fade-right"]', {
    x: 100, opacity: 0, rotationY: -12,
  });
  gsap.set('.section__title', {
    y: 40, opacity: 0, scale: 0.85,
  });

  function revealOnScroll(selector, fromVars, toVars, triggerStart) {
    document.querySelectorAll(selector).forEach(function(el) {
      ScrollTrigger.create({
        trigger: el,
        start: triggerStart || 'top 90%',
        onEnter: function() {
          if (el._revealed) return;
          el._revealed = true;
          gsap.fromTo(el, fromVars, toVars);
        },
        onEnterBack: function() {
          if (el._revealed) return;
          el._revealed = true;
          gsap.fromTo(el, fromVars, toVars);
        },
      });
    });
  }

  revealOnScroll('[data-anim="fade-up"]',
    { y: 60, opacity: 0, scale: 0.88 },
    { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', immediateRender: false }
  );

  revealOnScroll('[data-anim="fade-left"]',
    { x: -100, opacity: 0, rotationY: 12 },
    { x: 0, opacity: 1, rotationY: 0, duration: 0.9, ease: 'power3.out', immediateRender: false }
  );

  revealOnScroll('[data-anim="fade-right"]',
    { x: 100, opacity: 0, rotationY: -12 },
    { x: 0, opacity: 1, rotationY: 0, duration: 0.9, ease: 'power3.out', immediateRender: false }
  );

  revealOnScroll('.section__title',
    { y: 40, opacity: 0, scale: 0.85 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', immediateRender: false },
    'top 85%'
  );

  /* ===== DYNAMIC CONTENT REVEALS ===== */

  function animateSkills() {
    var items = document.querySelectorAll('.skills__item');
    if (items.length === 0) return;

    gsap.set(items, { y: 40, opacity: 0, scale: 0.8 });
    var done = false;

    ScrollTrigger.create({
      trigger: '#skills-grid',
      start: 'top 80%',
      onEnter: function() {
        if (done) return;
        done = true;
        gsap.fromTo(items,
          { y: 40, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.035, ease: 'back.out(1.7)', immediateRender: false }
        );
      },
      onEnterBack: function() {
        if (done) return;
        done = true;
        gsap.fromTo(items,
          { y: 40, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.035, ease: 'back.out(1.7)', immediateRender: false }
        );
      },
    });
  }

  function animateProjectGrid() {
    var cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    gsap.set(cards, { y: 50, opacity: 0, scale: 0.92 });
    var done = false;

    ScrollTrigger.create({
      trigger: '#projects-grid',
      start: 'top 82%',
      onEnter: function() {
        if (done) return;
        done = true;
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', immediateRender: false }
        );
      },
      onEnterBack: function() {
        if (done) return;
        done = true;
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', immediateRender: false }
        );
      },
    });
  }

  function animateStats() {
    var countEl = document.getElementById('skills-count');
    if (!countEl) return;

    var done = false;

    ScrollTrigger.create({
      trigger: countEl,
      start: 'top 90%',
      onEnter: function() {
        if (done) return;
        done = true;
        gsap.from(countEl, { textContent: 0, duration: 1.2, ease: 'power2.out', snap: { textContent: 1 } });
      },
      onEnterBack: function() {
        if (done) return;
        done = true;
        gsap.from(countEl, { textContent: 0, duration: 1.2, ease: 'power2.out', snap: { textContent: 1 } });
      },
    });
  }

  /* ===== GLOW PULSE HOVER EFFECTS ===== */

  function glowOnEnter(el) {
    gsap.to(el, {
      scale: 1.06,
      boxShadow: '0 0 25px rgba(61,12,12,0.35), 0 0 50px rgba(61,12,12,0.12)',
      duration: 0.3, ease: 'power2.out', overwrite: 'auto',
    });
  }

  function glowOnLeave(el) {
    gsap.to(el, {
      scale: 1,
      boxShadow: 'none',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    });
  }

  function bindSkillHovers() {
    document.querySelectorAll('.skills__item').forEach(function(item) {
      item.addEventListener('mouseenter', function() { glowOnEnter(item); });
      item.addEventListener('mouseleave', function() { glowOnLeave(item); });
    });
  }

  function bindContactHovers() {
    document.querySelectorAll('.contact__card').forEach(function(card) {
      card.addEventListener('mouseenter', function() { glowOnEnter(card); });
      card.addEventListener('mouseleave', function() { glowOnLeave(card); });
    });
  }

  function bindProjectHovers() {
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
  }

  function projectCardEnter(card) {
    gsap.to(card.querySelector('.project-card__image'), {
      scale: 1.05,
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(card, {
      boxShadow: '0 0 35px rgba(61,12,12,0.4), 0 0 60px rgba(61,12,12,0.15)',
      duration: 0.3, ease: 'power2.out', overwrite: 'auto',
    });
  }

  function projectCardLeave(card) {
    gsap.to(card.querySelector('.project-card__image'), {
      scale: 1,
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(card, {
      boxShadow: 'none',
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    });
  }

  document.addEventListener('contentRendered', function() {
    animateSkills();
    animateProjectGrid();
    animateStats();
    bindSkillHovers();
    bindProjectHovers();
    bindContactHovers();
    ScrollTrigger.refresh();
  });

  window.addEventListener('load', function() { ScrollTrigger.refresh(); });
})();
