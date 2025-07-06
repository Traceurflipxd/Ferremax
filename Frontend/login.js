function login() {
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  fetch('http://127.0.0.1:8001/api/login-trabajador/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: correo, contraseña: contraseña })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => {
        throw new Error(data.error || "Error de autenticación");
      });
    }
  })
  .then(data => {
    if (data.tipo_usuario === 'admin') {
      window.location.href = 'admin.html';
    } else if (data.tipo_usuario === 'cliente') {
      window.location.href = 'catalogo.html';
    } else {
      document.getElementById('mensaje-error').innerText = 'Tipo de usuario no reconocido.';
    }
  })
  .catch(error => {
    document.getElementById('mensaje-error').innerText = error.message;
  });
}

function mostrarFormulario(tipo) {
  document.getElementById('form-producto').style.display = 'none';

  if (tipo === 'producto') {
    document.getElementById('form-producto').style.display = 'block';
    cargarCategorias();
  }
}

function cargarCategorias() {
  fetch('http://127.0.0.1:8001/api/categoria/')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('categoria-producto');
      select.innerHTML = '<option value="">Selecciona una categoría</option>';
      data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Error al cargar categorías:", error));
}

function crearProducto() {
  const nombre = document.getElementById('nombre-producto').value;
  const precio = parseInt(document.getElementById('precio-producto').value);
  const categoria = parseInt(document.getElementById('categoria-producto').value);

  fetch('http://127.0.0.1:8001/api/productos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombre,
      precio: precio,
      categoria: categoria  // debe ser el ID
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error("Error al crear producto: " + text);
      });
    }
    return response.json();
  })
  .then(data => {
    alert("Producto creado exitosamente");
  })
  .catch(error => {
    console.error(error);
    alert("Error: " + error.message);
  });
}
function crearCategoria() {
  const nombre = document.getElementById('nombre-categoria').value;

  fetch('http://127.0.0.1:8001/api/categoria/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
  .then(response => response.json())
  .then(data => {
    alert("Categoría creada exitosamente.");
  })
  .catch(error => {
    console.error("Error:", error);
  });
}