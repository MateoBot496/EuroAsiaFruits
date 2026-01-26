const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");
const auth = require("./middlewares/auth");

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Carpeta estática para imágenes (antes de rutas)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Rutas públicas
app.use("/api/public", require("./routes/public/public.productos.routes"));

// Rutas de auth (login/logout/me/refresh)
app.use("/api/auth", require("./routes/auth/auth.routes"));

// Rutas admin (protegidas)
app.use("/api/admin", auth([0, 1]));
app.use("/api/admin/users", require("./routes/admin/admin.adminUsers.routes"));
app.use("/api/admin/productos", require("./routes/admin/admin.productos.routes"));

// Middleware de errores (siempre al final)
app.use(errorHandler);

module.exports = app;

