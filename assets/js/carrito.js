document.addEventListener('DOMContentLoaded', () => {
    const carritoContenido = document.getElementById('carrito-contenido');
    if (carritoContenido) {
        cargarCarrito();
    }
});

// Función para cargar productos en el carrito
function cargarCarrito() {
    
    const carritoContenido = document.getElementById('carrito-contenido');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Si no existen los elementos, no hacemos nada
    if (!carritoContenido || !subtotalCarrito || !totalCarrito) {
        console.warn('Elementos del carrito no encontrados en esta página.');
        return;
    }
    if (!carritoContenido) return;
    carritoContenido.innerHTML = '';

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>No hay productos en el carrito.</p>';
        subtotalCarrito.textContent = 'S/ 0.00';
        totalCarrito.textContent = 'S/ 0.00';
        return;
    }

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-3', 'border-bottom', 'pb-2');

        subtotal += producto.precio_pen * producto.cantidad;

        item.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${producto.imagen}" class="img-producto" alt="${producto.nombre}" style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                    <p class="mb-1 fw-bold">${producto.nombre}</p>
                    <small class="text-muted">Cantidad: ${producto.cantidad}</small>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <p class="mb-0 fw-semibold">S/ ${(producto.precio_pen * producto.cantidad).toFixed(2)}</p>
                <button onclick="eliminarProducto(${producto.id})" class="btn btn-sm btn-danger"><i class="bi bi-x-lg"></i></button>
            </div>
        `;

        carritoContenido.appendChild(item);
    });

    subtotalCarrito.textContent = `S/ ${subtotal.toFixed(2)}`;
    totalCarrito.textContent = `S/ ${subtotal.toFixed(2)}`;
}

// Función para eliminar un solo producto
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(item => item.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    cargarCarrito();
}

// Función para actualizar la cantidad de productos
function actualizarCantidad(id, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el producto que se está actualizando
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad = parseInt(cantidad); // Actualizar la cantidad
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito(); // Recargar el carrito
    }
}


function enviarPorWhatsapp(event) {
    event.preventDefault(); // Detiene el comportamiento por defecto del enlace

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola, quiero hacer un pedido:%0A";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio_pen * item.cantidad;
        total += subtotal;
        mensaje += `• ${item.cantidad} x ${item.nombre} - S/ ${subtotal.toFixed(2)}%0A`;
    });

    mensaje += `%0ATotal: S/ ${total.toFixed(2)}`;

    const numero = "51948571556";
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank"); // Abre WhatsApp en nueva pestaña
}



