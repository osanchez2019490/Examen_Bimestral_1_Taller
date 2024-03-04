import mongoose from "mongoose";

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El producto necesita un nombre']
    },

    descripcion: {
        type: String,
        required: [true, 'El producto tiene una descripcion']
    },

    precio: {
        type: String,
        required: [true, 'El producto necesita un precio']
    },

    stock: {
        type: String,
        required: [true, 'El producto necesita una cantidad que queda']
    },

    estado: {
        type: Boolean,
        default: true
    }

    

})

export default mongoose.model('Producto', ProductoSchema);