function mostrarBreadcrumb(subcategoria = null) {
    const breadcrumb = document.getElementById('breadcrumb-producto');
    breadcrumb.innerHTML = `
        <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
        <li class="breadcrumb-item"><a href="audifonos.html">audifonos</a></li>
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

    const productosAudifonos = productos.filter(p => p.categoria === "audifonos");

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
                            </p>
                            <p class="mb-0">
                                <span class="text-muted text-decoration-line-through me-2 small">
                                    S/ ${producto.precio_anterior.toFixed(2)}
                                </span>
                                
                                <span class="fw-bold text-dark">
                                    S/ ${producto.precio_pen.toFixed(2)}
                                </span>
                            </p>
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