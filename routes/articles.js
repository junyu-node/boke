var express = require('express');
var router = express.Router();
var path=require('path');
var multer=require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'../public/upload')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'.'+path.extname(file.originalname))
  }
});

var upload=multer({storage:storage});

//当用户访问 /add的时候 渲染此模板
router.get('/add', function(req, res) {
  //var body=req.body;
  //req.session.article= body;

  res.render('articles/add', { title: '发表文章' });
});
router.post('/add', function(req, res, next) {
  console.log(req.session)
  var article=req.body;
  console.log(article)
  //id=article.id;
  //if(id){
  //  var updateObj={
  //    title:article.title,
  //    content:article.content
  //
  //  }
  //  if(req.file){
  //    var poster=path.join('/upload',req.file.filename);
  //    updateObj.poster=poster;
  //  }
  //  new Model('Article').update({_id:id},{$set:updateObj},function(err){
  //    if(err){
  //      res.redirect('back')
  //    }else{
  //      res.redirect('/articles/detail'+id)
  //    }
  //  })
  //}else{
    article.user=req.session.user._id;
   // article.poster=path.join('/upload',req.file.filename);
    new Model('Article')(article).save(function(err,article){
      if(err){
        res.redirect('back')
      }else{
        res.redirect('/')
      }
    });
  //}
});

module.exports = router;
