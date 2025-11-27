import express from "express";
import db from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API EuroAsia funcionando");
});

// ---- TEST DE CONEXIÓN MYSQL ----
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS resultado");
    res.json({
      conexion: "OK",
      resultado: rows[0].resultado
    });
  } catch (err) {
    res.status(500).json({
      conexion: "ERROR",
      mensaje: err.message
    });
  }
});

export default app;

