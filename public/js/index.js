/**
 * Created by Administrator on 2015/12/5.
 */


$(function(){
    $('.submit-btn').click(function(){

        $.ajax({
            url:'/users/reg',
            type:'post',
            dataType:'JSON',
            data:{
                username:$('#username').val(),
                password:$('#password').val(),
                password2:$('#password2').val(),
            },
            success:function(data){

                if(!data.status){
                    alert(data.msg)
                }else{
                    window.location.href=data.msg;
                }
            }
        });
    })
    $('.btn-submint').click(function(){
        $.ajax({
            url:'/users/login',
            type:'post',
            dataType:'JSON',
            data:{
                username:$('#username').val(),
                password:$('#password').val(),
            },
            success:function(data){

                if(!data.status){
                    alert(data.msg)
                }else{
                    window.location.href=data.msg;
                }
            }
        });
    })
});
