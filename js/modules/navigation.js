;(function() {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  const navLinks = document.querySelectorAll('.navbar__links a');

  if (!navbar) return;

  // Hamburger menu
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      const isOpen = links.classList.toggle('navbar__links--open');
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

  // Scroll effect
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    let current = '';
    sections.forEach(function(section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('navbar__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('navbar__link--active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
})();
