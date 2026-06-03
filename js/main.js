;(function() {
  'use strict';

  var STORAGE_KEY = 'portfolio_data';

  function getData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }

  function loadData() {
    var data = getData();

    if (!data) {
      data = {
        skills: [
          { name: 'JavaScript', category: 'frontend', icon: '' },
          { name: 'TypeScript', category: 'frontend', icon: '' },
          { name: 'React', category: 'frontend', icon: '' },
          { name: 'Next.js', category: 'frontend', icon: '' },
          { name: 'Vue.js', category: 'frontend', icon: '' },
          { name: 'Angular', category: 'frontend', icon: '' },
          { name: 'Svelte', category: 'frontend', icon: '' },
          { name: 'Tailwind CSS', category: 'frontend', icon: '' },
          { name: 'GSAP', category: 'frontend', icon: '' },
          { name: 'Three.js', category: 'frontend', icon: '' },
          { name: 'WebGL', category: 'frontend', icon: '' },
          { name: 'HTML/CSS', category: 'frontend', icon: '' },
          { name: 'Node.js', category: 'backend', icon: '' },
          { name: 'Python', category: 'backend', icon: '' },
          { name: 'Go', category: 'backend', icon: '' },
          { name: 'Rust', category: 'backend', icon: '' },
          { name: 'Java', category: 'backend', icon: '' },
          { name: 'C#', category: 'backend', icon: '' },
          { name: 'PostgreSQL', category: 'backend', icon: '' },
          { name: 'MongoDB', category: 'backend', icon: '' },
          { name: 'Redis', category: 'backend', icon: '' },
          { name: 'GraphQL', category: 'backend', icon: '' },
          { name: 'gRPC', category: 'backend', icon: '' },
          { name: 'Kafka', category: 'backend', icon: '' },
          { name: 'Docker', category: 'devops', icon: '' },
          { name: 'Kubernetes', category: 'devops', icon: '' },
          { name: 'AWS', category: 'devops', icon: '' },
          { name: 'GCP', category: 'devops', icon: '' },
          { name: 'Azure', category: 'devops', icon: '' },
          { name: 'CI/CD', category: 'devops', icon: '' },
          { name: 'Terraform', category: 'devops', icon: '' },
          { name: 'Ansible', category: 'devops', icon: '' },
          { name: 'Git', category: 'devops', icon: '' },
          { name: 'Linux', category: 'devops', icon: '' },
          { name: 'Nginx', category: 'devops', icon: '' },
          { name: 'Prometheus', category: 'devops', icon: '' },
        ],
        projects: [
          { title: 'E-commerce Platform', description: 'Plataforma de comercio electrónico con Next.js, Stripe y Sanity CMS.', tags: ['Next.js', 'Stripe', 'Sanity'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/ecommerce' },
          { title: 'Dashboard Analytics', description: 'Panel de análisis en tiempo real con React, D3.js y WebSockets.', tags: ['React', 'D3.js', 'WebSocket'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/dashboard' },
          { title: 'Social Media App', description: 'Red social con autenticación, posts en tiempo real y notificaciones.', tags: ['React', 'Firebase', 'GraphQL'], image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/social' },
          { title: 'CLI Task Runner', description: 'Herramienta CLI para automatización de tareas con Node.js y Commander.', tags: ['Node.js', 'CLI', 'Automation'], image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop', github: 'https://github.com/x2yzl/cli-tasks' },
          { title: 'API Gateway', description: 'Gateway de APIs con rate limiting, caching y autenticación JWT.', tags: ['Go', 'Redis', 'Docker'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/gateway' },
          { title: 'Weather App', description: 'Aplicación del clima con datos en tiempo real, geolocalización y mapas interactivos.', tags: ['React', 'OpenWeather', 'Mapbox'], image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/weather' },
          { title: 'Task Manager API', description: 'API RESTful para gestión de tareas con autenticación JWT y PostgreSQL.', tags: ['Node.js', 'PostgreSQL', 'JWT'], image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop', github: 'https://github.com/x2yzl/tasks-api' },
          { title: 'Chat App', description: 'Chat en tiempo real con WebSockets, salas privadas y modo oscuro.', tags: ['Socket.io', 'React', 'MongoDB'], image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/chat' },
          { title: 'Portfolio Theme', description: 'Tema oscuro gótico para portafolio con Three.js y GSAP.', tags: ['Three.js', 'GSAP', 'CSS'], image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop', github: 'https://github.com/x2yzl/portfolio-theme' },
          { title: 'URL Shortener', description: 'Acortador de URLs con analytics, QR codes y caché con Redis.', tags: ['Go', 'Redis', 'Docker'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', url: 'https://example.com', github: 'https://github.com/x2yzl/url-shortener' },
        ],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    if (data.skills && data.skills.length) renderSkills(data.skills);
    if (data.projects && data.projects.length) renderProjects(data.projects);
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }

  function renderSkills(skills) {
    var grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = skills.map(function(s) {
      var icon = s.icon || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23888\' stroke-width=\'1.5\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3Cpath d=\'M12 6v6l4 2\'/%3E%3C/svg%3E';
      return '<div class="skills__item" data-category="' + (s.category || 'all') + '">'
        + '<img class="skills__item-icon" src="' + icon + '" alt="' + s.name + '" loading="lazy">'
        + '<span class="skills__item-name">' + s.name + '</span></div>';
    }).join('');

    var filters = document.querySelectorAll('.skills__filter');
    var items = document.querySelectorAll('.skills__item');

    filters.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters.forEach(function(f) { f.classList.remove('skills__filter--active'); });
        btn.classList.add('skills__filter--active');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function(item) {
          item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'flex' : 'none';
        });
      });
    });
  }

  function renderProjects(projects) {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    if (!projects || projects.length === 0) {
      grid.innerHTML = '<div class="projects__empty">próximamente</div>';
      return;
    }

    grid.innerHTML = projects.map(function(p, i) {
      var image = p.image || 'assets/images/placeholder.svg';
      var tags = (p.tags || []).map(function(t) { return '<span class="project-card__tag">' + t + '</span>'; }).join('');
      return '<div class="project-card" data-index="' + i + '">'
        + '<img class="project-card__image" src="' + image + '" alt="' + p.title + '" loading="lazy">'
        + '<div class="project-card__body">'
        + '<h3 class="project-card__title">' + p.title + '</h3>'
        + '<p class="project-card__description">' + (p.description || '') + '</p>'
        + '<div class="project-card__tags">' + tags + '</div></div></div>';
    }).join('');

    grid.querySelectorAll('.project-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var idx = parseInt(card.getAttribute('data-index'), 10);
        openProjectModal(projects[idx]);
      });
    });
  }

  function openProjectModal(project) {
    var modal = document.getElementById('project-modal');
    var body = document.getElementById('modal-body');
    if (!modal || !body) return;

    var hasImage = project.image && project.image !== 'assets/images/placeholder.svg';
    var imageHtml = hasImage
      ? '<div class="modal-preview__image-wrap"><img class="modal-preview__image" src="' + project.image + '" alt="' + project.title + '" loading="lazy"></div>'
      : '<div class="modal-preview__image-wrap"><div class="modal-preview__image-placeholder">◆</div></div>';

    var tags = (project.tags || []).map(function(t) { return '<span class="modal-preview__tag">' + t + '</span>'; }).join('');
    var links = '';
    if (project.url) links += '<a href="' + project.url + '" target="_blank" rel="noopener" class="modal-preview__link">[ ver proyecto ]</a>';
    if (project.github) links += '<a href="' + project.github + '" target="_blank" rel="noopener" class="modal-preview__link">[ código fuente ]</a>';

    body.innerHTML = imageHtml
      + '<div class="modal-preview__content">'
      + '<h2 class="modal-preview__title">' + project.title + '</h2>'
      + '<p class="modal-preview__description">' + (project.description || '') + '</p>'
      + '<div class="modal-preview__divider">╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌</div>'
      + '<div class="modal-preview__tags">' + tags + '</div>'
      + (links ? '<div class="modal-preview__links">' + links + '</div>' : '')
      + '</div>';

    modal.classList.add('modal--open');
  }

  // Modal controls
  var modal = document.getElementById('project-modal');
  if (modal) {
    document.getElementById('modal-close').addEventListener('click', function() {
      modal.classList.remove('modal--open');
    });
    modal.addEventListener('click', function(e) {
      if (e.target === this || e.target.classList.contains('modal__backdrop')) {
        modal.classList.remove('modal--open');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') modal.classList.remove('modal--open');
    });
  }

  loadData();
})();
