const exp = require('express');
const router = exp.Router();

router.get('/musicHall/album', function(req, res) {
    res.render('musicHall/album');
});

module.exports = router;