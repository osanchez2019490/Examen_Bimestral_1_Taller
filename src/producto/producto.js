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

    categoria:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }],

    estado: {
        type: Boolean,
        default: true
    }

    

})

export default mongoose.model('Producto', ProductoSchema);