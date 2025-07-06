function login() {
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  fetch('http://127.0.0.1:8000/api/login-trabajador/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: correo, contraseña: contraseña })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('login').style.display = 'none';
      document.getElementById('menu').style.display = 'block';
    } else {
      return response.json().then(data => {
        throw new Error(data.error || "Error de autenticación");
      });
    }
  })
  .catch(error => {
    document.getElementById('mensaje-error').innerText = error.message;
  });
}

function mostrarFormulario(tipo) {
  document.getElementById('form-producto').style.display = 'none';
  document.getElementById('form-categoria').style.display = 'none';

  if (tipo === 'producto') {
    document.getElementById('form-producto').style.display = 'block';
  } else if (tipo === 'categoria') {
    document.getElementById('form-categoria').style.display = 'block';
  }
}

function crearProducto() {
  const nombre = document.getElementById('nombre-producto').value;
  const precio = document.getElementById('precio-producto').value;

  fetch('http://127.0.0.1:8000/api/productos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio })
  })
  .then(response => response.json())
  .then(data => {
    alert("Producto creado exitosamente.");
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function crearCategoria() {
  const nombre = document.getElementById('nombre-categoria').value;

  fetch('http://127.0.0.1:8000/api/categoria/', {
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