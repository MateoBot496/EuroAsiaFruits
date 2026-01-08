// app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const auth  = require("./middlewares/auth");


// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Declarar carpeta estática para imágenes (ANTES de rutas/errores)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Rutas públicas
app.use("/api/public", require("./routes/public/public.productos.routes"));

// Rutas de auth (login / logout / me / refresh)
app.use("/api/auth", require("./routes/auth/auth.routes"));

// Rutas de admin
app.use("/api/admin", auth([0, 1]), require("./routes/admin/admin.adminUsers.route"));

// Middleware de errores (SIEMPRE al final)
app.use(errorHandler);

module.exports = app;

