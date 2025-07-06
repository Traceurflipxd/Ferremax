#!/usr/bin/env python3
"""
Servidor HTTP simple para servir los archivos del frontend
"""
import http.server
import socketserver
import os
import sys

# Configuración del servidor
PORT = 8080
DIRECTORY = "Frontend"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers CORS para permitir peticiones desde el frontend
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Cambiar al directorio del frontend
    if not os.path.exists(DIRECTORY):
        print(f"Error: El directorio '{DIRECTORY}' no existe.")
        sys.exit(1)
    
    os.chdir(DIRECTORY)
    
    # Crear el servidor
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Servidor iniciado en http://localhost:{PORT}")
        print(f"Sirviendo archivos desde el directorio: {DIRECTORY}")
        print("Presiona Ctrl+C para detener el servidor")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")

if __name__ == "__main__":
    main() 