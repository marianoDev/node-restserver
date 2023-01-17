// DIRECTORIO DE VALIDACIONES

const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    
    // Verifica si el rol existe
    const existeRol = await Role.findOne({rol})
    
    // En caso de que el rol no exista
    if (!existeRol) {
        throw new Error(`El ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async( correo = '') => {
    
    // Verificar si el correo existe.
    const existeCorreo = await Usuario.findOne({correo})

    if (existeCorreo) {
        throw new Error(`Este correo: ${correo} ya esta registrado`)
    }
}

const existeUserbyId = async( id ) => {
     
    // Verificar si el id existe.
     const existeUsuario = await Usuario.findById(id)

     if (!existeUsuario) {
         throw new Error(`Este id: ${id} no existe`)
     }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUserbyId
}