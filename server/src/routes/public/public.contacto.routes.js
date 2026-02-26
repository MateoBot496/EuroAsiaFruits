const express = require("express");
const router = express.Router();

const ContactoController = require("../../controllers/public/public.contacto.controller");

// POST /api/public/contacto
router.post("/", ContactoController.send);

module.exports = router;