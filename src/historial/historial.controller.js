import Historial from "./historial.js";
import Usuario from '../users/usuario.js';
import Factura from "../factura/factura.js";
import { request, response } from "express";
import  jwt  from "jsonwebtoken";

export const historialGet = async(req, res) => {
    const { limite, desde} = req.query;
    const token = req.header('x-token');

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioId = decoded.uid;

    const query = {};

    const facturas = await Factura.find({ cliente: usuarioId});

    const facturaIds = facturas.map(factura => factura._id);

    query.factura = { $in: facturaIds};

    let historial;

    historial = await Historial.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        

    historial = await Promise.all(historial.map(async (item) => {
        const facturaPopulada = await Factura.findById(item.factura)
            .populate({
                   path: 'cliente',
                select: '-_id -password'
            })
            .populate({
                 path: 'producto',
                select: '-cantidadVendida -_id',
                populate: {
                    path: 'categoria',
                    select: '-_id'
                }
            });

        return {
             ...item.toJSON(),
             factura: facturaPopulada
         };
    }));

    res.status(200).json({
        total: historial.length, 
        historial
    })

}