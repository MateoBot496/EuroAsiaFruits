// src/services/contacto.service.js
const nodemailer = require("nodemailer");

/**
 * Servicio de envío de emails desde formularios públicos (modo TEST)
 *
 * Payload:
 * - productoNombre? (string)
 * - productoReferencia? (string)
 * - nombreCliente (string, requerido)
 * - email (string, requerido)
 * - telefono? (string)
 * - empresa? (string)
 * - mensaje (string, requerido)
 *
 * Variables de entorno (para Gmail en local):
 * - SMTP_USER=tuemail@gmail.com
 * - SMTP_PASS=APP_PASSWORD_DE_GOOGLE
 * - CONTACTO_TO=tuemail@gmail.com (opcional; si no, usa SMTP_USER)
 */

function isValidEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

async function sendContacto(payload) {
  const {
    productoNombre,
    productoReferencia,
    nombreCliente,
    email,
    telefono,
    empresa,
    mensaje,
  } = payload || {};

  if (!nombreCliente || typeof nombreCliente !== "string" || !nombreCliente.trim()) {
    const err = new Error("Falta nombreCliente");
    err.statusCode = 400;
    throw err;
  }

  if (!isValidEmail(email)) {
    const err = new Error("Email no válido");
    err.statusCode = 400;
    throw err;
  }

  if (!mensaje || typeof mensaje !== "string" || !mensaje.trim()) {
    const err = new Error("Falta mensaje");
    err.statusCode = 400;
    throw err;
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    const err = new Error("SMTP_USER/SMTP_PASS no configurados");
    err.statusCode = 500;
    throw err;
  }

  const to = process.env.CONTACTO_TO || process.env.SMTP_USER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = productoNombre || productoReferencia
    ? `TEST - Consulta producto: ${productoNombre || ""}${productoReferencia ? ` (${productoReferencia})` : ""}`
    : "TEST - Mensaje desde formulario de contacto";

  const text = [
    "NUEVO CONTACTO WEB (TEST)",
    "",
    productoNombre ? `Producto: ${productoNombre}` : null,
    productoReferencia ? `Referencia: ${productoReferencia}` : null,
    "",
    `Nombre cliente: ${nombreCliente}`,
    `Email: ${email}`,
    `Teléfono: ${telefono || "-"}`,
    `Empresa: ${empresa || "-"}`,
    "",
    "Mensaje:",
    mensaje,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: email,
    subject,
    text,
  });

  return { ok: true };
}

module.exports = {
  sendContacto,
};