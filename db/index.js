/**
 * Created by Administrator on 2015/12/5.
 */

var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var db=mongoose.connect('mongodb://127.0.0.1/blogs');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String

}));
mongoose.model('Article',new mongoose.Schema({
    title:String,
    content:String,
    poster:String,
    user:{type:ObjectId,ref:'User'}//对象Id类型,引用user


}))



global.Model=function(modName){
    //console.log(modName)
    return mongoose.model(modName)
};

