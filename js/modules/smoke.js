;(function() {
  'use strict';

  var canvas = document.getElementById('smoke-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: 0.5, y: 0.5 };
  var rafId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
  });

  var COUNT = 80;

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.02 - 0.02,
      size: Math.random() * 180 + 80,
      alpha: Math.random() * 0.04 + 0.01,
      life: Math.random() * 2000,
    };
  }

  for (var i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.life++;
      p.x += p.vx + (mouse.x - 0.5) * 0.05;
      p.y += p.vy + (mouse.y - 0.5) * 0.03;
      p.size += (Math.random() - 0.5) * 0.15;

      if (p.size < 60) p.size = 60;
      if (p.size > 350) p.size = 350;

      var pulseAlpha = p.alpha + Math.sin(p.life * 0.003) * 0.015;

      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, 'rgba(80, 80, 85, ' + (pulseAlpha) + ')');
      gradient.addColorStop(0.3, 'rgba(40, 40, 45, ' + (pulseAlpha * 0.6) + ')');
      gradient.addColorStop(1, 'rgba(20, 20, 25, 0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      if (p.life > 2000) {
        particles[i] = createParticle();
        particles[i].x = Math.random() * canvas.width;
        particles[i].y = canvas.height + 50;
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  draw();
})();
