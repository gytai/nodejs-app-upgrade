var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
    util = require('util');
var md5 = require('../utils/md5');

//文件上传
router.post('/upload', function(req, res, next) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/uploads/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 100 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        var file = files.file;
        if(!file){
            return res.send({code:400,msg:'位置错误'});
        }
        md5.get_file_md5(file.path).then(function (result) {
            var path = file.path.split('/');
            var info = {
                file_name:file.name,
                file_md5:result,
                file_size:file.size,
                file_path:'/'+path[1]+'/'+path[2]
            };
            return res.send({code:200,msg:'上传成功',data:info});
        });
    });
});


/* 页面路由 */
router.get('/', function(req, res, next) {
  if(req.session.user){
      res.render('index');
  }else{
      res.render('login');
  }
});

router.get('/welcome', function(req, res, next) {
    res.render('welcome');
});

router.get('/project', function(req, res, next) {
    res.render('project');
});

router.get('/pswset', function(req, res, next) {
    res.render('pswset');
});

router.get('/users', function(req, res, next) {
    res.render('users');
});



module.exports = router;
