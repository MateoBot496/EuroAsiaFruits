import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // 127.0.0.1
  user: process.env.DB_USER,     // root
  password: process.env.DB_PASS, // 12345678
  database: process.env.DB_NAME, // EUROASIA
  port: process.env.DB_PORT,     // 3307
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
