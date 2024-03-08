import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { agregarProductos, carritoPost } from "./carrito.controller.js";
import { existeNombreDeCarrito } from "../helpers/db-validator.js";
import { facturaPost } from "../factura/factura.controller.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        check("nombreCarrito", "El nombre del carrito es necesaria").not().isEmpty(),
        check("nombreCarrito").custom(existeNombreDeCarrito),
        check("direccion", "La direccion es necesaria").not().isEmpty(),
        check("producto", "El  producto es necesaria").not().isEmpty(),
        check("totalProducto", "El Total es necesaria").not().isEmpty(),
        validarCampos
    ],carritoPost)

router.post(
    "/agregarProducto",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        check("nombreCarrito", "El nombre del carrito es necesaria").not().isEmpty(),
        check("producto", "El  producto es necesaria").not().isEmpty(),
        check("totalProducto", "El Total es necesaria").not().isEmpty(),
        validarCampos
    ],agregarProductos)
    
router.post(
    "/pagar",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        check("nombreCarrito", "El nombre del carrito es necesaria").not().isEmpty(),
        check("deseaPagar", "El nombre del carrito es necesaria").not().isEmpty(),
        validarCampos
    ], facturaPost)
export default router;