const exp = require('express'),
    db = require('../../db');

// 创建一个router（路由）
const router = exp.Router();

router.post('/user/signup', function(req, res) {
    var user = db.User(req.body)
    user.save(function(error) {
        if (error) {
            res.json({
                code: "error",
                message: "注册失败"
            })
        } else {
            res.json({
                code: "success",
                message: "注册成功"
            })
        }
    })
})

// 路由接口
module.exports = router;