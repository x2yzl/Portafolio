;(function() {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('contact-status');
  var submitBtn = form.querySelector('.contact__submit');
  var COOLDOWN_KEY = 'contact_last_submit';
  var SUBMIT_COOLDOWN = 60000;

  function _(key) {
    return typeof window.__ === 'function' ? window.__(key) : key;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    var name = document.getElementById('contact-name').value.trim();
    var email = document.getElementById('contact-email').value.trim();
    var message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      setStatus(_('contact.form.name') + ', ' + _('contact.form.email') + ', ' + _('contact.form.message') + ': ' + _('contact.form.send'), 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Email inv\u00e1lido', 'error');
      return;
    }

    var lastSubmit = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
    if (Date.now() - lastSubmit < SUBMIT_COOLDOWN) {
      setStatus('Espera un momento antes de enviar otro mensaje.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = _('contact.form.send').replace(/[\[\]]/g, '').trim() + '...';
    setStatus('', '');

    try {
      var response = await fetch('https://armpwaiwsulmjnlvgkwi.supabase.co/rest/v1/messages', {
        method: 'POST',
        headers: {
          'apikey': 'sb_publishable_OP6ZKev-oWto07FQPyub5g_YXo77r_I',
          'Authorization': 'Bearer sb_publishable_OP6ZKev-oWto07FQPyub5g_YXo77r_I',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          name: name.replace(/<[^>]*>/g, '').trim(),
          email: email.replace(/<[^>]*>/g, '').trim(),
          message: message.replace(/<[^>]*>/g, '').trim(),
          created_at: new Date().toISOString(),
        }),
      });

      if (response.ok || response.status === 201) {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        form.innerHTML = '<div class="contact__success"><span class="contact__success-icon">&#9670;</span><p>' + _('contact.form.success') + '</p></div>';
      } else {
        throw new Error('Supabase error');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = _('contact.form.send');
      setStatus('Error. Intenta de nuevo.', 'error');
    }
  });

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'contact__form-status' + (type ? ' contact__form-status--' + type : '');
  }
})();
