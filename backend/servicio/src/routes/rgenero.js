var express = require('express');
var router = express.Router();

const contrl = require('../controllers/genero'); 
const cors = require('cors');

router.use(cors());
//endpoint

router.get('/listar_generos',contrl.listar_generos); 


//router.post('/registrarse',contrl.crearUser); 
router.post('/crear_genero',contrl.crearGenero); 
router.post('/actualizar_genero',contrl.actualizar_genero); 
router.post('/eliminar_genero',contrl.eliminar_genero); 

module.exports = router;
