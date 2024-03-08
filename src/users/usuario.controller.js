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

export const UsuarioAdminPut = async(req, res) => {
    const { _id, usernameBuscar ,password, estado,...resto } = req.body;

    const usuarioAnterior = await Usuario.findOne({username: usernameBuscar});

    if(!usuarioAnterior) {
        res.status(400).json({ 
            msg: "No se encontro el usuario"
        });
    }
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuarioUpdate = await Usuario.findByIdAndUpdate(usuarioAnterior._id, resto, {new: true});

    res.status(200).json({
        msg: "Actualizacions existosa",
        usuario: usuarioUpdate ,
        usuarioAnterior
    })

}

export const UsuarioAdminDelete = async(req, res) =>{
    const { usernameBuscar } = req.body;

    const usuarioAnterior = await Usuario.findOne( {username: usernameBuscar} );

    const usuarioUpdate = await Usuario.findByIdAndUpdate(usuarioAnterior._id, {estado: true }, {new: true});

    res.status(200).json({
        msg: "Actualizacion existosa",
        usuario: usuarioAnterior,
        usuarioUpdate
    })


}