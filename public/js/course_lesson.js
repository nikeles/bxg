define(['jquery','template','util'],function ($,template,util){
    // 左侧侧边栏选中效果
    util.setAsideActive('/course/course_add');
    var id = util.qs('cs_id');
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        dataType:'json',
        data:{'cs_id':id},
        success:function (data){
            if(data.code==200){
                var html = template('lessonTpl',data.result);
                $("#lessonInfo").html(html);
            }
        }
    })
})