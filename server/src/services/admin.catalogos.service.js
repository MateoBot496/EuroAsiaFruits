
// Admin: grupos/categorias/origenes/etiquetas/envases

const { adminPool } = require("../config/db");

const MAP = {
  grupos: { table: "grupos", field: "nombre" },
  categorias: { table: "categorias", field: "nombre" },
  origenes: { table: "origenes", field: "nombre" },
  etiquetas: { table: "etiquetas", field: "nombre" },
  envases: { table: "envases", field: "descripcion" },
};

function getConfig(tipo) {
  const cfg = MAP[tipo];
  if (!cfg) {
    const err = new Error(
      "tipo inválido. Usa: grupos, categorias, origenes, etiquetas, envases"
    );
    err.statusCode = 400;
    throw err;
  }
  return cfg;
}

// Normalizar nombre/descripcion
const normStr = (v) => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
};

// Normalizar isActive: checkbox/boolean -> TINYINT(1)
const toTinyInt = (v, fieldName = "valor") => {
  if (v === true || v === 1 || v === "1" || v === "on" || v === "true") return 1;
  if (v === false || v === 0 || v === "0" || v === "false" || v === "off") return 0;

  const err = new Error(`${fieldName} debe ser 1 o 0`);
  err.statusCode = 400;
  throw err;
};

// Listar todos los valores de un tipo
async function getAllByTipo(tipo) {
  const { table, field } = getConfig(tipo);

  const [rows] = await adminPool.query(
    `SELECT ${field} AS valor, is_active
     FROM ${table}
     ORDER BY ${field}`
  );

  return rows.map((r) => ({
    valor: r.valor,
    isActive: r.is_active,
  }));
}

// Crear un valor nuevo (siempre is_active = 1 por defecto)
async function createTipo(tipo, valorRaw) {
  const { table, field } = getConfig(tipo);

  const valor = normStr(valorRaw);
  if (!valor) {
    const err = new Error("valor es obligatorio");
    err.statusCode = 400;
    throw err;
  }

  try {
    await adminPool.query(
      `INSERT INTO ${table} (${field}) VALUES (?)`,
      [valor]
    );

    return { valor, isActive: 1 };

  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      const err = new Error("valor ya existe");
      err.statusCode = 409;
      throw err;
    }

    const err = new Error("Error interno creando tipo de catálogo");
    err.statusCode = 500;
    throw err;
  }
}

// Editar nombre/descripcion
async function renameTipo(tipo, oldValorRaw, newValorRaw) {
  const { table, field } = getConfig(tipo);

  const oldValor = normStr(oldValorRaw);
  const newValor = normStr(newValorRaw);

  if (!oldValor || !newValor) {
    const err = new Error("oldValor y newValor son obligatorios");
    err.statusCode = 400;
    throw err;
  }

  if (oldValor === newValor) {
    return { oldValor, newValor };
  }

  try {
    const [r] = await adminPool.query(
      `UPDATE ${table} SET ${field}=? WHERE ${field}=?`,
      [newValor, oldValor]
    );

    if (r.affectedRows === 0) return null;

    return { oldValor, newValor };

  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      const err = new Error("newValor ya existe");
      err.statusCode = 409;
      throw err;
    }

    const err = new Error("Error interno renombrando catálogo");
    err.statusCode = 500;
    throw err;
  }
}

// Activar / Desactivar
async function setActive(tipo, valorRaw, isActiveRaw) {
  const { table, field } = getConfig(tipo);

  const valor = normStr(valorRaw);
  if (!valor) {
    const err = new Error("valor es obligatorio");
    err.statusCode = 400;
    throw err;
  }

  const is_active = toTinyInt(isActiveRaw, "isActive");

  try {
    const [r] = await adminPool.query(
      `UPDATE ${table} SET is_active=? WHERE ${field}=?`,
      [is_active, valor]
    );

    if (r.affectedRows === 0) return null;

    return { valor, isActive: is_active };

  } catch (e) {
    const err = new Error("Error interno actualizando isActive");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  getAllByTipo,
  createTipo,
  renameTipo,
  setActive,
};