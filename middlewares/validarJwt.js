const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    // SI NO HAY TOKEN

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    // VALIDACION DEL TOKEN

    try {

        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );
        
        // leer usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        
        // Usuario borrado
        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe el usuario en la DB'
            })
        }

        // verificar si el uid tiene estado: true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - estado:false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
    
}

module.exports = {
    validarJWT
}