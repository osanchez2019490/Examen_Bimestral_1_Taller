const Usuario = require('../models/usuario');
const {response} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioPost = async (req, res) =>{
    const {role, password,...resto} = req.body;

    const usuario = new Usuario ({role, password, resto});

    estudiante.role = 'USUARIO_ROLE';

    const salt = bcrypt.genSaltSync();
    estudiante.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports ={
    usuarioPost
}