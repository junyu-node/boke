/**
 * Created by Administrator on 2015/12/5.
 */
//mongo ds019658.mlab.com:19658/blogs -u junyu -p aini1314
var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
//mongodb://127.0.0.1/blogs

var db=mongoose.connect('mongodb://junyu:aini1314@ds019658.mlab.com:19658/blogs');

//var db=mongoose.connect('mongodb://127.0.0.1/blogs');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String

}));
mongoose.model('Article',new mongoose.Schema({
    title:String,
    content:String,
    titleimg:String,
    user:{type:ObjectId,ref:'User'}//对象Id类型,引用user


}));

mongoose.model('Img',new mongoose.Schema({
    name:String,
    src:String
}))



global.Model=function(modName){
    //console.log(modName)
    return mongoose.model(modName)
};

