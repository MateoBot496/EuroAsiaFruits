const express = require("express");
const cors = require('cors');


const app = express();
app.use(cors());

const errorHandler = require("./middlewares/errorHandler");


// Middlewares
app.use(express.json());

// PUBLIC ROUTES
app.use(
  "/api/public",
  require("./routes/public/public.productos.routes")
);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
