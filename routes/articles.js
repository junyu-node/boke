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
  res.render('articles/add', { title: '发表文章',article:{},indexActive:'add'});
});
router.post('/add',upload.single('titleimg'), function(req, res, next) {

  var article=req.body;
  var id=article.id;
  if(id){
    var updateObj={
      title:article.title,
      content:article.content
    };
    if(req.file){
      titleimg=path.join('/upload',req.file.filename);

      updateObj.titleimg=titleimg;
    }
    new Model('Article').update({_id:id},{$set:updateObj},function(err){
      if(err){
        res.redirect('back');
      }else{
        res.redirect('/articles/detail/'+id)
      }
    })

  }else{
    article.user=req.session.login._id;
    if(req.file){
      article.titleimg=path.join('/upload',req.file.filename);

    }else{
      article.titleimg='/upload/1451374520675.jpg';
    }
    new Model('Article')(article).save(function(err,article){
      if(err){
        res.redirect('back')
      }else{
        res.redirect('/')
      }
    });
  }



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

router.get('/list/:pageNum/:pageSize',function(req,res){
  var keyworld=req.query.keyworld;
  var pageNum=parseInt(req.params.pageNum);
  var pageSize=parseInt(req.params.pageSize);
  var reg=new RegExp(keyworld,'i');
  Model('Article').count({$or:[{title:reg},{content:reg}]},function(err,count){
    var totalPage=Math.ceil(count/pageSize);


    pageNum=pageNum>=totalPage?totalPage:pageNum;
    Model('Article').find({$or:[{title:reg},{content:reg}]})
        .skip((pageNum-1)*pageSize).limit(pageSize).exec(function(err,articles){
        //console.log(articles);
        res.render('index',{
          title:'主页',
          pageNum:pageNum,
          pageSize:pageSize,
          keyworld:keyworld,
          totalpage:totalPage,
          articles:articles

        })
    })
  })


})
module.exports = router;
