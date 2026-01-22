const express = require("express");
const router = express.Router();

const AdminProductosController = require("../controllers/adminProductos.controller");
const auth = require("../middlewares/auth");

// api/admin/productos

// Crear: ADMIN (0) o SUPERADMIN (1)
router.post(
  "/",
  auth([0, 1]),
  AdminProductosController.create
);

// Update: ADMIN (0) o SUPERADMIN (1)
router.patch(
  "/:id",
  auth([0, 1]),
  AdminProductosController.update
);

// Delete: ADMIN (0) o SUPERADMIN (1) o SOLO SUPERADMIN???
router.delete(
  "/:id",
  auth([1]),
  AdminProductosController.remove
);

module.exports = router;
