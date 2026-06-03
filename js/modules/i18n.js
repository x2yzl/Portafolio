;(function() {
  'use strict';

  var LANG_KEY = 'portfolio_lang';

  var translations = {
    es: {
      nav: { about: 'about', skills: 'skills', projects: 'projects', contact: 'contact' },
      hero: {
        greeting: '❮ hola, soy',
        description: 'Transformo ideas en aplicaciones y sitios web funcionales que realmente aportan valor.',
        btn_projects: '[ ver proyectos ]',
        btn_contact: '[ contáctame ]',
        roles: ['Full Stack Senior', 'Software Engineer', 'DevOps Advocate', 'System Architect'],
      },
      about: {
        title: '[ about ]',
        bio: [
          'Soy x2yzl, desarrollador web full stack con más de 8 años creando aplicaciones y sitios web desde el frontend hasta el backend. Me gusta transformar ideas en productos funcionales, bien construidos y que se vean bien.',
          'Trabajo con tecnologías modernas tanto del lado del cliente como del servidor, siempre buscando código limpio, buen rendimiento y una experiencia de usuario sólida.',
        ],
      },
      skills: {
        title: '[ skills ]',
        stat_label: 'tecnologías',
        filters: { all: '[ all ]', frontend: '[ frontend ]', backend: '[ backend ]', devops: '[ devops ]' },
      },
      projects: { title: '[ projects ]' },
      contact: {
        title: '[ contact ]',
        lead: 'Trabajemos juntos en tu próximo proyecto.',
        email_label: 'email',
        github_label: 'github',
        discord_label: 'discord',
      },
      footer: 'built with',
      loader: { tagline: '— Full Stack Senior —' },
    },
    en: {
      nav: { about: 'about', skills: 'skills', projects: 'projects', contact: 'contact' },
      hero: {
        greeting: '❮ hi, i\'m',
        description: 'I turn ideas into functional apps and websites that actually deliver value.',
        btn_projects: '[ view projects ]',
        btn_contact: '[ contact me ]',
        roles: ['Full Stack Senior', 'Software Engineer', 'DevOps Advocate', 'System Architect'],
      },
      about: {
        title: '[ about ]',
        bio: [
          'I\'m x2yzl, a full stack web developer with 8+ years building apps and websites from frontend to backend. I love turning ideas into functional, well-crafted products that look great and work even better.',
          'I work with modern technologies on both client and server side, always aiming for clean code, solid performance, and a strong user experience.',
        ],
      },
      skills: {
        title: '[ skills ]',
        stat_label: 'technologies',
        filters: { all: '[ all ]', frontend: '[ frontend ]', backend: '[ backend ]', devops: '[ devops ]' },
      },
      projects: { title: '[ projects ]' },
      contact: {
        title: '[ contact ]',
        lead: 'Let\'s work together on your next project.',
        email_label: 'email',
        github_label: 'github',
        discord_label: 'discord',
      },
      footer: 'built with',
      loader: { tagline: '— Full Stack Senior —' },
    },
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'es';
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    var t = translations[lang];
    if (!t) return;

    // Nav
    document.querySelectorAll('[data-i18n="nav.about"]').forEach(function(el) { el.textContent = t.nav.about; });
    document.querySelectorAll('[data-i18n="nav.skills"]').forEach(function(el) { el.textContent = t.nav.skills; });
    document.querySelectorAll('[data-i18n="nav.projects"]').forEach(function(el) { el.textContent = t.nav.projects; });
    document.querySelectorAll('[data-i18n="nav.contact"]').forEach(function(el) { el.textContent = t.nav.contact; });

    // Hero
    document.querySelectorAll('[data-i18n="hero.greeting"]').forEach(function(el) { el.textContent = t.hero.greeting; });
    document.querySelectorAll('[data-i18n="hero.description"]').forEach(function(el) { el.textContent = t.hero.description; });
    document.querySelectorAll('[data-i18n="hero.btn_projects"]').forEach(function(el) { el.textContent = t.hero.btn_projects; });
    document.querySelectorAll('[data-i18n="hero.btn_contact"]').forEach(function(el) { el.textContent = t.hero.btn_contact; });

    // About
    document.querySelectorAll('[data-i18n="about.title"]').forEach(function(el) { el.textContent = t.about.title; });
    var bioEls = document.querySelectorAll('[data-i18n="about.bio"]');
    if (bioEls.length) {
      var bioHtml = t.about.bio.map(function(p) { return '<p>' + p + '</p>'; }).join('');
      bioEls.forEach(function(el) { el.innerHTML = bioHtml; });
    }

    // Skills
    document.querySelectorAll('[data-i18n="skills.title"]').forEach(function(el) { el.textContent = t.skills.title; });
    document.querySelectorAll('[data-i18n="skills.stat_label"]').forEach(function(el) { el.textContent = t.skills.stat_label; });
    document.querySelectorAll('[data-i18n="skills.filter.all"]').forEach(function(el) { el.textContent = t.skills.filters.all; });
    document.querySelectorAll('[data-i18n="skills.filter.frontend"]').forEach(function(el) { el.textContent = t.skills.filters.frontend; });
    document.querySelectorAll('[data-i18n="skills.filter.backend"]').forEach(function(el) { el.textContent = t.skills.filters.backend; });
    document.querySelectorAll('[data-i18n="skills.filter.devops"]').forEach(function(el) { el.textContent = t.skills.filters.devops; });

    // Projects
    document.querySelectorAll('[data-i18n="projects.title"]').forEach(function(el) { el.textContent = t.projects.title; });

    // Contact
    document.querySelectorAll('[data-i18n="contact.title"]').forEach(function(el) { el.textContent = t.contact.title; });
    document.querySelectorAll('[data-i18n="contact.lead"]').forEach(function(el) { el.textContent = t.contact.lead; });
    document.querySelectorAll('[data-i18n="contact.email_label"]').forEach(function(el) { el.textContent = t.contact.email_label; });
    document.querySelectorAll('[data-i18n="contact.github_label"]').forEach(function(el) { el.textContent = t.contact.github_label; });
    document.querySelectorAll('[data-i18n="contact.discord_label"]').forEach(function(el) { el.textContent = t.contact.discord_label; });

    // Footer
    document.querySelectorAll('[data-i18n="footer"]').forEach(function(el) { el.textContent = t.footer; });

    // Loader tagline
    document.querySelectorAll('[data-i18n="loader.tagline"]').forEach(function(el) { el.textContent = t.loader.tagline; });

    // Switcher button active state
    document.querySelectorAll('.lang-switch').forEach(function(btn) {
      btn.classList.toggle('lang-switch--active', btn.getAttribute('data-lang') === lang);
    });

    document.documentElement.lang = lang;
  }

  function init() {
    var lang = getLang();

    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML =
      '<button class="lang-switch' + (lang === 'es' ? ' lang-switch--active' : '') + '" data-lang="es" aria-label="Español">ES</button>'
      + '<span class="lang-divider">|</span>'
      + '<button class="lang-switch' + (lang === 'en' ? ' lang-switch--active' : '') + '" data-lang="en" aria-label="English">EN</button>';

    var navLinks = document.querySelector('.navbar__links');
    if (navLinks) {
      var li = document.createElement('li');
      li.className = 'lang-item';
      li.appendChild(switcher);
      navLinks.appendChild(li);
    }

    switcher.addEventListener('click', function(e) {
      var btn = e.target.closest('.lang-switch');
      if (!btn) return;
      var newLang = btn.getAttribute('data-lang');
      if (newLang && newLang !== getLang()) {
        setLang(newLang);
        // Update hero typewriter roles
        if (window.__typewriterRoles) {
          window.__typewriterRoles = translations[newLang].hero.roles;
        }
      }
    });

    applyLang(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();