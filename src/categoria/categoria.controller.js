import { response, request } from 'express';
import Categoria from './categoria.js';


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