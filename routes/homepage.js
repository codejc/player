const exp = require('express');
const router = exp.Router();

router.get('/homepage', function(req, res) {
    res.render('homepage');
});

module.exports = router;