// user.service.js
import { pool } from "../config/db.js";

export async function findUserByEmail(email) {
    // Simulación de búsqueda en base de datos
    const res = await pool.query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);
    return res.rows[0];
}