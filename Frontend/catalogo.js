// Paso 1: Obtener productos desde la API
let productos = [];

function cargarProductos() {
  fetch('http://127.0.0.1:8000/api/productos/')
    .then(response => response.json())
    .then(data => {
      productos = data;
      llenarCategorias();
      mostrarProductos(productos);
    })
    .catch(error => {
      document.getElementById('productos-lista').innerHTML = '<p style="color:red">Error al cargar productos.</p>';
      console.error('Error al cargar productos:', error);
    });
}

// Paso 2: Llenar el select de categorías automáticamente
function llenarCategorias() {
  const categorias = [...new Set(productos.map(p => p.categoria_nombre || p.categoria))];
  const selectCategoria = document.getElementById('filtro-categoria');
  selectCategoria.innerHTML = '<option value="">Todas</option>';
  categorias.forEach(cat => {
    if (cat) {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      selectCategoria.appendChild(option);
    }
  });
}

// Paso 3: Función para mostrar productos en pantalla
function mostrarProductos(lista) {
  const contenedor = document.getElementById('productos-lista');
  contenedor.innerHTML = '';
  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'producto-item';
    div.innerHTML = `
      <strong>${prod.nombre}</strong> <br>
      Categoría: ${prod.categoria_nombre || prod.categoria} <br>
      Precio: $${prod.precio} <br>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
      <hr>
    `;
    contenedor.appendChild(div);
  });
}

// Paso 4: Filtrar productos por nombre y categoría
function filtrarProductos() {
  const texto = document.getElementById('filtro-busqueda').value.toLowerCase();
  const categoria = document.getElementById('filtro-categoria').value;
  const filtrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(texto);
    const cat = p.categoria_nombre || p.categoria;
    const coincideCategoria = !categoria || cat === categoria;
    return coincideNombre && coincideCategoria;
  });
  mostrarProductos(filtrados);
}

document.getElementById('btn-filtrar').addEventListener('click', filtrarProductos);
document.getElementById('filtro-busqueda').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') filtrarProductos();
});

// Paso 5: Agregar al carrito (igual que antes)
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;
  let carrito = localStorage.getItem('carrito');
  carrito = carrito ? JSON.parse(carrito) : [];
  const idx = carrito.findIndex(item => item.id === idProducto);
  if (idx >= 0) {
    carrito[idx].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('Producto agregado al carrito');
}

// Paso 6: Cargar productos al iniciar la página
cargarProductos(); 