const exp = require('express');
const router = exp.Router();

router.get('/musicHall/singer', function(req, res) {
    res.render('musicHall/singer');
});

module.exports = router;