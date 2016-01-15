var express = require('express');
var router = express.Router();
var path=require('path');
var multer=require('multer');
//var storage=multer.diskStorage({
//  destination:function(req,file,cb){
//    cb(null,'../public/upload')
//  },
//  filename:function(req,file,cb){
//    cb(null,Date.now()+path.extname(file.originalname))
//  }
//});把图片存的本地
var storage = multer.memoryStorage();
var upload=multer({storage:storage});

//当用户访问 /add的时候 渲染此模板
router.get('/add', function(req, res) {
  if(req.session.login){
    res.render('articles/add', { title: '发表文章',article:{},indexActive:'add'});

  }else{
    req.flash('warning','请先登录,再添加文章')
    res.redirect('/users/login')
  }
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


      updateObj.titleimg='data:'+req.file.mimetype+';base64,'+req.file.buffer.toString('base64');
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
      article.titleimg='data:'+req.file.mimetype+';base64,'+req.file.buffer.toString('base64');

    }else{
      article.titleimg='data:image/vnd.microsoft.icon;base64,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l/8zOMf/ICDM/x8d1f8XE5vqBQQeLwUEHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwcBAAAAAAJsMwdWs1QJ3blwNf/WzMD//v/8////+//9/fr/+vr3//f29v/28/T/8u/y/+Hh6P/IyNP/sbHX/2xtnfcoKDFKOTlFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//ygAZzEHV8heDOvEbCf/1s3F////////////////////////////////////////////////////////////9/f2/5aWlsAFBQUdHBwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYS4HAEQgBS69Wg3b32wS/8arlv/9///////////////09PT/2dnZ/9TU1P/U1NT/xMTE/9LS0v/j4+P//Pz8////////////5OTk/2JiYo0AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoFAQAAAAAClUcLmuxwD/+zaTD/09PT///////8/Pz/2tra/8HBwf/X19f/8fHx//Pz8/+/v7//5OTk/8rKyv/FxcX/8PDw////////////np6e7QgGBT4REBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOxwEADYaBCfJYA/h73EP/72Xev/GyMr/ycnJ/7u7u//Ozs7/+/v7////////////+fn5/9HR0f/+/v7//////+np6f/CwsL/7+/v///////a2Nf/Sz40lwAAAAIEAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7WQ4AdjgJYeVtEf3kbxT/1cCv//7///+2trb/o6Oj/87Ozv/k5OT//Pz8///////19fX/1NTU/////////////////+rq6v/Hx8f//Pz8//b19P+CYkneHQAAIyYRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/yJgCCPgqR8HMR/9ptGP/ZzcL/29zd/9LS0v//////7u7u/87Ozv/t7e3//////+7u7v/X19f///////z8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';
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
  if(req.session.login) {
    if(req.session.login.username==article.user.username){
      Model('Article').remove({_id: id}, function (err) {

          res.redirect(req.session.url);
      })
    }else{
      req.flash('warning','您不能编辑别人的文章');
      res.redirect('back')
    }

  }else{
    req.flash('warning','删除文章必须先登录');
    res.redirect('/users/login')
  }
});
router.get('/edit/:id',function(req,res){
  var id=req.params.id;
  if(req.session.login){
  Model('Article').findById(id).populate('user').exec(function(err,article){

    if(req.session.login.username==article.user.username){
      res.render('articles/add',{article:article})
    }else{
      req.flash('warning','您不能编辑别人的文章');
      res.redirect('back')
    }

  })
  }else{
    req.flash('warning','编辑文章请先登录');
    res.redirect('/users/login');
  }


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
        .skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
        req.session.url='/articles/list/'+pageNum+'/'+pageSize+'?keyworld='+keyworld;
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
