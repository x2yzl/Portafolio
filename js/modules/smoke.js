;(function() {
  'use strict';

  var canvas = document.getElementById('smoke-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0 };
  var lastMouse = { x: 0.5, y: 0.5 };
  var time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
    mouse.vx = mouse.x - lastMouse.x;
    mouse.vy = mouse.y - lastMouse.y;
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
  });

  var COUNT = 55;

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.02 - 0.015,
      size: Math.random() * 180 + 80,
      baseSize: 0,
      alpha: Math.random() * 0.035 + 0.01,
      life: Math.random() * 2000,
      pulseSpeed: Math.random() * 0.004 + 0.002,
      driftX: Math.random() * 0.02 - 0.01,
      driftY: Math.random() * 0.02 - 0.01,
    };
  }

  for (var i = 0; i < COUNT; i++) {
    var p = createParticle();
    p.baseSize = p.size;
    particles.push(p);
  }

  function draw() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var mx = (mouse.x - 0.5) * 2;
    var my = (mouse.y - 0.5) * 2;
    var mv = Math.min(1, Math.abs(mouse.vx) + Math.abs(mouse.vy));

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.life++;

      var fluidInfluence = 0.08 * mv;
      p.x += p.vx + mx * 0.04 + p.driftX + mouse.vx * fluidInfluence;
      p.y += p.vy + my * 0.025 + p.driftY + mouse.vy * fluidInfluence;

      p.size = p.baseSize + Math.sin(time * p.pulseSpeed + i) * 20;
      if (p.size < 50) p.size = 50;
      if (p.size > 350) p.size = 350;

      var pulseAlpha = p.alpha + Math.sin(p.life * 0.003 + i * 0.5) * 0.02;

      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, 'rgba(70, 20, 20, ' + (pulseAlpha * 1.2) + ')');
      gradient.addColorStop(0.25, 'rgba(45, 15, 15, ' + (pulseAlpha * 0.8) + ')');
      gradient.addColorStop(0.5, 'rgba(30, 10, 10, ' + (pulseAlpha * 0.4) + ')');
      gradient.addColorStop(1, 'rgba(10, 5, 5, 0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      if (p.life > 2000) {
        particles[i] = createParticle();
        particles[i].baseSize = particles[i].size;
        particles[i].x = Math.random() * canvas.width;
        particles[i].y = canvas.height + 50;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
