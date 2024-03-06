import { response, request } from "express";
import Producto from './producto.controller.js';
import Categoria from "../categoria/categoria.js";


export const productoPost = async(req,res) => {
    const { nombre, descripcion, precio, stock, categoria} = req.body;
    const producto = new Producto ({nombre, descripcion, precio, stock, categoria});

    const categoriaModelo = new Categoria.findOne({ categoria });

    if(!categoriaModelo) {
        res.status(404).json({
            msg: "NO existe en la base de datos"
        })
    }

    if(categoriaModelo.estado = false){
        res.status(404).json({
            msg: "La categoria esta eliminada"
        })
    }

    if(producto.categoria.length >= 1){
        return res.status(404).json({
            msg: 'Maximo una categoria'
        })
    }
    producto.categoria = categoriaModelo;

    await producto.save();

    res.status(200).json({
        producto
    })
}