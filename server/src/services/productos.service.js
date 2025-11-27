const pool = require("../config/db");

module.exports = {
  async getTodosProductos() {
    const [rows] = await pool.query(`
      SELECT 
        p.id_producto,
        p.referencia,
        p.nombre,
        p.nombre_ingles,
        p.descripcion,
        p.url_imagen,
        p.destacado,
        p.disponible,
        c.nombre AS categoria,
        g.nombre AS grupo,
        o.nombre AS origen
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen
      ORDER BY p.id_producto ASC
    `);

    return rows;
  },

  async getProductoById(id) {
    const [rows] = await pool.query(`
      SELECT 
        p.id_producto,
        p.referencia,
        p.nombre,
        p.nombre_ingles,
        p.descripcion,
        p.url_imagen,
        p.destacado,
        p.disponible,
        c.nombre AS categoria,
        g.nombre AS grupo,
        o.nombre AS origen
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen
      WHERE p.id_producto = ?
      LIMIT 1
    `, [id]);

    return rows[0] || null;
  }
};
