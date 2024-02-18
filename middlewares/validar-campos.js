const { validationResult } = require('express-validar');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
}

module.exports = {
    validarCampos
}