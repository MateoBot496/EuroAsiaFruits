import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../../services/user.service.js';

export const login = async (req, res) => {
    const {email, password} = req.body;

    // Aquí deberías verificar el email y la contraseña con la base de datos
    const user = await findUserByEmail(email); 
    if (!user) {
        return res.status(401).json({message: 'Credenciales inválidas'});
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        return res.status(401).json({message: 'Credenciales inválidas'});
    }

    const token = jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
    
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false
    });

    res.json({role: user.role});

}