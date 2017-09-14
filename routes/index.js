var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
      res.render('index');
  }else{
      res.render('login');
  }
});


router.get('/project', function(req, res, next) {
    res.render('project');
});

module.exports = router;
