import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { obtenerFacturaUsuario } from "../factura/factura.controller.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        validarCampos
    ], obtenerFacturaUsuario)


export default router;