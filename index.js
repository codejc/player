const exp = require("express");
const bodyParser = require('body-parser');
const template = require('art-template');
const session = require('express-session');
const app = exp();

// 静态文件public
app.use(exp.static('public'));
// use使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 限制登录时间
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 20
    }
}));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div style = "margin-bottom:20px;color:red;">' + err + '</div>';
    next();
});


// 设置模版为html
app.set('view engine', 'html');
// 注册模版为html的template模版引擎
app.engine('html', template.__express);

// 使用路由
app.use(require('./routes/index'));
// app.use(require('./routes/user/signin'));
// app.use(require('./routes/user/signup'));
app.use(require('./routes/homepage'));


app.listen(80, function(req, res) {
    console.log("start server");
})