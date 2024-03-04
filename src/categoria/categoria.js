import mongoose  from "mongoose";

const CategoriaSchema = mongoose.Schema({
    categoria: {
        type: String,
        required: [true, 'La categoria es requerida'],
        unique: true
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion es requerida']
    },

    estado: {
        type: Boolean,
        default: true
    }

})

export default mongoose.model('Categoria', CategoriaSchema);