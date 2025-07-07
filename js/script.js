
function actualizarContador(id, max) {
  const el = document.getElementById(id);
  const contador = document.getElementById(id + '-contador');
  if (el && contador) {
    const restante = max - el.value.length;
    contador.textContent = `${restante} caracteres restantes`;
  }
}


let ubicacionTexto = '';

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar separador con animación
  document.querySelector('.separator')?.classList.add('visible');

  // Animación de aparición para secciones
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  faders.forEach(f => observer.observe(f));

  // Botones fijos al hacer scroll
  const heroButtons = document.querySelector('.hero-buttons');
  const heroHeight = document.querySelector('.hero').offsetHeight;
  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight) {
      document.body.classList.add('scroll-mode');
      heroButtons.classList.add('fixed');
    } else {
      heroButtons.classList.remove('fixed');
      document.body.classList.remove('scroll-mode');
    }
  });

  // Modal “Sobre Nosotros”
  const btnSobre = document.querySelector('.btn-sobre');
  const modalSobre = document.getElementById('modal-sobre');
  const modalCloseSobre = modalSobre?.querySelector('.modal-close');
  if (btnSobre && modalSobre && modalCloseSobre) {
    btnSobre.addEventListener('click', e => {
      e.preventDefault();
      modalSobre.classList.add('active');
      document.body.classList.add('modal-active');
    });
    modalCloseSobre.addEventListener('click', () => {
      modalSobre.classList.remove('active');
      document.body.classList.remove('modal-active');
    });
  }

  // Modal “Contacto”
  const btnContacto = document.querySelector('.btn-contacto');
  const modalContacto = document.getElementById('modal-contacto');
  const modalCloseContacto = modalContacto?.querySelector('.modal-close');
  if (btnContacto && modalContacto && modalCloseContacto) {
    btnContacto.addEventListener('click', e => {
      e.preventDefault();
      modalContacto.classList.add('active');
      document.body.classList.add('modal-active');
    });
    modalCloseContacto.addEventListener('click', () => {
      modalContacto.classList.remove('active');
      document.body.classList.remove('modal-active');
    });
  }

  
  const btnPedido = document.querySelector('.btn-pedido');
  const modalPedido = document.getElementById('modal-pedido');
  const modalClosePedido = modalPedido?.querySelector('.modal-close');
  if (btnPedido && modalPedido && modalClosePedido) {
    btnPedido.addEventListener('click', e => {
      e.preventDefault();
      modalPedido.classList.add('active');
      document.body.classList.add('modal-active');
    });
    modalClosePedido.addEventListener('click', () => {
      modalPedido.classList.remove('active');
      document.body.classList.remove('modal-active');
    });
  }

  document.querySelectorAll('.pedido-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pedido-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.tipo;
      const info = {
        Express: 'Empaque en bolsa kraft para consumo inmediato.',
        Eventos: 'Empaque elegante en caja para celebraciones.',
        Masas: 'Croissants crudos listos para hornear.',
        Muestras: 'Paquete de muestra con varios sabores.'
      };
      document.getElementById('pedido-info').innerText = info[tipo] || 'Selecciona un tipo de pedido.';
    });
  });

  document.getElementById('pedido-enviar').addEventListener('click', () => {
    const nombre = document.getElementById('pedido-nombre').value.trim();
    const email = document.getElementById('pedido-email').value.trim();
    const direccion = document.getElementById('pedido-direccion').value.trim();
    const detalle = document.getElementById('pedido-info').innerText;
    const mensaje = encodeURIComponent(`¡Hola! quiero hacer un pedido:\n\n   Ubicación: ${ubicacionTexto || 'No enviada'}\n\n   Nombre: ${nombre}.\n   Tipo: ${detalle}\n   Correo: ${email}.\n   Dirección: ${direccion}.`);
    
    const mensajePedido = document.getElementById('pedido-mensaje').value.trim();
    const tipoSeleccionado = document.querySelector('.pedido-option.selected');

    if (!mensajePedido) {
      alert('Por favor escribe los detalles del pedido en el campo de texto.');
      return;
    }
    if (!tipoSeleccionado) {
      alert('Por favor selecciona un tipo de pedido.');
      return;
    }
    if (!nombre || !direccion) {
      alert('Por favor completa los campos obligatorios: Nombre y Dirección.');
      return;
    }
    window.open(`https://wa.me/573213275783?text=${mensaje}`, '_blank');
    
  });

  // Nuevos modales individuales
  document.querySelectorAll('.croissant-item').forEach(item => {
    item.addEventListener('click', () => {
      const modalId = item.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-active');
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      modal.classList.remove('active');
      document.body.classList.remove('modal-active');
    });
  });
});
