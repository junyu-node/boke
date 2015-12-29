var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function(err,articles){

    res.render('index', { articles: articles });

  })
});

module.exports = router;
