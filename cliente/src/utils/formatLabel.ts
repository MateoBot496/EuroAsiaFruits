// - Convierte "_" en espacios
// - Elimina espacios duplicados
// - Normaliza el espaciado alrededor de "/"
// - Convierte todo a minúsculas
// - Aplica formato "sentence case" (solo la primera letra en mayúscula)
// - Si empieza con número, no modifica la primera posición

export function formatLabel(value: unknown): string {
  if (value === null || value === undefined) return "";

  let s = String(value).trim();
  if (!s) return "";

  // "_" → espacio
  s = s.replace(/_/g, " ");

  // eliminar espacios duplicados
  s = s.replace(/\s+/g, " ");

  // normalizar espacios alrededor de "/"
  s = s.replace(/\s*\/\s*/g, " / ");

  // convertir a minúsculas
  s = s.toLowerCase();

  // aplicar sentence case si empieza por letra
  if (/^[a-záéíóúñü]/.test(s)) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }

  return s;
}