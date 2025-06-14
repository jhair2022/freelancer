const productoId = localStorage.getItem('productoSeleccionado');

fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        const producto = productos.find(p => p.id == productoId);

        if (producto) {
            const breadcrumb = document.getElementById('breadcrumb-producto');
            const categoriaLinks = {
                "audifonos": "audifonos.html",
                "área computo": "computo.html",
                "cargador": "cargadores.html",
                "parlantes": "parlantes.html",
            };

            const categoriaURL = categoriaLinks[producto.categoria] || "#";

            breadcrumb.innerHTML = `
            <li class="breadcrumb-item">
                <a href="index.html"><i class="bi bi-house-door-fill"></i></a>
            </li>
            <li class="breadcrumb-item">
                <a href="${categoriaURL}">${producto.categoria}</a>
            </li>
            `;

            // Generar enlace de WhatsApp con el nombre del producto
            const mensaje = `Hola, estoy interesado en comprar este producto: ${producto.nombre}`;
            const telefono = '51948571556'; // Reemplaza con tu número (sin +)
            const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            document.getElementById('btn-whatsapp').href = enlace;


            // Mostrar la imagen principal
            document.getElementById('imagen-principal').src = producto.imagen;
            document.getElementById('imagen-principal').alt = producto.nombre;

           // Mostrar miniaturas (escritorio) y carrusel (móvil)
            const galeria = document.getElementById('galeria-imagenes');
            const carruselInner = document.getElementById('carousel-inner');
            const indicadores = document.getElementById('carousel-indicators'); 
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

                // Indicadores del carrusel móvil
                const boton = document.createElement("button");
                boton.type = "button";
                boton.setAttribute("data-bs-target", "#carouselMobile");
                boton.setAttribute("data-bs-slide-to", index);
                boton.setAttribute("aria-label", `Slide ${index + 1}`);
                if (index === 0) {
                    boton.classList.add("active");
                    boton.setAttribute("aria-current", "true");
                }
                indicadores.appendChild(boton);
            });
            // Otros datos
            document.getElementById('nombre-producto').textContent = producto.nombre;
            document.getElementById('descripcion-producto').textContent = producto.descripcion;
            document.getElementById('precio-anterior').textContent = `S/ ${parseFloat(producto.precioAnterior).toFixed(2)}`;
            document.getElementById('precio-actual').textContent = `S/ ${parseFloat(producto.precio_pen).toFixed(2)}`;
            //document.getElementById('modelo-producto').textContent = producto.modelo;
            //document.getElementById('marca-producto').textContent = producto.marca;
            //document.getElementById('stock-producto').textContent = producto.stock;
            //document.getElementById('precio-producto').innerHTML = `S/ ${producto.precio_pen.toFixed(2)}`;
            document.getElementById('descripcion-producto').textContent = producto.descripcion || "";

            const ahorro = parseFloat(producto.precioAnterior) - parseFloat(producto.precio_pen);

            if (ahorro > 0) {
            document.getElementById('ahorro-producto').textContent = `Ahorra S/ ${ahorro.toFixed(2)}`;
            } else {
            document.getElementById('ahorro-producto').style.display = 'none'; // Oculta si no hay descuento
            }

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





