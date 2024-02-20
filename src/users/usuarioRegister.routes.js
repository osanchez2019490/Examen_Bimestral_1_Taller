import { Router } from "express";
import { check } from "express-validator";


import { validarCampos } from '../middlewares/validar-campos.js';
import { usuarioPost } from '../users/usuario.controller.js';

import { existeEmeail, existeUsername} from '../helpers/db-validator.js';

const router = Router();

router.post(
    "/",
    [
        check("username", "El username no tiene que ir vacio").not().isEmpty(),
        check("username").custom(existeUsername),
        check("nombre", "El nombre del usuario es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmeail),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        validarCampos
    ], usuarioPost)

export default router;