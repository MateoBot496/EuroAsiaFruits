const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("Ruta del env usada:", path.resolve(__dirname, "../.env"));
console.log("PUBLIC USER:", process.env.DB_PUBLIC_USER);
console.log("ADMIN USER:", process.env.DB_ADMIN_USER);

console.log(
  "Intentando conexion con : " +
    process.env.DB_PUBLIC_USER +
    " y " +
    process.env.DB_PUBLIC_PASSWORD,
);

const mysql = require("mysql2/promise");

async function testDB() {
  // Conexión PUBLIC (solo lectura)

  const publicPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_PUBLIC_USER,
    password: process.env.DB_PUBLIC_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
  });

  // Conexión ADMIN (CRUD + auth)
  const adminPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ADMIN_USER,
    password: process.env.DB_ADMIN_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
  });

  try {
    console.log("=== TEST PUBLIC USER ===");
    const [publicRows] = await publicPool.query(
      "SELECT * FROM productos LIMIT 5;",
    );
    console.log("Productos (public):", publicRows);

    console.log("\n=== TEST ADMIN USER ===");
    const [adminRows] = await adminPool.query(
      "SELECT * FROM productos LIMIT 5;",
    );
    console.log("Productos (admin):", adminRows);
  } catch (error) {
    console.error("ERROR en testDB:", error);
  } finally {
    await publicPool.end();
    await adminPool.end();
  }
}

testDB();
