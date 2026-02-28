const bcrypt = require("bcrypt");
const { adminPool } = require('../config/db.js');
const { findAdminByEmail, findAdminById } = require("./users.service.js");

/**
 * Listar todos los admins: SOLO SUPERADMIN
 */

async function listAdmins() {
  const [rows] = await adminPool.query(`
    SELECT
      id,
      email,
      role,
      is_active,
      failed_attempts,
      locked_until,
      last_login_at,
      created_at,
      updated_at,
      created_by
    FROM admin_users
    ORDER BY role DESC, created_at ASC
  `);

  return rows;
}

/**
 * ADMIN BY ID
 */

async function getAdminById(adminId) {
  if (!Number.isInteger(adminId) || adminId <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  const [rows] = await adminPool.query(
    `SELECT id, email, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at, created_by
     FROM admin_users WHERE id = ?`,
    [adminId]
  );

  if (rows.length === 0) {
    const err = new Error("Admin no encontrado");
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

async function getAdminByEmail(email) {
  if (!email || typeof email !== "string") {
    const err = new Error("Email inválido");
    err.statusCode = 400;
    throw err;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const [rows] = await adminPool.query(
    `SELECT id, email, password_hash, role, is_active, failed_attempts, locked_until, last_login_at, created_at, updated_at, created_by
     FROM admin_users WHERE email = ?`,
    [normalizedEmail]
  );

  return rows.length > 0 ? rows[0] : null;
}

/**
 * Crear un admin: SOLO SUPERADMIN
 * createdBy = req.user.id (del superadmin)
 */
async function createAdmin({ email, password, role = 0, createdBy }) {
  if (!email || !password) {
    const err = new Error("Email y password son obligatorios");
    err.statusCode = 400;
    throw err;
  }

  const createdByNum = Number(createdBy);
  if (!Number.isInteger(createdByNum) || createdByNum <= 0) {
    const err = new Error("Falta createdBy (id del creador)");
    err.statusCode = 400;
    throw err;
  }

  const roleNum = Number(role);
  if (!Number.isInteger(roleNum) || ![0, 1].includes(roleNum)) {
    const err = new Error("Role inválido (0=ADMIN, 1=SUPERADMIN)");
    err.statusCode = 400;
    throw err;
  }

  const creator = await findAdminById(createdByNum); // devuelve isActive
  if (!creator || creator.isActive === 0 || creator.role !== 1) {
    const err = new Error("Solo SUPERADMIN puede crear admins");
    err.statusCode = 403;
    throw err;
  }

  if (roleNum !== 0) {
    const err = new Error("Solo se permite crear ADMIN (role=0)");
    err.statusCode = 403;
    throw err;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const exists = await findAdminByEmail(normalizedEmail);
  if (exists) {
    const err = new Error("Ya existe un admin con ese email");
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [result] = await adminPool.query(
    `INSERT INTO admin_users (email, password_hash, role, is_active, created_by)
     VALUES (?, ?, ?, 1, ?)`,
    [normalizedEmail, passwordHash, roleNum, createdByNum]
  );

  return { id: result.insertId, email: normalizedEmail, role: roleNum };
}



/**
 * Cambiar status (isActive) de un admin: SOLO SUPERADMIN
 */
async function changeAdminStatus({ adminId, isActive, changedBy }) {
  if (!Number.isInteger(adminId) || adminId <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  if (![0, 1].includes(isActive)) {
    const err = new Error("Estado inválido (0=disabled, 1=enabled)");
    err.statusCode = 400;
    throw err;
  }

  if (!Number.isInteger(changedBy) || changedBy <= 0) {
    const err = new Error("Operador inválido");
    err.statusCode = 400;
    throw err;
  }

  //Solo SUPERADMIN activo
  const performer = await findAdminById(changedBy);
  if (!performer || performer.isActive === 0 || performer.role !== 1) {
    const err = new Error("Solo SUPERADMIN puede cambiar estado");
    err.statusCode = 403;
    throw err;
  }

  // SUPERADMIN no puede cambiar su propio estado
  if (adminId === changedBy) {
    const err = new Error("No puedes cambiar tu propio estado");
    err.statusCode = 400;
    throw err;
  }

  const target = await findAdminById(adminId);
  if (!target) {
    const err = new Error("Admin no encontrado");
    err.statusCode = 404;
    throw err;
  }

  await adminPool.query(
    `UPDATE admin_users SET is_active = ? WHERE id = ?`,
    [isActive, adminId]
  );

  return { ok: true, isActive };
}

/**
 * Cambiar contraseña de un administrador
 *
 * Reglas:
 * - El SUPERADMIN puede cambiar la contraseña de cualquier administrador.
 * - El ADMIN solo puede cambiar su propia contraseña.
 * - Si el cambio es propio, es obligatorio validar la contraseña actual (oldPassword).
 * - No se permite cambiar la contraseña de un usuario deshabilitado.
 * - Al cambiar la contraseña se reinician:
 *     - failed_attempts
 *     - locked_until
 */
async function changeAdminPassword({
  adminId,
  oldPassword,
  newPassword,
  changedBy
}) {

  if (!Number.isInteger(adminId) || adminId <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  if (!newPassword || newPassword.length < 6) {
    console.log("Nueva contraseña inválida:", newPassword);
    const err = new Error("La nueva contraseña debe tener al menos 6 caracteres");
    err.statusCode = 400;
    throw err;
  }

  if (!Number.isInteger(changedBy) || changedBy <= 0) {
    const err = new Error("Operador inválido");
    err.statusCode = 400;
    throw err;
  }

  const performer = await findAdminById(changedBy);
  if (!performer || performer.isActive === 0) {
    const err = new Error("No autorizado");
    err.statusCode = 403;
    throw err;
  }

  const target = await findAdminById(adminId);
  if (!target) {
    const err = new Error("Admin no encontrado");
    err.statusCode = 404;
    throw err;
  }

  if (target.isActive === 0) {
    const err = new Error("No se puede modificar un usuario deshabilitado");
    err.statusCode = 400;
    throw err;
  }

  const isSelf = adminId === changedBy;
  const isSuperAdmin = performer.role === 1;

  if (!isSuperAdmin && !isSelf) {
    const err = new Error("No tienes permisos para cambiar esta contraseña");
    err.statusCode = 403;
    throw err;
  }

  if (isSelf) {
    if (!oldPassword) {
      const err = new Error("Debes proporcionar la contraseña actual");
      err.statusCode = 400;
      throw err;
    }

    const match = await bcrypt.compare(oldPassword, target.passwordHash);
    if (!match) {
      const err = new Error("La contraseña actual es incorrecta");
      err.statusCode = 400;
      throw err;
    }
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await adminPool.query(
    `UPDATE admin_users
     SET password_hash = ?, failed_attempts = 0, locked_until = NULL
     WHERE id = ?`,
    [newHash, adminId]
  );

  return { ok: true };
}

module.exports = {
  createAdmin,
  changeAdminStatus,
  listAdmins,
  getAdminByEmail,
  changeAdminPassword,
  getAdminById
};
