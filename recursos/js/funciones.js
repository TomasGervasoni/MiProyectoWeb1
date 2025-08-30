let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// funcion para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
  carrito.push({ nombre, precio, imagen });
  localStorage.setItem('carrito', JSON.stringify(carrito)); // ✅ guardar
  console.log("Producto agregado:", nombre); // para test
  actualizarCarrito();
}

// funcion para eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}


// funcion actualizar carrito IMPORTANTE
function actualizarCarrito() {
  const lista = document.querySelector(".lista-carrito");
  const totalTexto = document.getElementById("total");
  const btnFinalizar = document.querySelector(".btn-finalizar-compra");
  const mensajeVacio = document.getElementById("mensaje-vacio");
  
  if (!lista) return; // Evita errores si estás en otra página

  lista.innerHTML = ""; //

  let total = 0;
  if (carrito.length === 0) {
    // ✅ Carrito vacío
    totalTexto && (totalTexto.style.display = "none");
    btnFinalizar && (btnFinalizar.style.display = "none");
    mensajeVacio && (mensajeVacio.style.display = "block");
  } else {
    // ✅ Mostrar productos
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      //Esta linea consulta si está en la pestaña de finalizar compra
      const esFinalizarCompra = window.location.pathname.includes('finalizarcompra.html');
      li.innerHTML = esFinalizarCompra //y este es un condicional
      //parecido a if y else pero este es un operador ternario
        ? `
            <img src="${item.imagen}" alt="${item.nombre}" width="40">
            ${item.nombre} - $${item.precio}
          `
        : `
            <button class="btn-eliminar">❌</button>
            <img src="${item.imagen}" alt="${item.nombre}" width="40">
            ${item.nombre} - $${item.precio}
          `;
      li.querySelector(".btn-eliminar")?.addEventListener("click", () => {
        eliminarDelCarrito(index);
        // actualizarCarrito();
      });  
      lista.appendChild(li);
      total += item.precio;
    });  

    totalTexto.textContent = "Total: $" + total;
    totalTexto.style.display = "block";
    btnFinalizar && (btnFinalizar.style.display = "block");
    mensajeVacio && (mensajeVacio.style.display = "none");
    }
  // Guardar el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


// funcion filtrarProductos
function filtrarProductos(categoria) {
  const articulos = document.querySelectorAll(".producto");
  
  const secciones = {
    pizza: document.getElementById("seccion-pizzas"),
    hambur: document.getElementById("seccion-hamburguesas"),
    trago: document.getElementById("seccion-tragos")
  };

  // Mostrar u ocultar productos
  articulos.forEach(art => {
    if (categoria === 'todas' || art.dataset.id.startsWith(categoria)) {
      art.style.display = "inline-block";//recuperar info de style
    } else {
      art.style.display = "none";
    }
  });

  // Mostrar u ocultar secciones completas
  Object.entries(secciones).forEach(([clave, seccion]) => {
    const productosVisibles = seccion.querySelectorAll(".producto:not([style*='display: none'])");
    if (categoria === 'todas' || clave === categoria) {
      seccion.style.display = productosVisibles.length > 0 ? "block" : "none";
    } else {
      seccion.style.display = "none";
    }
  });
}  //============================= arreglar filtrar productos fin


// funcion para el btn Ver Carrito
function activarBotonCarrito() {
  const toggleBtn = document.getElementById("toggle-carrito");
  const carritoAside = document.querySelector(".carrito-lateral");
  const cerrarBtn = document.getElementById("cerrar-carrito");

  if (toggleBtn && carritoAside && cerrarBtn) {
    toggleBtn.addEventListener("click", () => {
      carritoAside.classList.remove("carrito-hidden"); // Mostrar carrito
      toggleBtn.style.display = "none"; // Ocultar botón
    });

    cerrarBtn.addEventListener("click", () => {
      carritoAside.classList.add("carrito-hidden"); // Ocultar carrito
      toggleBtn.style.display = "block"; // Mostrar botón
    });
  }
}

export { 
  agregarAlCarrito,
  actualizarCarrito,
  filtrarProductos,
  activarBotonCarrito   
    };