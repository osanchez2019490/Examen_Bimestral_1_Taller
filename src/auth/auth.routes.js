import { Router } from "express";
import { check } from "express-validator";

import { login } from '../auth/auth.controller.js';
import { validarCampos } from "../middlewares/validar-campos.js";
const router = Router();

router.post(
    '/login',
    [
        check('username', "Este no es un correo válido").not().isEmpty(),
        check('password'," el password es obligatorio").not().isEmpty(),
        validarCampos
    ], login)

    export default router;