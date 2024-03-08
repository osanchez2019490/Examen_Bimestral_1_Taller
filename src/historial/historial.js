import mongoose from "mongoose";

const HistorialSchema = mongoose.Schema({

    factura: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Factura'
    }],
    

    
})


export default mongoose.model('Historial', HistorialSchema);