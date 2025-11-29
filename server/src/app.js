const express = require("express");
const publicRoutes = require("./routes/public/public.productos.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

// Rutas API
app.use("/api", publicRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
