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

  /* ===== WORD-SPLIT SECTION TITLES ===== */
  function splitSectionTitles() {
    document.querySelectorAll('.section__title').forEach(function(title) {
      var text = title.textContent.trim();
      if (!text) return;

      if (title._wordTrigger) title._wordTrigger.kill();
      title.innerHTML = text.split(/\s+/).map(function(w) {
        return '<span class="section__title-word">' + w + '</span>';
      }).join(' ');

      gsap.set(title.querySelectorAll('.section__title-word'), {
        y: 40, opacity: 0, rotateX: -20, transformPerspective: 600
      });

      var done = false;
      title._wordTrigger = ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        onEnter: function() { if (!done) { done = true; animateWords(); } },
        onEnterBack: function() { if (!done) { done = true; animateWords(); } },
      });

      function animateWords() {
        gsap.to(title.querySelectorAll('.section__title-word'), {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.6, stagger: 0.06,
          ease: 'back.out(1.7)',
          onComplete: function() { title.classList.add('section__title--revealed'); }
        });
      }
    });
  }

  /* ===== FLOATING ELEMENTS ===== */
  function floatingElements() {
    gsap.to('.hero__name--line:first-child', {
      y: -4, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
    var aboutFrame = document.querySelector('.about__image-frame');
    if (aboutFrame) {
      gsap.to(aboutFrame, {
        y: -6, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    }
  }

  /* ===== SPOTLIGHT EFFECT (fix --mx/--my) ===== */
  function spotlightEffect() {
    document.querySelectorAll('.project-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        var my = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      });
    });
  }

  /* ===== RIPPLE EFFECT ===== */
  function rippleEffect() {
    document.querySelectorAll('.btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var existing = btn.querySelector('.ripple');
        if (existing) existing.remove();
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left).toFixed(0);
        var y = (e.clientY - rect.top).toFixed(0);
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        btn.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    });
  }

  /* ===== PARALLAX SCROLLING ===== */
  function parallaxElements() {
    var bgVideo = document.querySelector('.bg-video');
    if (bgVideo) {
      gsap.to(bgVideo, {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    gsap.to('.fog-float', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true },
    });
    gsap.to('.fog-ground', {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }

  /* ===== HERO STAR MOUSE PARALLAX ===== */
  function mouseParallax() {
    var hero = document.querySelector('#hero');
    var starSvg = document.querySelector('.hero__star svg');
    if (!hero || !starSvg) return;
    hero.addEventListener('mousemove', function(e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(starSvg, {
        rotationY: x * 15, rotationX: y * -15,
        duration: 0.5, ease: 'power2.out', overwrite: 'auto',
      });
    });
    hero.addEventListener('mouseleave', function() {
      gsap.to(starSvg, {
        rotationX: 0, rotationY: 0,
        duration: 0.8, ease: 'power2.out',
        clearProps: 'transform',
      });
    });
  }

  /* ===== INIT NEW EFFECTS ===== */
  floatingElements();
  mouseParallax();
  parallaxElements();

  document.addEventListener('contentRendered', function() {
    animateSkills();
    animateProjectGrid();
    animateStats();
    bindSkillHovers();
    bindProjectHovers();
    bindContactHovers();
    spotlightEffect();
    rippleEffect();
    splitSectionTitles();
    ScrollTrigger.refresh();
  });

  document.addEventListener('languageChanged', function() {
    splitSectionTitles();
  });

  window.addEventListener('load', function() { ScrollTrigger.refresh(); });
})();
