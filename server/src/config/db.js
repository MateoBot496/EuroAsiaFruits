require("dotenv").config();
const mysql = require("mysql2/promise");

// DB: PUBLIC (solo lectura)

console.log("DB_NAME =", process.env.DB_NAME);

const publicPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_PUBLIC_USER,
  password: process.env.DB_PUBLIC_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});


// DB: ADMIN (CRUD + AUTH)

const adminPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = {
  publicPool,
  adminPool,
};
