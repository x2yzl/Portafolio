;(function() {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const loader = form.querySelector('.btn__loader');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      const firstEmpty = form.querySelector('#name');
      if (!name) firstEmpty.focus();
      else if (!email) form.querySelector('#email').focus();
      else form.querySelector('#message').focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.querySelector('#email').focus();
      return;
    }

    // Show loader
    if (loader) loader.hidden = false;
    submitBtn.disabled = true;
    submitBtn.querySelector('span:not(.btn__loader)').textContent = 'Enviando...';

    try {
      // Replace with your Formspree/EmailJS endpoint
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        form.innerHTML = '<div class="contact__success"><p>Mensaje enviado con éxito. Gracias por contactarme.</p></div>';
      } else {
        throw new Error('Error al enviar');
      }
    } catch (err) {
      if (loader) loader.hidden = true;
      submitBtn.disabled = false;
      submitBtn.querySelector('span:not(.btn__loader)').textContent = 'Enviar mensaje';
      alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
    }
  });
})();
