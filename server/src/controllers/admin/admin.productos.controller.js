const AdminProductosService = require("../../services/admin.productos.service");

function buildImageUrl(req, filename) {
  if (!filename) return null;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/images/${filename}`;
}

// GET /api/admin/productos

async function getAll(req, res, next) {
  try {
    const productos = await AdminProductosService.getTodosProductosAdmin();

    const resultado = productos.map(p => ({
      ...p,
      url_imagen: buildImageUrl(req, p.url_imagen),
    }));

    return res.status(200).json(resultado);
  } catch (e) {
    next(e);
  }
}

// GET /api/admin/productos/:id
async function getById(req, res, next) {
  try {
    const producto = await AdminProductosService.getProductoByIdAdmin(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({
      ...producto,
      url_imagen: buildImageUrl(req, producto.url_imagen),
    });
  } catch (e) {
    next(e);
  }
}

// POST /api/admin/productos
async function create(req, res, next) {
  try {
    const producto = await AdminProductosService.createProducto(req.body);
    return res.status(201).json(producto);
  } catch (e) {
    next(e); 
  }
}

// PUT /api/admin/productos/:id
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
  getAll,
  getById,
  create,
  update,
  remove,
};
