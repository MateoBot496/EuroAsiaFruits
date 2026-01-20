const ProductosService = require("../../services/productos.service");


//convertir campo url_imagen de la BBDD en ruta dinámica

function buildImageUrl(req, filename) {
  if (!filename) return null;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/images/${filename}`;
}

module.exports = {

  // GET /api/public/productos-destacados
  async getProductosDestacados(req, res, next) {
    try {
      const productos = await ProductosService.getProductosDestacados();

      const resultado = productos.map(p => ({
        ...p,
        url_imagen: buildImageUrl(req, p.url_imagen)
      }));

      res.json(resultado);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/public/productos/buscar?search=xxx
  async searchProductos(req, res, next) {
    try {
      const search = req.query.search || "";
      const productos = await ProductosService.searchProductos(search);

      const resultado = productos.map(p => ({
        ...p,
        url_imagen: buildImageUrl(req, p.url_imagen)
      }));

      res.json(resultado);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/public/productos
  async getTodosProductos(req, res, next) {
    try {
      const productos = await ProductosService.getTodosProductos();

      const resultado = productos.map(p => ({
        ...p,
        url_imagen: buildImageUrl(req, p.url_imagen)
      }));

      res.json(resultado);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/public/productos/:id
  async getProductoById(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await ProductosService.getProductoById(id);

      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      producto.url_imagen = buildImageUrl(req, producto.url_imagen);

      res.json(producto);
    } catch (e) {
      next(e);
    }
  }
};
