const pool = require("../config/db");

module.exports = {

  /***********************API public *******************************/

  // listar todos productos 
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
        o.nombre AS origen,

        GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases

      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen
      LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
      LEFT JOIN envases e ON pe.id_envase = e.id_envase
      GROUP BY p.id_producto
      ORDER BY p.id_producto ASC;
    `);

    return rows;
  },

  // Obtener un producto (para pagina detalle de producto)

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
      o.nombre AS origen,

      GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases

    FROM productos p
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
    LEFT JOIN origenes o ON p.id_origen = o.id_origen
    LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
    LEFT JOIN envases e ON pe.id_envase = e.id_envase
    WHERE p.id_producto = ?
    GROUP BY p.id_producto;
  `, [id]);

    return rows[0];
  },


  async getProductosDestacados() {

    const [rows] = await pool.query(`
    SELECT
      p.id_producto,
      p.referencia,
      p.nombre,
      p.descripcion,
      p.url_imagen,

      c.nombre AS categoria,
      g.nombre AS grupo

    FROM productos p
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
    WHERE p.destacado = 1;
  `);

    return rows;
  },

  // Búsqueda con palabra clave (nombre, descripcion, categoria, grupo, origen,envase)

  async searchProductos(search) {

    if (!search) return this.getTodosProductos();

    const like = `%${search}%`;

    const [rows] = await pool.query(`
      SELECT
        p.id_producto,
        p.referencia,
        p.nombre,
        p.nombre_ingles,
        p.descripcion,
        p.url_imagen,

        c.nombre AS categoria,
        g.nombre AS grupo,
        o.nombre AS origen,

        GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases

      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen
      LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
      LEFT JOIN envases e ON pe.id_envase = e.id_envase

      WHERE p.nombre LIKE ?
         OR p.nombre_ingles LIKE ?
         OR p.descripcion LIKE ?
         OR c.nombre LIKE ?
         OR g.nombre LIKE ?
         OR o.nombre LIKE ?
         OR e.descripcion LIKE ?

      GROUP BY p.id_producto
      ORDER BY p.id_producto ASC;
    `, [like, like, like, like, like, like, like]);

    return rows;
  }

};

