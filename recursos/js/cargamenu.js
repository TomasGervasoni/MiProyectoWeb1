import { agregarAlCarrito } from './funciones.js';

function cargarMenu(productos) {
  productos.forEach(prod => {
    const art = document.createElement("article");
    art.classList.add("producto");
    art.dataset.id = prod.categoria + prod.id;

    art.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button class="btn-vermas" id="vermas-${prod.id}">Ver más</button>
    `;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar";
    botonAgregar.classList.add("btn-agregar");
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(prod.nombre, prod.precio, prod.imagen);
    });
    art.appendChild(botonAgregar);

    const contenedorCategoria = document.getElementById(`contenedor-${prod.categoria}`);
    if (contenedorCategoria) {
      contenedorCategoria.appendChild(art);
    }

    const dialog = document.createElement("dialog");
    dialog.id = `popup-${prod.id}`;
    dialog.innerHTML = `
      <img src="${prod.imagen}" width="100%">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <b>$${prod.precio}</b><br><br>
      <button class="btn-cerrar-popup">Cerrar</button>
      <button class="btn-agregar-popup">Agregar</button>
    `;
    document.body.appendChild(dialog);

    document.getElementById(`vermas-${prod.id}`).addEventListener("click", () => dialog.showModal());
    dialog.querySelector(".btn-cerrar-popup").addEventListener("click", () => dialog.close());
    dialog.querySelector(".btn-agregar-popup").addEventListener("click", () => {
      agregarAlCarrito(prod.nombre, prod.precio, prod.imagen);
      dialog.close();
    });
  });
}

export { cargarMenu };
