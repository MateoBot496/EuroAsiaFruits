import pool from "../db.js";

/**
 * Buscar admin por email (tabla admin_users)
 * Devuelve null si no existe
 */
export async function findAdminByEmail(email) {
  const [rows] = await pool.query(
    `SELECT 
        id,
        email,
        password_hash AS passwordHash,
        role,
        is_active AS isActive,
        failed_attempts AS failedAttempts,
        locked_until AS lockedUntil
     FROM admin_users
     WHERE email = LOWER(TRIM(?))
     LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

/**
 * Buscar admin por id
 * Devuelve null si no existe
 */
export async function findAdminById(id) {
  const [rows] = await pool.query(
    `SELECT id, email, role, is_active AS isActive
     FROM admin_users
     WHERE id = ?
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}
