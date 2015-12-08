/**
 * Created by Administrator on 2015/12/5.
 */

var mongoose=require('mongoose');

var db=mongoose.connect('mongodb://127.0.0.1/blogs');
mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String
}));



global.Model=function(modName){
    //console.log(modName)
    return mongoose.model(modName)
};

