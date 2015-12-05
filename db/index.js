/**
 * Created by Administrator on 2015/12/5.
 */

var mongoose=require('mongoose');

var db=mongoose.connect('mongodb://123.57.143.189/201508blog');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String
}));



global.Model=function(modName){
    //console.log(modName)
    return mongoose.model(modName)
};

