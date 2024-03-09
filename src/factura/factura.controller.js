import Carrito from "../carrito/carrito.js";
import Factura  from "./factura.js";
import Usuario from "../users/usuario.js";
import Producto from "../producto/producto.js";
import { response, request } from 'express';
import jwt from "jsonwebtoken";
import Historial from "../historial/historial.js";

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

    if(deseaPagar == 'No'){
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

    const historialData = {
        factura: factura._id
    }

    const historial = new Historial(historialData)

    await historial.save();
    await factura.save();

    const facturaPopulado = await Factura.findById(factura._id)
        .populate({
            path: 'cliente',
            select: '-_id',
            select: '-password'
            })
        .populate({
            path: 'producto',
            select: '-cantidadVendida',
            select: '-_id',
            populate: {
                path: 'categoria',
                select: '-_id',
            }
            });

    res.status(200).json({
        factura: facturaPopulado
    })

}

export const obtenerFacturaUsuario = async(req, res) =>{
    const { nombreUsuario } = req.body;

    const usuario = await Usuario.findOne({ username: nombreUsuario });

    if(!usuario){
        return res.status(400).json({
            msg: "Usuario no encontrado"
        })
    }

    const facturas = await Factura.find({ cliente: usuario._id});

    const facturasDetalladas = [];
    for (const factura of facturas) {
        const productos = await Producto.find({ _id: { $in: factura.producto } });
        const facturaDetallada = {
            cliente: nombreUsuario,
            direccion: factura.direccion,
            fecha: factura.fecha,
            total: factura.total,
            productos
        };
        facturasDetalladas.push(facturaDetallada);
    }

    res.status(200).json({
        facturasDetalladas
    });

}