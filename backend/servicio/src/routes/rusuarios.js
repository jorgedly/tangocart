var express = require('express');
var router = express.Router();

const contrl = require('../controllers/usuario'); 
const cors = require('cors');

router.use(cors());
//endpoint
router.get('/listar_usuarios',contrl.listar_usuarios); 

router.post('/registrarse',contrl.crearUser); 
router.post('/agregar_admin', contrl.crearAdmin);
router.post('/activar_usuario', contrl.activarUsuario); 
router.post('/eliminar_usuario',contrl.eliminarUsuario);
router.post('/get_usuario',contrl.get_usuario);
router.post('/login',contrl.login);

//Nuevas funcs
router.post('/crear_producto',contrl.post_crearproducto); 
router.post('/misproductos',contrl.get_misproductos); 
router.put('/editar_producto',contrl.put_editarProducto); 
router.delete('/eliminar_producto',contrl.delete_eliminarProducto);
router.put('/editar_producto',contrl.post_terminarPuja); 

module.exports = router;
