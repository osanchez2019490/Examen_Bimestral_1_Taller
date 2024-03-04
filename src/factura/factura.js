import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    cliente: [{
        type: Schema.Type.ObjectID,
        ref: 'Usuario' 
    }],

    fecha: {
        type: String,
        required: [true, 'La factura necesita una fecha']
    },

    total: {
        type:String,
        required: [true, 'La factura necesita el total a pagar']
    },

    estado: {
        type: Boolean,
        default: true
    }
})