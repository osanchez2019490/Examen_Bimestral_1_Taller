const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuarioPost } = require('../controllers/usuario.controller');

const { existeEmeail, existeUsername} = require('../helpers/db-validator');

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

module.exports = router;