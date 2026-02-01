const express = require("express");
const router = express.Router();

const CatalogosController = require("../../controllers/public/public.catalogos.controller");

// GET /api/public/catalogos
router.get("/catalogos", CatalogosController.getCatalogos);

module.exports = router;