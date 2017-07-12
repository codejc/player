const exp = require('express'),
    db = require('../../db');
const router = exp.Router();
router.get('/user/logout', function(req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
});

module.exports = router;