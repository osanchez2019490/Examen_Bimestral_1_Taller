import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { productoById, productoGet, productoPost } from "./producto.controller.js";

const router = Router();

router.post(
    "/", 
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("nombre", "El producto necesita un nombre").not().isEmpty(),
        check("descripcion", "El producto necesita una descripcion").not().isEmpty(),
        check("stock", "El producto necesita un stock").not().isEmpty(),
        check("categoria", "El producto necesita una categoria").not().isEmpty(),
        validarCampos

    ], productoPost)

router.get("/", [validarJWT, tieneRol("ADMINISTRADOR_ROLE")],productoGet )

router.get(
    "/:id",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("id", "No es una id valida").isMongoId(),
    ], productoById
)



export default router;