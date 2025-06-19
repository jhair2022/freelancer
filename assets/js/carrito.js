document.addEventListener('DOMContentLoaded', () => {
    const carritoContenido = document.getElementById('carrito-contenido');
    if (carritoContenido) {
        cargarCarrito();
    }
});

// Función para ENVIAR PEDIDO A WSP
function enviarPorWhatsapp(event) {
    event.preventDefault();

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
    window.open(url, "_blank");
}


// Función para cargar productos en el carrito
function cargarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    if (!carritoContenido || !subtotalCarrito || !totalCarrito) return;

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
        item.classList.add('d-flex', 'flex-row', 'gap-3', 'mb-4', 'rounded', 'p-3', 'bg-light', 'align-items-start', 'w-100', 'flex-wrap');

        subtotal += producto.precio_pen * producto.cantidad;

        item.innerHTML = `
            <!-- Imagen -->
            <div style="width: 100px; flex-shrink: 0;">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded" style="width: 50px; height: 50px; object-fit: cover;">
            </div>

            <!-- Detalles -->
            <div class="flex-grow-1 d-flex flex-column justify-content-between w-100">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <p class="fw-semibold mb-1">${producto.nombre}</p>
                    </div>
                    <button onclick="eliminarProducto(${producto.id})" class="btn btn-sm btn-outline-dark"><i class="bi bi-x-lg"></i></button>
                </div>

                <!-- Controles y precios -->
                <div class="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                    <!-- Controles -->
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                        <span class="fw-semibold">${producto.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                    </div>

                    <!-- Precio -->
                    <div class="text-end">
                        ${producto.precioAnterior ? `<small class="text-muted text-decoration-line-through d-block">S/ ${producto.precioAnterior.toFixed(2)}</small>` : ''}
                        <span class="fw-bold text-success">S/ ${(producto.precio_pen * producto.cantidad).toFixed(2)}</span>
                    </div>
                </div>
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

//función para manejar los botones + y -
function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(p => p.id === id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad < 1) producto.cantidad = 1;

        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }
}








