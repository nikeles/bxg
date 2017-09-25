define(['jquery','template','util','form'],function ($,template,util) {
    // 实现选选中效果
    util.setAsideActive(location.pathname);
    // 实现课时添加
    $('#course-btn').on('click',function (){
        $('#courseInfo').ajaxSubmit({
            type:'post',
            url:'/api/course/create',
            dataType:'json',
            success:function (data){
               if(data.code==200){
                   location.href='/course/course_basic?cs_id='+data.result.cs_id;
               }
                
            }
        })
    })

});