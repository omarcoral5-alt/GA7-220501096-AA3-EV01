# Kmeloth - Sistema de Gestión de Productos
## Evidencia AA3_EV01

## Descripción
Módulo backend desarrollado con el framework Express.js que gestiona 
productos, categorías e imágenes para la aplicación web Kmeloth.

## Artefactos del ciclo del software
- Diagrama Entidad-Relación: estructura de las tablas producto, categorias, 
  admin, trabajador, cliente, carrito, compra y pago

## Frameworks y librerías utilizados
- Express.js: framework principal para el servidor y rutas REST
- Multer: manejo de subida de archivos
- Cloudinary: almacenamiento de imágenes en la nube
- mysql2: conexión y consultas a la base de datos MySQL
- dotenv: gestión de variables de entorno

## Requisitos previos
Tener instalado en el computador:
- Node.js: https://nodejs.org/
- MySQL Workbench: https://www.mysql.com/products/workbench/
- Git: https://git-scm.com/

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio
git clone https://github.com/omarcoral5-alt/GA7-220501096-AA3-EV01.git
cd GA7-220501096-AA3-EV01

### 2. Instalar dependencias
npm install

### 3. Importar la base de datos
1. Abrir MySQL Workbench
2. Ir a Server -> Data Import
3. Seleccionar Import from Self-Contained File
4. Buscar el archivo empresa_kmeloth.sql incluido en el repositorio
5. Clic en Start Import

### 4. Configurar las variables de entorno
Crear un archivo llamado .env en la raíz del proyecto con el siguiente contenido:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=empresa_kmeloth

CLOUDINARY_CLOUD_NAME=dnn1ojawk
CLOUDINARY_API_KEY=232583274135196
CLOUDINARY_API_SECRET=vECjMKJRIuA3bTjoeSY7FHCfOjE

PORT=3000

Reemplaza tu_usuario_mysql y tu_contraseña_mysql con los datos de tu instalación de MySQL.

### 5. Ejecutar el servidor
node backend.js

Si ves este mensaje el servidor está corriendo correctamente:
Servidor corriendo en puerto 3000

### 6. Abrir la aplicación
Abrir el archivo index.html en el navegador o usar la extensión Live Server de VS Code.

## Tecnologías usadas
- HTML, CSS, JavaScript
- Node.js
- Express.js
- MySQL
- Cloudinary# GA7-220501096-AA3-EV01