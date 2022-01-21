var express = require('express');
var router = express.Router();

const controller = require('../controllers/libro'); 
const cors = require('cors');

router.use(cors());

router.get('/all_libro',controller.get_all_libro);  
router.post('/libro',controller.post_libro); 
router.put('/libro',controller.put_libro); 
router.delete('/libro', controller.delete_libro);

module.exports = router;