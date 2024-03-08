import mongoose from "mongoose";

const CarritoSchema = mongoose.Schema({

    nombreCarrito: {
        type: String,
        required: [true, 'El carrito necesita un nombre unico'],
        uniqued: true
    },
    cliente: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],

    direccion: {
        type:String,
        required: [true, 'El carro necesita una direccion']
    },
    

    total: {
        type:String,
        required: [true, 'El carro necesita el total a pagar']
    },

    producto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],

    totalProducto: {
        type: String,
        required: [true, 'El producto necesita una cantidad']

    },

    estado: {
        type: Boolean,
        default: true
    }
})


export default mongoose.model('Carrito', CarritoSchema);