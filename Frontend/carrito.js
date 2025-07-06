// Paso 1: Leer el carrito desde localStorage (o iniciar vacío)
function obtenerCarrito() {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

// Paso 2: Guardar el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Paso 3: Mostrar los productos del carrito en pantalla
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById('carrito-lista');
  contenedor.innerHTML = '';
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }
  let total = 0;
  carrito.forEach((item, idx) => {
    total += item.precio * item.cantidad;
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <strong>${item.nombre}</strong> <br>
      Precio: $${item.precio} <br>
      Cantidad: <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${idx}, this.value)"> <br>
      <button onclick="eliminarDelCarrito(${idx})">Eliminar</button>
      <hr>
    `;
    contenedor.appendChild(div);
  });
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  contenedor.appendChild(totalDiv);
}

// Paso 4: Cambiar cantidad de un producto
function cambiarCantidad(idx, nuevaCantidad) {
  const carrito = obtenerCarrito();
  carrito[idx].cantidad = parseInt(nuevaCantidad);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// Paso 5: Eliminar producto del carrito
function eliminarDelCarrito(idx) {
  const carrito = obtenerCarrito();
  carrito.splice(idx, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// Paso 6: Simular compra
function comprar() {
  alert('¡Compra realizada con éxito! (simulado)');
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.getElementById('btn-comprar').addEventListener('click', comprar);

// Mostrar el carrito al cargar la página
mostrarCarrito();

// Hacer las funciones accesibles globalmente
window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito; 