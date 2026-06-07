;(function() {
  'use strict';

  var navbar = document.querySelector('.navbar');
  var toggle = document.querySelector('.navbar__toggle');
  var links = document.querySelector('.navbar__links');
  var navLinks = document.querySelectorAll('.navbar__links a');
  var sections = document.querySelectorAll('section[id]');
  var progressBar = document.getElementById('scroll-progress');
  var backBtn = document.getElementById('back-to-top');

  if (!navbar) return;

  function getScrollY() {
    return window.__lenis ? window.__lenis.scroll : window.scrollY;
  }

  // Hamburger menu
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      var isOpen = links.classList.toggle('navbar__links--open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('navbar__links--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && links.classList.contains('navbar__links--open')) {
        links.classList.remove('navbar__links--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function onScroll() {
    var sy = getScrollY();

    // Navbar background
    navbar.classList.toggle('navbar--scrolled', sy > 50);

    // Active link highlight
    var current = '';
    sections.forEach(function(section) {
      if (sy >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.classList.toggle('navbar__link--active', link.getAttribute('href') === '#' + current);
    });

    // Scroll progress
    if (progressBar) {
      var max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + Math.min(1, sy / max) + ')';
    }

    // Back to top
    if (backBtn) backBtn.classList.toggle('back-to-top--visible', sy > 400);
  }

  if (window.__lenis) {
    window.__lenis.on('scroll', onScroll);
  } else {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', function() {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  onScroll();
})();
