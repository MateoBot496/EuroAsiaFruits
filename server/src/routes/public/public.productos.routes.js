const express = require("express");
const router = express.Router();

const PublicController = require("../../controllers/public/public.productos.controller");

// GET /api/productos
router.get("/productos", PublicController.getTodosProductos);

// GET /api/productos/:id
router.get("/productos/:id", PublicController.getProductoById);

module.exports = router;