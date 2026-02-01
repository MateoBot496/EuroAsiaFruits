const { publicPool } = require("../config/db"); // usamos publicPool porque solo SELECT
/**
 * Devuelve todos los catálogos necesarios para:
 * - filtros/búsqueda (público)
 * - selects en create/update producto (admin UI, pero solo lectura)
 */
async function getCatalogos() {
    const conn = await publicPool.getConnection();
    try {
        const [[grupos], [categorias], [origenes], [etiquetas], [envases]] =
            await Promise.all([
                conn.query(`
          SELECT id_grupo, nombre
          FROM grupos
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_categoria, nombre
          FROM categorias
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_origen, nombre
          FROM origenes
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_etiqueta, nombre
          FROM etiquetas
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_envase, descripcion
          FROM envases
          ORDER BY descripcion
        `),
            ]);

        return {
            grupos,
            categorias,
            origenes,
            etiquetas,
            envases,
        };
    } finally {
        conn.release();
    }
}

module.exports = {
    getCatalogos
};