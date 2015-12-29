var express = require('express');
var router = express.Router();
var path=require('path');
var multer=require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'../public/upload')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname))
  }
});

var upload=multer({storage:storage});

//当用户访问 /add的时候 渲染此模板
router.get('/add', function(req, res) {


  res.render('articles/add', { title: '发表文章',article:{}});
});
router.post('/add',upload.single('titleimg'), function(req, res, next) {

  var article=req.body;


    article.user=req.session.login._id;
  
    article.titleimg=path.join('/upload',req.file.filename);
    new Model('Article')(article).save(function(err,article){
      if(err){
        res.redirect('back')
      }else{
        res.redirect('/')
      }
    });

});

router.get('/detail/:id',function(req,res){
  var id=req.params.id;
  Model('Article').findById(id,function(err,article){

    res.render('articles/detail',{article:article})
  })

});

router.get('/delete/:id',function(req,res){
  var id=req.params.id;
  Model('Article').remove({_id:id},function(err){

    res.redirect('/')
  })

});
router.get('/edit/:id',function(req,res){
  var id=req.params.id;
  Model('Article').findById(id,function(err,article){

    res.render('articles/add',{article:article})
  })



});
module.exports = router;
