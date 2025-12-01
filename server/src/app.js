const express = require("express");
const app = express();
const cors = require("cors"); 
const errorHandler = require("./middlewares/errorHandler");


// Middlewares
app.use(cors());
app.use(express.json());

// PUBLIC ROUTES
app.use(
  "/api/public",
  require("./routes/public/public.productos.routes")
);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
