const Router = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('ESB running');
});


module.exports = router;