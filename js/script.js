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

/* Versão de revisão: o formulário ainda não tem destino.
   Sem isto o envio falharia em silêncio e o lead sumiria.
   REMOVER este bloco quando o backend/WhatsApp estiver ligado. */
(function(){
  var form = document.querySelector('.form-shell');
  if (!form) return;
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var box = document.getElementById('form-aviso');
    if (!box) {
      box = document.createElement('p');
      box.id = 'form-aviso';
      box.setAttribute('role','status');
      box.style.cssText = 'margin:1rem 0 0;padding:.9rem 1rem;border:1px solid rgba(201,162,39,.5);'
        + 'border-radius:2px;background:rgba(201,162,39,.1);color:#F0D98C;font-size:.9rem;line-height:1.55';
      form.appendChild(box);
    }
    box.textContent = 'Esta é uma versão de revisão da página. O formulário ainda não está ligado '
      + 'ao destino final, então nada foi enviado. Fale com a escola pelo WhatsApp.';
    box.scrollIntoView({ behavior:'smooth', block:'center' });
  });
})();
