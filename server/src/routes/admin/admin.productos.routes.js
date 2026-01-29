const express = require("express");
const router = express.Router();

const AdminProductosController = require("../../controllers/admin/admin.productos.controller");
const auth = require("../../middlewares/auth");

// Get: ADMIN (0) o SUPERADMIN (1)
//GET api/admin/productos
router.get("/",auth([0, 1]),AdminProductosController.getAll)

//GET api/admin/productos/:id
router.get("/:id",auth([0, 1]),AdminProductosController.getById)

// Create: ADMIN (0) o SUPERADMIN (1)
//POST api/admin/productos
router.post("/",auth([0, 1]),AdminProductosController.create);

// Update: ADMIN (0) o SUPERADMIN (1)
//PUT api/admin/productos/:id
router.put("/:id",auth([0, 1]),AdminProductosController.update);

// Delete: SOLO SUPERADMIN (1)???
//DELETE api/admin/productos/:id
router.delete("/:id",auth([1]),AdminProductosController.remove);

module.exports = router;
