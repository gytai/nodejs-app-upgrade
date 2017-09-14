var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
      res.render('index', { title: 'Express' });
  }else{
      res.render('login');
  }
});


router.get('/index', function(req, res, next) {
    res.sendfile("./template/index.html");
});

module.exports = router;
