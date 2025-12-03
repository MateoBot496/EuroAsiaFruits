const express = require("express");
const cors = require('cors');
const path = require("path");

const app = express();
const cors = require("cors"); 
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");


// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// PUBLIC ROUTES
app.use(
  "/api/public",
  require("./routes/public/public.productos.routes")
);

// Middleware de errores
app.use(errorHandler);

// servir carpeta estática para imágenes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

module.exports = app;
