// src/routes/admin/admin.catalogos.routes.js

const express = require("express");
const router = express.Router();

const CatalogosController = require("../../controllers/admin/admin.catalogos.controller");
const auth = require("../../middlewares/auth");

// ADMIN (0) o SUPERADMIN (1)

// GET  /api/admin/catalogos?tipo=
router.get("/",auth([0, 1]),CatalogosController.getAllByTipo);

// POST /api/admin/catalogos?tipo=
// body: { valor }
router.post("/",auth([0, 1]),CatalogosController.createTipo);

// PUT  /api/admin/catalogos?tipo=
// body: { oldValor, newValor }
router.put("/",auth([0, 1]),CatalogosController.renameTipo);

// PUT  /api/admin/catalogos/active?tipo=
// body: { valor, isActive }
router.put("/active",auth([0, 1]),CatalogosController.setActive);

module.exports = router;