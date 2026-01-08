const express = require("express");
const router = express.Router();
const auth  = require("../../middlewares/auth");

const PublicController = require("../../controllers/public/public.productos.controller");


// GET /api/public/productos
router.get("/productos", PublicController.getTodosProductos);

// GET /api/public/productos/buscar?search=xxx
router.get("/productos/buscar", PublicController.searchProductos);

// GET /api/public/productos/:id
router.get("/productos/:id", PublicController.getProductoById);

// GET /api/public/productos-destacados
router.get("/productos-destacados", PublicController.getProductosDestacados);

//RUTAS DE ADMIN 

router.get("/admin", auth([0, 1]), (req, res) => {res.json({message: "Acceso concedido a productos de admin"})});


module.exports = router;