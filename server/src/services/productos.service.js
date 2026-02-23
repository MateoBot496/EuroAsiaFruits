const { publicPool } = require("../config/db");

// convertir String recibido desde front a number
// Ejemplo: "2,5" -> [2,5]
function parseIds(csv) {
  if (!csv) return [];
  return String(csv)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0);
}

module.exports = {

  /***********************API public *******************************/

  // listar todos productos (con filtros)
  async getTodosProductos(filters = {}) {
    const { id_grupo, id_categoria, id_origen, envases, etiquetas } = filters;

    const where = [];
    const params = [];

    // 1:N
    if (id_grupo) {
      where.push("p.id_grupo = ?");
      params.push(Number(id_grupo));
    }
    if (id_categoria) {
      where.push("p.id_categoria = ?");
      params.push(Number(id_categoria));
    }
    if (id_origen) {
      where.push("p.id_origen = ?");
      params.push(Number(id_origen));
    }

    // N:N envases
    const envaseIds = parseIds(envases);
    if (envaseIds.length) {
      where.push(`pe.id_envase IN (${envaseIds.map(() => "?").join(",")})`);
      params.push(...envaseIds);
    }

    // N:N etiquetas
    const etiquetaIds = parseIds(etiquetas);
    if (etiquetaIds.length) {
      where.push(`pt.id_etiqueta IN (${etiquetaIds.map(() => "?").join(",")})`);
      params.push(...etiquetaIds);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [rows] = await publicPool.query(
      `
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

        GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases,
        GROUP_CONCAT(DISTINCT t.nombre SEPARATOR ' || ') AS etiquetas

      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen

      LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
      LEFT JOIN envases e ON pe.id_envase = e.id_envase

      LEFT JOIN productos_etiquetas pt ON p.id_producto = pt.id_producto
      LEFT JOIN etiquetas t ON pt.id_etiqueta = t.id_etiqueta

      ${whereSql}

      GROUP BY p.id_producto
      ORDER BY p.id_producto ASC;
      `,
      params
    );

    return rows;
  },

  // Obtener un producto (para pagina detalle de producto)

  async getProductoById(id) {

    const [rows] = await publicPool.query(`
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

      GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases,
      GROUP_CONCAT(DISTINCT t.nombre SEPARATOR ' || ') AS etiquetas

      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen

      LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
      LEFT JOIN envases e ON pe.id_envase = e.id_envase

      LEFT JOIN productos_etiquetas pt ON p.id_producto = pt.id_producto
      LEFT JOIN etiquetas t ON pt.id_etiqueta = t.id_etiqueta

    WHERE p.id_producto = ?
    GROUP BY p.id_producto;
  `, [id]);

    return rows[0];
  },

  // Obtener productos destacados (para homepage: destacados)

  async getProductosDestacados() {

    const [rows] = await publicPool.query(`
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

      GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases,
      GROUP_CONCAT(DISTINCT t.nombre SEPARATOR ' || ') AS etiquetas

  FROM productos p
  LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
  LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
  LEFT JOIN origenes o ON p.id_origen = o.id_origen

  LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
  LEFT JOIN envases e ON pe.id_envase = e.id_envase

  LEFT JOIN productos_etiquetas pt ON p.id_producto = pt.id_producto
  LEFT JOIN etiquetas t ON pt.id_etiqueta = t.id_etiqueta

  WHERE p.destacado = 1

  GROUP BY p.id_producto

  ORDER BY p.id_producto ASC;

  `);

    return rows;
  },



  // Búsqueda con palabra clave (nombre, descripcion, categoria, grupo, origen,envase)

  async searchProductos(search) {

    if (!search) return this.getTodosProductos();

    const like = `%${search}%`;

    const [rows] = await publicPool.query(`
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

        GROUP_CONCAT(DISTINCT e.descripcion SEPARATOR ' || ') AS envases,
        GROUP_CONCAT(DISTINCT t.nombre SEPARATOR ' || ') AS etiquetas

      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN grupos g ON p.id_grupo = g.id_grupo
      LEFT JOIN origenes o ON p.id_origen = o.id_origen

      LEFT JOIN productos_envases pe ON p.id_producto = pe.id_producto
      LEFT JOIN envases e ON pe.id_envase = e.id_envase

      LEFT JOIN productos_etiquetas pt ON p.id_producto = pt.id_producto
      LEFT JOIN etiquetas t ON pt.id_etiqueta = t.id_etiqueta

      WHERE p.nombre LIKE ?
         OR p.nombre_ingles LIKE ?
         OR p.descripcion LIKE ?
         OR c.nombre LIKE ?
         OR g.nombre LIKE ?
         OR o.nombre LIKE ?
         OR t.nombre LIKE ?

      GROUP BY p.id_producto
      ORDER BY p.id_producto ASC;
    `, [like, like, like, like, like, like, like]);

    return rows;
  }

};

