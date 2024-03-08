import Carrito from "../carrito/carrito.js";
import Factura  from "./factura.js";
import Usuario from "../users/usuario.js";
import { response, request } from 'express';
import jwt from "jsonwebtoken";


export const facturaPost = async(req, res) => {

    const { nombreCarrito, deseaPagar} = req.body;
    const token = req.header('x-token');

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioId = decoded.uid;

    const usuario = await Usuario.findById(usuarioId);
    const carrito = await Carrito.findOne({nombreCarrito: nombreCarrito});


    if (!carrito.cliente.some(clienteId => clienteId.toString() === usuario._id.toString())) {
        res.status(400).json({
            msg: "No es tu carrito es de otro usuario"
        });
    }

    if(deseaPagar == 'Si'){
        res.status(400).json({ 
            msg: "Usted no desea pagar este carrito"
        });
    }

    if(deseaPagar == 'Never Gonna'){
        res.status(400).json({ 
            msg: "Never gonna give you up"
        });
    }

    const fecha = new Date().toISOString();


    const facturaData = {
        cliente: carrito.cliente,
        direccion: carrito.direccion,
        fecha: fecha,
        total: carrito.total,
        producto: carrito.producto
    };

    const factura = new Factura(facturaData);

    await factura.save();

    const facturaPopulado = await Factura.findById(factura._id)
        .populate('cliente')
        .populate({
            path: 'producto',
            select: '-cantidadVendida',
            populate: {
                path: 'categoria',
            }
            });

    res.status(200).json({
        factura: facturaPopulado
    })

}