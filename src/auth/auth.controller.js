const { request, response } = require('express');
const bycript = require('bcrypt');
const Usuario = require('../models/usuario');
const Administrador = require('../models/administrador');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) =>{
    const {username, password} = req.body;

    try {
        const usuario = await Usuario.findOne({username});
        const administrador = await Administrador.findOne({username});

        if(!usuario && !administrador){
            return res.status(400).json({
                msg: "Credenciales incorrectas, username no existe en la base de datos"
            })
        }

        const usuarioToken = usuario || administrador;

        if(!usuarioToken.estado){
            return res.status(400).json({
                msg: "El usaurio no existe en la base de datos"
            })
        }
        
        const validarPassword= bycript.compareSync(password, usuarioToken.password);

        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT(usuarioToken.id);

        res.status(200).json({
            msg: "Bienvenido",
            usuarioToken,
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        })
        
    }
}

module.exports = {
    login
}