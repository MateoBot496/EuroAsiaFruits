import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { findAdminByEmail } from "./users.js";

/**
 * Login para ADMIN/SUPERADMIN
 * - verifica is_active
 * - respeta locked_until
 * - bcrypt.compare
 * - genera JWT
 * Devuelve { token, role }
 */
export async function loginAdmin(email, password) {
    const admin = await findAdminByEmail(email);

    if (!admin) {
        const err = new Error("Credenciales inválidas");
        err.statusCode = 401;
        throw err;
    }

    if (!admin.isActive) {
        const err = new Error("Cuenta desactivada");
        err.statusCode = 401;
        throw err;
    }

    if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
        const err = new Error("Cuenta bloqueada temporalmente. Inténtalo más tarde.");
        err.statusCode = 423;
        throw err;
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
        const err = new Error("Credenciales inválidas");
        err.statusCode = 401;
        throw err;
    }

    // Actualizar last_login y resetear bloqueos
    await pool.query(
        `UPDATE admin_users
     SET failed_attempts = 0,
         locked_until = NULL,
         last_login_at = CURRENT_TIMESTAMP(3)
     WHERE id = ?`,
        [admin.id]
    );

    const token = jwt.sign(
        { id: admin.id, role: admin.role }, // role: 0/1
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return { token, role: admin.role };
}


