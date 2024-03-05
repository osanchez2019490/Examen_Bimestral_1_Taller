import mongoose  from "mongoose";

const defaultCategoria = [
    { categoria: 'Preterminada',
     descripcion: 'Categoria preterminada'}
]


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

const Categoria = mongoose.model('Categoria', CategoriaSchema);

defaultCategoria.forEach(async (defaultCategoria) =>{
    try {
        const existeCategoria = await Categoria.findOne({ categoria: defaultCategoria.categoria });
        if(!existeCategoria){
            await Categoria.create(defaultCategoria);
            console.log(`Categoria preterminada ${defaultCategoria.categoria} creado`)
        }
    } catch (e) {
        console.error('Error al crear la categoria prterminada: ', e)
    }
});

export default Categoria;