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
                    <div class="card-body">
                        <p class="card-title fw-bold small">${producto.nombre}</p>
                        <p class="text-muted small mb-1">Stock: ${producto.stock}</p>
                        <p class="text-muted small mb-1">Marca: ${producto.marca}</p>
                        <p class="fw-semibold mb-0 text-primary">$${producto.precio_usd.toFixed(2)} <small class="text-muted">(S/ ${producto.precio_pen.toFixed(2)})</small></p>
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
    slidesPerView: 2,
    spaceBetween: 20,
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

