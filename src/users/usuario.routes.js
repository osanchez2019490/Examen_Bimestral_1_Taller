import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { existeEmeail, existeRole, existeUsername } from "../helpers/db-validator.js";
import { UsuarioPut } from "./usuario.controller.js";

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

   export default router