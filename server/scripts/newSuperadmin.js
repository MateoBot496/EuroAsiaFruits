const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql2/promise");
require("dotenv").config(); // si usas .env para DB

(async () => {
  try {
    // 🔹 Datos del superadmin
    const id = uuidv4();
    const email = "superadmin@mail.com";
    const password = "super123"; // contraseña de prueba
    const role = 1; // 0=ADMIN, 1=SUPERADMIN
    const isActive = 1;

    // 🔹 Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 🔹 Conexión a la DB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS, // <--- corregido
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    });

    // 🔹 Insertar superadmin
    await connection.execute(
      `INSERT INTO admin_users (id, email, password_hash, role, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [id, email.toLowerCase(), passwordHash, role, isActive],
    );

    console.log("✅ Superadmin creado");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🆔 ID: ${id}`);

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
