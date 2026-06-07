;(function() {
  'use strict';

  function showSkeletons() {
    var skillsGrid = document.getElementById('skills-grid');
    var projectsGrid = document.getElementById('projects-grid');

    if (skillsGrid && !skillsGrid.querySelector('.skills__item')) {
      skillsGrid.innerHTML = '<div class="skeleton skeleton--skill"></div><div class="skeleton skeleton--skill"></div><div class="skeleton skeleton--skill"></div><div class="skeleton skeleton--skill"></div><div class="skeleton skeleton--skill"></div><div class="skeleton skeleton--skill"></div>';
    }

    if (projectsGrid && !projectsGrid.querySelector('.project-card')) {
      projectsGrid.innerHTML = '<div class="skeleton skeleton--project"></div><div class="skeleton skeleton--project"></div>';
    }
  }

  function loadData() {
    showSkeletons();

    Promise.all([
      db.getSkills(),
      db.getProjects(),
    ]).then(function(results) {
      var skills = results[0] || [];
      var projects = results[1] || [];
      renderSkills(skills);
      loadIconsLazy();
      renderProjects(projects);
      document.dispatchEvent(new CustomEvent('contentRendered'));
    }).catch(function(err) {
      console.error('db error:', err);
    });
  }

  var SIMPLE_ICONS = {
    'JavaScript': 'javascript', 'TypeScript': 'typescript', 'React': 'react',
    'Next.js': 'nextdotjs', 'Vue.js': 'vuedotjs', 'Angular': 'angular',
    'Svelte': 'svelte', 'Tailwind CSS': 'tailwindcss',
    'GSAP': 'greensock', 'Three.js': 'threedotjs', 'WebGL': 'webgl',
    'HTML/CSS': 'html5', 'Node.js': 'nodedotjs', 'Python': 'python',
    'Go': 'go', 'Rust': 'rust', 'Java': 'java', 'C#': 'csharp',
    'PostgreSQL': 'postgresql', 'MongoDB': 'mongodb', 'Redis': 'redis',
    'GraphQL': 'graphql', 'gRPC': 'grpc', 'Kafka': 'apachekafka',
    'Docker': 'docker', 'Kubernetes': 'kubernetes', 'AWS': 'amazonwebservices',
    'GCP': 'googlecloud', 'Azure': 'azuredevops', 'CI/CD': '',
    'Terraform': 'terraform', 'Ansible': 'ansible', 'Git': 'git',
    'Linux': 'linux', 'Nginx': 'nginx', 'Prometheus': 'prometheus',
  };

  function skillIcon(name) {
    var slug = SIMPLE_ICONS[name];
    return slug ? 'https://cdn.simpleicons.org/' + slug : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23888\' stroke-width=\'1.5\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3Cpath d=\'M12 6v6l4 2\'/%3E%3C/svg%3E';
  }

  function renderSkills(skills) {
    var grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = skills.map(function(s) {
      return '<div class="skills__item" data-category="' + (s.category || 'all') + '" data-icon="' + skillIcon(s.name) + '">'
        + '<div class="skills__item-icon"></div>'
        + '<span class="skills__item-name">' + s.name + '</span></div>';
    }).join('');

    var countEl = document.getElementById('skills-count');
    if (countEl) countEl.textContent = skills.length;

    var filters = document.querySelectorAll('.skills__filter');
    var items = grid.querySelectorAll('.skills__item');

    filters.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters.forEach(function(f) { f.classList.remove('skills__filter--active'); });
        btn.classList.add('skills__filter--active');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function(item) {
          item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'flex' : 'none';
        });
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
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

    renderProjectGrid(projects);
  }

  function renderProjectGrid(projects) {
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
        + '<img class="project-card__image" src="' + image + '" alt="' + p.title + '" loading="lazy" decoding="async">'
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

  function loadIconsLazy() {
    var grid = document.getElementById('skills-grid');
    if (!grid) return;

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          io.disconnect();
          grid.querySelectorAll('.skills__item').forEach(function(item) {
            var iconEl = item.querySelector('.skills__item-icon');
            var src = item.getAttribute('data-icon');
            if (iconEl && src) {
              var img = document.createElement('img');
              img.className = 'skills__item-icon';
              img.src = src;
              img.alt = item.querySelector('.skills__item-name').textContent;
              img.loading = 'lazy';
              img.crossOrigin = 'anonymous';
              iconEl.replaceWith(img);
            }
          });
        }
      });
    }, { rootMargin: '200px' });

    io.observe(grid);
  }

  loadData();
})();
