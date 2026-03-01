const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const ImagesController = require("../../controllers/admin/admin.images.controller");

// POST /api/admin/images/producto
router.post("/producto",auth([0, 1]),upload.single("imagen"),ImagesController.uploadProducto);

module.exports = router;