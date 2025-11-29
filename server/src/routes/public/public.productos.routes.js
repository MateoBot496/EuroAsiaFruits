const express = require("express");
const router = express.Router();

const PublicController = require("../../controllers/public/public.productos.controller");


// GET /api/public/productos
router.get("/productos", PublicController.getTodosProductos);

// GET /api/public/productos/buscar?search=xxx
router.get("/productos/buscar", PublicController.searchProductos);

// GET /api/public/productos/:id
router.get("/productos/:id", PublicController.getProductoById);


module.exports = router;