const ImagesService = require("../../services/admin.images.service");

// POST /api/admin/images/producto
async function uploadImagenProducto(req, res, next) {
  try {
    const { nombre } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Archivo obligatorio" });
    }

    if (!nombre) {
      return res.status(400).json({ message: "Nombre obligatorio" });
    }

    const { filename } = await ImagesService.uploadImagenProducto(
      req.file,
      nombre
    );

    return res.status(201).json({ filename });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  uploadImagenProducto,
};