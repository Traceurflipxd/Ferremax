// Paso 1: Productos simulados (puedes reemplazar por datos de la API luego)
let productos = [
  { id: 1, nombre: 'Martillo', categoria: 'Herramientas', precio: 5000 },
  { id: 2, nombre: 'Cemento', categoria: 'Materiales', precio: 8000 },
];

let categoriasMap = {};

// Paso 2: Mostrar la sección seleccionada
function mostrarSeccion(seccion) {
  const cont = document.getElementById('admin-contenido');
  if (seccion === 'usuarios') {
    cont.innerHTML = `
      <h2>Agregar Usuario</h2>
      <form onsubmit="agregarUsuario(event)">
        <input type="text" id="nuevo-usuario" placeholder="Nombre de usuario" required>
        <input type="password" id="nuevo-pass" placeholder="Contraseña" required>
        <select id="nuevo-tipo">
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
      <div id="mensaje-usuario"></div>
      <div id="usuarios-lista"></div>
    `;
    cargarUsuarios();
  } else if (seccion === 'productos') {
    cont.innerHTML = `
      <h2>Agregar Producto</h2>
      <form onsubmit="agregarProducto(event)">
        <input type="text" id="nuevo-prod-nombre" placeholder="Nombre" required>
        <select id="nuevo-prod-cat" required></select>
        <input type="number" id="nuevo-prod-precio" placeholder="Precio" required>
        <button type="submit">Agregar</button>
      </form>
      <div id="mensaje-producto"></div>
      <div id="productos-lista-admin"></div>
    `;
    cargarCategoriasAdmin();
    mostrarListaProductos();
  } else if (seccion === 'listar') {
    mostrarListaProductos();
  }
}

function cargarUsuarios() {
  fetch('http://127.0.0.1:8000/api/usuarios/')
    .then(response => response.json())
    .then(data => {
      mostrarUsuarios(data);
    })
    .catch(error => {
      document.getElementById('usuarios-lista').innerHTML = '<p style="color:red">Error al cargar usuarios.</p>';
      console.error('Error al cargar usuarios:', error);
    });
}

function mostrarUsuarios(usuarios) {
  if (!usuarios.length) {
    document.getElementById('usuarios-lista').innerHTML = '<p>No hay usuarios registrados.</p>';
    return;
  }
  let html = `<h3>Lista de Usuarios</h3><table><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Tipo</th></tr>`;
  usuarios.forEach(u => {
    html += `<tr>
      <td>${u.id}</td>
      <td>${u.username}</td>
      <td>${u.email || '-'}</td>
      <td>${u.is_staff ? 'Administrador' : 'Cliente'}</td>
    </tr>`;
  });
  html += '</table>';
  document.getElementById('usuarios-lista').innerHTML = html;
}

// Paso 3: Agregar usuario (simulado)
function agregarUsuario(e) {
  e.preventDefault();
  // Aquí deberías llamar a la API para crear usuario
  Swal.fire({
    icon: 'success',
    title: 'Usuario agregado',
    showConfirmButton: false,
    timer: 1500
  });
  document.getElementById('mensaje-usuario').innerText = '';
}

// Paso 4: Agregar producto (simulado)
function cargarCategoriasAdmin() {
  fetch('http://127.0.0.1:8000/api/categoria/')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('nuevo-prod-cat');
      select.innerHTML = '<option value="">Selecciona una categoría</option>';
      categoriasMap = {};
      data.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
        categoriasMap[cat.id] = cat.nombre;
      });
      mostrarListaProductos();
    })
    .catch(error => {
      document.getElementById('mensaje-producto').innerText = 'Error al cargar categorías';
    });
}

function agregarProducto(e) {
  e.preventDefault();
  const nombre = document.getElementById('nuevo-prod-nombre').value;
  const categoria = parseInt(document.getElementById('nuevo-prod-cat').value);
  const precio = parseInt(document.getElementById('nuevo-prod-precio').value);

  if (!categoria) {
    Swal.fire({ icon: 'error', title: 'Selecciona una categoría válida' });
    return;
  }

  fetch('http://127.0.0.1:8000/api/productos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, categoria, precio })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text); });
    }
    return response.json();
  })
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    });
    document.getElementById('mensaje-producto').innerText = '';
    mostrarListaProductos();
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error al agregar producto',
      text: error.message || 'Error desconocido',
    });
  });
}

// Paso 5: Listar y editar productos (simulado)
function mostrarListaProductos() {
  const cont = document.getElementById('productos-lista-admin') || document.getElementById('admin-contenido');
  fetch('http://127.0.0.1:8000/api/productos/')
    .then(response => response.json())
    .then(productos => {
      let html = '<h2>Lista de Productos</h2>';
      if (productos.length === 0) {
        html += '<p>No hay productos.</p>';
      } else {
        html += '<table border="1"><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Editar</th><th>Eliminar</th></tr>';
        productos.forEach((p, idx) => {
          const catNombre = categoriasMap[p.categoria] || p.categoria_nombre || p.categoria;
          html += `<tr>
            <td><input value="${p.nombre}" onchange="editarProducto(${p.id}, 'nombre', this.value)"></td>
            <td><input value="${catNombre}" disabled></td>
            <td><input type="number" value="${p.precio}" onchange="editarProducto(${p.id}, 'precio', this.value)"></td>
            <td><button onclick="guardarEdicion(${p.id})">Guardar</button></td>
            <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
          </tr>`;
        });
        html += '</table>';
      }
      cont.innerHTML = html;
    });
}

// Paso 6: Editar producto (simulado)
function editarProducto(idx, campo, valor) {
  productos[idx][campo] = campo === 'precio' ? parseInt(valor) : valor;
}
function guardarEdicion(idx) {
  // Aquí deberías llamar a la API para guardar cambios
  alert('Producto editado (simulado)');
}
function eliminarProducto(idx) {
  productos.splice(idx, 1);
  mostrarListaProductos();
}

// Hacer funciones accesibles globalmente
window.mostrarSeccion = mostrarSeccion;
window.agregarUsuario = agregarUsuario;
window.agregarProducto = agregarProducto;
window.editarProducto = editarProducto;
window.guardarEdicion = guardarEdicion;
window.eliminarProducto = eliminarProducto; 