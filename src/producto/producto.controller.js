import { response, request } from "express";
import Producto from './producto.js';
import Categoria from "../categoria/categoria.js";


export const productoPost = async(req,res) => {
    const { nombre, descripcion, precio, stock, categoria} = req.body;
    const producto = new Producto ({nombre, descripcion, precio, stock, categoria});

    const categoriaModelo = await Categoria.findOne({ categoria: categoria });

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

export const productoGet = async(req, res) => {
    const { limite, desde, agotado, masVendidos} = req.query;
    
    const query = { estado: true}

    if (agotado && agotado.toLowerCase() === 'true') {
        query.stock = { $lte: 0 };
    }

    let productos;

    if (masVendidos && masVendidos.toLowerCase() === 'true') {
        productos = await Producto.find(query)
        .sort({ cantidadVendida: -1 })        
        .skip(Number(desde))
        .limit(Number(limite))
        .populate({
            path: 'categoria', 
        });
    } else {

        productos = await Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate({
            path: 'categoria', 
        });
    }

    const total = await Producto.countDocuments(query);


    res.status(200).json({
        total,
        productos
    })
}
