var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg', function(req, res, next) {
  res.render('users/reg',{indexActive:'reg'});

})
;router.post('/reg', function(req, res, next) {

  var user=req.body;
  Model('User').findOne({username:user.username},function(err,doc){
    if(!doc){
      if(user.password==user.password2){
        new Model('User')(user).save(function(err,user){
          //res.end(JSON.stringify({status:1, msg:'注册成功'}));
          if(err){
            //res.redirect('/users/reg');

            res.end(JSON.stringify({status:0, msg:'出现错误'}));
          }else{
            //res.redirect('/users/login')
            res.end(JSON.stringify({status:1, msg:'/users/login'}));
          }
        })
      }else{
        res.end(JSON.stringify({status:0, msg:'两次输入的密码不一致'}));
      }
    }else{
      res.end(JSON.stringify({status:0, msg:'用户名已经存在'}));
    }
  })


 // res.send('注册');
});
router.get('/login', function(req, res, next) {
  res.render('users/login',{indexActive:'log'});
});
router.post('/login', function(req, res, next) {
  var user=req.body;
  Model('User').findOne(user,function(err,user){

    if(!err){
     // console.log(doc)
      if(user){
        //console.log(res.session)
        console.log(user)
       req.session.login=user;

        res.end(JSON.stringify({status:1, msg:'/'}));
      }else{
        res.end(JSON.stringify({status:0, msg:'用户名或密码错误'}));
      }
    }
  });



});

router.get('/logout', function(req, res, next) {
  req.session.login=null;
  res.redirect('/users/login');
});



module.exports = router;
