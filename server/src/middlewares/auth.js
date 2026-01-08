//Esta funcion verifica el JWT en las cookies de la solicitud entrante
//y asegura que el usuario tenga el rol adecuado para acceder a la ruta protegida.
/**
 * Tambien comprueba el rol del autenticado:
 *   auth([0,1])    -> ADMIN o SUPERADMIN
 *   auth([1])      -> solo SUPERADMIN
 */

import jwt from 'jsonwebtoken';

export function auth(roles = []) {
  return (req, res, next) => {
    const token = req.cookies?.token;  // evita crash si no hay cookie

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Prohibido" });
      }

      return next();  // next() debe estar dentro de try

    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
}