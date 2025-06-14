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
                        <div class="card-body text-center">
                            <p class="card-title fw-semibold small mb-1">${producto.nombre}</p>
                            <p class="small mb-1">
                            Stock: <span class="${producto.stock === 'Disponible' ? 'text-success' : 'text-danger'}">${producto.stock}</span>
                            </p>
                            <p class="mb-0" style="font-size: 0.9rem;">
                            <span class="text-muted text-decoration-line-through me-2 small">
                                S/ ${producto.precioAnterior.toFixed(2)}
                            </span>
                            <span class="text-dark fw-bold small">
                                S/ ${producto.precio_pen.toFixed(2)}
                            </span>
                            </p>

                            <button class="btn btn-sm btn-dark mt-2 w-100" onclick="agregarDesdeCatalogo(event, ${producto.id})">
                                Agregar al carrito
                            </button>
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

    function agregarDesdeCatalogo(event, idProducto) {
        event.stopPropagation(); // 👈 Esto evita que se active verProducto()

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const productoSeleccionado = productos.find(p => p.id === idProducto);
        if (!productoSeleccionado) return;

        const productoExistente = carrito.find(item => item.id === idProducto);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio_usd: productoSeleccionado.precio_usd,
            precio_pen: productoSeleccionado.precio_pen,
            imagen: productoSeleccionado.imagen,
            cantidad: 1
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: 'El producto se añadió correctamente.',
            confirmButtonText: 'Aceptar'
        });

        if (typeof actualizarCarrito === 'function') {
            actualizarCarrito();
        }
    }



    
})
.catch(error => {
    console.error("Error cargando los productos:", error);
});

