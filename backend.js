require('dotenv').config();

// ==========================================
// PROYECTO: Kmeloth - Sistema de Gestión de Productos
// EVIDENCIA: AA3_EV01
// DESCRIPCIÓN: Módulo backend desarrollado con el framework Express.js
// que gestiona productos, categorías e imágenes para la aplicación web.
//
// ARTEFACTOS DEL CICLO DEL SOFTWARE APLICADOS:
// - Diagrama Entidad-Relación: estructura de tablas producto, categorias,
//   admin, trabajador, cliente, carrito, compra y pago
//
// FRAMEWORKS Y LIBRERÍAS UTILIZADOS:
// - Express.js: framework principal para crear el servidor y las rutas REST
// - Multer: framework para gestionar la subida de archivos
// - Cloudinary: framework para almacenamiento de imágenes en la nube
// - mysql2: librería para conexión y consultas a la base de datos MySQL
// - dotenv: librería para gestionar variables de entorno
// ==========================================

// Framework Cloudinary - almacenamiento de imágenes en la nube
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Framework Multer - manejo de archivos
const multer = require("multer");

// Configuración de la API de Cloudinary con variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración del almacenamiento en Cloudinary usando Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "kmeloth",
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
});

const upload = multer({ storage: storage });

// Framework Express.js - servidor web y API REST
const express = require("express");

// Librería mysql2 - conexión a base de datos MySQL
const mysql = require("mysql2/promise");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos usando variables de entorno
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Ruta GET - Obtener todas las categorías de la base de datos
// Caso de uso: listar categorías para el formulario de agregar producto
app.get("/categorias", async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const [rows] = await conexion.execute("SELECT * FROM categorias");
        res.json({ success: true, categorias: rows });
    } catch (err) {
        console.error("ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Ruta POST - Agregar un nuevo producto con imagen a la base de datos
// Caso de uso: administrador registra un nuevo producto en el catálogo
// Usa Multer y Cloudinary para gestionar la subida de la imagen
app.post("/agregar-producto", upload.single("imagen"), async (req, res) => {
    try {
        const { nombre, precio, id_categoria } = req.body;
        const urlImagen = req.file.path; // URL generada por Cloudinary
        const conexion = await mysql.createConnection(dbConfig);
        await conexion.execute(
            "INSERT INTO producto (id_categoria, nombre, precio, imagen) VALUES (?, ?, ?, ?)",
            [id_categoria, nombre, precio, urlImagen]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Ruta GET - Obtener todos los productos de la base de datos
// Caso de uso: administrador visualiza el catálogo completo de productos
app.get("/productos", async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const [rows] = await conexion.execute("SELECT * FROM producto");
        res.json({ success: true, producto: rows });
    } catch (err) {
        console.error("ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Ruta DELETE - Eliminar un producto por su ID
// Caso de uso: administrador elimina un producto del catálogo
app.delete("/delete-producto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const conexion = await mysql.createConnection(dbConfig);
        await conexion.execute(
            "DELETE FROM producto WHERE id_producto=?",
            [id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Iniciar el servidor en el puerto definido en .env o por defecto en el 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`);
});