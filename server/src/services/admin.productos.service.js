const { adminPool } = require("../config/db");
const PublicProductosService = require("./productos.service.js");

// Normalizar(descatado, disponible): checkbox/boolean -> TINYINT(1)
const toTinyInt = (v) => {
  if (v === true || v === 1 || v === "1" || v === "on" || v === "true") return 1;
  if (v === false || v === 0 || v === "0" || v === "false" || v === "off") return 0;
  return 0;
};

// Normalizar (origen, grupo, categoria): si desde front llega algun campo ""
const toNullableInt = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};


// GET todos
async function getTodosProductosAdmin() {
  const [rows] = await adminPool.query(`
    SELECT
      p.id_producto,
      p.referencia,
      p.nombre,
      p.nombre_ingles,
      p.descripcion,
      p.url_imagen,
      p.disponible,
      p.destacado,
      p.fecha_creacion,
      p.fecha_modificacion,

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
    ORDER BY p.id_producto ASC
  `);

  return rows;
}

// GET by id
async function getProductoByIdAdmin(idProducto) {
  const id = Number(idProducto);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  const [rows] = await adminPool.query(
    `
    SELECT
      p.id_producto,
      p.referencia,
      p.nombre,
      p.nombre_ingles,
      p.descripcion,
      p.url_imagen,
      p.disponible,
      p.destacado,
      p.fecha_creacion,
      p.fecha_modificacion,

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
    GROUP BY p.id_producto
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

// Buscar por nombre

async function searchProductosByNombreAdmin(nombre) {
  const search = (nombre ?? "").toString().trim();
  if (!search) {
    const err = new Error("Falta nombre");
    err.statusCode = 400;
    throw err;
  }

  const like = `%${search}%`;

  const [rows] = await adminPool.query(
    `
    SELECT
      p.id_producto,
      p.referencia,
      p.nombre,
      p.url_imagen,
      p.disponible,
      p.destacado
    FROM productos p
    WHERE p.nombre LIKE ?
    ORDER BY p.id_producto DESC
    LIMIT 20
    `,
    [like]
  );

  return rows;
}


// CREATE producto segun payload (front)
// Campos:
// - referencia (required, unique)
// - nombre (required)
// - nombre_ingles, descripcion, url_imagen (opcionales)
// - id_grupo, id_categoria, id_origen (opcionales, pueden ser null)
// - disponible, destacado (checkbox/boolean)
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
    const [result] = await adminPool.query(
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
          toNullableInt(id_grupo),
          toNullableInt(id_categoria),
          toNullableInt(id_origen),
          url_imagen,
          toTinyInt(disponible),
          toTinyInt(destacado),
      ]
    );

    return await PublicProductosService.getProductoById(result.insertId);
  } catch (e) {
  console.error("createProducto ERROR:", {
    code: e.code,
    errno: e.errno,
    sqlState: e.sqlState,
    sqlMessage: e.sqlMessage,
  });

  if (e.code === "ER_DUP_ENTRY") {
    const err = new Error("Referencia repetida");
    err.statusCode = 409;
    throw err;
  }

  const err = new Error(
    `Error interno creando producto: ${e.code || ""} ${e.sqlMessage || ""}`.trim()
  );
  err.statusCode = 500;
  throw err;
}
}

// UPDATE segun payload (parcial)
// No obligar a rellenar todos los campos 
// Solo actualizar segun payload: setIfDefined
// Devuelve el producto actualizado (null si no existe)

async function updateProducto(idProducto, payload) {
  // Validación de id
  const id = Number(idProducto);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  // Datos a actualizar
  const data = payload || {};
  const fields = [];
  const values = [];

  // Validar si desde front llega datos para actualizar
  if (data.referencia !== undefined) {
    fields.push("referencia = ?");
    values.push(data.referencia);
  }

  if (data.nombre !== undefined) {
    fields.push("nombre = ?");
    values.push(data.nombre);
  }

  if (data.nombre_ingles !== undefined) {
    fields.push("nombre_ingles = ?");
    values.push(data.nombre_ingles);
  }

  if (data.descripcion !== undefined) {
    fields.push("descripcion = ?");
    values.push(data.descripcion);
  }

  if (data.id_grupo !== undefined) {
    fields.push("id_grupo = ?");
    values.push(toNullableInt(data.id_grupo));
  }

  if (data.id_categoria !== undefined) {
    fields.push("id_categoria = ?");
    values.push(toNullableInt(data.id_categoria));
  }

  if (data.id_origen !== undefined) {
    fields.push("id_origen = ?");
    values.push(toNullableInt(data.id_origen));
  }

  if (data.url_imagen !== undefined) {
    fields.push("url_imagen = ?");
    values.push(data.url_imagen);
  }

  if (data.disponible !== undefined) {
    fields.push("disponible = ?");
    values.push(toTinyInt(data.disponible));
  }

  if (data.destacado !== undefined) {
    fields.push("destacado = ?");
    values.push(toTinyInt(data.destacado));
  }

  // Nada que actualizar
  if (fields.length === 0) {
    const err = new Error("No hay campos para actualizar");
    err.statusCode = 400;
    throw err;
  }

  try {
    values.push(id);
    const [result] = await adminPool.query(
      `UPDATE productos SET ${fields.join(", ")} WHERE id_producto = ?`,
      values
    );

    // Producto no encontrado
    if (result.affectedRows === 0) {
      return null;
    }

    // Devolver producto actualizado
    return await PublicProductosService.getProductoById(id);

  } catch (e) {
    // Error de referencia(unique) duplicada
    if (e.code === "ER_DUP_ENTRY") {
      const err = new Error("Referencia repetida");
      err.statusCode = 409;
      throw err;
    }

    // Error genérico
    const err = new Error("Error interno actualizando producto");
    err.statusCode = 500;
    throw err;
  }
}


// DELETE: devuelve boolean
// true  -> producto borrado
// false -> producto no existía
// otros errores al borrar: 409 o 500
async function deleteProducto(idProducto) {
  const id = Number(idProducto);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  try {
    const [result] = await adminPool.query(
      `DELETE FROM productos WHERE id_producto = ?`,
      [id]
    );

    // affectedRows > 0 => borrado
    // affectedRows = 0 => producto no existe
    return result.affectedRows > 0;
  } catch (e) {

    // FK restrictiva en otras tablas que no tengan ON DELETE CASCADE
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
  getTodosProductosAdmin,
  getProductoByIdAdmin,
  searchProductosByNombreAdmin,
  createProducto,
  updateProducto,
  deleteProducto,
};
