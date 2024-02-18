const Usuario = require('../models/usuario');
const Administrador = require('../models/administrador')

const existeEmeail = async(correo= '') =>{
    const existeEmeail = await Usuario.findOne({correo});
    const existeEmeailAdmin = await Administrador.findOne({correo});
    if (existeEmeail ||  existeEmeailAdmin  ) {
        throw new Error ( `El email ${ correo } existe en la base de datos`)
    };
}

module.exports ={
    existeEmeail
}