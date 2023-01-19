const {response} = require('express');
const Usuairo = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJwt');
 
const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuairo.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - correo'
            })
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id); 

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal! Hable con el admin'
        })
    }

}

module.exports = {
    login
}