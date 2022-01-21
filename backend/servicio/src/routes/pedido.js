var express = require('express');
var router = express.Router();

const controller = require('../controllers/pedido'); 
const cors = require('cors');

router.use(cors());

router.get('/libros',controller.get_libros); 
router.post('/pedido',controller.post_pedido); 
router.get('/pedido',controller.get_pedidos); 
router.put('/pedido',controller.setEstadoPedido); 

module.exports = router;