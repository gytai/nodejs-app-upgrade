var express = require('express');
var router = express.Router();
var user_model = require('../model/users');

router.post('/login', function(req, res, next) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    user_model.login(username,password,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        req.session.user = data;
        return res.send({code:200,msg:'登录成功'});
    });

});

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

router.post('/pswset', function(req, res, next) {
    var password = req.body.password || '';
    var password_new = req.body.password_new || '';
    if(!req.session.user){
        return res.redirect('/');
    }
    user_model.reset_psw(req.session.user.username,password,password_new,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        req.session.user = data;
        return res.send({code:200,msg:'登录成功'});
    });
});

module.exports = router;
