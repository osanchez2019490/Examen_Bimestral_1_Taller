import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar.jwt.js";
import { tieneRol } from "../middlewares/validar.rol.js";
import { categoriaDelete, categoriaGet, categoriaGetById, categoriaPost, categoriaPut } from "./categoria.controller.js";
import { existeCategoria, existeCategoriaById } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRol("ADMINISTRADOR_ROLE"),
        check("categoria", "La categoria es necesaria").not().isEmpty(),
        check("categoria").custom(existeCategoria),
        check("descripcion", "La descripcion es necesaria"),
        validarCampos
    ], categoriaPost)


router.get("/", [validarJWT,tieneRol("ADMINISTRADOR_ROLE")], categoriaGet)

router.get("/:id", [validarJWT,tieneRol("ADMINISTRADOR_ROLE"), check("id", "NO es una id valida").isMongoId(),check("id").custom(existeCategoriaById)], categoriaGetById)

router.put(
    "/:id", 
        [validarJWT, 
        tieneRol("ADMINISTRADOR_ROLE"),
        check("id", "NO es una id valida").isMongoId(),
        check("id").custom(existeCategoriaById), 
        validarCampos
    ], categoriaPut)

router.delete(
    "/:id",
    [
        validarJWT, 
        tieneRol("ADMINISTRADOR_ROLE"),
        check("id", "NO es una id valida").isMongoId(),
        check("id").custom(existeCategoriaById), 
        validarCampos
    ], categoriaDelete)
export default router;
