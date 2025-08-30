// import productos from './productos.json';
import {
    actualizarCarrito,
    filtrarProductos,
    activarBotonCarrito
} from './funciones.js';

import { cargarMenu } from './cargamenu.js';

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("./recursos/Productos/productos.json");
    const productos = await response.json();

    cargarMenu(productos); // ← Ahora la lógica está en cargarmenu.js

    // conectamos los filtros despues de cargar los productos
    const botonesFiltro = document.querySelectorAll('#filtros button');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
        const categoria = boton.getAttribute('data-categoria');
        filtrarProductos(categoria);
        });
    });
    //llamamos a la funcion para actualizar el carrito
    actualizarCarrito();
    // esto solo activa el boton de ver carrito
    activarBotonCarrito();
  
    const btnFinalizar = document.querySelector(".btn-finalizar-compra");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
        // Redirigir a la página de finalizar compra
        window.location.href = "finalizarcompra.html";
        });
    }
});
