const bcrypt = require("bcrypt");
const { adminPool } = require('../config/db.js');
const { findAdminByEmail, findAdminById } = require("./users.service.js");
const { randomUUID } = require("crypto");

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
  if (!createdBy) {
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

  const creator = await findAdminById(createdBy);

  if (!creator || Number(creator.is_active) === 0 || Number(creator.role) !== 1) {
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

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);

  await adminPool.query(
    `INSERT INTO admin_users (id, email, password_hash, role, is_active, created_by)
     VALUES (?, ?, ?, ?, 1, ?)`,
    [id, normalizedEmail, passwordHash, roleNum, createdBy]
  );

  return { id, email: normalizedEmail, role: roleNum };
}

/**
 * Desactivar un admin: SOLO SUPERADMIN
 */
async function disableAdmin({ adminId, disabledBy }) {
  const targetId = Number(adminId);
  const performerId = Number(disabledBy);

  if (!Number.isInteger(targetId) || targetId <= 0) {
    const err = new Error("ID inválido");
    err.statusCode = 400;
    throw err;
  }

  // solo active SUPERADMIN
  const performer = await findAdminById(performerId);
  if (!performer || Number(performer.is_active) === 0 || Number(performer.role) !== 1) {
    const err = new Error("Solo SUPERADMIN puede desactivar admins");
    err.statusCode = 403;
    throw err;
  }
  // SUPERADMIN no puede desactivar a él mismo
  if (performerId === targetId) {
    const err = new Error("No puedes desactivarte a ti mismo");
    err.statusCode = 400;
    throw err;
  }
  // comprobar si admin existe
 const [rows] = await adminPool.query(
    `SELECT id FROM admin_users WHERE id = ? LIMIT 1`,
    [adminId]
  );
  if (!rows[0]) {
    const err = new Error("Admin no encontrado");
    err.statusCode = 404;
    throw err;
  }

  
  await adminPool.query(
    `UPDATE admin_users SET is_active = 0 WHERE id = ?`,
    [targetId]
  );

  return { ok: true };
}



module.exports = {
  createAdmin,
  disableAdmin
};
