function mostrarBreadcrumb(subcategoria = null) {
    const breadcrumb = document.getElementById('breadcrumb-producto');
    breadcrumb.innerHTML = `
        <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
        <li class="breadcrumb-item"><a href="camara-wifi.html">cámara wifi</a></li>
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

    const productosAudifonos = productos.filter(p => p.categoria === "cámara wifi");

    // Obtener subcategorías únicas (evita vacíos)
    const subcategorias = [...new Set(productosAudifonos.map(p => p.subcategoria).filter(Boolean))];

    // Mostrar botones de subcategorías
    subcatDiv.innerHTML = subcategorias.map(sub => `
        <button class="btn btn-outline-primary btn-sm me-2 mb-2" onclick="filtrarPorSubcategoria('${sub}')">${capitalizar(sub)}</button>
    `).join('');

    // Mostrar todos los productos al inicio
    mostrarProductos(productosAudifonos);
    mostrarBreadcrumb(); // Breadcrumb sin subcategoría al inicio
 // Función para mostrar productos
    function mostrarProductos(lista) {
        contenedor.innerHTML = "";
        lista.forEach(producto => {
            contenedor.innerHTML += `
                <div class="col">
                    <div class="card h-100" onclick="verProducto(${producto.id})" style="cursor:pointer;">
                        <div class="position-relative">
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <span class="badge bg-success position-absolute top-0 start-0 m-2">Nuevo</span>
                        </div>
                        <div class="card-body">
                            <p class="card-title fw-bold small">${producto.nombre}</p>
                            <p class="small mb-1">
                            Stock: <span class="${producto.stock === 'Disponible' ? 'text-success' : 'text-danger'}">${producto.stock}</span>
                            </p>                             <p class="text-muted small mb-1">Marca: ${producto.marca}</p>
                            <p class="fw-semibold mb-0 text-primary">$${producto.precio_usd.toFixed(2)} <small class="text-muted">(S/ ${producto.precio_pen.toFixed(2)})</small></p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Función para filtrar por subcategoría
    window.filtrarPorSubcategoria = function(subcategoria) {
        const filtrados = productosAudifonos.filter(p => p.subcategoria === subcategoria);
        mostrarProductos(filtrados);
        mostrarBreadcrumb(subcategoria); // Breadcrumb con subcategoría
    };

    
})
.catch(error => {
    console.error("Error cargando los productos:", error);
});