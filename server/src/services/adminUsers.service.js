
import bcrypt from "bcryptjs";
import pool from "../db.js";
import { findAdminByEmail, findAdminById } from "./users.js";

/**
 * Crear un admin: SOLO SUPERADMIN
 * createdBy = req.user.id (del superadmin)
 */
export async function createAdmin({ email, password, role = 0, createdBy }) {
    if (![0, 1].includes(role)) {
        const err = new Error("Role inválido (0=ADMIN, 1=SUPERADMIN)");
        err.statusCode = 400;
        throw err;
    }
    // Seguridad extra: comprobar que el creador es SUPERADMIN
    const creator = await findAdminById(createdBy);
    if (!creator || creator.isActive === 0 || creator.role !== 1) {
        const err = new Error("Solo SUPERADMIN puede crear admins");
        err.statusCode = 403;
        throw err;
    }

    // Evitar duplicados
    const exists = await findAdminByEmail(email);
    if (exists) {
        const err = new Error("Ya existe un admin con ese email");
        err.statusCode = 409;
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        `INSERT INTO admin_users (email, password_hash, role, is_active, created_by)
     VALUES (?, ?, ?, 1, ?)`,
        [email, passwordHash, role, createdBy]
    );

    return {
        id: result.insertId, // id auto_increment
        email,
        role,
    };

 } /**
     * Desactivar un admin: SOLO SUPERADMIN
     */
    export async function disableAdmin({ adminId, disabledBy }) {
        // comprobar si es SUPERADMIN
        const performer = await findAdminById(disabledBy);
        if (!performer || performer.isActive === 0 || performer.role !== 1) {
            const err = new Error("Solo SUPERADMIN puede desactivar admins");
            err.statusCode = 403;
            throw err;
        }

        await pool.query(
            `UPDATE admin_users SET is_active = 0 WHERE id = ?`,
            [adminId]
        );

        return { ok: true };
    }

    /**
     * Cambiar el rol de un admin: SOLO SUPERADMIN
     */

    export async function changeRole({ adminId, newRole, changedBy }) {
        // comprobar si es SUPERADMIN
        const performer = await findAdminById(changedBy);
        if (!performer || performer.isActive === 0 || performer.role !== 1) {
            const err = new Error("Solo SUPERADMIN puede cambiar rol de admins");
            err.statusCode = 403;
            throw err;
        }
        if (![0, 1].includes(newRole)) {
            const err = new Error("Role inválido (0=ADMIN, 1=SUPERADMIN)");
            err.statusCode = 400;
            throw err;
        }

        // comprobar que existe el admin objetivo
        const [rows] = await pool.query(
            `SELECT id FROM admin_users WHERE id = ? LIMIT 1`,
            [adminId]
        );

        if (!rows[0]) {
            const err = new Error("Admin no encontrado");
            err.statusCode = 404;
            throw err;
        }

        await pool.query(
            `UPDATE admin_users
     SET role = ?
     WHERE id = ?`,
            [newRole, adminId]
        );

        return { ok: true };
    }


