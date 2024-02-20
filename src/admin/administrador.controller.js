import  Administrador from '../admin/administrador.js';
import { response, request } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const administradorPost = async (req, res) => {
    const { password, ...resto} = req.body;

    const administrador = new Administrador ({password, ...resto});

    const salt = bcrypt.genSaltSync();
    administrador.password = bcrypt.hashSync(password, salt);

    await administrador.save();
    res.status(200).json({
        administrador
    })
    
}

