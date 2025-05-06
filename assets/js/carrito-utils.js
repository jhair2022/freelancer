// Función para actualizar el badge del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badgeMovil = document.getElementById('carrito-badge-movil');
    const badgeEscritorio = document.getElementById('carrito-badge-escritorio');

    if (badgeMovil) badgeMovil.textContent = totalItems;
    if (badgeEscritorio) badgeEscritorio.textContent = totalItems;
}

// Ejecutar automáticamente cuando cargue la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);