var express = require('express');
var router = express.Router();

const campa = require('../controllers/ejemplo');
const cors = require('cors');
router.use(cors());
//endpoint
router.get('/get_prueba', campa.get_prueba);
router.post('/post_prueba', campa.post_prueba);
router.get('/prueba', (req, res) => { res.send('bien desde plantilla') });

module.exports = router;
