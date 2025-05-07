// breadcrumb.js
const breadcrumb = document.getElementById('breadcrumb-producto');
if (breadcrumb) {
  const path = window.location.pathname;

  if (path.includes("audifonos.html")) {
    breadcrumb.innerHTML = `
      <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
      <li class="breadcrumb-item active" aria-current="page">Audífonos</li>
    `;
  } else if (path.includes("cargadores.html")) {
    breadcrumb.innerHTML = `
      <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
      <li class="breadcrumb-item active" aria-current="page">Cargadores</li>
    `;
  } else if (path.includes("parlantes.html")) {
    breadcrumb.innerHTML = `
      <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
      <li class="breadcrumb-item active" aria-current="page">Parlantes</li>
    `;
  }
  
  // Agrega más según necesites
}
