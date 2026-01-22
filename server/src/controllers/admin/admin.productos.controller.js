const AdminProductosService = require("../../services/admin.productos.service");

// POST /api/admin/productos
async function create(req, res, next) {
  try {
    const producto = await AdminProductosService.createProducto(req.body);
    return res.status(201).json(producto);
  } catch (e) {
    next(e); 
  }
}

// PUT o PATCH /api/admin/productos/:id
async function update(req, res, next) {
  try {
    const producto = await AdminProductosService.updateProducto(req.params.id, req.body);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  } catch (e) {
    next(e);
  }
}

// DELETE /api/admin/productos/:id
async function remove(req, res, next) {
  try {
    const deleted = await AdminProductosService.deleteProducto(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(204).send();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  create,
  update,
  remove,
};
