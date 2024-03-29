import mongoose  from "mongoose";

const AdministradorSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Se necesita un username a la cuenta'],
        uniqued: true
    },

    nombre: {
        type: String,
        require: [true, 'Se requiere el nombre del administrador']
    },

    correo: {
        type: String,
        require: [true, 'Se necesita el correo del adminstrador'],
        uniqued: true
    },

    password: {
        type: String,
        require: [true, 'Se necesita contraseña del administrador']
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

export default mongoose.model('Administrador', AdministradorSchema);