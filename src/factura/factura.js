import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    cliente: [{
        type: Schema.Type.ObjectID,
        ref: 'Usuario' 
    }],

    direccion: {
        type:String,
        required: [true, 'El carro necesita una direccion']
    },
    
    fecha: {
        type: String,
        required: [true, 'La factura necesita una fecha']
    },

    total: {
        type:String,
        required: [true, 'La factura necesita el total a pagar']
    },

    producto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],

    estado: {
        type: Boolean,
        default: true
    }
})


export default mongoose.model('Factura', FacturaSchema);