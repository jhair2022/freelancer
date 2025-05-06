// Función para actualizar el badge del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badge = document.getElementById('carrito-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// Ejecutar automáticamente cuando cargue la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);