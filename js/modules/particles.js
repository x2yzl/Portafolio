;(function() {
  'use strict';

  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var rotation = { x: 0, y: 0 };
  var time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  var COUNT = 120;
  var DEPTH = 600;
  var FOV = 300;

  function createParticle() {
    return {
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * DEPTH,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }

  for (var i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  function project(p, rotX, rotY) {
    var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    var cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    var x1 = p.x * cosY - p.z * sinY;
    var z1 = p.x * sinY + p.z * cosY;
    var y1 = p.y * cosX - z1 * sinX;
    var z2 = p.y * sinX + z1 * cosX;

    if (z2 < 10) z2 = 10;
    var scale = FOV / (FOV + z2);

    return {
      sx: x1 * scale + canvas.width / 2,
      sy: y1 * scale + canvas.height / 2,
      scale: scale,
      z: z2,
    };
  }

  function draw() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouse.tx += (mouse.x - mouse.tx) * 0.05;
    mouse.ty += (mouse.y - mouse.ty) * 0.05;
    rotation.y = mouse.tx * 0.4 + time * 0.0003;
    rotation.x = mouse.ty * 0.2 + Math.sin(time * 0.001) * 0.05;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      var wrap = 500;
      if (p.x > wrap) p.x = -wrap;
      if (p.x < -wrap) p.x = wrap;
      if (p.y > wrap / 1.5) p.y = -wrap / 1.5;
      if (p.y < -wrap / 1.5) p.y = wrap / 1.5;
      if (p.z > DEPTH / 2) p.z = -DEPTH / 2;
      if (p.z < -DEPTH / 2) p.z = DEPTH / 2;

      var proj = project(p, rotation.x, rotation.y);
      var a = p.alpha + Math.sin(p.pulseOffset + time * p.pulseSpeed) * 0.12;
      var s = p.size * proj.scale;

      ctx.beginPath();
      ctx.arc(proj.sx, proj.sy, s, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(92, 16, 16, ' + Math.max(0.1, a) + ')';
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(61, 12, 12, 0.06)';
    ctx.lineWidth = 0.5;

    for (var i = 0; i < particles.length; i++) {
      var p1 = particles[i];
      var proj1 = project(p1, rotation.x, rotation.y);

      for (var j = i + 1; j < particles.length; j += 3) {
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dz = p1.z - p2.z;
        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 150) {
          var proj2 = project(p2, rotation.x, rotation.y);
          var lineAlpha = (1 - dist / 150) * 0.2;
          ctx.beginPath();
          ctx.moveTo(proj1.sx, proj1.sy);
          ctx.lineTo(proj2.sx, proj2.sy);
          ctx.strokeStyle = 'rgba(61, 12, 12, ' + lineAlpha + ')';
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
