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

export const administradorPut = async(req, res) => {
    const { usernameBuscar } = req.body;
    const { _id, password, estado,...resto } = req.body;

    const administradorAnterior = await Administrador.findOne({username: usernameBuscar});

    if(!administradorAnterior) {
        res.status(400).json({ 
            msg: "No se encontro el usuario"
        });
    }

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const adminsitradorUpdate = await Administrador.findByIdAndUpdate(administradorAnterior._id, resto, {new: true});

    res.status(200).json({
        msg: "Actualizacions existosa",
        administrador: adminsitradorUpdate,
        administradorAnterior
    })

}

