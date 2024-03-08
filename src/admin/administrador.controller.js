import  Administrador from '../admin/administrador.js';
import Usuario from '../users/usuario.js'
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
    const { _id, password, role, estado,...resto } = req.body;

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

export const cambiarRole = async(req, res) => {
    const { buscarUsername , role} = req.body;

    const usuario = await Usuario.findOne({username: buscarUsername});
    const administrador = await Administrador.findOne({username: buscarUsername});

    if(!usuario && !administrador){
         return res.status(400).json({
            msg: "Credenciales incorrectas, username no existe en la base de datos"
        })
    }

    if(usuario.estado == false  && administrador.estado == false){
        return res.status(400).json({
            msg: "El usaurio no existe en la base de datos"
        })
    }

    const documento = role === 'ADMINISTRADOR_ROLE' ?
        (administrador ? 
            null:
            new Administrador({
                username: usuario.username,
                nombre: usuario.nombre,
                password: usuario.password,
                correo: usuario.correo,
                role: role
            })) :
        (role === "USUARIO_ROLE" ?
            (usuario ?
                null: 
                new Usuario({
                username: administrador.username,
                nombre: administrador.nombre,
                password: administrador.password,
                correo: administrador.correo,
                role: role
            })):
                
         null);
    if(!documento){
        return res.status(400).json({
            msg: `El usuario ya es ${role === "ADMINISTRADOR_ROLE" ? "un administrador" : "un usuario"}`
        })
    }

    await documento.save();

    if(role === "ADMINISTRADOR_ROLE") {
        await Usuario.findByIdAndDelete(usuario._id);
    } else if(role === "USUARIO_ROLE") {
        await Administrador.findByIdAndDelete(administrador._id);
    }

    res.status(200).json({
        msg: "Rol cambiado exitosamente",
        documento
    })
}

export const administradorDelete = async(req, res) =>{
    const { usernameBuscar } = req.body;

    const administradorAnterior = await Administrador.findOne({username: usernameBuscar});

    const adminsitradorUpdate = await Administrador.findByIdAndUpdate(administradorAnterior._id, {estado: false }, {new: true});

    res.status(200).json({
        msg: "Actualizacion existosa",
        administrador: adminsitradorUpdate,
        administradorAnterior
    })


}