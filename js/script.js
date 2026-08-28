(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function(el){ io.observe(el); });
})();

/* Envio dos formulários. Um form com [data-crm-webhook] posta os dados para o CRM da Orflia
   e mostra sucesso/erro na própria página. Sem o atributo, cai no aviso de revisão — ainda sem
   destino definido (ver PENDENTE nos respectivos .html). */
(function(){
  function showAviso(form, text, tone){
    var box = form.querySelector('.form-aviso');
    if (!box) {
      box = document.createElement('p');
      box.setAttribute('role','status');
      form.appendChild(box);
    }
    box.className = 'form-aviso' + (tone ? ' form-aviso-' + tone : '');
    box.textContent = text;
    box.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  document.querySelectorAll('.form-shell').forEach(function(form){
    var webhook = form.dataset.crmWebhook;

    form.addEventListener('submit', function(ev){
      ev.preventDefault();

      // PENDENTE (interno): confirmar com o Rodrigo (tráfego pago) o Pixel ID definitivo
      // e o nome do evento de conversão de cada formulário.
      var fireLead = function(){
        if (window.fbq) window.fbq('track', form.dataset.fbqEvent || 'Lead');
      };

      if (!webhook) {
        showAviso(form, 'Esta é uma versão de revisão da página. O formulário ainda não está ligado '
          + 'ao destino final, então nada foi enviado. Fale com a escola pelo WhatsApp.');
        fireLead();
        return;
      }

      var data = {};
      new FormData(form).forEach(function(v, k){ data[k] = v; });

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function(r){ return r.json(); })
        .then(function(res){
          if (res && res.ok) {
            showAviso(form, 'Recebemos seu contato! A equipe da Mind Recall fala com você em breve.', 'ok');
            form.reset();
            fireLead();
          } else {
            showAviso(form, 'Não conseguimos enviar agora. Tente de novo em instantes ou fale com '
              + 'a escola pelo WhatsApp.', 'error');
          }
        })
        .catch(function(){
          showAviso(form, 'Não conseguimos enviar agora. Tente de novo em instantes ou fale com '
            + 'a escola pelo WhatsApp.', 'error');
        })
        .finally(function(){
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });
})();
