const ProductosService = require("../services/productos.service");

module.exports = {
  async getTodosProductos(req, res, next) {
    try {
      const productos = await ProductosService.getTodosProductos();
      res.json(productos);
    } catch (error) {
      next(error);
    }
  },

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