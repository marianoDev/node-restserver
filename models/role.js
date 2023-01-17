// MODELO PARA ROLES

const {Schema , model} = require('mongoose');

const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El campo es requerido'],
    }
});

module.exports = model('Role', roleSchema)