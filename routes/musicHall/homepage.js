const exp = require('express');
const router = exp.Router();

router.get('/musicHall/homepage', function(req, res) {
    res.render('musicHall/homepage');
});

module.exports = router;