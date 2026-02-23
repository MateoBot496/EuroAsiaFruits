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

// GET /api/admin/productos/buscar?nombre=...
async function searchByNombre(req, res, next) {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      return res.status(400).json({ message: "Falta nombre" });
    }
    const productos = await AdminProductosService.searchProductosByNombreAdmin(nombre);

    const resultado = productos.map((p) => ({
      ...p,
      url_imagen: buildImageUrl(req, p.url_imagen),
    }));

    return res.status(200).json(resultado);
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
    console.error("Server/Controller/adminProductos: Error al crear producto:", e);
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

// PUT api/admin/productos/:id/disponible
async function updateDisponible(req, res) {
  try {
    const { id } = req.params;
    const { disponible } = req.body;

    const producto = await AdminProductosService.updateProductoDisponible(id, disponible);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(producto);

  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
  }
}

// PUT api/admin/productos/:id/destacado
async function updateDestacado(req, res) {
  try {
    const { id } = req.params;
    const { destacado } = req.body;

    const producto = await AdminProductosService.updateProductoDestacado(id, destacado);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(producto);

  } catch (e) {
    return res.status(e.statusCode || 500).json({ message: e.message });
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
  updateDestacado,
  updateDisponible,
  remove,
  searchByNombre
};
