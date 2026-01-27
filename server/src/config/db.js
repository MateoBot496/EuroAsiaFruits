require("dotenv").config();

const mysql = require("mysql2/promise");


// DB: PRODUCTOS
const productPool = mysql.createPool({
  host: process.env.PRODUCT_DB_HOST,
  user: process.env.PRODUCT_DB_USER,
  password: process.env.PRODUCT_DB_PASS,
  database: process.env.PRODUCT_DB_NAME,
  port: process.env.PRODUCT_DB_PORT,
});


// DB: USUARIOS
const userPool = mysql.createPool({
  host: process.env.USER_DB_HOST,
  user: process.env.USER_DB_USER,
  password: process.env.USER_DB_PASS,
  database: process.env.USER_DB_NAME,
  port: process.env.USER_DB_PORT,
});

module.exports = {
  productPool,
  userPool,
};
