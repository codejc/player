const exp = require('express'),
    db = require('../../db');
const router = exp.Router();

router.post('/user/signin', function(req, res) {
    db.User
        .find({ username: req.body.username })
        .select('username password')
        .exec((error, data) => {
            if (error) {
                // 错误
            } else {
                if (data.length == 0) {
                    res.json({
                        // 0失败，1成功 2未注册 3密码错误
                        code: '2',
                        message: '该用户未注册'
                    });
                } else {
                    if (data[0].toObject().password == req.body.password) {
                        req.session.user = data[0].toObject().username;
                        res.json({
                            code: '1',
                            message: '登录成功'
                        })
                    } else {
                        res.json({
                            code: '3',
                            message: '密码错误，请重新输入'
                        })
                    }

                }
            }
        })
})
module.exports = router;