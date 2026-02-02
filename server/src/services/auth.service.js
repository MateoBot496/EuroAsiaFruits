const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { adminPool } = require("../config/db");
const { findAdminByEmail } = require("./users.service.js");

// Para convertir refresh token en hash 
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Login ADMIN/SUPERADMIN
 * - valida estado
 * - genera access/refresh
 * - guarda refresh token (hash) en BBDD (14 días)
 */
async function loginAdmin(email, password, meta = {}) {
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

  await adminPool.query(
    `UPDATE admin_users
     SET failed_attempts = 0,
         locked_until = NULL,
         last_login_at = CURRENT_TIMESTAMP(3)
     WHERE id = ?`,
    [admin.id]
  );

  const payload = { id: admin.id, role: admin.role };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "10m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "14d",
  });

  // Guardar refresh token hash en BBDD
  const tokenHash = hashToken(refreshToken);
  const userAgent = meta.userAgent || null;
  const ipAddress = meta.ipAddress || null;

  await adminPool.query(
    `
    INSERT INTO admin_refresh_tokens
      (admin_user_id, token_hash, expires_at, user_agent, ip_address)
    VALUES
      (?, ?, DATE_ADD(NOW(3), INTERVAL 14 DAY), ?, ?)
    `,
    [admin.id, tokenHash, userAgent, ipAddress]
  );

  return { accessToken, refreshToken, role: admin.role };
}


//Verificar refreshToken
async function verifyRefreshToken(refreshToken) {
  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    const err = new Error("Refresh inválido o expirado");
    err.statusCode = 401;
    throw err;
  }

  const tokenHash = hashToken(refreshToken);

  const [rows] = await adminPool.query(
    `
    SELECT id
    FROM admin_refresh_tokens
    WHERE admin_user_id = ?
      AND token_hash = ?
      AND revoked_at IS NULL
      AND expires_at > NOW(3)
    LIMIT 1
    `,
    [payload.id, tokenHash]
  );

  if (!rows[0]) {
    const err = new Error("Refresh revocado o no existe");
    err.statusCode = 401;
    throw err;
  }

  return { id: payload.id, role: payload.role };
}

// Emitir nuevo access token
function issueAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "10m",
  });
}

//Revocar refresh token actual (logout real)

async function revokeRefreshToken(refreshToken) {
  const tokenHash = hashToken(refreshToken);
  await adminPool.query(
    `
    UPDATE admin_refresh_tokens
    SET revoked_at = NOW(3)
    WHERE token_hash = ?
      AND revoked_at IS NULL
    `,
    [tokenHash]
  );
}

module.exports = {
  loginAdmin,
  verifyRefreshToken,
  issueAccessToken,
  revokeRefreshToken,
};
