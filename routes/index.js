const exp = require('express');
const router = exp.Router();

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;