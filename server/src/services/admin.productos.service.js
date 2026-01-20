const pool = require("../config/db");
const PublicProductosService = require("./productos.service.js");

// Helper para normalizar valores de checkbox / booleanos a TINYINT(1)
const toTinyInt = (v) => {
  if (v === true || v === 1 || v === "1" || v === "on") return 1;
  if (v === false || v === 0 || v === "0" || v === "false") return 0;
  return 0; // fallback seguro
};

// CREATE producto segun payload (front)
// Campos:
// - referencia (required, unique)
// - nombre (required)
// - nombre_ingles, descripcion, url_imagen (opcionales)
// - id_grupo, id_categoria, id_origen (opcionales, pueden ser null)
// - disponible, destacado (checkbox / boolean)
// Devuelve el producto creado
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
        toTinyInt(disponible),
        toTinyInt(destacado),
      ]
    );

    return await PublicProductosService.getProductoById(result.insertId);
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      const err = new Error("Referencia repetida");
      err.statusCode = 409;
      throw err;
    }

    const err = new Error("Error interno creando producto");
    err.statusCode = 500;
    throw err;
  }
}

// UPDATE segun payload (parcial)
// No obligar a rellenar todos los campos en UI
// Solo actualizar los que vienen en el payload
// Devuelve el producto actualizado (o null si no existe)
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

  // Checkboxes / booleanos (robusto)
  setIfDefined("disponible", "disponible", toTinyInt);
  setIfDefined("destacado", "destacado", toTinyInt);

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

    const err = new Error("Error interno actualizando producto");
    err.statusCode = 500;
    throw err;
  }
}

// DELETE: devuelve boolean
// true  -> producto borrado
// false -> producto no existía
async function deleteProducto(idProducto) {
  const id = Number(idProducto);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  try {
    const [result] = await pool.query(
      `DELETE FROM productos WHERE id_producto = ?`,
      [id]
    );

    // affectedRows > 0 => borrado OK
    // affectedRows = 0 => no existía
    return result.affectedRows > 0;
  } catch (e) {
    // FK restrictiva en otra tabla (productos_etiquetas es CASCADE)
    if (e.code === "ER_ROW_IS_REFERENCED_2") {
      const err = new Error(
        "No se puede borrar: producto referenciado por otros registros."
      );
      err.statusCode = 409;
      throw err;
    }

    const err = new Error("Error interno borrando producto");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
};
