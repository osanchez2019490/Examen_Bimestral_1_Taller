import Usuario from "../users/usuario.js";
import Carrito from "./carrito.js";
import Producto from "../producto/producto.js";
import { response, request } from 'express';
import jwt from "jsonwebtoken";


export const carritoPost = async (req = request, res = response) => {

    const { estado, total, producto, totalProducto, ...resto } = req.body;
    const token = req.header('x-token');

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioId = decoded.uid;

    const usuario = await Usuario.findById(usuarioId);
    const productoModel = await Producto.findOne({ nombre: producto });

    if(productoModel.stock == '0'){
        res.status(400).json({ 
            msg: "No hay stock del producto"
        });
    }
    resto.cliente = usuario._id;

    const totalProductoNumero = parseFloat(totalProducto);

    const totalCarrito = totalProductoNumero * parseFloat(productoModel.precio) + '.00Q';
    const restaStock =   parseFloat(productoModel.stock) - totalProductoNumero;

    const carritoData = {
        cliente: usuario._id,
        total: totalCarrito,
        producto: productoModel._id,
        totalProducto: totalProductoNumero,
        ...resto
    };


    

    await Usuario.findByIdAndUpdate(usuarioId, { direccion: resto.direccion });
    await Producto.findByIdAndUpdate(productoModel._id, {stock: restaStock, cantidadVendida: totalProductoNumero});

    const carrito = new Carrito(carritoData);
    await carrito.save();

    const carritoPopulado = await Carrito.findById(carrito._id)
        .populate('cliente')
        .populate({
            path: 'producto',
            select: '-cantidadVendida',
            populate: {
                path: 'categoria',
            }
            });

    res.status(200).json({
        carrito: carritoPopulado
    })
}

export const agregarProductos = async (req, res) => {
    const { nombreCarrito, producto, totalProducto } = req.body;

    const token = req.header('x-token');

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioId = decoded.uid;

    const usuario = await Usuario.findById(usuarioId);
    const productoModel = await Producto.findOne({ nombre: producto });
    const carrito = await Carrito.findOne({ nombreCarrito: nombreCarrito });

    

    if (!carrito.cliente.some(clienteId => clienteId.toString() === usuario._id.toString())) {
        res.status(400).json({
            msg: "No es tu carrito es de otro usuario"
        });
    }

    if(productoModel.stock == '0'){
        res.status(400).json({ 
            msg: "No hay stock del producto"
        });
    }
    
    carrito.producto.push(productoModel._id);

  

    const totalProductoNumero = parseFloat(totalProducto);

    const restaStock =  parseFloat(productoModel.stock) - totalProductoNumero ;
    const sumaVentaVendida = totalProductoNumero + parseFloat(productoModel.cantidadVendida)

    const totalProductoAnterior = parseFloat(carrito.totalProducto);
    const totalProductoActualizado = totalProductoAnterior + parseFloat(totalProducto);

    const totalCarrito = parseFloat(carrito.total) + (parseFloat(totalProducto) * parseFloat(productoModel.precio));

    carrito.totalProducto = totalProductoActualizado.toString();
    carrito.total = totalCarrito.toFixed(2) + 'Q';

    await Producto.findByIdAndUpdate(productoModel._id, {stock: restaStock, cantidadVendida: sumaVentaVendida});
    await carrito.save();

    const carritoPopulado = await Carrito.findById(carrito._id)
        .populate('cliente')
        .populate({
            path: 'producto',
            select: '-cantidadVendida',
            populate: {
                path: 'categoria',
            }
            });

    res.status(200).json({
        carrito: carritoPopulado
    })
}
