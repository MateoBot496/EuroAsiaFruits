const express = require("express");

const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require("path");

const app = express();
const errorHandler = require("./middlewares/errorHandler");


// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas publicas
app.use(
  "/api/public",
  require("./routes/public/public.productos.routes")
);
// Rutas de auth
app.use("/auth", require("./routes/public/auth.routes"));


// Middleware de errores
app.use(errorHandler);

// Declarar carpeta estática para imágenes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

module.exports = app;
