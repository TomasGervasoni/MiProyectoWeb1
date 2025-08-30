document.addEventListener("DOMContentLoaded", async () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const listaCarritoDiv = document.querySelector('.lista-carrito');
  const totalSpan = document.getElementById('total');

  if (carrito.length === 0) {
    listaCarritoDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalSpan.textContent = '0';
  } else {
    let total = 0;
    carrito.forEach(item => {
      const div = document.createElement('div');
      div.className = 'carrito-item';
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" />
        <div class="detalle">
          <p><strong>${item.nombre}</strong></p>
          <p>Precio: $${item.precio}</p>
        </div>
      `;
      listaCarritoDiv.appendChild(div);
      total += item.precio;
    });
    totalSpan.textContent = total;
  }

  // Mostrar/ocultar campos delivery - Envío y entrega
  const tipoEnvioSelect = document.getElementById('tipo-envio');
  const datosDeliveryDiv = document.getElementById('datos-delivery');
  tipoEnvioSelect.addEventListener('change', () => {
    if (tipoEnvioSelect.value === 'delivery') {
        datosDeliveryDiv.classList.remove('hidden');
        document
          .getElementById('direccion')
          .setAttribute('required', 'required');
    } else {
      datosDeliveryDiv.classList.add('hidden');
      document.getElementById('direccion').removeAttribute('required');
    }
    // Siempre pedir el nombre del receptor
    document.getElementById('nombre-receptor').setAttribute('required', 'required');
  });
  // Confirmar compra
  const form = document.getElementById('form-compra');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Obtener datos del formulario
    const tipoEnvio = document.getElementById("tipo-envio").value;
    const tipoPago = document.getElementById("tipo-pago").value;
    let receptor = document.getElementById("nombre-receptor").value.trim();
    let direccion = 
      tipoEnvio === "delivery"
        ? document.getElementById("direccion").calue.trim()
        : "No apliica";

    // Construir el mensaje para whattsapp
    let mensaje = `Pedido de: ${receptor}\n`;
    mensaje += `Dirección: ${direccion}\n\n`;

    mensaje += `🧾 Pedido:\n`;
    carrito.forEach(item => {
      mensaje += `- ${item.nombre} - $${item.precio}\n`;
    });

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    mensaje += `\n💰 Total: $${total}\n`;
    mensaje += `\n🪙 Forma de pago: ${tipoPago}\n`;

    // Link de WhatsApp
    const numeroWhatsApp = "+543521453400"; // ← Cambialo por el número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    alert('Compra confirmada. ¡Gracias por elegir FrutaBar!');
    localStorage.removeItem('carrito');

    // Abrir WhatsApp y redirigir al index
    window.open(urlWhatsApp, '_blank');
    window.location.href = 'index.html'; // cambie estas lineas a revisar
  });
  
  const btnVolver = document.getElementById("btn-volver-menu");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      localStorage.removeItem('carrito'); // Asegura que también se limpie
      window.location.href = "index.html";
    });   
  }
  // BORRAR CARRITO AL SALIR DE finalizarcompra.html
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('carrito');
  });
});
