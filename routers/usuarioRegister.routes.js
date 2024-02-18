const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuarioPost } = require('../controllers/usuario.controller');

const { existeEmeail } = require('../helpers/db-validator')