const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;
db.on('error', function() {
    console.log('数据库连接失败')
})

db.once('open', function() {
    console.log('数据库连接成功')
})

exports.User = mongoose.model('User', mongoose.Schema({ username: String, password: String }, { collection: 'Users' }))