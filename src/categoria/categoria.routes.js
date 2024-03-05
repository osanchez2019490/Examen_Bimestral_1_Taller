import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { categoriaGet, categoriaPost } from "./categoria.controller.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("categoria", "La categoria es necesaria").not().isEmpty(),
        check("descripcion", "La descripcion es necesaria"),
        validarCampos
    ], categoriaPost)


router.get("/", [validarJWT,tieneRol("ADMINISTRADOR_ROLE")], categoriaGet)

export default router;
