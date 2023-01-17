// MIDDLEWARES: FUNCIONES QUE SE EJECUTAN ANTES DE QUE SE LEVANTE
// ALGUN PROCESO EN MI APP, COMO UNA VALIDACION POR EJ

const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}

module.exports = {
    validarCampos
}