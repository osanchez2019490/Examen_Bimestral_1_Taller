const Usuario = require('../models/usuario');
const Administrador = require('../models/administrador')

const existeEmeail = async(correo= '') =>{
    const existeEmeail = await Usuario.findOne({correo});
    const existeEmeailAdmin = await Administrador.findOne({correo});
    if (existeEmeail ||  existeEmeailAdmin  ) {
        throw new Error ( `El email ${ correo } existe en la base de datos`)
    };
};

const existeUsername = async (username = '') =>{ 
    const existeUsername = await Usuario.findOne({username});
    const existeUsernameAdmin = await Administrador.findOne({username});
    if(existeUsername ||  existeUsernameAdmin) {
        throw new Error (`El username ${ username } existe en la base de datos`);
    };
};

module.exports ={
    existeEmeail,
    existeUsername
}