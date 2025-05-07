function mostrarBreadcrumb(subcategoria = null) {
    const breadcrumb = document.getElementById('breadcrumb-producto');
    breadcrumb.innerHTML = `
        <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
        <li class="breadcrumb-item"><a href="parlantes.html">parlantes</a></li>
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
