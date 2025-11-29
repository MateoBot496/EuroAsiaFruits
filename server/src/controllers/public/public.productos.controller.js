const ProductosService = require("../../services/productos.service");

module.exports = {

  // / GET /api/public/productos/buscar?search=xxx
  async searchProductos(req, res, next) {
    try {
      const search = req.query.search || "";
      const productos = await ProductosService.searchProductos(search);
      res.json(productos);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/public/productos
  async getTodosProductos(req, res, next) {
    try {
      const productos = await ProductosService.getTodosProductos();
      res.json(productos);
    } catch (error) {
      next(error);
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

      res.json(producto);
    } catch (error) {
      next(error);
    }
  }
};