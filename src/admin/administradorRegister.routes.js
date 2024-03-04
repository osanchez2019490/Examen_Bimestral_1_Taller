import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';

import { administradorPost } from '../admin/administrador.controller.js';

import { existeEmeail, existeRole, existeUsername} from '../helpers/db-validator.js';


const router = Router();

router.post(
    "/",
    [
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
    ], administradorPost)

export default router;