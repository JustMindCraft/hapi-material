const config = require("../config");
function initDB(){
    const mongoose = require('mongoose');
    mongoose.connect(config.db, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("数据库链接成功");
    });    
}

module.exports = initDB;