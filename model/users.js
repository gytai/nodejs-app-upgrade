var mongoose = require('../mongoose').mongoose;
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username : { type:String },
    password : { type:String },
    time : { type:Date, default:Date.now }
});

var UsersModel = mongoose.model("users", UsersSchema);

function login(username,password,callback) {
    password = md5.update(password).digest('hex');
    var condition = {'username' : username,'password':password};

    UsersModel.find(condition, function(err, res){
        var _err = null;
        if (err) {
            _err = err;
        }
        if(res.length == 0){
            _err = '用户名密码不正确';
        }
        return callback(_err,res);
    })
}

exports.login = login;