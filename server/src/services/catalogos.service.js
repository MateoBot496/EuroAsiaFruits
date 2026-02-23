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
          SELECT id_grupo, nombre, is_active
          FROM grupos
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_categoria, nombre, is_active
          FROM categorias
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_origen, nombre, is_active
          FROM origenes
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_etiqueta, nombre, is_active
          FROM etiquetas
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_envase, descripcion, is_active
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

async function getActiveCatalogos() {
    const conn = await publicPool.getConnection();
    try {
        const [[grupos], [categorias], [origenes], [etiquetas], [envases]] =
            await Promise.all([
                conn.query(`
          SELECT id_grupo, nombre
          FROM grupos
          WHERE is_active = 1
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_categoria, nombre
          FROM categorias
          WHERE is_active = 1
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_origen, nombre
          FROM origenes
          WHERE is_active = 1
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_etiqueta, nombre
          FROM etiquetas
          WHERE is_active = 1
          ORDER BY nombre
        `),
                conn.query(`
          SELECT id_envase, descripcion
          FROM envases
          WHERE is_active = 1
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
    getCatalogos,
    getActiveCatalogos
};