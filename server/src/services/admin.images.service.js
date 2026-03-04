const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

// formatos permitidos
const allowed = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

// normalizar nombre del archivo guardado
function normalizeNombre(nombre) {
  if (!nombre || typeof nombre !== "string") {
    const err = new Error("Nombre de imagen obligatorio");
    err.statusCode = 400;
    throw err;
  }

  const clean = nombre
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

  if (!clean) {
    const err = new Error("Nombre de imagen inválido");
    err.statusCode = 400;
    throw err;
  }

  return clean;
}

// Obligatorio de subir archivo
function validateFile(file) {
  if (!file || !file.buffer) {
    const err = new Error("Archivo obligatorio");
    err.statusCode = 400;
    throw err;
  }

  if (!allowed.includes(file.mimetype)) {
    const err = new Error("Formato no permitido");
    err.statusCode = 400;
    throw err;
  }
}

// Nombre no puede ser repetido
async function ensureNotExists(absPath) {
  try {
    await fs.access(absPath);
    const err = new Error("Ya existe una imagen con ese nombre");
    err.statusCode = 409;
    throw err;
  } catch (_) {}
}


// Subir imagen de producto
async function uploadImagenProducto(file, nombre) {
  validateFile(file);

  const clean = normalizeNombre(nombre);
  const filename = `${clean}.webp`;

  // Guardar en: src/public/images
  const dir = path.join(__dirname, "..", "public", "images");
  await fs.mkdir(dir, { recursive: true });

  const absPath = path.join(dir, filename);
  await ensureNotExists(absPath);

  // Formato estándar
  const out = await sharp(file.buffer)
    .resize(1024, 1024, { fit: "cover", position: "center" })
    .webp({ quality: 82 })
    .toBuffer();

  await fs.writeFile(absPath, out);

  return { filename };
}

module.exports = {
  uploadImagenProducto,
};