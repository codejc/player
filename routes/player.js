const exp = require('express');
const router = exp.Router();

router.get('/player', function(req, res) {
    res.render('player');
});

module.exports = router;