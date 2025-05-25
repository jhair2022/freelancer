const productoId = localStorage.getItem('productoSeleccionado');

fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        const producto = productos.find(p => p.id == productoId);

        if (producto) {

            
            const breadcrumb = document.getElementById('breadcrumb-producto');

            const categoriaLinks = {
                "audifonos": "audifonos.html",
                "cargador": "cargadores.html",
                "parlantes": "parlantes.html",
            };

            const categoriaURL = categoriaLinks[producto.categoria] || "#";

            breadcrumb.innerHTML = `
                <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
                <li class="breadcrumb-item"><a href="${categoriaURL}">${producto.categoria}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${producto.nombre}</li>
            `;


            // Mostrar la imagen principal
            document.getElementById('imagen-principal').src = producto.imagen;
            document.getElementById('imagen-principal').alt = producto.nombre;

           // Mostrar miniaturas (escritorio) y carrusel (móvil)
            const galeria = document.getElementById('galeria-imagenes');
            const carruselInner = document.getElementById('carousel-inner');
            galeria.innerHTML = '';
            carruselInner.innerHTML = '';

            // Lista combinada: imagen principal + adicionales
            const todasLasImagenes = [producto.imagen, ...(producto.imagenes_adicionales || [])];

            todasLasImagenes.forEach((img, index) => {
                // Miniatura escritorio
                galeria.innerHTML += `
                    <img src="${img}" class="img-thumbnail" style="width: 90px; cursor:pointer;" onclick="cambiarImagen('${img}')">
                `;

                // Carrusel móvil
                carruselInner.innerHTML += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="">
                    </div>
                `;
            });
            // Otros datos
            document.getElementById('nombre-producto').textContent = producto.nombre;
            document.getElementById('modelo-producto').textContent = producto.modelo;
            document.getElementById('marca-producto').textContent = producto.marca;
            document.getElementById('stock-producto').textContent = producto.stock;
            document.getElementById('precio-producto').innerHTML = `$${producto.precio_usd.toFixed(2)} <small class="text-muted">(S/ ${producto.precio_pen.toFixed(2)})</small>`;
            document.getElementById('descripcion-producto').textContent = producto.descripcion || "";
            // Información adicional CARACTERISTICAS PRINCIPALES
            const infoLista = document.getElementById('info-adicional');
            infoLista.innerHTML = '';

            if (producto.info_adicional) {
            let contenido = '<div class="row">';
            for (const clave in producto.info_adicional) {
                contenido += `
                <div class="col-12 col-md-6 mb-3">
                    <div class="d-flex align-items-center border rounded p-2 bg-light h-100">
                    <div class="me-3 text-dark">
                        <i class="bi bi-info-circle-fill fs-4"></i>
                    </div>
                    <div>
                        <p class="mb-0"><strong>${clave}:</strong> ${producto.info_adicional[clave]}</p>
                    </div>
                    </div>
                </div>
                `;
            }
            contenido += '</div>';
            infoLista.innerHTML = contenido;
            } else {
            infoLista.innerHTML = "<p>Sin información adicional.</p>";
            }

           
                        
            // AQUÍ se configura el botón
            document.getElementById('btn-agregar-carrito').addEventListener('click', () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
                const cantidadSeleccionada = parseInt(document.getElementById('cantidad-producto').value) || 1;
            
                const productoExistente = carrito.find(item => item.id == producto.id);
            
                if (productoExistente) {
                    productoExistente.cantidad += cantidadSeleccionada;
                } else {
                    carrito.push({
                        id: producto.id,
                        nombre: producto.nombre,
                        precio_usd: producto.precio_usd,
                        precio_pen: producto.precio_pen,
                        imagen: producto.imagen,
                        cantidad: cantidadSeleccionada
                    });
                }
            
                localStorage.setItem('carrito', JSON.stringify(carrito));
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto agregado!',
                    text: 'El producto se añadió correctamente.',
                    confirmButtonText: 'Aceptar'
                  });
            
                actualizarCarrito(); // Esta función debe existir en otro archivo para actualizar el contador
            });
            

        } else {
            document.getElementById('detalle-producto').innerHTML = "<p>Producto no encontrado.</p>";
        }
    })
    .catch(error => console.error('Error cargando el producto:', error));


// Función para cambiar la imagen principal
function cambiarImagen(ruta) {
    document.getElementById('imagen-principal').src = ruta;
}

// Función para cambiar la Cantidad
function cambiarCantidad(cambio) {
    const inputCantidad = document.getElementById('cantidad-producto');
    let cantidadActual = parseInt(inputCantidad.value) || 1;
    cantidadActual += cambio;

    if (cantidadActual < 1) {
        cantidadActual = 1; // No permitir menos de 1
    }

    inputCantidad.value = cantidadActual;
}


