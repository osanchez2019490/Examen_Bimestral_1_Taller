import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { existeEmeail, existeRole, existeUsername } from "../helpers/db-validator.js";
import { UsuarioDelete, UsuarioPut } from "./usuario.controller.js";
import {  productoByCategoria, productoByNombre, productoGet } from "../producto/producto.controller.js";
import {  categoriaUsuarioGet } from "../categoria/categoria.controller.js";

const router = Router();

router.put(
    "/",
   [
       validarJWT,
       tieneRol("USUARIO_ROLE"),
       check("correo", "El correo no es un correo valido").isEmail(),
       check("correo").custom(existeEmeail),
       validarCampos
   ], UsuarioPut)

router.delete(
    "/",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        validarCampos
    ], UsuarioDelete)

router.get(
    "/productos",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        validarCampos
    ], productoByNombre)

router.get(
    "/categorias",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        validarCampos
    ], categoriaUsuarioGet)

router.get(
    "/categorias/productos",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        validarCampos
    ], productoByCategoria)

router.get(
    "/productos/masVendidos",
    [
        validarJWT,
        tieneRol("USUARIO_ROLE"),
        validarCampos
    ], productoGet)

   export default router