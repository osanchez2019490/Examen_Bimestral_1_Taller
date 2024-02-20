import Usuario from '../users/usuario.js';
import {response} from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const usuarioPost = async (req, res) =>{
    const {role, password,...resto} = req.body;

    const usuario = new Usuario ({role, password, ...resto});

    usuario.role = 'USUARIO_ROLE';

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

