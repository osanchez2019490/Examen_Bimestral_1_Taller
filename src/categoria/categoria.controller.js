import { response, request } from 'express';
import Categoria from './categoria.js';
import Productos from '../producto/producto.js';

export const categoriaPost = async(req = request, res = response) => {

    const { categoria, descripcion } = req.body;
    const categoriaModel = new Categoria ({ categoria, descripcion});

    await categoriaModel.save();

    res.status(200).json({
        categoriaModel
    })
}

export const categoriaGet = async(req = request, res = response) => {
    const { limite, desde} = req.query;
    const query = { estado: true};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorias
    })
}

export const categoriaUsuarioGet = async(req = request, res = response) => {
    const { limite, desde} = req.query;
    const query = { estado: true, categoria: {$ne: 'Preterminada'}};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorias
    })
}


export const categoriaGetById = async(req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({ _id: id});

    res.status(200).json({
        categoria
    })
}

export const categoriaPut = async (req, res) =>{
    const { id } = req.params;
    const {_id, estado, ...resto} = req.body;


    const categoriaAnterior = await Categoria.findById(id);

    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'La actualizacion fue correcta!',
        categoriaActualizada,
        categoriaAnterior
    })
}

export const categoriaDelete = async(req, res) => {
    const { id } = req.params;

    const categoriaEliminar = await Categoria.findById(id);

    if(!categoriaEliminar) {
        return res.status(400).json({
            msg: 'La categoria no existe'
        })
    }

    const categoriaPredeterminada = await Categoria.findOne({ categoria: 'Preterminada'});

    await Productos.updateMany({ categoria: id,  categoria: categoriaPredeterminada._id});

    categoriaEliminar.estado = false;
    await categoriaEliminar.save();

    res.status(200).json({ 
        msg: 'Categoría desactivada y productos asociados transferidos exitosamente' ,
        categoriaEliminar
    });


}