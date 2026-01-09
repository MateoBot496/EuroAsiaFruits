const pool = require("../config/db");
const PublicProductosService = require("./productos.service.js");

/**
 * CREATE producto segun payload (front)
 * Campos:
 * -referencia (required, unique)
 * -nombre (required)
 * -nombre_ingles, descripcion, url_imagen (opcionales)
 * -id_grupo, id_categoria, id_origen (opcionales, pueden ser null)
 * -disponible, destacado (0/1)
 * 
 * Devuelve el producto creado
 */

async function createProducto(payload) {
    const {
        referencia,
        nombre,
        nombre_ingles = null,
        descripcion = null,
        id_grupo = null,
        id_categoria = null,
        id_origen = null,
        url_imagen = null,
        disponible = 1,
        destacado = 0,
    } = payload || {};

    if (!referencia || !nombre) {
        const err = new Error("Campos obligatorios: referencia y nombre");
        err.statusCode = 400;
        throw err;
    }

    try {
        const [result] = await pool.query(
            `
      INSERT INTO productos
      (referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen, disponible, destacado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                referencia,
                nombre,
                nombre_ingles,
                descripcion,
                id_grupo,
                id_categoria,
                id_origen,
                url_imagen,
                disponible ? 1 : 0,
                destacado ? 1 : 0,
            ]
        );

        return await PublicProductosService.getProductoById(result.insertId);

    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
            const err = new Error("Referencia repetida");
            err.statusCode = 409;
            throw err;
        }
        throw e;
    }
}

//UPDATE segun payload
// No obligar a rellenar todos los campos en UI
// Solo actualizar los que vienen en el payload
// Devuelve el producto actualizado

async function updateProducto(idProducto, payload) {

    const id = Number(idProducto);
    if (!Number.isInteger(id) || id <= 0) {
        const err = new Error("ID inválido");
        err.statusCode = 400;
        throw err;
    }

    const data = payload || {};
    const fields = [];
    const values = [];

    const setIfDefined = (key, column, transform) => {
        if (data[key] !== undefined) {
            fields.push(`${column} = ?`);
            values.push(transform ? transform(data[key]) : data[key]);
        }
    };

    setIfDefined("referencia", "referencia");
    setIfDefined("nombre", "nombre");
    setIfDefined("nombre_ingles", "nombre_ingles");
    setIfDefined("descripcion", "descripcion");
    setIfDefined("id_grupo", "id_grupo");
    setIfDefined("id_categoria", "id_categoria");
    setIfDefined("id_origen", "id_origen");
    setIfDefined("url_imagen", "url_imagen");
    setIfDefined("disponible", "disponible", (v) => (v ? 1 : 0));
    setIfDefined("destacado", "destacado", (v) => (v ? 1 : 0));

    if (fields.length === 0) {
        const err = new Error("No hay campos para actualizar.");
        err.statusCode = 400;
        throw err;
    }

    try {
        values.push(id);

        const [result] = await pool.query(
            `UPDATE productos SET ${fields.join(", ")} WHERE id_producto = ?`,
            values
        );

        if (result.affectedRows === 0) return null;

        return await PublicProductosService.getProductoById(id);

    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
            const err = new Error("Referencia repetida");
            err.statusCode = 409;
            throw err;
        }
        throw e;
    }
}


//DELETE: devuelve boolean

async function deleteProducto(idProducto) {

    const id = Number(idProducto);
    if (!Number.isInteger(id) || id <= 0) {
        const err = new Error("ID inválido");
        err.statusCode = 400;
        throw err;
    }

    const [result] = await pool.query(`DELETE FROM productos WHERE id_producto = ?`, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    createProducto,
    updateProducto,
    deleteProducto,
};
