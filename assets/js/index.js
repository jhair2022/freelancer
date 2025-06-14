//Función para entrar a un producto
function verProducto(id) {
    localStorage.setItem("productoSeleccionado", id);
    window.location.href = "producto.html";
}



fetch('productos.json')
.then(response => response.json())
.then(productos => {
    const contenedor = document.getElementById("productos-container");

    // Filtramos solo los productos destacados
    productos.filter(producto => producto.destacado === true)
    .forEach(producto => {
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
                      </div>
                </div>
            </div>
        `;
    });
})
.catch(error => {
    console.error("Error cargando los productos:", error);
});


var swiper = new Swiper(".brandSwiper", {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    spaceBetween: 20,
    slidesPerView: 2,
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      }
    }
  });

