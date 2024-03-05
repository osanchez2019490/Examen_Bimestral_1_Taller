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