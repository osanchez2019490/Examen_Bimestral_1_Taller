const Administrador = require('../models/administrador');
const {response} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const administradorPost = async (req, res) => {
    const { password, ...resto} = req.body;

    const administrador = new Administrador ({password, ...resto});

    const salt = bcrypt.genSaltSync();
    administrador.password = bcrypt.hashSync(password, salt);

    await administrador.save();
    res.status(200).json({
        administrador
    })
    
}

module.exports = {
    administradorPost
}