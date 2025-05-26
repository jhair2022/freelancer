function mostrarBreadcrumb(subcategoria = null) {
    const breadcrumb = document.getElementById('breadcrumb-producto');
    breadcrumb.innerHTML = `
        <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
        <li class="breadcrumb-item"><a href="camara-wifi.html">Cámaras</a></li>
        ${subcategoria ? `<li class="breadcrumb-item active" aria-current="page">${capitalizar(subcategoria)}</li>` : ''}
    `;
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function verProducto(id) {
    localStorage.setItem("productoSeleccionado", id);
    window.location.href = "producto.html";
}


fetch('productos.json')
.then(response => response.json())
.then(productos => {
    const contenedor = document.getElementById("productos-container");
    const subcatDiv = document.getElementById("subcategorias");

    const productosAudifonos = productos.filter(p => p.categoria === "camara-wifi");

    // Obtener subcategorías únicas (evita vacíos)
    const subcategorias = [...new Set(productosAudifonos.map(p => p.subcategoria).filter(Boolean))];