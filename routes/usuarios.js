// DIRECTORIO DE RUTAS

const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUserbyId } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarJwt');

const router = Router();

// EJEMPLOS DE METODOS
router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido' ).isMongoId(),
    check('id').custom(existeUserbyId),
    validarCampos
], usuariosPut );

router.post('/',[
    check('correo').custom(emailExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener 6 caracteres').isLength({min:6}),
    check('rol').custom( rol => esRoleValido(rol) ),
    validarCampos  
], usuariosPost );

router.delete('/:id', 
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE, VENTAS_ROLE', 'NOSE_ROLE'),
    check('id', 'No es un ID valido' ).isMongoId(),
    check('id').custom(existeUserbyId),
    validarCampos
,usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;