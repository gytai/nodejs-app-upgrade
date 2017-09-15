var express = require('express');
var router = express.Router();
var project_model = require('../model/project');

router.get('/query', function(req, res, next) {
    var page = req.query.page || 1;
    var size = req.query.size || 10;

    if(typeof page == 'string'){
        page = parseInt(page);
    }

    if(typeof size == 'string'){
        size = parseInt(size);
    }

    project_model.query(page,size,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'查询成功',data:data});
    });

});

router.post('/add', function(req, res, next) {
    if(!req.session.user){
        return res.send({code:400,msg:'未登录'});
    }

    var name = req.body.name ;
    var version = req.body.version;
    var is_force = req.body.is_force || 0;
    var download_path = req.body.download_path ;
    var option_people = req.session.user.username;
    var file_name = req.body.file_name ;
    var file_size = req.body.file_size ;
    var file_md5 = req.body.file_md5 ;
    var remark = req.body.remark ;

    if(!name || !version || !download_path || !remark){
        return res.send({code:400,msg:'参数未传'});
    }

    project_model.add(name,version,download_path,is_force,option_people,file_md5,file_size,file_name,remark,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'添加成功',data:data});
    });
});

router.post('/del', function(req, res, next) {
    var id = req.body.id ;
    if(!id){
        return res.send({code:400,msg:'参数未传'});
    }
    project_model.del(id,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'删除成功'});
    });
});

router.post('/update', function(req, res, next) {
    var id = req.body.id ;
    if(!id){
        return res.send({code:400,msg:'参数未传'});
    }
    if(!req.session.user){
        return res.send({code:400,msg:'未登录'});
    }
    var name = req.body.name ;
    var version = req.body.version;
    var is_force = req.body.is_force;
    var download_path = req.body.download_path ;
    var option_people = req.session.user.username;
    var file_name = req.body.file_name ;
    var file_size = req.body.file_size ;
    var file_md5 = req.body.file_md5 ;
    var remark = req.body.remark ;

    project_model.update(id,name,version,download_path,is_force,option_people,file_md5,file_size,file_name,remark,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'删除成功'});
    });
});

router.post('/check', function(req, res, next) {
    var name = req.body.name ;
    var version = req.body.version ;
    if(!name || !version){
        return res.send({code:400,msg:'参数未传'});
    }
    project_model.check(name,version,function (err,data) {
        if(err){
            console.error(err);
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'有新的升级',data:data});
    });
});

module.exports = router;
