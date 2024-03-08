import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { existeEmeail, existeRole, existeUsername } from "../helpers/db-validator.js";
import { UsuarioAdminPut, usuarioPost } from "../users/usuario.controller.js";
import { administradorPost, administradorPut } from "./administrador.controller.js";

const router = Router();

 router.post(
    "/user",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("username", "El username no tiene que ir vacio").not().isEmpty(),
        check("username").custom(existeUsername),
        check("nombre", "El nombre del usuario es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmeail),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        validarCampos
    ],usuarioPost)

 router.post(
    "/admin",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("username", "El username no tiene que ir vacio").not().isEmpty(),
        check("username").custom(existeUsername),
        check("nombre", "El nombre del administrador es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmeail),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        check("role", "Se necestia un role").not().isEmpty(),
        check("role").custom(existeRole),
        validarCampos
    ],administradorPost)

 router.put(
    "/admin",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmeail),
        check("role", "Se necestia un role").not().isEmpty(),
        check("role").custom(existeRole),
        validarCampos
    ], administradorPut)

 router.put(
     "/user",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmeail),
        validarCampos
    ], UsuarioAdminPut)
    
export default router;