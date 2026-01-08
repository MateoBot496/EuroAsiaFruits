//Esta funcion verifica el JWT en las cookies de la solicitud entrante
//y asegura que el usuario tenga el rol adecuado para acceder a la ruta protegida.

import jwt from 'jsonwebtoken';


export function auth(roles = []){
    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: 'No autorizado'});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({message: 'Prohibido'});
            }
        } catch (err) {
            return res.status(401).json({message: 'Token inválido'});
        }
        next();
    };
}