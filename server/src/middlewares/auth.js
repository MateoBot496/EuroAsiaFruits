const jwt = require("jsonwebtoken");

/**
 * Verifica el JWT en cookie y comprueba roles.
 *
 * Uso:
 *   auth()         -> solo autenticado
 *   auth([0,1])    -> ADMIN o SUPERADMIN
 *   auth([1])      -> solo SUPERADMIN
 */

function auth(roles = []) {
  return (req, res, next) => {
    const token = req.cookies?.accessToken; //auth siempre con acessToken

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Prohibido" });
      }

      return next();
    } catch (e) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
}

module.exports = auth;
