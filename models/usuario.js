const  {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    username: {
        type: String,
        require: [true, 'Su username es requerido'],
        uniqued: true
    },

    nombre: {
        type: String,
        require: [true, 'El username necesita un nombre']
    },

    direccion: {
        type: String,
        required: false
    },

    correo:{
        type: String,
        required: [true, 'El correo del usuario es obligatorio'],
        uniqued: true
    },

    password: {
        type: String,
        required: [true, 'Es necesario que el usuario tenga contraseña']
    },

    role: {
        type: String,
        required: true,
        enum: ["USUARIO_ROLE", "ADMINISTRADOR_ROLE"]
    },

    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = model ('Usuario', UsuarioSchema);