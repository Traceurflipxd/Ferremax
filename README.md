# Proyecto Ferremax - Frontend

Este es el frontend de una aplicación web para gestión de productos y categorías de Ferremax.

## Estructura del Proyecto

```
project/
├── Frontend/
│   ├── index.html      # Página principal
│   ├── login.js        # Lógica de autenticación
│   ├── Main.js         # Lógica principal de la aplicación
│   └── style.css       # Estilos CSS
├── server.py           # Servidor HTTP simple
└── README.md           # Este archivo
```

## Requisitos

- Python 3.6 o superior
- Un backend API corriendo en `http://127.0.0.1:8000` o `http://127.0.0.1:8001`

## Cómo Ejecutar el Proyecto

### Opción 1: Usando el servidor Python incluido

1. Abre una terminal en el directorio del proyecto
2. Ejecuta el servidor:
   ```bash
   python server.py
   ```
3. Abre tu navegador y ve a: `http://localhost:8080`

### Opción 2: Usando Python directamente

1. Abre una terminal en el directorio `Frontend`
2. Ejecuta:
   ```bash
   python -m http.server 8080
   ```
3. Abre tu navegador y ve a: `http://localhost:8080`

### Opción 3: Usando Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `Frontend/index.html`
3. Selecciona "Open with Live Server"

## Funcionalidades

- **Login**: Autenticación de trabajadores
- **Gestión de Productos**: Crear nuevos productos con nombre, precio y categoría
- **Gestión de Categorías**: Crear nuevas categorías de productos

## Notas Importantes

- El frontend intenta conectarse a un backend API en `http://127.0.0.1:8000` o `http://127.0.0.1:8001`
- Asegúrate de que el backend esté corriendo antes de usar la aplicación
- Si el backend no está disponible, verás errores en la consola del navegador

## Solución de Problemas

### Error de CORS
Si ves errores de CORS, el servidor Python incluido ya maneja esto automáticamente.

### Backend no disponible
Si el backend no está corriendo, verás errores de conexión. Asegúrate de que tu API esté ejecutándose en el puerto correcto.

### Puerto ocupado
Si el puerto 8080 está ocupado, puedes modificar la variable `PORT` en `server.py` o usar un puerto diferente con el comando de Python. 
